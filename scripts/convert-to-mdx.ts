// scripts/convert-to-mdx.ts
import fs from 'fs/promises';
import path from 'path';
import { 
  Persona, 
  Algorithm, 
  CaseStudy, 
  ContentType,
  PersonaType,
  DifficultyLevel 
} from '@/types/index.js';

// Convert a JSON object to frontmatter format
function createFrontMatter(data: Record<string, any>): string {
  // Remove content from frontmatter if it exists
  const { content, description, ...frontMatterData } = data;
  
  // Convert the object to YAML-style frontmatter
  const yamlData = Object.entries(frontMatterData)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        // Handle arrays - convert to YAML array format
        return `${key}:\n${value.map(item => `  - ${item}`).join('\n')}`;
      } else if (typeof value === 'object' && value !== null) {
        // Handle nested objects - convert to YAML format
        return `${key}:\n${Object.entries(value)
          .map(([subKey, subValue]) => `  ${subKey}: ${JSON.stringify(subValue)}`)
          .join('\n')}`;
      }
      // Handle simple values
      return `${key}: ${JSON.stringify(value)}`;
    })
    .join('\n');

  return `---\n${yamlData}\n---\n\n`;
}

// Convert a persona JSON to MDX
async function convertPersonaToMDX(personaData: Persona): Promise<string> {
  const frontMatter = createFrontMatter(personaData);
  const content = `# ${personaData.title}

${personaData.description}

## Role and Expertise

As a ${personaData.role}, you'll focus on:

${personaData.expertise.map(exp => `- ${exp}`).join('\n')}

## Related Case Studies

${personaData.relatedCaseStudies.length > 0 
  ? personaData.relatedCaseStudies.map(study => `- ${study}`).join('\n')
  : 'No case studies linked yet.'}

${personaData.challenges ? `
## Key Challenges

${personaData.challenges.map(challenge => `- ${challenge}`).join('\n')}
` : ''}

${personaData.learningPath ? `
## Recommended Learning Path

${personaData.learningPath.map(path => `- ${path}`).join('\n')}
` : ''}`;

  return frontMatter + content;
}

// Convert an algorithm JSON to MDX
async function convertAlgorithmToMDX(algorithmData: Algorithm): Promise<string> {
  const frontMatter = createFrontMatter(algorithmData);
  const content = `# ${algorithmData.title}

${algorithmData.description}

## Applications

${algorithmData.applications.map(app => `- ${app}`).join('\n')}

## Prerequisites

${algorithmData.prerequisites.map(prereq => `- ${prereq}`).join('\n')}

${algorithmData.technicalDetails ? `
## Technical Details

- Classical Complexity: ${algorithmData.technicalDetails.classicalComplexity}
- Quantum Advantage: ${algorithmData.technicalDetails.quantumAdvantage}
${algorithmData.technicalDetails.quantumCircuit ? `
### Circuit Description
${algorithmData.technicalDetails.quantumCircuit}` : ''}
` : ''}

${algorithmData.implementationGuide ? `
## Implementation Guide

- Framework: ${algorithmData.implementationGuide.framework}
${algorithmData.implementationGuide.codeExample ? `
\`\`\`python
${algorithmData.implementationGuide.codeExample}
\`\`\`
` : ''}

### Implementation Considerations

${algorithmData.implementationGuide.considerations.map(consideration => `- ${consideration}`).join('\n')}
` : ''}

## Related Case Studies

${algorithmData.relatedCaseStudies.length > 0 
  ? algorithmData.relatedCaseStudies.map(study => `- ${study}`).join('\n')
  : 'No case studies linked yet.'}`;

  return frontMatter + content;
}

// Convert a case study JSON to MDX
async function convertCaseStudyToMDX(caseStudyData: CaseStudy): Promise<string> {
  const frontMatter = createFrontMatter(caseStudyData);
  const content = `# ${caseStudyData.title}

${caseStudyData.content}

## Related Content

### Personas
${caseStudyData.personas.length > 0 
  ? caseStudyData.personas.map(persona => `- ${persona}`).join('\n')
  : 'No specific personas linked.'}

### Industries
${caseStudyData.industries.length > 0 
  ? caseStudyData.industries.map(industry => `- ${industry}`).join('\n')
  : 'No specific industries linked.'}

### Algorithms
${caseStudyData.algorithms.length > 0 
  ? caseStudyData.algorithms.map(algorithm => `- ${algorithm}`).join('\n')
  : 'No specific algorithms linked.'}

${caseStudyData.implementation ? `
## Implementation Details

- Framework: ${caseStudyData.implementation.framework}
- Requirements: ${caseStudyData.implementation.requirements.join(', ')}
${caseStudyData.implementation.codeRepo ? `- Code Repository: ${caseStudyData.implementation.codeRepo}` : ''}
` : ''}

${caseStudyData.results ? `
## Results and Analysis

### Key Metrics
${Object.entries(caseStudyData.results.metrics)
  .map(([key, value]) => `- ${key}: ${value}`)
  .join('\n')}

### Key Conclusions
${caseStudyData.results.conclusions.map(conclusion => `- ${conclusion}`).join('\n')}
` : ''}

## Tags
${caseStudyData.tags.map(tag => `- ${tag}`).join('\n')}`;

  return frontMatter + content;
}

type ContentTypeMap = {
  'persona': typeof convertPersonaToMDX;
  'algorithm': typeof convertAlgorithmToMDX;
  'case-study': typeof convertCaseStudyToMDX;
};

// Main conversion function
async function convertToMDX(): Promise<void> {
  const contentTypes = ['persona', 'algorithm', 'case-study'] as const;
  const contentDir = path.join(process.cwd(), 'content');

  const converters: ContentTypeMap = {
    'persona': convertPersonaToMDX,
    'algorithm': convertAlgorithmToMDX,
    'case-study': convertCaseStudyToMDX
  };

  for (const type of contentTypes) {
    const sourceDir = path.join(contentDir, type);
    const targetDir = path.join(contentDir, `${type}s`);

    try {
      // Create target directory if it doesn't exist
      await fs.mkdir(targetDir, { recursive: true });

      // Read all JSON files in the source directory
      const files = await fs.readdir(sourceDir);
      const jsonFiles = files.filter(file => file.endsWith('.json'));

      if (jsonFiles.length === 0) {
        console.log(`No JSON files found in ${sourceDir}`);
        continue;
      }

      console.log(`\nProcessing ${type} files...`);

      for (const file of jsonFiles) {
        try {
          const jsonContent = await fs.readFile(path.join(sourceDir, file), 'utf8');
          const data = JSON.parse(jsonContent);
          
          const converter = converters[type];
          const mdxContent = await converter(data);

          // Write MDX file
          const mdxFilename = file.replace('.json', '.mdx');
          await fs.writeFile(path.join(targetDir, mdxFilename), mdxContent);
          console.log(`✓ Converted ${file} to ${mdxFilename}`);
        } catch (error) {
          console.error(`✗ Error converting ${file}:`, error);
        }
      }
    } catch (error) {
      console.error(`\nError processing ${type}:`, error);
    }
  }
}

// Run the conversion
convertToMDX()
  .then(() => console.log('\nConversion complete!'))
  .catch(error => console.error('\nConversion failed:', error));
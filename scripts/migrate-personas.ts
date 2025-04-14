import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function migratePersonas() {
  try {
    const contentDir = path.join(process.cwd(), 'content', 'persona');
    const files = await fs.readdir(contentDir);
    const mdxFiles = files.filter(file => file.endsWith('.mdx'));

    console.log(`Found ${mdxFiles.length} persona files to migrate`);

    for (const file of mdxFiles) {
      const filePath = path.join(contentDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      const { data: frontmatter, content: mdxContent } = matter(content);
      
      const slug = file.replace('.mdx', '');
      
      // Check if persona already exists
      const { data: existingPersona } = await supabase
        .from('personas')
        .select('id')
        .eq('slug', slug)
        .single();

      if (existingPersona) {
        console.log(`Updating existing persona: ${slug}`);
        const { error } = await supabase
          .from('personas')
          .update({
            name: frontmatter.title,
            description: frontmatter.description,
            role: frontmatter.role,
            industry: frontmatter.industries || [],
            key_interests: frontmatter.expertise || [],
            technical_level: frontmatter.technicalLevel,
            content: mdxContent,
            updated_at: new Date().toISOString()
          })
          .eq('slug', slug);

        if (error) {
          console.error(`Error updating persona ${slug}:`, error);
          continue;
        }
      } else {
        console.log(`Creating new persona: ${slug}`);
        const { error } = await supabase
          .from('personas')
          .insert({
            slug,
            name: frontmatter.title,
            description: frontmatter.description,
            role: frontmatter.role,
            industry: frontmatter.industries || [],
            key_interests: frontmatter.expertise || [],
            technical_level: frontmatter.technicalLevel,
            content: mdxContent,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (error) {
          console.error(`Error creating persona ${slug}:`, error);
          continue;
        }
      }
      
      console.log(`Successfully migrated: ${slug}`);
    }

    console.log('Migration completed');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migratePersonas(); 
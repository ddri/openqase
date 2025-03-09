# Instructional Content Patterns

## Step-by-Step Pattern

### Purpose
This pattern is designed to make sequential instructions, processes, and algorithms more readable and easier to follow. It creates clear visual separation between steps while maintaining a cohesive flow through the content.

### Visual Structure

#### Step Number
- Uses theme accent color (`hsl(var(--primary))`)
- Format: "Step N." where N is the step number
- Font weight: medium/500
- Slightly larger than body text

#### Step Title
- Bold weight (600)
- Underlined with a 1px line
- Same color as primary text
- Clear spacing above and below

#### Description Text
- Regular weight (400)
- Good line height (1.6)
- Proper paragraph spacing
- Color: `var(--text-secondary)`

### Example Usage

```mdx
<Steps>
  <Step number="1" title="Quantum state preparation">
    The algorithm starts by preparing a superposition of quantum states 
    that encode the integers from 0 to N-1, where N is the number to 
    be factored.
  </Step>
  
  <Step number="2" title="Modular exponentiation">
    A unitary operation is applied to the quantum state, which performs 
    modular exponentiation of a randomly chosen integer with respect to 
    the input state.
  </Step>
</Steps>
```

### Spacing Guidelines

```css
/* Recommended spacing */
.steps-container {
  margin: 2rem 0;
}

.step {
  margin-bottom: 2rem;
}

.step-title {
  margin: 0.5rem 0;
  padding-bottom: 0.5rem; /* For underline spacing */
}

.step-content {
  margin-top: 1rem;
}
```

### Variations

1. **Basic Steps**
   - Number and title
   - Description text
   - Standard spacing

2. **Complex Steps**
   - Number and title
   - Description text
   - Code blocks
   - Images or diagrams
   - Mathematical equations
   - Additional notes

3. **Compact Steps**
   - Reduced spacing
   - Shorter descriptions
   - Used for simpler procedures

4. **Expanded Steps**
   - Additional sub-steps
   - More detailed explanations
   - Supporting content between steps

### Content Guidelines

1. **Step Numbers**
   - Always use numerical ordering
   - Don't skip numbers
   - Don't use letters or roman numerals
   - Keep total steps under 10 when possible

2. **Titles**
   - Keep titles concise (1-4 words)
   - Use action words when possible
   - Be consistent with capitalization
   - Avoid punctuation in titles

3. **Descriptions**
   - Start with an action verb
   - Be clear and concise
   - Use consistent voice
   - Include all necessary details
   - Break into paragraphs if needed

### Accessibility Considerations

1. **Color Usage**
   - Accent color must meet WCAG 2.1 contrast requirements
   - Don't rely solely on color to convey information
   - Ensure underlines are visible enough

2. **Semantic Structure**
   - Use proper heading hierarchy
   - Maintain logical reading order
   - Include ARIA labels where needed
   - Ensure keyboard navigation

3. **Responsive Design**
   - Maintain readability at all screen sizes
   - Adjust spacing for mobile devices
   - Ensure tap targets are large enough
   - Handle long titles gracefully

### Implementation Notes

1. **Component Structure**
   ```tsx
   interface StepProps {
     number: string;
     title: string;
     children: React.ReactNode;
     variant?: 'basic' | 'complex' | 'compact' | 'expanded';
   }
   ```

2. **Theme Integration**
   - Use CSS variables for colors
   - Respect dark/light mode
   - Follow spacing scale
   - Match typography system

3. **MDX Usage**
   - Support both component and markdown syntax
   - Handle nested MDX content
   - Support all markdown features
   - Allow HTML when needed

### Best Practices

1. **When to Use**
   - Sequential processes
   - Algorithm explanations
   - Installation guides
   - Tutorial sequences
   - Methodological descriptions

2. **When Not to Use**
   - Non-sequential content
   - Simple lists
   - Reference documentation
   - Conceptual explanations

3. **Content Creation**
   - Write steps in logical order
   - Keep each step focused
   - Use consistent language
   - Include necessary context
   - Link related content

### Examples

1. **Algorithm Implementation**
   ```mdx
   <Steps>
     <Step number="1" title="Initialize quantum register">
       Create a quantum register with n qubits in the |0⟩ state.
     </Step>
   </Steps>
   ```

2. **Installation Guide**
   ```mdx
   <Steps variant="compact">
     <Step number="1" title="Install dependencies">
       Run `npm install` to install required packages.
     </Step>
   </Steps>
   ```

3. **Tutorial Sequence**
   ```mdx
   <Steps variant="expanded">
     <Step number="1" title="Setup development environment">
       Before we begin, ensure you have the following tools installed...
     </Step>
   </Steps>
   ```

### Related Patterns

- **Progress Indicators**
  - Use with long sequences
  - Show completion status
  - Link to specific steps

- **Code Blocks**
  - Include within steps
  - Use consistent styling
  - Support syntax highlighting

- **Callouts**
  - Highlight important information
  - Add warnings or notes
  - Provide additional context

### Migration Guide

When converting existing content:

1. Identify step sequences
2. Structure content into steps
3. Add appropriate titles
4. Review and adjust spacing
5. Test accessibility
6. Verify responsive behavior

### References

- Material Design Steps Pattern
- Ant Design Steps Component
- GOV.UK Step by Step Pattern
- WCAG 2.1 Guidelines 
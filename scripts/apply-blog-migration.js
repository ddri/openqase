// scripts/apply-blog-migration.js
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase URL or service role key in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function applyMigration() {
  try {
    // Read the migration file
    const migrationPath = path.join(__dirname, '..', 'migrations', '003_add_blog_tables.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    console.log('Applying blog tables migration...');
    
    // Split the SQL into individual statements
    const statements = migrationSQL
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);
    
    // Execute each statement
    for (const statement of statements) {
      const { error } = await supabase.rpc('exec_sql', { sql: statement + ';' });
      
      if (error) {
        console.error('Error executing SQL statement:', error);
        console.error('Statement:', statement);
        process.exit(1);
      }
    }
    
    console.log('Blog tables migration applied successfully!');
    
    // Insert a sample blog post
    const { error: insertError } = await supabase
      .from('blog_posts')
      .insert({
        title: 'Getting Started with Quantum Computing',
        slug: 'getting-started-with-quantum-computing',
        description: 'An introduction to quantum computing concepts and applications',
        content: `# Getting Started with Quantum Computing

Quantum computing represents a paradigm shift in how we process information. Unlike classical computers that use bits (0s and 1s), quantum computers use quantum bits or "qubits" that can exist in multiple states simultaneously.

## Key Concepts

### Superposition

Superposition allows qubits to exist in multiple states at once, enabling quantum computers to process a vast number of possibilities simultaneously.

### Entanglement

Quantum entanglement creates a special connection between qubits, where the state of one qubit is dependent on the state of another, regardless of the distance between them.

### Quantum Algorithms

Several quantum algorithms have been developed that demonstrate theoretical advantages over classical algorithms:

- **Shor's Algorithm**: Efficiently factors large numbers, which could potentially break many encryption systems
- **Grover's Algorithm**: Provides a quadratic speedup for searching unsorted databases
- **Quantum Fourier Transform**: The foundation for many quantum algorithms

## Applications

Quantum computing has potential applications in:

- **Cryptography**: Both breaking existing encryption and creating new, quantum-resistant methods
- **Drug Discovery**: Simulating molecular interactions at the quantum level
- **Optimization Problems**: Solving complex logistics and scheduling problems
- **Machine Learning**: Enhancing AI capabilities through quantum processing

## Getting Involved

Even without access to quantum hardware, you can start learning quantum computing:

1. Learn the mathematical foundations (linear algebra, complex numbers)
2. Explore quantum programming frameworks like Qiskit, Cirq, or Q#
3. Use quantum simulators to run simple algorithms
4. Join the quantum computing community through forums and open-source projects

The field is still in its early stages, making it an exciting time to get involved!`,
        author: 'Quantum Expert',
        category: 'Education',
        tags: ['quantum computing', 'beginners', 'technology'],
        published: true,
        featured: true,
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    
    if (insertError) {
      console.error('Error inserting sample blog post:', insertError);
    } else {
      console.log('Sample blog post created successfully!');
    }
    
  } catch (error) {
    console.error('Error applying migration:', error);
    process.exit(1);
  }
}

applyMigration();
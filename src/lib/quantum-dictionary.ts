/**
 * Quantum Computing Terms Dictionary
 * Custom dictionary of quantum computing terms that should be ignored
 * by spell checkers and validation tools
 */

/**
 * Core quantum computing terms
 * These terms may appear as "misspellings" in standard dictionaries
 * but are correct technical terminology
 */
export const QUANTUM_TERMS = [
  // Quantum fundamentals
  'qubit',
  'qubits',
  'superposition',
  'entanglement',
  'decoherence',
  'quantum',

  // Algorithms and operations
  'Grover',
  'Shor',
  'QAOA',
  'VQE',
  'QPU',
  'QKD',
  'Hadamard',
  'Pauli',
  'Bloch',
  'Dirac',
  'Hamiltonian',

  // Mathematical terms
  'eigenstate',
  'eigenvector',
  'eigenvalue',
  'unitarity',

  // Hardware and techniques
  'annealing',
  'annealer',
  'transpilation',
  'transpiler',

  // Variational methods (accept both US and UK spellings)
  'variational',
  'parametrized',
  'parametrised',
  'ansatz',

  // Platforms and software
  'OpenQase',
  'Qiskit',
  'Cirq',
  'PennyLane',
  'Q#',

  // Companies and hardware
  'IonQ',
  'Rigetti',
  'D-Wave',

  // Quantum era terms
  'NISQ',
  'supremacy',

  // Applications
  'teleportation',
  'cryptography',
  'blockchain',

  // Both US and UK spellings accepted
  'optimization',
  'optimisation',
  'minimisation',
  'minimization',
  'maximisation',
  'maximization',
];

/**
 * Check if a word is a known quantum computing term
 * Case-insensitive comparison
 */
export function isQuantumTerm(word: string): boolean {
  return QUANTUM_TERMS.some(
    (term) => term.toLowerCase() === word.toLowerCase()
  );
}

/**
 * Filter out quantum terms from a list of potential spelling issues
 */
export function filterQuantumTerms(words: string[]): string[] {
  return words.filter((word) => !isQuantumTerm(word));
}

/**
 * Category groupings for documentation
 */
export const QUANTUM_TERM_CATEGORIES = {
  fundamentals: [
    'qubit',
    'qubits',
    'superposition',
    'entanglement',
    'decoherence',
    'quantum',
  ],
  algorithms: ['Grover', 'Shor', 'QAOA', 'VQE', 'QPU', 'QKD'],
  gates: ['Hadamard', 'Pauli', 'Bloch', 'Dirac', 'Hamiltonian'],
  mathematical: ['eigenstate', 'eigenvector', 'eigenvalue', 'unitarity'],
  hardware: ['annealing', 'annealer', 'transpilation', 'transpiler'],
  variational: ['variational', 'parametrized', 'parametrised', 'ansatz'],
  platforms: ['OpenQase', 'Qiskit', 'Cirq', 'PennyLane', 'Q#'],
  companies: ['IonQ', 'Rigetti', 'D-Wave'],
  era: ['NISQ', 'supremacy'],
  applications: ['teleportation', 'cryptography', 'blockchain'],
};

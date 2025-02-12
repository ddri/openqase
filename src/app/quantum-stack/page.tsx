// src/app/quantum-stack/page.tsx
'use client'
import { useState } from 'react'

interface StackLayer {
  id: string;
  title: string;
  description: string;
  content: string;
}

const stackLayers: StackLayer[] = [
  {
    id: 'language',
    title: 'Language',
    description: 'Quantum Programming Languages',
    content: `Quantum programming languages are specifically designed to express quantum algorithms and operations. 
    Common examples include:
    • Qiskit (IBM)
    • Q# (Microsoft)
    • Cirq (Google)
    • Forest (Rigetti)
    
    These languages provide the syntax and structures needed to write quantum programs, including operations 
    like superposition, entanglement, and quantum gates.`
  },
  {
    id: 'sdk',
    title: 'SDK',
    description: 'Software Development Kits',
    content: `Software Development Kits (SDKs) provide the tools and libraries needed to develop quantum applications.
    They include:
    • Circuit design tools
    • Simulation capabilities
    • Hardware interface layers
    • Debugging utilities
    • Performance optimization tools`
  },
  {
    id: 'framework',
    title: 'Framework',
    description: 'Quantum Computing Frameworks',
    content: `Frameworks provide the structure and tools for building quantum applications. They handle:
    • Circuit optimization
    • Hardware abstraction
    • Resource management
    • Error mitigation
    • Integration with classical computing systems`
  },
  {
    id: 'compiler',
    title: 'Compiler',
    description: 'Quantum Circuit Compilation',
    content: `Quantum compilers translate high-level quantum programs into low-level quantum circuits.
    Key functions include:
    • Gate decomposition
    • Circuit optimization
    • Hardware-specific optimization
    • Mapping to physical qubits
    • Timing and control signal generation`
  },
  {
    id: 'error-correction',
    title: 'Error Correction',
    description: 'Quantum Error Correction',
    content: `Error correction is crucial for reliable quantum computation. This layer handles:
    • Detection and correction of qubit errors
    • Surface codes and other error correction schemes
    • Fault-tolerant quantum computation
    • Error rate reduction
    • Quantum state preservation`
  },
  {
    id: 'physics',
    title: 'Physics Package',
    description: 'Quantum Hardware Interface',
    content: `The physics package interfaces with the quantum hardware:
    • Control signal generation
    • Qubit manipulation
    • Measurement and readout
    • Hardware calibration
    • Environmental control`
  },
  {
    id: 'measurement',
    title: 'Measurement',
    description: 'Quantum State Measurement',
    content: `Measurement systems handle the final readout of quantum states:
    • State detection
    • Signal amplification
    • Data collection
    • Result interpretation
    • Classical post-processing`
  }
]

export default function QuantumStack() {
  const [selectedLayer, setSelectedLayer] = useState<StackLayer>(stackLayers[0])

  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-100">Quantum Stack</h1>
        <p className="text-gray-400 mb-8">Understanding the quantum computing technology stack</p>
        
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Stack Visualization */}
          <div className="col-span-5">
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
              <div className="space-y-3">
                {stackLayers.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => setSelectedLayer(layer)}
                    className={`w-full p-4 rounded-xl transition-all duration-300 text-left
                      ${selectedLayer.id === layer.id 
                        ? 'bg-blue-900 text-blue-100' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                  >
                    {layer.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="col-span-7">
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
              <h2 className="text-2xl font-bold text-gray-100 mb-2">
                {selectedLayer.title}
              </h2>
              <h3 className="text-lg text-gray-400 mb-6">
                {selectedLayer.description}
              </h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 whitespace-pre-line">
                  {selectedLayer.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
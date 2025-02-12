// src/app/quantum-stack/page.tsx
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import CardPixelPattern from '@/components/CardPixelPattern'

interface StackItem {
  id: string
  title: string
  description: string
  details: {
    overview: string
    examples?: string[]
    additionalInfo?: string
  }
}

const stackItems: StackItem[] = [
  {
    id: 'language',
    title: 'Language',
    description: 'Quantum Programming Languages',
    details: {
      overview: 'Quantum programming languages are specifically designed to express quantum algorithms and operations.',
      examples: [
        'Qiskit (IBM)',
        'Q# (Microsoft)',
        'Cirq (Google)',
        'Forest (Rigetti)'
      ],
      additionalInfo: 'These languages provide the syntax and structures needed to write quantum programs, including operations like superposition, entanglement, and quantum gates.'
    }
  },
  {
    id: 'sdk',
    title: 'SDK',
    description: 'Software Development Kits',
    details: {
      overview: 'Software Development Kits provide the tools and libraries needed to develop quantum applications.',
      examples: [
        'Qiskit SDK',
        'Azure Quantum SDK',
        'Cirq SDK',
        'Forest SDK'
      ],
      additionalInfo: 'These SDKs include tools for circuit design, simulation capabilities, and hardware interfaces.'
    }
  },
  {
    id: 'framework',
    title: 'Framework',
    description: 'Quantum Computing Frameworks',
    details: {
      overview: 'Quantum frameworks provide the structure and tools for building quantum applications.',
      examples: [
        'Qiskit Runtime',
        'Q# Runtime',
        'Cirq Framework',
        'PyQuil'
      ],
      additionalInfo: 'Frameworks handle circuit optimization, hardware abstraction, and integration with classical systems.'
    }
  },
  {
    id: 'compiler',
    title: 'Compiler',
    description: 'Quantum Circuit Compilation',
    details: {
      overview: 'Quantum compilers translate high-level quantum programs into low-level quantum circuits.',
      examples: [
        'Qiskit Terra',
        'Quilc',
        'Cirq Compiler',
        'Q# Compiler'
      ],
      additionalInfo: 'Compilers handle gate decomposition, circuit optimization, and mapping to physical qubits.'
    }
  },
  {
    id: 'error-correction',
    title: 'Error Correction',
    description: 'Quantum Error Correction',
    details: {
      overview: 'Error correction is crucial for reliable quantum computation.',
      examples: [
        'Surface Codes',
        'Stabilizer Codes',
        'Topological Codes',
        'Color Codes'
      ],
      additionalInfo: 'These techniques detect and correct qubit errors to maintain quantum state coherence.'
    }
  },
  {
    id: 'physics',
    title: 'Physics Package',
    description: 'Quantum Hardware Interface',
    details: {
      overview: 'The physics package interfaces directly with the quantum hardware.',
      examples: [
        'Control Systems',
        'Signal Processing',
        'Qubit Control',
        'Readout Systems'
      ],
      additionalInfo: 'This layer handles the physical control and measurement of quantum states.'
    }
  },
  {
    id: 'measurement',
    title: 'Measurement',
    description: 'Quantum State Measurement',
    details: {
      overview: 'Measurement systems handle the final readout of quantum states.',
      examples: [
        'State Detection',
        'Signal Amplification',
        'Data Collection',
        'Classical Post-processing'
      ],
      additionalInfo: 'These systems convert quantum information into classical results.'
    }
  }
]

export default function QuantumStack() {
  const [selectedItem, setSelectedItem] = useState<StackItem>(stackItems[0])

  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">Quantum Stack</h1>
        <p className="text-gray-400 mb-12">Understanding the quantum computing technology stack</p>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Stack Navigation */}
          <div className="col-span-4">
            <Card className="bg-[#1A1A1D] border-gray-800 p-4">
              <div className="space-y-2">
                {stackItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`w-full p-4 rounded-lg text-left transition-all duration-300
                      ${selectedItem.id === item.id 
                        ? 'bg-copper/20 text-white border border-copper/40' 
                        : 'bg-gray-900/50 text-gray-400 hover:bg-gray-900 hover:text-gray-300 border border-transparent'
                      }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Content */}
          <div className="col-span-8">
            <Card className="bg-[#1A1A1D] border-gray-800 p-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {selectedItem.title}
              </h2>
              <h3 className="text-lg text-copper mb-4">
                {selectedItem.description}
              </h3>
              <div className="space-y-4">
                <p className="text-gray-300">
                  {selectedItem.details.overview}
                </p>
                {selectedItem.details.examples && (
                  <div className="mt-4">
                    <h4 className="text-white font-semibold mb-2">Common examples:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedItem.details.examples.map((example) => (
                        <li key={example} className="text-gray-300">{example}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedItem.details.additionalInfo && (
                  <p className="text-gray-300 mt-4">
                    {selectedItem.details.additionalInfo}
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
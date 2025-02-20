// src/app/quantum-stack/page.tsx
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'

interface StackItem {
  id: string;
  title: string;
  description: string;
  details: {
    overview: string;
    examples?: string[];
    additionalInfo?: string;
  };
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
  // ... rest of your stack items
]

export default function QuantumStack() {
  const [selectedItem, setSelectedItem] = useState<StackItem>(stackItems[0])

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          Quantum Stack
        </h1>
        <p className="text-text-secondary mb-12">
          Understanding the quantum computing technology stack
        </p>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Stack Navigation */}
          <div className="col-span-4">
            <Card className="bg-surface-primary border-card-border p-4">
              <div className="space-y-2">
                {stackItems.map((item: StackItem) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`
                      w-full p-4 rounded-lg text-left transition-all duration-300
                      ${selectedItem.id === item.id 
                        ? 'bg-accent/10 text-text-primary border border-accent/40' 
                        : 'bg-surface-secondary text-text-secondary hover:bg-accent/5 hover:text-text-primary border border-transparent'
                      }
                    `}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Content */}
          <div className="col-span-8">
            <Card className="bg-surface-primary border-card-border p-6">
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                {selectedItem.title}
              </h2>
              <h3 className="text-lg text-accent mb-4">
                {selectedItem.description}
              </h3>
              <div className="space-y-4">
                <p className="text-text-secondary">
                  {selectedItem.details.overview}
                </p>
                {selectedItem.details.examples && (
                  <div className="mt-4">
                    <h4 className="text-text-primary font-semibold mb-2">
                      Common examples:
                    </h4>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedItem.details.examples.map((example: string) => (
                        <li key={example} className="text-text-secondary">
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedItem.details.additionalInfo && (
                  <p className="text-text-secondary mt-4">
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
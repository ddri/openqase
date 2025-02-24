// src/app/quantum-stack/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const stackLayers = [
  {
    title: "Applications",
    description: "Domain-specific quantum applications and use cases",
    items: [
      "Optimization Problems",
      "Machine Learning",
      "Simulation",
      "Cryptography"
    ],
    content: "Applications form the topmost layer of the quantum computing stack. These are the practical implementations that solve real-world problems. From optimization in logistics and finance to breakthroughs in drug discovery and materials science, quantum applications leverage the unique properties of quantum systems to tackle problems that classical computers struggle with.",
    layerNumber: 5
  },
  {
    title: "Algorithms",
    description: "Quantum algorithms and protocols",
    items: [
      "Grover's Algorithm",
      "Shor's Algorithm",
      "VQE",
      "QAOA"
    ],
    content: "Quantum algorithms are the mathematical procedures that harness quantum mechanical effects to solve computational problems. Some algorithms offer exponential speedup over classical methods for specific tasks. This layer bridges the gap between practical applications and the underlying quantum hardware.",
    layerNumber: 4
  },
  {
    title: "Software Development",
    description: "Development tools and frameworks",
    items: [
      "Qiskit",
      "Cirq",
      "Q#",
      "Pennylane"
    ],
    content: "The software development layer provides the tools and frameworks that developers use to write quantum programs. These frameworks abstract away much of the complexity of quantum operations while providing powerful capabilities for circuit design, optimization, and execution.",
    layerNumber: 3
  },
  {
    title: "Control & Operations",
    description: "Quantum circuit operations and control systems",
    items: [
      "Gates",
      "Measurement",
      "Error Correction",
      "Calibration"
    ],
    content: "Control and operations manage the precise manipulation of quantum states. This layer handles the translation of quantum algorithms into physical operations, implements error correction protocols, and ensures accurate measurement of quantum states.",
    layerNumber: 2
  },
  {
    title: "Hardware",
    description: "Physical quantum computing hardware",
    items: [
      "Superconducting Qubits",
      "Ion Traps",
      "Photonic Systems",
      "Topological Qubits"
    ],
    content: "The hardware layer forms the foundation of quantum computing. It encompasses the physical qubits and their supporting infrastructure. Different hardware approaches each have their own advantages and challenges in maintaining quantum coherence and scaling up to more qubits.",
    layerNumber: 1
  }
];

export default function QuantumStackPage() {
  const [selectedLayer, setSelectedLayer] = useState(stackLayers[0]);

  return (
    <main className="container mx-auto p-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">
          The Quantum Computing Stack
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Understanding the complete quantum computing technology stack, from hardware to applications
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Stack visualization */}
        <div className="relative">
          {/* Quantum Computer Container */}
          <div className="bg-accent/5 border-2 border-accent/20 rounded-xl p-6 relative">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-8 bg-accent/10 rounded-t-xl" />
            <div className="absolute bottom-0 left-0 w-full h-12 bg-accent/10 rounded-b-xl" />
            
            {/* Side connectors */}
            <div className="absolute -left-3 top-1/4 w-6 h-12 bg-accent/10 rounded-l-lg" />
            <div className="absolute -right-3 top-1/3 w-6 h-12 bg-accent/10 rounded-r-lg" />
            <div className="absolute -left-3 bottom-1/4 w-6 h-12 bg-accent/10 rounded-l-lg" />

            {/* Stack layers */}
            <div className="space-y-3 relative z-10">
              {stackLayers.map((layer) => (
                <Card 
                  key={layer.title}
                  className={cn(
                    "cursor-pointer transition-all transform hover:scale-[1.02]",
                    selectedLayer.title === layer.title 
                      ? "border-primary bg-primary/5 shadow-lg" 
                      : "hover:bg-accent/5"
                  )}
                  onClick={() => setSelectedLayer(layer)}
                >
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-primary/10 text-primary">
                        Layer {layer.layerNumber}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{layer.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {layer.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Layer details */}
        <div className="lg:sticky lg:top-8">
          <Card className="h-full">
            <CardHeader className="p-6">
              <Badge className="w-fit mb-4 bg-primary/10 text-primary">
                Layer {selectedLayer.layerNumber}
              </Badge>
              <CardTitle className="text-2xl mb-4">{selectedLayer.title}</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                {selectedLayer.content}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <h3 className="font-semibold mb-4">Key Components</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedLayer.items.map((item) => (
                  <div 
                    key={item}
                    className="p-4 bg-accent/5 rounded-lg border border-accent/10"
                  >
                    <h4 className="font-medium mb-2">{item}</h4>
                    <p className="text-sm text-muted-foreground">
                      Learn more about {item.toLowerCase()} in quantum computing
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
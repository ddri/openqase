// src/app/quantum-stack/page.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
    color: "blue"
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
    color: "purple"
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
    color: "green"
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
    color: "yellow"
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
    color: "red"
  }
];

export default function QuantumStackPage() {
  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-100 mb-6">
            The Quantum Computing Stack
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Understanding the complete quantum computing technology stack, from hardware to applications
          </p>
        </div>

        <div className="space-y-8">
          {stackLayers.map((layer, index) => (
            <Card 
              key={layer.title}
              className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all"
            >
              <CardHeader className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className={`bg-${layer.color}-900 text-${layer.color}-200`}>
                    Layer {stackLayers.length - index}
                  </Badge>
                </div>
                <CardTitle className="text-2xl text-gray-100 mb-2">
                  {layer.title}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {layer.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {layer.items.map((item) => (
                    <div 
                      key={item}
                      className="p-4 bg-gray-800 rounded-lg border border-gray-700"
                    >
                      <h3 className="text-gray-200 font-medium mb-2">{item}</h3>
                      <p className="text-sm text-gray-400">
                        Learn more about {item.toLowerCase()} in quantum computing
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 p-8 bg-gray-900 border border-gray-800 rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">
            Want to Learn More?
          </h2>
          <p className="text-gray-400 mb-6">
            Check out our learning paths to dive deeper into any aspect of the quantum computing stack.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="/paths/algorithm"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Explore Algorithms
            </a>
            <a 
              href="/paths" 
              className="inline-block bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              View All Paths
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
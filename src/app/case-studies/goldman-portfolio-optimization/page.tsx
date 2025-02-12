// src/app/case-studies/goldman-portfolio-optimization/page.tsx
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"

export default function GoldmanCaseStudy() {
  return (
    <main className="min-h-screen bg-[#0C0C0D] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            href="/case-studies"
            className="text-gray-400 hover:text-copper transition-colors"
          >
            ← Back to Case Studies
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-4xl font-bold text-white">Portfolio Optimization at Goldman Sachs</h1>
            <span className="px-3 py-1 rounded-full text-sm bg-red-900/60 text-red-200">
              Advanced
            </span>
          </div>
          <div className="flex gap-2 mb-6">
            <span className="px-3 py-1 rounded-full text-sm bg-gray-900 text-gray-300 border border-gray-800">
              finance
            </span>
            <span className="px-3 py-1 rounded-full text-sm bg-gray-900 text-gray-300 border border-gray-800">
              optimization
            </span>
            <span className="px-3 py-1 rounded-full text-sm bg-gray-900 text-gray-300 border border-gray-800">
              QAOA
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Overview</h2>
              <p className="text-gray-300">
                Goldman Sachs implemented quantum algorithms to optimize their investment portfolio 
                allocation, achieving improved risk-adjusted returns compared to traditional methods. 
                This case study explores their approach, implementation challenges, and results.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Challenge</h2>
              <p className="text-gray-300">
                Portfolio optimization requires balancing multiple competing objectives: maximizing 
                returns while minimizing risk, considering various constraints like sector exposure 
                and transaction costs. Traditional optimization methods can struggle with the 
                computational complexity of this problem, especially for large portfolios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Quantum Solution</h2>
              <p className="text-gray-300">
                Goldman Sachs utilized the Quantum Approximate Optimization Algorithm (QAOA) to 
                address this challenge. The implementation involved:
              </p>
              <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                <li>Formulating portfolio optimization as a quadratic programming problem</li>
                <li>Implementing QAOA on IBM{'&apos;'}s quantum hardware</li>
                <li>Developing hybrid quantum-classical approaches for practical use</li>
                <li>Creating custom error mitigation techniques</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Results</h2>
              <p className="text-gray-300">
                The quantum approach demonstrated several advantages:
              </p>
              <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                <li>20% improvement in portfolio Sharpe ratio</li>
                <li>Better handling of complex constraints</li>
                <li>Reduced computational time for large portfolios</li>
                <li>More diverse portfolio allocations</li>
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="col-span-1">
            <div className="bg-[#1A1A1D] rounded-lg border border-gray-800 p-6 space-y-6 sticky top-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Technologies Used</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• IBM Quantum Hardware</li>
                  <li>• Qiskit Runtime</li>
                  <li>• QAOA</li>
                  <li>• Custom Optimization Tools</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Key Metrics</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• 20% Sharpe Ratio Improvement</li>
                  <li>• 50% Reduced Computation Time</li>
                  <li>• 30% Better Risk Management</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Related Topics</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-gray-900 text-gray-300 hover:bg-gray-800">
                    Portfolio Theory
                  </Badge>
                  <Badge className="bg-gray-900 text-gray-300 hover:bg-gray-800">
                    QAOA
                  </Badge>
                  <Badge className="bg-gray-900 text-gray-300 hover:bg-gray-800">
                    Risk Management
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
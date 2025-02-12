import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

export default function MerckCaseStudy() {
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
            <h1 className="text-4xl font-bold text-white">Molecular Simulation at Merck</h1>
            <span className="px-3 py-1 rounded-full text-sm bg-purple-900/60 text-purple-200">
              Advanced
            </span>
          </div>
          <div className="flex gap-2 mb-6">
            <span className="px-3 py-1 rounded-full text-sm bg-gray-900 text-gray-300 border border-gray-800">
              pharmaceutical
            </span>
            <span className="px-3 py-1 rounded-full text-sm bg-gray-900 text-gray-300 border border-gray-800">
              simulation
            </span>
            <span className="px-3 py-1 rounded-full text-sm bg-gray-900 text-gray-300 border border-gray-800">
              chemistry
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="bg-gray-900 border border-gray-800">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="technical">Technical Details</TabsTrigger>
                <TabsTrigger value="impact">Impact & Results</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Project Overview</h2>
                  <p className="text-gray-300">
                    Merck leveraged quantum computing to revolutionize their drug discovery process, 
                    focusing on molecular dynamics simulation and protein folding prediction to 
                    accelerate the identification of promising drug candidates.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Challenge</h2>
                  <p className="text-gray-300">
                    Traditional computational methods for simulating molecular interactions and 
                    protein folding are extremely time-consuming and computationally intensive, 
                    creating a bottleneck in the drug discovery pipeline.
                  </p>
                </section>

                <section className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-xl font-semibold text-white mb-3">Key Objectives</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="text-copper">•</span>
                      Accelerate molecular dynamics simulations
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-copper">•</span>
                      Improve accuracy of protein-ligand binding predictions
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-copper">•</span>
                      Reduce time-to-market for new drug candidates
                    </li>
                  </ul>
                </section>
              </TabsContent>

              <TabsContent value="technical" className="space-y-6 mt-6">
                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Technical Implementation</h2>
                  <div className="space-y-4">
                    <Card className="bg-gray-900/50 border-gray-800 p-6">
                      <h3 className="text-lg font-semibold text-white mb-3">Quantum Approach</h3>
                      <p className="text-gray-300">
                        Merck implemented a hybrid quantum-classical algorithm for simulating 
                        molecular dynamics, using quantum circuits to model electron correlations 
                        and molecular geometries with unprecedented accuracy.
                      </p>
                    </Card>

                    <Card className="bg-gray-900/50 border-gray-800 p-6">
                      <h3 className="text-lg font-semibold text-white mb-3">Algorithm Details</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>Quantum variational eigensolver for ground state calculations</li>
                        <li>Custom error mitigation techniques</li>
                        <li>Hybrid quantum-classical simulation pipeline</li>
                        <li>Novel quantum feature mapping for molecular properties</li>
                      </ul>
                    </Card>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Hardware & Infrastructure</h2>
                  <p className="text-gray-300">
                    The project utilized IBM{'&apos;'}s superconducting quantum processors, integrated with 
                    classical high-performance computing infrastructure for pre- and post-processing.
                  </p>
                </section>
              </TabsContent>

              <TabsContent value="impact" className="space-y-6 mt-6">
                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Results & Impact</h2>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <Card className="bg-gray-900/50 border-gray-800 p-6">
                      <h3 className="text-lg font-semibold text-copper mb-2">Simulation Speed</h3>
                      <p className="text-4xl font-bold text-white mb-2">100x</p>
                      <p className="text-gray-400">Faster than classical methods</p>
                    </Card>
                    <Card className="bg-gray-900/50 border-gray-800 p-6">
                      <h3 className="text-lg font-semibold text-copper mb-2">Accuracy</h3>
                      <p className="text-4xl font-bold text-white mb-2">95%</p>
                      <p className="text-gray-400">Prediction accuracy</p>
                    </Card>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Business Impact</h2>
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="bg-gray-900/50 border-gray-800 p-6">
                      <h3 className="text-lg font-semibold text-copper mb-2">Time Saved</h3>
                      <p className="text-3xl font-bold text-white">70%</p>
                    </Card>
                    <Card className="bg-gray-900/50 border-gray-800 p-6">
                      <h3 className="text-lg font-semibold text-copper mb-2">Cost Reduction</h3>
                      <p className="text-3xl font-bold text-white">45%</p>
                    </Card>
                    <Card className="bg-gray-900/50 border-gray-800 p-6">
                      <h3 className="text-lg font-semibold text-copper mb-2">Candidates Found</h3>
                      <p className="text-3xl font-bold text-white">3x</p>
                    </Card>
                  </div>
                </section>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="col-span-1">
            <div className="bg-[#1A1A1D] rounded-lg border border-gray-800 p-6 space-y-6 sticky top-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Technologies Used</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• IBM Quantum Hardware</li>
                  <li>• Qiskit Chemistry</li>
                  <li>• Custom Simulation Software</li>
                  <li>• Quantum Machine Learning</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Project Scale</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• 50+ Molecular Simulations</li>
                  <li>• 3 Drug Candidates</li>
                  <li>• 18 Month Implementation</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Related Topics</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-gray-900 text-gray-300 hover:bg-gray-800">
                    Molecular Dynamics
                  </Badge>
                  <Badge className="bg-gray-900 text-gray-300 hover:bg-gray-800">
                    Drug Discovery
                  </Badge>
                  <Badge className="bg-gray-900 text-gray-300 hover:bg-gray-800">
                    Quantum Chemistry
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
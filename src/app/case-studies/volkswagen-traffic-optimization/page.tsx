// src/app/case-studies/volkswagen-traffic-optimization/page.tsx
'use client'

import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { useState } from 'react'

// First, we need to add the tabs component:
// npx shadcn@latest add tabs

export default function VolkswagenCaseStudy() {
  const [showImplementation, setShowImplementation] = useState(false)

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
            <h1 className="text-4xl font-bold text-white">Volkswagen{'&apos;'}s Traffic Flow Optimization</h1>
            <span className="px-3 py-1 rounded-full text-sm bg-blue-900/60 text-blue-200">
              Intermediate
            </span>
          </div>
          <div className="flex gap-2 mb-6">
            <span className="px-3 py-1 rounded-full text-sm bg-gray-900 text-gray-300 border border-gray-800">
              automotive
            </span>
            <span className="px-3 py-1 rounded-full text-sm bg-gray-900 text-gray-300 border border-gray-800">
              optimization
            </span>
            <span className="px-3 py-1 rounded-full text-sm bg-gray-900 text-gray-300 border border-gray-800">
              smart-cities
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
                    Volkswagen implemented quantum computing to optimize traffic flow in major cities, 
                    focusing on reducing congestion and emissions while improving travel times.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Challenge</h2>
                  <p className="text-gray-300">
                    Traditional traffic optimization methods struggle with the exponential complexity 
                    of routing thousands of vehicles through busy urban areas while considering 
                    real-time conditions and constraints.
                  </p>
                </section>

                <section className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-xl font-semibold text-white mb-3">Key Objectives</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="text-copper">•</span>
                      Minimize average travel time for all vehicles
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-copper">•</span>
                      Reduce traffic congestion in city centers
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-copper">•</span>
                      Lower overall emissions through optimal routing
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
                        The solution utilized quantum annealing to solve complex optimization problems, 
                        mapping traffic flow to a quantum system where the ground state represents 
                        the optimal traffic configuration.
                      </p>
                    </Card>

                    <Card className="bg-gray-900/50 border-gray-800 p-6">
                      <h3 className="text-lg font-semibold text-white mb-3">Algorithm Details</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>Binary quadratic model for traffic representation</li>
                        <li>Real-time quantum annealing optimization</li>
                        <li>Hybrid quantum-classical processing pipeline</li>
                        <li>Custom constraint handling methods</li>
                      </ul>
                    </Card>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Hardware & Infrastructure</h2>
                  <p className="text-gray-300">
                    The system runs on D-Wave{'&apos;'}s quantum annealing hardware, integrated with 
                    classical preprocessing and post-processing systems for real-world deployment.
                  </p>
                </section>
              </TabsContent>

              <TabsContent value="impact" className="space-y-6 mt-6">
                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Results & Impact</h2>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <Card className="bg-gray-900/50 border-gray-800 p-6">
                      <h3 className="text-lg font-semibold text-copper mb-2">Traffic Reduction</h3>
                      <p className="text-4xl font-bold text-white mb-2">26%</p>
                      <p className="text-gray-400">Average congestion decrease</p>
                    </Card>
                    <Card className="bg-gray-900/50 border-gray-800 p-6">
                      <h3 className="text-lg font-semibold text-copper mb-2">Time Saved</h3>
                      <p className="text-4xl font-bold text-white mb-2">17min</p>
                      <p className="text-gray-400">Average per journey</p>
                    </Card>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Environmental Impact</h2>
                  <p className="text-gray-300 mb-4">
                    The optimization led to significant environmental improvements through 
                    reduced idle time and more efficient routing:
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="bg-gray-900/50 border-gray-800 p-6">
                      <h3 className="text-lg font-semibold text-copper mb-2">CO2 Reduction</h3>
                      <p className="text-3xl font-bold text-white">18%</p>
                    </Card>
                    <Card className="bg-gray-900/50 border-gray-800 p-6">
                      <h3 className="text-lg font-semibold text-copper mb-2">Fuel Saved</h3>
                      <p className="text-3xl font-bold text-white">21%</p>
                    </Card>
                    <Card className="bg-gray-900/50 border-gray-800 p-6">
                      <h3 className="text-lg font-semibold text-copper mb-2">Noise Reduction</h3>
                      <p className="text-3xl font-bold text-white">15%</p>
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
                  <li>• D-Wave Quantum Annealer</li>
                  <li>• Custom Optimization Software</li>
                  <li>• Real-time Traffic Systems</li>
                  <li>• Cloud Integration Platform</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Project Scale</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• 10,000+ Vehicles</li>
                  <li>• 3 Major Cities</li>
                  <li>• 2 Year Implementation</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Related Topics</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-gray-900 text-gray-300 hover:bg-gray-800">
                    Quantum Annealing
                  </Badge>
                  <Badge className="bg-gray-900 text-gray-300 hover:bg-gray-800">
                    Smart Cities
                  </Badge>
                  <Badge className="bg-gray-900 text-gray-300 hover:bg-gray-800">
                    Traffic Optimization
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
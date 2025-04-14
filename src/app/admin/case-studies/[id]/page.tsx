import { createServerClient } from '@/lib/supabase-server';
import { Database } from '@/types/supabase';
import { notFound } from 'next/navigation';

type CaseStudy = Database['public']['Tables']['case_studies']['Row'];

export default async function EditCaseStudyPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServerClient();
  const isNew = params.id === 'new';

  // Fetch case study if editing
  const { data: caseStudy } = !isNew
    ? await supabase
        .from('case_studies')
        .select('*')
        .eq('id', params.id)
        .single()
    : { data: null };

  // Fetch related data for dropdowns
  const { data: industries } = await supabase
    .from('industries')
    .select('slug, name')
    .order('name');

  const { data: algorithms } = await supabase
    .from('algorithms')
    .select('slug, name')
    .order('name');

  const { data: personas } = await supabase
    .from('personas')
    .select('slug, name')
    .order('name');

  if (!isNew && !caseStudy) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">
        {isNew ? 'Add New Case Study' : 'Edit Case Study'}
      </h1>

      <form action="/api/case-studies" method="POST" className="space-y-6">
        {!isNew && <input type="hidden" name="id" value={caseStudy.id} />}

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={caseStudy?.title}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700"
          >
            Slug
          </label>
          <input
            type="text"
            name="slug"
            id="slug"
            defaultValue={caseStudy?.slug}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={3}
            defaultValue={caseStudy?.description || ''}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            name="content"
            id="content"
            rows={10}
            defaultValue={caseStudy?.content || ''}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="partner_company"
            className="block text-sm font-medium text-gray-700"
          >
            Partner Company
          </label>
          <input
            type="text"
            name="partner_company"
            id="partner_company"
            defaultValue={caseStudy?.partner_company || ''}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="quantum_companies"
            className="block text-sm font-medium text-gray-700"
          >
            Quantum Companies
          </label>
          <input
            type="text"
            name="quantum_companies"
            id="quantum_companies"
            defaultValue={caseStudy?.quantum_companies?.join(', ') || ''}
            placeholder="Comma-separated list"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700"
          >
            URL
          </label>
          <input
            type="url"
            name="url"
            id="url"
            defaultValue={caseStudy?.url || ''}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Industries
          </label>
          <div className="mt-2 space-y-2">
            {industries?.map((industry) => (
              <label key={industry.slug} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="industries[]"
                  value={industry.slug}
                  defaultChecked={caseStudy?.industries?.includes(industry.slug)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2">{industry.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Algorithms
          </label>
          <div className="mt-2 space-y-2">
            {algorithms?.map((algorithm) => (
              <label key={algorithm.slug} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="algorithms[]"
                  value={algorithm.slug}
                  defaultChecked={caseStudy?.algorithms?.includes(algorithm.slug)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2">{algorithm.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Personas
          </label>
          <div className="mt-2 space-y-2">
            {personas?.map((persona) => (
              <label key={persona.slug} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="personas[]"
                  value={persona.slug}
                  defaultChecked={caseStudy?.personas?.includes(persona.slug)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2">{persona.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="qubits_used"
            className="block text-sm font-medium text-gray-700"
          >
            Qubits Used
          </label>
          <input
            type="number"
            name="qubits_used"
            id="qubits_used"
            defaultValue={caseStudy?.qubits_used || ''}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="quantum_hardware"
            className="block text-sm font-medium text-gray-700"
          >
            Quantum Hardware
          </label>
          <input
            type="text"
            name="quantum_hardware"
            id="quantum_hardware"
            defaultValue={caseStudy?.quantum_hardware?.join(', ') || ''}
            placeholder="Comma-separated list"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="classical_hardware"
            className="block text-sm font-medium text-gray-700"
          >
            Classical Hardware
          </label>
          <input
            type="text"
            name="classical_hardware"
            id="classical_hardware"
            defaultValue={caseStudy?.classical_hardware?.join(', ') || ''}
            placeholder="Comma-separated list"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="published"
              defaultChecked={caseStudy?.published}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2">Published</span>
          </label>

          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={caseStudy?.featured}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2">Featured</span>
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {isNew ? 'Create Case Study' : 'Update Case Study'}
          </button>
        </div>
      </form>
    </div>
  );
} 
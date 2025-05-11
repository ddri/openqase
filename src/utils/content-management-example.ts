/**
 * This file provides examples of how to use the content management and form validation utilities.
 * It's intended as a reference for implementing the standardization plan.
 */

import { 
  fetchContentItems, 
  fetchContentItem, 
  saveContentItem, 
  deleteContentItem, 
  updatePublishedStatus,
  RELATIONSHIP_CONFIGS
} from './content-management';

import {
  validateFormValues,
  calculateCompletionPercentage,
  isTabComplete,
  validators,
  createContentValidationRules
} from './form-validation';

/**
 * Example: Fetching a list of algorithms with filtering and pagination
 */
async function fetchAlgorithmsExample() {
  const { data, error, count, page, pageSize } = await fetchContentItems({
    contentType: 'algorithms',
    includeUnpublished: true, // Include unpublished items (admin only)
    page: 1,
    pageSize: 10,
    filters: {
      // Optional filters
      // name: 'Quantum Algorithm'
    },
    orderBy: 'updated_at',
    orderDirection: 'desc'
  });

  if (error) {
    console.error('Error fetching algorithms:', error);
    return;
  }

  console.log(`Fetched ${data?.length} of ${count} algorithms (page ${page}, pageSize ${pageSize})`);
  return data;
}

/**
 * Example: Fetching a single algorithm with relationships
 */
async function fetchAlgorithmWithRelationshipsExample(slug: string) {
  const { data, error } = await fetchContentItem({
    contentType: 'algorithms',
    identifier: slug,
    identifierType: 'slug',
    includeUnpublished: true, // Include unpublished items (admin only)
    includeRelationships: [
      {
        relationshipConfig: RELATIONSHIP_CONFIGS.algorithms.caseStudies,
        fields: 'id, slug, title, description'
      }
    ]
  });

  if (error) {
    console.error('Error fetching algorithm:', error);
    return;
  }

  console.log(`Fetched algorithm: ${(data as any)?.name}`);
  console.log(`Related case studies: ${(data as any)?.related_case_studies?.length || 0}`);
  return data;
}

/**
 * Example: Creating a new algorithm
 */
async function createAlgorithmExample() {
  const { data, error } = await saveContentItem({
    contentType: 'algorithms',
    data: {
      name: 'New Quantum Algorithm',
      slug: 'new-quantum-algorithm',
      description: 'A description of the new quantum algorithm',
      main_content: 'Detailed content about the algorithm',
      quantum_advantage: 'The quantum advantage of this algorithm',
      use_cases: ['Finance', 'Healthcare'],
      published: false // Start as unpublished
    }
  });

  if (error) {
    console.error('Error creating algorithm:', error);
    return;
  }

  console.log(`Created algorithm with ID: ${data?.id}`);
  return data;
}

/**
 * Example: Updating an existing algorithm with relationships
 */
async function updateAlgorithmExample(id: string, caseStudyIds: string[]) {
  const { data, error } = await saveContentItem({
    contentType: 'algorithms',
    id,
    data: {
      main_content: 'Updated content about the algorithm',
      updated_at: new Date().toISOString()
    },
    relationships: [
      {
        relationshipConfig: RELATIONSHIP_CONFIGS.algorithms.caseStudies,
        relatedIds: caseStudyIds
      }
    ]
  });

  if (error) {
    console.error('Error updating algorithm:', error);
    return;
  }

  console.log(`Updated algorithm: ${(data as any)?.name}`);
  return data;
}

/**
 * Example: Publishing an algorithm
 */
async function publishAlgorithmExample(id: string) {
  const { data, error } = await updatePublishedStatus({
    contentType: 'algorithms',
    id,
    published: true
  });

  if (error) {
    console.error('Error publishing algorithm:', error);
    return;
  }

  console.log(`Published algorithm: ${(data as any)?.name}`);
  return data;
}

/**
 * Example: Deleting an algorithm
 */
async function deleteAlgorithmExample(id: string) {
  const { success, error } = await deleteContentItem({
    contentType: 'algorithms',
    id,
    relationshipConfigs: [RELATIONSHIP_CONFIGS.algorithms.caseStudies]
  });

  if (!success) {
    console.error('Error deleting algorithm:', error);
    return;
  }

  console.log('Algorithm deleted successfully');
  return success;
}

/**
 * Example: Form validation for an algorithm
 */
function validateAlgorithmFormExample() {
  // Form values from a React component's state
  const values = {
    name: 'Quantum Algorithm',
    slug: 'quantum-algorithm',
    description: 'A description of the quantum algorithm',
    main_content: '', // Missing required field
    quantum_advantage: 'The quantum advantage',
    related_case_studies: [] // Missing required relationship
  };

  // Get validation rules for algorithms
  const validationRules = createContentValidationRules('algorithm');

  // Validate the form
  const issues = validateFormValues({
    values,
    validationRules
  });

  // Calculate completion percentage
  const completionPercentage = calculateCompletionPercentage({
    values,
    validationRules
  });

  // Check if a specific tab is complete
  const isContentTabComplete = isTabComplete({
    values,
    validationRules,
    tabName: 'content'
  });

  console.log('Validation issues:', issues);
  console.log(`Completion percentage: ${completionPercentage}%`);
  console.log(`Is content tab complete: ${isContentTabComplete}`);

  // Return true if no issues found
  return Object.keys(issues).length === 0;
}

/**
 * Example: Custom validation rules
 */
function customValidationExample() {
  // Custom validation rules for a specific form
  const customRules = [
    {
      field: 'email',
      tab: 'contact',
      label: 'Email is required and must be valid',
      validator: validators.and(validators.required, validators.isEmail)
    },
    {
      field: 'website',
      tab: 'contact',
      label: 'Website must be a valid URL',
      validator: validators.or(validators.isUrl, (value: string) => value === '')
    },
    {
      field: 'age',
      tab: 'personal',
      label: 'Age must be between 18 and 120',
      validator: validators.and(
        validators.isNumber,
        validators.min(18),
        validators.max(120)
      )
    }
  ];

  // Form values
  const values = {
    email: 'invalid-email',
    website: 'https://example.com',
    age: 25
  };

  // Validate the form
  const issues = validateFormValues({
    values,
    validationRules: customRules
  });

  console.log('Custom validation issues:', issues);
  return Object.keys(issues).length === 0;
}

// Export examples for reference
export const examples = {
  fetchAlgorithmsExample,
  fetchAlgorithmWithRelationshipsExample,
  createAlgorithmExample,
  updateAlgorithmExample,
  publishAlgorithmExample,
  deleteAlgorithmExample,
  validateAlgorithmFormExample,
  customValidationExample
};
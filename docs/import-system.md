# Scripts Documentation

OpenQase includes various utility scripts for development, administration, and data management. The import system is highly experimental so this is for reference only for the brave at heart.

## Import System Scripts

OpenQase includes a comprehensive import system designed to handle bulk imports of case studies from JSON exports (e.g., from Qookie or other platforms).

## Core Scripts

### 🎯 Main Import Script
**`scripts/import-case-studies-with-mapping.ts`**
- Main import engine with entity mapping
- Handles JSON validation, duplicate detection, and database insertion
- Creates entity relationships (algorithms, industries, personas)
- Generates comprehensive import reports

**Key Features:**
- **Dry Run Mode**: Analyze imports without database changes
- **Duplicate Detection**: Checks for existing case studies by title and slug
- **Entity Relationship Mapping**: Uses entity-mapping.json for consistent relationships
- **Batch Tracking**: Assigns batch names for import tracking and rollback
- **Comprehensive Reporting**: Detailed success/failure reports with statistics
- **Error Handling**: Continues processing on individual file failures

### 🏷️ Batch Management
**`scripts/batch-name-generator.ts`**
- Generates human-readable batch names (QK-001, QK-002, etc.)
- Ensures sequential naming for admin interface
- Tracks import history and enables rollback capabilities

### 🗺️ Entity Mapping
**`scripts/entity-mapping.json`**
- Predefined mappings between import data and OpenQase entities
- Maps algorithm names, industry categories, and persona types
- Prevents duplicate entity creation and ensures consistency

**Structure:**
```json
{
  "algorithms": {
    "Display Name": "database-slug",
    "Quantum Approximate Optimization Algorithm (QAOA)": "quantum-approximate-optimization-algorithm"
  },
  "industries": {
    "Pharmaceutical": "pharmaceutical",
    "AI and Machine Learning": "ai-machine-learning"
  },
  "personas": {
    "Quantum Algorithm Developer": "quantum-algorithm-developer",
    "Business Decision-Maker": "business-decision-maker"
  }
}
```

**Adding New Mappings:** To support new entities in imports, add them to the appropriate section with their database slug. Set value to `null` to skip mapping for that entity.

### 🌱 Entity Population
**`scripts/populate-entities.ts`**
- Utility for seeding reference entities (algorithms, industries, personas)
- Ensures all mapped entities exist in the database
- Can be run before imports to prepare the system

## Usage

### Basic Import
```bash
# Analyze import without committing (dry run)
tsx scripts/import-case-studies-with-mapping.ts /path/to/json/files

# Import with database commit
tsx scripts/import-case-studies-with-mapping.ts /path/to/json/files --commit
```

### Expected JSON Format
The importer expects JSON files with this structure:
```json
{
  "id": "unique-id",
  "title": "Case Study Title",
  "summary": "Brief description",
  "introduction": "Introduction content",
  "challenge": "Challenge description",
  "solution": "Solution details",
  "implementation": "Implementation details",
  "results_and_business_impact": "Results",
  "future_directions": "Future directions",
  "references": [
    {
      "title": "Reference Title",
      "authors": ["Author 1", "Author 2"],
      "journal": "Journal Name",
      "year": 2024,
      "url": "https://example.com"
    }
  ],
  "furtherReading": [
    {
      "title": "Resource Title",
      "url": "https://example.com",
      "description": "Resource description"
    }
  ],
  "advancedMetadata": {
    "algorithms": ["Algorithm Name 1", "Algorithm Name 2"],
    "industries": ["Industry 1", "Industry 2"],
    "personas": ["Persona 1", "Persona 2"]
  }
}
```

## Features

### 🔍 Entity Mapping
- **Intelligent Matching**: Uses predefined mappings to connect import data with existing entities
- **Fuzzy Matching**: Handles variations in naming conventions
- **Unmapped Tracking**: Reports entities that couldn't be mapped for manual review

### 📊 Batch Tracking
- **Unique Batch IDs**: UUID-based tracking for technical operations
- **Human-Readable Names**: QK-001 format for admin interface
- **Import Metadata**: Tracks source, timestamp, and batch information

### 🚫 Duplicate Prevention
- **Title Matching**: Prevents duplicate case studies based on title similarity
- **Slug Validation**: Ensures unique URL slugs
- **Comprehensive Reporting**: Shows existing duplicates for review

### 📈 Comprehensive Reporting
```
🎯 ENTITY MAPPING REPORT
=======================

📊 Mapping Success:
   ✅ Algorithm relationships: 45
   ✅ Industry relationships: 67
   ✅ Persona relationships: 89
   📈 Total relationships: 201

⚠️  Unmapped Algorithms (3):
   • Quantum Annealing V2
   • Custom Algorithm Name
   • Proprietary Method X
```

## Database Schema

The import system creates the following database records:

### Case Studies Table
```sql
INSERT INTO case_studies (
  title, slug, description, main_content, 
  academic_references, resource_links,
  import_batch_id, import_batch_name, 
  import_source, import_timestamp,
  original_qookie_id, original_qookie_slug
);
```

### Relationship Tables
- `algorithm_case_study_relations`
- `case_study_industry_relations` 
- `case_study_persona_relations`

## Admin Interface Integration

Imported case studies appear in the admin interface with:
- **Batch Filtering**: Filter by import batch (QK-001, QK-002, etc.)
- **Source Tracking**: Identify import source (qookie-export, manual, etc.)
- **Bulk Operations**: Publish, unpublish, or delete by batch
- **Import History**: View all historical imports

## Best Practices

### Before Import
1. **Backup Database**: Always backup before large imports
2. **Test Run**: Use dry run mode first to validate data
3. **Check Entities**: Ensure required entities exist in the system
4. **Review Mapping**: Update `entity-mapping.json` if needed

### During Import
1. **Monitor Output**: Watch for unmapped entities and errors
2. **Check Duplicates**: Review any detected duplicates
3. **Validate Results**: Confirm entity relationships are correct

### After Import
1. **Review Admin Interface**: Check imported content in `/admin/case-studies`
2. **Publish Content**: Use bulk operations to publish relevant case studies
3. **Update Documentation**: Document any new entity mappings added

## Troubleshooting

### Common Issues
- **Missing Entities**: Run `populate-entities.ts` to create required reference data
- **Mapping Errors**: Update `entity-mapping.json` with new entity names
- **Duplicate Detection**: Review and resolve any title/slug conflicts
- **Database Permissions**: Ensure service role key has proper permissions

### Rollback
```sql
-- Rollback by batch ID
DELETE FROM case_studies WHERE import_batch_id = 'your-batch-uuid';

-- Rollback by batch name  
DELETE FROM case_studies WHERE import_batch_name = 'QK-001';
```

## Admin & Utility Scripts

### 🔧 Development Setup
**`scripts/setup-local.sh`**
- Automated local environment setup
- Initializes Supabase, runs migrations, and seeds data
- One-command setup for new developers

**`scripts/setup-admin.ts`**
- Creates admin user accounts
- Sets up proper permissions and roles
- Referenced in package.json as `npm run setup-admin`

**`scripts/enable-dev-mode.js`**
- Toggles development mode features
- Enables debugging and additional logging
- Referenced in package.json

### 📊 Performance & Monitoring
**`scripts/performance-monitor.ts`**
- Comprehensive performance monitoring
- Tracks page load times, database queries, and resource usage
- Generates performance reports

**`scripts/page-load-performance.js`**
- Automated page load testing
- Measures performance across different routes
- Referenced in package.json as `npm run test-performance`

### 🗄️ Database Utilities
**`scripts/get-schema.ts`**
- Extracts current database schema
- Useful for migrations and documentation
- Generates schema snapshots for comparison

## Usage Examples

### Development Setup
```bash
# Complete local setup
./scripts/setup-local.sh

# Create admin user
npm run setup-admin

# Enable development features
npm run enable-dev-mode
```

### Performance Testing
```bash
# Run performance tests
npm run test-performance

# Monitor performance (custom script)
tsx scripts/performance-monitor.ts
```

### Database Management
```bash
# Extract current schema
tsx scripts/get-schema.ts > current-schema.sql
```
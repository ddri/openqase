# Case Study Import System - Implementation Plan

## Overview

This document outlines the comprehensive plan for safely implementing and deploying the Qookie JSON case study import system into OpenQase. The system will import 100+ case studies while maintaining data integrity, providing audit trails, and ensuring safe rollback capabilities.

## Background

- **Source**: Qookie JSON export files containing case study data
- **Target**: OpenQase database with proper entity relationships
- **Scope**: ~105 case studies with algorithms, industries, and personas relationships
- **Risk Level**: HIGH - Critical production data that cannot be corrupted

## System Architecture

### Import Scripts (Completed)
- `import-case-study-test.ts` - Single case study validation and testing
- `import-case-studies-batch.ts` - Batch processing with fuzzy entity matching  
- `import-case-studies-with-mapping.ts` - Production-ready with exact entity mapping
- `entity-mapping.json` - Predefined mappings from Qookie to OpenQase entities
- `populate-entities.ts` - Database population utility for missing entities

### Data Flow
```
Qookie JSON Files → Entity Mapping → Validation → Database Insert → Relationship Creation → Audit Trail
```

## Phase 1: Data Safety & Traceability

### Priority: CRITICAL
### Timeline: 1 day
### Owner: Development Team

#### Database Schema Updates

Add import tracking fields to the `case_studies` table:

```sql
-- Import tracking and audit trail
ALTER TABLE case_studies ADD COLUMN import_batch_id UUID;
ALTER TABLE case_studies ADD COLUMN import_source TEXT DEFAULT NULL;
ALTER TABLE case_studies ADD COLUMN import_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE case_studies ADD COLUMN original_qookie_id TEXT DEFAULT NULL;
ALTER TABLE case_studies ADD COLUMN original_qookie_slug TEXT DEFAULT NULL;

-- Indexes for performance
CREATE INDEX idx_case_studies_import_batch_id ON case_studies(import_batch_id);
CREATE INDEX idx_case_studies_import_source ON case_studies(import_source);
CREATE INDEX idx_case_studies_import_timestamp ON case_studies(import_timestamp);
```

#### Benefits
- **Rollback Capability**: Delete all records from specific batch
- **Debugging**: Identify issues by import batch
- **Analytics**: Track import success/failure rates
- **Data Lineage**: Maintain audit trail for compliance
- **Batch Updates**: Update all records from specific source

#### Script Updates Required
Update all import scripts to populate new tracking fields:
- Generate UUID for each import batch
- Set `import_source = 'qookie-export'`
- Populate original Qookie identifiers if available

#### Acceptance Criteria
- [ ] Database schema updated with tracking fields
- [ ] All import scripts populate tracking data
- [ ] Indexes created for query performance
- [ ] Migration tested on development database

## Phase 2: Safe Testing Pipeline

### Priority: HIGH
### Timeline: 2 days
### Owner: Development Team

#### Backup Strategy

**Before ANY import operations:**
```bash
# Create timestamped backup
pg_dump "postgresql://postgres:postgres@localhost:54322/postgres" > "backup-$(date +%Y%m%d-%H%M%S).sql"
```

**Backup verification:**
```bash
# Test restore capability
psql "postgresql://postgres:postgres@localhost:54322/postgres_test" < backup-file.sql
```

#### Testing Methodology

**Step 1: Micro Batch Testing (5-10 case studies)**
- Create test directory with 5-10 representative JSON files
- Run analysis mode first: `tsx scripts/import-case-studies-with-mapping.ts /test/path`
- Import with commit flag: `tsx scripts/import-case-studies-with-mapping.ts /test/path --commit`
- Manual verification in admin UI

**Step 2: Small Batch Testing (25-50 case studies)**
- Expand to larger representative sample
- Focus on edge cases and error scenarios
- Verify performance with larger datasets

**Step 3: Load Testing**
- Test with 100+ case studies to identify bottlenecks
- Monitor database performance and memory usage
- Validate batch processing limits

#### Import Validation Checklist

For each test batch, verify:
- [ ] **Entity Relationships**: All algorithms, industries, personas linked correctly
- [ ] **Content Quality**: Proper markdown formatting, headings, content length
- [ ] **References**: Resource links imported and formatted correctly
- [ ] **Uniqueness**: No duplicate slugs or titles
- [ ] **Audit Trail**: Batch tracking data properly populated
- [ ] **Performance**: Import completes within acceptable timeframe
- [ ] **Error Handling**: Failed imports don't corrupt successful ones

#### Risk Mitigation Controls

**Import Size Limits:**
- Maximum 100 case studies per batch
- Rate limiting between database operations
- Memory usage monitoring during large imports

**Data Integrity Checks:**
```bash
# Post-import validation queries
SELECT COUNT(*) FROM case_studies WHERE import_batch_id = '<batch-id>';
SELECT COUNT(*) FROM algorithm_case_study_relations acsr 
  JOIN case_studies cs ON acsr.case_study_id = cs.id 
  WHERE cs.import_batch_id = '<batch-id>';
```

#### Acceptance Criteria
- [ ] Backup and restore procedures documented and tested
- [ ] Import validation checklist completed for test batches
- [ ] Performance benchmarks established
- [ ] Error scenarios identified and handled
- [ ] Data integrity verification procedures established

## Phase 3: Admin UI Verification System

### Priority: HIGH  
### Timeline: 3 days
### Owner: Development Team

#### Batch Management Dashboard

**Location**: `/admin/imports`

**Features Required:**
- List all import batches with metadata
- Batch statistics (success/failure counts, timing)
- Drill-down to individual case studies per batch
- Import status indicators (pending, processing, completed, failed)

**UI Components:**
```typescript
interface ImportBatch {
  id: string;
  source: string;
  timestamp: Date;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  totalFiles: number;
  successCount: number;
  errorCount: number;
  duplicateCount: number;
}
```

#### Import Preview Interface

**Pre-Import Analysis:**
- Upload JSON files for analysis (without committing)
- Display entity mapping results
- Show content preview with formatting
- Highlight potential conflicts or issues
- Confirm/cancel before actual import

**Real-time Import Monitoring:**
- Progress bar for batch operations
- Live error/success counters
- Streaming log output
- Cancel operation capability

#### Case Studies Admin Enhancement

**Add Import Information to Existing Views:**
- Import source badge in case studies list
- Batch ID reference with clickable link
- Import timestamp display
- Filter by import source/batch

#### Rollback Interface

**Safety Features:**
- Batch rollback with confirmation dialog
- Preview of items to be deleted
- Cascade deletion warning (relationships will be removed)
- Backup recommendation before rollback

#### Acceptance Criteria
- [ ] Batch management dashboard fully functional
- [ ] Import preview shows accurate analysis
- [ ] Real-time monitoring during imports
- [ ] Rollback functionality with safety checks
- [ ] Integration with existing admin interface
- [ ] User access controls implemented

## Phase 4: Production Deployment Process

### Priority: MEDIUM
### Timeline: 2 days  
### Owner: Development Team + QA

#### Pre-Production Checklist

**Environment Preparation:**
- [ ] All database migrations applied
- [ ] Import scripts deployed and tested
- [ ] Admin UI features deployed and accessible
- [ ] Backup procedures documented and tested
- [ ] Rollback scripts prepared and tested

**Data Validation:**
- [ ] Complete analysis run on full dataset
- [ ] Entity mapping verification complete
- [ ] Duplicate detection verified
- [ ] Content quality spot-checks complete

#### Production Import Workflow

**Step 1: Final Analysis**
```bash
# Complete dry-run analysis on full dataset
tsx scripts/import-case-studies-with-mapping.ts /path/to/production/files > analysis-report.txt
```

**Step 2: Staged Import**
- Batch 1: 10 case studies (manual verification)
- Batch 2: 25 case studies (automated verification)
- Batch 3: 50 case studies (performance monitoring)
- Remaining batches: 50 case studies each

**Step 3: Post-Import Verification**
```sql
-- Data quality checks
SELECT 
  import_batch_id,
  COUNT(*) as case_studies,
  COUNT(DISTINCT slug) as unique_slugs,
  AVG(LENGTH(main_content)) as avg_content_length
FROM case_studies 
WHERE import_source = 'qookie-export'
GROUP BY import_batch_id;

-- Relationship integrity
SELECT 
  'algorithms' as type,
  COUNT(*) as relationships
FROM algorithm_case_study_relations acsr
JOIN case_studies cs ON acsr.case_study_id = cs.id
WHERE cs.import_source = 'qookie-export'

UNION ALL

SELECT 
  'industries' as type,
  COUNT(*) as relationships  
FROM case_study_industry_relations csir
JOIN case_studies cs ON csir.case_study_id = cs.id
WHERE cs.import_source = 'qookie-export'

UNION ALL

SELECT 
  'personas' as type,
  COUNT(*) as relationships
FROM case_study_persona_relations cspr  
JOIN case_studies cs ON cspr.case_study_id = cs.id
WHERE cs.import_source = 'qookie-export';
```

#### Monitoring and Alerting

**Success Metrics:**
- Import completion rate > 95%
- Average processing time per case study
- Database performance impact
- Error rate and types

**Alert Conditions:**
- Import batch failure
- Duplicate slug conflicts  
- Database connection issues
- Performance degradation

#### Acceptance Criteria
- [ ] Staged import process completed successfully
- [ ] All data quality checks passed
- [ ] Performance metrics within acceptable ranges
- [ ] Admin UI showing accurate import status
- [ ] Rollback procedures tested and documented

## Phase 5: Rollback and Recovery System

### Priority: MEDIUM
### Timeline: 1 day
### Owner: Development Team

#### Rollback Script Development

**Create**: `scripts/rollback-import-batch.ts`

**Features:**
- Identify all records from specific batch
- Show preview of items to be deleted
- Cascade delete relationships
- Confirm before deletion
- Generate rollback report

**Safety Checks:**
- Require explicit batch ID confirmation
- Show count of items to be deleted
- Require backup confirmation
- Log all rollback operations

#### Recovery Procedures

**Partial Rollback:**
- Remove specific case studies from batch
- Maintain other successful imports
- Update batch statistics

**Complete Rollback:**
- Remove entire import batch
- Restore from backup if needed
- Clean up orphaned relationships

**Emergency Recovery:**
- Database restoration procedures
- Point-in-time recovery options
- Data validation after recovery

#### Acceptance Criteria
- [ ] Rollback scripts tested with sample data
- [ ] Emergency recovery procedures documented
- [ ] Backup and restore procedures validated
- [ ] Administrative access controls implemented

## Success Criteria

### Technical Success
- [ ] All 105+ case studies imported successfully
- [ ] Entity relationships correctly established
- [ ] Content formatting meets quality standards
- [ ] No data corruption or loss
- [ ] Performance within acceptable limits

### Operational Success  
- [ ] Admin UI provides complete visibility
- [ ] Rollback capabilities tested and functional
- [ ] Audit trail complete and accessible
- [ ] Team trained on import procedures
- [ ] Documentation complete and current

### Business Success
- [ ] Case studies accessible in production application
- [ ] Search and filtering working correctly
- [ ] User experience improved with new content
- [ ] Content management workflow enhanced

## Risk Assessment

### High Risk Items
- **Data Corruption**: Mitigated by backup procedures and staged deployment
- **Production Downtime**: Mitigated by development environment testing
- **Duplicate Content**: Mitigated by comprehensive duplicate detection
- **Performance Impact**: Mitigated by batch processing and monitoring

### Medium Risk Items
- **Import Failures**: Handled by error recovery and retry mechanisms
- **Content Quality Issues**: Addressed by validation and preview systems
- **User Access Problems**: Managed through proper authentication controls

### Low Risk Items
- **Minor Formatting Issues**: Can be corrected post-import
- **Admin UI Usability**: Iterative improvement based on feedback

## Timeline Summary

| Phase | Duration | Key Deliverables |
|-------|----------|------------------|
| Phase 1 | 1 day | Database schema, import tracking |
| Phase 2 | 2 days | Testing pipeline, validation procedures |
| Phase 3 | 3 days | Admin UI, monitoring interfaces |
| Phase 4 | 2 days | Production deployment, verification |
| Phase 5 | 1 day | Rollback system, recovery procedures |

**Total Estimated Duration: 9 days**

## Post-Implementation

### Monitoring
- Weekly data quality reports
- Import performance metrics
- User feedback on case study content
- System health monitoring

### Maintenance
- Regular backup validation
- Import script updates as needed
- Admin UI enhancements based on usage
- Documentation updates

### Future Enhancements
- Automated import scheduling
- Content update workflows
- Enhanced duplicate detection
- Integration with other data sources

---

**Document Version**: 1.0  
**Last Updated**: January 30, 2025  
**Next Review**: Post-implementation  
**Approved By**: CTO
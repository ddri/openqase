# Production Deployment

Complete guide to deploying OpenQase to production environments.

## Environment Variables

### Required Variables

```bash
# Public URLs
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Supabase
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Email Service (Resend)
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=noreply@your-domain.com

# Admin Setup
ADMIN_EMAIL=admin@your-domain.com
ADMIN_PASSWORD=your-secure-password
```

### Optional Variables

```bash
# Analytics
VERCEL_ANALYTICS_ID=your-vercel-analytics-id

# Error Monitoring (Sentry)
SENTRY_DSN=your-sentry-dsn
SENTRY_ORG=your-sentry-org
SENTRY_PROJECT=your-sentry-project
SENTRY_AUTH_TOKEN=your-sentry-auth-token
```

## Pre-Deployment Checklist

### 1. Database Setup

**Apply Migrations**:
```bash
# Push all migrations to production database
supabase db push --linked
```

**Verify Schema**:
```sql
-- Check that import system columns exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'case_studies' 
AND column_name IN (
  'import_batch_name', 'year', 'import_batch_id', 
  'import_source', 'import_timestamp', 
  'original_qookie_id', 'original_qookie_slug'
);
```

### 2. Security Configuration

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Proper authentication policies configured
- ✅ Service role key secured and not exposed
- ✅ CORS settings configured for your domain
- ✅ SSL/TLS certificates configured

### 3. Content Preparation

**Seed Reference Data**:
```bash
# Ensure algorithms, industries, and personas exist
tsx scripts/populate-entities.ts
```

**Import Case Studies** (if needed):
```bash
# Test with dry run first
tsx scripts/import-case-studies-with-mapping.ts /path/to/json/files

# Import with commit
tsx scripts/import-case-studies-with-mapping.ts /path/to/json/files --commit
```

## Deployment Platforms

### Vercel (Recommended)

1. **Connect Repository**:
   - Link your GitHub repository to Vercel
   - Configure build settings (default Next.js settings work)

2. **Environment Variables**:
   - Add all required environment variables in Vercel dashboard
   - Use environment-specific values (production, preview, development)

3. **Deploy**:
   - Automatic deployment on push to main branch
   - Preview deployments for pull requests

4. **Domain Configuration**:
   - Add your custom domain in Vercel dashboard
   - Configure DNS records as instructed

### Other Platforms

**Requirements**:
- Node.js 18+ support
- Build command: `npm run build`
- Start command: `npm run start`
- Environment variable support

**Popular alternatives**:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Post-Deployment Setup

### 1. Admin User Setup

Create your first admin user:

```bash
# Update ADMIN_EMAIL in environment variables first
npm run setup-admin
```

Or manually via Supabase dashboard:
1. Create user in Authentication > Users
2. Add user ID to admin-related policies
3. Grant necessary permissions

### 2. Content Management

Access the admin interface at `/admin`:
- ✅ Case studies management and bulk operations
- ✅ Algorithm, industry, and persona management
- ✅ Import system for bulk data uploads
- ✅ Publishing workflows

### 3. Email Configuration

**Resend Setup**:
1. Create account at [resend.com](https://resend.com)
2. Add and verify your domain
3. Generate API key and add to environment variables
4. Configure sender address (`RESEND_FROM_EMAIL`)

**Email Features**:
- Newsletter subscriptions
- Admin notifications
- System alerts

## Verification Steps

### Application Health Check

- [ ] Homepage loads correctly
- [ ] Case studies display properly
- [ ] Search functionality works
- [ ] Admin interface accessible
- [ ] Authentication working

### Import System Check

- [ ] Import scripts can connect to database
- [ ] Entity mappings load correctly
- [ ] Batch operations work in admin interface
- [ ] Import history displays properly

### Database Verification

```sql
-- Check data integrity
SELECT 
    COUNT(*) as total_case_studies,
    COUNT(CASE WHEN published = true THEN 1 END) as published,
    COUNT(CASE WHEN import_batch_name IS NOT NULL THEN 1 END) as imported
FROM case_studies;

-- Check relationships
SELECT 
    'algorithms' as entity_type,
    COUNT(*) as relationships
FROM algorithm_case_study_relations
UNION ALL
SELECT 
    'industries' as entity_type,
    COUNT(*) as relationships  
FROM case_study_industry_relations
UNION ALL
SELECT 
    'personas' as entity_type,
    COUNT(*) as relationships
FROM case_study_persona_relations;
```

## Monitoring & Maintenance

### Performance Monitoring

**Vercel Analytics**:
- Page views and user engagement
- Core Web Vitals tracking
- Geographic distribution

**Custom Metrics**:
- Newsletter subscription rates
- Content engagement
- Admin usage patterns

### Error Monitoring

**Sentry Integration**:
- Automatic error capture
- Performance monitoring
- Release tracking

**Health Checks**:
- Database connectivity
- External service availability
- Content delivery performance

### Backup Strategy

**Database Backups**:
- Automated daily backups via Supabase
- Point-in-time recovery available
- Manual backup before major changes

**Content Backups**:
- Regular exports of case studies
- Import system provides rollback capabilities
- Version control for configuration changes

## Rollback Procedures

### Application Rollback

**Vercel**:
1. Go to deployments in dashboard
2. Select previous working deployment
3. Click "Promote to Production"

### Database Rollback

**Import System Rollback**:
```sql
-- Rollback specific import batch
DELETE FROM case_studies WHERE import_batch_name = 'QK-XXX';
```

**Schema Rollback**:
```bash
# Revert to previous migration
supabase migration rollback
```

### Emergency Contacts

- Database issues: Supabase support
- Deployment issues: Vercel support  
- Email delivery: Resend support
- DNS/Domain: Your domain provider

## Security Considerations

### Environment Security

- ✅ Never commit actual environment values
- ✅ Use secure, randomly generated keys
- ✅ Rotate keys regularly
- ✅ Monitor for key exposure

### Application Security

- ✅ All database queries use prepared statements
- ✅ Input validation on all forms
- ✅ Rate limiting on API endpoints
- ✅ CSRF protection enabled

### Data Security

- ✅ RLS policies prevent unauthorized access
- ✅ Admin actions logged and auditable
- ✅ User data handled according to privacy policies
- ✅ Regular security updates applied

## Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
npm run build:analyze

# Static export (if applicable)
NEXT_STATIC_EXPORT=true npm run build
```

### Caching Strategy

- Static assets cached via CDN
- API responses cached appropriately
- Database queries optimized with indexes
- Image optimization enabled

### Content Delivery

- Images served via Supabase Storage or CDN
- Static content pre-generated at build time
- Dynamic content cached at edge locations 
#!/bin/bash

# OpenQase Local Development Setup Script
# This script helps set up your local development environment

set -e

echo "🚀 Setting up OpenQase local development environment..."

SUPCMD='supabase'

# Check if Supabase CLI is installed locally or if it should be installed through npm
if command -v supabase &> /dev/null; then
      echo "Found and using local Supabase install."
else
    echo "No local Supabase install found---using node module instead."
    SUPCMD='npx supabase'
fi

echo "Running with Supabase command: ${SUPCMD}"

# Start Supabase
echo "📦 Starting Supabase local instance..."
${SUPCMD} start

# Ask user about data setup
echo ""
echo "📊 Data Setup Options:"
echo "1. Use example data (recommended for contributors)"
echo "2. Use production data (requires private-data/production-seed.sql)"
echo "3. Skip data setup (empty database)"
echo ""

read -p "Choose an option (1-3): " choice

case $choice in
    1)
        echo "✅ Using example data from supabase/seed.sql"
        echo "   This will be automatically loaded by Supabase CLI"
        cp supabase/example-seed.sql supabase/seed.sql
        mkdir -p supabase/migrations
        cp supabase/template-migrations/202505* supabase/migrations/
        ;;
    2)
        if [ -f "private-data/production-seed.sql" ]; then
            echo "✅ Using production data from private-data/production-seed.sql"
            echo "   Copying to supabase/seed.sql..."
            cp private-data/production-seed.sql supabase/seed.sql
            mkdir -p supabase/migrations
            cp supabase/template-migrations/* supabase/migrations/
        else
            echo "❌ Production data file not found: private-data/production-seed.sql"
            echo "   Falling back to example data..."
            cp supabase/example-seed.sql supabase/seed.sql
            mkdir -p supabase/migrations
            cp supabase/template-migrations/202505* supabase/migrations/
        fi
        ;;
    3)
        echo "✅ Skipping data setup - empty database"
        echo "   Removing seed file..."
        # rm -f supabase/seed.sql
        ;;
    *)
        echo "❌ Invalid choice. Using example data..."
        cp supabase/example-seed.sql supabase/seed.sql
        mkdir -p supabase/migrations
        cp supabase/template-migrations/202505* supabase/migrations/
        ;;
esac

# Reset database to apply migrations and seed data
echo ""
echo "🔄 Resetting database to apply migrations and seed data..."
${SUPCMD} db reset

echo ""
echo "✅ Setup complete!"
echo ""
echo "🌐 Your local OpenQase instance is running at:"
echo "   - App: http://localhost:3000"
echo "   - Supabase Dashboard: http://localhost:54323"
echo ""
echo "📚 Next steps:"
echo "   1. Run 'npm run dev' to start the development server"
echo "   2. Visit http://localhost:3000 to see your app"
echo "   3. Use the Supabase Dashboard to manage your local database"
echo ""
echo "🔧 Useful commands:"
echo "   - supabase db reset    # Reset database with fresh data"
echo "   - supabase db diff     # See differences from production"
echo "   - supabase status      # Check local instance status" 

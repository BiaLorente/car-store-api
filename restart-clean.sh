#!/bin/bash

echo "🔄 Restarting Car Store API with clean caches..."

# Stop any running instances
echo "⏹️  Stopping running instances..."
pkill -f "ts-node src/interfaces/app.ts" 2>/dev/null || true

# Clear Node.js cache
echo "🧹 Clearing Node.js cache..."
rm -rf node_modules/.cache 2>/dev/null || true

# Clear TypeScript cache
echo "🧹 Clearing TypeScript cache..."
rm -rf .tsbuildinfo 2>/dev/null || true

# Clear database
echo "🗄️  Clearing database..."
psql "postgresql://carstore_user:carstore123@localhost:5432/carstore" -c "DELETE FROM vehicles;" 2>/dev/null || true

# Start application with PostgreSQL
echo "🚀 Starting application with PostgreSQL..."
DATABASE_URL="postgresql://carstore_user:carstore123@localhost:5432/carstore" npm start &

# Wait for startup
echo "⏳ Waiting for application to start..."
sleep 5

echo "✅ Application restarted successfully!"
echo "🌐 API available at: http://localhost:3000/api"
echo "📚 Swagger docs at: http://localhost:3000/api-docs" 
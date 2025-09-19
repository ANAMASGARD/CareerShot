#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 CareerShot Database Manager');
console.log('================================');

const command = process.argv[2];

switch (command) {
  case 'generate':
    console.log('📝 Generating migrations...');
    try {
      execSync('npx drizzle-kit generate', { stdio: 'inherit' });
      console.log('✅ Migrations generated successfully!');
    } catch (error) {
      console.log('❌ Failed to generate migrations. Try: npm run db:generate');
    }
    break;

  case 'migrate':
    console.log('🔄 Running migrations...');
    try {
      execSync('npx drizzle-kit migrate', { stdio: 'inherit' });
      console.log('✅ Migrations applied successfully!');
    } catch (error) {
      console.log('❌ Failed to run migrations. Try: npm run db:migrate');
    }
    break;

  case 'push':
    console.log('⬆️  Pushing schema to database...');
    try {
      execSync('npx drizzle-kit push', { stdio: 'inherit' });
      console.log('✅ Schema pushed successfully!');
    } catch (error) {
      console.log('❌ Failed to push schema. Try: npm run db:push');
    }
    break;

  case 'studio':
    console.log('🎨 Opening Drizzle Studio...');
    try {
      execSync('npx drizzle-kit studio', { stdio: 'inherit' });
    } catch (error) {
      console.log('❌ Failed to open studio. Try: npm run db:studio');
    }
    break;

  case 'check':
    console.log('🔍 Checking database connection...');
    try {
      // Simple connection test
      const envPath = path.join(__dirname, '..', '.env.local');
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        if (envContent.includes('DATABASE_URL')) {
          console.log('✅ DATABASE_URL found in .env.local');
        } else {
          console.log('⚠️  DATABASE_URL not found in .env.local');
        }
      } else {
        console.log('⚠️  .env.local file not found');
      }
    } catch (error) {
      console.log('❌ Error checking database:', error.message);
    }
    break;

  default:
    console.log('📋 Available commands:');
    console.log('  generate  - Generate migration files');
    console.log('  migrate   - Run database migrations');
    console.log('  push      - Push schema to database');
    console.log('  studio    - Open Drizzle Studio');
    console.log('  check     - Check database configuration');
    console.log('');
    console.log('Usage: node scripts/database.js <command>');
    console.log('');
    console.log('Or use npm scripts:');
    console.log('  npm run db:generate');
    console.log('  npm run db:migrate');
    console.log('  npm run db:push');
    console.log('  npm run db:studio');
    break;
}
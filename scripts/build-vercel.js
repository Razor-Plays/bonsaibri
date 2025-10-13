#!/usr/bin/env node

// Set up database URL for Vercel environment
const path = require('path');
const databaseUrl = process.env.DATABASE_URL || `file:${path.join(process.cwd(), 'dev.db')}`;
process.env.DATABASE_URL = databaseUrl;

console.log('=== BUILD SCRIPT STARTING ===');
console.log('=== DATABASE URL SET TO:', databaseUrl, '===');

const { execSync } = require('child_process');

try {
  console.log('=== Step 1: Generate Prisma Client ===');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  console.log('=== Step 2: Deploy Database Migrations ===');
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  
  console.log('=== Step 3: Force Seed Database ===');
  try {
    execSync('node scripts/force-seed-vercel.js', { stdio: 'inherit' });
    console.log('=== Database seeding completed ===');
  } catch (seedError) {
    console.error('=== Database seeding failed, but continuing build ===');
    console.error('Seed error:', seedError.message);
  }
  
  console.log('=== Step 4: Build Next.js ===');
  execSync('next build --turbopack', { stdio: 'inherit' });
  
  console.log('=== BUILD COMPLETED SUCCESSFULLY ===');
} catch (error) {
  console.error('=== BUILD FAILED:', error.message, '===');
  process.exit(1);
}

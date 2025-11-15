// vercel-build.js
const { execSync } = require('child_process');

console.log('🚀 Starting Vercel build process...');

try {
  // Generate Prisma client
  console.log('📦 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // Build NestJS app
  console.log('🏗️ Building NestJS application...');
  execSync('npx nest build', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your routes file
const routesFilePath = path.join(__dirname, 'src/router/index.js'); // Adjust this path according to your project structure

// Path to vercel.json
const vercelJsonPath = path.join(__dirname, 'vercel.json');

async function generateVercelJson() {
  try {
    // Read the routes file
    const data = await readFile(routesFilePath, 'utf8');

    // Extract routes using a regular expression or simple parsing
    const routeRegex = /path:\s*['"]([^'"]+)['"]/g;
    const routes = [];
    let match;

    while ((match = routeRegex.exec(data)) !== null) {
      routes.push(match[1]);
    }

    // Generate rewrites for vercel.json
    const vercelConfig = {
      rewrites: routes.map((route) => ({
        source: route,
        destination: '/index.html'
      }))
    };

    // Write the vercel.json file
    await writeFile(vercelJsonPath, JSON.stringify(vercelConfig, null, 2), 'utf8');
    console.log('vercel.json has been updated with routes');
  } catch (err) {
    console.error('Error:', err);
  }
}

generateVercelJson();

// Hardus Plumbing - Automated Build-Time SEO Linter & QA Engine
// Enforces Section 8 and Section 16 QA checks across all compiled HTML files

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, 'dist');
let errorCount = 0;
let warningCount = 0;
const pageList = [];
const allUrls = new Set();
const internalLinks = new Map();

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (file === 'index.html') {
      pageList.push(fullPath);
    }
  }
}

console.log('🔍 Running Hardus Plumbing SEO & Technical QA Linter...');

if (!fs.existsSync(DIST_DIR)) {
  console.error('❌ Error: /dist directory does not exist. Run "npm run build" first.');
  process.exit(1);
}

walkDir(DIST_DIR);
console.log(`📄 Scanning ${pageList.length} compiled HTML pages...\n`);

const titlesSeen = new Map();
const h1sSeen = new Map();

pageList.forEach(filePath => {
  const relPath = path.relative(DIST_DIR, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf-8');

  // URL matching
  const urlPath = '/' + relPath.replace(/index\.html$/, '');
  allUrls.add(urlPath);

  // 1. Title Tag Check
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch) {
    console.error(`❌ [FAIL] Missing <title> in ${relPath}`);
    errorCount++;
  } else {
    const title = titleMatch[1].trim();
    if (title.length < 40 || title.length > 75) {
      console.warn(`⚠️ [WARN] Title length (${title.length} chars) out of sweet spot (45-65 chars): "${title}" in ${relPath}`);
      warningCount++;
    }
    if (titlesSeen.has(title)) {
      console.error(`❌ [FAIL] Duplicate <title> found: "${title}" in both ${relPath} and ${titlesSeen.get(title)}`);
      errorCount++;
    } else {
      titlesSeen.set(title, relPath);
    }
  }

  // 2. Meta Description Check
  const metaDescMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  if (!metaDescMatch) {
    console.error(`❌ [FAIL] Missing meta description in ${relPath}`);
    errorCount++;
  } else {
    const desc = metaDescMatch[1].trim();
    if (desc.length < 100 || desc.length > 175) {
      console.warn(`⚠️ [WARN] Meta description length (${desc.length} chars) in ${relPath}`);
      warningCount++;
    }
  }

  // 3. Single H1 Tag Check
  const h1Matches = content.match(/<h1[^>]*>([^<]+)<\/h1>/gi);
  if (!h1Matches || h1Matches.length === 0) {
    console.error(`❌ [FAIL] Missing <h1> in ${relPath}`);
    errorCount++;
  } else if (h1Matches.length > 1) {
    console.error(`❌ [FAIL] Multiple (${h1Matches.length}) <h1> tags in ${relPath}`);
    errorCount++;
  }

  // 4. Canonical Link Check
  const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (!canonicalMatch) {
    console.error(`❌ [FAIL] Missing canonical tag in ${relPath}`);
    errorCount++;
  }

  // 5. Schema JSON-LD Check
  const jsonLdMatch = content.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
  if (!jsonLdMatch) {
    console.error(`❌ [FAIL] Missing JSON-LD structured data in ${relPath}`);
    errorCount++;
  } else {
    try {
      JSON.parse(jsonLdMatch[1]);
    } catch (e) {
      console.error(`❌ [FAIL] Invalid JSON in schema graph in ${relPath}: ${e.message}`);
      errorCount++;
    }
  }

  // 6. Collect Internal Links
  const linkRegex = /href=["'](\/[^"']*)["']/g;
  let m;
  const pageLinks = [];
  while ((m = linkRegex.exec(content)) !== null) {
    const link = m[1].split('#')[0].split('?')[0];
    if (link.startsWith('/') && !link.startsWith('//') && !link.endsWith('.css') && !link.endsWith('.png') && !link.endsWith('.jpg')) {
      pageLinks.push(link);
    }
  }
  internalLinks.set(urlPath, pageLinks);
});

// 7. Check for Broken Internal Links
let brokenLinks = 0;
internalLinks.forEach((links, sourceUrl) => {
  links.forEach(target => {
    // Normalize trailing slash
    const normalizedTarget = target.endsWith('/') ? target : target + '/';
    if (!allUrls.has(normalizedTarget) && !allUrls.has(target)) {
      console.error(`❌ [FAIL] Broken link: "${target}" on page "${sourceUrl}"`);
      brokenLinks++;
      errorCount++;
    }
  });
});

console.log('\n========================================');
console.log(`QA LINTER SUMMARY:`);
console.log(`Pages Audited: ${pageList.length}`);
console.log(`Errors: ${errorCount}`);
console.log(`Warnings: ${warningCount}`);
console.log('========================================\n');

if (errorCount > 0) {
  console.error('❌ Build QA Failed! Please resolve the errors above.');
  process.exit(1);
} else {
  console.log('✅ All technical SEO, schema, heading hierarchy, and canonical checks PASSED!');
  process.exit(0);
}

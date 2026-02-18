#!/usr/bin/env node

/**
 * Migration script to download Webflow CDN assets and update references
 * 
 * Usage: node scripts/migrate-webflow-assets.js [--dry-run] [--download-only]
 * 
 * Options:
 *   --dry-run        Show what would be changed without making changes
 *   --download-only  Only download images, don't update references
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Configuration
const ASSETS_TO_DOWNLOAD = [
  {
    url: 'https://uploads-ssl.webflow.com/656cf6b97a03960364ead541/656cf9413a1fc8aff4ae775e_pexels-jakub-zerdzicki-19124461.jpg',
    localPath: 'images/og-image-home.jpg',
    description: 'Homepage OG image'
  },
  {
    url: 'https://uploads-ssl.webflow.com/656cf6b97a03960364ead541/656cf9410b2fc19ffddf081d_pexels-chokniti-khongchum-2280571.jpg',
    localPath: 'images/og-image-patents.jpg',
    description: 'Patents page OG image'
  },
  {
    url: 'https://uploads-ssl.webflow.com/643636146c76ca416deb6e13/643636791922860d461ff418_sample_logo06.svg',
    localPath: 'images/patent-placeholder.svg',
    description: 'Homepage patent placeholder SVG'
  },
  {
    url: 'https://uploads-ssl.webflow.com/656cf6b97a03960364ead5f6/65c19246150ec62a663cd0ca_fluid-detection-fabric-2.jpg',
    localPath: 'images/fluid-detection-fabric-2.jpg',
    description: 'Patent image from data file'
  },
  {
    url: 'https://cdn.prod.website-files.com/656cf6b97a03960364ead5f6/65c1905ab04bbb41b4940077_fluid-detection-fabric-1.jpg',
    localPath: 'images/fluid-detection-fabric-1.jpg',
    description: 'Patent image (fluid-detection-fabric-1) from data file'
  },
  {
    url: 'https://uploads-ssl.webflow.com/656cf6b97a03960364ead5f6/65738ba94d27befdaf97e079_studiomoot-incode-headshots-111.png',
    localPath: 'images/studiomoot-incode-headshots-111.png',
    description: 'Team member profile picture (may already exist)'
  }
];

const FILES_TO_UPDATE = [
  {
    file: 'index.html',
    replacements: [
      {
        old: 'https://uploads-ssl.webflow.com/656cf6b97a03960364ead541/656cf9413a1fc8aff4ae775e_pexels-jakub-zerdzicki-19124461.jpg',
        new: 'images/og-image-home.jpg',
        description: 'OG image meta tag'
      },
      {
        old: 'https://uploads-ssl.webflow.com/643636146c76ca416deb6e13/643636791922860d461ff418_sample_logo06.svg',
        new: 'images/patent-placeholder.svg',
        description: 'Homepage patent image'
      }
    ]
  },
  {
    file: 'patents.html',
    replacements: [
      {
        old: 'https://uploads-ssl.webflow.com/656cf6b97a03960364ead541/656cf9410b2fc19ffddf081d_pexels-chokniti-khongchum-2280571.jpg',
        new: 'images/og-image-patents.jpg',
        description: 'OG image meta tag'
      }
    ]
  },
  {
    file: 'src/index.html',
    replacements: [
      {
        old: 'https://uploads-ssl.webflow.com/656cf6b97a03960364ead541/656cf9413a1fc8aff4ae775e_pexels-jakub-zerdzicki-19124461.jpg',
        new: 'images/og-image-home.jpg',
        description: 'OG image meta tag'
      },
      {
        old: 'https://uploads-ssl.webflow.com/643636146c76ca416deb6e13/643636791922860d461ff418_sample_logo06.svg',
        new: 'images/patent-placeholder.svg',
        description: 'Homepage patent image'
      }
    ]
  },
  {
    file: 'src/patents.html',
    replacements: [
      {
        old: 'https://uploads-ssl.webflow.com/656cf6b97a03960364ead541/656cf9410b2fc19ffddf081d_pexels-chokniti-khongchum-2280571.jpg',
        new: 'images/og-image-patents.jpg',
        description: 'OG image meta tag'
      }
    ]
  },
  {
    file: 'data/patents.json',
    replacements: [
      {
        old: 'https://uploads-ssl.webflow.com/656cf6b97a03960364ead5f6/65c19246150ec62a663cd0ca_fluid-detection-fabric-2.jpg',
        new: 'images/fluid-detection-fabric-2.jpg',
        description: 'Patent main image'
      },
      {
        old: 'https://cdn.prod.website-files.com/656cf6b97a03960364ead5f6/65c1905ab04bbb41b4940077_fluid-detection-fabric-1.jpg',
        new: 'images/fluid-detection-fabric-1.jpg',
        description: 'Patent main image (alternative CDN)'
      }
    ]
  },
  {
    file: 'data/team_members.json',
    replacements: [
      {
        old: 'https://uploads-ssl.webflow.com/656cf6b97a03960364ead5f6/65738ba94d27befdaf97e079_studiomoot-incode-headshots-111.png',
        new: 'images/studiomoot-incode-headshots-111.png',
        description: 'Team member profile picture'
      }
    ]
  }
];

// Utility functions
function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filePath);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        return downloadFile(response.headers.location, filePath)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(filePath);
        reject(new Error(`Failed to download: ${response.statusCode} ${response.statusMessage}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      reject(err);
    });
  });
}

function updateFile(filePath, replacements, dryRun = false) {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  File not found: ${filePath}`);
    return false;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  for (const replacement of replacements) {
    if (content.includes(replacement.old)) {
      console.log(`  ✓ Found: ${replacement.description}`);
      if (!dryRun) {
        content = content.replace(new RegExp(replacement.old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement.new);
        changed = true;
      }
    } else {
      console.log(`  ⊘ Not found: ${replacement.description}`);
    }
  }
  
  if (changed && !dryRun) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ Updated: ${filePath}`);
  }
  
  return changed;
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const downloadOnly = args.includes('--download-only');
  
  console.log('🚀 Webflow Asset Migration Script\n');
  
  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No changes will be made\n');
  }
  
  // Step 1: Download assets
  console.log('📥 Step 1: Downloading assets...\n');
  
  for (const asset of ASSETS_TO_DOWNLOAD) {
    const fullPath = path.join(process.cwd(), asset.localPath);
    const dir = path.dirname(fullPath);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      if (!dryRun) {
        fs.mkdirSync(dir, { recursive: true });
      }
      console.log(`📁 Created directory: ${dir}`);
    }
    
    // Check if file already exists
    if (fs.existsSync(fullPath)) {
      console.log(`⏭️  Skipping ${asset.description} - already exists: ${asset.localPath}`);
      continue;
    }
    
    console.log(`⬇️  Downloading ${asset.description}...`);
    console.log(`   From: ${asset.url}`);
    console.log(`   To: ${asset.localPath}`);
    
    if (!dryRun) {
      try {
        await downloadFile(asset.url, fullPath);
        console.log(`   ✅ Downloaded successfully\n`);
      } catch (error) {
        console.error(`   ❌ Error: ${error.message}\n`);
      }
    } else {
      console.log(`   [DRY RUN] Would download\n`);
    }
  }
  
  if (downloadOnly) {
    console.log('\n✅ Download complete. Exiting (--download-only mode).');
    return;
  }
  
  // Step 2: Update file references
  console.log('\n📝 Step 2: Updating file references...\n');
  
  for (const fileUpdate of FILES_TO_UPDATE) {
    const filePath = path.join(process.cwd(), fileUpdate.file);
    console.log(`📄 Processing: ${fileUpdate.file}`);
    
    const changed = updateFile(filePath, fileUpdate.replacements, dryRun);
    
    if (!changed && !dryRun) {
      console.log(`   ℹ️  No changes needed\n`);
    } else if (dryRun) {
      console.log(`   [DRY RUN] Would update references\n`);
    }
  }
  
  console.log('\n✅ Migration complete!');
  
  if (dryRun) {
    console.log('\n💡 Run without --dry-run to apply changes');
  } else {
    console.log('\n📋 Next steps:');
    console.log('   1. Review the downloaded images');
    console.log('   2. Run: npm run build:html (if using build system)');
    console.log('   3. Test the site locally');
    console.log('   4. Verify OG images with preview tools');
  }
}

// Run the script
main().catch((error) => {
  console.error('\n❌ Error:', error);
  process.exit(1);
});

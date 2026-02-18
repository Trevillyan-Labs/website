# Webflow Asset Migration Plan

## Overview
This document outlines the steps to migrate away from Webflow CDN assets and make the site fully independent of Webflow services.

## Current Status

### ✅ Already Local
- Most hero/background images are already local (`pexels-jakub-zerdzicki-19124461.jpg`, `pexels-chokniti-khongchum-2280571.jpg`)
- Team member profile picture exists locally (`studiomoot-incode-headshots-111.png`)
- SVG icons are local

### ⚠️ Still Using Webflow CDN

1. **OG/Twitter Meta Images** (2 files)
   - `index.html` - OG image
   - `patents.html` - OG image

2. **Homepage Patent Image** (1 file)
   - External Webflow project SVG: `sample_logo06.svg`

3. **Data File URLs** (2 files)
   - `data/patents.json` - One patent image URL
   - `data/team_members.json` - Profile picture URL

## Migration Steps

### Step 1: Download Missing Images

Download the following images from Webflow CDN and save them locally:

```bash
# Create a temporary download directory
mkdir -p temp_downloads

# Download OG images (these may already exist locally with different names)
# Check if these match existing local files first
curl -o temp_downloads/og-index.jpg "https://uploads-ssl.webflow.com/656cf6b97a03960364ead541/656cf9413a1fc8aff4ae775e_pexels-jakub-zerdzicki-19124461.jpg"
curl -o temp_downloads/og-patents.jpg "https://uploads-ssl.webflow.com/656cf6b97a03960364ead541/656cf9410b2fc19ffddf081d_pexels-chokniti-khongchum-2280571.jpg"

# Download homepage patent SVG (from different Webflow project)
curl -o temp_downloads/sample_logo06.svg "https://uploads-ssl.webflow.com/643636146c76ca416deb6e13/643636791922860d461ff418_sample_logo06.svg"

# Download patent image from data file
curl -o temp_downloads/fluid-detection-fabric-2.jpg "https://uploads-ssl.webflow.com/656cf6b97a03960364ead5f6/65c19246150ec62a663cd0ca_fluid-detection-fabric-2.jpg"

# Download team profile picture (may already exist as studiomoot-incode-headshots-111.png)
curl -o temp_downloads/team-profile.png "https://uploads-ssl.webflow.com/656cf6b97a03960364ead5f6/65738ba94d27befdaf97e079_studiomoot-incode-headshots-111.png"
```

**Note:** Before downloading, verify:
- OG images may already exist locally (check filenames match)
- Team profile picture already exists as `studiomoot-incode-headshots-111.png`
- Compare file sizes/checksums to avoid duplicates

### Step 2: Organize Local Assets

Move downloaded files to appropriate locations:

```bash
# Move OG images to images/ directory
mv temp_downloads/og-index.jpg images/og-image-home.jpg
mv temp_downloads/og-patents.jpg images/og-image-patents.jpg

# Move patent SVG (or replace with your own logo)
mv temp_downloads/sample_logo06.svg images/patent-placeholder.svg

# Move patent image
mv temp_downloads/fluid-detection-fabric-2.jpg images/fluid-detection-fabric-2.jpg

# Clean up
rmdir temp_downloads
```

### Step 3: Update HTML Files

#### Update `index.html`:
- Replace OG/Twitter meta image URLs (lines 9, 12)
- Replace homepage patent image URL (line 212)

#### Update `patents.html`:
- Replace OG/Twitter meta image URLs (lines 9, 12)

#### Update `src/index.html` and `src/patents.html`:
- Same changes as above (these are source files used by build process)

### Step 4: Update Data Files

#### Update `data/patents.json`:
- Replace `Main Image` URL with local path: `images/fluid-detection-fabric-2.jpg`

#### Update `data/team_members.json`:
- Replace `Profile Picture` URL with local path: `images/studiomoot-incode-headshots-111.png`

### Step 5: Verify Local Images Match

Before updating URLs, verify that local images match the Webflow versions:

```bash
# Compare file sizes (they should match if identical)
# Or use image comparison tools to verify visual match
```

### Step 6: Test the Site

1. Run `npm run build:html` to rebuild HTML files
2. Serve the site locally and verify all images load correctly
3. Check OG image previews using tools like:
   - https://www.opengraph.xyz/
   - https://cards-dev.twitter.com/validator

## Alternative: Automated Migration Script

A script can be created to:
1. Download all Webflow CDN images
2. Save them locally with appropriate names
3. Update all references in HTML and JSON files
4. Verify downloads succeeded

## Webflow CSS/JS Files

**Note:** The Webflow CSS and JS files (`webflow.css`, `trevillyan-labs.webflow.css`, `webflow.js`) are likely still needed for:
- Layout and styling
- Animations and interactions
- Dynamic list rendering

These files are part of the exported Webflow code and don't require external services. They can remain as-is unless you plan to completely rebuild the styling system.

## Post-Migration Checklist

- [ ] All images downloaded and verified
- [ ] HTML files updated with local image paths
- [ ] Data JSON files updated with local image paths
- [ ] Site tested locally
- [ ] OG images verified with preview tools
- [ ] All images load correctly in production
- [ ] No broken image links in browser console
- [ ] Update README.md to reflect migration completion

## Benefits of Migration

1. **Independence**: Site no longer depends on Webflow CDN availability
2. **Performance**: Local images can be optimized and cached better
3. **Control**: Full control over image assets and versions
4. **Cost**: No dependency on Webflow hosting/CDN
5. **Reliability**: Images won't break if Webflow changes URLs or removes assets

## Rollback Plan

If issues arise:
1. Keep original URLs commented in code for quick rollback
2. Maintain backup of original files before changes
3. Test thoroughly before deploying to production

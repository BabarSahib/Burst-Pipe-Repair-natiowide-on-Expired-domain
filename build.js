// 24/7 Pipe Rescue - Complete Production Static Site Generator
// Compiles 100% crawlable semantic HTML with JSON-LD graphs, split sitemaps & robots.txt

const fs = require('fs');
const path = require('path');

const servicesData = require('./src/data/services');
const { statesData, tier1CitiesData } = require('./src/data/locations');
const citiesByState = require('./src/data/cities_by_state.json');
const costsData = require('./src/data/costs');
const resourcesData = require('./src/data/resources');
const legalData = require('./src/data/legal');

function formatCityName(slug) {
  if (!slug || typeof slug !== 'string') return '';
  return slug
    .split('-')
    .map(w => {
      if (w.toLowerCase() === 'st') return 'St.';
      if (w.toLowerCase() === 'ft') return 'Ft.';
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ');
}

const BASE_URL = 'https://hardusplumbing.com';
const PHONE_DISPLAY = '(855) 499-4130';
const PHONE_TEL = 'tel:+18554994130';
const DIST_DIR = path.join(__dirname, 'dist');

// Ensure directories
function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

const STATES_DROPDOWN_HTML = `
  <li class="has-dropdown nav-item-dropdown">
    <a href="/states/" class="nav-dropdown-trigger" id="statesDropdownTrigger" aria-expanded="false" aria-haspopup="true">
      <span>Service Areas</span>
      <svg class="dropdown-chevron" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
      </svg>
    </a>
    <div class="states-mega-dropdown" id="statesDropdownMenu" role="menu" aria-labelledby="statesDropdownTrigger">
      <div class="states-dropdown-grid">
        ${statesData.map(st => `<a href="/${st.slug}/" class="state-drop-link" role="menuitem">${st.name}</a>`).join('')}
      </div>
      <div class="states-dropdown-footer">
        <span class="states-dropdown-footer-info">Nationwide 24/7 Plumber Dispatch</span>
        <a href="/states/" class="states-dropdown-all-link">Browse All 50 States Hub &rarr;</a>
      </div>
    </div>
  </li>
`;

const MOBILE_STATES_HTML = statesData.map(st => `<a href="/${st.slug}/" class="mobile-state-link">${st.name}</a>`).join('');

// Global Layout Wrapper
function renderLayout({ title, metaDesc, canonical, jsonLd, breadcrumbs, content }) {
  const breadcrumbHtml = breadcrumbs && breadcrumbs.length > 0 ? `
    <nav class="breadcrumb-nav" aria-label="Breadcrumb">
      <div class="container">
        <ol class="breadcrumb-list">
          ${breadcrumbs.map((b, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return isLast
              ? `<li aria-current="page">${b.name}</li>`
              : `<li><a href="${b.url}">${b.name}</a></li>`;
          }).join('')}
        </ol>
      </div>
    </nav>
  ` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${metaDesc}">
  <link rel="canonical" href="${canonical}">
  <meta name="robots" content="index, follow">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${metaDesc}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="24/7 Pipe Rescue">
  <link rel="stylesheet" href="/css/style.css">
  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>
</head>
<body>
  <header class="site-header">
    <div class="container">
      <div class="header-inner">
        <a href="/" class="site-logo">
          <div class="logo-icon-box">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
          </div>
          <span class="logo-title">24/7 Pipe Rescue</span>
        </a>
        <ul class="nav-links">
          <li><a href="/services/">Services</a></li>
          ${STATES_DROPDOWN_HTML}
          <li><a href="/plumbing-costs/">Pricing</a></li>
          <li><a href="/resources/">Emergency Guides</a></li>
          <li><a href="/about/">About</a></li>
        </ul>
        <button class="mobile-menu-toggle" id="mobileMenuBtn" aria-label="Toggle navigation menu" onclick="toggleMobileNav()">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="mobile-nav-drawer" id="mobileNavDrawer">
        <ul class="mobile-nav-links">
          <li><a href="/services/">Services</a></li>
          <li class="mobile-has-sub">
            <div class="mobile-sub-trigger-row">
              <a href="/states/">Service Areas</a>
              <button type="button" class="mobile-sub-toggle-btn" id="mobileStatesToggleBtn" aria-label="Toggle States List" onclick="toggleMobileStates(event)">
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg>
              </button>
            </div>
            <div class="mobile-sub-drawer" id="mobileStatesSubDrawer">
              <div class="mobile-states-grid">
                ${MOBILE_STATES_HTML}
              </div>
            </div>
          </li>
          <li><a href="/plumbing-costs/">Pricing</a></li>
          <li><a href="/resources/">Emergency Guides</a></li>
          <li><a href="/about/">About Us</a></li>
          <li><a href="/contact/">Contact Dispatch</a></li>
        </ul>
      </div>
    </div>
  </header>

  ${breadcrumbHtml}

  <main>
    ${content}
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <h4>24/7 Pipe Rescue</h4>
          <p style="margin-bottom: 12px; line-height: 1.5;">Nationwide 24/7 emergency burst pipe referral network connecting homeowners with vetted, licensed local plumbers.</p>
          <p style="font-weight: 700; color: #ffffff;">24/7 Dispatch Hotline:</p>
          <p><a href="${PHONE_TEL}" style="font-size: 1.1rem; color: #f87171; font-weight: 800; text-decoration: none;">${PHONE_DISPLAY}</a></p>
        </div>
        <div class="footer-col">
          <h4>Core Services</h4>
          <ul class="footer-links">
            ${servicesData.map(s => `<li><a href="/services/${s.slug}/">${s.title}</a></li>`).join('')}
            <li><a href="/services/">All Services Hub</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Pricing & Guides</h4>
          <ul class="footer-links">
            <li><a href="/plumbing-costs/">Plumbing Cost Hub</a></li>
            <li><a href="/plumbing-costs/burst-pipe-repair-cost-by-state/">Cost by State Matrix</a></li>
            <li><a href="/resources/first-10-minutes-burst-pipe/">First 10 Minutes Guide</a></li>
            <li><a href="/resources/how-to-shut-off-main-water-valve/">How to Shut Off Main Valve</a></li>
            <li><a href="/resources/">All Emergency Resources</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Coverage & Legal</h4>
          <ul class="footer-links">
            <li><a href="/states/">50-State Coverage Directory</a></li>
            <li><a href="/about/">About Us</a></li>
            <li><a href="/how-it-works/">How It Works</a></li>
            <li><a href="/contact/">Contact Dispatch</a></li>
            <li><a href="/advertising-disclosure/">Advertising Disclosure</a></li>
            <li><a href="/privacy-policy/">Privacy Policy</a></li>
            <li><a href="/terms-of-service/">Terms of Service</a></li>
            <li><a href="/sitemap/">HTML Sitemap</a></li>
          </ul>
        </div>
      </div>

      <div class="referral-disclaimer-box">
        <strong>Mandatory Referral Network Disclosure:</strong> 24/7 Pipe Rescue (hardusplumbing.com) is an independent referral network connecting consumers with licensed and insured plumbing contractors. We are not a licensed plumbing contractor and do not perform direct repair or contracting work. All technicians dispatched are independent local operators who verify their own state licensing and insurance credentials. Calls may be recorded for quality assurance.
      </div>

      <div class="footer-bottom">
        <div>&copy; 2026 24/7 Pipe Rescue. All Rights Reserved.</div>
        <div>Emergency Plumbing Referral Network | United States</div>
      </div>
    </div>
  </footer>

  <div class="sticky-bottom-bar">
    <a href="${PHONE_TEL}" class="btn-sticky-call">
      <span>📞 CALL NOW: ${PHONE_DISPLAY}</span>
    </a>
  </div>
  <script>
    function toggleMobileNav() {
      var d = document.getElementById('mobileNavDrawer');
      if (d) d.classList.toggle('active');
    }
    function toggleMobileStates(e) {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      var sub = document.getElementById('mobileStatesSubDrawer');
      var btn = document.getElementById('mobileStatesToggleBtn');
      if (sub) sub.classList.toggle('active');
      if (btn) btn.classList.toggle('active');
    }
  </script>
</body>
</html>`;
}

// Generate Common JSON-LD Elements
function getOrgSchema() {
  return {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    "name": "24/7 Pipe Rescue",
    "url": `${BASE_URL}/`,
    "telephone": "+18554994130",
    "description": "Nationwide emergency burst pipe repair referral network connecting homeowners with licensed local plumbers.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+18554994130",
      "contactType": "emergency",
      "areaServed": "US",
      "availableLanguage": "English"
    }
  };
}

function renderServiceCard(s, extraMeta = '', linkText = 'Learn More') {
  return `
    <div class="service-card">
      <div class="service-card-img-wrap">
        <img src="${s.heroImage || '/images/emergency-burst-pipe-repair.jpg'}" alt="${s.heroImageAlt || s.title}" class="service-card-img" width="400" height="240" loading="lazy">
      </div>
      <div class="service-card-body">
        <div class="service-card-icon">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
        </div>
        <h3><a href="/services/${s.slug}/">${s.title}</a></h3>
        <p>${s.summary.length > 135 ? s.summary.substring(0, 135) + '...' : s.summary}</p>
        <div class="service-card-footer">
          <span style="font-size: 0.8rem; color: #64748b; font-weight: 600;">${extraMeta || (s.priceRange ? 'Estimated: ' + s.priceRange.split('(')[0] : '24/7 Available')}</span>
          <a href="/services/${s.slug}/" class="service-card-link">${linkText} &rarr;</a>
        </div>
      </div>
    </div>
  `;
}

// 1. Compile Homepage
function compileHomepage() {
  const canonical = `${BASE_URL}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getOrgSchema(),
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        "url": `${BASE_URL}/`,
        "name": "24/7 Pipe Rescue",
        "publisher": { "@id": `${BASE_URL}/#organization` }
      }
    ]
  };

  const content = `
    <section class="hero-section">
      <div class="container">
        <div class="hero-grid">
          <div>
            <div class="hero-status-pill">
              <span class="pulse-indicator"><span class="pulse-ping"></span><span class="pulse-core"></span></span>
              <span>24/7 Priority Emergency Service Active</span>
            </div>
            <div class="hero-eyebrow">
              <span>💧 24/7 EMERGENCY BURST PIPE REPAIR</span>
            </div>
            <h1 class="hero-title">Burst Pipe Repair & <span class="highlight">Plumbing Services</span><br>24/7 Emergency Service</h1>
            <p class="hero-subtitle">Water gushing through your ceiling, walls, or basement? 24/7 Pipe Rescue connects you with vetted, licensed local plumbers in under 60 seconds.</p>
            <div class="hero-cta-group">
              <a href="${PHONE_TEL}" class="btn-emergency-call">📞 Call Now</a>
            </div>
            <p><a href="/resources/how-to-shut-off-main-water-valve/" class="hero-shutoff-link">⚠️ Water running right now? Learn how to shut off your main valve immediately &rarr;</a></p>
          </div>
          <div>
            <div class="hero-media">
              <div class="hero-card-frame">
                <img src="/images/burst-pipe-hero.jpg" alt="Emergency burst pipe repair and rapid water line isolation" class="hero-main-img" width="900" height="650" loading="eager" fetchpriority="high">
                <div class="hero-img-gradient" aria-hidden="true"></div>
                <div class="hero-same-day-badge">
                  <span class="badge-icon">⚡</span>
                  <span>24/7 Rapid Response</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- The First 10 Minutes Emergency Strip -->
    <section class="first-10-minutes-strip">
      <div class="container">
        <div class="strip-header">
          <h2>THE FIRST 10 MINUTES: EMERGENCY BURST PIPE PROTOCOL</h2>
          <p style="color: #e2e8f0; font-size: 0.875rem;">Follow these 5 immediate survival steps before the technician arrives</p>
        </div>
        <div class="strip-steps-grid">
          <div class="strip-step-box">
            <span class="step-badge">STEP 1</span>
            <strong>Shut Off Main Valve:</strong> Turn clockwise until fully closed to stop water flow immediately.
          </div>
          <div class="strip-step-box">
            <span class="step-badge">STEP 2</span>
            <strong>Kill Electrical Power:</strong> Turn off breakers for flooded rooms to eliminate electrocution hazard.
          </div>
          <div class="strip-step-box">
            <span class="step-badge">STEP 3</span>
            <strong>Open Lowest Faucets:</strong> Drain trapped water pressure from vertical supply lines.
          </div>
          <div class="strip-step-box">
            <span class="step-badge">STEP 4</span>
            <strong>Capture Photo Proof:</strong> Record video and photos for insurance before cleaning surfaces.
          </div>
          <div class="strip-step-box">
            <span class="step-badge">STEP 5</span>
            <strong>Call 24/7 Dispatch:</strong> Dial <a href="${PHONE_TEL}" style="color: #fbbf24; font-weight: 700;">${PHONE_DISPLAY}</a> for urgent local plumber matching.
          </div>
        </div>
      </div>
    </section>

    <!-- 4-Step Process Strip -->
    <section class="process-section">
      <div class="container">
        <div class="section-title-wrap">
          <h2 class="section-title">How Our Emergency Network Works</h2>
          <p class="section-subtitle">We streamline the connection between distressed property owners and licensed local plumbing contractors.</p>
        </div>
        <div class="process-grid">
          <div class="process-card">
            <div class="process-num">01</div>
            <h3>Call 24/7 Dispatch</h3>
            <p>Call our national line at ${PHONE_DISPLAY} or enter your ZIP code. Our system routes your request by area code and location.</p>
          </div>
          <div class="process-card">
            <div class="process-num">02</div>
            <h3>Local Plumber Assigned</h3>
            <p>You are matched with a licensed, insured contractor serving your specific county and municipal jurisdiction.</p>
          </div>
          <div class="process-card">
            <div class="process-num">03</div>
            <h3>Diagnosis & Written Quote</h3>
            <p>A licensed technician evaluates the burst with acoustic/thermal tools and gives you an upfront flat-rate price before work begins.</p>
          </div>
          <div class="process-card">
            <div class="process-num">04</div>
            <h3>Restoration Complete</h3>
            <p>Damaged lines are repaired to municipal plumbing code, tested under pressure, and emergency drying is deployed.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6 Core Services Cards -->
    <section class="services-section">
      <div class="container">
        <div class="section-title-wrap">
          <h2 class="section-title">Our Core Specialized Pipe Repair Services</h2>
          <p class="section-subtitle">Comprehensive solutions for supply line ruptures, freezing breaks, and underground water mains.</p>
        </div>
        <div class="service-grid">
          ${servicesData.map(s => renderServiceCard(s, `Estimated: ${s.priceRange.split('(')[0]}`, 'Learn More')).join('')}
        </div>
      </div>
    </section>

    <!-- 50 States Coverage Grid -->
    <section id="service-areas" class="coverage-section">
      <div class="container">
        <div class="section-title-wrap">
          <h2 class="section-title">Nationwide Service Areas (All 50 States + DC)</h2>
          <p class="section-subtitle">Select your state to view regional climate risk, frost line depths, and local licensed plumber networks.</p>
        </div>
        <div class="state-grid">
          ${statesData.map(st => `
            <a href="/${st.slug}/" class="state-link-pill">
              <span>${st.name}</span>
              <span class="state-abbr">${st.abbr}</span>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <div class="container">
        <div class="section-title-wrap">
          <h2 class="section-title">Frequently Asked Questions</h2>
          <p class="section-subtitle">Answers to urgent questions from homeowners facing a burst pipe emergency.</p>
        </div>
        <div class="faq-list">
          <div class="faq-item">
            <div class="faq-question">How fast can an emergency plumber arrive when a pipe bursts?</div>
            <div class="faq-answer">Emergency plumbers in our network typically arrive within 45 to 90 minutes depending on your location, time of call, and severe weather road conditions. In the meantime, our dispatch operators will guide you through shutting off your main water valve to prevent further flooding.</div>
          </div>
          <div class="faq-item">
            <div class="faq-question">Are the plumbing contractors licensed and insured?</div>
            <div class="faq-answer">Yes. Partner contractors in our referral network are required to hold active trade licensing in their respective states and carry general liability insurance coverage.</div>
          </div>
          <div class="faq-item">
            <div class="faq-question">How much does an emergency burst pipe repair typically cost?</div>
            <div class="faq-answer">Accessible pipe repairs average between $350 and $1,800. Hidden leaks inside ceilings or under foundation slabs range higher due to electronic leak detection and structural access. You receive a written flat-rate quote before any work starts.</div>
          </div>
        </div>
      </div>
    </section>
  `;

  const html = renderLayout({
    title: "Emergency Burst Pipe Repair Nationwide | 24/7 Plumber Dispatch",
    metaDesc: "Water pipe burst? 24/7 Pipe Rescue connects you with licensed emergency plumbers nationwide. Fast 24/7 dispatch & upfront quotes. Call (855) 499-4130.",
    canonical,
    jsonLd,
    breadcrumbs: [],
    content
  });

  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html);
}

// 2. Compile Services Hub & Pillars & Children
function compileServices() {
  const servicesDir = path.join(DIST_DIR, 'services');
  if (fs.existsSync(servicesDir)) {
    fs.rmSync(servicesDir, { recursive: true, force: true });
  }
  ensureDirSync(servicesDir);

  // Services Hub
  const hubCanonical = `${BASE_URL}/services/`;
  const hubJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getOrgSchema(),
      {
        "@type": "CollectionPage",
        "@id": `${hubCanonical}#collection`,
        "url": hubCanonical,
        "name": "Professional Pipe Repair Services | 24/7 Pipe Rescue",
        "description": "Directory of emergency, frozen, underground, and trenchless pipe repair services."
      }
    ]
  };

  const hubContent = `
    <section class="hero-section">
      <div class="container">
        <div class="hero-grid">
          <div>
            <div class="hero-status-pill">
              <span class="pulse-indicator"><span class="pulse-ping"></span><span class="pulse-core"></span></span>
              <span>24/7 Priority Emergency Service Active</span>
            </div>
            <div class="hero-eyebrow">
              <span>💧 24/7 EMERGENCY BURST PIPE REPAIR</span>
            </div>
            <h1 class="hero-title">Professional Pipe Repair & <span class="highlight">Plumbing Services</span><br>24/7 Emergency Dispatch</h1>
            <p class="hero-subtitle">Connecting homeowners and commercial facilities with specialized, licensed plumbing contractors equipped to handle every type of pressurized pipe failure, freeze rupture, and underground water service leak.</p>
            <div class="hero-cta-group">
              <a href="${PHONE_TEL}" class="btn-emergency-call">📞 Call Now</a>
            </div>
          </div>
          <div>
            <div class="hero-media">
              <div class="hero-card-frame">
                <img src="/images/emergency-burst-pipe-repair.jpg" alt="Comprehensive emergency burst pipe repair and rapid plumbing services" class="hero-main-img" width="900" height="650" loading="eager" fetchpriority="high">
                <div class="hero-img-gradient" aria-hidden="true"></div>
                <div class="hero-same-day-badge">
                  <span class="badge-icon">⚡</span>
                  <span>24/7 Rapid Response</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container article-layout" style="padding-top: var(--space-8);">
      <div class="article-content">
        <h2>Select Your Specific Pipe Problem</h2>
        <div class="service-grid" style="margin: 24px 0;">
          ${servicesData.map(s => renderServiceCard(s, `Urgency: ${s.urgency.split('(')[0]}`, 'Learn More')).join('')}
        </div>

        <h2>How to Choose the Right Pipe Repair Service</h2>
        <p>If water is currently actively flooding your property, immediately review our <a href="/services/emergency-burst-pipe-repair/">Emergency Burst Pipe Repair Pillar</a> or call our 24/7 hotline directly at <a href="${PHONE_TEL}">${PHONE_DISPLAY}</a>. For winter freeze problems where no water flows from faucets, explore <a href="/services/frozen-pipe-thawing-repair/">Frozen Pipe Thawing & Repair</a>. If you have low water pressure or a soggy front lawn, see <a href="/services/underground-main-water-line-repair/">Underground Main Water Line Repair</a>.</p>
      </div>
    </div>
  `;

  fs.writeFileSync(path.join(servicesDir, 'index.html'), renderLayout({
    title: "Pipe Repair Services | Complete Solutions & Emergency Fixes",
    metaDesc: "Explore professional pipe repair services: emergency burst pipes, frozen thawing, copper/PEX fixes & trenchless main lines. Call (855) 499-4130.",
    canonical: hubCanonical,
    jsonLd: hubJsonLd,
    breadcrumbs: [{ name: "Home", url: "/" }, { name: "Services", url: "/services/" }],
    content: hubContent
  }));

  // Pillars & Children
  servicesData.forEach(pillar => {
    const pillarDir = path.join(servicesDir, pillar.slug);
    ensureDirSync(pillarDir);

    const pillarCanonical = `${BASE_URL}/services/${pillar.slug}/`;
    const pillarJsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        getOrgSchema(),
        {
          "@type": "Service",
          "@id": `${pillarCanonical}#service`,
          "name": pillar.title,
          "serviceType": "Emergency Pipe Repair",
          "provider": { "@id": `${BASE_URL}/#organization` },
          "areaServed": { "@type": "Country", "name": "United States" },
          "description": pillar.summary,
          "image": `${BASE_URL}${pillar.heroImage}`
        }
      ]
    };

    const pillarContent = `
      <section class="hero-section">
        <div class="container">
          <div class="hero-grid">
            <div>
              <div class="hero-status-pill">
                <span class="pulse-indicator"><span class="pulse-ping"></span><span class="pulse-core"></span></span>
                <span>24/7 Priority Emergency Service Active</span>
              </div>
              <div class="hero-eyebrow">
                <span>💧 ${pillar.urgency.split('(')[0].trim().toUpperCase()}</span>
              </div>
              <h1 class="hero-title">${pillar.h1}</h1>
              <p class="hero-subtitle">${pillar.summary}</p>
              <div class="hero-cta-group">
                <a href="${PHONE_TEL}" class="btn-emergency-call">📞 Call Now</a>
              </div>
            </div>
            <div>
              <div class="hero-media">
                <div class="hero-card-frame">
                  <img src="${pillar.heroImage}" alt="${pillar.heroImageAlt}" class="hero-main-img" width="900" height="650" loading="eager" fetchpriority="high">
                  <div class="hero-img-gradient" aria-hidden="true"></div>
                  <div class="hero-same-day-badge">
                    <span class="badge-icon">⚡</span>
                    <span>24/7 Rapid Response</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="container article-layout" style="padding-top: var(--space-8);">
        <div class="article-content">
          <div class="callout-box">
            <p><strong>Emergency Dispatch:</strong> Standing water or frozen pipes? Call <a href="${PHONE_TEL}" style="font-weight: 800; color: #b91c1c;">${PHONE_DISPLAY}</a> now to route an emergency plumber.</p>
          </div>

          <h2>First Hour Emergency Protocol</h2>
          <ol>
            ${(pillar.firstHourSteps || [
              "Shut off main water valve immediately.",
              "Cut electrical power to wet spaces.",
              "Open faucets to drain residual line pressure.",
              "Call 24/7 dispatch at " + PHONE_DISPLAY
            ]).map(step => `<li>${step}</li>`).join('')}
          </ol>

          <h2>Specialized Methods & Sub-Services</h2>
          <div class="service-grid" style="margin: 24px 0;">
            ${pillar.children.map(ch => renderServiceCard(ch, ch.priceRange, 'Learn More')).join('')}
          </div>

          <h2>Pricing Guidelines & Cost Benchmarks</h2>
          <p>The estimated price range for this service is <strong>${pillar.priceRange}</strong>. For a detailed cost breakdown by scenario and state, review our dedicated guide: <a href="${pillar.costGuideUrl}">View Full Cost Guide &rarr;</a></p>

          <h2>Repair vs. Full Replacement</h2>
          <p>${pillar.repairVsReplace || "Isolated punctures can be repaired with sectional splicing, while widespread age corrosion warrants complete line repiping."}</p>

          <h2>Frequently Asked Questions</h2>
          <div class="faq-list">
            ${pillar.faqs.map(f => `
              <div class="faq-item">
                <div class="faq-question">${f.q}</div>
                <div class="faq-answer">${f.a}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    fs.writeFileSync(path.join(pillarDir, 'index.html'), renderLayout({
      title: pillar.metaTitle,
      metaDesc: pillar.metaDesc,
      canonical: pillarCanonical,
      jsonLd: pillarJsonLd,
      breadcrumbs: [
        { name: "Home", url: "/" },
        { name: "Services", url: "/services/" },
        { name: pillar.title, url: pillarCanonical }
      ],
      content: pillarContent
    }));

    // Compile Sub-Service Children (Flattened to /services/[slug]/ - max 3 URL depth)
    pillar.children.forEach(ch => {
      const childDir = path.join(servicesDir, ch.slug);
      ensureDirSync(childDir);
      const childCanonical = `${BASE_URL}/services/${ch.slug}/`;

      const childContent = `
        <section class="hero-section">
          <div class="container">
            <div class="hero-grid">
              <div>
                <div class="hero-status-pill">
                  <span class="pulse-indicator"><span class="pulse-ping"></span><span class="pulse-core"></span></span>
                  <span>24/7 Priority Emergency Service Active</span>
                </div>
                <div class="hero-eyebrow">
                  <span>💧 PART OF ${pillar.title.toUpperCase()}</span>
                </div>
                <h1 class="hero-title">${ch.h1}</h1>
                <p class="hero-subtitle">${ch.summary}</p>
                <div class="hero-cta-group">
                  <a href="${PHONE_TEL}" class="btn-emergency-call">📞 Call Now</a>
                </div>
              </div>
              <div>
                <div class="hero-media">
                  <div class="hero-card-frame">
                    <img src="${ch.heroImage}" alt="${ch.heroImageAlt}" class="hero-main-img" width="900" height="650" loading="eager" fetchpriority="high">
                    <div class="hero-img-gradient" aria-hidden="true"></div>
                    <div class="hero-same-day-badge">
                      <span class="badge-icon">⚡</span>
                      <span>24/7 Rapid Response</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="container article-layout" style="padding-top: var(--space-8);">
          <div class="article-content">
            <div class="callout-box">
              <p>Part of our <a href="/services/${pillar.slug}/">${pillar.title}</a> solutions. For immediate dispatch call <a href="${PHONE_TEL}">${PHONE_DISPLAY}</a>.</p>
            </div>

            <h2>Professional Repair Methods</h2>
            <ul>
              ${(ch.methods || []).map(m => `<li>${m}</li>`).join('')}
            </ul>

            <h2>Estimated Repair Pricing</h2>
            <p>Typical investment for this specific repair: <strong>${ch.priceRange}</strong>. For national averages and cost-of-living adjustments, visit our <a href="${pillar.costGuideUrl}">detailed pricing guide</a>.</p>

            <h2>When to Call a Professional</h2>
            <p>Do not attempt makeshift epoxy putty or duct tape fixes on pressurized water lines. Household water pressure (50 to 75 PSI) will rupture temporary patches, causing catastrophic flooding. Contact a licensed technician to install code-compliant fittings.</p>
          </div>
        </div>
      `;

      fs.writeFileSync(path.join(childDir, 'index.html'), renderLayout({
        title: ch.metaTitle,
        metaDesc: ch.metaDesc,
        canonical: childCanonical,
        jsonLd: {
          "@context": "https://schema.org",
          "@graph": [
            getOrgSchema(),
            {
              "@type": "Service",
              "name": ch.title,
              "provider": { "@id": `${BASE_URL}/#organization` },
              "description": ch.summary,
              "image": `${BASE_URL}${ch.heroImage}`
            }
          ]
        },
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "Services", url: "/services/" },
          { name: ch.title, url: childCanonical }
        ],
        content: childContent
      }));
    });
  });
}

// 3. Compile States Hub & State Pages
function compileStates() {
  const statesDir = path.join(DIST_DIR, 'states');
  ensureDirSync(statesDir);

  // States Hub
  const hubCanonical = `${BASE_URL}/states/`;
  const hubContent = `
    <div class="container article-layout">
      <div class="article-content">
        <h1>Burst Pipe Repair Service Directory by State</h1>
        <p>24/7 Pipe Rescue provides emergency plumbing referral services across all 50 US States and Washington DC. Select your state below to check regional frost line depth, seasonal weather risks, and licensed contractor networks.</p>

        <div class="state-grid" style="margin: 24px 0;">
          ${statesData.map(st => `
            <a href="/${st.slug}/" class="state-link-pill">
              <span>${st.name}</span>
              <span class="state-abbr">${st.abbr}</span>
            </a>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  fs.writeFileSync(path.join(statesDir, 'index.html'), renderLayout({
    title: "Burst Pipe Repair Locations by State | 24/7 Pipe Rescue",
    metaDesc: "Find licensed burst pipe repair plumbers across all 50 US states & DC. Fast 24/7 dispatch, local frost data & upfront quotes. Call (855) 499-4130.",
    canonical: hubCanonical,
    jsonLd: { "@context": "https://schema.org", "@graph": [getOrgSchema()] },
    breadcrumbs: [{ name: "Home", url: "/" }, { name: "States", url: "/states/" }],
    content: hubContent
  }));

  // Individual State Pages (domain.com/[state]/ - max 2 URL depth)
  statesData.forEach(st => {
    const stateDir = path.join(DIST_DIR, st.slug);
    ensureDirSync(stateDir);
    const stateCanonical = `${BASE_URL}/${st.slug}/`;

    // All cities in this state
    const stateCities = citiesByState[st.slug] || [];

    const stateContent = `
      <section class="hero-section">
        <div class="container">
          <div class="hero-grid">
            <div>
              <div class="hero-status-pill">
                <span class="pulse-indicator"><span class="pulse-ping"></span><span class="pulse-core"></span></span>
                <span>24/7 Priority Emergency Service Active</span>
              </div>
              <div class="hero-eyebrow">
                <span>💧 24/7 EMERGENCY BURST PIPE REPAIR</span>
              </div>
              <h1 class="hero-title">Burst Pipe Repair in <span class="highlight">${st.name}</span><br>24/7 Emergency Service</h1>
              <p class="hero-subtitle">Connecting ${st.name} homeowners and commercial property managers with vetted, state-licensed emergency plumbers. 24/7 dispatch hotline.</p>
              <div class="hero-cta-group">
                <a href="${PHONE_TEL}" class="btn-emergency-call">📞 Call Now</a>
              </div>
            </div>
            <div>
              <div class="hero-media">
                <div class="hero-card-frame">
                  <img src="/images/burst-pipe-hero.jpg" alt="Emergency burst pipe repair in ${st.name}" class="hero-main-img" width="900" height="650" loading="eager" fetchpriority="high">
                  <div class="hero-img-gradient" aria-hidden="true"></div>
                  <div class="hero-same-day-badge">
                    <span class="badge-icon">⚡</span>
                    <span>24/7 Rapid Response</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="container article-layout">
        <div class="article-content">
          <h2>${st.name} Regional Climate & Plumbing Snapshot</h2>
          <div class="table-responsive">
            <table class="cost-table">
              <tr><th>Metric</th><th>${st.name} Regional Data</th></tr>
              <tr><td>Average Winter Low</td><td>${st.winterLow}</td></tr>
              <tr><td>Typical Frost Line Depth</td><td>${st.frostDepth}</td></tr>
              <tr><td>Plumbing Licensing Authority</td><td>${st.licensing}</td></tr>
              <tr><td>Median Housing Build Era</td><td>Circa ${st.housingEra}</td></tr>
              <tr><td>Relative Labor Cost Index</td><td>${Math.round(st.cola * 100)}% of National Baseline</td></tr>
            </table>
          </div>

          <h2>Core Pipe Services in ${st.name}</h2>
          <p>Our network plumbers provide 24/7 coverage across all primary pipe repair categories in ${st.name}:</p>
          <ul>
            ${servicesData.map(s => `<li><a href="/services/${s.slug}/">${s.title}</a>: Rapid mitigation and code-compliant restoration.</li>`).join('')}
          </ul>

          <h2>Cities & Service Areas in ${st.name} (${stateCities.length} Locations Covered)</h2>
          <p>Find local licensed burst pipe repair plumbers in your community. Search or select your city below:</p>
          <div style="margin: 20px 0;">
            <input type="text" id="citySearch" class="form-control" placeholder="Search cities in ${st.name}..." oninput="filterCities(this.value)" style="max-width: 400px; margin-bottom: 16px;">
            <div id="cityGrid" class="state-grid" style="max-height: 520px; overflow-y: auto; padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
              ${stateCities.map(cSlug => {
                const cName = formatCityName(cSlug);
                return `<a href="/${st.slug}/${cSlug}/" class="state-link-pill city-link-item" data-name="${cName.toLowerCase()}">
                  <span>${cName}</span>
                  <span class="state-abbr">${st.abbr}</span>
                </a>`;
              }).join('')}
            </div>
          </div>
          <script>
            function filterCities(query) {
              const q = query.toLowerCase();
              const items = document.querySelectorAll('.city-link-item');
              items.forEach(el => {
                const name = el.getAttribute('data-name');
                el.style.display = name.includes(q) ? 'flex' : 'none';
              });
            }
          </script>

          <h2>Pricing in ${st.name}</h2>
          <p>Because labor rates in ${st.name} index at approximately ${Math.round(st.cola * 100)}% of the national average, an emergency burst pipe repair typically ranges from <strong>$${Math.round(350 * st.cola)} to $${Math.round(1800 * st.cola)}</strong> depending on pipe depth and wall access. Compare across states on our <a href="/plumbing-costs/burst-pipe-repair-cost-by-state/">Cost by State Matrix</a>.</p>
        </div>
      </div>
    `;

    fs.writeFileSync(path.join(stateDir, 'index.html'), renderLayout({
      title: `Burst Pipe Repair in ${st.name} | 24/7 Emergency Plumber`,
      metaDesc: `Emergency burst pipe repair in ${st.name}. Connect with licensed local plumbers. Upfront pricing, 24/7 dispatch. Call (855) 499-4130 now.`,
      canonical: stateCanonical,
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          getOrgSchema(),
          {
            "@type": "WebPage",
            "name": `Burst Pipe Repair in ${st.name}`,
            "about": {
              "@type": "Service",
              "name": `Burst Pipe Repair in ${st.name}`,
              "provider": { "@id": `${BASE_URL}/#organization` },
              "areaServed": { "@type": "State", "name": st.name }
            }
          }
        ]
      },
      breadcrumbs: [
        { name: "Home", url: "/" },
        { name: st.name, url: stateCanonical }
      ],
      content: stateContent
    }));
  });
}

// 4. Compile All Nationwide City Pages (30,000+ Cities)
function hashCitySlug(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function generateCityTechnicalProfile(cityName, st, cSlug) {
  const hash = hashCitySlug(`${st.slug}-${cSlug}`);

  // 1. Soil & Geological Classification
  let soilType, soilCharacteristics, soilPipeImpact;
  if (st.slug === 'alaska') {
    soilType = "Cryoturbated Glacial Silt & Active-Layer Permafrost Subbase";
    soilCharacteristics = "Subject to cryogenic frost churning, thermal contraction fissuring, and active-layer thaw settlement ranging between 18 and 42 inches.";
    soilPipeImpact = `In ${cityName}, cyclical freeze-thaw upheaval exerts tremendous vertical shear force (exceeding 45 kN/m²) against subterranean curb stop boxes and rigid copper or galvanized supply penetrations. As surface soils refreeze in early winter, adfreeze bond forces lock around vertical risers, snapping uninsulated fittings at foundation margins.`;
  } else if (['texas', 'oklahoma', 'louisiana', 'mississippi', 'alabama', 'arkansas', 'missouri', 'kansas'].includes(st.slug)) {
    const variants = [
      {
        type: "High-Plasticity Montmorillonite (Expansive Smectite) Clay",
        char: "Extreme volumetric shrink-swell capacity with linear extensibility exceeding 7.5% between wet spring runoff and arid late-summer heat.",
        impact: `The expansive clay formations underlying ${cityName} exert severe multidirectional lateral forces against underground plumbing lines. During drought periods, deep soil desiccation fractures pull foundation footings downward, placing excessive shearing tension on subterranean copper, PVC, and polybutylene lines where they penetrate exterior grade beams.`
      },
      {
        type: "Caliche-Cemented Subsoil & Weathered Limestone Bedrock",
        char: "Dense calcium carbonate calcification layers lying within 14 to 28 inches of the soil surface.",
        impact: `Because mechanical trenching through caliche deposits in ${cityName} is challenging, historical water service lines were frequently buried at shallow depths. This exposes pressurized lines to mechanical traffic vibration, ground surface thermal shocks, and rapid freeze penetration during sudden Arctic cold fronts.`
      }
    ];
    const sel = variants[hash % variants.length];
    soilType = sel.type;
    soilCharacteristics = sel.char;
    soilPipeImpact = sel.impact;
  } else if (['florida', 'hawaii', 'georgia', 'south-carolina', 'north-carolina'].includes(st.slug)) {
    const variants = [
      {
        type: "Coastal Alluvial Quartz Sand & High-Salinity Marine Silt",
        char: "High shallow water table (often 2 to 4 feet below grade) with elevated chloride concentrations and dissolved mineral content.",
        impact: `In ${cityName}, saturated sandy soils with elevated moisture levels accelerate external galvanic corrosion and pitting on underground copper supply lines. When high-pressure supply lines develop pinhole breaches, rapid water displacement flushes away non-cohesive sandy support, creating structural underground washouts and pipe collapse under driveways.`
      },
      {
        type: "Karst Porous Limestone with Active Dissolution Cavities",
        char: "Soluble carbonate limestone bedrock featuring micro-fissures and differential settlement zones.",
        impact: `Subterranean water mains in ${cityName} passing over limestone formations experience differential foundation movement. Slight settlement across unyielding rock edges concentrates mechanical bending stresses directly onto rigid PVC fittings and soldered copper elbows.`
      }
    ];
    const sel = variants[hash % variants.length];
    soilType = sel.type;
    soilCharacteristics = sel.char;
    soilPipeImpact = sel.impact;
  } else if (['california', 'arizona', 'nevada', 'utah', 'new-mexico'].includes(st.slug)) {
    const variants = [
      {
        type: "Arid Alluvial Fan Gravel & Hyper-Alkaline Decomposed Granite",
        char: "Alkaline pH ratings (8.2 to 8.8) with high sulfate and carbonate mineral salts.",
        impact: `Underground water lines in ${cityName} are vulnerable to aggressive external chemical attack from sulfate-rich dry soils. During rapid seasonal rain storms, rapid moisture influx causes sudden subgrade subsidence, fracturing rigid water mains at meter connections.`
      },
      {
        type: "Expansive Adobe Clay & Tectonic Shear Subgrades",
        char: "Dense clay loam capable of holding perched water tables and exerting differential lateral foundation pressure.",
        impact: `In ${cityName}, expansive adobe clays expand dramatically when saturated, pinching underground service lines against concrete foundation stem walls and causing abrupt pressure-spike ruptures.`
      }
    ];
    const sel = variants[hash % variants.length];
    soilType = sel.type;
    soilCharacteristics = sel.char;
    soilPipeImpact = sel.impact;
  } else {
    // Midwest, Northeast, Mid-Atlantic, Pacific Northwest, Mountain West
    const variants = [
      {
        type: "Dense Glacial Till & Silty Clay Loam with Severe Frost Susceptibility",
        char: `Deep frost penetration corresponding to regional winter lows (${st.winterLow}), with typical frost depths reaching ${st.frostDepth}.`,
        impact: `Prolonged sub-freezing soil conditions in ${cityName} form subterranean ice lenses within silty glacial subgrades. When the freeze line approaches service pipe depths, ice crystallization exerts thousands of pounds of upward frost heave uplift on uninsulated vertical riser lines and municipal curb connections.`
      },
      {
        type: "Compacted Clay-Silt Subgrade with High Moisture Retention",
        char: "Poorly drained subsoil with elevated perched water tables prone to rapid ice-lens growth during polar cold snaps.",
        impact: `Saturated clay-silt soils surrounding basement foundations in ${cityName} transmit cold temperatures rapidly inward toward uninsulated foundation wall penetrations. This localized cooling freezes trapped water inside exterior supply lines, triggering catastrophic burst fractures.`
      }
    ];
    const sel = variants[hash % variants.length];
    soilType = sel.type;
    soilCharacteristics = sel.char;
    soilPipeImpact = sel.impact;
  }

  // 2. Housing Vintage & Plumbing Metallurgy Analysis
  const eraOffset = (hash % 11) - 5;
  const estimatedEra = Math.max(1945, Math.min(2018, st.housingEra + eraOffset));
  let pipeVintageTitle, pipeVintageRisk, pipeVintageRemedy;

  if (estimatedEra < 1970) {
    pipeVintageTitle = `Pre-1970 Vintage Infrastructure: Galvanized Iron & Legacy Solder Joints`;
    pipeVintageRisk = `Residential structures in ${cityName} dating back to this era typically feature threaded galvanized steel supply pipes. Over decades of municipal water exposure, internal mineral tuberculation chokes internal pipe diameters from 3/4" down to under 1/4". Corroded male threads at elbows, tees, and nipples become paper-thin, leaving them exceptionally prone to sudden circumferential rupture when municipal water pressures spike above 75 PSI.`;
    pipeVintageRemedy = `When an emergency burst occurs in these lines, patch clamps provide only temporary relief because brittle surrounding pipe walls cannot withstand mechanical re-torqueing. Licensed technicians in ${cityName} typically execute localized transition bypasses utilizing code-approved dielectric unions or repipe affected runs with flexible PEX-A.`;
  } else if (estimatedEra < 1996) {
    pipeVintageTitle = `1970–1995 Construction: Polybutylene (Quest) & Thin-Walled Type M Copper`;
    pipeVintageRisk = `Homes constructed in ${cityName} during this building wave frequently incorporated polybutylene (PB-2110) gray plastic plumbing or lightweight Type M copper. Municipal disinfectant chemicals (chloramines) react with polybutylene over time, causing micro-fracturing along the inner pipe walls and acetal plastic insert fittings. Rather than developing small warning drips, these lines suffer abrupt, full-pressure blowouts behind finished drywall cavities.`;
    pipeVintageRemedy = `Because polybutylene is banned in modern building codes, insurance carriers often mandate professional replacement following a flood. Our emergency technicians rapidly isolate the ruptured zone and install modern crimp or expansion PEX transitions to restore potable service immediately.`;
  } else {
    pipeVintageTitle = `Modern Era (1996–Present): Cross-Linked Polyethylene (PEX) & Rigid Type L Copper`;
    pipeVintageRisk = `While modern ${cityName} properties utilize advanced PEX tubing and durable Type L copper, burst risks remain prevalent during severe winter freezes and hydraulic water hammer events. Early yellow-brass PEX crimp fittings frequently suffer from dezincification—a chemical process where zinc leaches out of brass alloys, leaving brittle, porous copper that shears off under normal household pressure. In addition, un-sleeved PEX routed across sharp metal framing studs can abrade and puncture over thousands of thermal expansion cycles.`;
    pipeVintageRemedy = `Repairs require precision thermal-expansion tooling (ASTM F1960) or engineered PPSU (polyphenylsulfone) polymer fittings that are 100% immune to dezincification and chemical corrosion.`;
  }

  // 3. Seasonal 4-Quarter Risk Assessment
  let q1Severity = "Critical / Severe Risk";
  let q1Badge = "risk-critical";
  if (['florida', 'hawaii', 'california'].includes(st.slug)) {
    q1Severity = "Moderate / Seasonal Shock";
    q1Badge = "risk-moderate";
  } else if (['texas', 'louisiana', 'georgia', 'alabama', 'mississippi', 'south-carolina', 'arizona'].includes(st.slug)) {
    q1Severity = "Elevated Shock Risk";
    q1Badge = "risk-elevated";
  }

  const q1Action = `Continuous interior heat (min 55°F), trickle exterior-wall faucets during sub-freezing nights, and insulate crawlspace rim joists.`;
  const q2Action = `Inspect basement sill plates, check water meter flow indicator for underground service line weeping caused by ground thaw settlement.`;
  const q3Action = `Test household static pressure with a hose-bib gauge; verify Pressure Reducing Valve (PRV) holds below 70 PSI during high municipal irrigation spikes.`;
  const q4Action = `Disconnect and drain all outdoor garden hoses; shut off interior isolation valves for exterior sillcocks prior to first hard freeze.`;

  // 4. Property Shutoff Instructions based on regional construction
  let shutoffLocationDetails;
  if (['alaska', 'minnesota', 'wisconsin', 'michigan', 'illinois', 'new-york', 'pennsylvania', 'massachusetts', 'connecticut', 'vermont', 'maine', 'new-hampshire', 'rhode-island', 'north-dakota', 'south-dakota', 'montana', 'wyoming', 'colorado', 'iowa', 'nebraska', 'ohio', 'indiana'].includes(st.slug)) {
    shutoffLocationDetails = `In ${cityName} homes with full basements or conditioned crawlspaces, the main water shutoff valve is located on the interior front foundation wall, roughly 1 to 2 feet above the concrete slab where the municipal water service line enters the building. Look for a brass ball valve with a lever handle or a round cast-iron gate wheel valve located immediately before or after the municipal water meter.`;
  } else {
    shutoffLocationDetails = `In ${cityName} slab-on-grade construction, the interior shutoff valve is frequently positioned inside the water heater utility closet, inside the garage adjacent to the front wall, or under the kitchen sink manifold. If an interior shutoff valve is not present or is corroded, locate the outdoor municipal meter box (typically near the front curb or property line in an iron or polymer pit box). Remove the pit lid and utilize a 5-sided curb stop meter wrench to turn the pentagon valve 90 degrees until the padlock eyelets align.`;
  }

  return {
    soilType,
    soilCharacteristics,
    soilPipeImpact,
    estimatedEra,
    pipeVintageTitle,
    pipeVintageRisk,
    pipeVintageRemedy,
    q1Severity,
    q1Badge,
    q1Action,
    q2Action,
    q3Action,
    q4Action,
    shutoffLocationDetails
  };
}

// 4. Compile All Nationwide City Pages (30,000+ Cities)
function compileAllCities() {
  console.log('🏙️ Compiling all nationwide city pages across 50 states + DC...');
  let totalCitiesCompiled = 0;

  const tier1Map = new Map();
  tier1CitiesData.forEach(c => {
    tier1Map.set(`${c.stateSlug}:${c.slug}`, c);
  });

  statesData.forEach(st => {
    const citySlugs = citiesByState[st.slug] || [];

    citySlugs.forEach((cSlug, cIdx) => {
      const key = `${st.slug}:${cSlug}`;
      const t1Data = tier1Map.get(key);
      const cityName = t1Data ? t1Data.city : formatCityName(cSlug);

      const cityDir = path.join(DIST_DIR, st.slug, cSlug);
      ensureDirSync(cityDir);
      const cityCanonical = `${BASE_URL}/${st.slug}/${cSlug}/`;

      // 8 sibling cities for local internal linking
      const siblingSlugs = [];
      const count = Math.min(8, citySlugs.length - 1);
      for (let i = 1; i <= count; i++) {
        const nextIdx = (cIdx + i) % citySlugs.length;
        siblingSlugs.push(citySlugs[nextIdx]);
      }

      const winterLow = t1Data ? t1Data.avgWinterLow : st.winterLow;
      const frostLine = t1Data ? t1Data.frostLineInches : st.frostDepth;
      const waterUtility = t1Data ? t1Data.waterUtility : `${cityName} Municipal Water Authority`;
      const housingEra = t1Data ? t1Data.medianHousingYear : st.housingEra;
      const commonPipes = t1Data ? t1Data.commonPipes : `Copper supply lines, PEX tubing, and legacy galvanized piping common to ${st.name} homes built circa ${st.housingEra}.`;
      const permitAuth = t1Data ? t1Data.permitAuthority : `${cityName} Building & Permits Department / ${st.licensing}`;
      const uniqueContext = t1Data ? t1Data.uniqueContext : `Plumbing infrastructure in ${cityName}, ${st.name} experiences significant stress during winter freeze-thaw cycles. With average winter lows around ${st.winterLow} and typical frost lines extending ${st.frostDepth}, uninsulated supply lines in exterior walls, crawlspaces, and basement margins require rapid emergency isolation when ruptures occur.`;

      const tech = generateCityTechnicalProfile(cityName, st, cSlug);

      const cityContent = `
        <section class="hero-section">
          <div class="container">
            <div class="hero-grid">
              <div>
                <div class="hero-status-pill">
                  <span class="pulse-indicator"><span class="pulse-ping"></span><span class="pulse-core"></span></span>
                  <span>24/7 Priority Emergency Service Active</span>
                </div>
                <div class="hero-eyebrow">
                  <span>💧 24/7 EMERGENCY BURST PIPE REPAIR</span>
                </div>
                <h1 class="hero-title">Burst Pipe Repair in <span class="highlight">${cityName}, ${st.name}</span><br>24/7 Emergency Service</h1>
                <p class="hero-subtitle">Rapid emergency plumber dispatch for burst pipes, slab leaks, and frozen water lines across ${cityName} and surrounding ${st.abbr} communities.</p>
                <div class="hero-cta-group">
                  <a href="${PHONE_TEL}" class="btn-emergency-call">📞 Call Now</a>
                </div>
              </div>
              <div>
                <div class="hero-media">
                  <div class="hero-card-frame">
                    <img src="/images/burst-pipe-hero.jpg" alt="Emergency burst pipe repair in ${cityName}, ${st.name}" class="hero-main-img" width="900" height="650" loading="eager" fetchpriority="high">
                    <div class="hero-img-gradient" aria-hidden="true"></div>
                    <div class="hero-same-day-badge">
                      <span class="badge-icon">⚡</span>
                      <span>24/7 Rapid Response</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- First 10 Minutes Emergency Strip -->
        <section class="first-10-minutes-strip">
          <div class="container">
            <div class="strip-header">
              <h2>THE FIRST 10 MINUTES: EMERGENCY BURST PIPE PROTOCOL</h2>
              <p style="color: #e2e8f0; font-size: 0.875rem;">Follow these 5 immediate survival steps in ${cityName} before the technician arrives</p>
            </div>
            <div class="strip-steps-grid">
              <div class="strip-step-box">
                <span class="step-badge">STEP 1</span>
                <strong>Shut Off Main Valve:</strong> Turn clockwise until fully closed to stop water flow immediately.
              </div>
              <div class="strip-step-box">
                <span class="step-badge">STEP 2</span>
                <strong>Kill Electrical Power:</strong> Turn off breakers for flooded rooms to eliminate electrocution hazard.
              </div>
              <div class="strip-step-box">
                <span class="step-badge">STEP 3</span>
                <strong>Open Lowest Faucets:</strong> Drain trapped water pressure from vertical supply lines.
              </div>
              <div class="strip-step-box">
                <span class="step-badge">STEP 4</span>
                <strong>Capture Photo Proof:</strong> Record video and photos for insurance before cleaning surfaces.
              </div>
              <div class="strip-step-box">
                <span class="step-badge">STEP 5</span>
                <strong>Call 24/7 Dispatch:</strong> Dial <a href="${PHONE_TEL}" style="color: #fbbf24; font-weight: 700;">${PHONE_DISPLAY}</a> for urgent local plumber matching.
              </div>
            </div>
          </div>
        </section>

        <div class="container article-layout">
          <div class="article-content">
            <h2>Local ${cityName} Climate & Plumbing Infrastructure Profile</h2>
            <p>${uniqueContext}</p>

            <div class="table-responsive">
              <table class="cost-table">
                <tr><th>Local Metric</th><th>${cityName} Regional Data Point</th></tr>
                <tr><td>Winter Low Normal</td><td>${winterLow}</td></tr>
                <tr><td>Local Frost Line Depth</td><td>${frostLine}</td></tr>
                <tr><td>Municipal Water Utility</td><td>${waterUtility}</td></tr>
                <tr><td>Median Home Construction Era</td><td>Circa ${housingEra}</td></tr>
                <tr><td>Common Pipe Materials</td><td>${commonPipes}</td></tr>
                <tr><td>Permitting & Licensing Authority</td><td>${permitAuth}</td></tr>
                <tr><td>Relative Labor Cost Index</td><td>${Math.round(st.cola * 100)}% of National Baseline</td></tr>
              </table>
            </div>

            <h2>Services Available in ${cityName}</h2>
            <div class="service-grid" style="margin: 20px 0;">
              ${servicesData.map(s => `
                <div class="service-card">
                  <div class="service-card-img-wrap">
                    <img src="${s.heroImage || '/images/emergency-burst-pipe-repair.jpg'}" alt="${s.title} in ${cityName}" class="service-card-img" width="400" height="240" loading="lazy">
                  </div>
                  <div class="service-card-body">
                    <div class="service-card-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
                    </div>
                    <h3><a href="/services/${s.slug}/">${s.title} in ${cityName}</a></h3>
                    <p>${s.summary.length > 135 ? s.summary.substring(0, 135) + '...' : s.summary}</p>
                    <div class="service-card-footer">
                      <span style="font-size: 0.8rem; color: #64748b; font-weight: 600;">24/7 Local Dispatch</span>
                      <a href="/services/${s.slug}/" class="service-card-link">Learn More &rarr;</a>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- 15 Educational Blogs & Emergency Guides -->
            <h2>Emergency Pipe Repair & Prevention Guides (${cityName} Homeowner Resource Center)</h2>
            <p>Explore 15 in-depth technical guides and emergency checklists to protect your ${cityName} property, isolate pressurized line failures, and navigate insurance claims:</p>
            <div class="blog-grid">
              ${resourcesData.slice(0, 15).map(r => `
                <article class="blog-card">
                  <div>
                    <div class="blog-card-badge">
                      <span>🚨 Emergency Protocol</span>
                      <span>•</span>
                      <span>${r.readTime}</span>
                    </div>
                    <h3><a href="/resources/${r.slug}/">${r.title}</a></h3>
                    <p>${r.intro.slice(0, 140)}...</p>
                  </div>
                  <a href="/resources/${r.slug}/" class="blog-card-link">Read Emergency Guide &rarr;</a>
                </article>
              `).join('')}
            </div>

            <!-- Programmatic Deep Technical Content Below Blogs (Eliminates Duplicate Content) -->
            <h2>Engineering & Infrastructure Analysis: Burst Pipe Risks in ${cityName}, ${st.name}</h2>
            <p>Unlike generic plumbing advice, mitigating water line failures in ${cityName} requires an understanding of local subsoil geology, municipal water distribution pressures, and historical housing materials across ${st.name}. Below is an engineering overview of subterranean risks, seasonal vulnerability cycles, and property isolation protocols for ${cityName} residents.</p>

            <div class="tech-analysis-card">
              <h3>🌍 Geological Subsoil Mechanics & Subterranean Pipe Shear in ${cityName}</h3>
              <p><strong>Subsurface Soil Classification:</strong> ${tech.soilType}</p>
              <p><strong>Subgrade Mechanics:</strong> ${tech.soilCharacteristics}</p>
              <div class="diagnostic-box">
                <strong>Impact on Underground Water Mains:</strong>
                <p style="margin-top: 6px; margin-bottom: 0;">${tech.soilPipeImpact}</p>
              </div>
            </div>

            <div class="tech-analysis-card">
              <h3>🏗️ Housing Vintage & Pipe Metallurgy Failure Dynamics in ${cityName}</h3>
              <p><strong>Dominant Plumbing Vintage:</strong> Circa ${tech.estimatedEra} Construction</p>
              <h4 style="margin-top: 12px; margin-bottom: 6px; color: var(--brand-navy); font-size: 1.05rem;">${tech.pipeVintageTitle}</h4>
              <p>${tech.pipeVintageRisk}</p>
              <div class="diagnostic-box">
                <strong>Technical Mitigation & Code-Compliant Restoration:</strong>
                <p style="margin-top: 6px; margin-bottom: 0;">${tech.pipeVintageRemedy}</p>
              </div>
            </div>

            <div class="tech-analysis-card">
              <h3>📅 Seasonal 4-Quarter Pipe Rupture Risk Calendar for ${cityName}</h3>
              <p>Water pipe failures in ${cityName} follow distinct seasonal patterns driven by regional temperature extremes and municipal hydraulic cycling:</p>
              <div class="table-responsive">
                <table class="cost-table">
                  <thead>
                    <tr>
                      <th>Quarter</th>
                      <th>Vulnerability Level</th>
                      <th>Primary Failure Mechanism in ${cityName}</th>
                      <th>Recommended Homeowner Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Q1 (Jan – Mar)</strong></td>
                      <td><span class="risk-badge ${tech.q1Badge}">${tech.q1Severity}</span></td>
                      <td>Ice damming, sub-surface frost penetration, and downstream hydrostatic pressure spikes up to 3,500 PSI.</td>
                      <td>${tech.q1Action}</td>
                    </tr>
                    <tr>
                      <td><strong>Q2 (Apr – Jun)</strong></td>
                      <td><span class="risk-badge risk-moderate">Moderate Risk</span></td>
                      <td>Ground thaw settlement, soil saturation heave reversal, and lateral shear against foundation penetration sleeves.</td>
                      <td>${tech.q2Action}</td>
                    </tr>
                    <tr>
                      <td><strong>Q3 (Jul – Sep)</strong></td>
                      <td><span class="risk-badge risk-elevated">Elevated Pressure Shock</span></td>
                      <td>Municipal water tower draw-down, peak irrigation cycling, high attic thermal expansion, and solenoid valve water hammer.</td>
                      <td>${tech.q3Action}</td>
                    </tr>
                    <tr>
                      <td><strong>Q4 (Oct – Dec)</strong></td>
                      <td><span class="risk-badge risk-high">High Cold Shock</span></td>
                      <td>Sudden early polar cold snaps, undrained exterior sillcocks freezing internally, and uninsulated crawlspace wind-chill penetration.</td>
                      <td>${tech.q4Action}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="tech-analysis-card">
              <h3>🚰 Property-Specific Emergency Main Shutoff Protocol for ${cityName} Homes</h3>
              <p>${tech.shutoffLocationDetails}</p>
              <div class="diagnostic-box">
                <strong>Emergency Tip:</strong> If the interior shutoff valve is seized with mineral corrosion or calcium scale, do NOT force it with a pipe wrench, as old gate stems can snap off inside the valve body. Immediately call our 24/7 dispatch hotline at <a href="${PHONE_TEL}" style="font-weight: 700; color: var(--emergency-red);">${PHONE_DISPLAY}</a> to dispatch a licensed ${cityName} contractor equipped with municipal curb stop keys.
              </div>
            </div>

            <div class="tech-analysis-card">
              <h3>🔍 Rapid Diagnostic Checklist: Identifying Concealed Water Pipe Leaks in ${cityName}</h3>
              <div class="table-responsive">
                <table class="cost-table">
                  <thead>
                    <tr>
                      <th>Physical Symptom Observed</th>
                      <th>Likely Rupture Origin</th>
                      <th>Urgent Action Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Sudden drop in water pressure accompanied by faint hissing behind drywall.</td>
                      <td>Pressurized supply line pinhole or split fitting inside wall cavity or ceiling joist.</td>
                      <td>Shut off main water valve immediately; switch off electrical breaker for wet walls; call 24/7 dispatch.</td>
                    </tr>
                    <tr>
                      <td>Isolated hot or warm spots on concrete slab floor; sound of water running when fixtures are off.</td>
                      <td>Under-slab hot water copper line rupture or sub-foundation fitting failure.</td>
                      <td>Turn off water heater supply valve; contact emergency plumbers for electronic acoustic leak detection.</td>
                    </tr>
                    <tr>
                      <td>Unusually lush, soggy depression or pooling water in front lawn between curb and foundation.</td>
                      <td>Underground municipal water service line rupture caused by ground shear or tree root intrusion.</td>
                      <td>Isolate curb stop valve if accessible; request emergency trenchless water line repair dispatch.</td>
                    </tr>
                    <tr>
                      <td>No water flowing from faucets during sub-freezing weather with visible bulging pipe section.</td>
                      <td>Frozen pipe with internal ice plug creating extreme radial and downstream pressure.</td>
                      <td>Open affected faucets; apply gentle heat with a hair dryer from faucet toward freeze; never use open flames.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h2>Local ${cityName} Frequently Asked Questions</h2>
            <div class="faq-list">
              <div class="faq-item">
                <div class="faq-question">How fast can an emergency plumber arrive at my ${cityName} property?</div>
                <div class="faq-answer">Technicians dispatched through our 24/7 network typically arrive within 45 to 90 minutes across ${cityName} and neighboring communities. Response times vary depending on severe winter road conditions, call volumes during sudden cold snaps, and local traffic.</div>
              </div>
              <div class="faq-item">
                <div class="faq-question">Who is responsible for water service line repairs in ${cityName}?</div>
                <div class="faq-answer">Under typical municipal utility guidelines in ${cityName}, property owners are legally responsible for maintenance and repair of the private water service line extending from the curb stop box (property line) into the interior plumbing system. The municipal utility is only responsible for the main distribution line in the public right-of-way.</div>
              </div>
              <div class="faq-item">
                <div class="faq-question">Does ${cityName} municipal code require permits for emergency burst pipe repairs?</div>
                <div class="faq-answer">Minor emergency leak clamping and localized pipe section splicing generally do not require prior permitting for urgent stabilization. However, extensive line repiping, underground service line replacements, or foundation slab excavations typically require retroactive permits and inspection under ${st.name} Uniform Plumbing Code guidelines. Our licensed contractors handle all required permit documentation.</div>
              </div>
              <div class="faq-item">
                <div class="faq-question">Why are burst pipes especially hazardous during winter in ${cityName}?</div>
                <div class="faq-answer">With average winter lows reaching ${winterLow} and local frost lines penetrating ${frostLine}, freezing temperatures cause trapped water to expand by roughly 9%. When water freezes solid, it creates hydraulic pressure plugs exceeding 3,000 PSI downstream. The rupture typically occurs not where the ice formed, but downstream where hydraulic pressure fractures weakened solder joints or fittings.</div>
              </div>
              <div class="faq-item">
                <div class="faq-question">What should I do immediately while waiting for the emergency plumber in ${cityName}?</div>
                <div class="faq-answer">First, turn off the main water shutoff valve immediately. Second, cut power to any rooms with water pooling near electrical fixtures. Third, open the lowest sink or tub faucets to drain trapped line pressure. Fourth, capture photos and video of all standing water and damaged furnishings for your insurance claim. Finally, keep your phone line open for the arriving technician.</div>
              </div>
            </div>

            <h2>Nearby Communities Served in ${st.name}</h2>
            <p>Our network provides rapid emergency coverage to ${cityName} and surrounding areas:</p>
            <div class="state-grid" style="margin: 16px 0;">
              ${siblingSlugs.map(sibSlug => `
                <a href="/${st.slug}/${sibSlug}/" class="state-link-pill">
                  <span>${formatCityName(sibSlug)}</span>
                  <span class="state-abbr">${st.abbr}</span>
                </a>
              `).join('')}
            </div>

            <h2>Estimated Burst Pipe Repair Costs in ${cityName}</h2>
            <p>We believe in upfront, transparent pricing. While every plumbing emergency is unique, here are standard estimated costs for common burst pipe and water line repairs in the ${cityName} area:</p>
            <div class="table-responsive">
              <table class="cost-table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Estimated Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Standard Pipe Burst Diagnostic & Leak Detection</td><td>$150 – $350</td></tr>
                  <tr><td>Exposed Copper / PEX Pipe Section Repair</td><td>$${Math.round(350 * st.cola)} – $${Math.round(650 * st.cola)}</td></tr>
                  <tr><td>Drywall / Wall Cavity Burst Repair</td><td>$${Math.round(600 * st.cola)} – $${Math.round(1500 * st.cola)}</td></tr>
                  <tr><td>Ceiling Joist Water Line Rupture Repair</td><td>$${Math.round(800 * st.cola)} – $${Math.round(2200 * st.cola)}</td></tr>
                  <tr><td>Under-Slab Foundation Leak Repair</td><td>$${Math.round(1500 * st.cola)} – $${Math.round(4500 * st.cola)}</td></tr>
                  <tr><td>Main Water Service Line Trenchless Replacement</td><td>$${Math.round(2800 * st.cola)} – $${Math.round(6500 * st.cola)}</td></tr>
                </tbody>
              </table>
            </div>

            <div class="pricing-disclaimer-box">
              <p><strong>Please Note:</strong> These are estimated regional averages for the ${cityName} area based on standard industry rates. Actual costs may vary depending on pipe material (copper, PEX, galvanized steel), accessibility (exposed basement vs. finished drywall vs. concrete foundation slab), system age, water damage severity, and local building codes in ${st.name}. We provide a firm, upfront quote before starting any work. Call <a href="${PHONE_TEL}">${PHONE_DISPLAY}</a> for an exact diagnosis.</p>
            </div>
          </div>
        </div>
      `;

      fs.writeFileSync(path.join(cityDir, 'index.html'), renderLayout({
        title: `Burst Pipe Repair in ${cityName}, ${st.name} | 24/7 Plumber`,
        metaDesc: `Emergency burst pipe repair in ${cityName}, ${st.name}. 24/7 licensed emergency plumbers, rapid dispatch, upfront pricing. Call (855) 499-4130 now!`,
        canonical: cityCanonical,
        jsonLd: {
          "@context": "https://schema.org",
          "@graph": [
            getOrgSchema(),
            {
              "@type": "WebPage",
              "name": `Burst Pipe Repair in ${cityName}, ${st.name}`,
              "about": {
                "@type": "Service",
                "name": `Burst Pipe Repair in ${cityName}`,
                "provider": { "@id": `${BASE_URL}/#organization` },
                "areaServed": {
                  "@type": "City",
                  "name": cityName,
                  "containedInPlace": { "@type": "State", "name": st.name }
                }
              }
            }
          ]
        },
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: st.name, url: `/${st.slug}/` },
          { name: cityName, url: cityCanonical }
        ],
        content: cityContent
      }));

      totalCitiesCompiled++;
      if (totalCitiesCompiled % 5000 === 0) {
        console.log(`  ... compiled ${totalCitiesCompiled} city pages`);
      }
    });
  });

  console.log(`✅ Successfully compiled all ${totalCitiesCompiled} city pages across 50 states + DC!`);
}

// 5. Compile Cost Hub & Guides
function compileCosts() {
  const costsDir = path.join(DIST_DIR, 'plumbing-costs');
  ensureDirSync(costsDir);

  // Cost Hub
  const hubCanonical = `${BASE_URL}/plumbing-costs/`;
  const hubContent = `
    <div class="container article-layout">
      <div class="article-content">
        <h1>Plumbing Cost Guides & Price Estimates (2026)</h1>
        <p>Transparent, upfront pricing is essential when facing an unexpected plumbing disaster. Sourced from 2026 industry benchmarks (RSMeans, Angi, and Homewyse), our cost guides outline national averages, high-and-low ranges, and cost-of-living adjustments.</p>

        <h2>Explore Detailed Plumbing Cost Guides</h2>
        <div class="service-grid" style="margin: 24px 0;">
          ${costsData.map(c => `
            <div class="service-card">
              <h3><a href="/plumbing-costs/${c.slug}/">${c.title}</a></h3>
              <p>${c.summary}</p>
              <div class="service-card-meta">
                <span>Avg: ${c.nationalAverage}</span>
                <a href="/plumbing-costs/${c.slug}/">View Guide &rarr;</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  fs.writeFileSync(path.join(costsDir, 'index.html'), renderLayout({
    title: "Plumbing Cost Guides 2026 | Burst Pipe Repair Pricing",
    metaDesc: "Comprehensive plumbing cost guides: burst pipe repair, thawing frozen pipes, trenchless relining & water extraction. Call (855) 499-4130.",
    canonical: hubCanonical,
    jsonLd: { "@context": "https://schema.org", "@graph": [getOrgSchema()] },
    breadcrumbs: [{ name: "Home", url: "/" }, { name: "Pricing", url: "/plumbing-costs/" }],
    content: hubContent
  }));

  // Individual Cost Guides
  costsData.forEach(c => {
    const guideDir = path.join(costsDir, c.slug);
    ensureDirSync(guideDir);
    const guideCanonical = `${BASE_URL}/plumbing-costs/${c.slug}/`;

    const isStateMatrix = c.slug === 'burst-pipe-repair-cost-by-state';

    const guideContent = `
      <div class="container article-layout">
        <div class="article-content">
          <h1>${c.h1}</h1>
          <div class="callout-box">
            <p><strong>National Benchmark:</strong> Average repair costs range from <strong>${c.lowRange}</strong> to <strong>${c.highRange}</strong> (National Median: <strong>${c.nationalAverage}</strong>). Call <a href="${PHONE_TEL}">${PHONE_DISPLAY}</a> for an upfront written quote.</p>
          </div>
          <p>${c.summary}</p>

          ${isStateMatrix ? `
            <h2>Burst Pipe Repair Costs Across All 50 States</h2>
            <p>The table below adjusts the national baseline ($750 average) by state cost-of-living labor factors:</p>
            <div class="table-responsive">
              <table class="cost-table">
                <tr><th>State</th><th>Typical Cost Range</th><th>Average Cost</th><th>Labor Index</th></tr>
                ${statesData.map(st => `
                  <tr>
                    <td><a href="/${st.slug}/">${st.name}</a></td>
                    <td>$${Math.round(350 * st.cola)} – $${Math.round(1800 * st.cola)}</td>
                    <td>$${Math.round(750 * st.cola)}</td>
                    <td>${Math.round(st.cola * 100)}%</td>
                  </tr>
                `).join('')}
              </table>
            </div>
          ` : `
            <h2>Cost Breakdown by Repair Scenario</h2>
            <div class="table-responsive">
              <table class="cost-table">
                <tr><th>Scenario</th><th>Typical Cost Range</th><th>Estimated Timeline</th></tr>
                ${(c.costTable || []).map(row => `
                  <tr><td>${row.scenario}</td><td>${row.typicalCost}</td><td>${row.timeline}</td></tr>
                `).join('')}
              </table>
            </div>

            <h2>Factors That Affect the Final Bill</h2>
            <ul>
              ${(c.factors || []).map(f => `<li>${f}</li>`).join('')}
            </ul>
          `}

          <h2>Frequently Asked Questions</h2>
          <div class="faq-list">
            ${(c.faqs || []).map(f => `
              <div class="faq-item">
                <div class="faq-question">${f.q}</div>
                <div class="faq-answer">${f.a}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    fs.writeFileSync(path.join(guideDir, 'index.html'), renderLayout({
      title: c.metaTitle,
      metaDesc: c.metaDesc,
      canonical: guideCanonical,
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          getOrgSchema(),
          {
            "@type": "Article",
            "headline": c.h1,
            "description": c.summary,
            "author": { "@type": "Organization", "name": "24/7 Pipe Rescue Editorial Team" },
            "datePublished": "2026-01-15T00:00:00+00:00",
            "dateModified": "2026-10-08T00:00:00+00:00"
          }
        ]
      },
      breadcrumbs: [
        { name: "Home", url: "/" },
        { name: "Pricing", url: "/plumbing-costs/" },
        { name: c.title, url: guideCanonical }
      ],
      content: guideContent
    }));
  });
}

// 6. Compile Resources Hub & 20 Educational Guides
function compileResources() {
  const resDir = path.join(DIST_DIR, 'resources');
  ensureDirSync(resDir);

  // Resources Hub
  const hubCanonical = `${BASE_URL}/resources/`;
  const hubContent = `
    <div class="container article-layout">
      <div class="article-content">
        <h1>Emergency Plumbing & Freeze Guides</h1>
        <p>Authoritative, step-by-step educational guides to help homeowners handle active water emergencies, prevent winter pipe freezing, and document insurance damage.</p>

        <div class="service-grid" style="margin: 24px 0;">
          ${resourcesData.map(r => `
            <div class="service-card">
              <h3><a href="/resources/${r.slug}/">${r.title}</a></h3>
              <p>${r.intro.substring(0, 140)}...</p>
              <div class="service-card-meta">
                <span>${r.readTime}</span>
                <a href="/resources/${r.slug}/">Read Guide &rarr;</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  fs.writeFileSync(path.join(resDir, 'index.html'), renderLayout({
    title: "Emergency Plumbing Guides & Prevention | 24/7 Pipe Rescue",
    metaDesc: "Step-by-step guides: what to do when a pipe bursts, shutting off main valves, thawing frozen pipes & insurance claims. Call (855) 499-4130.",
    canonical: hubCanonical,
    jsonLd: { "@context": "https://schema.org", "@graph": [getOrgSchema()] },
    breadcrumbs: [{ name: "Home", url: "/" }, { name: "Guides", url: "/resources/" }],
    content: hubContent
  }));

  // Individual Guides
  resourcesData.forEach(r => {
    const guideDir = path.join(resDir, r.slug);
    ensureDirSync(guideDir);
    const guideCanonical = `${BASE_URL}/resources/${r.slug}/`;

    const guideContent = `
      <div class="container article-layout">
        <div class="article-content">
          <h1>${r.h1}</h1>
          <div class="callout-box">
            <p><strong>Emergency Alert:</strong> Facing an active pipe rupture? Close your main shutoff immediately and call our 24/7 hotline at <a href="${PHONE_TEL}">${PHONE_DISPLAY}</a>.</p>
          </div>
          <p>${r.intro}</p>

          <h2>Step-by-Step Instructions</h2>
          <ol>
            ${(r.steps || []).map(st => `
              <li style="margin-bottom: 20px;">
                <strong>${st.title}</strong>
                <p style="margin-top: 4px;">${st.desc}</p>
              </li>
            `).join('')}
          </ol>

          <h2>When to Call a Licensed Plumber</h2>
          <p>If you cannot locate your main valve, if high-pressure water is discharging into finished ceilings, or if a pipe is split from winter freezing, do not wait. Visit our <a href="${r.pillarLink}">specialized service page</a> or call <a href="${PHONE_TEL}">${PHONE_DISPLAY}</a> to dispatch an emergency contractor immediately.</p>
        </div>
      </div>
    `;

    fs.writeFileSync(path.join(guideDir, 'index.html'), renderLayout({
      title: r.metaTitle,
      metaDesc: r.metaDesc,
      canonical: guideCanonical,
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          getOrgSchema(),
          {
            "@type": "Article",
            "headline": r.h1,
            "description": r.metaDesc,
            "author": { "@type": "Organization", "name": "24/7 Pipe Rescue Editorial Team" },
            "datePublished": "2026-02-01T00:00:00+00:00",
            "dateModified": "2026-10-08T00:00:00+00:00"
          }
        ]
      },
      breadcrumbs: [
        { name: "Home", url: "/" },
        { name: "Guides", url: "/resources/" },
        { name: r.title, url: guideCanonical }
      ],
      content: guideContent
    }));
  });
}

// 7. Compile Trust & Legal Pages
function compileLegal() {
  const pages = [
    { slug: 'about', data: legalData.about },
    { slug: 'how-it-works', data: legalData.howItWorks, isHowItWorks: true },
    { slug: 'contact', data: legalData.contact, isContact: true },
    { slug: 'advertising-disclosure', data: legalData.advertisingDisclosure },
    { slug: 'privacy-policy', data: legalData.privacyPolicy },
    { slug: 'terms-of-service', data: legalData.termsOfService }
  ];

  pages.forEach(p => {
    const pageDir = path.join(DIST_DIR, p.slug);
    ensureDirSync(pageDir);
    const canonical = `${BASE_URL}/${p.slug}/`;

    let innerContent = '';
    if (p.isHowItWorks) {
      innerContent = `
        <h1>${p.data.h1}</h1>
        <div class="process-grid" style="margin: 24px 0;">
          ${p.data.steps.map(s => `
            <div class="process-card">
              <div class="process-num">0${s.num}</div>
              <h3>${s.title}</h3>
              <p>${s.desc}</p>
            </div>
          `).join('')}
        </div>
      `;
    } else if (p.isContact) {
      innerContent = `
        <h1>${p.data.h1}</h1>
        <div class="hero-grid" style="margin: 24px 0;">
          <div>
            <h2>24/7 National Dispatch Center</h2>
            <p style="font-size: 1.25rem; font-weight: 800; color: #dc2626; margin: 16px 0;">
              Call: <a href="${PHONE_TEL}">${p.data.phone}</a>
            </p>
            <p><strong>Operating Hours:</strong> ${p.data.hours}</p>
            <p><strong>Email Inquiries:</strong> ${p.data.email}</p>
          </div>
          <div class="dispatch-card">
            <h2>Immediate Assistance</h2>
            <p class="form-desc">Zero waiting: Speak directly with emergency dispatch</p>
            <div style="background: #fef2f2; border: 2px dashed #dc2626; border-radius: 8px; padding: 16px; text-align: center; margin-bottom: 16px;">
              <div style="font-size: 0.8125rem; font-weight: 700; color: #991b1b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">⚡ National 24/7 Dispatch Hotline</div>
              <a href="${PHONE_TEL}" style="font-size: 1.6rem; font-weight: 900; color: #dc2626; text-decoration: none; display: block; line-height: 1.2;">
                ${PHONE_DISPLAY}
              </a>
              <div style="font-size: 0.75rem; color: #64748b; margin-top: 4px;">Toll-Free Across All 50 States & DC</div>
            </div>
            <p style="font-size: 0.875rem; color: #334155; line-height: 1.5; margin-bottom: 16px;">Water gushing through floors or ceilings? Call our 24/7 telephone dispatch hotline immediately. Operators connect you directly to vetted licensed plumbing contractors in your local area code.</p>
            <a href="${PHONE_TEL}" class="btn-emergency-call" style="width: 100%; text-align: center; display: block;">📞 Call Now</a>
          </div>
        </div>
      `;
    } else {
      innerContent = `
        <h1>${p.data.h1}</h1>
        ${p.data.content}
      `;
    }

    const content = `
      <div class="container article-layout">
        <div class="article-content">
          ${innerContent}
        </div>
      </div>
    `;

    fs.writeFileSync(path.join(pageDir, 'index.html'), renderLayout({
      title: p.data.metaTitle,
      metaDesc: p.data.metaDesc,
      canonical,
      jsonLd: { "@context": "https://schema.org", "@graph": [getOrgSchema()] },
      breadcrumbs: [{ name: "Home", url: "/" }, { name: p.data.title, url: canonical }],
      content
    }));
  });
}

// 8. Compile HTML Sitemap
function compileHtmlSitemap() {
  const sitemapDir = path.join(DIST_DIR, 'sitemap');
  ensureDirSync(sitemapDir);
  const canonical = `${BASE_URL}/sitemap/`;

  const content = `
    <div class="container article-layout">
      <div class="article-content">
        <h1>24/7 Pipe Rescue Complete Site Directory</h1>
        <p>A full index of services, regional hubs, pricing guides, and educational articles.</p>

        <h2>Core Pages</h2>
        <ul>
          <li><a href="/">Home (National Hub)</a></li>
          <li><a href="/services/">Services Directory</a></li>
          <li><a href="/states/">50-State Coverage Directory</a></li>
          <li><a href="/plumbing-costs/">Plumbing Cost Guides</a></li>
          <li><a href="/resources/">Emergency Guides Hub</a></li>
          <li><a href="/about/">About Us</a></li>
          <li><a href="/how-it-works/">How It Works</a></li>
          <li><a href="/contact/">Contact Dispatch</a></li>
        </ul>

        <h2>Service Pillars</h2>
        <ul>
          ${servicesData.map(s => `<li><a href="/services/${s.slug}/">${s.title}</a></li>`).join('')}
        </ul>

        <h2>State Hubs</h2>
        <ul>
          ${statesData.map(st => `<li><a href="/${st.slug}/">${st.name} Burst Pipe Repair</a></li>`).join('')}
        </ul>

        <h2>Pricing Guides</h2>
        <ul>
          ${costsData.map(c => `<li><a href="/plumbing-costs/${c.slug}/">${c.title}</a></li>`).join('')}
        </ul>

        <h2>Educational Guides</h2>
        <ul>
          ${resourcesData.map(r => `<li><a href="/resources/${r.slug}/">${r.title}</a></li>`).join('')}
        </ul>
      </div>
    </div>
  `;

  fs.writeFileSync(path.join(sitemapDir, 'index.html'), renderLayout({
    title: "HTML Sitemap | 24/7 Pipe Rescue Site Directory",
    metaDesc: "Complete hierarchical site index for 24/7 Pipe Rescue: emergency services, 50 state directories, pricing guides & resources.",
    canonical,
    jsonLd: { "@context": "https://schema.org", "@graph": [getOrgSchema()] },
    breadcrumbs: [{ name: "Home", url: "/" }, { name: "Sitemap", url: canonical }],
    content
  }));
}

// 9. Generate Robots.txt and Split XML Sitemaps
function compileSitemapsAndRobots() {
  // robots.txt
  const robotsTxt = `User-agent: *
Allow: /
Allow: /*.css$
Allow: /*.js$
Allow: /*.webp$
Allow: /*.svg$
Allow: /*.png$
Allow: /*.jpg$

Disallow: /*?*
Disallow: /api/
Disallow: /thank-you/
Disallow: /search/
Disallow: /drafts/

Sitemap: ${BASE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt);

  const now = new Date().toISOString().split('T')[0];

  function wrapUrlset(urls) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u}</loc>
    <lastmod>${now}</lastmod>
  </url>`).join('\n')}
</urlset>`;
  }

  // Core URLs
  const coreUrls = [
    `${BASE_URL}/`,
    `${BASE_URL}/about/`,
    `${BASE_URL}/how-it-works/`,
    `${BASE_URL}/contact/`,
    `${BASE_URL}/advertising-disclosure/`,
    `${BASE_URL}/privacy-policy/`,
    `${BASE_URL}/terms-of-service/`,
    `${BASE_URL}/sitemap/`
  ];
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap-core.xml'), wrapUrlset(coreUrls));

  // Services URLs (Pillars + Children - all flat under /services/ - max 3 depth)
  const serviceUrls = [`${BASE_URL}/services/`];
  servicesData.forEach(p => {
    serviceUrls.push(`${BASE_URL}/services/${p.slug}/`);
    p.children.forEach(ch => {
      serviceUrls.push(`${BASE_URL}/services/${ch.slug}/`);
    });
  });
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap-services.xml'), wrapUrlset(serviceUrls));

  // Costs URLs
  const costUrls = [`${BASE_URL}/plumbing-costs/`];
  costsData.forEach(c => costUrls.push(`${BASE_URL}/plumbing-costs/${c.slug}/`));
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap-costs.xml'), wrapUrlset(costUrls));

  // Resources URLs
  const resUrls = [`${BASE_URL}/resources/`];
  resourcesData.forEach(r => resUrls.push(`${BASE_URL}/resources/${r.slug}/`));
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap-resources.xml'), wrapUrlset(resUrls));

  // States URLs & 51 State-City Sitemaps (domain.com/[state]/ and domain.com/[state]/[city]/ - max 3 depth)
  const stateUrls = [];
  const sitemapIndexList = [
    `${BASE_URL}/sitemap-core.xml`,
    `${BASE_URL}/sitemap-services.xml`,
    `${BASE_URL}/sitemap-costs.xml`,
    `${BASE_URL}/sitemap-resources.xml`,
    `${BASE_URL}/sitemap-states.xml`
  ];

  statesData.forEach(st => {
    stateUrls.push(`${BASE_URL}/${st.slug}/`);

    // State-specific city sitemap
    const citySlugs = citiesByState[st.slug] || [];
    const stateCityUrls = [];
    citySlugs.forEach(cSlug => {
      stateCityUrls.push(`${BASE_URL}/${st.slug}/${cSlug}/`);
    });

    const sitemapFilename = `sitemap-cities-${st.slug}.xml`;
    fs.writeFileSync(path.join(DIST_DIR, sitemapFilename), wrapUrlset(stateCityUrls));
    sitemapIndexList.push(`${BASE_URL}/${sitemapFilename}`);
  });
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap-states.xml'), wrapUrlset(stateUrls));

  // Master Sitemap Index
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapIndexList.map(loc => `  <sitemap><loc>${loc}</loc><lastmod>${now}</lastmod></sitemap>`).join('\n')}
</sitemapindex>
`;
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapIndex);
}

// 10. Copy Public Static Assets
function copyStaticAssets() {
  const srcCss = path.join(__dirname, 'public', 'css');
  const distCss = path.join(DIST_DIR, 'css');
  ensureDirSync(distCss);

  if (fs.existsSync(srcCss)) {
    fs.readdirSync(srcCss).forEach(file => {
      fs.copyFileSync(path.join(srcCss, file), path.join(distCss, file));
    });
  }

  const srcImages = path.join(__dirname, 'public', 'images');
  const distImages = path.join(DIST_DIR, 'images');
  ensureDirSync(distImages);

  if (fs.existsSync(srcImages)) {
    fs.readdirSync(srcImages).forEach(file => {
      fs.copyFileSync(path.join(srcImages, file), path.join(distImages, file));
    });
  }
}

// Master Run
console.log('🚀 Building 24/7 Pipe Rescue Nationwide Static Platform (30,000+ Locations)...');
ensureDirSync(DIST_DIR);
copyStaticAssets();
compileHomepage();
compileServices();
compileStates();
compileAllCities();
compileCosts();
compileResources();
compileLegal();
compileHtmlSitemap();
compileSitemapsAndRobots();
console.log('✅ Build complete! All pages and split XML sitemaps compiled to /dist.');


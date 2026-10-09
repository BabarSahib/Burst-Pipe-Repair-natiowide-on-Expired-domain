// 24/7 Pipe Rescue - In-Memory Edge Page Renderer (Zero Filesystem Dependency)
// Runs on Cloudflare Workers edge runtime with microsecond latency

const servicesData = require('./data/services');
const { statesData, tier1CitiesData } = require('./data/locations');
const citiesByState = require('./data/cities_by_state.json');
const costsData = require('./data/costs');
const resourcesData = require('./data/resources');
const legalData = require('./data/legal');

const BASE_URL = 'https://hardusplumbing.com';
const PHONE_DISPLAY = '(855) 499-4130';
const PHONE_TEL = 'tel:+18554994130';

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

function generateCityTechnicalProfile(cityName, st, cSlug) {
  let hash = 0;
  for (let i = 0; i < cSlug.length; i++) {
    hash = (hash * 31 + cSlug.charCodeAt(i)) >>> 0;
  }

  let soilType, soilCharacteristics, soilPipeImpact;
  if (['florida', 'hawaii', 'louisiana', 'mississippi', 'alabama', 'south-carolina'].includes(st.slug)) {
    const variants = [
      {
        type: "Coastal Saturated Sandy Loam with High Groundwater Table",
        char: "High porosity and rapid moisture migration; corrosive chlorides present in sub-surface strata.",
        impact: `In ${cityName}, high groundwater tables and saline-permeated soil accelerate galvanic oxidation on exterior-buried copper supply risers. Sinking sand beds cause mechanical differential settlement shear at slab penetration sleeves.`
      },
      {
        type: "Alluvial Marine Silt and Calcareous Marl Deposits",
        char: "Alkaline marl and organic muck lenses subject to chronic subsidence and moisture saturation.",
        impact: `Continuous moisture saturation creates localized anaerobic soil conditions in ${cityName}, resulting in severe pitting and premature wall thinning on metal pipe assemblies before entering the foundation envelope.`
      }
    ];
    const sel = variants[hash % variants.length];
    soilType = sel.type;
    soilCharacteristics = sel.char;
    soilPipeImpact = sel.impact;
  } else if (['texas', 'arizona', 'nevada', 'new-mexico', 'utah', 'colorado', 'oklahoma', 'kansas'].includes(st.slug)) {
    const variants = [
      {
        type: "High-Plasticity Expansive Smectite Clay (Bentonite Horizon)",
        char: "Extreme volumetric swell-shrink cycle with deep seasonal desiccation cracking.",
        impact: `During prolonged dry spells followed by sudden heavy rainfall in ${cityName}, heavy clay soils expand up to 40% in volume. This intense vertical and lateral soil pressure exerts catastrophic bending shear on rigid copper and PVC water service lines running beneath concrete foundation grade beams.`
      },
      {
        type: "Caliche and Calcareous Hardpan Strata over Dense Silt",
        char: "Cemented calcium carbonate crust offering near-zero flexibility under ground movement.",
        impact: `Rigid caliche formations around ${cityName} restrict natural thermal pipe expansion. Vibrations from municipal water surges wedge rigid pipe against rock-hard subsoil, wearing through pipe walls via localized friction point abrasion.`
      }
    ];
    const sel = variants[hash % variants.length];
    soilType = sel.type;
    soilCharacteristics = sel.char;
    soilPipeImpact = sel.impact;
  } else {
    const variants = [
      {
        type: "Dense Glacial Till with Silty Clay Matrix and Granite Cobbles",
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

  let primaryShutoffLocation, shutoffToolsNeeded, curbBoxAccessNotes;
  if (['florida', 'texas', 'california', 'arizona', 'louisiana'].includes(st.slug)) {
    primaryShutoffLocation = `Exterior Ground Meter Box / Water Heater Isolation Loop`;
    shutoffToolsNeeded = `Standard 5-sided Water Meter Curb Key, Crescent Wrench, or Heavy-Duty Slip-Joint Pliers`;
    curbBoxAccessNotes = `In ${cityName}, most residential main shutoffs are situated in an inground concrete or polymer meter box near the front sidewalk or property boundary. In homes with exterior tankless water heaters, a dedicated brass ball valve is typically located on the incoming cold-water riser directly beneath the unit.`;
  } else {
    primaryShutoffLocation = `Basement Rim Joist / Crawlspace Foundation Penetration / Utility Closet`;
    shutoffToolsNeeded = `Adjustable Pipe Wrench, WD-40 / Penetrating Oil (for seized legacy gate valves), Flashlight`;
    curbBoxAccessNotes = `Due to frost line requirements in ${cityName} (${st.frostDepth}), main water service lines enter below grade through the front foundation wall. The primary shutoff is located inside the basement or mechanical crawlspace immediately ahead of the water meter or pressure reducing valve. Turn the brass lever clockwise perpendicular to the pipe.`;
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
    shutoffLocationDetails: `In ${cityName}, homes built circa ${estimatedEra} typically locate the primary shutoff at: <strong>${primaryShutoffLocation}</strong>. Required emergency tools: <em>${shutoffToolsNeeded}</em>. ${curbBoxAccessNotes}`
  };
}

// Maps
const statesBySlug = new Map(statesData.map(s => [s.slug, s]));
const servicesBySlug = new Map(servicesData.map(s => [s.slug, s]));
const costsBySlug = new Map(costsData.map(c => [c.slug, c]));
const resourcesBySlug = new Map(resourcesData.map(r => [r.slug, r]));
const legalPagesList = [
  { slug: 'about', data: legalData.about },
  { slug: 'how-it-works', data: legalData.howItWorks, isHowItWorks: true },
  { slug: 'contact', data: legalData.contact, isContact: true },
  { slug: 'advertising-disclosure', data: legalData.advertisingDisclosure },
  { slug: 'privacy-policy', data: legalData.privacyPolicy },
  { slug: 'terms-of-service', data: legalData.termsOfService }
];
const legalBySlug = new Map(legalPagesList.map(l => [l.slug, l]));

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

// 1. Homepage
function getHomepageHtml() {
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
            <div class="faq-question">Does homeowner insurance cover burst pipe repairs?</div>
            <div class="faq-answer">Most standard homeowner policies cover the resultant water damage from sudden, accidental pipe bursts (flooring, drywall, structural drying). However, the actual plumbing line repair itself is often considered homeowner maintenance. We provide itemized receipts to simplify claims.</div>
          </div>
        </div>
      </div>
    </section>
  `;

  return renderLayout({
    title: "Emergency Burst Pipe Repair Nationwide | 24/7 Plumber Dispatch",
    metaDesc: "Water pipe burst? 24/7 Pipe Rescue connects you with licensed emergency plumbers nationwide. Fast 24/7 dispatch & upfront quotes. Call (855) 499-4130.",
    canonical,
    jsonLd,
    breadcrumbs: [],
    content
  });
}

// 2. State Page
function getStateHtml(stSlug) {
  const st = statesBySlug.get(stSlug);
  if (!st) return null;

  const stateCanonical = `${BASE_URL}/${st.slug}/`;
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

  return renderLayout({
    title: `Burst Pipe Repair in ${st.name} | 24/7 Emergency Plumber`,
    metaDesc: `Emergency burst pipe repair in ${st.name}. Connect with licensed local plumbers. Upfront pricing, 24/7 dispatch. Call (855) 499-4130 now.`,
    canonical: stateCanonical,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        getOrgSchema(),
        {
          "@type": "WebPage",
          "@id": `${stateCanonical}#webpage`,
          "url": stateCanonical,
          "name": `Burst Pipe Repair Services in ${st.name}`,
          "description": `Emergency burst pipe repair network covering homeowners across ${st.name}.`
        }
      ]
    },
    breadcrumbs: [{ name: "Home", url: "/" }, { name: st.name, url: stateCanonical }],
    content: stateContent
  });
}

// 3. City Page
function getCityHtml(stSlug, citySlug) {
  const st = statesBySlug.get(stSlug);
  if (!st) return null;

  const cityName = formatCityName(citySlug);
  const cityCanonical = `${BASE_URL}/${st.slug}/${citySlug}/`;

  const stateCities = citiesByState[st.slug] || [];
  const currentIndex = stateCities.indexOf(citySlug);
  const siblingSlugs = [];
  for (let step = 1; siblingSlugs.length < 8 && step < stateCities.length; step++) {
    const nextIdx = (currentIndex + step) % stateCities.length;
    siblingSlugs.push(stateCities[nextIdx]);
  }

  const t1Key = `${citySlug}-${st.slug}`;
  const t1Data = tier1CitiesData ? tier1CitiesData[t1Key] : null;

  const winterLow = t1Data ? t1Data.winterLow : st.winterLow;
  const frostLine = t1Data ? t1Data.frostLine : st.frostDepth;
  const waterUtility = t1Data ? t1Data.waterUtility : `${cityName} Water & Sewer Authority`;
  const housingEra = t1Data ? t1Data.housingEra : st.housingEra;
  const commonPipes = t1Data ? t1Data.commonPipes : `Copper supply lines, PEX tubing, and legacy galvanized piping common to ${st.name} homes built circa ${st.housingEra}.`;
  const permitAuth = t1Data ? t1Data.permitAuthority : `${cityName} Building & Permits Department / ${st.licensing}`;
  const uniqueContext = t1Data ? t1Data.uniqueContext : `Plumbing infrastructure in ${cityName}, ${st.name} experiences significant stress during winter freeze-thaw cycles. With average winter lows around ${st.winterLow} and typical frost lines extending ${st.frostDepth}, uninsulated supply lines in exterior walls, crawlspaces, and basement margins require rapid emergency isolation when ruptures occur.`;

  const tech = generateCityTechnicalProfile(cityName, st, citySlug);

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
        <p>We believe in upfront, transparent pricing. Standard estimated costs for common repairs in ${cityName}:</p>
        <div class="table-responsive">
          <table class="cost-table">
            <thead>
              <tr><th>Service</th><th>Estimated Cost</th></tr>
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
          <p><strong>Please Note:</strong> These are estimated regional averages for the ${cityName} area based on standard industry rates. Actual costs may vary depending on pipe material, accessibility, system age, and local codes in ${st.name}. Call <a href="${PHONE_TEL}">${PHONE_DISPLAY}</a> for an upfront quote.</p>
        </div>
      </div>
    </div>
  `;

  return renderLayout({
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
  });
}

// 4. Hub Pages
function getStatesHubHtml() {
  const canonical = `${BASE_URL}/states/`;
  const content = `
    <div class="container article-layout">
      <div class="article-content">
        <h1>50-State Emergency Burst Pipe Service Coverage Directory</h1>
        <p>24/7 Pipe Rescue connects property owners across all 50 US States and Washington DC with licensed, vetted local plumbing contractors.</p>
        <div class="state-grid" style="margin: 30px 0;">
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
  return renderLayout({
    title: "50-State Plumbing Coverage Directory | 24/7 Pipe Rescue",
    metaDesc: "Complete 50-state directory for emergency burst pipe repair services. 24/7 dispatch across all US states. Call (855) 499-4130.",
    canonical,
    jsonLd: { "@context": "https://schema.org", "@graph": [getOrgSchema()] },
    breadcrumbs: [{ name: "Home", url: "/" }, { name: "Service Areas", url: canonical }],
    content
  });
}

const servicePillarsBySlug = new Map();
const serviceChildrenBySlug = new Map();
servicesData.forEach(pillar => {
  servicePillarsBySlug.set(pillar.slug, pillar);
  pillar.children.forEach(ch => {
    serviceChildrenBySlug.set(ch.slug, { child: ch, pillar });
  });
});

function getServicesHubHtml() {
  const canonical = `${BASE_URL}/services/`;
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
          ${servicesData.map(s => renderServiceCard(s, `Avg: ${s.priceRange.split('(')[0]}`, 'Learn More')).join('')}
        </div>
      </div>
    </div>
  `;
  return renderLayout({
    title: "Pipe Repair Services | Complete Solutions & Emergency Fixes",
    metaDesc: "Explore professional pipe repair services: emergency burst pipes, frozen thawing, copper/PEX fixes & trenchless main lines. Call (855) 499-4130.",
    canonical,
    jsonLd: { "@context": "https://schema.org", "@graph": [getOrgSchema()] },
    breadcrumbs: [{ name: "Home", url: "/" }, { name: "Services", url: canonical }],
    content
  });
}

function getServicePillarHtml(pillar) {
  const canonical = `${BASE_URL}/services/${pillar.slug}/`;
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

  return renderLayout({
    title: pillar.metaTitle,
    metaDesc: pillar.metaDesc,
    canonical,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        getOrgSchema(),
        {
          "@type": "Service",
          "@id": `${canonical}#service`,
          "name": pillar.title,
          "serviceType": "Emergency Pipe Repair",
          "provider": { "@id": `${BASE_URL}/#organization` },
          "areaServed": { "@type": "Country", "name": "United States" },
          "description": pillar.summary,
          "image": `${BASE_URL}${pillar.heroImage}`
        }
      ]
    },
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Services", url: "/services/" },
      { name: pillar.title, url: canonical }
    ],
    content
  });
}

function getServiceChildHtml(ch, pillar) {
  const canonical = `${BASE_URL}/services/${ch.slug}/`;
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

  return renderLayout({
    title: ch.metaTitle,
    metaDesc: ch.metaDesc,
    canonical,
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
      { name: ch.title, url: canonical }
    ],
    content
  });
}

function getCostsHubHtml() {
  const canonical = `${BASE_URL}/plumbing-costs/`;
  const content = `
    <div class="container article-layout">
      <div class="article-content">
        <h1>Plumbing Cost Guides & Price Estimates (2026)</h1>
        <p>Transparent pricing benchmarks for burst pipe repairs, slab leak detection, and trenchless service lines.</p>
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
  return renderLayout({
    title: "Plumbing Cost Guides 2026 | Burst Pipe Repair Pricing",
    metaDesc: "Comprehensive plumbing cost guides: burst pipe repair, thawing frozen pipes, trenchless relining & water extraction. Call (855) 499-4130.",
    canonical,
    jsonLd: { "@context": "https://schema.org", "@graph": [getOrgSchema()] },
    breadcrumbs: [{ name: "Home", url: "/" }, { name: "Pricing", url: canonical }],
    content
  });
}

function getResourcesHubHtml() {
  const canonical = `${BASE_URL}/resources/`;
  const content = `
    <div class="container article-layout">
      <div class="article-content">
        <h1>Emergency Plumbing & Freeze Guides</h1>
        <p>Authoritative, step-by-step educational guides to handle active water emergencies, prevent winter pipe freezing, and document insurance damage.</p>
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
  return renderLayout({
    title: "Emergency Plumbing Guides & Prevention | 24/7 Pipe Rescue",
    metaDesc: "Step-by-step guides: what to do when a pipe bursts, shutting off main valves, thawing frozen pipes & insurance claims. Call (855) 499-4130.",
    canonical,
    jsonLd: { "@context": "https://schema.org", "@graph": [getOrgSchema()] },
    breadcrumbs: [{ name: "Home", url: "/" }, { name: "Guides", url: canonical }],
    content
  });
}

function getLegalPageHtml(slug) {
  const p = legalBySlug.get(slug);
  if (!p) return null;
  const canonical = `${BASE_URL}/${p.slug}/`;

  let innerContent;
  if (p.isContact) {
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
        <div class="hero-media">
          <div class="hero-card-frame">
            <img src="/images/burst-pipe-hero.jpg" alt="Contact 24/7 Pipe Rescue 24/7 Emergency Dispatch" class="hero-main-img" width="900" height="650">
            <div class="hero-same-day-badge"><span>⚡ 24/7 Hotline</span></div>
          </div>
        </div>
      </div>
    `;
  } else {
    innerContent = `
      <h1>${p.data.h1}</h1>
      ${p.data.content || ''}
    `;
  }

  const content = `
    <div class="container article-layout">
      <div class="article-content">
        ${innerContent}
      </div>
    </div>
  `;

  return renderLayout({
    title: p.data.metaTitle,
    metaDesc: p.data.metaDesc,
    canonical,
    jsonLd: { "@context": "https://schema.org", "@graph": [getOrgSchema()] },
    breadcrumbs: [{ name: "Home", url: "/" }, { name: p.data.title, url: canonical }],
    content
  });
}

function getHtmlSitemap() {
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

  return renderLayout({
    title: "HTML Sitemap | 24/7 Pipe Rescue Site Directory",
    metaDesc: "Complete hierarchical site index for 24/7 Pipe Rescue: emergency services, 50 state directories, pricing guides & resources.",
    canonical,
    jsonLd: { "@context": "https://schema.org", "@graph": [getOrgSchema()] },
    breadcrumbs: [{ name: "Home", url: "/" }, { name: "Sitemap", url: canonical }],
    content
  });
}

const sitemapXmlCache = new Map();

function wrapUrlset(urls) {
  const now = new Date().toISOString().split('T')[0];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${now}</lastmod>\n  </url>`).join('\n')}\n</urlset>\n`;
}

// Master Request Resolver (Zero-FS)
function handleEdgeRoute(pathname) {
  let p = pathname || '/';
  if (!p.startsWith('/')) p = '/' + p;
  if (p.endsWith('/') && p !== '/') p = p.slice(0, -1);

  // Home
  if (p === '' || p === '/') {
    return { status: 200, contentType: 'text/html; charset=utf-8', body: getHomepageHtml() };
  }

  // Robots
  if (p === '/robots.txt') {
    return {
      status: 200,
      contentType: 'text/plain; charset=utf-8',
      body: `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`
    };
  }

  // HTML Sitemap
  if (p === '/sitemap') {
    return {
      status: 200,
      contentType: 'text/html; charset=utf-8',
      body: getHtmlSitemap()
    };
  }

  // Master XML Sitemap Index
  if (p === '/sitemap.xml') {
    if (!sitemapXmlCache.has('index')) {
      const sitemapIndexList = [
        `${BASE_URL}/sitemap-core.xml`,
        `${BASE_URL}/sitemap-services.xml`,
        `${BASE_URL}/sitemap-costs.xml`,
        `${BASE_URL}/sitemap-resources.xml`,
        `${BASE_URL}/sitemap-states.xml`
      ];
      statesData.forEach(st => sitemapIndexList.push(`${BASE_URL}/sitemap-cities-${st.slug}.xml`));
      const now = new Date().toISOString().split('T')[0];
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapIndexList.map(loc => `  <sitemap><loc>${loc}</loc><lastmod>${now}</lastmod></sitemap>`).join('\n')}\n</sitemapindex>\n`;
      sitemapXmlCache.set('index', xml);
    }
    return { status: 200, contentType: 'application/xml; charset=utf-8', body: sitemapXmlCache.get('index') };
  }

  // Core XML Sitemap
  if (p === '/sitemap-core.xml') {
    if (!sitemapXmlCache.has('core')) {
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
      sitemapXmlCache.set('core', wrapUrlset(coreUrls));
    }
    return { status: 200, contentType: 'application/xml; charset=utf-8', body: sitemapXmlCache.get('core') };
  }

  // Services XML Sitemap
  if (p === '/sitemap-services.xml') {
    if (!sitemapXmlCache.has('services')) {
      const serviceUrls = [`${BASE_URL}/services/`];
      servicesData.forEach(pr => {
        serviceUrls.push(`${BASE_URL}/services/${pr.slug}/`);
        pr.children.forEach(ch => {
          serviceUrls.push(`${BASE_URL}/services/${ch.slug}/`);
        });
      });
      sitemapXmlCache.set('services', wrapUrlset(serviceUrls));
    }
    return { status: 200, contentType: 'application/xml; charset=utf-8', body: sitemapXmlCache.get('services') };
  }

  // Costs XML Sitemap
  if (p === '/sitemap-costs.xml') {
    if (!sitemapXmlCache.has('costs')) {
      const costUrls = [`${BASE_URL}/plumbing-costs/`];
      costsData.forEach(c => costUrls.push(`${BASE_URL}/plumbing-costs/${c.slug}/`));
      sitemapXmlCache.set('costs', wrapUrlset(costUrls));
    }
    return { status: 200, contentType: 'application/xml; charset=utf-8', body: sitemapXmlCache.get('costs') };
  }

  // Resources XML Sitemap
  if (p === '/sitemap-resources.xml') {
    if (!sitemapXmlCache.has('resources')) {
      const resUrls = [`${BASE_URL}/resources/`];
      resourcesData.forEach(r => resUrls.push(`${BASE_URL}/resources/${r.slug}/`));
      sitemapXmlCache.set('resources', wrapUrlset(resUrls));
    }
    return { status: 200, contentType: 'application/xml; charset=utf-8', body: sitemapXmlCache.get('resources') };
  }

  // States XML Sitemap
  if (p === '/sitemap-states.xml') {
    if (!sitemapXmlCache.has('states')) {
      const stateUrls = statesData.map(st => `${BASE_URL}/${st.slug}/`);
      sitemapXmlCache.set('states', wrapUrlset(stateUrls));
    }
    return { status: 200, contentType: 'application/xml; charset=utf-8', body: sitemapXmlCache.get('states') };
  }

  // State-specific City XML Sitemaps (supports /sitemap-cities-[state].xml, /sitemap-state-[state].xml, and /sitemap-[state].xml)
  const stateMatch = p.match(/^\/sitemap-(?:cities-|state-)?([a-z0-9-]+)\.xml$/);
  if (stateMatch) {
    const stSlug = stateMatch[1];
    if (statesBySlug.has(stSlug)) {
      const cacheKey = `state-${stSlug}`;
      if (!sitemapXmlCache.has(cacheKey)) {
        const citySlugs = citiesByState[stSlug] || [];
        const stateCityUrls = [
          `${BASE_URL}/${stSlug}/`,
          ...citySlugs.map(cSlug => `${BASE_URL}/${stSlug}/${cSlug}/`)
        ];
        sitemapXmlCache.set(cacheKey, wrapUrlset(stateCityUrls));
      }
      return { status: 200, contentType: 'application/xml; charset=utf-8', body: sitemapXmlCache.get(cacheKey) };
    }
  }

  // Hubs
  if (p === '/states') return { status: 200, contentType: 'text/html; charset=utf-8', body: getStatesHubHtml() };
  if (p === '/services') return { status: 200, contentType: 'text/html; charset=utf-8', body: getServicesHubHtml() };
  if (p.startsWith('/services/')) {
    const sSlug = p.replace('/services/', '');
    if (servicePillarsBySlug.has(sSlug)) {
      return { status: 200, contentType: 'text/html; charset=utf-8', body: getServicePillarHtml(servicePillarsBySlug.get(sSlug)) };
    }
    if (serviceChildrenBySlug.has(sSlug)) {
      const { child, pillar } = serviceChildrenBySlug.get(sSlug);
      return { status: 200, contentType: 'text/html; charset=utf-8', body: getServiceChildHtml(child, pillar) };
    }
  }
  if (p === '/plumbing-costs') return { status: 200, contentType: 'text/html; charset=utf-8', body: getCostsHubHtml() };
  if (p === '/resources') return { status: 200, contentType: 'text/html; charset=utf-8', body: getResourcesHubHtml() };

  // Legal
  const legalSlug = p.slice(1);
  if (legalBySlug.has(legalSlug)) {
    return { status: 200, contentType: 'text/html; charset=utf-8', body: getLegalPageHtml(legalSlug) };
  }

  // State or City route
  const parts = p.slice(1).split('/');
  if (parts.length === 1) {
    const stSlug = parts[0];
    if (statesBySlug.has(stSlug)) {
      return { status: 200, contentType: 'text/html; charset=utf-8', body: getStateHtml(stSlug) };
    }
  } else if (parts.length === 2) {
    const [stSlug, citySlug] = parts;
    if (statesBySlug.has(stSlug)) {
      const cityHtml = getCityHtml(stSlug, citySlug);
      if (cityHtml) {
        return { status: 200, contentType: 'text/html; charset=utf-8', body: cityHtml };
      }
    }
  }

  return { status: 404, contentType: 'text/html; charset=utf-8', body: '<h1>404 Page Not Found</h1>' };
}

module.exports = {
  handleEdgeRoute,
  getHomepageHtml,
  getStateHtml,
  getCityHtml,
  getHtmlSitemap
};

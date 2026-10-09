// Plumbing Cost Guides Data Model for Hardus Plumbing
// Sourced from industry benchmarks (RSMeans, Angi, Homewyse, HomeAdvisor 2026 data labeled as estimates)

const costsData = [
  {
    id: "burst-pipe-repair-cost",
    slug: "burst-pipe-repair-cost",
    title: "Burst Pipe Repair Cost Guide",
    h1: "How Much Does Burst Pipe Repair Cost in 2026?",
    metaTitle: "Burst Pipe Repair Cost Guide 2026 | National Pricing",
    metaDesc: "Average cost to repair a burst pipe is $350 - $1,800. View pricing factors for drywall, slab leaks & emergency fees. Call (855) 499-4130.",
    primaryKeyword: "how much does burst pipe repair cost",
    nationalAverage: "$750",
    lowRange: "$350",
    highRange: "$1,800",
    catastrophicRange: "$3,500 – $8,500 (with slab repair or full drywall restoration)",
    summary: "Nationally, repairing an accessible burst pipe costs between $350 and $1,800, with most homeowners paying approximately $750 for sectional pipe replacement and emergency diagnostic response. Total project costs depend on pipe accessibility, location of the breach (inside walls, under slab, or open basement), and the extent of secondary water damage.",
    costTable: [
      { scenario: "Exposed Basement or Utility Room Burst", typicalCost: "$350 – $650", timeline: "1 – 2 hours" },
      { scenario: "Burst Pipe Inside Drywall / Wall Cavity", typicalCost: "$600 – $1,500", timeline: "2 – 4 hours" },
      { scenario: "Burst Pipe in Ceiling Joists (Upstairs)", typicalCost: "$800 – $2,200", timeline: "3 – 5 hours" },
      { scenario: "Under-Slab Foundation Pipe Rupture", typicalCost: "$1,500 – $4,500", timeline: "1 – 3 days" },
      { scenario: "Emergency After-Hours / Holiday Dispatch Surcharge", typicalCost: "$150 – $350 (flat fee)", timeline: "Immediate" }
    ],
    factors: [
      "Pipe Accessibility: Open pipes in unfinished basements require minimal labor compared to pipes hidden behind tiled shower walls or encased in concrete foundations.",
      "Pipe Material: Splicing flexible PEX is faster and less labor-intensive than brazing copper in tight, fire-sensitive wall cavities.",
      "Emergency Timing: Calls dispatched on holidays, weekends, or during sub-zero polar vortex storms incur emergency call-out premiums.",
      "Drywall & Cosmetic Restoration: Plumbers fix the pipe, but drywall patching, texture matching, and painting add $300 to $1,000 to the total restoration bill."
    ],
    faqs: [
      {
        q: "Does insurance cover the plumbing repair bill for a burst pipe?",
        a: "Generally, homeowner's insurance policies cover the consequential water damage (drying, flooring, drywall) under 'sudden and accidental discharge of water', but they frequently exclude the direct $400-$800 plumbing repair fee to fix the pipe itself."
      },
      {
        q: "What is the average hourly rate for an emergency plumber?",
        a: "Licensed emergency plumbers charge between $120 and $250 per hour depending on geographic cost of living, with after-hours emergency surcharges ranging from $150 to $350 for dispatch."
      }
    ]
  },
  {
    id: "burst-pipe-repair-cost-by-state",
    slug: "burst-pipe-repair-cost-by-state",
    title: "Burst Pipe Repair Cost by State",
    h1: "Burst Pipe Repair Cost by State (50-State Comparison)",
    metaTitle: "Burst Pipe Repair Cost by State 2026 | All 50 States",
    metaDesc: "Compare burst pipe repair costs across all 50 US states & DC. Indexed by regional labor rates and cost of living. Call (855) 499-4130.",
    primaryKeyword: "burst pipe repair cost by state",
    nationalAverage: "$750",
    lowRange: "$315 (Mississippi/Arkansas)",
    highRange: "$1,200 (California/Hawaii/DC)",
    summary: "Plumbing repair costs vary significantly by state due to regional master plumber wage rates, municipal permit fees, state licensing requirements, and severe winter climate frequency. This guide indexes average burst pipe repair pricing across all 50 states and Washington DC.",
    methodology: "Calculated by applying state Cost-of-Living Labor Adjustments (COLA) and regional plumbing wage rates against national baseline emergency repair data.",
    faqs: [
      {
        q: "Which states have the highest burst pipe repair costs?",
        a: "Hawaii, California, New York, Washington DC, and Massachusetts exhibit the highest plumbing labor costs, where emergency burst pipe repairs average 25% to 60% above the national median."
      },
      {
        q: "Why do burst pipe costs spike during winter storms in southern states?",
        a: "In southern states like Texas, Georgia, and Tennessee, homes lack deep frost-depth plumbing insulation. Severe cold snaps trigger thousands of simultaneous pipe bursts, overwhelming local supply chains and creating high emergency demand."
      }
    ]
  },
  {
    id: "frozen-pipe-repair-cost",
    slug: "frozen-pipe-repair-cost",
    title: "Frozen Pipe Thawing & Repair Cost Guide",
    h1: "How Much Does It Cost to Thaw & Fix Frozen Pipes?",
    metaTitle: "Frozen Pipe Repair Cost Guide 2026 | Thawing & Splits",
    metaDesc: "Cost to thaw frozen pipes averages $250 - $600. Repairing split frozen pipes averages $450 - $1,500. View full pricing. Call (855) 499-4130.",
    primaryKeyword: "frozen pipe repair cost",
    nationalAverage: "$550 (Thawing + Sectional Splice)",
    lowRange: "$250 (Basic Thawing)",
    highRange: "$1,500+ (Multiple freeze fractures)",
    costTable: [
      { scenario: "Professional Machine Thawing (No pipe split)", typicalCost: "$250 – $600", timeline: "1 – 3 hours" },
      { scenario: "Single Freeze Split Pipe Repair (Exposed)", typicalCost: "$400 – $800", timeline: "2 – 3 hours" },
      { scenario: "Multiple Freeze Fractures Across Home", typicalCost: "$1,200 – $3,500", timeline: "4 – 8 hours" },
      { scenario: "Adding Pipe Insulation & Heat Cable", typicalCost: "$150 – $400", timeline: "1 – 2 hours" }
    ],
    factors: ["Number of freeze points", "Whether pipe split or remained intact", "Accessibility inside exterior walls or crawlspace", "Outdoor temperatures during service call"],
    faqs: [
      {
        q: "Is it cheaper to thaw a pipe before it bursts?",
        a: "Yes. Professional electrical resistance thawing before a pipe ruptures costs $250 to $600. Once the pipe splits and bursts upon thawing, total plumbing and water mitigation costs easily surpass $2,500 to $5,000."
      }
    ]
  },
  {
    id: "main-water-line-repair-cost",
    slug: "main-water-line-repair-cost",
    title: "Main Water Line Repair & Replacement Cost Guide",
    h1: "Main Water Line Repair & Replacement Cost in 2026",
    metaTitle: "Main Water Line Repair Cost 2026 | Spot Fix vs Replace",
    metaDesc: "Average cost to repair an underground main water line is $1,000 - $3,500; full replacement costs $3,000 - $8,500. Call (855) 499-4130.",
    primaryKeyword: "main water line repair cost",
    nationalAverage: "$2,600",
    lowRange: "$950 (Spot clamp repair)",
    highRange: "$8,500+ (Complete trenchless replacement)",
    costTable: [
      { scenario: "Spot Hydro-Excavation & Repair Clamp", typicalCost: "$950 – $2,200", timeline: "4 – 6 hours" },
      { scenario: "Traditional Trenching Water Line Replacement (per foot)", typicalCost: "$50 – $150 / ft", timeline: "1 – 2 days" },
      { scenario: "Trenchless Pipe Pulling / Directional Boring", typicalCost: "$80 – $200 / ft", timeline: "1 day" },
      { scenario: "Municipal Street Cut & Permitting", typicalCost: "$1,500 – $3,500", timeline: "2 – 3 days" }
    ],
    factors: ["Depth of burial (frost line determines depth from 12 inches to 7 feet)", "Driveway, sidewalk, or landscape obstructions", "Distance from curb stop to water meter", "Municipal street opening permits"],
    faqs: [
      {
        q: "How much does it cost to replace a 50-foot main water line?",
        a: "A 50-foot residential main water line replacement typically costs between $3,500 and $7,500 depending on whether trenchless pipe pulling or open excavation is utilized."
      }
    ]
  },
  {
    id: "trenchless-pipe-repair-cost",
    slug: "trenchless-pipe-repair-cost",
    title: "Trenchless Pipe Repair & CIPP Relining Cost Guide",
    h1: "Trenchless Pipe Repair & Relining Cost in 2026",
    metaTitle: "Trenchless Pipe Repair Cost 2026 | CIPP Relining per Foot",
    metaDesc: "Trenchless pipe relining costs $80 - $250 per linear foot ($3,500 - $9,000 typical). Save thousands on landscape and driveway repairs. Call (855) 499-4130.",
    primaryKeyword: "trenchless pipe repair cost",
    nationalAverage: "$5,800",
    lowRange: "$3,500",
    highRange: "$9,500",
    costTable: [
      { scenario: "CIPP Epoxy Pipe Lining (per linear foot)", typicalCost: "$80 – $220 / ft", timeline: "Same day (4 – 8 hrs)" },
      { scenario: "Hydraulic Pipe Bursting (per linear foot)", typicalCost: "$100 – $260 / ft", timeline: "Same day" },
      { scenario: "HD Video Camera Pipe Inspection", typicalCost: "$250 – $500", timeline: "1 hour" }
    ],
    factors: ["Diameter of pipe (3-inch vs 4-inch vs 6-inch)", "Number of tie-in junction lines needing robotic reinstatement", "Pipe cleaning and hydro-jet descaling requirements"],
    faqs: [
      {
        q: "Why does trenchless pipe repair save money overall?",
        a: "While the plumbing price per foot is comparable to traditional excavation, trenchless methods eliminate $2,000 to $8,000 in demolition and reconstruction costs for paved driveways, concrete porches, and mature landscaping."
      }
    ]
  },
  {
    id: "pipe-repair-cost-copper-pex-pvc",
    slug: "pipe-repair-cost-copper-pex-pvc",
    title: "Pipe Repair Cost by Material (Copper, PEX, PVC)",
    h1: "Pipe Repair Cost by Material: Copper vs PEX vs PVC",
    metaTitle: "Pipe Repair Cost: Copper, PEX & PVC (2026 Price Guide)",
    metaDesc: "Compare repair and whole-house repiping costs for copper, PEX, and PVC. Sectional repairs average $250 - $950. Upfront quotes. Call (855) 499-4130.",
    primaryKeyword: "pipe repair cost copper pex pvc",
    nationalAverage: "$480 (Single section fix)",
    lowRange: "$200 (PVC repair)",
    highRange: "$1,200 (Copper wall repair)",
    costTable: [
      { scenario: "PVC / CPVC Sectional Pipe Repair", typicalCost: "$200 – $650", timeline: "1 – 2 hours" },
      { scenario: "PEX Tubing Splicing & Fitting Replacement", typicalCost: "$220 – $750", timeline: "1 – 2 hours" },
      { scenario: "Copper Pipe Soldering / ProPress Repair", typicalCost: "$280 – $950", timeline: "2 – 3 hours" },
      { scenario: "Whole-House Repipe with PEX (2-bath home)", typicalCost: "$4,500 – $9,000", timeline: "2 – 4 days" },
      { scenario: "Whole-House Repipe with Copper (2-bath home)", typicalCost: "$8,000 – $16,000", timeline: "3 – 5 days" }
    ],
    factors: ["Material cost differential (copper is 3x to 4x the raw material cost of PEX)", "Labor complexity and fire-safety requirements during soldering", "Accessibility within drywall or crawlspace"],
    faqs: [
      {
        q: "Is PEX cheaper to install and repair than copper?",
        a: "Yes. PEX material costs are roughly 60% lower than copper, and because PEX is flexible and connects with mechanical expansion rings rather than open flames, installation labor is significantly reduced."
      }
    ]
  },
  {
    id: "water-extraction-and-drying-cost",
    slug: "water-extraction-and-drying-cost",
    title: "Water Extraction & Structural Drying Cost Guide",
    h1: "Water Extraction & Drying Cost After a Burst Pipe",
    metaTitle: "Water Extraction & Drying Cost 2026 | Flood Cleanup Rates",
    metaDesc: "Water extraction and structural drying costs $1,200 - $5,000+ after a burst pipe. IICRC S500 certified drying standards. Call (855) 499-4130.",
    primaryKeyword: "water extraction and drying cost",
    nationalAverage: "$2,850",
    lowRange: "$1,200 (Minor single-room cleanup)",
    highRange: "$7,500+ (Extensive multi-room black water damage)",
    costTable: [
      { scenario: "Category 1 Clean Water Extraction (per sq ft)", typicalCost: "$3.50 – $5.00 / sq ft", timeline: "1 – 2 days" },
      { scenario: "Category 2 Grey Water Removal & Decontamination", typicalCost: "$4.50 – $7.00 / sq ft", timeline: "2 – 4 days" },
      { scenario: "LGR Commercial Dehumidifier Daily Rental", typicalCost: "$100 – $150 / day per unit", timeline: "3 – 5 days typical" },
      { scenario: "High-Velocity Air Mover Daily Rental", typicalCost: "$30 – $50 / day per unit", timeline: "3 – 5 days typical" }
    ],
    factors: ["Water category classification (Cat 1 clean supply line vs Cat 2/3 contaminated)", "Square footage of affected flooring and subfloor", "Number of days required to reach dry standard under IICRC S500 guidelines"],
    faqs: [
      {
        q: "Will my insurance cover commercial water extraction and drying?",
        a: "Yes. Almost all standard homeowner's insurance policies cover emergency water extraction and professional drying equipment to mitigate further structural decay and mold growth."
      }
    ]
  }
];

module.exports = costsData;

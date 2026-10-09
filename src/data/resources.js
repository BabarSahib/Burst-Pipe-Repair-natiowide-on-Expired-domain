// Educational Resources and Diagnostic Guides Data Model
// Covers all 20 informational topics assigned to dedicated URLs

const resourcesData = [
  {
    slug: "first-10-minutes-burst-pipe",
    title: "What to Do When a Pipe Bursts (The First 10 Minutes Survival Guide)",
    h1: "What to Do When a Pipe Bursts: The First 10 Minutes Emergency Checklist",
    metaTitle: "What to Do When a Pipe Bursts | First 10 Minutes Guide",
    metaDesc: "Water gushing from a burst pipe? Follow these 5 immediate survival steps to stop flooding, prevent electrocution & save your home. Call (855) 499-4130.",
    primaryKeyword: "what to do when a pipe bursts",
    readTime: "4 min read",
    pillarLink: "/services/emergency-burst-pipe-repair/",
    intro: "A ruptured residential water line under standard 60 PSI pressure discharges 8 to 12 gallons of water every minute. Within just ten minutes, more than 100 gallons can saturate drywall, short-circuit wiring, and collapse ceiling joists. Take these exact five steps in order before doing anything else.",
    steps: [
      { num: 1, title: "Shut Off the Main Water Supply Valve Immediately", desc: "Do not search for towels or buckets first. Rush directly to your main shutoff valve. In basement homes, it is typically located near the front foundation wall where the water meter enters. Rotate clockwise until fully closed." },
      { num: 2, title: "Cut Off Electrical Power to Wet Areas", desc: "Water conducted through ceiling light fixtures or electrical wall outlets poses an extreme risk of lethal shock. If your electrical panel is in a dry, accessible area, switch off the breaker switches for the flooded rooms." },
      { num: 3, title: "Depressurize the System by Opening Lowest Faucets", desc: "Even with the main valve shut, gallons of trapped pressurized water remain in the vertical pipe runs. Go to the lowest plumbing fixture (such as a basement laundry sink or outdoor hose bib) and open it completely." },
      { num: 4, title: "Capture Photo and Video Evidence for Insurance", desc: "Before cleaning standing water, record high-resolution video and photograph water depth, dripping ceilings, saturated furniture, and the burst origin to substantiate your insurance claim." },
      { num: 5, title: "Call Emergency Plumber Dispatch: (855) 499-4130", desc: "Contact Hardus Plumbing 24/7 dispatch hotline to route a licensed local emergency plumber for immediate repair and structural mitigation." }
    ]
  },
  {
    slug: "how-to-shut-off-main-water-valve",
    title: "How to Shut Off Your Home's Main Water Valve",
    h1: "How to Shut Off Your Main Water Valve in an Emergency",
    metaTitle: "How to Shut Off Main Water Valve | Emergency Plumber Guide",
    metaDesc: "Step-by-step guide to finding and closing your main water shutoff valve. Gate valves, ball valves & curb stop keys explained. Call (855) 499-4130.",
    primaryKeyword: "how to shut off main water valve",
    readTime: "5 min read",
    pillarLink: "/services/emergency-burst-pipe-repair/",
    intro: "Knowing how to quickly locate and operate your main water shutoff valve is the single most important skill for preventing catastrophic flood damage when a pipe ruptures.",
    steps: [
      { num: 1, title: "Identify Your Valve Type: Ball Valve vs. Gate Valve", desc: "Modern homes use quarter-turn lever ball valves; turning the lever perpendicular to the pipe closes water flow. Older homes feature round wheel gate valves that require turning clockwise several complete rotations until seated." },
      { num: 2, title: "Locate Indoor Basement or Utility Room Valve", desc: "In cold-weather northern states, look near the foundation floor where the municipal copper or PEX supply line enters the home, directly adjacent to the water meter." },
      { num: 3, title: "Locate Outdoor Meter Pit Box (Southern States)", desc: "In warm-weather southern states, the shutoff valve is frequently located inside a ground-level meter box near the street curb. You may need a 5-sided pentagon meter wrench or curb stop key to operate it." }
    ]
  },
  {
    slug: "how-to-shut-off-fixture-valve",
    title: "How to Shut Off Water to a Specific Sink, Toilet, or Appliance",
    h1: "How to Shut Off Water to an Individual Fixture (Angle Stops)",
    metaTitle: "How to Shut Off Water to One Fixture | Sink, Toilet, Washer",
    metaDesc: "Need to stop water to a single leaking faucet, toilet or washing machine? Learn how to operate local angle stop shutoff valves. Call (855) 499-4130.",
    primaryKeyword: "how to shut off water to one fixture",
    readTime: "4 min read",
    pillarLink: "/services/copper-pex-pvc-pipe-repair/",
    intro: "If an isolated leak occurs at a sink, toilet, or appliance supply hose, closing the individual fixture angle stop allows you to isolate the problem without cutting off running water to the rest of the household.",
    steps: [
      { num: 1, title: "Locate the Fixture Angle Stop Valves", desc: "Look beneath the sink or behind the toilet bowl. You will find small oval or lever handles mounted directly onto the copper or PEX stubs protruding from the wall or floor." },
      { num: 2, title: "Turn the Handle Clockwise Until Firmly Closed", desc: "Turn oval knobs clockwise until they stop. For quarter-turn ball valves, turn the handle 90 degrees until perpendicular to the flexible supply tubing." },
      { num: 3, title: "Test the Fixture to Verify Zero Flow", desc: "Open the faucet or flush the toilet. Water should stop completely within 3 seconds. If water continues weeping, the valve seat has failed and requires replacement." }
    ]
  },
  {
    slug: "signs-of-hidden-burst-pipe-slab-leak",
    title: "Signs of a Hidden Burst Pipe or Foundation Slab Leak",
    h1: "Warning Signs of a Hidden Burst Pipe or Concrete Slab Leak",
    metaTitle: "Signs of Hidden Burst Pipe & Slab Leak | Diagnostic Guide",
    metaDesc: "Unexplained water bill spike, hot spots on floors, or sound of running water? Spot the critical signs of a hidden pipe leak. Call (855) 499-4130.",
    primaryKeyword: "signs of a hidden burst pipe",
    readTime: "6 min read",
    pillarLink: "/services/burst-pipe-under-slab/",
    intro: "Not all burst pipes present as sudden waterfalls through ceilings. Pinhole breaches inside wall cavities or ruptured copper lines buried under concrete slabs can leak thousands of gallons silently for weeks before structural damage reveals itself.",
    steps: [
      { num: 1, title: "Unexplained Spike in Monthly Water Utility Bill", desc: "A sudden doubling or tripling of water usage without increased household consumption is the classic first indicator of an underground or sub-slab continuous leak." },
      { num: 2, title: "Sound of Constant Rushing or Hissing Water", desc: "If you hear water running through pipes when all fixtures, toilets, and irrigation valves are tightly shut, pressurized water is escaping through a cracked pipe wall." },
      { num: 3, title: "Warm Flooring Spots on Concrete Slabs", desc: "When hot water supply lines rupture beneath concrete slab foundations, thermal transfer creates warm or hot spots on tile, hardwood, or carpet flooring." },
      { num: 4, title: "Persistent Damp Smell, Baseboard Mildew, or Buckling Floors", desc: "Hidden wall moisture saturates drywall paper, creating persistent earthy odors and warping wood trim long before visible pooling occurs." }
    ]
  },
  {
    slug: "why-pipes-burst-causes",
    title: "Why Pipes Burst: The 6 Root Causes of Plumbing Ruptures",
    h1: "Why Do Pipes Burst? The 6 Primary Root Causes Explained",
    metaTitle: "Why Do Pipes Burst? 6 Causes of Pipe Ruptures Explained",
    metaDesc: "From sub-zero freezing and hydraulic water hammer to galvanic corrosion and excessive pressure, learn why pipes burst. Call (855) 499-4130.",
    primaryKeyword: "why do pipes burst",
    readTime: "6 min read",
    pillarLink: "/services/emergency-burst-pipe-repair/",
    intro: "Understanding why pipes burst helps homeowners take preventative action before experiencing thousands of dollars in water damage.",
    steps: [
      { num: 1, title: "Freezing Temperature Ice Expansion", desc: "Water expands by approximately 9% when freezing. The expanding ice block seals the pipe and pushes trapped liquid water downstream, creating hydraulic pressure spikes exceeding 3,000 PSI." },
      { num: 2, title: "Excessive Municipal Water Pressure (> 80 PSI)", desc: "Residential plumbing fixtures and solder joints are engineered for 50-65 PSI. If a Pressure Reducing Valve (PRV) fails, municipal pressure surges weaken joint fittings." },
      { num: 3, title: "Galvanic & Chemical Pitting Corrosion", desc: "Acidic well water (pH < 6.5) and galvanic reactions between dissimilar metals (such as connecting brass directly to galvanized steel) degrade pipe walls into paper-thin shells." },
      { num: 4, title: "Water Hammer (Hydraulic Shock)", desc: "High-speed water suddenly stopped by quick-closing solenoid valves (in dishwashers and washing machines) creates shockwaves that rattle pipes against framing nails until they puncture." }
    ]
  },
  {
    slug: "freezing-temperatures-pipe-danger-zone",
    title: "What Temperature Do Pipes Freeze? The Danger Zone Explained",
    h1: "What Temperature Do Pipes Freeze? The Winter Danger Thresholds",
    metaTitle: "What Temperature Do Pipes Freeze? | Winter Danger Zone",
    metaDesc: "At what outdoor temperature do water pipes freeze? Learn the 20°F danger threshold, wind chill factors & vulnerable crawlspaces. Call (855) 499-4130.",
    primaryKeyword: "what temperature do pipes freeze",
    readTime: "5 min read",
    pillarLink: "/services/frozen-pipe-thawing-repair/",
    intro: "While pure water freezes at 32°F (0°C), indoor residential pipes surrounded by insulated wall cavities typically do not freeze the moment outdoor thermometers hit 32°F.",
    steps: [
      { num: 1, title: "The Critical 20°F (-6°C) Outdoor Threshold", desc: "Extensive building science testing by the Building Research Council indicates that the danger zone for residential pipe freezing begins when outdoor temperatures drop to 20°F or lower for at least 4 to 6 consecutive hours." },
      { num: 2, title: "Impact of Wind Chill and Air Infiltration", desc: "Frigid winter winds driving through drafty crawlspace vents, rim joist gaps, or uncaulked siding penetrate insulation bats, cooling localized pipe sections far faster than ambient still air." },
      { num: 3, title: "Vulnerable Home Zones", desc: "Pipes routed through exterior walls, unheated basements, uninsulated crawlspaces, and kitchen sink cabinets mounted directly on outside walls freeze first." }
    ]
  },
  {
    slug: "how-to-thaw-frozen-pipe-safely",
    title: "How to Thaw a Frozen Pipe Safely (And What Never to Do)",
    h1: "How to Thaw a Frozen Pipe Safely Without Causing a Fire or Burst",
    metaTitle: "How to Thaw Frozen Pipes Safely | Prevent Ruptures & Fires",
    metaDesc: "Step-by-step safe methods to thaw frozen water pipes. Why open flames cause fires and how to thaw from the faucet backward. Call (855) 499-4130.",
    primaryKeyword: "how to thaw a frozen pipe safely",
    readTime: "5 min read",
    pillarLink: "/services/thawing-frozen-pipes/",
    intro: "When you turn on a faucet during a winter cold snap and only a trickle or nothing comes out, your line is frozen. Thawing it safely requires patience and proper technique.",
    steps: [
      { num: 1, title: "Open the Associated Faucet First", desc: "Before applying any warmth, open the hot and cold handles on the affected faucet. As the ice melts, steam and water need an open exit path to relieve dangerous internal hydrostatic pressure." },
      { num: 2, title: "Work From the Faucet Backward Toward the Freeze", desc: "Always apply heat starting closest to the open faucet and work your way toward the freeze blockage. This ensures melting water can drain freely without becoming trapped behind an ice plug." },
      { num: 3, title: "Safe Heat Sources: Hair Dryer, Heat Mat, or Warm Towels", desc: "Use a standard electric hair dryer, UL-listed silicone heat cable, or towels soaked in hot water wrapped around the pipe. Never leave heat sources unattended." },
      { num: 4, title: "WHAT NEVER TO DO: Open Flame Blowtorches", desc: "Never use a propane torch, blowtorch, kerosene heater, or open flame. High heat ignites wooden framing and dry insulation inside wall cavities, causing devastating house fires." }
    ]
  },
  {
    slug: "how-to-prevent-frozen-pipes",
    title: "How to Prevent Frozen Pipes: Complete Winterization Guide",
    h1: "How to Prevent Frozen Pipes in Severe Winter Cold Snaps",
    metaTitle: "How to Prevent Frozen Pipes | Winterization Checklist",
    metaDesc: "Keep your plumbing safe during extreme freezes. Pipe insulation, faucet dripping, cabinet opening & thermostat rules. Call (855) 499-4130.",
    primaryKeyword: "how to prevent frozen pipes",
    readTime: "6 min read",
    pillarLink: "/services/frozen-pipe-thawing-repair/",
    intro: "Preventing frozen pipes is vastly cheaper and less stressful than dealing with emergency repairs and flooded basements. Follow this proven cold-snap protection protocol.",
    steps: [
      { num: 1, title: "Maintain Thermostat at 55°F (13°C) Minimum", desc: "Never turn off your heating system when leaving home for vacation. Keep indoor temperature set to at least 55°F even when unoccupied." },
      { num: 2, title: "Open Kitchen and Bathroom Cabinet Doors", desc: "Cabinets on exterior walls block warm indoor air circulation. Leaving cabinet doors open allows ambient room heat to warm hidden supply lines." },
      { num: 3, title: "Let Vulnerable Faucets Drip a Steady Stream", desc: "Allowing a slight, continuous drip (a pencil-lead thin stream) from faucets served by exterior walls relieves pressure and keeps water moving." },
      { num: 4, title: "Install Closed-Cell Foam Pipe Insulation & Heat Tape", desc: "Slip thick closed-cell polyethylene foam tubes over exposed copper and PEX lines in attics, basements, and unheated crawlspaces." }
    ]
  },
  {
    slug: "pipe-materials-compared",
    title: "Plumbing Pipe Materials Compared: Copper, PEX, PVC, CPVC & Galvanized",
    h1: "Plumbing Pipe Materials Compared: Pros, Cons, Lifespan & Burst Risk",
    metaTitle: "Plumbing Pipe Materials Compared | Copper vs PEX vs PVC",
    metaDesc: "Comprehensive comparison of Copper, PEX, PVC, CPVC, Galvanized Steel & Polybutylene. Lifespan, freeze tolerance & costs. Call (855) 499-4130.",
    primaryKeyword: "pipe materials compared",
    readTime: "8 min read",
    pillarLink: "/services/copper-pex-pvc-pipe-repair/",
    intro: "Every plumbing material has distinct strengths, lifespans, failure modes, and vulnerability to freezing and corrosion. Here is how modern and legacy pipe materials compare.",
    steps: [
      { num: 1, title: "Copper (Type K, L, M)", desc: "Lifespan: 50+ years. Highly durable and heat-resistant, but rigid (easily splits when frozen) and susceptible to pinhole pitting in acidic water." },
      { num: 2, title: "PEX (Cross-Linked Polyethylene)", desc: "Lifespan: 40-50 years. Highly flexible, resistant to chemical scale, and capable of expanding slightly during freeze events. Vulnerable to rodent chew and UV degradation." },
      { num: 3, title: "PVC & CPVC (Chlorinated Polyvinyl Chloride)", desc: "Lifespan: 25-40 years. Low material cost and immune to corrosion, but becomes brittle with age and fractures easily under mechanical shock." },
      { num: 4, title: "Galvanized Steel & Polybutylene (Legacy Risks)", desc: "Lifespan: Past expiration. Galvanized pipes suffer severe internal rust constriction, while polybutylene pipes (1978-1995) suffer catastrophic micro-fracturing from chlorine." }
    ]
  },
  {
    slug: "homeowners-insurance-burst-pipes-claims",
    title: "Does Homeowners Insurance Cover Burst Pipes? Claims & Documentation",
    h1: "Does Homeowners Insurance Cover Burst Pipes? Coverage Rules & Claims",
    metaTitle: "Does Homeowners Insurance Cover Burst Pipes? (Claims Guide)",
    metaDesc: "Learn what insurance covers after a pipe bursts: sudden vs gradual damage, claim filing steps, proof of heat & contractor quotes. Call (855) 499-4130.",
    primaryKeyword: "does homeowners insurance cover burst pipes",
    readTime: "7 min read",
    pillarLink: "/services/emergency-water-extraction-drying/",
    intro: "Navigating homeowner's insurance claims after a catastrophic pipe burst can be daunting. Insurance adjusters draw strict legal distinctions between sudden accidents and gradual neglect.",
    steps: [
      { num: 1, title: "The 'Sudden and Accidental' Standard", desc: "Most standard HO-3 and HO-5 homeowners policies cover water damage resulting from sudden, unexpected pipe failures (like winter freeze splits or high-pressure supply line ruptures)." },
      { num: 2, title: "The Maintenance Neglect Exclusion", desc: "Claims are frequently denied if the adjuster finds evidence of ongoing, unaddressed leaks, rust rot over months, or proof that the home heating was turned off during sub-freezing weather." },
      { num: 3, title: "What Is Covered vs. What Is Not", desc: "Covered: Structural drying, wet drywall tear-out, ruined flooring, damaged personal property, and mold remediation (up to policy caps). Excluded: The direct plumbing repair bill for the pipe section itself." },
      { num: 4, title: "Step-by-Step Claim Documentation", desc: "File notice immediately, keep the damaged pipe section as physical evidence, photograph every damaged item before disposal, and retain all professional mitigation invoices." }
    ]
  },
  {
    slug: "water-damage-categories-timelines",
    title: "Water Damage Categories and Timelines (Category 1, 2, and 3 Explained)",
    h1: "Water Damage Categories (1, 2, 3) and The 72-Hour Degradation Timeline",
    metaTitle: "Water Damage Categories 1, 2, 3 & Degradation Timelines",
    metaDesc: "Understand IICRC water categories: clean supply water vs grey and black water. Why water degrades from Cat 1 to Cat 3 in 48 hours. Call (855) 499-4130.",
    primaryKeyword: "water damage categories and timelines",
    readTime: "6 min read",
    pillarLink: "/services/emergency-water-extraction-drying/",
    intro: "Professional water damage restoration standards classify flood water into three distinct categories based on biological and chemical contamination levels.",
    steps: [
      { num: 1, title: "Category 1: Clean Water", desc: "Originates from a sanitary water source such as broken municipal supply lines, failed refrigerator water tubes, or overflowed sinks. Poses zero initial health risk if mitigated promptly." },
      { num: 2, title: "Category 2: Grey Water", desc: "Contains significant chemical or biological contamination that can cause illness. Originates from washing machine discharge, dishwasher leaks, or water that has sat on dirty floors." },
      { num: 3, title: "Category 3: Black Water", desc: "Grossly contaminated with pathogenic agents, bacteria, fungal spores, or sewage. Originates from sewer backups, ground surface runoff, or Category 1 water left unextracted for over 48 hours." },
      { num: 4, title: "The Critical 48-Hour Degradation Curve", desc: "Standing clean water absorbs soil minerals, drywall chemicals, and carpet bacteria, rapidly degrading into hazardous Category 2 or 3 water within 24 to 48 hours." }
    ]
  },
  {
    slug: "mold-risk-after-burst-pipe",
    title: "Mold Risk After a Burst Pipe: The 24-48 Hour Window",
    h1: "Mold Risk After a Burst Pipe: Stopping Spores in the First 48 Hours",
    metaTitle: "Mold Risk After a Burst Pipe | 24-48 Hour Prevention Window",
    metaDesc: "How quickly does mold grow after a burst pipe? Learn why 24-48 hours is critical for structural drying and anti-microbial treatments. Call (855) 499-4130.",
    primaryKeyword: "mold after a burst pipe",
    readTime: "5 min read",
    pillarLink: "/services/structural-drying-dehumidification/",
    intro: "Microscopic mold spores exist naturally in indoor air. When a burst pipe provides continuous moisture and relative humidity rises above 65%, these spores colonize building materials rapidly.",
    steps: [
      { num: 1, title: "Spore Germination Within 24 to 48 Hours", desc: "Cellulose-rich materials like gypsum drywall paper, particleboard, and wood baseboards provide the ideal food source for mold once wetted." },
      { num: 2, title: "Signs of Active Microbial Growth", desc: "Look for fuzzy green, black, or white patches, bubbling drywall paint, and a pungent, musty, earthy odor." },
      { num: 3, title: "Professional Drying Standard vs. DIY Fans", desc: "Standard household box fans only circulate humid air across surfaces. Professional drying requires commercial LGR dehumidifiers to pull moisture out of the air and deep building framing." }
    ]
  },
  {
    slug: "iicrc-s500-water-damage-standards",
    title: "IICRC S500 Standards: How Certified Restorers Dry Structures",
    h1: "IICRC S500 Standards for Professional Water Damage Restoration",
    metaTitle: "IICRC S500 Water Damage Standards | Professional Drying",
    metaDesc: "How certified restoration contractors dry water damage according to ANSI/IICRC S500 standards. Psychrometrics & moisture meters. Call (855) 499-4130.",
    primaryKeyword: "iicrc s500 water damage standards",
    readTime: "7 min read",
    pillarLink: "/services/emergency-water-extraction-drying/",
    intro: "The ANSI/IICRC S500 Standard for Professional Water Damage Restoration is the universally recognized benchmark used by certified mitigation contractors and insurance adjusters.",
    steps: [
      { num: 1, title: "Psychrometric Moisture Mapping", desc: "Technicians log temperature, relative humidity, and grains per pound (GPP) of moisture to determine the precise drying potential of indoor air." },
      { num: 2, title: "Non-Invasive Moisture Meters & Thermal Imaging", desc: "Pinless and penetrating moisture meters measure electrical impedance to quantify exact moisture percentage in studs and subfloors." },
      { num: 3, title: "Engineered Dehumidification Balancing", desc: "Contractors calculate cubic feet of space to deploy the exact ratio of centrifugal air movers and low-grain refrigerant dehumidifiers to reach dry standard." }
    ]
  },
  {
    slug: "water-line-responsibility-utility-vs-homeowner",
    title: "Who Is Responsible for Main Water Line Repair? City vs. Homeowner",
    h1: "Main Water Line Repair Responsibility: Utility vs. Homeowner Boundaries",
    metaTitle: "Who Is Responsible for Main Water Line Repair? (City vs Owner)",
    metaDesc: "Is the homeowner or water utility responsible for leaking water lines? Curb stop valves, water meter boxes & property lines. Call (855) 499-4130.",
    primaryKeyword: "who is responsible for main water line repair",
    readTime: "6 min read",
    pillarLink: "/services/underground-main-water-line-repair/",
    intro: "When an underground water leak causes soggy sinkholes in your yard or water surges up through the sidewalk, determining whether you or the city pays is crucial.",
    steps: [
      { num: 1, title: "The Municipal Water Main (Public Utility)", desc: "The public water utility owns and maintains the large water main buried under the public street and the initial connection tap." },
      { num: 2, title: "The Curb Stop Valve / B-Box Demarcation Line", desc: "In most US jurisdictions, legal ownership shifts at the curb stop valve (shutoff key near the property line) or at the outdoor water meter box. Everything downstream toward the house is the property owner's financial responsibility." },
      { num: 3, title: "Private Water Service Line (Homeowner Responsibility)", desc: "The underground pipe running from the curb box across your front yard, under driveways, and through your foundation wall must be repaired and paid for by the homeowner." }
    ]
  },
  {
    slug: "trenchless-vs-traditional-digging",
    title: "Trenchless Pipe Repair vs. Traditional Excavation",
    h1: "Trenchless vs. Traditional Pipe Repair: Costs, Disruption & Lifespan",
    metaTitle: "Trenchless vs Traditional Pipe Repair | Pros, Cons & Costs",
    metaDesc: "Compare no-dig CIPP epoxy relining against traditional open-cut trench excavation. Save landscaping, driveways & time. Call (855) 499-4130.",
    primaryKeyword: "trenchless vs traditional pipe repair",
    readTime: "7 min read",
    pillarLink: "/services/trenchless-pipe-repair-relining/",
    intro: "When an underground water or sewer line ruptures, homeowners face a critical choice: excavate a deep trench across their lawn or utilize trenchless no-dig restoration.",
    steps: [
      { num: 1, title: "Traditional Excavation (Open Trenching)", desc: "Requires backhoes and excavators to dig a continuous trench. Highly invasive; destroys landscaping, concrete driveways, and mature trees, requiring thousands in surface restoration." },
      { num: 2, title: "Trenchless CIPP Epoxy Lining", desc: "Inverts an epoxy-saturated sleeve inside the host pipe through small access ports. Cures into a seamless 50-year structural pipe without disrupting surface structures." },
      { num: 3, title: "Trenchless Pipe Bursting", desc: "Pulls a bursting head through the damaged pipe, fracturing it outward while pulling a new continuous HDPE pipe in its place." },
      { num: 4, title: "Total Cost Comparison", desc: "While trenchless plumbing fees may be comparable, total project costs are typically 30-50% lower due to zero landscape or concrete reconstruction." }
    ]
  },
  {
    slug: "burst-pipe-repair-vs-replace",
    title: "Should You Repair or Replace a Burst Pipe? Decision Criteria",
    h1: "Repair vs. Replace a Burst Pipe: How to Choose the Right Solution",
    metaTitle: "Repair vs Replace a Burst Pipe | When to Repipe Your Home",
    metaDesc: "When does patching a pipe make sense, and when should you repipe? Learn age thresholds, corrosion signs & cost-benefit rules. Call (855) 499-4130.",
    primaryKeyword: "repair or replace burst pipe",
    readTime: "5 min read",
    pillarLink: "/services/copper-pex-pvc-pipe-repair/",
    intro: "When a pipe bursts, a fast clamp or spliced sleeve stops the active flood. But deciding between a localized spot patch and whole-home repiping requires assessing plumbing system age and corrosion.",
    steps: [
      { num: 1, title: "When Sectional Repair Makes Sense", desc: "Ideal for isolated freeze splits in young copper or PEX tubing, accidental drywall screw punctures, or localized fitting failures where surrounding piping remains structurally sound." },
      { num: 2, title: "When Full Repiping Is Necessary", desc: "Recommended if your home contains galvanized steel past its 50-year lifespan, defective polybutylene piping, or if you have experienced multiple pinhole leaks in copper within 12 months." },
      { num: 3, title: "Cost-Benefit Evaluation", desc: "Repeated emergency service calls ($600-$1,200 each) and insurance deductibles quickly surpass the one-time investment of a modern whole-house PEX repipe." }
    ]
  },
  {
    slug: "burst-pipe-tenant-landlord-responsibility",
    title: "Burst Pipe in a Rental: Landlord vs. Tenant Responsibilities",
    h1: "Burst Pipe in a Rental: Who Is Responsible, Landlord or Tenant?",
    metaTitle: "Burst Pipe in Rental Apartment | Landlord vs Tenant Rights",
    metaDesc: "Who pays when a pipe bursts in a rental property? Warranty of habitability, tenant negligence & renters insurance explained. Call (855) 499-4130.",
    primaryKeyword: "burst pipe in apartment tenant vs landlord",
    readTime: "6 min read",
    pillarLink: "/services/emergency-burst-pipe-repair/",
    intro: "When water floods a leased rental apartment or home, clear legal frameworks govern who is responsible for plumbing repairs, structural drying, and ruined personal property.",
    steps: [
      { num: 1, title: "Landlord Responsibility: Implied Warranty of Habitability", desc: "Under state landlord-tenant laws, property owners are legally required to maintain plumbing systems in working order. Landlords must pay for emergency plumbing repairs, water extraction, and structural drying." },
      { num: 2, title: "Tenant Responsibility: Duty to Promptly Report", desc: "Tenants must report leaks immediately. If a tenant fails to report a visible weeping pipe or leaves windows wide open during a freeze, they may be liable for resulting damages." },
      { num: 3, title: "Personal Property & Renters Insurance", desc: "Landlord insurance covers the building structure, but never tenant furniture or electronics. Tenants rely on their personal renters insurance policy for contents coverage." }
    ]
  },
  {
    slug: "commercial-multi-family-burst-pipe-response",
    title: "Commercial & Multi-Family Burst Pipe Emergency Response Protocol",
    h1: "Commercial and Multi-Family Burst Pipe Emergency Response Protocol",
    metaTitle: "Commercial & Multi-Family Burst Pipe Response Protocol",
    metaDesc: "Emergency protocol for commercial buildings & apartment complexes: main riser shutoffs, tenant communications & mitigation. Call (855) 499-4130.",
    primaryKeyword: "commercial burst pipe repair",
    readTime: "7 min read",
    pillarLink: "/services/emergency-burst-pipe-repair/",
    intro: "A burst riser or fire sprinkler line in a multi-story apartment building or commercial complex can flood multiple tenant units across multiple floors within minutes.",
    steps: [
      { num: 1, title: "Isolate High-Pressure Vertical Riser Valves", desc: "Facility engineers and maintenance staff must know the exact location of sectional riser isolation valves on each floor to avoid shutting off fire sprinkler systems unnecessarily." },
      { num: 2, title: "Coordinated Multi-Unit Emergency Notification", desc: "Deploy emergency text and intercom alerts to notify downstream tenants of water cascading into ceiling plenums and elevator shafts." },
      { num: 3, title: "Commercial Restoration Equipment Deployment", desc: "Large commercial losses require high-capacity desiccant dehumidifiers and power distribution boxes to dry out steel framing and concrete floor decks." }
    ]
  },
  {
    slug: "water-hammer-high-pressure-pipe-damage",
    title: "Water Hammer and High Water Pressure: How Hydraulic Shock Damages Pipes",
    h1: "Water Hammer & High Pressure: How Hydraulic Shock Ruins Pipes",
    metaTitle: "Water Hammer & High Water Pressure | Causes & Pipe Damage",
    metaDesc: "Loud banging noises in pipes when faucets shut off? Learn how water hammer and high water pressure cause pipe ruptures & PRV fixes. Call (855) 499-4130.",
    primaryKeyword: "water hammer and high water pressure",
    readTime: "5 min read",
    pillarLink: "/services/copper-pex-pvc-pipe-repair/",
    intro: "Loud, thumping bang noises behind walls whenever a faucet closes or a washing machine valve snaps shut are warning signs of hydraulic shock, commonly known as water hammer.",
    steps: [
      { num: 1, title: "The Physics of Water Hammer", desc: "Water is an incompressible fluid. When moving water suddenly hits a closed valve, its forward momentum generates hydraulic shockwaves traveling backward through the pipe at over 4,000 feet per second." },
      { num: 2, title: "Damage to Pipe Joints and Fixtures", desc: "Repeated shockwaves flex soldered copper joints, loosen mechanical fittings, crack ceramic toilet valves, and burst flexible appliance hoses." },
      { num: 3, title: "Solutions: Water Hammer Arrestors & Pressure Regulators", desc: "Licensed plumbers install piston-style water hammer arrestors and replace failed Pressure Reducing Valves (PRVs) to keep household pressure below safe 65 PSI thresholds." }
    ]
  },
  {
    slug: "water-meter-spinning-no-water-running",
    title: "Water Meter Spinning With No Water Running? How to Find the Leak",
    h1: "Water Meter Spinning With All Taps Off? How to Find the Leak",
    metaTitle: "Water Meter Spinning With No Water Running? (Leak Detection)",
    metaDesc: "Is your water meter dial spinning while every faucet is turned off? Learn how to perform the leak indicator test & isolate the leak. Call (855) 499-4130.",
    primaryKeyword: "water meter spinning with all taps off",
    readTime: "5 min read",
    pillarLink: "/services/underground-main-water-line-repair/",
    intro: "Your municipal water meter has a built-in low-flow leak detection indicator. If this indicator moves when no water is actively running in your home, you have an active leak.",
    steps: [
      { num: 1, title: "Locate the Low-Flow Leak Indicator", desc: "Open your water meter lid. Look for a small red, blue, or silver triangle or star dial next to the main gallon odometer. This dial spins with microscopic water movement." },
      { num: 2, title: "The 30-Minute Isolation Test", desc: "Ensure all indoor faucets, washing machines, and ice makers are off. Check the indicator. If it is rotating, water is actively escaping." },
      { num: 3, title: "Determine If the Leak Is Inside or Outside", desc: "Turn off your indoor main shutoff valve. If the water meter stops spinning, the leak is inside your home. If the meter continues spinning, the leak is underground in your yard service line between the meter and the house." }
    ]
  }
];

module.exports = resourcesData;

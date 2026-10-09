// Core Services Data Model for 24/7 Pipe Rescue
// Covers all 6 Pillars and 15 Sub-Services with unique technical depth, pricing ranges, FAQs, and SEO Hero Media

const servicesData = [
  {
    id: "emergency-burst-pipe-repair",
    slug: "emergency-burst-pipe-repair",
    title: "24/7 Emergency Burst Pipe Repair",
    h1: "24/7 Emergency Burst Pipe Repair Services",
    metaTitle: "Emergency Burst Pipe Repair | 24/7 Plumber Dispatch",
    metaDesc: "Gushing or frozen broken pipe? 24/7 Pipe Rescue connects you with 24/7 licensed emergency plumbers. Call (855) 499-4130 for rapid response dispatch.",
    primaryKeyword: "emergency burst pipe repair",
    urgency: "Immediate Critical (Response within 45-90 minutes)",
    heroImage: "/images/emergency-burst-pipe-repair.jpg",
    heroImageAlt: "Emergency burst copper water pipe repair with ProPress tool in residential wall cavity",
    summary: "When a pressurized water line ruptures inside a ceiling, wall, or crawlspace, hundreds of gallons of water can flood your property within minutes. 24/7 Pipe Rescue connects you with licensed emergency plumbers equipped with acoustic leak detection, thermal imaging, and rapid pipe-isolation tools.",
    firstHourSteps: [
      "Locate and close your main water shutoff valve immediately (quarter-turn clockwise for ball valves or multiple turns clockwise for gate valves).",
      "Switch off circuit breakers controlling flooded areas or moisture-exposed outlets to eliminate electrocution hazards.",
      "Open cold-water taps on the lowest and highest floor levels to drain pressurized residual water out of the plumbing system.",
      "Photograph flooded rooms, dripping drywall, and standing water before wiping down surfaces to support your insurance claim.",
      "Call 24/7 Pipe Rescue dispatch at (855) 499-4130 to route an emergency plumbing contractor directly to your property."
    ],
    priceRange: "$350 – $1,800 (Average: $750 for accessible lines; up to $3,500+ for slab leaks)",
    costGuideUrl: "/plumbing-costs/burst-pipe-repair-cost/",
    repairVsReplace: "If an isolated freeze split or physical puncture occurs in healthy copper or PEX tubing, sectional pipe splicing is cost-effective. However, if your home features corroded galvanized steel or polybutylene piping with repeated failures, full repiping is strongly recommended.",
    children: [
      {
        slug: "burst-pipe-in-wall-or-ceiling",
        title: "Burst Pipe in Wall or Ceiling",
        h1: "Burst Pipe in Wall or Ceiling Repair Services",
        metaTitle: "Burst Pipe in Wall or Ceiling Repair | 24/7 Plumbers",
        metaDesc: "Water leaking through ceiling or drywall? Fast emergency pipe repair inside walls & ceilings. Upfront pricing. Call (855) 499-4130 for rapid dispatch.",
        primaryKeyword: "burst pipe in wall or ceiling",
        heroImage: "/images/emergency-burst-pipe-repair.jpg",
        heroImageAlt: "Emergency burst water pipe repair inside wall cavity and ceiling drywall",
        summary: "Pipes rupturing within wall cavities or overhead ceiling joists create hidden structural rot, saturated insulation, and electrical dangers. Our network technicians pinpoint the exact breach with thermal imaging cameras and precision moisture meters before making clean, minimal surgical drywall cuts.",
        methods: [
          "Non-destructive thermal infrared inspection to isolate temperature differentials along hidden water lines.",
          "Targeted inspection port cutting to minimize cosmetic drywall demolition.",
          "Sectional copper sweat splicing, PEX crimp bypasses, or flame-free ProPress press-fitting.",
          "Hydrostatic pressure testing at 80 PSI to verify zero lingering weeping leaks before wall closure."
        ],
        priceRange: "$400 – $2,200 (includes pipe repair and basic structural access)"
      },
      {
        slug: "burst-pipe-under-slab",
        title: "Burst Pipe Under Slab (Slab Leak)",
        h1: "Burst Pipe Under Slab & Slab Leak Repair Services",
        metaTitle: "Burst Pipe Under Slab Repair | Foundation Slab Leaks",
        metaDesc: "Underground slab leak or hot spots on foundation floors? Professional electronic slab leak repair & pipe rerouting. Call (855) 499-4130.",
        primaryKeyword: "burst pipe under slab",
        heroImage: "/images/slab-leak-repair.jpg",
        heroImageAlt: "Electronic acoustic slab leak detection and concrete floor foundation pipe repair",
        summary: "Sub-slab pipe failures occur when pressurized copper supply lines buried beneath concrete foundations corrode, shift, or rub against aggregate rocks. Left unaddressed, slab leaks erode foundation soil, cause structural heaving, and spike water bills dramatically.",
        methods: [
          "Acoustic frequency listening discs and nitrogen pressurization to pinpoint sub-slab ruptures without indiscriminate digging.",
          "Direct concrete jackhammering access for targeted spot repairs on single-point ruptures.",
          "Overhead PEX rerouting through attic or wall framing to bypass abandoned sub-slab copper lines permanently.",
          "Trenchless CIPP relining where pipe geometry permits non-invasive structural sleeving."
        ],
        priceRange: "$1,200 – $4,500 (depending on spot repair vs. overhead line reroute)"
      },
      {
        slug: "burst-water-supply-line",
        title: "Burst Water Supply Line Repair",
        h1: "Burst Water Supply Line Repair & Replacement",
        metaTitle: "Burst Water Supply Line Repair | Sink, Toilet, Laundry",
        metaDesc: "Braided supply line burst under sink, toilet, or washing machine? 24/7 emergency water line repair and angle stop replacement. Call (855) 499-4130.",
        primaryKeyword: "burst water supply line",
        heroImage: "/images/emergency-burst-pipe-repair.jpg",
        heroImageAlt: "Emergency burst braided water supply line and angle stop shutoff valve replacement",
        summary: "Flexible braided stainless steel and reinforced rubber supply lines feeding toilets, washing machines, dishwashers, and sinks operate under continuous 50–70 PSI municipal pressure. Rubber embrittlement or plastic nut cracking leads to violent bursts that dump 6–10 gallons per minute.",
        methods: [
          "High-flow emergency water extraction and isolation valve replacement.",
          "Commercial quarter-turn ball valve angle-stop installation replacing failed multi-turn gate stops.",
          "Braided stainless steel polymer-core line replacement with flood-check auto-shutoff valves.",
          "Pressure regulator inspection to confirm household pressure does not exceed safe 60 PSI limits."
        ],
        priceRange: "$200 – $650 (supply line + valve replacement + leak test)"
      }
    ],
    faqs: [
      {
        q: "How fast can an emergency plumber arrive when a pipe bursts?",
        a: "Emergency plumbers in our network typically arrive within 45 to 90 minutes depending on your location, time of call, and severe weather road conditions. In the meantime, our dispatch operators will guide you through shutting off your main water valve to prevent further flooding."
      },
      {
        q: "What is the very first thing I should do if a pipe bursts in my house?",
        a: "Immediately shut off your main water supply valve. In northern homes, this is usually located in the basement near the front wall where the water meter enters. In southern homes, it is often in an outdoor ground meter box near the curb. Next, turn off electricity to any flooded areas."
      },
      {
        q: "Does homeowner's insurance cover emergency burst pipe repairs?",
        a: "Homeowner's insurance typically covers the consequential water damage (such as ruined flooring, wet drywall, and structural drying) resulting from a 'sudden and accidental' pipe burst. However, policies frequently exclude the direct plumbing repair cost of the pipe itself if wear or lack of maintenance caused the issue."
      },
      {
        q: "How much does it cost to fix a burst pipe on an emergency call?",
        a: "Emergency burst pipe repair typically ranges from $350 to $1,800. Accessible pipes in basements or utility rooms average $400 to $700, while hidden pipe breaks behind bathroom walls, ceilings, or concrete slabs average $1,200 to $3,500 due to diagnostic and access requirements."
      }
    ]
  },
  {
    id: "frozen-pipe-thawing-repair",
    slug: "frozen-pipe-thawing-repair",
    title: "Frozen Pipe Thawing & Repair",
    h1: "Frozen Pipe Thawing & Burst Pipe Repair Services",
    metaTitle: "Frozen Pipe Thawing & Repair | 24/7 Winter Plumbers",
    metaDesc: "Pipes frozen or split from winter cold? Professional safe thawing machines & freeze-break pipe repairs. Upfront rates. Call (855) 499-4130.",
    primaryKeyword: "frozen pipe repair",
    urgency: "High Priority (Freezing pipes expand by 9% and can split at any moment)",
    heroImage: "/images/frozen-pipe-thawing-repair.jpg",
    heroImageAlt: "Professional electrical resistance thawing of frozen water supply pipes in winter basement",
    summary: "When outdoor temperatures plummet below 20°F (-6°C), uninsulated water lines in exterior walls, crawlspaces, and unheated basements freeze solid. Water expands by approximately 9% upon freezing, creating internal hydrostatic pressure up to 4,000 PSI that fractures copper and PEX pipes.",
    priceRange: "$250 – $1,200 (Thawing: $250 – $600; Sectional repair: $450 – $1,200)",
    costGuideUrl: "/plumbing-costs/frozen-pipe-repair-cost/",
    children: [
      {
        slug: "thawing-frozen-pipes",
        title: "Professional Pipe Thawing",
        h1: "Professional Frozen Pipe Thawing Services",
        metaTitle: "Frozen Pipe Thawing Service | Safe Electric & Heat Thaw",
        metaDesc: "Safe, flameless pipe thawing for frozen copper and PEX lines. Avoid split pipes and house fires. 24/7 service. Call (855) 499-4130.",
        primaryKeyword: "thawing frozen pipes",
        heroImage: "/images/frozen-pipe-thawing-repair.jpg",
        heroImageAlt: "Flameless low-voltage pipe thawing machine operating on frozen copper lines",
        summary: "Never use open-flame blowtorches or propane torches to thaw frozen lines, which triggers hundreds of catastrophic residential fires each winter. Network plumbers use specialized low-voltage resistance pipe thawers and controlled commercial hot-air induction systems to gently thaw lines from the open faucet backward.",
        methods: [
          "Low-voltage electrical resistance thawing on continuous metal piping.",
          "Controlled warm-air recirculation hoods inside crawlspaces and subfloors.",
          "Hot water jetting machines for frozen underground sewer and main lines.",
          "Continuous pressure monitoring to detect hidden pinhole cracks as ice liquefies."
        ],
        priceRange: "$250 – $650"
      },
      {
        slug: "burst-frozen-pipe-repair",
        title: "Burst Frozen Pipe Repair",
        h1: "Burst Frozen Pipe Repair & Sectional Replacement",
        metaTitle: "Burst Frozen Pipe Repair | Split Copper & PEX Lines",
        metaDesc: "Pipes split after freezing? Rapid emergency repair for cracked freeze-damaged water lines. Licensed local plumbers. Call (855) 499-4130.",
        primaryKeyword: "burst frozen pipe repair",
        heroImage: "/images/frozen-pipe-thawing-repair.jpg",
        heroImageAlt: "Repair and insulation of freeze-fractured split water supply lines",
        summary: "Often homeowners only realize a pipe has burst after the ice thaws and high-pressure water surges out of the newly opened split. Our network plumbers isolate split piping, cut out damaged sections, and install freeze-resilient PEX or reinforced copper couplings with high-density closed-cell insulation sleeves.",
        methods: [
          "Emergency main isolation and line de-pressurization.",
          "Precision cutting of split pipe sections beyond the bulging deformation zone.",
          "Installation of ASTM-certified PEX-A expansion fittings or soldered copper couplings.",
          "Application of self-regulating heat cable and closed-cell polyethylene pipe insulation."
        ],
        priceRange: "$400 – $1,500"
      }
    ],
    faqs: [
      {
        q: "Can I thaw a frozen pipe myself with a blowtorch?",
        a: "No. Never use an open flame blowtorch, propane heater, or charcoal burner to thaw frozen pipes. Open flames ignite dry wood studs, framing, and insulation inside wall cavities. Instead, keep faucets cracked open and use gentle heat sources like a hair dryer, or call a professional."
      },
      {
        q: "Why do pipes burst when they freeze?",
        a: "Pipes do not burst primarily where the ice forms, but downstream between the ice blockage and a closed faucet. As water freezes, it expands by 9% in volume. This expansion pushes trapped liquid water into an enclosed space, driving hydrostatic pressure past 3,000 PSI until the pipe wall splits."
      }
    ]
  },
  {
    id: "copper-pex-pvc-pipe-repair",
    slug: "copper-pex-pvc-pipe-repair",
    title: "Copper, PEX & PVC Pipe Repair",
    h1: "Copper, PEX & PVC Pipe Repair & Replacement",
    metaTitle: "Copper, PEX & PVC Pipe Repair | Licensed Plumber Network",
    metaDesc: "Expert repair for copper pinholes, PEX fittings & PVC cracks. Precision repiping and leak fixes with upfront pricing. Call (855) 499-4130.",
    primaryKeyword: "pipe repair copper PEX PVC",
    urgency: "Standard to High Priority",
    heroImage: "/images/copper-pex-pvc-pipe-repair.jpg",
    heroImageAlt: "Plumber assembling PEX piping and copper manifold with brass crimp expansion fittings",
    summary: "Modern residential plumbing systems utilize various pipe materials, each with unique failure modes. From chemical pitting in type M copper to stress cracking in PVC and rodent chew or fitting failures in PEX, our network plumbers provide material-specific repairs conforming to national UPC and IPC plumbing codes.",
    priceRange: "$250 – $1,400 (Repiping single runs: $800 – $3,500)",
    costGuideUrl: "/plumbing-costs/pipe-repair-cost-copper-pex-pvc/",
    children: [
      {
        slug: "copper-pipe-repair",
        title: "Copper Pipe Repair",
        h1: "Copper Pipe Leak Repair & Soldering Services",
        metaTitle: "Copper Pipe Repair & Replacement | Pinhole & Split Fixes",
        metaDesc: "Leaking copper water pipe? Professional copper soldering, ProPress fittings, and section replacement. Call (855) 499-4130 for local plumbers.",
        primaryKeyword: "copper pipe repair",
        heroImage: "/images/copper-pex-pvc-pipe-repair.jpg",
        heroImageAlt: "Lead-free soldering and ProPress fitting repair on copper water pipes",
        summary: "Copper piping has been the gold standard since the 1960s, but acidic water (pH < 6.5), turbulent flow, and flux corrosion create pinhole leaks. Network technicians perform flame-free ProPress crimping or traditional lead-free silver soldering to restore line integrity.",
        methods: ["Lead-free silver alloy sweat soldering", "Viegga ProPress mechanical press fittings", "Slip coupling pipe inserts"],
        priceRange: "$250 – $850"
      },
      {
        slug: "pex-pipe-repair",
        title: "PEX Pipe Repair",
        h1: "PEX Pipe Repair & Fitting Replacement Services",
        metaTitle: "PEX Pipe Repair | PEX-A Expansion & Crimp Connections",
        metaDesc: "Punctured or leaking PEX pipe? Professional repair for PEX-A, PEX-B, and brass dezincification fittings. Upfront rates. Call (855) 499-4130.",
        primaryKeyword: "pex pipe repair",
        heroImage: "/images/copper-pex-pvc-pipe-repair.jpg",
        heroImageAlt: "PEX-A cold expansion and PEX-B crimp ring pipe repair and manifold connection",
        summary: "Cross-linked polyethylene (PEX) offers flexibility and freeze tolerance, but can be damaged by drywall screws, rodents, UV degradation, or dezincified yellow-brass fittings. Plumbers utilize cold-expansion (PEX-A) or copper crimp rings (PEX-B) to effect durable repairs.",
        methods: ["ProPEX ASTM F1960 cold expansion splicing", "Stainless steel clamp and copper crimp sleeves", "Polymer replacement fittings"],
        priceRange: "$220 – $750"
      },
      {
        slug: "pvc-pipe-repair",
        title: "PVC & CPVC Pipe Repair",
        h1: "PVC & CPVC Pipe Repair Services",
        metaTitle: "PVC & CPVC Pipe Repair | Drain & Pressure Line Fixes",
        metaDesc: "Cracked PVC or brittle CPVC pipe? Fast professional solvent welding and compression repairs. Call (855) 499-4130 for licensed plumbers.",
        primaryKeyword: "pvc pipe repair",
        heroImage: "/images/copper-pex-pvc-pipe-repair.jpg",
        heroImageAlt: "Schedule 40 PVC and CPVC pipe solvent cement weld repair and coupling replacement",
        summary: "Schedule 40 PVC and CPVC pipes become brittle with age, thermal cycling, and chemical exposure. Network plumbers properly prime, solvent-weld, or mechanical-union repair damaged water and drainage sections without dangerous stress loading.",
        methods: ["Two-step purple primer and heavy-duty solvent welding", "Telescopic expansion slip couplings", "Flanged mechanical unions"],
        priceRange: "$200 – $700"
      },
      {
        slug: "pinhole-leak-repair",
        title: "Pinhole Leak Repair",
        h1: "Copper Pinhole Leak Detection & Repair",
        metaTitle: "Pinhole Leak Repair in Copper Pipes | Fast Leak Fixes",
        metaDesc: "Pinhole leak spraying in your wall? Electronic leak location and durable copper pipe repairs. Upfront flat rates. Call (855) 499-4130.",
        primaryKeyword: "pinhole leak repair",
        heroImage: "/images/copper-pex-pvc-pipe-repair.jpg",
        heroImageAlt: "Precision ultrasonic detection and sectional repair of copper pinhole leaks",
        summary: "Tiny, needle-sized pinhole leaks in copper supply lines often cause severe hidden rot before appearing. Network plumbers isolate microscopic pinholes using ultrasonic acoustics, replace pitted sections, and evaluate water chemistry.",
        methods: ["Ultrasonic acoustic leak detection", "Sectional copper pipe cut-out and ProPress replacement", "Water pH testing and corrosion evaluation"],
        priceRange: "$300 – $950"
      }
    ],
    faqs: [
      {
        q: "What causes pinhole leaks in copper pipes?",
        a: "Pinhole leaks are commonly caused by pitting corrosion from low pH (acidic) water, excessive water velocity from oversized pumps, dissolved oxygen, or residual soldering flux left inside the pipe during original construction."
      },
      {
        q: "Is PEX piping better than copper for freeze resistance?",
        a: "Yes. PEX is cross-linked polyethylene which can expand slightly when water turns to ice and contracts back when thawed, making it substantially more freeze-resilient than rigid copper or brittle CPVC, although fittings can still fail."
      }
    ]
  },
  {
    id: "underground-main-water-line-repair",
    slug: "underground-main-water-line-repair",
    title: "Underground Main Water Line Repair",
    h1: "Underground Main Water Line Repair & Replacement",
    metaTitle: "Underground Main Water Line Repair | Trenchless & Dig",
    metaDesc: "Water pooling in yard or low water pressure? Emergency main water service line leak repair & replacement. Licensed plumbers. Call (855) 499-4130.",
    primaryKeyword: "main water line repair",
    urgency: "High Priority (Risk of contamination, yard sinkholes, and structural erosion)",
    heroImage: "/images/main-water-line-repair.jpg",
    heroImageAlt: "Licensed contractors repairing underground blue HDPE main water service line trench",
    summary: "Your underground water service line conveys pressurized municipal water from the public curb stop or water meter into your foundation. Shifts in clay soil, tree root intrusion, and age-related corrosion cause subterranean pipe ruptures that create soggy lawns, sediment in fixtures, and dropping water pressure.",
    priceRange: "$1,000 – $4,500 (Spot repair: $1,000 – $2,200; Full service line replacement: $3,000 – $8,500)",
    costGuideUrl: "/plumbing-costs/main-water-line-repair-cost/",
    children: [
      {
        slug: "main-water-line-leak-repair",
        title: "Main Water Line Leak Repair",
        h1: "Main Water Line Leak Repair & Spot Fixes",
        metaTitle: "Main Water Line Leak Repair | Spot Excavation & Clamps",
        metaDesc: "Leaking underground water service line? Precision spot repair, hydro-excavation & full-circle repair clamps. Call (855) 499-4130.",
        primaryKeyword: "main water line leak repair",
        heroImage: "/images/main-water-line-repair.jpg",
        heroImageAlt: "Spot micro-excavation and stainless steel full-circle clamp repair on main water service line",
        summary: "When a main water line suffers a localized crack or joint failure, full trenching is often unnecessary. Plumbers execute targeted micro-excavation or vacuum hydro-excavation to expose the damaged zone and install heavy-duty stainless steel full-circle repair clamps or spliced ductile couplings.",
        methods: ["Micro-trenching and vacuum hydro-excavation", "Stainless steel full-circle Mueller repair clamps", "Underground compression couplings"],
        priceRange: "$950 – $2,500"
      },
      {
        slug: "main-water-line-replacement",
        title: "Main Water Line Replacement",
        h1: "Main Water Line Replacement & Installation",
        metaTitle: "Main Water Line Replacement | Trenchless Pipe Pulling",
        metaDesc: "Replace aging or collapsed underground water service line with modern seamless HDPE or K-copper. Licensed contractors. Call (855) 499-4130.",
        primaryKeyword: "main water line replacement",
        heroImage: "/images/main-water-line-repair.jpg",
        heroImageAlt: "Directional boring and continuous 200 PSI HDPE main water line replacement",
        summary: "When an underground water line suffers multiple recurrent breaks, severe lead or galvanized degradation, complete line replacement is the only lasting solution. Contractors utilize horizontal directional boring or pneumatic pipe pulling to install continuous 1-inch or 1.25-inch 200 PSI HDPE pipe.",
        methods: ["Pneumatic horizontal pipe pulling", "Directional guided subterranean boring", "Continuous SDR-9 200 PSI HDPE installation"],
        priceRange: "$2,800 – $8,500"
      }
    ],
    faqs: [
      {
        q: "Who is responsible for repairing a leaking main water line?",
        a: "In most US municipalities, the property owner is legally and financially responsible for the water service line running from the property boundary (the curb stop shutoff valve or city water meter) into the home. The municipal water utility is only responsible for the public water main in the street."
      },
      {
        q: "How do I know if my underground water line is leaking?",
        a: "Common indicators include a sudden unexplained surge in your water utility bill, standing water or unusually lush grass patches in the yard, hissing sounds in basement pipes when no water is running, and low household water pressure."
      }
    ]
  },
  {
    id: "trenchless-pipe-repair-relining",
    slug: "trenchless-pipe-repair-relining",
    title: "Trenchless Pipe Repair & Relining",
    h1: "Trenchless Pipe Repair & CIPP Relining Services",
    metaTitle: "Trenchless Pipe Repair & Relining | No-Dig Pipe Lining",
    metaDesc: "Restore cracked underground pipes without digging up your yard, driveway or porch. CIPP lining & pipe bursting. Call (855) 499-4130.",
    primaryKeyword: "trenchless pipe repair",
    urgency: "Scheduled / Priority (Landscape & structural preservation)",
    heroImage: "/images/trenchless-pipe-repair.jpg",
    heroImageAlt: "Trenchless plumbing crew inserting epoxy CIPP pipe lining inversion tube",
    summary: "Traditional pipe replacement requires excavating destructive trenches through manicured lawns, brick driveways, patios, and mature trees. Trenchless pipe restoration rehabilitates damaged underground sewer and water pipes internally using cured-in-place pipe (CIPP) epoxy lining or hydraulic pipe bursting from small access pits.",
    priceRange: "$80 – $250 per linear foot ($3,500 – $9,000 typical residential project)",
    costGuideUrl: "/plumbing-costs/trenchless-pipe-repair-cost/",
    children: [
      {
        slug: "pipe-lining-cipp",
        title: "CIPP Pipe Lining",
        h1: "Cured-in-Place Pipe (CIPP) Lining Services",
        metaTitle: "CIPP Pipe Lining & Epoxy Relining | No-Dig Pipe Repair",
        metaDesc: "Seamless epoxy pipe relining for cracked or root-damaged underground lines. 50-year structural lifespan. Call (855) 499-4130 for estimates.",
        primaryKeyword: "pipe lining cipp",
        heroImage: "/images/trenchless-pipe-repair.jpg",
        heroImageAlt: "Cured-in-place pipe CIPP inversion epoxy relining for no-dig pipe restoration",
        summary: "CIPP involves pulling or inverting an epoxy-saturated polyester felt tube into the damaged host pipe. Once inflated with compressed air, hot water or steam cures the epoxy, forming a smooth, jointless pipe-within-a-pipe with a 50-year design life.",
        methods: ["High-definition closed-circuit sewer camera inspection", "Hydro-jet descaling and mechanical milling", "Air inversion of silicate epoxy tube", "Steam or ambient temperature thermal cure"],
        priceRange: "$80 – $220 / linear ft"
      },
      {
        slug: "pipe-bursting",
        title: "Pipe Bursting",
        h1: "Trenchless Pipe Bursting Replacement Services",
        metaTitle: "Pipe Bursting Replacement | Trenchless Sewer & Water Line",
        metaDesc: "Replace collapsed or undersized underground lines without trenching. Hydraulic bursting head pulls new HDPE pipe. Call (855) 499-4130.",
        primaryKeyword: "pipe bursting",
        heroImage: "/images/trenchless-pipe-repair.jpg",
        heroImageAlt: "Hydraulic pipe bursting head replacing underground water and sewer lines",
        summary: "When an underground line is severely fractured, crushed, or bellied beyond relining, pipe bursting pulls a cone-shaped expanding bursting head through the host pipe. The head fractures the old pipe outward while simultaneously pulling a new continuous high-density polyethylene (HDPE) pipe into place.",
        methods: ["Hydraulic pulling unit setup in receiving pit", "Butt-welded continuous seamless HDPE pipe string", "Pneumatic expanding bursting head operation"],
        priceRange: "$100 – $260 / linear ft"
      }
    ],
    faqs: [
      {
        q: "How long does trenchless CIPP pipe lining last?",
        a: "Professionally installed CIPP epoxy pipe liners carry an ASTM structural design lifespan of 50 years or more. Because the liner is continuous and seamless, it is impervious to tree root intrusion and chemical corrosion."
      },
      {
        q: "Is trenchless pipe repair cheaper than digging up the yard?",
        a: "While the initial plumbing line-item for trenchless technology may be similar to traditional excavation, trenchless repair is significantly less expensive overall when factoring in the thousands of dollars saved on repaving asphalt driveways, restoring concrete sidewalks, and re-landscaping."
      }
    ]
  },
  {
    id: "emergency-water-extraction-drying",
    slug: "emergency-water-extraction-drying",
    title: "Emergency Water Extraction & Drying",
    h1: "Emergency Water Extraction & Structural Drying Services",
    metaTitle: "Emergency Water Extraction & Drying | 24/7 Flood Cleanup",
    metaDesc: "Flooded basement or soaked drywall from a burst pipe? 24/7 truck-mounted water extraction, commercial drying & mold prevention. Call (855) 499-4130.",
    primaryKeyword: "water extraction and drying",
    urgency: "Immediate Critical (Mold germination begins within 24-48 hours)",
    heroImage: "/images/water-extraction-drying.jpg",
    heroImageAlt: "Flood restoration specialists using truck-mounted water extraction and dehumidifiers",
    summary: "Stopping the pipe burst is only step one. Saturated hardwood flooring, wet subfloors, and soaked drywall breed destructive toxic mold within 24 to 48 hours. 24/7 Pipe Rescue routes emergency restoration partners certified under the IICRC S500 standard with industrial truck-mounted extractors, low-grain refrigerant (LGR) dehumidifiers, and high-velocity air movers.",
    priceRange: "$1,200 – $5,000+ (Varies by square footage and Category 1, 2, or 3 water classification)",
    costGuideUrl: "/plumbing-costs/water-extraction-and-drying-cost/",
    children: [
      {
        slug: "structural-drying-dehumidification",
        title: "Structural Drying & Dehumidification",
        h1: "Structural Drying & Industrial Dehumidification",
        metaTitle: "Structural Drying & Commercial Dehumidification Services",
        metaDesc: "Deep moisture extraction from wall cavities, subflooring & concrete slabs using LGR dehumidifiers. IICRC S500 standard. Call (855) 499-4130.",
        primaryKeyword: "structural drying and dehumidification",
        heroImage: "/images/water-extraction-drying.jpg",
        heroImageAlt: "Commercial LGR dehumidifier and high-velocity air movers drying flooded drywall",
        summary: "Liquid water evaporates into the air, driving indoor relative humidity over 85% and causing secondary moisture damage to ceilings and adjoining rooms. Restoration crews deploy commercial LGR dehumidifiers and inject heated airflow directly into wall cavities to bring structural wood below 15% moisture content.",
        methods: ["Psychrometric moisture mapping and thermal hygrometer logging", "Low-Grain Refrigerant (LGR) industrial dehumidifier placement", "Centrifugal high-velocity air movers for vapor boundary breakdown", "Injectidry wall cavity floor mat systems"],
        priceRange: "$1,000 – $3,500"
      },
      {
        slug: "basement-flood-water-removal",
        title: "Basement Flood Water Removal",
        h1: "Basement Flood Water Removal & Cleanup Services",
        metaTitle: "Basement Flood Water Removal | 24/7 Sump & Water Extraction",
        metaDesc: "Burst pipe flooded your basement? Immediate high-volume submersible pump extraction & sanitization. 24/7 response. Call (855) 499-4130.",
        primaryKeyword: "basement flood water removal",
        heroImage: "/images/water-extraction-drying.jpg",
        heroImageAlt: "Submersible pump water extraction and flood cleanup in residential basement",
        summary: "Basements are the lowest point in a structure, collecting hundreds of gallons from overhead burst pipes. Water pools against foundation walls and penetrates finished drywall. Crews pump out standing floodwater using heavy-duty submersible trash pumps and truck-mounted vacuum extractors.",
        methods: ["Truck-mounted high-CFM extraction units", "Submersible continuous duty trash pumping", "Antimicrobial surface disinfection to prevent mold and bacterial colonization", "Carpet padding extraction and rapid disposal"],
        priceRange: "$1,200 – $4,500"
      }
    ],
    faqs: [
      {
        q: "How quickly does mold develop after a pipe bursts?",
        a: "Mold spores begin germinating on wet drywall, organic cellulose carpet backing, and baseboards within 24 to 48 hours of initial water contact. Prompt professional water extraction and industrial dehumidification are essential to prevent dangerous microbial growth."
      },
      {
        q: "What is the difference between Category 1, Category 2, and Category 3 water?",
        a: "Category 1 ('Clean Water') comes from clean supply pipes. Category 2 ('Grey Water') contains chemical or physical contaminants, such as washing machine discharge. Category 3 ('Black Water') is grossly contaminated with sewage or ground surface flooding and poses acute health hazards."
      }
    ]
  }
];

module.exports = servicesData;

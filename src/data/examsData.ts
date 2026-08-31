import { ExamInfo, ExamCategory } from '../types';

export const EXAMS_DATA: ExamInfo[] = [
  // --- SSC Category ---
  {
    id: 'ssc-cgl',
    name: 'SSC CGL',
    fullName: 'Combined Graduate Level Examination',
    category: 'SSC',
    description: 'Premier exam for Group B & C officers in Central Ministries, CBI, IT, Customs, and Postal departments.',
    totalMarks: 200,
    durationMinutes: 60,
    marksPerQuestion: 2,
    negativeMarks: 0.50,
    tier: 'Tier 1 & Tier 2',
    popular: true,
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    icon: 'Briefcase',
    subjects: ['Quantitative Aptitude', 'Reasoning Ability', 'General Awareness & GK', 'English Language'],
    syllabus: [
      {
        subject: 'Quantitative Aptitude',
        topics: ['Arithmetic (Percentages, Profit & Loss, SI/CI, Ratio)', 'Algebra & Polynomials', 'Geometry & Triangles', 'Trigonometry & Heights', 'Mensuration 2D & 3D', 'Data Interpretation (DI)']
      },
      {
        subject: 'Reasoning Ability',
        topics: ['Analogies & Classification', 'Syllogism & Venn Diagrams', 'Blood Relations & Direction Sense', 'Series (Number & Alpha)', 'Coding-Decoding', 'Non-Verbal (Paper folding, Mirror images)']
      },
      {
        subject: 'General Awareness & GK',
        topics: ['Indian Polity & Constitution', 'Modern & Ancient Indian History', 'Physical & Indian Geography', 'General Science (Physics, Chemistry, Bio)', 'Economy & Budget', 'Current Affairs & Sports']
      },
      {
        subject: 'English Language',
        topics: ['Reading Comprehension', 'Spotting Errors & Sentence Improvement', 'Idioms & Phrases', 'One Word Substitution', 'Synonyms & Antonyms', 'Active/Passive & Direct/Indirect']
      }
    ]
  },
  {
    id: 'ssc-chsl',
    name: 'SSC CHSL',
    fullName: 'Combined Higher Secondary Level (10+2)',
    category: 'SSC',
    description: 'Recruitment for Lower Division Clerk (LDC), Junior Secretariat Assistant (JSA), and Data Entry Operator (DEO).',
    totalMarks: 200,
    durationMinutes: 60,
    marksPerQuestion: 2,
    negativeMarks: 0.50,
    tier: 'Tier 1 & DEST Skill Test',
    popular: true,
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    icon: 'FileText',
    subjects: ['Quantitative Aptitude', 'Reasoning Ability', 'General Awareness & GK', 'English Language'],
    syllabus: [
      {
        subject: 'Quantitative Aptitude',
        topics: ['Number Systems', 'Percentages & Averages', 'Time & Work, Pipes & Cisterns', 'Speed, Time & Distance', 'Basic Algebra', 'Trigonometry Basics']
      },
      {
        subject: 'Reasoning Ability',
        topics: ['Semantic Analogy', 'Symbolic Operations', 'Venn Diagrams', 'Drawing Inferences', 'Punched Hole / Pattern folding']
      },
      {
        subject: 'General Awareness & GK',
        topics: ['History & Culture', 'Indian Geography', 'Indian Polity & Articles', 'General Science Essentials', 'National & International Current Affairs']
      },
      {
        subject: 'English Language',
        topics: ['Cloze Test', 'Para Jumbles', 'Grammar Rules & Errors', 'Spellings/Detecting Mis-spelt words', 'Idioms & Phrasal Verbs']
      }
    ]
  },
  {
    id: 'ssc-cpo',
    name: 'SSC CPO',
    fullName: 'Central Police Organization (Sub-Inspector in Delhi Police & CAPF)',
    category: 'SSC',
    description: 'Prestigious recruitment for Sub-Inspectors in Delhi Police, BSF, CISF, CRPF, ITBP, and SSB.',
    totalMarks: 200,
    durationMinutes: 120,
    marksPerQuestion: 1,
    negativeMarks: 0.25,
    tier: 'Paper 1 & Paper 2',
    popular: false,
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    icon: 'Shield',
    subjects: ['Reasoning Ability', 'General Awareness & GK', 'Quantitative Aptitude', 'English Language'],
    syllabus: [
      {
        subject: 'Reasoning Ability',
        topics: ['General Mental Ability', 'Seating Arrangements', 'Logical Deduction', 'Data Sufficiency']
      },
      {
        subject: 'General Awareness & GK',
        topics: ['Indian Constitution & Law Enforcement', 'National Security & Defense Affairs', 'Static GK & Indian States', 'Science & Technology']
      },
      {
        subject: 'Quantitative Aptitude',
        topics: ['Advanced Arithmetic', 'Mensuration', 'Geometry & Coordinate Geometry', 'Bar & Pie Charts']
      },
      {
        subject: 'English Language',
        topics: ['Comprehensive Grammar', 'Error Detection', 'Vocabulary & Antonyms', 'Passage Comprehension']
      }
    ]
  },
  {
    id: 'ssc-mts',
    name: 'SSC MTS & Havaldar',
    fullName: 'Multi-Tasking (Non-Technical) Staff Examination',
    category: 'SSC',
    description: 'Entry-level central government positions across various ministries and departments.',
    totalMarks: 150,
    durationMinutes: 90,
    marksPerQuestion: 3,
    negativeMarks: 1.00,
    tier: 'Session 1 & Session 2',
    popular: false,
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    icon: 'Layers',
    subjects: ['Quantitative Aptitude', 'Reasoning Ability', 'General Awareness & GK', 'English Language'],
    syllabus: [
      { subject: 'Quantitative Aptitude', topics: ['Decimals & Fractions', 'LCM & HCF', 'Percentage, Ratio & Proportion', 'Simple Interest', 'Area & Perimeter'] },
      { subject: 'Reasoning Ability', topics: ['Alpha-Numeric Series', 'Coding-Decoding', 'Order & Ranking', 'Similarities and Differences'] },
      { subject: 'General Awareness & GK', topics: ['Social Studies (History, Geography, Art and Culture, Civics, Economics)', 'Environmental Science'] },
      { subject: 'English Language', topics: ['Basic Vocabulary', 'Sentence Structure', 'Synonyms/Antonyms', 'Comprehension Paragraph'] }
    ]
  },

  // --- Railway Category ---
  {
    id: 'rrb-ntpc',
    name: 'RRB NTPC',
    fullName: 'Non-Technical Popular Categories',
    category: 'RAILWAY',
    description: 'High-demand recruitment for Station Master, Goods Guard, Commercial Apprentice, Junior Clerk cum Typist.',
    totalMarks: 100,
    durationMinutes: 90,
    marksPerQuestion: 1,
    negativeMarks: 0.33,
    tier: 'CBT 1 & CBT 2',
    popular: true,
    badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    icon: 'Train',
    subjects: ['General Awareness & GK', 'Quantitative Aptitude', 'Reasoning Ability', 'General Science'],
    syllabus: [
      {
        subject: 'General Awareness & GK',
        topics: ['Current Events of National & International Importance', 'Indian Railway Heritage & GK', 'Monuments and Places of India', 'Indian Literature & Art', 'UN and Other Important World Organizations', 'Basics of Computers and Computer Applications']
      },
      {
        subject: 'Quantitative Aptitude',
        topics: ['Number System, Decimals & Fractions', 'LCM, HCF', 'Ratio and Proportions, Percentage', 'Time and Work, Time and Distance', 'Simple and Compound Interest', 'Elementary Algebra, Geometry, Trigonometry']
      },
      {
        subject: 'Reasoning Ability',
        topics: ['Analogies & Completion of Number and Alphabetical Series', 'Coding and Decoding', 'Mathematical Operations', 'Relationships & Jumbling', 'Venn Diagrams, Data Interpretation and Sufficiency', 'Statement- Arguments and Assumptions']
      },
      {
        subject: 'General Science',
        topics: ['Class 10th Standard Physics (Mechanics, Optics, Electricity)', 'Class 10th Standard Chemistry (Elements, Periodic table, Acids/Bases)', 'Life Sciences (Human anatomy, Genetics, Plant physiology)']
      }
    ]
  },
  {
    id: 'rrb-group-d',
    name: 'RRB Group D',
    fullName: 'Railway Recruitment Cell (Level-1 Posts)',
    category: 'RAILWAY',
    description: 'Recruitment for Track Maintainer, Assistant Pointsman, Helper, and Hospital Attendant in Indian Railways.',
    totalMarks: 100,
    durationMinutes: 90,
    marksPerQuestion: 1,
    negativeMarks: 0.33,
    tier: 'Computer Based Test (CBT)',
    popular: true,
    badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    icon: 'Wrench',
    subjects: ['General Science', 'Quantitative Aptitude', 'Reasoning Ability', 'General Awareness & GK'],
    syllabus: [
      {
        subject: 'General Science',
        topics: ['Physics (Laws of Motion, Work Power & Energy, Gravitation, Sound)', 'Chemistry (Chemical Reactions, Metals & Non-metals, Carbon Compounds)', 'Biology (Human Organ Systems, Diseases & Prevention, Ecology)']
      },
      {
        subject: 'Quantitative Aptitude',
        topics: ['Number System & BODMAS', 'Decimals & Fractions', 'Percentages, Profit and Loss', 'Simple and Compound Interest', 'Age Calculations, Calendar & Clock']
      },
      {
        subject: 'Reasoning Ability',
        topics: ['Analogies, Alphabetical and Number Series', 'Mathematical Operations, Syllogism', 'Venn Diagrams, Direction and Distance', 'Classification, Analytical Reasoning']
      },
      {
        subject: 'General Awareness & GK',
        topics: ['Current Affairs in Science & Technology', 'Sports, Culture, Personalities', 'Economics & Politics', 'Indian Railway Zones & Facts']
      }
    ]
  },
  {
    id: 'rrb-alp',
    name: 'RRB ALP & Technician',
    fullName: 'Assistant Loco Pilot & Technician',
    category: 'RAILWAY',
    description: 'Technical recruitment for piloting trains and maintaining locomotives and signal engineering across Indian Railways.',
    totalMarks: 75,
    durationMinutes: 60,
    marksPerQuestion: 1,
    negativeMarks: 0.33,
    tier: 'CBT 1 & CBT 2 (Technical)',
    popular: false,
    badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    icon: 'Cpu',
    subjects: ['Quantitative Aptitude', 'Reasoning Ability', 'General Science', 'General Awareness & GK'],
    syllabus: [
      { subject: 'Quantitative Aptitude', topics: ['BODMAS & Number Systems', 'Square Root & Age Calculations', 'Trigonometry & Geometry', 'Time, Speed & Distance'] },
      { subject: 'Reasoning Ability', topics: ['Analogies, Series, Coding-Decoding', 'Statement & Conclusions', 'Venn Diagram & Direction Sense'] },
      { subject: 'General Science', topics: ['Basic Science & Engineering Concepts', 'Units & Measurements, Mass, Weight & Density', 'Work, Power & Energy, Speed & Velocity', 'Heat & Temperature, Basic Electricity, Lever & Simple Machines'] },
      { subject: 'General Awareness & GK', topics: ['Current Affairs', 'Science & Technology Inventions', 'Railway Heritage & Governance'] }
    ]
  },

  // --- Banking Category ---
  {
    id: 'ibps-po',
    name: 'IBPS PO',
    fullName: 'Probationary Officers / Management Trainees in Public Sector Banks',
    category: 'BANKING',
    description: 'Flagship examination for recruiting probationary bank managers across 11 participating public sector banks.',
    totalMarks: 100,
    durationMinutes: 60,
    marksPerQuestion: 1,
    negativeMarks: 0.25,
    tier: 'Prelims, Mains & Interview',
    popular: true,
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    icon: 'Landmark',
    subjects: ['Quantitative Aptitude', 'Reasoning Ability', 'English Language', 'Banking & Financial Awareness', 'Computer Knowledge'],
    syllabus: [
      {
        subject: 'Quantitative Aptitude',
        topics: ['Data Interpretation (Radar, Caselet, Table, Missing DI)', 'Number Series (Missing & Wrong)', 'Quadratic Equations (High Level)', 'Arithmetic Word Problems (Time & Work, Probability, Mixtures)', 'Data Sufficiency']
      },
      {
        subject: 'Reasoning Ability',
        topics: ['Complex Seating Arrangements (Circular, Linear, Floor, Flat, Uncertain Persons)', 'Puzzles (Box, Month-Day, Category, Scheduling)', 'Input-Output Machine', 'Coded Inequality & Direction Sense', 'Critical & Logical Reasoning (Cause & Effect, Course of Action)']
      },
      {
        subject: 'English Language',
        topics: ['Reading Comprehension (Financial/Economic themes)', 'Error Spotting & Sentence Correction', 'Cloze Test & Word Swap', 'Para Fillers & Sentence Connectors', 'Vocabulary in Context']
      },
      {
        subject: 'Banking & Financial Awareness',
        topics: ['RBI Monetary Policy & Rates (Repo, Reverse Repo, CRR, SLR)', 'Banking Terminology (NPA, Basel III, Capital Adequacy)', 'Digital Banking & UPI, NEFT, RTGS, IMPS', 'Government Financial Schemes (PMJDY, PMSBY, PMJJBY)', 'Current Financial & Economic News']
      }
    ]
  },
  {
    id: 'sbi-po',
    name: 'SBI PO',
    fullName: 'State Bank of India Probationary Officer',
    category: 'BANKING',
    description: 'The most prestigious banking career in India offering rapid career growth, premier perks, and leadership tracks.',
    totalMarks: 100,
    durationMinutes: 60,
    marksPerQuestion: 1,
    negativeMarks: 0.25,
    tier: 'Prelims, Mains & GD/Interview',
    popular: true,
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    icon: 'Building2',
    subjects: ['Quantitative Aptitude', 'Reasoning Ability', 'English Language', 'Banking & Financial Awareness', 'Computer Knowledge'],
    syllabus: [
      {
        subject: 'Quantitative Aptitude',
        topics: ['High-level Caselet DI & Funnel DI', 'Probability & Permutation-Combination', 'Approximation & Simplification', 'Quantity 1 vs Quantity 2 Comparisons', 'Profit, Loss & Partnership']
      },
      {
        subject: 'Reasoning Ability',
        topics: ['3-Variable Puzzles & Matrix Puzzles', 'Coded Syllogism & Reverse Syllogism', 'Coded Blood Relations', 'Machine Input Output Steps', 'Statement & Assumptions / Inferences']
      },
      {
        subject: 'English Language',
        topics: ['Advanced RC Passages (Macroeconomics, AI, Tech)', 'Paragraph Completion & Coherence', 'Idiomatic Usage & Phrasal Replacements', 'Sentence Rearrangement (Parajumbles)']
      },
      {
        subject: 'Banking & Financial Awareness',
        topics: ['History & Structure of SBI', 'Fintech Innovations & Blockchain in Banking', 'Financial Inclusion & Priority Sector Lending (PSL)', 'Union Budget & Economic Survey Highlights', 'Major Mergers & Acquisitions in Banking']
      }
    ]
  },
  {
    id: 'ibps-clerk',
    name: 'IBPS Clerk',
    fullName: 'Clerical Cadre in Public Sector Banks',
    category: 'BANKING',
    description: 'Recruitment for customer associates, cashiers, and front-office banking executives across all nationalized banks.',
    totalMarks: 100,
    durationMinutes: 60,
    marksPerQuestion: 1,
    negativeMarks: 0.25,
    tier: 'Prelims & Mains',
    popular: true,
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    icon: 'CreditCard',
    subjects: ['Quantitative Aptitude', 'Reasoning Ability', 'English Language', 'Banking & Financial Awareness', 'Computer Knowledge'],
    syllabus: [
      { subject: 'Quantitative Aptitude', topics: ['Simplification & Approximation (High Weightage)', 'Number Series', 'Simple Data Interpretation', 'Basic Arithmetic (Averages, Ages, Ratios)'] },
      { subject: 'Reasoning Ability', topics: ['Floor & Linear Puzzles', 'Alphabet Series & Alpha-numeric sequences', 'Inequalities', 'Syllogism', 'Blood Relations & Direction'] },
      { subject: 'English Language', topics: ['Reading Comprehension (Story/Article based)', 'Fill in the blanks (Single & Double)', 'Spell Check & Word Usage', 'Error Spotting'] },
      { subject: 'Banking & Financial Awareness', topics: ['Basic Banking Terms', 'Headquarters of Banks & Taglines', 'Currency & Capital of Countries', 'Static GK (National Parks, Dams, Power plants)'] }
    ]
  },
  {
    id: 'sbi-clerk',
    name: 'SBI Clerk (Junior Associate)',
    fullName: 'State Bank of India Junior Associate (Customer Support & Sales)',
    category: 'BANKING',
    description: 'Direct recruitment for clerical operations, branch servicing, and retail banking support across all SBI branches.',
    totalMarks: 100,
    durationMinutes: 60,
    marksPerQuestion: 1,
    negativeMarks: 0.25,
    tier: 'Prelims & Mains',
    popular: false,
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    icon: 'UserCheck',
    subjects: ['Quantitative Aptitude', 'Reasoning Ability', 'English Language', 'Banking & Financial Awareness'],
    syllabus: [
      { subject: 'Quantitative Aptitude', topics: ['Simplification & Quadratic Equations', 'Data Interpretation (Bar/Table)', 'Arithmetic Basics'] },
      { subject: 'Reasoning Ability', topics: ['Box & Circle Puzzles', 'Alphanumeric sequences', 'Direction & Distance', 'Syllogisms'] },
      { subject: 'English Language', topics: ['Comprehension Passages', 'Sentence Correction', 'Vocabulary Synonyms', 'Cloze Test'] },
      { subject: 'Banking & Financial Awareness', topics: ['SBI Initiatives & YONO updates', 'Monetary Policy rates', 'Current national affairs', 'Banking terminology'] }
    ]
  },
  {
    id: 'rbi-grade-b',
    name: 'RBI Grade B',
    fullName: 'Reserve Bank of India Officers in Grade B (General)',
    category: 'BANKING',
    description: 'The pinnacle of central banking careers, formulating monetary policy, foreign exchange regulations, and financial oversight.',
    totalMarks: 200,
    durationMinutes: 120,
    marksPerQuestion: 1,
    negativeMarks: 0.25,
    tier: 'Phase 1 & Phase 2 (ESI + FM)',
    popular: true,
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    icon: 'Award',
    subjects: ['General Awareness & GK', 'Reasoning Ability', 'Quantitative Aptitude', 'English Language', 'Banking & Financial Awareness'],
    syllabus: [
      {
        subject: 'General Awareness & GK',
        topics: ['Economic & Social Issues (ESI)', 'Financial Management & Capital Markets', 'Union Budget, Economic Survey & NITI Aayog Reports', 'Global Financial Institutions (IMF, World Bank, BIS, ADB)', 'Regulatory Frameworks (SEBI, IRDAI, PFRDA)']
      },
      {
        subject: 'Reasoning Ability',
        topics: ['Complex Critical Reasoning', 'Advanced Matrix & Grid Puzzles', 'Machine Input-Output', 'Coded Syllogisms & Logic Gates']
      },
      {
        subject: 'Quantitative Aptitude',
        topics: ['Advanced DI & Data Sufficiency', 'Higher Arithmetic & Probability', 'Calculations & Time Speed Distance']
      },
      {
        subject: 'English Language',
        topics: ['Advanced Reading Comprehension', 'Essay & Precis writing fundamentals', 'Complex Sentence synthesis']
      }
    ]
  },

  // --- Defense & State PCS Category ---
  {
    id: 'defense-cds',
    name: 'CDS / NDA Exam',
    fullName: 'Combined Defence Services & National Defence Academy (UPSC)',
    category: 'DEFENSE',
    description: 'Direct entry into Indian Army (IMA/OTA), Navy (INA), and Air Force (AFA) as commissioned officers.',
    totalMarks: 100,
    durationMinutes: 120,
    marksPerQuestion: 1,
    negativeMarks: 0.33,
    tier: 'Written Exam & SSB Interview',
    popular: false,
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    icon: 'Target',
    subjects: ['General Awareness & GK', 'English Language', 'Quantitative Aptitude', 'General Science'],
    syllabus: [
      { subject: 'General Awareness & GK', topics: ['Indian History & Freedom Struggle', 'World & Indian Geography', 'Indian Constitution', 'Defense Exercises & Missile Systems'] },
      { subject: 'General Science', topics: ['Physics (Thermodynamics, Waves, Electricity)', 'Chemistry (Organic, Reactions)', 'Biology (Ecosystem, Human Body)'] },
      { subject: 'English Language', topics: ['Ordering of Sentences & Words', 'Idioms and Phrases', 'Synonyms/Antonyms', 'Fill in the blanks'] },
      { subject: 'Quantitative Aptitude', topics: ['Number Theory', 'Elementary Number Theory', 'Trigonometry & Heights', 'Geometry & Mensuration'] }
    ]
  },
  {
    id: 'state-pcs-prelims',
    name: 'State PCS / Civil Services',
    fullName: 'State Public Service Commission General Studies Prelims',
    category: 'STATE_PCS',
    description: 'Administrative Service exams for Deputy Collector, DSP, BDO, and Tehsildar posts across State Governments.',
    totalMarks: 150,
    durationMinutes: 120,
    marksPerQuestion: 1,
    negativeMarks: 0.33,
    tier: 'Prelims GS Paper 1 & 2',
    popular: false,
    badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    icon: 'BookOpen',
    subjects: ['General Awareness & GK', 'General Science', 'Reasoning Ability', 'Quantitative Aptitude'],
    syllabus: [
      { subject: 'General Awareness & GK', topics: ['State History, Culture & Geography', 'National Movement & Indian Polity', 'Indian Economy, Planning & Poverty Alleviation', 'General Issues on Environmental Ecology & Biodiversity'] },
      { subject: 'General Science', topics: ['Everyday Science & Technology Applications', 'Nutrition, Health & Diseases', 'Scientific Discoveries & Space Tech'] },
      { subject: 'Reasoning Ability', topics: ['Logical Reasoning & Analytical Ability', 'Decision Making & Problem Solving', 'Interpersonal Skills'] },
      { subject: 'Quantitative Aptitude', topics: ['Basic Numeracy (Numbers and their relations, Orders of magnitude)', 'Data Interpretation (Charts, graphs, tables)'] }
    ]
  }
];

export const CATEGORIES_LIST: { id: ExamCategory; label: string; count: number; icon: string; description: string }[] = [
  { id: 'SSC', label: 'Staff Selection (SSC)', count: 4, icon: 'Award', description: 'CGL, CHSL, CPO, MTS & Stenographer' },
  { id: 'RAILWAY', label: 'Railway (RRB)', count: 3, icon: 'Train', description: 'NTPC, Group D, ALP & Technician' },
  { id: 'BANKING', label: 'Banking & Insurance', count: 5, icon: 'Landmark', description: 'IBPS PO/Clerk, SBI PO/Clerk, RBI Grade B' },
  { id: 'DEFENSE', label: 'Defense & Police', count: 1, icon: 'Shield', description: 'CDS, NDA, CAPF, Delhi Police' },
  { id: 'STATE_PCS', label: 'State PSC / PCS', count: 1, icon: 'BookOpen', description: 'BPSC, UPPSC, MPSC, RAS State Prelims' },
];

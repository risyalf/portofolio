export type Job = {
  title: string;
  company: string;
  dates: string;
  location?: string;
  type?: string;
  stack: string[];
  description: string[];
  highlights?: string;
};

export const jobs: Job[] = [
  {
    title: 'IT Staff & Backend Engineer',
    company: 'PT. Apparel One Indonesia',
    dates: '01/2024 — Present',
    location: 'Semarang, Indonesia',
    type: 'Full-time',
    stack: ['PHP 8.2+', 'Laravel', 'PostgreSQL', 'RESTful APIs', 'Redis', 'WMS'],
    highlights: 'Spearheaded critical WMS & WPO integration pipeline handling enterprise supply chain data.',
    description: [
      'Engineered and scaled core modules for enterprise Warehouse Management System (WMS), streamlining inventory flow and warehouse logistics.',
      'Designed and deployed secure REST APIs for external supplier integrations within the WPO (Web Purchase Order) ecosystem, ensuring seamless vendor synchronizations.',
      'Optimized heavy PostgreSQL queries and transaction flows, reducing database lock contention and accelerating batch inventory reporting.',
      'Automated recurring operational workflows, eliminating repetitive manual data reconciliation and significantly reducing human input errors.',
      'Proactively monitored microservices and scheduled jobs to sustain high system availability and rapid incident recovery.',
    ],
  },
  {
    title: 'Junior Game Programmer',
    company: 'Digital Breeze Interactive',
    dates: '08/2022 — 10/2023',
    location: 'Yogyakarta, Indonesia',
    type: 'Full-time',
    stack: ['C#', 'Unity', 'SOLID Principles', 'Object-Oriented Design', 'Profiling'],
    highlights: 'Delivered commercial game titles with strict performance and memory budgets.',
    description: [
      'Developed modular, maintainable game features utilizing clean OOP architecture and SOLID principles.',
      'Profiled frame-rates, garbage collection spikes, and CPU bottlenecks using Unity Profiler to ensure consistent 60 FPS gameplay.',
      'Authored rigorous test scenarios and edge-case handling to eliminate critical release bugs prior to client milestones.',
      'Collaborated in cross-functional sprints alongside technical artists and game designers to ship releases on schedule.',
    ],
  },
  {
    title: 'Technical ERP Specialist',
    company: 'PT. Bina Busana Internusa',
    dates: '12/2020 — 07/2022',
    location: 'Semarang, Indonesia',
    type: 'Full-time',
    stack: ['Java', 'iDempiere ERP', 'PostgreSQL', 'SQL Optimization', 'System Integration'],
    highlights: 'Maintained and customized core apparel manufacturing ERP system supporting hundreds of active users.',
    description: [
      'Customized and maintained iDempiere ERP business logic, creating specialized modules tailored for manufacturing workflows.',
      'Integrated ERP database tables with cross-departmental platforms to eliminate data silos and standardize business metrics.',
      'Analyzed and fine-tuned complex SQL queries and relational schemas, reducing load times for high-volume financial and production reports.',
      'Provided tier-3 technical troubleshooting and developer support, debugging data mismatches and ensuring zero financial record drift.',
    ],
  },
];

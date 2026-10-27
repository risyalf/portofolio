import React from 'react';
import { Database, Server, Layout, Cpu, CheckCircle2, MapPin, Globe, Sparkles } from 'lucide-react';
import { heroData } from '@/data/heroData';

const About: React.FC = () => {
  const skillGroups = [
    {
      category: 'Backend & Systems',
      icon: Server,
      skills: ['PHP 8.3', 'Laravel 11', 'Node.js', 'RESTful APIs', 'Redis & Queues', 'Microservices'],
    },
    {
      category: 'Database & Performance',
      icon: Database,
      skills: ['PostgreSQL', 'MySQL', 'Query Optimization', 'Index Tuning', 'Data Modeling', 'Transactions'],
    },
    {
      category: 'Frontend & UI',
      icon: Layout,
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Bootstrap', 'Responsive Design'],
    },
    {
      category: 'Architecture & DevOps',
      icon: Cpu,
      skills: ['Clean Architecture', 'SOLID Principles', 'Docker', 'Git & CI/CD', 'iDempiere ERP', 'Unity / C#'],
    },
  ];

  const highlights = [
    '4+ years solving enterprise operational bottlenecks across WMS, ERP, and SaaS platforms',
    'Deep expertise in Laravel query tuning, asynchronous background jobs, and API integrations',
    'Proven track record delivering 30+ production systems on-schedule and defect-free',
    'Comfortable operating as a solo lead developer or collaborating in cross-functional sprint teams',
  ];

  return (
    <section id="about" className="section-gap bg-[hsl(var(--bg-elevated))]/40 border-y border-[hsl(var(--border))]" aria-labelledby="about-heading">
      <div className="container-wide">

        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="tag-pill mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Profile & Background</span>
          </div>
          <h2 id="about-heading" className="text-display text-2xl sm:text-4xl text-[hsl(var(--fg))]">
            Bridging Business Demands with Resilient Engineering
          </h2>
          <p className="text-body text-[hsl(var(--fg-muted))] mt-3 text-base sm:text-lg">
            Dedicated software engineer passionate about clean code, scalable architecture, and measurable performance improvements.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Left Column: Photo & Key Facts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--bg-elevated))] shadow-md">
              <picture>
                <source type="image/webp" srcSet="/risyal-400.webp 400w, /risyal.webp 600w" sizes="(max-width: 640px) 400px, 600px" />
                <img
                  src="/risyal.webp"
                  alt="Risyal Febrianto"
                  className="w-full aspect-[4/3] sm:aspect-square object-cover object-top hover:scale-[1.02] transition-transform duration-300"
                  width={500}
                  height={500}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <div className="p-5 space-y-3 border-t border-[hsl(var(--border))] bg-[hsl(var(--bg-elevated))]">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-display font-bold text-[hsl(var(--fg))]">{heroData.name}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[hsl(var(--accent))/0.15] text-[hsl(var(--accent))] font-medium">
                    Backend & Full-Stack
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-[hsl(var(--fg-muted))]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[hsl(var(--accent))]" />
                    <span>Indonesia (WIB / GMT+7)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Remote Ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Value Proposition Highlights */}
            <div className="card-base p-6 space-y-3.5">
              <h3 className="font-display font-semibold text-sm text-[hsl(var(--fg))] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Why Recruiters & Clients Rely on Me:</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[hsl(var(--fg-muted))]">
                {highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))] mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Narrative & Technical Capabilities */}
          <div className="lg:col-span-7 space-y-8">

            {/* Bio Narrative */}
            <div className="space-y-4 text-body text-[hsl(var(--fg-muted))] text-sm sm:text-base leading-relaxed">
              <p>
                Over the past 4+ years, I have engineered systems ranging from enterprise <strong className="text-[hsl(var(--fg))] font-semibold">Warehouse Management Systems (WMS)</strong> and apparel manufacturing ERP platforms to high-conversion SaaS web applications. My core strength lies in unraveling complex business workflows and translating them into robust, maintainable backend services.
              </p>
              <p>
                In the <strong className="text-[hsl(var(--fg))] font-semibold">Laravel & PHP ecosystem</strong>, I prioritize clean architectural patterns (Domain-driven boundaries, Service-Repository, pipeline designs) alongside rigorous query optimization in PostgreSQL and MySQL. I prevent performance bottlenecks before they reach production.
              </p>
              <p>
                On the frontend, I utilize <strong className="text-[hsl(var(--fg))] font-semibold">React, TypeScript, and Tailwind CSS</strong> to build responsive, intuitive user interfaces that allow operators and business users to perform their daily tasks effortlessly.
              </p>
            </div>

            {/* Categorized Skills */}
            <div className="space-y-4 pt-2">
              <h3 className="font-display font-bold text-lg text-[hsl(var(--fg))]">
                Technical Stack & Core Competencies
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {skillGroups.map((group) => {
                  const Icon = group.icon;
                  return (
                    <div
                      key={group.category}
                      className="card-base p-5 space-y-3"
                    >
                      <div className="flex items-center gap-2.5 text-sm font-display font-semibold text-[hsl(var(--fg))]">
                        <div className="p-1.5 rounded-lg bg-[hsl(var(--accent))/0.1] text-[hsl(var(--accent))]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span>{group.category}</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {group.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 text-xs rounded-md bg-[hsl(var(--bg))] border border-[hsl(var(--border))] text-[hsl(var(--fg-muted))] hover:text-[hsl(var(--fg))] hover:border-[hsl(var(--accent)/0.4)] transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default About;

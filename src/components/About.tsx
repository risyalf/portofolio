import React from 'react';
import { heroData } from '@/data/heroData';
import { cn } from '@/lib/utils';

const About = () => {
  const skills = heroData.skills;

  // Group skills by category for better presentation
  const skillCategories = [
    { category: 'Backend', skills: ['PHP', 'Laravel', 'Node.js', 'API Development'] },
    { category: 'Frontend', skills: ['JavaScript', 'React', 'TypeScript', 'Tailwind CSS', 'Bootstrap'] },
    { category: 'Database', skills: ['PostgreSQL', 'MySQL'] },
  ];

  return (
    <section id="about" className="section-gap" aria-labelledby="about-heading">
      <div className="container-wide">
        <header className="mb-12 max-w-2xl">
          <h2 id="about-heading" className="text-heading text-heading-xl">
            About
          </h2>
        </header>

        <div className="grid lg:grid-cols-[180px_1fr] gap-10 lg:gap-16 items-start">
          {/* Photo Column */}
          <aside className="lg:sticky lg:top-24 shrink-0">
            <figure className="relative">
              <div className="relative aspect-square max-w-xs mx-auto lg:mx-0">
                {/* Outer accent border */}
                <div className="absolute inset-0 rounded-full border-2 border-[hsl(var(--accent))] opacity-50" aria-hidden="true" />
                {/* Inner border */}
                <div className="absolute inset-1 rounded-full border border-[hsl(var(--border))]" aria-hidden="true" />
                {/* Image */}
                <img
                  src={heroData.profilePicture}
                  alt="Risyal Febrianto"
                  className="relative rounded-full w-full h-full object-cover border border-[hsl(var(--bg))]"
                  width={320}
                  height={320}
                />
                {/* Subtle accent accent dot */}
                <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-[hsl(var(--accent))] border-4 border-[hsl(var(--bg))]" aria-hidden="true" />
              </div>
              <figcaption className="text-center mt-4 text-small text-[hsl(var(--fg-muted))]">
                Full-Stack Developer
              </figcaption>
            </figure>
          </aside>

          {/* Content Column */}
          <div className="space-y-10">
            {/* Narrative */}
            <div className="prose prose-invert max-w-none" style={{ '--tw-prose-body': 'hsl(var(--fg-muted))', '--tw-prose-headings': 'hsl(var(--fg))' }}>
              <p className="text-body-lg text-[hsl(var(--fg))] mb-6">
                I build scalable web applications and transform raw data into meaningful insights that drive business success.
              </p>
              <p className="text-body text-[hsl(var(--fg-muted))] mb-6">
                With a strong foundation in both backend and frontend development, I specialize in the Laravel and React ecosystems. I enjoy solving complex architectural challenges, optimizing database performance, and crafting clean, maintainable code that stands the test of time.
              </p>
              <p className="text-body text-[hsl(var(--fg-muted))]">
                Currently focused on building robust enterprise systems and exploring the intersection of developer experience and application performance.
              </p>
            </div>

            {/* Skills as "installed packages" */}
            <div>
              <h3 className="text-heading text-lg text-[hsl(var(--fg-muted))] mb-6 flex items-center gap-3">
                <span className="text-mono-xs text-[hsl(var(--accent))]">$</span>
                <span className="text-mono-xs">npm list --depth=0</span>
              </h3>
              <div className="space-y-6">
                {skillCategories.map((group, groupIndex) => (
                  <div key={group.category} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[hsl(var(--fg-subtle))] text-mono uppercase tracking-wider">
                        {group.category}
                      </span>
                      <div className="h-px flex-1 bg-[hsl(var(--border))]" aria-hidden="true" />
                    </div>
                    <div className="flex flex-wrap gap-2 ml-6" role="list" aria-label={`${group.category} skills`}>
                      {group.skills.map((skill, skillIndex) => (
                        <span
                          key={`${group.category}-${skill}`}
                          className="tag-mono"
                          role="listitem"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[hsl(var(--border))]">
              <div className="text-center">
                <div className="text-display text-2xl text-[hsl(var(--accent))] font-mono">5+</div>
                <div className="text-xs text-[hsl(var(--fg-muted))] mt-1">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-display text-2xl text-[hsl(var(--accent))] font-mono">30+</div>
                <div className="text-xs text-[hsl(var(--fg-muted))] mt-1">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-display text-2xl text-[hsl(var(--accent))] font-mono">10+</div>
                <div className="text-xs text-[hsl(var(--fg-muted))] mt-1">Tech Stack</div>
              </div>
              <div className="text-center">
                <div className="text-display text-2xl text-[hsl(var(--accent))] font-mono">100%</div>
                <div className="text-xs text-[hsl(var(--fg-muted))] mt-1">Remote Ready</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
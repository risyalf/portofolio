import React from 'react';
import { Briefcase, Calendar, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { jobs } from '@/data/experienceData';

const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="section-gap" aria-labelledby="experience-heading">
      <div className="container-wide">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="tag-pill mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career History</span>
          </div>
          <h2 id="experience-heading" className="text-display text-2xl sm:text-4xl text-[hsl(var(--fg))]">
            Professional Experience & Proven Impact
          </h2>
          <p className="text-body text-[hsl(var(--fg-muted))] mt-3 text-base sm:text-lg">
            Track record of designing, scaling, and maintaining mission-critical enterprise applications in fast-paced production environments.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-[hsl(var(--border))] ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-12" role="list">
          {jobs.map((job, index) => (
            <article
              key={index}
              className="relative card-base p-6 sm:p-8 hover:border-[hsl(var(--accent)/0.5)] transition-all"
              role="listitem"
            >
              {/* Timeline Node Dot */}
              <div
                className="absolute -left-[31px] sm:-left-[47px] top-7 w-4 h-4 rounded-full bg-[hsl(var(--bg))] border-2 border-[hsl(var(--accent))] flex items-center justify-center shadow-sm"
                aria-hidden="true"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))]" />
              </div>

              {/* Role Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 pb-4 border-b border-[hsl(var(--border))]">
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[hsl(var(--fg))]">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-[hsl(var(--fg-muted))]">
                    <span className="text-[hsl(var(--accent))] font-semibold">{job.company}</span>
                    {job.location && (
                      <span className="flex items-center gap-1 text-xs">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </span>
                    )}
                    {job.type && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--bg))] border border-[hsl(var(--border))]">
                        {job.type}
                      </span>
                    )}
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[hsl(var(--bg))] border border-[hsl(var(--border))] text-[hsl(var(--fg-muted))] shrink-0 self-start">
                  <Calendar className="w-3.5 h-3.5 text-[hsl(var(--accent))]" />
                  <span>{job.dates}</span>
                </div>
              </div>

              {/* Key Highlight Banner if available */}
              {job.highlights && (
                <div className="mt-4 p-3.5 rounded-lg bg-[hsl(var(--accent))/0.08] border border-[hsl(var(--accent))/0.2] flex items-start gap-2.5 text-xs sm:text-sm text-[hsl(var(--fg))]">
                  <Sparkles className="w-4 h-4 text-[hsl(var(--accent))] shrink-0 mt-0.5" />
                  <span className="font-medium">{job.highlights}</span>
                </div>
              )}

              {/* Responsibilities & Achievements */}
              <ul className="mt-5 space-y-2.5" role="list">
                {job.description.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[hsl(var(--fg-muted))] leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies Applied */}
              {job.stack && job.stack.length > 0 && (
                <div className="mt-6 pt-4 border-t border-[hsl(var(--border))] flex flex-wrap items-center gap-1.5">
                  <span className="text-xs text-[hsl(var(--fg-subtle))] font-mono mr-2">Technologies:</span>
                  {job.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-xs font-mono bg-[hsl(var(--bg))] border border-[hsl(var(--border))] text-[hsl(var(--fg-muted))]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;

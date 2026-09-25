import React from 'react';
import { jobs } from '@/data/experienceData';

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-gap" aria-labelledby="experience-heading">
      <div className="container-narrow">
        <header className="mb-12">
          <h2 id="experience-heading" className="text-heading text-heading-xl">
            Experience
          </h2>
        </header>

        <div className="space-y-10" role="list">
          {jobs.map((job, index) => (
            <article key={index} className="card-base p-6" role="listitem">
              <header className="mb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <h3 className="text-heading text-lg">
                    {job.title}
                  </h3>
                  <p className="text-body text-[hsl(var(--fg-muted))] mt-1">
                    {job.company}
                  </p>
                </div>
                <time
                  className="text-mono-xs text-[hsl(var(--fg-muted))] whitespace-nowrap flex-shrink-0"
                  dateTime={job.dates.split(' - ')[0]}
                >
                  {job.dates}
                </time>
              </header>

              <ul className="space-y-2.5" role="list">
                {job.description.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="text-body text-[hsl(var(--fg-muted))] relative pl-4 before:absolute before:left-0 before:top-[0.55rem] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[hsl(var(--fg-subtle))]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
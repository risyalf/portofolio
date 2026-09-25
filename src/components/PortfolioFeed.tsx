import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import { projects, type Project } from '@/data/portfolioData';

const ProjectCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length <= 1) {
    return (
      <div className="aspect-video rounded-t-lg overflow-hidden bg-[hsl(var(--border))]">
        <img
          src={images[0]}
          alt="Project screenshot"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video rounded-t-lg overflow-hidden bg-[hsl(var(--border))]">
      <div className="absolute inset-0 transition-opacity duration-300" style={{ opacity: currentIndex === 0 ? 1 : 0 }}>
        <img
          src={images[0]}
          alt="Project screenshot 1"
          className="h-full w-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="absolute inset-0 transition-opacity duration-300" style={{ opacity: currentIndex === 1 ? 1 : 0 }}>
          <img
            src={images[1]}
            alt="Project screenshot 2"
            className="h-full w-full object-cover"
          />
        </div>
      )}
      {images.length > 2 && (
        <div className="absolute inset-0 transition-opacity duration-300" style={{ opacity: currentIndex === 2 ? 1 : 0 }}>
          <img
            src={images[2]}
            alt="Project screenshot 3"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Navigation */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[hsl(var(--bg-elevated))] border border-[hsl(var(--border))] hover:border-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--bg))] text-[hsl(var(--fg-muted))] transition-all"
        aria-label="Previous screenshot"
      >
        <ChevronUp className="h-5 w-5 rotate-90" aria-hidden="true" />
      </button>
      <button
        onClick={() => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[hsl(var(--bg-elevated))] border border-[hsl(var(--border))] hover:border-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--bg))] text-[hsl(var(--fg-muted))] transition-all"
        aria-label="Next screenshot"
      >
        <ChevronUp className="h-5 w-5 -rotate-90" aria-hidden="true" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentIndex
                ? "bg-[hsl(var(--accent))] w-6"
                : "bg-[hsl(var(--fg-muted))] hover:bg-[hsl(var(--accent))]"
            )}
            aria-label={`Go to screenshot ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (detailsRef.current) {
      setContentHeight(detailsRef.current.scrollHeight);
    }
  }, [isExpanded]);

  return (
    <article className="card-base overflow-hidden" role="listitem">
      {/* Thumbnail */}
      <div className="relative">
        <ProjectCarousel images={project.images} />
      </div>

      <div className="p-6 space-y-6">
        <header>
          <h3 className="text-heading text-xl mb-2">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="link-base hover:no-underline"
            >
              {project.title}
            </a>
          </h3>
          <p className="text-body text-[hsl(var(--fg-muted))]">
            {project.summary}
          </p>
        </header>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-mono" role="listitem">
              {tag}
            </span>
          ))}
        </div>

        {/* Expandable Details */}
        <div
          ref={detailsRef}
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          )}
          style={{ maxHeight: isExpanded ? `${contentHeight}px` : '0' }}
        >
          <div className="pt-4 border-t border-[hsl(var(--border))] space-y-6" id={`project-details-${project.id}`}>
            <div className="space-y-2">
              <h4 className="text-heading text-sm font-semibold text-[hsl(var(--fg))]">Challenge</h4>
              <p className="text-body text-[hsl(var(--fg-muted))]">{project.details.challenge}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-heading text-sm font-semibold text-[hsl(var(--fg))]">Solution</h4>
              <p className="text-body text-[hsl(var(--fg-muted))]">{project.details.solution}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-heading text-sm font-semibold text-[hsl(var(--fg))]">Impact</h4>
              <ul className="space-y-1.5 pl-4" role="list">
                {project.details.impact.map((item, index) => (
                  <li key={index} className="text-body text-[hsl(var(--fg-muted))] relative before:absolute before:left-[-1rem] before:top-[0.6rem] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[hsl(var(--accent))]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {(project.externalLink || project.link) && (
              <div className="flex flex-wrap gap-3 pt-2 border-t border-[hsl(var(--border))]">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2 text-sm"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Live Demo
                </a>
                {project.externalLink && (
                  <a
                    href={project.externalLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center gap-2 text-sm"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    {project.externalLink.title}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn-ghost w-full justify-start py-3 text-left"
          aria-expanded={isExpanded}
          aria-controls={`project-details-${project.id}`}
        >
          <span className="flex items-center gap-2">
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" aria-hidden="true" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
                See Details
              </>
            )}
          </span>
        </button>
      </div>
    </article>
  );
};

const PortfolioFeed = () => {
  return (
    <section id="projects" className="section-gap bg-[hsl(var(--bg-elevated))]" aria-labelledby="projects-heading">
      <div className="container-narrow">
        <header className="mb-12">
          <h2 id="projects-heading" className="text-heading text-heading-xl">
            Projects
          </h2>
          <p className="text-body text-[hsl(var(--fg-muted))] mt-3 max-w-xl">
            Selected work across enterprise systems, e-commerce, and interactive applications.
          </p>
        </header>

        <div className="space-y-6" role="list">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioFeed;
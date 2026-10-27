import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Github, FolderGit2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { projects, type Project } from '@/data/portfolioData';

const ProjectCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="aspect-video w-full overflow-hidden bg-[hsl(var(--bg))] border-b border-[hsl(var(--border))]">
        <img
          src={images[0]}
          alt="Project screenshot"
          className="h-full w-full object-cover object-top hover:scale-[1.02] transition-transform duration-300"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-[hsl(var(--bg))] border-b border-[hsl(var(--border))]">
      {images.map((img, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-300 ease-in-out"
          style={{ opacity: currentIndex === idx ? 1 : 0, pointerEvents: currentIndex === idx ? 'auto' : 'none' }}
        >
          <img
            src={img}
            alt={`Screenshot ${idx + 1}`}
            className="h-full w-full object-cover object-top"
            loading="lazy"
          />
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[hsl(var(--bg-elevated))]/90 backdrop-blur border border-[hsl(var(--border))] text-[hsl(var(--fg-muted))] hover:text-[hsl(var(--fg))] hover:border-[hsl(var(--accent))] transition-all shadow-md"
        aria-label="Previous screenshot"
      >
        <ChevronUp className="h-4 w-4 -rotate-90" aria-hidden="true" />
      </button>
      <button
        onClick={() => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[hsl(var(--bg-elevated))]/90 backdrop-blur border border-[hsl(var(--border))] text-[hsl(var(--fg-muted))] hover:text-[hsl(var(--fg))] hover:border-[hsl(var(--accent))] transition-all shadow-md"
        aria-label="Next screenshot"
      >
        <ChevronUp className="h-4 w-4 rotate-90" aria-hidden="true" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 px-2 py-1 rounded-full bg-[hsl(var(--bg))]/75 backdrop-blur border border-[hsl(var(--border))]">
        {images.slice(0, 7).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentIndex
                ? "bg-[hsl(var(--accent))] w-5"
                : "bg-[hsl(var(--fg-muted))]/50 hover:bg-[hsl(var(--accent))]"
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
    <article className="card-base overflow-hidden flex flex-col justify-between" role="listitem">
      {/* Thumbnail */}
      <ProjectCarousel images={project.images} />

      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          
          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5" role="list" aria-label="Technologies used">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-mono" role="listitem">
                {tag}
              </span>
            ))}
          </div>

          {/* Title & Summary */}
          <div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[hsl(var(--fg))] mb-2 hover:text-[hsl(var(--accent))] transition-colors">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5"
              >
                <span>{project.title}</span>
                <ExternalLink className="w-4 h-4 text-[hsl(var(--fg-muted))]" />
              </a>
            </h3>
            <p className="text-body text-sm text-[hsl(var(--fg-muted))] leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Expandable Case Study Details */}
          <div
            ref={detailsRef}
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              isExpanded ? 'opacity-100' : 'max-h-0 opacity-0'
            )}
            style={{ maxHeight: isExpanded ? `${contentHeight + 40}px` : '0' }}
          >
            <div className="pt-4 border-t border-[hsl(var(--border))] space-y-5 text-sm" id={`project-details-${project.id}`}>
              <div className="space-y-1.5">
                <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-[hsl(var(--fg-muted))]">
                  The Challenge
                </h4>
                <p className="text-[hsl(var(--fg))] text-xs sm:text-sm leading-relaxed">
                  {project.details.challenge}
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-[hsl(var(--fg-muted))]">
                  The Engineering Solution
                </h4>
                <p className="text-[hsl(var(--fg))] text-xs sm:text-sm leading-relaxed">
                  {project.details.solution}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-[hsl(var(--fg-muted))]">
                  Measurable Impact
                </h4>
                <ul className="space-y-1.5 pl-1" role="list">
                  {project.details.impact.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-[hsl(var(--fg-muted))]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {(project.externalLink || project.link) && (
                <div className="flex flex-wrap gap-3 pt-3 border-t border-[hsl(var(--border))]">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-xs py-2 px-3.5 flex items-center gap-1.5"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Live Preview</span>
                  </a>
                  {project.externalLink && (
                    <a
                      href={project.externalLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-xs py-2 px-3.5 flex items-center gap-1.5"
                    >
                      <Github className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{project.externalLink.title}</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Expand / Collapse Button */}
        <div className="pt-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between py-2.5 px-3.5 rounded-lg bg-[hsl(var(--bg))] border border-[hsl(var(--border))] hover:border-[hsl(var(--accent)/0.5)] text-xs font-medium text-[hsl(var(--fg))] transition-all"
            aria-expanded={isExpanded}
            aria-controls={`project-details-${project.id}`}
          >
            <span>{isExpanded ? 'Hide Architecture Case Study' : 'View Architecture & Impact'}</span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-[hsl(var(--accent))]" />
            ) : (
              <ChevronDown className="h-4 w-4 text-[hsl(var(--fg-muted))]" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

const PortfolioFeed = () => {
  return (
    <section id="projects" className="section-gap" aria-labelledby="projects-heading">
      <div className="container-wide">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="tag-pill mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Works</span>
          </div>
          <h2 id="projects-heading" className="text-display text-2xl sm:text-4xl text-[hsl(var(--fg))]">
            Production Systems & Case Studies
          </h2>
          <p className="text-body text-[hsl(var(--fg-muted))] mt-3 text-base sm:text-lg">
            Selected applications demonstrating full lifecycle engineering, operational automation, and user-centric web platforms.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-8" role="list">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioFeed;

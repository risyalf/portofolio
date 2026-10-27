import React from 'react';
import { ArrowRight, Mail, Linkedin, Github, Download } from 'lucide-react';
import { heroData } from '@/data/heroData';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden" aria-label="Introduction">
      {/* Background radial gradient decoration */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[hsl(var(--accent)/0.08)] blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container-wide">
        <div className="max-w-4xl mx-auto text-center space-y-8">

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[hsl(var(--bg-elevated))] border border-[hsl(var(--border))] shadow-sm text-xs font-medium text-[hsl(var(--fg-muted))] hover:border-[hsl(var(--accent)/0.4)] transition-all">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-display text-[hsl(var(--fg))]">Available for Full-time & High-Impact Contracts</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-display text-3xl sm:text-5xl md:text-6xl text-[hsl(var(--fg))] tracking-tight">
              Architecting <span className="gradient-text">High-Throughput</span> Backends & Resilient Web Systems
            </h1>

            <p className="text-body text-base sm:text-lg md:text-xl text-[hsl(var(--fg-muted))] max-w-2xl mx-auto leading-relaxed">
              Hi, I'm <strong className="text-[hsl(var(--fg))] font-semibold">Risyal Febrianto</strong> — a Full-Stack Engineer with 4+ years of production experience specializing in <span className="text-[hsl(var(--accent))] font-medium">Laravel</span>, <span className="text-[hsl(var(--accent))] font-medium">PHP 8.3</span>, and data-intensive enterprise architectures.
            </p>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <a
              href="#projects"
              className="btn-primary group"
              aria-label="View featured projects"
            >
              <span>Explore Projects</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={heroData.contact.resume}
              download="RISYAL_FEBRIANTO_RESUME.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              aria-label="Download Resume"
            >
              {/* ponytail: static resume file download link; add download analytics or preview modal if requested */}
              <Download className="mr-2 h-4 w-4 text-[hsl(var(--accent))]" />
              <span>Download Resume</span>
            </a>

            <a
              href={`mailto:${heroData.contact.email}`}
              className="btn-secondary"
              aria-label="Send direct email"
            >
              <Mail className="mr-2 h-4 w-4 text-[hsl(var(--accent))]" />
              <span>Let's Connect</span>
            </a>

            <a
              href={heroData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              aria-label="View LinkedIn profile"
            >
              <Linkedin className="mr-2 h-4 w-4" />
              <span>LinkedIn</span>
            </a>

            <a
              href={heroData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              aria-label="View GitHub profile"
            >
              <Github className="mr-2 h-4 w-4" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Quick Metrics Bar for Recruiters */}
          <div className="pt-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-[hsl(var(--bg-elevated))] border border-[hsl(var(--border))] shadow-sm text-left">
              {heroData.metrics.map((metric, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="font-display font-extrabold text-2xl sm:text-3xl text-[hsl(var(--fg))] tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-xs text-[hsl(var(--fg-muted))] font-medium">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Core Tech Strip */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-[hsl(var(--fg-subtle))] font-mono mr-2">Core Tech:</span>
            {heroData.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-[hsl(var(--bg-elevated))] border border-[hsl(var(--border))] text-[hsl(var(--fg-muted))] hover:text-[hsl(var(--fg))] hover:border-[hsl(var(--accent)/0.5)] transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { heroData } from '@/data/heroData';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--bg-elevated))] py-12 px-4" role="contentinfo">
      <div className="container-wide">
        <div className="grid md:grid-cols-12 gap-8 pb-10 border-b border-[hsl(var(--border))]">
          
          {/* Brand & Summary */}
          <div className="md:col-span-6 space-y-3">
            <a href="/" className="font-display font-bold text-lg tracking-tight text-[hsl(var(--fg))]">
              Risyal Febrianto<span className="text-[hsl(var(--accent))]">.</span>
            </a>
            <p className="text-body text-xs sm:text-sm text-[hsl(var(--fg-muted))] max-w-sm leading-relaxed">
              Full-Stack Developer & Laravel Backend Engineer specializing in resilient systems, PostgreSQL optimization, and high-performance web applications.
            </p>
            <div className="pt-2 text-xs font-mono text-[hsl(var(--fg-muted))]">
              <span>Status: </span>
              <span className="text-emerald-400 font-semibold">Available for Opportunities</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-[hsl(var(--fg))]">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs text-[hsl(var(--fg-muted))]">
              <li>
                <a href="/#about" className="hover:text-[hsl(var(--fg))] transition-colors">About Background</a>
              </li>
              <li>
                <a href="/#experience" className="hover:text-[hsl(var(--fg))] transition-colors">Career Experience</a>
              </li>
              <li>
                <a href="/#projects" className="hover:text-[hsl(var(--fg))] transition-colors">Featured Projects</a>
              </li>
              <li>
                <a href="/#blog" className="hover:text-[hsl(var(--accent))] transition-colors">Laravel Engineering Lab</a>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-[hsl(var(--fg))]">
              Get in Touch
            </h4>
            <div className="flex items-center gap-2">
              <a
                href={heroData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[hsl(var(--bg))] border border-[hsl(var(--border))] text-[hsl(var(--fg-muted))] hover:text-[hsl(var(--accent))] hover:border-[hsl(var(--accent)/0.5)] transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={heroData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[hsl(var(--bg))] border border-[hsl(var(--border))] text-[hsl(var(--fg-muted))] hover:text-[hsl(var(--accent))] hover:border-[hsl(var(--accent)/0.5)] transition-all"
                aria-label="GitHub Profile"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${heroData.contact.email}`}
                className="p-2 rounded-lg bg-[hsl(var(--bg))] border border-[hsl(var(--border))] text-[hsl(var(--fg-muted))] hover:text-[hsl(var(--accent))] hover:border-[hsl(var(--accent)/0.5)] transition-all"
                aria-label="Email Address"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <p className="text-xs text-[hsl(var(--fg-muted))] pt-1">
              risyalfebrianto97@gmail.com
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[hsl(var(--fg-muted))]">
          <div>
            &copy; {new Date().getFullYear()} Risyal Febrianto. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[hsl(var(--fg))] transition-colors"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

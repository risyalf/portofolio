import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { footerData } from '@/data/footerData';

const Footer = () => {
  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--bg-elevated))] px-4 py-10" role="contentinfo">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-xs text-[hsl(var(--fg-subtle))]">
            2025 &copy; Risyal Febrianto
          </p>

          <nav className="flex items-center gap-4" aria-label="Social links">
            {footerData.socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--fg-muted))] hover:text-[hsl(var(--accent))] transition-colors p-2 rounded-lg hover:bg-[hsl(var(--bg-hover))]"
                aria-label={link.name}
              >
                {link.icon === 'Github' && <Github className="h-5 w-5" aria-hidden="true" />}
                {link.icon === 'Linkedin' && <Linkedin className="h-5 w-5" aria-hidden="true" />}
                {link.icon === 'Mail' && <Mail className="h-5 w-5" aria-hidden="true" />}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
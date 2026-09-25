import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { heroData } from '@/data/heroData';
import { cn } from '@/lib/utils';

const Hero = () => {
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const commands = [
    { prompt: '$ whoami', output: 'Risyal Febrianto' },
    { prompt: '$ cat role.txt', output: 'Full-Stack Developer' },
  ];

  useEffect(() => {
    // Blinking cursor
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    // Typing animation sequence
    const runTyping = async () => {
      setIsTyping(true);
      for (let i = 0; i < commands.length; i++) {
        const cmd = commands[i];
        
        // Type the prompt
        await typeText(cmd.prompt, i * 2);
        await sleep(300);
        
        // Type the output
        await typeText(cmd.output, i * 2 + 1);
        await sleep(500);
        
        // Add to typed lines
        setTypedLines(prev => [...prev, cmd.prompt, cmd.output]);
      }
      setIsTyping(false);
    };

    const typeText = (text: string, lineIndex: number) => {
      return new Promise<void>(resolve => {
        let charIndex = 0;
        const charInterval = setInterval(() => {
          if (charIndex < text.length) {
            setTypedLines(prev => {
              const newLines = [...prev];
              if (newLines.length > lineIndex) {
                newLines[lineIndex] = text.slice(0, charIndex + 1);
              } else {
                newLines.push(text.slice(0, charIndex + 1));
              }
              return newLines;
            });
            charIndex++;
          } else {
            clearInterval(charInterval);
            resolve();
          }
        }, 40); // typing speed
      });
    };

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    runTyping();

    return () => {
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <header className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-16">
      <div className="container-narrow">
        {/* Terminal Frame */}
        <div className="terminal-frame max-w-2xl mx-auto" role="region" aria-label="Terminal introduction">
          <div className="terminal-content font-mono text-sm" style={{ lineHeight: '1.8' }}>
            <div className="space-y-3">
              {typedLines.map((line, index) => (
                <div key={index} className="flex items-baseline gap-3">
                  <span className="text-[hsl(var(--fg-muted))] whitespace-nowrap">
                    {line.startsWith('$') ? line : ''}
                  </span>
                  <span 
                    className={cn(
                      "whitespace-pre-wrap",
                      line.startsWith('$') ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--fg))] font-medium'
                    )}
                  >
                    {line.startsWith('$') ? '' : line}
                    {index === typedLines.length - 1 && isTyping && showCursor && (
                      <span className="animate-blink ml-0.5" aria-hidden="true">█</span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            {/* Action buttons after typing completes */}
            {!isTyping && (
              <div className="mt-8 pt-6 border-t border-[hsl(var(--border))] flex flex-wrap items-center gap-4">
                <a
                  href={heroData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                  aria-label="View LinkedIn profile"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  LinkedIn
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a
                  href={`mailto:${heroData.contact.email}`}
                  className="btn-secondary"
                  aria-label="Send email"
                >
                  <Mail className="h-4 w-4 inline-block align-middle mr-2" aria-hidden="true" />
                  Email Me
                </a>
                <a
                  href={heroData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex items-center gap-2"
                  aria-label="View GitHub profile"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  GitHub
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Subtle description below terminal */}
        <p className="text-body text-[hsl(var(--fg-muted))] max-w-2xl mt-10 text-center md:text-left">
          {heroData.description}
        </p>
      </div>
    </header>
  );
};

export default Hero;
import Link from 'next/link';
import { Github, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Intro', href: '#introduction' },
  { label: 'Data Prep', href: '#data-preparation' },
  { label: 'WGAN', href: '#wgan-implementation' },
  { label: 'Tuning', href: '#hyperparameter-tuning' },
  { label: 'Classifier (Real)', href: '#classifier-real' },
  { label: 'Annotation', href: '#annotating-synthetic' },
  { label: 'Classifier (Mixed)', href: '#classifier-mixed' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="mr-4 flex items-center">
           <Link href="/" className="mr-6 flex items-center space-x-2">
             {/* Placeholder Logo - Replace with an actual one */}
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            <span className="font-bold">Synthetic Faces</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com/aatifahmad123/synthetic_face_generation" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
            {/* Placeholder for potential future AI features or theme toggle */}
           {/* <Button variant="ghost" size="icon">
             <Bot className="h-5 w-5" />
           </Button> */}
        </div>
      </div>
    </header>
  );
}

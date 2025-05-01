import Link from 'next/link';
import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto border-t py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{' '}
          <Link
            href="https://github.com/aatifahmad123"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 hover:text-primary"
          >
            Aatif Ahmad
          </Link>
          . The source code is available on{' '}
          <Link
            href="https://github.com/aatifahmad123/synthetic_face_generation"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 hover:text-primary"
          >
            GitHub <Github className="inline h-4 w-4" />
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-site">
        <div className="mx-auto max-w-xl">
          <p className="label">Error 404</p>
          <h1 className="heading-xl mt-3">Page not found.</h1>
          <p className="body-lg mt-6">
            The requested page could not be found or may have moved.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/">
              Return Home
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button href="/platform" variant="secondary">
              Explore Platform
            </Button>
            <Button href="/contact" variant="secondary">
              Contact ISB
            </Button>
          </div>
          <nav className="mt-12 border-t border-border pt-6" aria-label="Helpful links">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-ink-muted">
              <li>
                <Link href="/solutions" className="hover:text-gold">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gold">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/request-demo" className="hover:text-gold">
                  Request Demo
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}

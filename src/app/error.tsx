"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Intentional: log digest only for ops correlation — no PII
    if (error?.digest) {
      console.error("[page-error]", error.digest);
    }
  }, [error]);

  return (
    <section className="section">
      <div className="container-site">
        <div className="mx-auto max-w-xl">
          <p className="label">Error</p>
          <h1 className="heading-xl mt-3">
            Something prevented this page from loading correctly.
          </h1>
          <p className="body mt-6">
            You can try again, return to the homepage, or contact ISB if the
            problem continues.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button type="button" onClick={() => reset()}>
              Try again
            </Button>
            <Button href="/" variant="secondary">
              Return Home
            </Button>
            <Button href="/contact" variant="secondary">
              Contact ISB
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

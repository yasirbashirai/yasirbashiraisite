import { useEffect } from "react";

type MetaProps = {
  title: string;
  description?: string;
  canonical?: string;
};

/**
 * Tiny SPA SEO helper. Sets document.title and updates the
 * <meta name="description"> + canonical link on mount.
 * Restores the previous title on unmount so back-nav reads correctly.
 */
export const useDocumentMeta = ({ title, description, canonical }: MetaProps) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    let restoredDesc: string | null = null;
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        restoredDesc = meta.getAttribute("content");
        meta.setAttribute("content", description);
      }
    }

    let restoredCanonical: string | null = null;
    if (canonical) {
      const link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (link) {
        restoredCanonical = link.href;
        link.href = canonical;
      }
    }

    return () => {
      document.title = prevTitle;
      if (restoredDesc !== null) {
        const meta = document.querySelector('meta[name="description"]');
        meta?.setAttribute("content", restoredDesc);
      }
      if (restoredCanonical !== null) {
        const link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
        if (link) link.href = restoredCanonical;
      }
    };
  }, [title, description, canonical]);
};

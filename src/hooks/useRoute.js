import { useCallback, useEffect, useState } from "react";

/*
  A small history router for case-study URLs (/work/<project-id>). The
  homepage stays mounted underneath, so closing a case study returns to the
  same scroll position. Vercel serves a prerendered copy of index.html at
  each /work/<id>/ path (scripts/prerender.mjs), so shared links open
  straight onto the project.
*/
const parse = () => {
  const match = window.location.pathname.match(/^\/work\/([\w-]+)\/?$/);
  return { projectId: match ? match[1] : null };
};

export default function useRoute() {
  const [route, setRoute] = useState(parse);

  useEffect(() => {
    const onPop = () => setRoute(parse());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const openProject = useCallback((id) => {
    window.history.pushState({ fromSite: true }, "", `/work/${id}`);
    setRoute({ projectId: id });
  }, []);

  const switchProject = useCallback((id) => {
    window.history.replaceState(window.history.state, "", `/work/${id}`);
    setRoute({ projectId: id });
  }, []);

  const closeProject = useCallback(() => {
    // Opened from this page: step back so the browser history stays tidy.
    if (window.history.state?.fromSite) window.history.back();
    else {
      window.history.replaceState(null, "", "/#products");
      setRoute({ projectId: null });
      setTimeout(() => document.getElementById("products")?.scrollIntoView(), 0);
    }
  }, []);

  return { ...route, openProject, switchProject, closeProject };
}

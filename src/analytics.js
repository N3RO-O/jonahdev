/**
 * Opt-in analytics. Microsoft Clarity is injected only when a project ID is
 * provided via the VITE_CLARITY_ID env var, so the site stays privacy-first
 * and tracker-free by default. Set VITE_CLARITY_ID in a .env file (or Vercel
 * project env) to enable heatmaps / session recordings.
 */
export function initAnalytics() {
  const clarityId = import.meta.env.VITE_CLARITY_ID
  if (!clarityId) return

  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.innerHTML = `
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${clarityId}");
  `
  document.head.appendChild(script)
}

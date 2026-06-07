/**
 * Prefix an internal, root-relative path with the configured base path.
 *
 * Astro sets `import.meta.env.BASE_URL` from the `base` config in
 * astro.config.mjs (env-driven — see that file). On the apex domain it's "/";
 * on the GitHub Pages preview it's "/all-clear-services". Using this helper for
 * every hand-written internal link means switching deploy targets needs no
 * link edits.
 *
 * Pass root-relative paths only (e.g. "/services/", "/favicon.png"). External
 * URLs, tel:, and mailto: must NOT go through here.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // strip trailing /
  if (!path.startsWith('/')) path = '/' + path;
  return base + path;
}

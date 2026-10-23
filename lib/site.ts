// The public origin of the site, used for absolute URLs in metadata, the
// sitemap and robots.txt. Set NEXT_PUBLIC_SITE_URL in the environment to the
// live domain (for example "https://www.example.com"); it falls back to
// localhost so local development keeps working.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/+$/,
  "",
);

export const SITE_NAME = "Real Goa Holidays";

export const pageTitle = (title: string) => `${title} | ${SITE_NAME}`;

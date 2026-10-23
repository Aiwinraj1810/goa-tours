/** @type {import('next').NextConfig} */

// Baseline security headers. HSTS tells browsers to always use HTTPS for this
// site once they have visited it over HTTPS (it has no effect on plain http://
// localhost). Redirecting http -> https itself is done by the host.
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
]

const nextConfig = {
  eslint: {
    // No ESLint config exists in this project yet.
    ignoreDuringBuilds: true,
  },
  images: {
    // Images are resized and converted by Next.js. Only these hosts are allowed:
    // Cloudinary (CMS and site photography) and picsum (placeholder content).
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }]
  },
}

export default nextConfig

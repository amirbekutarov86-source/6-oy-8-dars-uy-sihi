/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Bazadagi mahsulotlarga istalgan https rasm havolasini qo'yish mumkin
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;

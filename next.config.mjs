/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // If you're deploying to GitHub Pages, you'll need the basePath
  // Replace 'your-repo-name' with your actual repository name
  basePath: "/E-commerce",
};

export default nextConfig;

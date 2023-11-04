
const ontologyConfig = require("./ontology.config.js");
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    //for static exports, rename the output folder for easier copy&pasting
    distDir: ontologyConfig.baseNextJsPath,
    //during development, or non-static builds:
    basePath: ontologyConfig.baseNextJsPath,
    reactStrictMode: true,
    swcMinify: true,
    modularizeImports: {
        '@mui/icons-material': {
            transform: '@mui/icons-material/{{member}}',
        },
    },
}

module.exports = nextConfig

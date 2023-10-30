
const ontologyConfig = require("./ontology.config.js");
/** @type {import('next').NextConfig} */
const nextConfig = {
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

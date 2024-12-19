import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/',
                '/_not-found',
                '/api/search',
                '/api/updateImage',
            ],
        },
        sitemap: '',
    };
}
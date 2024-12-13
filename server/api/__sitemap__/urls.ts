import { defineSitemapEventHandler } from "#imports";
import type { SitemapUrlInput } from "#sitemap/types";

export default defineSitemapEventHandler(async () => {
    const response = await $fetch('/api/projects/fetchprojects');

    return response.map((project): SitemapUrlInput => ({
        loc: `/projects/${project.id}`,
        lastmod: new Date(),
        priority: 0.8,
        changefreq: 'monthly'
    }));
});
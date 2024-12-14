import { defineSitemapEventHandler } from "#imports";
import type { SitemapUrlInput } from "#sitemap/types";

export default defineSitemapEventHandler(async () => {
    const response = await db.query.projectTable.findMany({
        columns: {
            id: true,
            modified_at: true
        }
    })

    return response.map((project): SitemapUrlInput => ({
        loc: `/projects/${project.id}`,
        lastmod: new Date(project.modified_at),
        priority: 0.8,
        changefreq: 'monthly'
    }));
});
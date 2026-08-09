import { PROGRAMMATIC_SEO_ITEMS } from '../../utils/programmaticSeo';

export async function GET() {
  const baseUrl = 'https://skyidevelopers.in';

  const itemsXml = PROGRAMMATIC_SEO_ITEMS.map((item) => `
    <item>
      <title><![CDATA[${item.project} ${item.microLocation} Pune | PMRDA NA Plots]]></title>
      <link>${baseUrl}/na-plots/${item.id}</link>
      <guid isPermaLink="true">${baseUrl}/na-plots/${item.id}</guid>
      <description><![CDATA[PMRDA Sanctioned 100% Clear Title 7/12 ${item.type} at ${item.location}. Size: ${item.plotSize || '2,000 SQFT Onwards'}. Price: ${item.priceRange}. Bank Loans: ${item.bankLoans.join(', ')}.]]></description>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
  `).join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Skyi Developers Pune | PMRDA NA Bungalow Plots &amp; Projects Feed</title>
    <link>${baseUrl}</link>
    <description>Official programmatic feed for PMRDA approved NA bungalow plots and townships across Pune micro-locations.</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}

import { MetadataRoute } from "next";
import { createClient } from "@/prismicio";

const baseUrl = process.env.SITE_URL || "https://two.cx";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();

  const dynamicPages = await client.getAllByType("page");
  const dynamicServices = await client.getAllByType("services");
  const dynamicCaseStudies = await client.getAllByType("case_studies");

  const dynamicRoutes = dynamicPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date().toISOString(),
  }));

  const serviceRoutes = dynamicServices.map((service) => ({
    url: `${baseUrl}/services/${service.uid}`,
    lastModified: new Date().toISOString(),
  }));

  const caseStudyRoutes = dynamicCaseStudies.map((caseStudy) => ({
    url: `${baseUrl}/case-studies/${caseStudy.uid}`,
    lastModified: new Date().toISOString(),
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  return [
    ...staticRoutes,
    ...dynamicRoutes,
    ...serviceRoutes,
    ...caseStudyRoutes,
  ];
}

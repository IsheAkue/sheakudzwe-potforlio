export type ServicePackage = {
  index: string;
  title: string;
  idealFor: string;
  body: string;
  oneTime: string;
  maintenance: string;
};

export const servicePackages: ServicePackage[] = [
  {
    index: "01",
    title: "Starter Landing Page",
    idealFor: "Solopreneurs, consultants, micro-businesses",
    body: "A custom-built single page — mobile responsive, SSL-secured, with a working contact form and basic SEO from day one.",
    oneTime: "$150–$300 to build",
    maintenance: "$20/mo maintenance",
  },
  {
    index: "02",
    title: "Business Growth",
    idealFor: "SMEs, local services, professional firms",
    body: "Up to five custom pages, a CMS so you can update it yourself, and analytics wired in from the start so you know it's working.",
    oneTime: "$400–$800 to build",
    maintenance: "$30/mo maintenance",
  },
];

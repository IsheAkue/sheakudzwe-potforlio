export type ProjectSection = {
  heading: string;
  body: string[];
  list?: boolean;
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  shortName: string;
  tagline: string;
  oneLiner: string;
  liveUrl: string;
  year: string;
  tags: string[];
  role: string;
  screenshot: string;
  logo: string;
  colors: {
    bg: string;
    fg: string;
    accent: string;
    accentSoft: string;
  };
  sections: ProjectSection[];
  deliverables: string[];
};

export const projects: Project[] = [
  {
    slug: "kilapunch-erp",
    index: "01",
    name: "Kilapunch ERP Solutions",
    shortName: "Kilapunch",
    tagline: "Sage & Palladium business partner — Zimbabwe",
    oneLiner:
      "A business site for a Sage ERP consultancy, built to turn five product lines and a five-step onboarding process into a clear case for working with them.",
    liveUrl: "https://kilapuncherp.co.zw/",
    year: "2025",
    tags: ["Next.js", "Business / ERP", "Zimbabwe", "Responsive UI"],
    role: "Design & frontend development",
    screenshot: "/images/kilapunch-screenshot.png",
    logo: "/images/kilapunch-logo.png",
    colors: {
      bg: "#0B1220",
      fg: "#F3F6FB",
      accent: "#2F6FED",
      accentSoft: "#DCE8FF",
    },
    sections: [
      {
        heading: "Context",
        body: [
          "Kilapunch has been implementing and supporting Sage ERP systems in Zimbabwe since 2006, but their web presence didn't reflect that experience.",
        ],
      },
      {
        heading: "Problem",
        list: true,
        body: [
          "No clear way for a prospective client to tell which Sage product actually fits their business",
          "Trust signals — years in business, real clients, a defined process — buried instead of upfront",
          "A consultancy selling stability and competence, presented with no visual authority",
          "Service and industry information scattered with no scannable structure",
        ],
      },
      {
        heading: "Solution",
        body: [
          "A dark, enterprise-blue marketing site built with Next.js, organised around what a prospective client actually needs to evaluate — five Sage product lines, six core services, the industries Kilapunch already serves, and a five-step engagement process — with trust signals like the 2006 founding date and named clients placed close to the surface instead of buried in an About page.",
        ],
      },
      {
        heading: "Result",
        body: [
          "A live, production site at kilapuncherp.co.zw carrying Kilapunch's full service and product catalogue, industry coverage, and a clear five-step process for prospective clients to follow.",
        ],
      },
    ],
    deliverables: [
      "Full marketing site — home, services, industries, process",
      "Responsive layout across desktop, tablet and mobile",
      "Production deployment",
    ],
  },
  {
    slug: "cb-connexions",
    index: "02",
    name: "CB Connexions",
    shortName: "CB Connexions",
    tagline: "Business accounting & consulting — South Africa",
    oneLiner:
      "A brand-led site for an independent accounting practice, built around the idea that the relationship — not the filing — is the actual product.",
    liveUrl: "https://cb-connexions-website.pages.dev/",
    year: "2025",
    tags: ["GSAP", "Branding", "South Africa", "Accounting / Consulting"],
    role: "Design, branding & GSAP animation",
    screenshot: "/images/cb-connexions-screenshot.png",
    logo: "/images/cb-connexions-logo.svg",
    colors: {
      bg: "#F5F3EC",
      fg: "#1B1A18",
      accent: "#7C2734",
      accentSoft: "#8FC93F",
    },
    sections: [
      {
        heading: "Context",
        body: [
          "CB Connexions is Claver Bonda's independent accounting and tax practice in South Africa — a CBAP(SA) Chartered Business Accountant and SARS Registered Tax Practitioner.",
        ],
      },
      {
        heading: "Problem",
        list: true,
        body: [
          "The practice's whole pitch is personal — no call centre, no hand-offs — but nothing about the site said that",
          "Seven core services with no clear structure tying them together",
          "Compliance framed as a checkbox instead of an ongoing relationship",
          "Risk of reading like a generic accounting-firm template",
        ],
      },
      {
        heading: "Solution",
        body: [
          "A brand-led site built around a Connect–Assess–Structure–Sustain loop that mirrors how the relationship actually works — it doesn't end at the tax filing, it repeats every month. A warm paper background with maroon and lime accents, set in Instrument Serif and Inter, with GSAP driving the services count-up and section reveals.",
        ],
      },
      {
        heading: "Result",
        body: [
          "A live site that presents CB Connexions' full service range, its Connect–Assess–Structure–Sustain process, and Claver Bonda's credentials, with a working contact form providing a direct path into a real conversation with the practice.",
        ],
      },
    ],
    deliverables: [
      "Full brand-led marketing site with custom design system",
      "GSAP-driven scroll reveals and animated stats",
      "Working contact form",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return projects[0];
  return projects[(i + 1) % projects.length];
}

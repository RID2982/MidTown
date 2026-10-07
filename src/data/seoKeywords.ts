/**
 * SEO & Search Engine Optimization Configuration
 * Dedicated keyword clusters, meta descriptions, Open Graph data, and Schema.org JSON-LD
 * targeted for Rank #1 on Google Search for Salem Rotaract & related search terms.
 */

export const SEO_KEYWORDS = [
  // Primary Target Keywords
  'Rotaract Salem',
  'Rotaract Club of Salem Midtown',
  'Road Track Salem',
  'Roadtrack Salem',
  'Rotaract District 2982',
  'Rotaract RID 2982',
  'Rotaract Club Salem',
  'Salem Rotaract Club',
  'Best Rotaract Club in Salem',
  'Rotary Club of Salem Midtown',
  'Youth Club Salem',
  'Rotaract Salem Midtown Website',
  
  // Phonetic & Search Intent Variants
  'road track salem midtown',
  'rotaract road track salem',
  'rotaract club in salem tamil nadu',
  'rotaract district 2982 salem',
  'rotary youth club salem',
  
  // Avenue & Project Keywords
  'Community Service Salem',
  'Youth Leadership Salem',
  'Rotaract Sports Chess Tournament Salem',
  'Sustainable Development Salem Walkathon',
  'Teacher Day Celebration Rotaract Salem',
  'World Tourism Day Salem Midtown',
  'Oru Nodi Nidhanam Road Safety Salem',
  'Anbodu Food Donation Drive Salem'
];

export const SEO_CONFIG = {
  siteTitle: 'Rotaract Club of Salem Midtown — District 2982',
  titleTemplate: '%s | Rotaract Club of Salem Midtown — RID 2982',
  description:
    'Official website of Rotaract Club of Salem Midtown (RID 2982). Leading youth organization in Salem dedicated to Community Service, Professional Development, International Fellowship, and Sports. Guided by our motto "Dream to Deserve".',
  keywords: SEO_KEYWORDS.join(', '),
  author: 'Rotaract Club of Salem Midtown',
  siteUrl: 'https://rotaractsalemmidtown.org',
  locale: 'en_IN',
  location: {
    city: 'Salem',
    state: 'Tamil Nadu',
    country: 'India',
    latitude: 11.6643,
    longitude: 78.1460,
  },
  social: {
    instagram: 'https://www.instagram.com/rac_salemmidtown_/',
    linkedin: 'https://www.linkedin.com/company/racsalemmidtown/about/',
    email: 'rotaractclubofsalemmidtown05@gmail.com',
  },
};

/**
 * Schema.org Structured Data (JSON-LD) for Google Rich Snippets
 */
export const JSON_LD_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'NGO',
      '@id': 'https://rotaractsalemmidtown.org/#organization',
      name: 'Rotaract Club of Salem Midtown',
      alternateName: ['RAC Salem Midtown', 'Rotaract Salem', 'Road Track Salem', 'Rotaract District 2982'],
      url: 'https://rotaractsalemmidtown.org',
      logo: 'https://rotaractsalemmidtown.org/favicon.png',
      description: 'Official Rotaract Club operating under Rotary International District 2982 in Salem, Tamil Nadu, India.',
      motto: 'Dream to Deserve',
      foundingDate: '2024-11-05',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Salem',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'India',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 11.6643,
        longitude: 78.1460,
      },
      sameAs: [
        'https://www.instagram.com/rac_salemmidtown_/',
        'https://www.linkedin.com/company/racsalemmidtown/about/',
      ],
      parentOrganization: {
        '@type': 'NGO',
        name: 'Rotary Club of Salem Midtown',
        url: 'https://rotary.org',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://rotaractsalemmidtown.org/#website',
      url: 'https://rotaractsalemmidtown.org',
      name: 'Rotaract Club of Salem Midtown',
      description: 'Official website for Rotaract Club of Salem Midtown (RID 2982). Explore projects, avenue leadership, member directory, and join us.',
      publisher: {
        '@id': 'https://rotaractsalemmidtown.org/#organization',
      },
      inLanguage: 'en-IN',
    },
  ],
};

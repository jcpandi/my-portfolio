export type Project = {
  id: string;
  title: string;
  category: 'WordPress' | 'Landing pages';
  discipline: string;
  url: string;
  image?: string;
  description: string;
};

export const projects: Project[] = [
  { id: 'omakase', title: 'Omakase Jin', category: 'Landing pages', discipline: 'Hospitality · Editorial design', url: 'https://omakase-jin.vercel.app/', image: '/projects/omakase.jpg', description: 'A cinematic restaurant experience built around the art of Japanese omakase.' },
  { id: 'aero', title: 'AERO/RUN', category: 'Landing pages', discipline: 'Product · Digital experience', url: 'https://aero-one-ruby.vercel.app/', image: '/projects/aero.jpg', description: 'A performance footwear concept with bold typography and an interactive product story.' },
  { id: 'altreo', title: 'Altreo Design Studio', category: 'WordPress', discipline: 'Architecture · Studio website', url: 'https://altreodesign.com/', image: '/projects/altreo.jpg', description: 'An architectural studio portfolio that puts spaces and ideas in the foreground.' },
  { id: 'automotive', title: 'Autoglide', category: 'Landing pages', discipline: 'Automotive · Web experience', url: 'https://automotive-omega.vercel.app/', image: '/projects/automotive.jpg', description: 'A bold automotive website showcasing premium vehicles and services.' },
  { id: 'law', title: 'Justar Law Firm', category: 'WordPress', discipline: 'Professional services · Website', url: 'https://law-firm.mangjoe.online/', image: '/projects/law.jpg', description: 'A considered digital presence for a professional legal practice.' },
  { id: 'wellness', title: 'Nutriva Wellness', category: 'WordPress', discipline: 'Wellbeing · Website', url: 'https://wellness.mangjoe.online/', image: '/projects/wellness.jpg', description: 'A calm, approachable web experience for wellness and care.' },
  { id: 'baldassano', title: 'Dr. Baldassano', category: 'WordPress', discipline: 'Healthcare · Family dentistry', url: 'https://www.drbaldassano.com/', description: 'A website for a family and cosmetic dentistry practice.' },
  { id: 'freeman', title: 'Freeman IMC', category: 'WordPress', discipline: 'Consulting · Corporate website', url: 'https://freemanimc.com/', description: 'A digital presence for investment management consulting.' },
  { id: 'framer', title: 'Framer Experience', category: 'Landing pages', discipline: 'Framer · Landing page', url: 'https://patient-jargon-166481.framer.app/', description: 'A landing page experience crafted in Framer.' },
  { id: 'rental', title: 'Car Rental', category: 'Landing pages', discipline: 'Automotive · Booking experience', url: 'https://landing-page.mangjoe.online/car-rental/', description: 'A focused landing page for car rental services.' },
  { id: 'fitness', title: 'Fitness', category: 'Landing pages', discipline: 'Fitness · Landing page', url: 'https://landing-page.mangjoe.online/fitness/', description: 'An energetic landing page for fitness.' },
  { id: 'pets', title: 'Pets Adoption', category: 'Landing pages', discipline: 'Community · Pet adoption', url: 'https://landing-page.mangjoe.online/pets-adoption/', description: 'A welcoming landing page centered on pet adoption.' },
  { id: 'drone', title: 'Drone', category: 'Landing pages', discipline: 'Technology · Product showcase', url: 'https://drone.mangjoe.online', description: 'A product-focused drone landing page.' },
  { id: 'smile', title: 'Smile Care', category: 'Landing pages', discipline: 'Healthcare · Dental care', url: 'https://mangjoe.com/smile-care/', description: 'A dental care landing page.' },
  { id: 'dvp', title: 'DVP', category: 'Landing pages', discipline: 'Brand · Landing page', url: 'https://mangjoe.online/dvp/', description: 'A focused brand landing page.' },
  { id: 'architecture', title: 'Architecture', category: 'Landing pages', discipline: 'Architecture · Editorial website', url: 'https://mangjoe.online/architecture/', description: 'An architecture-focused landing page.' },
];



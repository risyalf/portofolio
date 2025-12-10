export interface Project {
  id: number;
  title: string;
  summary: string;
  link: string;
  images: string[];
  tags: string[];
  details: {
    challenge: string;
    solution: string;
    impact: string[];
  };
  externalLink?: {
    title: string;
    url: string;
  };
}
export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Website Development",
    summary: "Develop e-commerce website with user-friendly interface.",
    link: "https://listromart.com",
    images: [
      "/experience/ecommerce1.png",
    ],
    tags: ["E-Commerce", "MySQL", "User Friendly"],
    details: {
      challenge: "The company needed a user-friendly e-commerce platform to enhance customer experience and streamline online sales.",
      solution: "Developed a responsive e-commerce website using modern web technologies, ensuring seamless navigation and efficient checkout processes.",
      impact: [
        "Increased online sales by 30% within the first quarter after launch.",
        "Received positive feedback from customers regarding the website's usability.",
        "Reduced cart abandonment rates by 15% through optimized checkout flow."
      ]
    }
  },
];

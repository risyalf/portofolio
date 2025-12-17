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
      "/experience/0.png",
      "/experience/6.png",
      "/experience/1.jpeg",
      "/experience/2.jpeg",
      "/experience/3.jpeg",
      "/experience/4.jpeg",
      "/experience/5.jpeg",
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
  {
    id: 1,
    title: "Attendance Website Development",
    summary: "Develop attendace website with user-friendly interface.",
    link: "https://absen.listromart.com",
    images: [
      "/experience/absen_1.png",
      "/experience/absen_2.png",
      "/experience/absen_3.png",
      "/experience/absen_4.png",
      "/experience/absen_5.png",
    ],
    tags: ["Attendance", "MySQL", "User Friendly"],
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

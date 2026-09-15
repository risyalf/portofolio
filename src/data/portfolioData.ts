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
    title: "NTK Pump Clinic Management Website",
    summary: "A responsive management system to streamline service operations, document handling, attendance, and maintainer coordination.",
    link: "https://ntk-pumpclinic.com",
    images: [
      "/experience/pump/login.png",
      "/experience/pump/dashboard admin.png",
      "/experience/pump/dashboard technician.png",
      "/experience/pump/bp management.png",
      "/experience/pump/Form Builder.png",
      "/experience/pump/history checkin checkout.png",
      "/experience/pump/job order history.png",
      "/experience/pump/job order history detail.png",
      "/experience/pump/absensi.png",
      "/experience/pump/product management.png",
      "/experience/pump/public holiday.png",
      "/experience/pump/technician profile.png",
      "/experience/pump/user role management.png",

    ],
    tags: ["Management System", "Maintenance", "Attendance", "Admin Panel", "Responsive"],
    details: {
      challenge:
        "The company needed a centralized platform to manage service orders, maintainers, documentation, and attendance efficiently while ensuring smooth communication and workflow management.",
      solution:
        "Developed a responsive management website with dedicated admin and maintainer modules. Administrators can manage documents, service orders, maintainers, attendance, and set holidays, while maintainers can mark attendance and submit service reports with ease.",
      impact: [
        "Streamlined daily maintenance and service operations.",
        "Improved data organization and documentation management.",
        "Enhanced coordination between admin and maintainers.",
        "Reduced manual processing and administrative workload.",
        "Provided real-time visibility into attendance and task progress."
      ]
    }
  },
  {
    id: 2,
    title: "Landing Page & Company Profile Development",
    summary: "Developed a modern, responsive landing page to enhance brand presence and credibility.",
    link: "https://alris-digital.risyal.my.id",
    images: [
      "/experience/web-porto/awal.png",
      "/experience/web-porto/service.png",
      "/experience/web-porto/portofolios.png",
      "/experience/web-porto/comments.png",
      "/experience/web-porto/pricing.png",
      "/experience/web-porto/faq.png",
      "/experience/web-porto/contact.png",
    ],
    tags: ["Landing Page", "Company Profile", "Responsive", "UI/UX"],
    details: {
      challenge:
        "The business needed a professional online presence to clearly communicate its services, build trust, and attract potential clients.",
      solution:
        "Designed and developed a clean, responsive landing page with a strong visual identity, clear content structure, and optimized performance for all devices.",
      impact: [
        "Improved brand credibility and professional online appearance.",
        "Increased user engagement and inquiry rate.",
        "Provided a smooth and intuitive browsing experience for visitors."
      ]
    }
  },
  {
    id: 3,
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
    id: 4,
    title: "Attendance Website Development",
    summary: "Developed an attendance management system with a clean, user-friendly interface.",
    link: "https://absen.listromart.com",
    images: [
      "/experience/absen_1.png",
      "/experience/absen_2.png",
      "/experience/absen_3.png",
      "/experience/absen_4.png",
      "/experience/absen_5.png",
    ],
    tags: ["Attendance System", "Web App", "Responsive", "User Friendly"],
    details: {
      challenge:
        "The company needed a reliable online attendance platform to simplify employee check-in, monitoring, and reporting processes.",
      solution:
        "Developed a responsive attendance web application with an intuitive UI, enabling employees to check in easily and admins to manage records efficiently.",
      impact: [
        "Improved attendance tracking accuracy and transparency.",
        "Reduced manual recording and administrative workload.",
        "Provided better visibility into employee presence and performance."
      ]
    }
  },
];

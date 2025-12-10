export interface Project {
  id: number;
  title: string;
  summary: string;
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
    title: "Customer Insights Dashboard for E-Commerce",
    summary: "Developed an interactive Power BI dashboard to analyze customer behavior, sales trends, and marketing performance for an e-commerce company.",
    images: [
      "https://example.com/dashboard1.jpg",
      "https://example.com/dashboard2.jpg",
      "https://example.com/dashboard3.jpg"
    ],
    tags: ["Power BI", "SQL", "Data Visualization", "Customer Analytics", "Business Intelligence"],
    details: {
      challenge: "The company lacked a centralized reporting system to track customer engagement, purchase patterns, and marketing campaign effectiveness.",
      solution: "Designed and implemented a Power BI dashboard integrating data from Google Analytics, CRM systems, and sales records, providing real-time insights.",
      impact: [
        "Increased marketing ROI by 25% through data-driven campaign adjustments.",
        "Enhanced customer segmentation, leading to a 15% improvement in personalized recommendations and repeat purchases."
      ]
    }
  },
];

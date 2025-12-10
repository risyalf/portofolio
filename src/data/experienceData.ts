export type Job = {
  title: string;
  company: string;
  dates: string;
  description: string[];
};

export const jobs: Job[] = [
  {
    title: "IT Staff",
    company: "PT. Apparel One Indonesia",
    dates: "01/2024 - present",
    description: [
      'Providing technical support for the Warehouse Management System (WMS)',
      'Developing new WMS features and modules',
      'Building APIs for suppliers within the WPO system',
      "Handle data extraction for user's requirements",
      "Collaborate closely with other IT staff to design, improve and integrate internal systems to support operational efficiency and business growth",
      "Optimizing WMS and WPO backend processes to improve system performance and reduce operational bottlenecks",
      "Automating routine operational tasks within the WMS/WPO environment to reduce manual workload and improve data accuracy",
      "Monitoring system performance and proactively troubleshooting issues to ensure high system availability",
      "Working with technologies such as PHP, Laravel, PostgreSQL, REST APIs, and internal integration tools to support system development",
    ]
  },
  {
    title: "Junior Game Programmer",
    company: "Digital Breeze Interactive",
    dates: "08/2022 - 10/2023",
    description: [
      'Discussing and developing games based on client requirements',
      'Writing clean code following SOLID principles and Design Patterns',
      'Performing testing and error handling on the games being developed',
      'Collaborating and communicating with the team during game development',
      'Using Unity’s profiler to analyze and optimize code performance',
      'Completing and delivering the product to the client on time',
      "Working with technologies such as C#, Unity, Prefab, and internal integration tools to support system development",
    ]
  },
  {
    title: "Technical ERP",
    company: "PT. Bina Busana Internusa",
    dates: "12/2020 - 07/2022",
    description: [
      'Develop ERP backend and frontend systems based on user requirements',
      'Provide bug support and generate user reports within the ERP system to streamline workflows and improve user efficiency',
      'Integrate the ERP system with other systems to enhance efficiency when users work across multiple platforms',
      'Communicate effectively with users to resolve issues and support system enhancement or development',
      'Optimize backend code and queries to reduce server load and improve overall system performance',
      "Working with technologies such as Java, IDempiere, PostgreSQL, and internal integration tools to support system development",
    ]
  },
];
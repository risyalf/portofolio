export interface Project {
  id: number;
  slug: string;
  title: string;
  summary: string;
  link: string;
  role?: string;
  timeline?: string;
  images: string[];
  tags: string[];
  overview?: string;
  architectureHighlights?: {
    title: string;
    description: string;
  }[];
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
    slug: "ntk-pump-clinic-management",
    title: "NTK Pump Clinic Management Website",
    role: "Lead Full-Stack Engineer & Architect",
    timeline: "2023 - 2024",
    summary: "A responsive management system to streamline service operations, document handling, attendance, and maintainer coordination.",
    overview: "Sistem operasional dan ERP mini terpadu yang dirancang untuk mengelola seluruh rantai pekerjaan teknisi lapangan (pump clinic), pencatatan kehadiran berbasis lokasi, generator form order kustom, manajemen dokumen kepatuhan, serta dashboard analitik multi-role untuk admin dan teknisi.",
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
    tags: ["Management System", "Maintenance", "Attendance", "Admin Panel", "Responsive", "Role-Based Access Control", "Form Builder"],
    architectureHighlights: [
      {
        title: "Role-Based Access Control (RBAC)",
        description: "Pemisahan hak akses granular antara Super Admin, Operation Dispatcher, dan Teknisi Lapangan untuk menjamin keamanan data dan alur verifikasi pekerjaan."
      },
      {
        title: "Dynamic Form Builder Engine",
        description: "Memungkinkan manajemen merancang formulir inspeksi dan checklist pemeliharaan mesin pompa secara dinamis tanpa perlu deploy kode baru."
      },
      {
        title: "Field Operations & Attendance Logging",
        description: "Pencatatan riwayat check-in/check-out teknisi di lokasi klien dengan timestamp presisi dan integrasi riwayat job order otomatis."
      }
    ],
    details: {
      challenge:
        "The company needed a centralized platform to manage service orders, maintainers, documentation, and attendance efficiently while ensuring smooth communication and workflow management.",
      solution:
        "Developed a responsive management website with dedicated admin and maintainer modules. Administrators can manage documents, service orders, maintainers, attendance, and set holidays, while maintainers can mark attendance and submit service reports with ease.",
      impact: [
        "Streamlined daily maintenance and service operations across all field teams.",
        "Improved data organization and digital documentation management.",
        "Enhanced real-time coordination between admin dispatchers and maintainers.",
        "Reduced manual spreadsheet processing and administrative paperwork by over 70%.",
        "Provided real-time auditability into job order milestones and attendance progress."
      ]
    }
  },
  {
    id: 2,
    slug: "landing-page-company-profile",
    title: "Landing Page & Company Profile Development",
    role: "Frontend Engineer & UI/UX Specialist",
    timeline: "2023",
    summary: "Developed a modern, responsive landing page to enhance brand presence and credibility.",
    overview: "Platform web profil bisnis modern dengan performa tinggi dan desain responsif, dilengkapi showcase layanan interaktif, katalog portofolio dinamis, kalkulator paket harga, FAQ accordion, serta formulir kontak terintegrasi.",
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
    tags: ["Landing Page", "Company Profile", "Responsive", "UI/UX", "High Performance", "Conversion Rate Optimization"],
    architectureHighlights: [
      {
        title: "Conversion-Focused Information Architecture",
        description: "Tata letak section dirancang mengikuti prinsip visual hierarchy untuk mengalirkan traffic pengunjung dari problem statement menuju call-to-action (CTA)."
      },
      {
        title: "Core Web Vitals Optimization",
        description: "Aset grafis terkompresi secara optimal dengan lazy-loading dan zero render-blocking logic untuk memastikan First Contentful Paint secepat kilat."
      }
    ],
    details: {
      challenge:
        "The business needed a professional online presence to clearly communicate its services, build trust, and attract potential clients.",
      solution:
        "Designed and developed a clean, responsive landing page with a strong visual identity, clear content structure, and optimized performance for all devices.",
      impact: [
        "Improved brand credibility and professional online appearance.",
        "Increased user engagement and client inquiry conversion rates.",
        "Delivered near-instant page loads on both mobile 4G and desktop networks."
      ]
    }
  },
  {
    id: 3,
    slug: "listromart-ecommerce-platform",
    title: "E-Commerce Website Development",
    role: "Full-Stack Web Developer",
    timeline: "2022 - 2024",
    summary: "Develop e-commerce website with user-friendly interface.",
    overview: "Platform toko daring (e-commerce) B2C & B2B retail peralatan listrik dan plumbing lengkap dengan katalog produk terstruktur, manajemen inventaris stok terintegrasi dengan MySQL, sistem keranjang belanja interaktif, serta alur checkout dan wholesale membership yang efisien.",
    link: "https://listromart.com",
    images: [
      "/experience/listromart/listromart_home_new.png",
      "/experience/listromart/listromart_products_new.png",
      "/experience/0.png",
      "/experience/6.png",
      "/experience/1.jpeg",
      "/experience/2.jpeg",
      "/experience/3.jpeg",
      "/experience/4.jpeg",
      "/experience/5.jpeg",
    ],
    tags: ["E-Commerce", "MySQL", "User Friendly", "Catalog System", "Shopping Cart", "Checkout Engine", "Wholesale Loyalty"],
    architectureHighlights: [
      {
        title: "Modernized High-Converting Storefront",
        description: "Pembaruan antarmuka e-commerce modern dengan pencarian instan, integrasi reward poin pelanggan, banner promo interaktif, dan navigasi kategori cepat."
      },
      {
        title: "Optimized Relational Database Schema",
        description: "Desain skema MySQL dengan normalisasi tepat dan indexing pada tabel produk, varian grosir, dan pesanan guna mencegah bottleneck saat traffic spike."
      },
      {
        title: "Frictionless Checkout Funnel",
        description: "Penyederhanaan langkah pemesanan menjadi alur checkout minimalis untuk menekan persentase cart abandonment."
      }
    ],
    details: {
      challenge: "The company needed a modern, user-friendly e-commerce platform to showcase electrical & plumbing supplies, enhance customer retention, and streamline both retail and wholesale online sales.",
      solution: "Developed and upgraded a responsive e-commerce website using modern web technologies, ensuring seamless navigation, high-speed product catalog browsing, and efficient checkout processes.",
      impact: [
        "Delivered a refreshed, modern storefront with high user retention and lower bounce rates.",
        "Increased online sales by over 30% with streamlined mobile and desktop browsing.",
        "Supported multi-tier customer pricing and reward point loyalty systems seamlessly."
      ]
    }
  },
  {
    id: 4,
    slug: "listromart-attendance-management",
    title: "Attendance Website Development",
    role: "Full-Stack Developer",
    timeline: "2023",
    summary: "Developed an attendance management system with a clean, user-friendly interface.",
    overview: "Aplikasi pencatatan absensi karyawan berbasis web yang ringan dan presisi, memudahkan verifikasi kehadiran kerja harian, tracking izin & cuti, serta rekapitulasi data otomatis untuk bagian payroll.",
    link: "https://absen.listromart.com",
    images: [
      "/experience/absen_1.png",
      "/experience/absen_2.png",
      "/experience/absen_3.png",
      "/experience/absen_4.png",
      "/experience/absen_5.png",
    ],
    tags: ["Attendance System", "Web App", "Responsive", "User Friendly", "Automated Reporting", "Time Tracking"],
    architectureHighlights: [
      {
        title: "Automated Timesheet & Export",
        description: "Mekanisme kalkulasi otomatis jam kerja dan keterlambatan dengan fitur ekspor ringkasan absensi untuk divisi HR & Finance."
      },
      {
        title: "Mobile-First Attendance UI",
        description: "Antarmuka responsif yang disesuaikan untuk smartphone agar karyawan dapat melakukan clock-in secara instan tanpa antrean."
      }
    ],
    details: {
      challenge:
        "The company needed a reliable online attendance platform to simplify employee check-in, monitoring, and reporting processes.",
      solution:
        "Developed a responsive attendance web application with an intuitive UI, enabling employees to check in easily and admins to manage records efficiently.",
      impact: [
        "Improved attendance tracking accuracy and transparency across departments.",
        "Eliminated manual paperwork and reduced HR recording workload by over 60%.",
        "Provided real-time management dashboard visibility into staff attendance."
      ]
    }
  },
  {
    id: 5,
    slug: "digiexam-student-assessment-platform",
    title: "DigiExam — Computer-Based Testing (CBT) Platform",
    role: "Backend Architect & System Engineer",
    timeline: "2024",
    summary: "A modern web-based student assessment & exam management platform built with Laravel 12, Filament v3, and Flutter Web.",
    overview: "Platform Computer-Based Testing (CBT) dan sistem asesmen siswa modern berskala institusi pendidikan. Dirancang untuk menyelenggarakan ujian digital secara terpadu dengan bank soal terenkripsi, dynamic token access per sesi ujian, pengawasan real-time, kalkulasi nilai otomatis, serta panel administrasi berbasis Filament v3 dan antarmuka pengerjaan siswa via Flutter Web.",
    link: "https://github.com/risyalf/digiexam-demo",
    images: [
      "/experience/digiexam/image-1.png",
      "/experience/digiexam/image-2.png",
      "/experience/digiexam/image-3.png",
      "/experience/digiexam/image-4.png",
      "/experience/digiexam/image-5.png",
      "/experience/digiexam/image-6.png",
      "/experience/digiexam/image-7.png",
      "/experience/digiexam/image-8.png",
      "/experience/digiexam/image-9.png",
      "/experience/digiexam/image-10.png",
      "/experience/digiexam/image-11.png",
      "/experience/digiexam/image.png",
    ],
    tags: ["Laravel 12", "PHP 8.4", "Filament v3", "Flutter Web", "CBT System", "Assessment Engine", "REST API", "Database Optimization"],
    architectureHighlights: [
      {
        title: "High-Throughput Exam Submission Engine",
        description: "Arsitektur endpoint backend tangguh untuk menangani konkurensi ribuan siswa yang mengumpulkan jawaban secara bersamaan tanpa race condition atau lock contention."
      },
      {
        title: "Session Token & Fraud Prevention Protocol",
        description: "Sistem verifikasi token dinamis dengan validasi waktu aktif ujian, pencegahan sesi ganda, dan proteksi integritas lembar jawaban siswa."
      },
      {
        title: "Modern Administration Panel (Filament v3)",
        description: "Panel kendali terpadu untuk manajemen bank soal hierarkis, distribusi kelas, alokasi guru penguji, dan rekapitulasi nilai otomatis."
      }
    ],
    details: {
      challenge:
        "Sekolah dan institusi pendidikan membutuhkan sistem ujian terkomputerisasi yang handal, mampu memitigasi kecurangan, mudah dikelola oleh dewan guru, dan tetap stabil saat diakses serentak oleh ratusan hingga ribuan siswa.",
      solution:
        "Membangun arsitektur backend kokoh menggunakan Laravel 12 dan PHP 8.4 dengan Filament v3 sebagai control panel guru/admin, diintegrasikan dengan aplikasi klien Flutter Web berlatensi rendah untuk pengalaman pengerjaan ujian yang mulus dan responsif.",
      impact: [
        "Mengotomatisasi 100% proses rekapitulasi dan penilaian hasil ujian secara real-time.",
        "Mengeliminasi biaya dan logistik pencetakan kertas ujian fisik secara total.",
        "Menjamin stabilitas konkurensi tinggi selama jam sibuk pelaksanaan ujian sekolah serentak.",
        "Mencegah kecurangan ujian dengan sistem tokenisasi sesi dan pemantauan status pengerjaan."
      ]
    },
    externalLink: {
      title: "GitHub Repository (Demo)",
      url: "https://github.com/risyalf/digiexam-demo"
    }
  },
];

const navLinks = [
  {
    name: "About",
    link: "#about",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Skills",
    link: "#skills",
  },
  {
    name: "Blog",
    link: "/blog",
  },
];

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const counterItems = [
  { value: 4, suffix: "+", label: "Years of Experience", detail: "Building backend systems since September 2021 across infrastructure, microservices, and data engineering." },
  { value: 3, suffix: "", label: "Companies", detail: "Vietnix (System Admin), Viettel High Tech (Software Engineer), SAP (Software Engineer)." },
  { value: 15, suffix: "K", label: "Max TPS at SAP", detail: "Peak throughput of the ETL data synchronization service at SAP SuccessFactors." },
  { value: 2, suffix: "", label: "Awards", detail: "Employee of the Year and Viettel Insight Eye Copyright Certificate at Viettel High Tech." },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
  },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Quality Focus",
    desc: "Delivering high-quality results while maintaining attention to every detail.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Reliable Communication",
    desc: "Keeping you updated at every step to ensure transparency and clarity.",
  },
  {
    imgPath: "/images/time.png",
    title: "On-Time Delivery",
    desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
  },
];

const techStackImgs = [
  {
    name: "Agentic Frameworks",
    imgPath: "/images/logos/langgraph.svg",
    detail:
      "Build multi-agent workflows with LangGraph & LangChain. Integrate LLMs into production pipelines with tracing via LangFuse.",
  },
  {
    name: "Backend Architecture",
    imgPath: "/images/logos/spring.svg",
    detail:
      "Design high-throughput services with Spring Boot & Java. Handle multithreading, concurrency, and ETL pipelines processing 15K+ TPS.",
  },
  {
    name: "Event-Driven Systems",
    imgPath: "/images/logos/kafka.svg",
    detail:
      "Architect event-driven microservices with Kafka. Build real-time data pipelines and async communication between distributed services.",
  },
  {
    name: "Observability",
    imgPath: "/images/logos/prometheus.svg",
    detail:
      "Set up full observability stacks: Prometheus for metrics, Tempo for traces, Loki for logs, Pyroscope for profiling, and ELK for search.",
  },
  {
    name: "Infrastructure",
    imgPath: "/images/logos/linux.svg",
    detail:
      "Manage Linux servers, VMware environments, and shell scripting. Performance testing with K6 and database tuning with PostgreSQL & ScyllaDB.",
  },
];

const techStackIcons = [
  {
    name: "React Developer",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python Developer",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Manager",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    imgPath: "/images/logos/logo-sap.jpeg",
    company: "SAP",
    title: "Software Engineer",
    date: "October 2025 - Present",
    focus: "Data Engineering & AI development",
    techStack: ["Spring", "Java", "Multithreading", "Concurrency", "SAP Hana", "Kafka", "LangChain", "LangGraph", "LangFuse"],
    responsibilities: [
      "Develop and maintain scalable ETL services at SAP SuccessFactors to synchronize data across platforms, reaching 15,000 TPS max throughput.",
      "Optimize processing performance using multithreaded Java, improving throughput and reducing latency in large-scale data flows.",
      "Ensure system reliability with fault-tolerant design patterns, including retry mechanisms, idempotency, and error handling strategies.",
      "Develop an AI agent for SuccessFactors using LangChain, LangGraph, and LangFuse for orchestration, workflow management, and observability.",
    ],
  },
  {
    imgPath: "/images/logos/logo-vietttel.jpg",
    company: "Viettel High Tech",
    title: "Software Engineer",
    date: "October 2022 - October 2025",
    focus: "Microservices & Platform Engineering",
    techStack: ["Spring Boot", "PostgreSQL", "ScyllaDB", "Netty", "Kafka", "K6", "ELK", "Prometheus", "Tempo", "Loki", "Pyroscope"],
    responsibilities: [
      "Designed and implemented video streaming for Camera Platform with Netty using HLS and RTSP protocols; designed and maintained RESTful microservices with Spring Boot.",
      "Designed and implemented event and recording video management microservices to handled events and records from surveillance cameras.",
      "Applied microservice best practices including API gateway, CQRS, and Event Sourcing; integrated CI/CD pipelines with GitLab Runner, Jenkins, and Helm.",
      "Set up full observability stacks (ELK, Prometheus, Grafana, Tempo, Loki) and deployed microservices to Kubernetes across dev, staging, and production environments.",
    ],
  },
  {
    imgPath: "/images/logos/logo-vietnix.png",
    company: "Vietnix",
    title: "System Engineer",
    date: "September 2021 - June 2022",
    focus: "Infrastructure & Server Management",
    techStack: ["VMware Center", "Linux", "Windows Server", "Shell Scripting"],
    responsibilities: [
      "Managed and maintained server infrastructure at Vietnix, ensuring high availability and security of hosted services.",
      "Installed, configured, and administered Linux and Windows servers, including hosting control panels (cPanel, DirectAdmin, aaPanel).",
      "Administered virtual private servers via type 1 hypervisors (Proxmox, VMware ESXi) and conducted regular system audits and performance monitoring.",
      "Wrote Linux shell scripts to automate routine server administration and maintenance tasks.",
    ],
  },
];

const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];

const testimonials = [
  {
    name: "Esther Howard",
    mentions: "@estherhoward",
    review:
      "I can’t say enough good things about Dat. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Wade Warren",
    mentions: "@wadewarren",
    review:
      "Working with Dat was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Guy Hawkins",
    mentions: "@guyhawkins",
    review:
      "Collaborating with Dat was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Dat's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Dat is the ideal partner.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Marvin McKinney",
    mentions: "@marvinmckinney",
    review:
      "Dat was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that’s both modern and easy to navigate. Fantastic work overall.",
    imgPath: "/images/client5.png",
  },
  {
    name: "Floyd Miles",
    mentions: "@floydmiles",
    review:
      "Dat’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional!",
    imgPath: "/images/client4.png",
  },
  {
    name: "Albert Flores",
    mentions: "@albertflores",
    review:
      "Dat was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend and backend dev are top-notch.",
    imgPath: "/images/client6.png",
  },
];

const socialImgs = [
  {
    name: "insta",
    imgPath: "/images/insta.png",
    link: "https://www.instagram.com/dattrannnnnn/",
  },
  {
    name: "fb",
    imgPath: "/images/fb.png",
    link: "https://www.facebook.com/dat.tran.702270/",
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
    link: "https://www.linkedin.com/in/dat-tran-b7197923a/",
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};

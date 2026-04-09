export interface Project {
  title: string;
  description: string;
  technologies: string[];
  topics: string[];
  date?: string;
  link?: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  period: string;
  details?: string[];
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export const personalInfo = {
  name: "Thua-Duc Nguyen",
  title: "Master's Student in CS · Software Engineer (AI/ML)",
  email: "ducnguyen.work.de@gmail.com",
  location: "Munich, Germany",
  website: "thuaduc.github.io",
  github: "github.com/thuaduc",
  linkedin: "linkedin.com/in/thua-duc-nguyen-014634221",
  summary:
    "Computer Science Master's student at TUM with a focus on Artificial Intelligence. Experienced in full-stack software engineering and AI/ML systems. Currently working at Celonis on backend services for Insight Explorer.",
};

export const experiences: Experience[] = [
  {
    title: "Working Student – Software Engineer (AI/ML)",
    company: "Celonis",
    location: "Munich, Germany",
    period: "Feb 2025 – Present",
    bullets: [
      "Developed and optimized Cohort Trend Insights scoring engines, implementing Exponential Moving Average (EMA) models and SUM metric support for high-dimensional time-series data.",
      "Developed and maintained backend services for Insight Explorer.",
      "Enhanced the AI agent's reasoning capabilities by implementing LangChain Deep Agent, utilizing a tool-driven prompt strategy to integrate Knowledge Lake for high-context data retrieval.",
    ],
  },
  {
    title: "Working Student – Fullstack Software Engineer",
    company: "Check24 GmbH",
    location: "Munich, Germany",
    period: "Sept 2023 – Nov 2024",
    bullets: [
      "Developed and maintained a high-performance data aggregation application processing over 100,000 data points per hour, leveraging goroutines for concurrency.",
      "Implemented a metric service to measure key performance indicators like API calls, data processing, and database health; integrated with Datadog and AWS CloudWatch for real-time monitoring.",
      "Developed front-end essential features, enhancing product functionality and user experience.",

    ],
  },
  {
    title: "Teaching Assistant Tutor",
    company: "Technical University of Munich (TUM)",
    location: "Munich, Germany",
    period: "Apr 2023 – Sept 2023",
    bullets: [
      "Tutor for the course \"IN0005: Basics of Computer Architecture.\"",
      "Led tutorials and helped students understand basic concepts of C programming and Linux systems.",
      "Graded project papers and implementations.",
    ],
  },
];

export const education: Education[] = [
  {
    degree: "Master of Science in Computer Science",
    school: "Technical University of Munich (TUM)",
    location: "Munich, Germany",
    period: "Oct 2024 – Present",
    details: ["Focus on Artificial Intelligence"],
  },
  {
    degree: "Bachelor of Science in Computer Science",
    school: "Technical University of Munich (TUM)",
    location: "Munich, Germany",
    period: "Oct 2021 – Oct 2024",
    details: [
      "GPA: 2.5 (German scale, best = 1.0; ~3.4 US equivalent)",
      "Thesis: Lock-free concurrent range lock enabling multiple processes to concurrently access disjoint parts of a shared object — 3× performance improvement over state-of-the-art solutions.",
    ],
  },
];

export const skills = {
  "Programming": ["Python", "C", "C++", "JavaScript", "TypeScript", "Golang"],
  "Frameworks & Libraries": ["ReactJS", "NestJS", "Pandas", "NumPy", "PyTorch", "TensorFlow", "JAX"],
  "Tools": ["Linux", "macOS", "Git", "Docker", "Jupyter Notebook", "Node.js"],
  "Languages": ["German (fluent)", "English (fluent)", "Vietnamese (native)"],
};

export const projects: Project[] = [
  {
    title: "Humanoid Robotic Research Project",
    description:
      "Developed equivariant graph neural network (E-GNN) policies incorporating robot kinematic structure and E(3) symmetry, replacing standard MLPs. E-GNNs exploit relational dependencies between joints and body parts, achieving faster convergence and better generalization. Trained policies using PPO, SAC, and TD3 in MuJoCo with PyTorch.",
    technologies: ["Python", "PyTorch", "MuJoCo", "PPO", "SAC", "TD3"],
    topics: ["Robotic", "Research"],
    date: "2025",
  },
  {
    title: "Sim-to-Real – TUM Practical Course",
    description:
      "Designed a 6-DOF Robco Manipulator in MuJoCo with complete specifications: meshes, joints, actuators, sensors, reward functions, and observation spaces for reinforcement learning. Trained pick-and-place policies using PPO and SAC on A100 GPUs with JAX, then deployed to real hardware.",
    technologies: ["Python", "JAX", "MuJoCo", "PPO", "SAC"],
    topics: ["Robotic", "Research"],
    date: "2026",
  },
  {
    title: "Hackathon – Humanoid and Manipulation",
    description:
      "Participated in a robotics hackathon with dual-arm Franka Panda setups, multi-camera sensing, Meta Quest 3 teleoperation, and RTX-5090 workstations. Collected and post-processed demonstration data into LeRobot format, trained and deployed imitation learning policies via JupyterHub and a GRPC-based control stack.",
    technologies: ["Python", "LeRobot", "Imitation Learning", "GRPC"],
    topics: ["Robotic"],
    date: "2025",
  },
  {
    title: "Interdisciplinary Project – TUM",
    description:
      "Topic: Inductive Graph Learning for GNN Surrogates for Optimizing Transportation. Implemented and trained a large-scale EIGN Graph Neural Network in PyTorch for urban traffic prediction, leveraging SLURM (sbatch) on an HPC cluster for multi-day training runs.",
    technologies: ["Python", "PyTorch", "GNN", "SLURM", "HPC"],
    topics: ["Research"],
    date: "2025",
  },
  {
    title: "PDF Parser",
    description:
      "Developed a PDF parsing pipeline to extract structured data from Construction Project Lists of Open Points (LOP). Pipeline: PDF → LLM → structured text → JSON → Pydantic. Leveraged Claude 3.5 Sonnet with advanced prompting techniques (Persona, Few-Shot, Output Formatting, Demonstrative Prompting) for accurate structured outputs.",
    technologies: ["Python", "Anthropic Claude", "Pydantic", "LLM"],
    topics: ["Software"],
    date: "2025",
  },
  {
    title: "Recommendation Service",
    description:
      "Built a personalized question recommendation service using FastAPI and SQLite3. Implemented a content-based algorithm using TF-IDF for textual similarity, metadata matching (age, gender), and exponential decay scoring to deliver top-3 relevant question suggestions.",
    technologies: ["Python", "FastAPI", "SQLite", "TF-IDF", "scikit-learn", "Pydantic"],
    topics: ["Software"],
    date: "2024",
  },
  {
    title: "Gossip – P2P Anonymous VoIP",
    description:
      "Developed the Gossip module for a peer-to-peer anonymous VoIP application. Designed and implemented peer information dissemination for real-time network updates and active peer maintenance using best-effort data exchange. Integrated Proof of Work (PoW) to protect against Sybil and Eclipse attacks.",
    technologies: ["Python", "P2P", "Networking", "Proof of Work"],
    topics: ["Software"],
    date: "2024",
    link: "https://github.com/TrungNguyen1409/p2p_gossip",
  },
  {
    title: "Concurrent Range Locking – Bachelor Thesis",
    description:
      "Proposed a new lock-free concurrent range lock, enabling multiple processes to concurrently access disjoint parts of a large shared object. Results show at least 3× performance improvement over state-of-the-art solutions.",
    technologies: ["C", "C++", "Concurrency", "Lock-free Data Structures"],
    topics: ["Research"],
    date: "2024",
    link: "https://github.com/thuaduc/concurrent-range-locking",
  },
  {
    title: "Data Structure Engineering – TUM Practical Course",
    description:
      "Designed and implemented a Tandem Counting Bloom Filter, an advanced variation of the Bloom Filter. Achieved an 8–12× reduction in false positive rate compared to prior approaches. First experience conducting research and critically analyzing academic papers.",
    technologies: ["C++", "Data Structures", "Probabilistic Algorithms"],
    topics: ["Research"],
    date: "2024",
  },
  {
    title: "Check24 Holiday Challenge",
    description:
      "Built a holiday search platform handling 100 million records. Users can search hotel offers and filter by date, guests, price range, and more. Frontend in ReactJS with Material-UI, backend in Java with Spring Boot, backed by PostgreSQL.",
    technologies: ["JavaScript", "ReactJS", "Java", "Spring Boot", "PostgreSQL", "Docker"],
    topics: ["Software"],
    date: "2023",
    link: "https://github.com/thuaduc/check24-challenge-holiday",
  },
  {
    title: "Cloudflight Coding Contest 2023",
    description: "Achieved 3rd place in the Munich Cloudflight Coding Contest.",
    technologies: ["Algorithms", "Competitive Programming"],
    topics: ["Contest"],
    date: "2023",
  },
];

export const certificates: Certificate[] = [
  {
    title: "Prompt Engineering for Everyone",
    issuer: "IBM Developer Skills Network",
    date: "Dec 2024",
    description:
      "Basic prompting techniques: persona, interview pattern, few-shot, chain of thought, tree of thought.",
  },
  {
    title: "Advanced Learning Algorithms",
    issuer: "Coursera / DeepLearning.AI",
    date: "Dec 2024",
    description:
      "Training neural networks with TensorFlow for multi-class classification.",
  },
  {
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "Coursera / DeepLearning.AI",
    date: "Dec 2024",
    description:
      "Linear regression, logistic regression using NumPy and scikit-learn for prediction and binary classification.",
  },
];

export const allTopics = Array.from(new Set(projects.flatMap((p) => p.topics))).sort();

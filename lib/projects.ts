export interface Project {
  emoji: string;
  logo?: string;
  title: string;
  description: string;
  tags: string[];
  categories: string[];
  slug: string;
}

export interface ProjectLink {
  type: "youtube" | "redirect" | "github";
  value: string;
  githubRepo?: string;
  liveUrl?: string;
}

export const CATEGORIES = [
  "Machine Learning",
  "Mobile Development",
  "Next.js",
  "React",
  "Python",
  "C",
  "C++",
  "Java",
  "C#",
  "Automation",
];

export const projects: Project[] = [
  {
    emoji: "",
    logo: "/dai-logo.png",
    title: "DePaul AI — Official Website",
    description:
      "official website of the DePaul AI student organization at DePaul University.",
    tags: ["next.js", "react", "typescript"],
    categories: ["Next.js", "React"],
    slug: "depaul-ai-website",
  },
  {
    emoji: "🕌",
    title: "kaza namazlarim",
    description:
      "a web app for tracking and managing missed (qada) prayers, built with next.js, supabase, and clerk auth.",
    tags: [
      "next.js",
      "react",
      "typescript",
      "supabase",
      "clerk",
      "tailwindcss",
      "shadcn",
      "next-intl",
    ],
    categories: ["Next.js", "React"],
    slug: "kaza-namazlarim",
  },
  {
    emoji: "🍿",
    title: "PopDuel",
    description:
      "expo react native app for ios and android — social movie-picking for group hangouts. host a room, friends join with a code, and movies battle head-to-head in a bracket until one winner remains. no accounts needed, still in active development.",
    tags: ["react native", "expo", "typescript", "firebase", "tmdb api"],
    categories: ["Mobile Development", "React"],
    slug: "popduel",
  },
  {
    emoji: "☄️",
    title: "nasa asteroid classifier",
    description:
      "binary classifier that predicts whether a near-earth asteroid is hazardous using a keras neural network trained on nasa data. features a fastapi backend and next.js frontend, both deployed on railway.",
    tags: [
      "python",
      "tensorflow",
      "keras",
      "fastapi",
      "next.js",
      "railway",
      "scikit-learn",
      "pandas",
    ],
    categories: ["Machine Learning", "Next.js", "React", "Python"],
    slug: "nasa-asteroid-classifier",
  },
  {
    emoji: "📆",
    title: "occasion",
    description:
      "full-stack event management platform with user authentication, real-time event creation, category filtering, and collaborative planning features. built with modern web technologies and deployed on vercel.",
    tags: [
      "next.js",
      "typescript",
      "shadcn/ui",
      "prisma",
      "railway / mySQL",
      "clerk auth",
      "tailwind",
    ],
    categories: ["Web Development", "Next.js", "React"],
    slug: "occasion",
  },
  {
    emoji: "📊",
    title: "masters tracker",
    description:
      "comprehensive grad school application tracker with database management, deadline tracking, and program comparison features. includes password-protected personal tracker and demo mode for showcasing.",
    tags: [
      "next.js 15",
      "typescript",
      "mantine ui",
      "prisma",
      "postgresql",
      "vercel",
    ],
    categories: ["Web Development", "Next.js", "React"],
    slug: "masters-tracker",
  },
  {
    emoji: "🎥",
    title: "Movie Recommender AI",
    description:
      "A Next.js movie recommender that encodes each movie's metadata/overview using a pretrained SentenceTransformer (all-MiniLM-L6-v2) into embedding vectors, then recommends similar movies by cosine similarity computed as a dot product on normalized embeddings.",
    tags: [
      "react",
      "node.js",
      "next.js",
      "tensorflow",
      "transformers",
      "embedding",
      "python",
      "numpy",
      "pandas",
      "keras",
    ],
    categories: [
      "Machine Learning",
      "Web Development",
      "Next.js",
      "React",
      "Python",
    ],
    slug: "ai-movie-recommender",
  },
  {
    emoji: "🤖",
    title: "Telegram Habit Tracker Bot",
    description:
      "telegram bot for tracking daily/weekly habits with a simple command-based UX. supports habit dashboard, add/delete/update habits, weekly goals, and streak updates. data is stored in supabase.",
    tags: [
      "python",
      "python-telegram-bot",
      "supabase",
      "postgresql",
      "python-dotenv",
    ],
    categories: ["Python", "Automation"],
    slug: "telegram-habit-tracker-bot",
  },
  {
    emoji: "👤",
    title: "AI Age Estimator",
    description:
      "web app that estimates age from photos using face detection and a pre-trained neural network. built with Next.js frontend and Flask backend serving an EfficientNet-based Keras model for accurate age prediction.",
    tags: [
      "next.js",
      "react",
      "face-api.js",
      "flask",
      "keras",
      "efficientnet",
      "python",
      "neural networks",
    ],
    categories: ["Machine Learning", "Next.js", "React", "Python"],
    slug: "ai-age-estimator",
  },
  {
    emoji: "🇹🇷",
    title: "Turkish Name Classifier",
    description:
      "neural network that classifies Turkish vs non-Turkish names using character-level tokenization and bidirectional LSTM. built to identify Turkish students from the dean's list for Turkish Student Association event invitations.",
    tags: [
      "python",
      "tensorflow",
      "keras",
      "LSTM",
      "neural networks",
      "pandas",
      "scikit-learn",
    ],
    categories: ["Machine Learning", "Python"],
    slug: "turkish-name-classifier",
  },
  {
    emoji: "🔍",
    title: "Biometric Attribute Classifier",
    description:
      "real-time facial attribute classification using a neural network. uses OpenCV for face detection with Haar Cascades and a trained Keras model for binary classification with live camera feed and confidence scores.",
    tags: [
      "python",
      "tensorflow",
      "keras",
      "opencv",
      "computer vision",
      "neural networks",
    ],
    categories: ["Machine Learning", "Python"],
    slug: "biometric-attribute-classifier",
  },
  {
    emoji: "🖼️",
    title: "Image Editor",
    description:
      "desktop image editor with real-time adjustments for brightness, contrast, sharpness, and color. built with Tkinter GUI framework and PIL for image processing, featuring live preview and save functionality.",
    tags: ["python", "tkinter", "PIL", "pillow", "ttkbootstrap", "GUI"],
    categories: ["Python"],
    slug: "image-editor",
  },
  {
    emoji: "💬",
    title: "Chat Application",
    description:
      "real-time messaging application with socket-based server-client architecture. features username selection, user count display, message/nudge/image sharing, chat history persistence, macOS notifications, and sound effects.",
    tags: [
      "python",
      "tkinter",
      "sockets",
      "networking",
      "playsound",
      "imgur API",
    ],
    categories: ["Python"],
    slug: "chat-app",
  },
  {
    emoji: "📚",
    title: "Library Management System",
    description:
      "full-featured library management software with role-based access for admins and users. includes book inventory management, rental tracking with SQLite database, email notifications for returns, and comprehensive authentication system.",
    tags: ["python", "tkinter", "sqlite3", "database", "GUI"],
    categories: ["Python"],
    slug: "library-management-system",
  },
];

export const projectLinks: Record<string, ProjectLink> = {
  "nasa-asteroid-classifier": {
    type: "youtube",
    value: "6ZqjnTa1Z7k",
    githubRepo: "https://github.com/enesdemirelus/nasa-asteroid-classifier",
  },
  occasion: {
    type: "youtube",
    value: "pw8qAaRDEaw",
    githubRepo: "https://github.com/enesdemirelus/occasion",
  },
  "masters-tracker": { type: "youtube", value: "aqs_lUsFdGQ" },
  "ai-movie-recommender": {
    type: "youtube",
    value: "gcFaCIdtQUY",
    githubRepo: "https://github.com/enesdemirelus/movie-recommender-AI",
  },
  "telegram-habit-tracker-bot": {
    type: "github",
    value: "https://github.com/enesdemirelus/Telegram-Habit-Tracker-Bot",
  },
  "ai-age-estimator": {
    type: "youtube",
    value: "w_g_y8mQuu0",
    githubRepo: "https://github.com/enesdemirelus/ai-age-estimator",
  },
  "turkish-name-classifier": {
    type: "youtube",
    value: "U1I49a3URWw",
    githubRepo: "https://github.com/enesdemirelus/turkish-name-classifier",
  },
  "biometric-attribute-classifier": {
    type: "youtube",
    value: "hJq4nrujeUc",
    githubRepo:
      "https://github.com/enesdemirelus/ML-Biometric-Attribute-Classification",
  },
  "image-editor": {
    type: "youtube",
    value: "2uD828U2_5w",
    githubRepo: "https://github.com/enesdemirelus/imageEditor",
  },
  "chat-app": {
    type: "youtube",
    value: "8E6c6BAzsyo",
    githubRepo: "https://github.com/enesdemirelus/chatApp",
  },
  "library-management-system": {
    type: "youtube",
    value: "b5RazIDovmw",
    githubRepo: "https://github.com/enesdemirelus/library_management_system",
  },
  "kaza-namazlarim": {
    type: "github",
    value: "https://github.com/enesdemirelus/kaza-namazlarim",
    liveUrl: "https://kazanamazlarim.com",
  },
  "depaul-ai-website": {
    type: "github",
    value: "https://github.com/DePaul-AI/depaul-ai-website",
    liveUrl: "https://depaulai.org/",
  },
  popduel: {
    type: "github",
    value: "https://github.com/enesdemirelus/ReelDeel",
  },
};

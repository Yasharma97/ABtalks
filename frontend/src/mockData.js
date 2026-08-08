export const initialStudentProfiles = {
  newbie: {
    currentStreak: 0,
    longestStreak: 0,
    completedCount: 0,
    missedCount: 0,
    level: 1,
    xp: 0,
    badges: [],
    profileState: "newbie"
  },
  steady: {
    currentStreak: 18,
    longestStreak: 18,
    completedCount: 18,
    missedCount: 0,
    level: 4,
    xp: 1800,
    badges: ["First Commit", "7-Day Warrior", "14-Day Overlord", "LinkedIn Influencer"],
    profileState: "steady"
  },
  missed: {
    currentStreak: 0,
    longestStreak: 12,
    completedCount: 12,
    missedCount: 1,
    level: 3,
    xp: 1200,
    badges: ["First Commit", "Early Bird"],
    profileState: "missed"
  }
};

export const baseTasks = [
  {
    dayId: 1,
    title: "Git Started & Workspace Setup",
    description: "Set up your Git workspace, sign in to GitHub, create a repository named 'abtalks-60-day-challenge', and submit your first markdown README file detailing your track goals.",
    challenge: "Create a repo, add README.md, commit, push, write a LinkedIn post stating your track choice, and submit links.",
    difficulty: "Easy"
  },
  {
    dayId: 2,
    title: "HTML5 Semantics & Structure",
    description: "Build a semantic personal resume webpage using standard HTML5 tags like header, section, footer, article, nav, and main.",
    challenge: "Write clean HTML with no inline styling, validate your markup, commit, and post your resume screenshot.",
    difficulty: "Easy"
  },
  {
    dayId: 3,
    title: "CSS Variables & Layouts",
    description: "Style your resume website using custom CSS variables for theme colors, margin hierarchies, and clean box model configurations.",
    challenge: "Define a dark/light color palette inside :root and style the resume to look modern and readable.",
    difficulty: "Easy"
  },
  {
    dayId: 4,
    title: "Responsive Design & Flexbox",
    description: "Utilize CSS Flexbox rules to convert your resume sections into auto-fitting layouts that scale beautifully on a 390px mobile viewport.",
    challenge: "Ensure no text overflows, buttons adjust size, and layout shifts to single-column on mobile screen limits.",
    difficulty: "Easy"
  },
  {
    dayId: 5,
    title: "CSS Grid & Dashboard Layouts",
    description: "Implement CSS Grid properties to develop a dashboard template card containing status updates, progress bars, and calendar widgets.",
    challenge: "Use grid-template-areas to layout cards neatly and keep elements fully aligned on mobile.",
    difficulty: "Easy"
  },
  {
    dayId: 6,
    title: "JavaScript ES6 Essentials",
    description: "Explore new JavaScript syntax features including destructuring, template literals, arrow functions, and array methods (map, filter, reduce).",
    challenge: "Solve a set of 5 algorithmic data manipulation exercises using ES6 features without writing traditional loops.",
    difficulty: "Easy"
  },
  {
    dayId: 7,
    title: "DOM Manipulation & Event Listeners",
    description: "Interact with webpage HTML elements programmatically: handle input typing, listen to click events, and modify text content on the fly.",
    challenge: "Build an interactive list builder that lets users add, check-off, and remove text tags with animations.",
    difficulty: "Easy"
  },
  {
    dayId: 8,
    title: "Simple Interactive Calculator",
    description: "Assemble a functional math calculator that registers button presses, evaluates simple expressions, and showcases results.",
    challenge: "Avoid using eval(). Handle edge cases like division by zero and input decimal validation.",
    difficulty: "Easy"
  },
  {
    dayId: 9,
    title: "Local Storage & Persistence",
    description: "Save web page application settings locally so user configurations survive browser refreshes or close operations.",
    challenge: "Persist a to-do list items array to localStorage and load it back on document startup.",
    difficulty: "Easy"
  },
  {
    dayId: 10,
    title: "Asynchronous JavaScript & Promises",
    description: "Understand execution delays, async/await wrappers, promise states, callbacks, and handling network timeouts.",
    challenge: "Create a dummy fetch utility that resolves after 2 seconds or rejects if a random number check fails, handling errors gracefully.",
    difficulty: "Easy"
  },
  {
    dayId: 11,
    title: "Fetch API & Public REST Endpoints",
    description: "Send network HTTP requests to retrieve information from public APIs and display it in raw JSON or simple blocks.",
    challenge: "Fetch data from the JSONPlaceholder API and display a list of 10 users in a simple grid.",
    difficulty: "Easy"
  },
  {
    dayId: 12,
    title: "GitHub Profile Explorer UI",
    description: "Develop a single-page card viewer that queries the public GitHub API for a user, displaying their avatar, repositories, follower counts, and starred repos in a premium glassmorphic grid.",
    challenge: "Create an input field for a GitHub username, pull user profile via Fetch API, render repositories sorted by stars, and handle errors for non-existent users gracefully.",
    difficulty: "Easy"
  },
  {
    dayId: 13,
    title: "Debouncing & Search Optimization",
    description: "Add time-delay triggers on search bar keyboard typing to minimize redundant API fetch calls during typing.",
    challenge: "Implement a 300ms debounce interval helper to filter a local mock user names list dynamically.",
    difficulty: "Medium"
  },
  {
    dayId: 14,
    title: "ChartJS Data Visualizations",
    description: "Incorporate charting packages to visualize student performance metrics on canvas-drawn dynamic charts.",
    challenge: "Render a bar chart of 6 tracks completion percentage and a line chart of daily commute times.",
    difficulty: "Medium"
  },
  {
    dayId: 15,
    title: "Interactive Weather App UI",
    description: "Communicate with OpenWeatherMap APIs to fetch city coordinates and render live temperatures, humidity, and custom sky icons.",
    challenge: "Integrate geolocation browser APIs to load weather details automatically for the student's current location.",
    difficulty: "Medium"
  },
  {
    dayId: 16,
    title: "Custom Audio Player Controls",
    description: "Construct custom styling skins for standard HTML5 audio elements including progress scrubber, play buttons, and volume bars.",
    challenge: "Bind standard audio tag methods (play, pause, duration, currentTime) to custom CSS-styled elements.",
    difficulty: "Medium"
  },
  {
    dayId: 17,
    title: "Regex Form Validator",
    description: "Write complex regular expressions to validate user input details on registration forms (email, strong passwords, URL structures).",
    challenge: "Provide real-time validation feedback to users as they type, color-coding input borders in response.",
    difficulty: "Medium"
  },
  {
    dayId: 18,
    title: "Kanban Board Drag & Drop",
    description: "Design an interactive project status board with multiple columns (To Do, In Progress, Done) and draggable task cards.",
    challenge: "Use HTML5 Drag and Drop APIs or custom mouse events to move cards across columns and save states to localStorage.",
    difficulty: "Medium"
  },
  {
    dayId: 19,
    title: "Theme Controller & Light Mode",
    description: "Add configuration toggles allowing users to shift styles smoothly from dark space mode to sleek high-contrast light mode.",
    challenge: "Use CSS variables, custom root classes, and persist selected theme states across sessions.",
    difficulty: "Medium"
  },
  {
    dayId: 20,
    title: "Introduction to React & Vite Setup",
    description: "Initialize a React template project using Vite bundlers. Understand components,JSX markup, and folders.",
    challenge: "Configure a React project, delete templates, create your first component showing local time.",
    difficulty: "Medium"
  },
  {
    dayId: 21,
    title: "React State & Props",
    description: "Define dynamic states using useState hooks. Pass properties across component trees.",
    challenge: "Build an dynamic item counter that accepts minimum and maximum threshold properties.",
    difficulty: "Medium"
  },
  {
    dayId: 22,
    title: "Handling Forms in React",
    description: "Control inputs, select boxes, and textareas using component state attributes. Handle submit validation rules.",
    challenge: "Develop a multi-step user survey form that gathers track details and stores inputs in a single object.",
    difficulty: "Medium"
  },
  {
    dayId: 23,
    title: "useEffect Hooks & Backend APIs",
    description: "Handle lifecycle side effects. Pull data from APIs when components mount and clean up listeners.",
    challenge: "Fetch data from a public endpoint inside useEffect and handle loading/error UI states.",
    difficulty: "Medium"
  },
  {
    dayId: 24,
    title: "React Context API for Global State",
    description: "Provide globally shared state values without passing variables manually down multiple component levels.",
    challenge: "Create a UserProfileProvider to store the active user configuration and display it in separate header/footer elements.",
    difficulty: "Medium"
  },
  {
    dayId: 25,
    title: "Custom React Hooks",
    description: "Refactor reusable stateful logic out of components and bundle them in custom hooks (e.g. useFetch, useLocalStorage).",
    challenge: "Code a useWindowSize hook that listens to resizing events and exposes current width/height parameters.",
    difficulty: "Medium"
  },
  {
    dayId: 26,
    title: "Tailwind CSS Integration",
    description: "Install Tailwind utilities inside Vite. Style React widgets using utility classes directly.",
    challenge: "Redesign your resume page from Day 2 using Tailwind utility classes.",
    difficulty: "Medium"
  },
  {
    dayId: 27,
    title: "Framer Motion Animations",
    description: "Build high-fidelity fluid transitions, hover expansions, slide animations, and exit states in React.",
    challenge: "Animate a modal layout so it pops up, fades-in, and scales down smoothly when closed.",
    difficulty: "Medium"
  },
  {
    dayId: 28,
    title: "React Router Setup",
    description: "Install react-router-dom. Define client-side paths and structure core links.",
    challenge: "Map separate URLs for Home, Projects, and Contact pages, and compile navigation paths.",
    difficulty: "Medium"
  },
  {
    dayId: 29,
    title: "Dynamic Route Parameters",
    description: "Read dynamic route parameters from paths (e.g., /project/:id) to retrieve specific item details.",
    challenge: "Map a detail page that reads a project's id from the URL and fetches metadata corresponding to that id.",
    difficulty: "Medium"
  },
  {
    dayId: 30,
    title: "Mid-Term Capstone: Portfolio App",
    description: "Combine frontend skills to build a complete portfolio website containing about, projects showcase, dynamic navigation, and responsive layouts.",
    challenge: "Assemble your portfolio, optimize performance, and deploy it to a live hosting service (Vercel).",
    difficulty: "Medium"
  },
  {
    dayId: 31,
    title: "Node.js & NPM Fundamentals",
    description: "Install Node runtime environment. Understand require/import statements, core system modules, and package dependencies.",
    challenge: "Write a node script that parses files in a folder and saves their sizes to a summary JSON log.",
    difficulty: "Medium"
  },
  {
    dayId: 32,
    title: "Express.js Basics & Routing",
    description: "Create a basic HTTP server using Express.js framework. Map REST routes for GET, POST, and DELETE requests.",
    challenge: "Build an Express server returning a JSON list of challenge tracks at /api/tracks.",
    difficulty: "Medium"
  },
  {
    dayId: 33,
    title: "Middleware in Express",
    description: "Understand request interception, logging middlewares, error handlers, and parsing JSON request bodies.",
    challenge: "Write a custom logging middleware that outputs current timestamp, HTTP verb, and response durations for each request.",
    difficulty: "Medium"
  },
  {
    dayId: 34,
    title: "REST API Design Best Practices",
    description: "Structure API models logically. Return proper HTTP response status codes (200, 201, 400, 404, 500) and headers.",
    challenge: "Develop an endpoint with parameter validations that returns 400 bad request if parameters are empty.",
    difficulty: "Medium"
  },
  {
    dayId: 35,
    title: "MongoDB & Mongoose Schemas",
    description: "Establish cluster connections with MongoDB Atlas. Create schema objects using Mongoose ODM libraries.",
    challenge: "Define a StudentSchema mapping name, streak, track, and completed array fields.",
    difficulty: "Medium"
  },
  {
    dayId: 36,
    title: "CRUD Operations with MongoDB",
    description: "Implement complete Create, Read, Update, and Delete actions on MongoDB data documents inside controllers.",
    challenge: "Create API endpoints to dynamically add, edit, fetch, and delete tasks.",
    difficulty: "Medium"
  },
  {
    dayId: 37,
    title: "Authentication: JWT & Bcrypt",
    description: "Hash student password credentials using bcrypt. Generate signed JWT tokens upon login.",
    challenge: "Code user registration and sign-in handlers that return auth tokens to clients.",
    difficulty: "Hard"
  },
  {
    dayId: 38,
    title: "Authorization Roles in Express",
    description: "Write authorization middleware functions that limit access to specific routes depending on credentials.",
    challenge: "Restrict access on /api/admin paths to admin tokens only, returning 403 Forbidden for students.",
    difficulty: "Hard"
  },
  {
    dayId: 39,
    title: "Uploading Files with Multer",
    description: "Handle multipart form submissions to upload image assets to backend folders.",
    challenge: "Build a profile avatar upload endpoint that saves files to a local uploads directory.",
    difficulty: "Hard"
  },
  {
    dayId: 40,
    title: "Full Stack MERN Integration",
    description: "Connect your React frontend project to retrieve data from your Node Express API server.",
    challenge: "Integrate React dashboard components to list real tasks retrieved from Express MongoDB servers.",
    difficulty: "Hard"
  },
  {
    dayId: 41,
    title: "Introduction to SQL & PostgreSQL",
    description: "Install PostgreSQL database clusters locally. Learn SQL queries to build tables and insert values.",
    challenge: "Create tables for students and tracks, and write raw SQL insert commands.",
    difficulty: "Medium"
  },
  {
    dayId: 42,
    title: "SQL Joins & Relationships",
    description: "Understand foreign key constraints, one-to-many relationships, and querying tables using INNER JOIN syntax.",
    challenge: "Query students and merge their track names using INNER JOIN commands.",
    difficulty: "Medium"
  },
  {
    dayId: 43,
    title: "Spring Boot Java Setup",
    description: "Configure Java Gradle project, understand Spring architecture annotations, and start local servers.",
    challenge: "Initialize Spring Boot project, define a basic REST controller, and boot it on port 8080.",
    difficulty: "Medium"
  },
  {
    dayId: 44,
    title: "Spring Boot REST Controllers",
    description: "Map paths using @GetMapping, @PostMapping, and @RequestBody. Handle HTTP status codes.",
    challenge: "Code a ChallengeController exposing endpoints to fetch profile lists.",
    difficulty: "Medium"
  },
  {
    dayId: 45,
    title: "Spring Data JPA & Hibernate",
    description: "Map database tables to Java entity classes, create repository interfaces, and search records dynamically.",
    challenge: "Create a Task Entity class, establish repositories, and save tasks to H2 databases.",
    difficulty: "Medium"
  },
  {
    dayId: 46,
    title: "Spring Boot Dependency Injection",
    description: "Understand @Service, @Component, and @Autowired annotations to share service instances across objects.",
    challenge: "Refactor database fetch queries out of controllers and bundle them inside a modular ChallengeService.",
    difficulty: "Medium"
  },
  {
    dayId: 47,
    title: "Unit Testing in Spring Boot (JUnit)",
    description: "Write JUnit test methods to verify backend calculations and controller mapping outputs.",
    challenge: "Write test cases checking if getTask() returns correct status on day 12 task lookup.",
    difficulty: "Medium"
  },
  {
    dayId: 48,
    title: "Docker Containerization Basics",
    description: "Write custom Dockerfile configurations, compile app images, and execute container environments.",
    challenge: "Create a Dockerfile bundling your Spring Boot JAR, run it, and access port 8080.",
    difficulty: "Medium"
  },
  {
    dayId: 49,
    title: "Docker Compose for Multi-Containers",
    description: "Orchestrate multi-container setups linking frontend apps, backend APIs, and database engines.",
    challenge: "Write a docker-compose.yml file mapping your backend, frontend, and PostgreSQL services.",
    difficulty: "Hard"
  },
  {
    dayId: 50,
    title: "GitHub Actions CI/CD Pipelines",
    description: "Automate testing, package building, and deployment workflows using GitHub Actions configuration files.",
    challenge: "Write a workflow file (.github/workflows) that compiles the backend and runs checks on git push.",
    difficulty: "Hard"
  },
  {
    dayId: 51,
    title: "Deploying to AWS S3 & CloudFront",
    description: "Deploy compiled static React assets to AWS S3 buckets and configure CloudFront CDNs for worldwide edge delivery.",
    challenge: "Upload build files to S3, hook up CloudFront distribution, and access custom DNS layouts.",
    difficulty: "Hard"
  },
  {
    dayId: 52,
    title: "Deploying Backend to AWS EC2",
    description: "Provision AWS EC2 virtual machines, clone repository, configure Java/Node runtimes, and execute backend servers.",
    challenge: "Launch EC2, configure security groups mapping port 8080, and run Spring Boot bootJar in the background.",
    difficulty: "Hard"
  },
  {
    dayId: 53,
    title: "Nginx Reverse Proxy Setup",
    description: "Configure Nginx server rules to act as a reverse proxy, mapping public port 80 to backend port 8080.",
    challenge: "Install Nginx, modify default configuration mapping /api requests to localhost:8080, and reload settings.",
    difficulty: "Hard"
  },
  {
    dayId: 54,
    title: "Redis Caching Layer Basics",
    description: "Install Redis clusters. Cache frequently queried REST API data responses in memory to lower database query overhead.",
    challenge: "Configure Redis in Spring Boot, cache task retrieval lookups, and observe speed improvements.",
    difficulty: "Hard"
  },
  {
    dayId: 55,
    title: "WebSockets and Live Communication",
    description: "Implement live bi-directional server communication channels using WebSockets protocols.",
    challenge: "Build a live co-working ticker overlay that outputs live commit submissions as they occur.",
    difficulty: "Hard"
  },
  {
    dayId: 56,
    title: "Performance Profiling & Lighthouse",
    description: "Audit web pages using Google Lighthouse, analyzing image optimization, script load times, and compression styles.",
    challenge: "Verify dashboard page speeds, compress CSS codes, optimize SVG icons, and achieve a 95+ score.",
    difficulty: "Medium"
  },
  {
    dayId: 57,
    title: "SEO Optimization & Meta Tags",
    description: "Apply SEO tags, set up schema markup, and define meta descriptions to boost public search visibility.",
    challenge: "Implement dynamic title tags and descriptive tags on all landing pages.",
    difficulty: "Medium"
  },
  {
    dayId: 58,
    title: "Jest and React Testing Library",
    description: "Write automated test specifications verifying component click states, input text boxes, and API rendering states.",
    challenge: "Code testing checks validating if submit triggers verification error when text boxes are empty.",
    difficulty: "Medium"
  },
  {
    dayId: 59,
    title: "Final Deployment & Custom Domains",
    description: "Purchase domain configurations, assign nameservers, configure DNS records, and assign free SSL certificates using Let's Encrypt.",
    challenge: "Deploy final applications, tie domain names, verify HTTPS access, and check loading states.",
    difficulty: "Hard"
  },
  {
    dayId: 60,
    title: "Capstone Project Showcase",
    description: "Complete the 60-day coding journey! Showcase your final platform portfolio link to recruiters and share your milestone accomplishment on LinkedIn.",
    challenge: "Gather all commitments, build final resumes, draft recap posts, and submit links.",
    difficulty: "Hard"
  }
];

export const calculateStreak = (completedDays, missedDays, currentDay) => {
  if (completedDays.length === 0) return 0;
  
  // Count backward from the day before currentDay, or currentDay if completed
  let checkDay = completedDays.includes(currentDay) ? currentDay : currentDay - 1;
  let streak = 0;
  
  while (checkDay > 0) {
    if (completedDays.includes(checkDay)) {
      streak++;
      checkDay--;
    } else if (missedDays.includes(checkDay) || checkDay < currentDay) {
      // Streak broken
      break;
    } else {
      checkDay--;
    }
  }
  return streak;
};

export const calculateLongestStreak = (completedDays) => {
  if (completedDays.length === 0) return 0;
  
  let maxStreak = 0;
  let currentStreak = 0;
  const sortedDays = [...new Set(completedDays)].sort((a, b) => a - b);
  let expected = null;
  
  for (let day of sortedDays) {
    if (expected === null || day === expected) {
      currentStreak++;
      expected = day + 1;
    } else {
      maxStreak = Math.max(maxStreak, currentStreak);
      currentStreak = 1;
      expected = day + 1;
    }
  }
  return Math.max(maxStreak, currentStreak);
};

export const deriveTasksFromProgress = (completedDays, missedDays, currentDay, list) => {
  return list.map(baseTask => {
    const day = baseTask.dayId;
    let status = "LOCKED";
    let github = "";
    let linkedin = "";

    if (completedDays.includes(day)) {
      status = "COMPLETED";
      github = "https://github.com/rohitsharma/abtalks-60day/commit/d2" + day + "fbf8e";
      linkedin = "https://linkedin.com/posts/rohit-sharma-day" + day;
    } else if (missedDays.includes(day) || (day < currentDay)) {
      status = "MISSED";
    } else if (day === currentDay) {
      status = "PENDING";
    }

    return {
      ...baseTask,
      status,
      githubUrl: github,
      linkedinUrl: linkedin
    };
  });
};

export const generateTasksForState = (state, list) => {
  let completedDays = [];
  let missedDays = [];
  let currentDay = 1;

  if (state === "steady") {
    completedDays = Array.from({ length: 18 }, (_, i) => i + 1);
    currentDay = 19;
  } else if (state === "newbie") {
    currentDay = 1;
  } else if (state === "missed") {
    completedDays = Array.from({ length: 11 }, (_, i) => i + 1);
    missedDays = [12];
    currentDay = 13;
  }

  return deriveTasksFromProgress(completedDays, missedDays, currentDay, list);
};

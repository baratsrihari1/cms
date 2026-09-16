import {
  Course,
  Assignment,
  ScheduleSession,
  Announcement,
  ResourceMaterial,
  StudentRecord,
  NotificationItem,
} from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'cs-301',
    code: 'CS 301',
    title: 'Data Structures & Algorithms',
    department: 'Computer Science',
    instructor: 'Dr. Marcus Vance',
    instructorEmail: 'm.vance@university.edu',
    room: 'Turing Hall 304',
    scheduleText: 'Mon, Wed 09:00 AM - 10:30 AM',
    color: 'border-l-indigo-500 text-indigo-600',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    term: 'Fall 2026',
    progress: 68,
    totalModules: 12,
    completedModules: 8,
    description: 'Core principles of algorithm design, asymptotic analysis, binary search trees, hash tables, graph traversals, and dynamic programming.',
    syllabusTopics: [
      'Asymptotic Notation & Recurrence Relations',
      'Balanced Search Trees (AVL & Red-Black)',
      'Hash Maps & Collision Resolution',
      'Graph Algorithms (Dijkstra, Prim, Kruskal)',
      'Dynamic Programming & Greedy Approximations',
      'NP-Completeness & Complexity Classes',
    ],
    enrolledStudentsCount: 38,
  },
  {
    id: 'cs-340',
    code: 'CS 340',
    title: 'Modern Web Architecture',
    department: 'Software Engineering',
    instructor: 'Prof. Elena Rostova',
    instructorEmail: 'e.rostova@university.edu',
    room: 'Ada Lab B12',
    scheduleText: 'Tue, Thu 11:00 AM - 12:30 PM',
    color: 'border-l-teal-500 text-teal-600',
    badgeBg: 'bg-teal-50 text-teal-700 border-teal-200',
    term: 'Fall 2026',
    progress: 75,
    totalModules: 10,
    completedModules: 7,
    description: 'Full-stack client-server protocols, RESTful APIs, distributed microservices, state reconciliation, and edge caching architectures.',
    syllabusTopics: [
      'HTTP/2 & HTTP/3 Transport Mechanics',
      'Client State Machines & Virtual DOM',
      'REST & GraphQL Service Contracts',
      'Database Concurrency & Indexing',
      'Containerization & Cloud Deployments',
    ],
    enrolledStudentsCount: 42,
  },
  {
    id: 'math-220',
    code: 'MATH 220',
    title: 'Discrete Mathematics & Logic',
    department: 'Mathematics',
    instructor: 'Dr. Arthur Sterling',
    instructorEmail: 'a.sterling@university.edu',
    room: 'Euler Lecture Hall 101',
    scheduleText: 'Mon, Wed, Fri 01:00 PM - 02:00 PM',
    color: 'border-l-amber-500 text-amber-600',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    term: 'Fall 2026',
    progress: 55,
    totalModules: 14,
    completedModules: 7,
    description: 'Formal propositional and predicate logic, set theory, combinatorics, proof techniques by induction, relations, and graph theory basics.',
    syllabusTopics: [
      'Formal Propositional Logic & Truth Tables',
      'Mathematical Induction & Recursion',
      'Combinatorics, Permutations & Pigeonhole',
      'Equivalence Relations & Partial Orders',
      'Eulerian & Hamiltonian Paths',
    ],
    enrolledStudentsCount: 45,
  },
  {
    id: 'cs-480',
    code: 'CS 480',
    title: 'Machine Learning & Neural Nets',
    department: 'Artificial Intelligence',
    instructor: 'Dr. Maya Lin',
    instructorEmail: 'm.lin@university.edu',
    room: 'Franklin Complex 210',
    scheduleText: 'Tue, Thu 02:30 PM - 04:00 PM',
    color: 'border-l-violet-500 text-violet-600',
    badgeBg: 'bg-violet-50 text-violet-700 border-violet-200',
    term: 'Fall 2026',
    progress: 60,
    totalModules: 11,
    completedModules: 6,
    description: 'Supervised and unsupervised learning, gradient descent optimization, multilayer perceptrons, convolutional layers, and loss formulations.',
    syllabusTopics: [
      'Linear & Logistic Regression with Regularization',
      'Backpropagation & Computational Graphs',
      'CNNs for Spatial Feature Extraction',
      'Transformers & Attention Mechanisms',
      'Model Evaluation, Bias, and Generalization',
    ],
    enrolledStudentsCount: 30,
  },
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    courseId: 'cs-301',
    courseCode: 'CS 301',
    courseTitle: 'Data Structures & Algorithms',
    title: 'Problem Set 4: Dijkstra & Graph Minimum Spanning Trees',
    description: 'Implement Dijkstra shortest-path and Kruskal minimum spanning tree algorithms in Python or TypeScript. Submit your source code along with analysis of worst-case runtime complexity.',
    dueDate: 'Tomorrow at 11:59 PM',
    dueTimestamp: Date.now() + 86400000,
    points: 100,
    status: 'pending',
    attachments: [
      { name: 'ps4_starter_code.zip', size: '2.4 MB', type: 'code' },
      { name: 'graph_specifications.pdf', size: '420 KB', type: 'pdf' },
    ],
    submissionsCount: 29,
    gradedCount: 18,
  },
  {
    id: 'asg-2',
    courseId: 'cs-340',
    courseCode: 'CS 340',
    courseTitle: 'Modern Web Architecture',
    title: 'Lab 5: Real-Time State Reconciliation Engine',
    description: 'Construct a decoupled client-server state engine syncing collaborative document updates with conflict-free replicate resolution.',
    dueDate: 'Friday, Oct 24, 05:00 PM',
    dueTimestamp: Date.now() + 3 * 86400000,
    points: 80,
    status: 'pending',
    attachments: [
      { name: 'lab5_guidelines.pdf', size: '610 KB', type: 'pdf' },
    ],
    submissionsCount: 34,
    gradedCount: 22,
  },
  {
    id: 'asg-3',
    courseId: 'math-220',
    courseCode: 'MATH 220',
    courseTitle: 'Discrete Mathematics & Logic',
    title: 'Homework 6: Structural Induction & Recurrence Proofs',
    description: 'Solve problem exercises 14 through 28 on induction on rooted binary trees, and derive closed forms for the Master Theorem cases.',
    dueDate: 'Submitted Oct 12',
    dueTimestamp: Date.now() - 2 * 86400000,
    points: 50,
    status: 'submitted',
    submission: {
      id: 'sub-101',
      studentId: 'std-chen',
      studentName: 'Alex Chen',
      submittedAt: 'Oct 12, 2026 at 09:14 PM',
      fileName: 'AlexChen_Math220_HW6_Final.pdf',
      fileSize: '1.2 MB',
      note: 'All proof appendices attached on pages 4-5. Checked via induction hypotheses.',
      maxPoints: 50,
    },
    submissionsCount: 44,
    gradedCount: 38,
  },
  {
    id: 'asg-4',
    courseId: 'cs-480',
    courseCode: 'CS 480',
    courseTitle: 'Machine Learning & Neural Nets',
    title: 'Project 2: Convolutional Filter Optimization & Tensor Ops',
    description: 'Train a miniature convolutional architecture on CIFAR-10, demonstrating >= 82% validation accuracy while constraining parameter count to under 500k.',
    dueDate: 'Graded on Oct 08',
    dueTimestamp: Date.now() - 6 * 86400000,
    points: 100,
    status: 'graded',
    submission: {
      id: 'sub-94',
      studentId: 'std-chen',
      studentName: 'Alex Chen',
      submittedAt: 'Oct 07, 2026 at 04:30 PM',
      fileName: 'chen_cifar10_cnn_weights.zip',
      fileSize: '8.4 MB',
      grade: 96,
      maxPoints: 100,
      gradedAt: 'Oct 08, 2026 at 02:15 PM',
      feedback: 'Outstanding ablation study on learning rates and batch normalization. Your gradient clipping insight prevented runaway loss during epoch 12. Well-crafted report!',
    },
    submissionsCount: 30,
    gradedCount: 30,
  },
  {
    id: 'asg-5',
    courseId: 'cs-301',
    courseCode: 'CS 301',
    courseTitle: 'Data Structures & Algorithms',
    title: 'Midterm Coding Assessment: Balanced Tree Balancing',
    description: 'Live benchmark implementation test of self-balancing AVL rotation logic and duplicate key amortized lookups.',
    dueDate: 'Graded on Sep 29',
    dueTimestamp: Date.now() - 14 * 86400000,
    points: 100,
    status: 'graded',
    submission: {
      id: 'sub-78',
      studentId: 'std-chen',
      studentName: 'Alex Chen',
      submittedAt: 'Sep 29, 2026 at 11:45 AM',
      fileName: 'alex_chen_avl_midterm.py',
      fileSize: '45 KB',
      grade: 94,
      maxPoints: 100,
      gradedAt: 'Sep 30, 2026 at 05:00 PM',
      feedback: 'Very clean rotation helper abstractions. Double rotation handles right-left condition smoothly.',
    },
    submissionsCount: 38,
    gradedCount: 38,
  },
];

export const SCHEDULE_SESSIONS: ScheduleSession[] = [
  {
    id: 'sch-1',
    courseId: 'cs-301',
    courseCode: 'CS 301',
    courseTitle: 'Data Structures & Algorithms',
    dayOfWeek: 1, // Monday
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    room: 'Turing Hall 304',
    type: 'Lecture',
    instructor: 'Dr. Marcus Vance',
    meetingUrl: 'https://campus.edu/meet/cs301-vance',
  },
  {
    id: 'sch-2',
    courseId: 'math-220',
    courseCode: 'MATH 220',
    courseTitle: 'Discrete Mathematics & Logic',
    dayOfWeek: 1, // Monday
    startTime: '01:00 PM',
    endTime: '02:00 PM',
    room: 'Euler Hall 101',
    type: 'Lecture',
    instructor: 'Dr. Arthur Sterling',
    meetingUrl: 'https://campus.edu/meet/math220',
  },
  {
    id: 'sch-3',
    courseId: 'cs-340',
    courseCode: 'CS 340',
    courseTitle: 'Modern Web Architecture',
    dayOfWeek: 2, // Tuesday
    startTime: '11:00 AM',
    endTime: '12:30 PM',
    room: 'Ada Lab B12',
    type: 'Lab',
    instructor: 'Prof. Elena Rostova',
    meetingUrl: 'https://campus.edu/meet/cs340-lab',
  },
  {
    id: 'sch-4',
    courseId: 'cs-480',
    courseCode: 'CS 480',
    courseTitle: 'Machine Learning & Neural Nets',
    dayOfWeek: 2, // Tuesday
    startTime: '02:30 PM',
    endTime: '04:00 PM',
    room: 'Franklin Complex 210',
    type: 'Lecture',
    instructor: 'Dr. Maya Lin',
    meetingUrl: 'https://campus.edu/meet/cs480',
  },
  {
    id: 'sch-5',
    courseId: 'cs-301',
    courseCode: 'CS 301',
    courseTitle: 'Data Structures & Algorithms',
    dayOfWeek: 3, // Wednesday
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    room: 'Turing Hall 304',
    type: 'Lecture',
    instructor: 'Dr. Marcus Vance',
    meetingUrl: 'https://campus.edu/meet/cs301-vance',
  },
  {
    id: 'sch-6',
    courseId: 'cs-301',
    courseCode: 'CS 301',
    courseTitle: 'Data Structures & Algorithms',
    dayOfWeek: 3, // Wednesday
    startTime: '02:00 PM',
    endTime: '03:30 PM',
    room: 'Faculty Office 412',
    type: 'Office Hours',
    instructor: 'Dr. Marcus Vance',
    meetingUrl: 'https://campus.edu/meet/vance-office-hours',
  },
  {
    id: 'sch-7',
    courseId: 'cs-340',
    courseCode: 'CS 340',
    courseTitle: 'Modern Web Architecture',
    dayOfWeek: 4, // Thursday
    startTime: '11:00 AM',
    endTime: '12:30 PM',
    room: 'Ada Lab B12',
    type: 'Lab',
    instructor: 'Prof. Elena Rostova',
    meetingUrl: 'https://campus.edu/meet/cs340-lab',
  },
  {
    id: 'sch-8',
    courseId: 'cs-480',
    courseCode: 'CS 480',
    courseTitle: 'Machine Learning & Neural Nets',
    dayOfWeek: 4, // Thursday
    startTime: '02:30 PM',
    endTime: '04:00 PM',
    room: 'Franklin Complex 210',
    type: 'Discussion',
    instructor: 'Dr. Maya Lin',
    meetingUrl: 'https://campus.edu/meet/cs480',
  },
  {
    id: 'sch-9',
    courseId: 'math-220',
    courseCode: 'MATH 220',
    courseTitle: 'Discrete Mathematics & Logic',
    dayOfWeek: 5, // Friday
    startTime: '01:00 PM',
    endTime: '02:30 PM',
    room: 'Euler Hall 101',
    type: 'Discussion',
    instructor: 'Dr. Arthur Sterling',
    meetingUrl: 'https://campus.edu/meet/math220-disc',
  },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    courseCode: 'CS 301',
    title: 'Midterm Exam Solution Review & Regrade Window',
    content: 'The official rubric and solutions for the AVL & Graph Theory portion of Midterm 1 have been posted in the resources vault. Any regrade inquiries must be submitted before Friday 5:00 PM.',
    author: 'Dr. Marcus Vance',
    authorRole: 'Professor',
    date: 'Yesterday at 3:45 PM',
    isUrgent: false,
  },
  {
    id: 'ann-2',
    courseCode: 'CS 340',
    title: 'Lab 5 Starter Code Updated for Node 22 Compatibility',
    content: 'We updated the websocket handshake module in the starter repository. Please run `git pull origin main` to pull down the patch before running the local test suite.',
    author: 'Prof. Elena Rostova',
    authorRole: 'Course Director',
    date: 'Oct 14, 2026',
    isUrgent: true,
  },
  {
    id: 'ann-3',
    courseCode: 'General Academic',
    title: 'Fall Career Fair & Technical Colloquium Registration Open',
    content: 'Annual Engineering & Science research showcase will host 45+ research labs and tech sponsors on Thursday, Nov 5 in the Student Union atrium.',
    author: 'Dean of Academic Affairs',
    authorRole: 'Administration',
    date: 'Oct 11, 2026',
    isUrgent: false,
  },
];

export const INITIAL_RESOURCES: ResourceMaterial[] = [
  {
    id: 'res-1',
    courseId: 'cs-301',
    courseCode: 'CS 301',
    title: 'Graph Traversal & MST Comprehensive Study Guide',
    type: 'pdf',
    size: '3.8 MB',
    uploadDate: 'Oct 10, 2026',
    description: 'Complete visual walkthrough of Breadth-First, Depth-First, Prim, and Kruskal algorithms with step-by-step edge relaxations.',
    previewContent: `SUMMARY OF MINIMUM SPANNING TREE ALGORITHMS

1. Kruskal's Algorithm (Greedy, Edge-centric):
   - Sort all edges in non-decreasing order of weight: O(E log E)
   - Initialize Disjoint Set Union (Union-Find) with path compression: O(alpha(V))
   - For each edge (u, v), if Find(u) != Find(v), union(u, v) and add to MST.
   - Total runtime: O(E log E) or O(E log V).

2. Prim's Algorithm (Greedy, Vertex-centric):
   - Maintain a min-priority queue of cut edges.
   - Extract-min vertex with lowest cross-cut weight.
   - Runtime with Fibonacci Heap: O(E + V log V); with Binary Heap: O(E log V).

Key Invariant: Both algorithms uphold the Cut Property: for any cut in the graph, the light edge crossing the cut belongs to an MST.`,
  },
  {
    id: 'res-2',
    courseId: 'cs-340',
    courseCode: 'CS 340',
    title: 'Web Protocols & HTTP/3 Lecture Slide Deck (Lec 07)',
    type: 'slides',
    size: '12.4 MB',
    uploadDate: 'Oct 12, 2026',
    description: 'In-depth review of TCP head-of-line blocking vs. QUIC UDP-based stream multiplexing, 0-RTT connections, and TLS 1.3 handshakes.',
    previewContent: `HTTP EVOLUTION & PROTOCOL MECHANICS

Slide 1: The Bottlenecks of HTTP/1.1
- Domain sharding, pipelining head-of-line blocking, textual header overhead.

Slide 2: HTTP/2 Multiplexing
- Binary framing layer (Headers vs Data frames)
- Single TCP connection with multiple virtual streams
- Limitation: TCP packet loss stalls all concurrent streams on the pipe.

Slide 3: HTTP/3 & QUIC
- Transported over UDP
- Individual stream packet loss does not stall unaffected streams
- Integrated cryptographic handshake (1-RTT or 0-RTT resumption)`,
  },
  {
    id: 'res-3',
    courseId: 'cs-480',
    courseCode: 'CS 480',
    title: 'Backpropagation Vectorization Cheat Sheet & Equations',
    type: 'notes',
    size: '890 KB',
    uploadDate: 'Oct 04, 2026',
    description: 'Derivations for matrix calculus: Jacobians, chain rule for matrix-vector multiplication, softmax + cross-entropy loss derivatives.',
    previewContent: `MATRIX DERIVATIVES CHEAT SHEET

Loss Function: Cross-Entropy with Softmax
L = - sum(y_k * log(p_k))

Gradient with respect to logit z_i:
dL / dz_i = p_i - y_i

In vectorized form:
dL / dZ = P - Y

Linear Layer Backprop:
Z = W * X + b
dL / dW = (dL / dZ) * X^T
dL / dX = W^T * (dL / dZ)
dL / db = sum_over_batch(dL / dZ)`,
  },
  {
    id: 'res-4',
    courseId: 'math-220',
    courseCode: 'MATH 220',
    title: 'Recurrence Relations & Master Theorem Quick Reference',
    type: 'pdf',
    size: '1.4 MB',
    uploadDate: 'Sep 25, 2026',
    description: 'Standard formula applications for T(n) = a*T(n/b) + f(n) across polynomial domination, logarithm factors, and regularity condition.',
    previewContent: `MASTER THEOREM REFERENCE FORMULA

Equation form: T(n) = a * T(n/b) + f(n), where a >= 1, b > 1.
Let c_crit = log_b(a).

Case 1 (Sub-critical):
If f(n) = O(n^(c_crit - eps)) for some eps > 0:
T(n) = Theta(n^(log_b(a)))

Case 2 (Critical balance):
If f(n) = Theta(n^(c_crit) * (log n)^k) for k >= 0:
T(n) = Theta(n^(log_b(a)) * (log n)^(k+1))

Case 3 (Super-critical):
If f(n) = Omega(n^(c_crit + eps)) and regularity condition holds:
T(n) = Theta(f(n))`,
  },
];

export const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: 'std-1',
    name: 'Alex Chen',
    email: 'a.chen@university.edu',
    studentNumber: 'STU-2024-8841',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    currentScore: 94.2,
    letterGrade: 'A',
    attendanceRate: 97,
    completedAssignments: 5,
    totalAssignments: 5,
    status: 'Excelling',
  },
  {
    id: 'std-2',
    name: 'Sophia Martinez',
    email: 's.martinez@university.edu',
    studentNumber: 'STU-2024-7120',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    currentScore: 91.5,
    letterGrade: 'A-',
    attendanceRate: 94,
    completedAssignments: 5,
    totalAssignments: 5,
    status: 'Excelling',
  },
  {
    id: 'std-3',
    name: 'Julian Hayes',
    email: 'j.hayes@university.edu',
    studentNumber: 'STU-2024-9014',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    currentScore: 84.8,
    letterGrade: 'B',
    attendanceRate: 88,
    completedAssignments: 4,
    totalAssignments: 5,
    status: 'On Track',
  },
  {
    id: 'std-4',
    name: 'Priya Sharma',
    email: 'p.sharma@university.edu',
    studentNumber: 'STU-2024-6338',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    currentScore: 96.0,
    letterGrade: 'A+',
    attendanceRate: 100,
    completedAssignments: 5,
    totalAssignments: 5,
    status: 'Excelling',
  },
  {
    id: 'std-5',
    name: 'Marcus Brody',
    email: 'm.brody@university.edu',
    studentNumber: 'STU-2024-5512',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    currentScore: 71.4,
    letterGrade: 'C-',
    attendanceRate: 76,
    completedAssignments: 3,
    totalAssignments: 5,
    status: 'Needs Attention',
  },
  {
    id: 'std-6',
    name: 'Emily Zhao',
    email: 'e.zhao@university.edu',
    studentNumber: 'STU-2024-4190',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80',
    currentScore: 88.7,
    letterGrade: 'B+',
    attendanceRate: 92,
    completedAssignments: 5,
    totalAssignments: 5,
    status: 'On Track',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Grade Published',
    message: 'Dr. Lin posted feedback on Project 2: Convolutional Filter Optimization (Score: 96/100).',
    timestamp: '2 hours ago',
    read: false,
    type: 'grade',
  },
  {
    id: 'notif-2',
    title: 'Upcoming Deadline',
    message: 'Problem Set 4 for CS 301 is due tomorrow at 11:59 PM.',
    timestamp: '5 hours ago',
    read: false,
    type: 'assignment',
  },
  {
    id: 'notif-3',
    title: 'Class Notice',
    message: 'Prof. Rostova updated the Node.js starter code for Lab 5.',
    timestamp: 'Yesterday',
    read: true,
    type: 'announcement',
  },
];

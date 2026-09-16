export type UserRole = 'student' | 'teacher';

export type NavTab = 'dashboard' | 'courses' | 'assignments' | 'schedule' | 'resources' | 'grades';

export interface Course {
  id: string;
  code: string;
  title: string;
  department: string;
  instructor: string;
  instructorEmail: string;
  room: string;
  scheduleText: string;
  color: string;
  badgeBg: string;
  term: string;
  progress: number; // 0 - 100
  totalModules: number;
  completedModules: number;
  description: string;
  syllabusTopics: string[];
  enrolledStudentsCount?: number;
}

export type AssignmentStatus = 'pending' | 'submitted' | 'graded';

export interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  fileName?: string;
  fileSize?: string;
  note?: string;
  content?: string;
  grade?: number;
  maxPoints: number;
  gradedAt?: string;
  feedback?: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  title: string;
  description: string;
  dueDate: string; // ISO or readable string e.g. "Tomorrow at 11:59 PM"
  dueTimestamp: number;
  points: number;
  status: AssignmentStatus;
  submission?: Submission;
  attachments?: { name: string; size: string; type: string }[];
  submissionsCount?: number;
  gradedCount?: number;
}

export interface ScheduleSession {
  id: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  dayOfWeek: 1 | 2 | 3 | 4 | 5; // 1 = Monday ... 5 = Friday
  startTime: string; // e.g. "09:00 AM"
  endTime: string; // e.g. "10:30 AM"
  room: string;
  type: 'Lecture' | 'Lab' | 'Discussion' | 'Office Hours';
  instructor: string;
  meetingUrl?: string;
}

export interface Announcement {
  id: string;
  courseId?: string;
  courseCode?: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  isUrgent?: boolean;
}

export interface ResourceMaterial {
  id: string;
  courseId: string;
  courseCode: string;
  title: string;
  type: 'slides' | 'pdf' | 'code' | 'notes';
  size: string;
  uploadDate: string;
  description: string;
  previewContent: string;
}

export interface StudentRecord {
  id: string;
  name: string;
  email: string;
  studentNumber: string;
  avatar: string;
  currentScore: number;
  letterGrade: string;
  attendanceRate: number;
  completedAssignments: number;
  totalAssignments: number;
  status: 'Excelling' | 'On Track' | 'Needs Attention';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'assignment' | 'grade' | 'announcement' | 'schedule';
}

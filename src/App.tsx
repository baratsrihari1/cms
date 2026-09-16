import React, { useState } from 'react';
import { UserRole, NavTab, Course, Assignment, ScheduleSession, Announcement, ResourceMaterial, StudentRecord, NotificationItem } from './types';
import {
  INITIAL_COURSES,
  INITIAL_ASSIGNMENTS,
  SCHEDULE_SESSIONS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_RESOURCES,
  INITIAL_STUDENTS,
  INITIAL_NOTIFICATIONS,
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { CoursesView } from './components/CoursesView';
import { AssignmentsView } from './components/AssignmentsView';
import { ScheduleView } from './components/ScheduleView';
import { ResourcesView } from './components/ResourcesView';
import { GradesView } from './components/GradesView';
import { SubmitAssignmentModal } from './components/SubmitAssignmentModal';
import { CreateAssignmentModal } from './components/CreateAssignmentModal';
import { GradeSubmissionModal } from './components/GradeSubmissionModal';
import { ResourcePreviewModal } from './components/ResourcePreviewModal';
import { NewAnnouncementModal } from './components/NewAnnouncementModal';
import { CourseDetailModal } from './components/CourseDetailModal';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [role, setRole] = useState<UserRole>('student');
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Core collections state
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [schedule] = useState<ScheduleSession[]>(SCHEDULE_SESSIONS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [resources, setResources] = useState<ResourceMaterial[]>(INITIAL_RESOURCES);
  const [students, setStudents] = useState<StudentRecord[]>(INITIAL_STUDENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Modals
  const [activeSubmitAssignment, setActiveSubmitAssignment] = useState<Assignment | null>(null);
  const [isCreateAssignmentOpen, setIsCreateAssignmentOpen] = useState(false);
  const [activeGradeAssignment, setActiveGradeAssignment] = useState<Assignment | null>(null);
  const [activeResourcePreview, setActiveResourcePreview] = useState<ResourceMaterial | null>(null);
  const [isNewAnnouncementOpen, setIsNewAnnouncementOpen] = useState(false);
  const [activeCourseDetail, setActiveCourseDetail] = useState<Course | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handlers
  const handleSubmitAssignment = (
    assignmentId: string,
    submissionData: { fileName: string; fileSize: string; note: string; content?: string }
  ) => {
    setAssignments((prev) =>
      prev.map((asg) => {
        if (asg.id === assignmentId) {
          return {
            ...asg,
            status: 'submitted',
            submission: {
              id: `sub-${Date.now()}`,
              studentId: 'std-1',
              studentName: 'Alex Chen',
              submittedAt: 'Just now',
              fileName: submissionData.fileName,
              fileSize: submissionData.fileSize,
              note: submissionData.note,
              content: submissionData.content,
              maxPoints: asg.points,
            },
            submissionsCount: (asg.submissionsCount || 0) + 1,
          };
        }
        return asg;
      })
    );

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Assignment Submitted',
        message: `Successfully turned in files for ${assignments.find((a) => a.id === assignmentId)?.title || 'homework'}.`,
        timestamp: 'Just now',
        read: false,
        type: 'assignment',
      },
      ...prev,
    ]);

    showToast('Assignment submitted successfully!');
  };

  const handleCreateAssignment = (
    newAssignment: Omit<Assignment, 'id' | 'status' | 'submissionsCount' | 'gradedCount'>
  ) => {
    const created: Assignment = {
      ...newAssignment,
      id: `asg-${Date.now()}`,
      status: 'pending',
      submissionsCount: 0,
      gradedCount: 0,
    };

    setAssignments((prev) => [created, ...prev]);

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'New Assignment Published',
        message: `${newAssignment.courseCode}: ${newAssignment.title} has been assigned to students.`,
        timestamp: 'Just now',
        read: false,
        type: 'assignment',
      },
      ...prev,
    ]);

    showToast('New assignment published to class section!');
  };

  const handleGradeSubmission = (assignmentId: string, grade: number, feedback: string) => {
    setAssignments((prev) =>
      prev.map((asg) => {
        if (asg.id === assignmentId && asg.submission) {
          return {
            ...asg,
            status: 'graded',
            submission: {
              ...asg.submission,
              grade,
              feedback,
              gradedAt: 'Today',
            },
            gradedCount: (asg.gradedCount || 0) + 1,
          };
        }
        return asg;
      })
    );

    showToast(`Grade recorded: ${grade} points with feedback.`);
  };

  const handleAddAnnouncement = (ann: Omit<Announcement, 'id' | 'date'>) => {
    const created: Announcement = {
      ...ann,
      id: `ann-${Date.now()}`,
      date: 'Just now',
    };

    setAnnouncements((prev) => [created, ...prev]);

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: ann.title,
        message: ann.content.slice(0, 100) + '...',
        timestamp: 'Just now',
        read: false,
        type: 'announcement',
      },
      ...prev,
    ]);

    showToast('Announcement posted to student noticeboard!');
  };

  const handleAddCourse = (newCourse: Course) => {
    setCourses((prev) => [...prev, newCourse]);
    showToast(`Course ${newCourse.code} added successfully!`);
  };

  const handleAddResource = (newResource: ResourceMaterial) => {
    setResources((prev) => [newResource, ...prev]);
    showToast('Study document published to course library!');
  };

  const pendingAssignmentsCount = assignments.filter((a) => a.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans antialiased">
      {/* Top Navbar */}
      <Navbar
        role={role}
        setRole={setRole}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        notifications={notifications}
        setNotifications={setNotifications}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto pb-16 lg:pb-0">
        {/* Sidebar */}
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          role={role}
          pendingAssignmentsCount={pendingAssignmentsCount}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Dynamic Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {currentTab === 'dashboard' && (
            <DashboardView
              role={role}
              courses={courses}
              assignments={assignments}
              schedule={schedule}
              announcements={announcements}
              setCurrentTab={setCurrentTab}
              onOpenSubmitModal={(asg) => setActiveSubmitAssignment(asg)}
              onOpenNewAnnouncementModal={() => setIsNewAnnouncementOpen(true)}
              onSelectCourse={(c) => setActiveCourseDetail(c)}
            />
          )}

          {currentTab === 'courses' && (
            <CoursesView
              courses={courses}
              role={role}
              searchQuery={searchQuery}
              onSelectCourse={(c) => setActiveCourseDetail(c)}
              onAddCourse={handleAddCourse}
            />
          )}

          {currentTab === 'assignments' && (
            <AssignmentsView
              assignments={assignments}
              role={role}
              searchQuery={searchQuery}
              onOpenSubmitModal={(asg) => setActiveSubmitAssignment(asg)}
              onOpenCreateModal={() => setIsCreateAssignmentOpen(true)}
              onOpenGradeModal={(asg) => setActiveGradeAssignment(asg)}
            />
          )}

          {currentTab === 'schedule' && (
            <ScheduleView schedule={schedule} role={role} />
          )}

          {currentTab === 'resources' && (
            <ResourcesView
              resources={resources}
              courses={courses}
              role={role}
              searchQuery={searchQuery}
              onPreviewResource={(res) => setActiveResourcePreview(res)}
              onAddResource={handleAddResource}
            />
          )}

          {currentTab === 'grades' && (
            <GradesView
              role={role}
              courses={courses}
              assignments={assignments}
              students={students}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      {activeSubmitAssignment && (
        <SubmitAssignmentModal
          assignment={activeSubmitAssignment}
          onClose={() => setActiveSubmitAssignment(null)}
          onSubmit={handleSubmitAssignment}
        />
      )}

      {isCreateAssignmentOpen && (
        <CreateAssignmentModal
          courses={courses}
          onClose={() => setIsCreateAssignmentOpen(false)}
          onCreate={handleCreateAssignment}
        />
      )}

      {activeGradeAssignment && (
        <GradeSubmissionModal
          assignment={activeGradeAssignment}
          onClose={() => setActiveGradeAssignment(null)}
          onSaveGrade={handleGradeSubmission}
        />
      )}

      {activeResourcePreview && (
        <ResourcePreviewModal
          resource={activeResourcePreview}
          onClose={() => setActiveResourcePreview(null)}
        />
      )}

      {isNewAnnouncementOpen && (
        <NewAnnouncementModal
          courses={courses}
          onClose={() => setIsNewAnnouncementOpen(false)}
          onPost={handleAddAnnouncement}
        />
      )}

      {activeCourseDetail && (
        <CourseDetailModal
          course={activeCourseDetail}
          onClose={() => setActiveCourseDetail(null)}
          onOpenAssignments={() => {
            setActiveCourseDetail(null);
            setCurrentTab('assignments');
          }}
          onOpenResources={() => {
            setActiveCourseDetail(null);
            setCurrentTab('resources');
          }}
        />
      )}

      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-20 lg:bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-800 text-xs font-semibold flex items-center gap-2.5 animate-in slide-in-from-bottom-2 fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

import React from 'react';
import {
  BookOpen,
  CheckSquare,
  Clock,
  TrendingUp,
  Users,
  Calendar,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  FileText,
  Plus,
} from 'lucide-react';
import {
  Course,
  Assignment,
  ScheduleSession,
  Announcement,
  UserRole,
  NavTab,
} from '../types';

interface DashboardViewProps {
  role: UserRole;
  courses: Course[];
  assignments: Assignment[];
  schedule: ScheduleSession[];
  announcements: Announcement[];
  setCurrentTab: (tab: NavTab) => void;
  onOpenSubmitModal: (assignment: Assignment) => void;
  onOpenNewAnnouncementModal: () => void;
  onSelectCourse: (course: Course) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  role,
  courses,
  assignments,
  schedule,
  announcements,
  setCurrentTab,
  onOpenSubmitModal,
  onOpenNewAnnouncementModal,
  onSelectCourse,
}) => {
  const pendingAssignments = assignments.filter((a) => a.status === 'pending');
  const todaySessions = schedule.filter((s) => s.dayOfWeek === 1); // Sample day (Monday)
  const ungradedCount = assignments.reduce(
    (acc, a) => acc + ((a.submissionsCount || 0) - (a.gradedCount || 0)),
    0
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-850 to-slate-900 text-white rounded-2xl p-5 sm:p-7 shadow-xs border border-indigo-950 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 text-xs font-medium">
            <span>Fall Semester 2026</span>
            <span>•</span>
            <span>Week 7 of 15</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            {role === 'student' ? 'Welcome back, Alex!' : 'Welcome back, Dr. Vance!'}
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
            {role === 'student'
              ? 'You have 2 pending assignments due this week and your next class begins in 45 minutes.'
              : 'You have 7 student submissions pending review and your office hours are scheduled for 2:00 PM today.'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {role === 'student' ? (
            <button
              id="dashboard-view-assignments-btn"
              type="button"
              onClick={() => setCurrentTab('assignments')}
              className="px-4 py-2.5 bg-white text-indigo-900 hover:bg-indigo-50 font-semibold rounded-xl text-xs sm:text-sm transition-all shadow-xs flex items-center gap-2"
            >
              <span>View Homework</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="dashboard-create-announcement-btn"
              type="button"
              onClick={onOpenNewAnnouncementModal}
              className="px-4 py-2.5 bg-white text-indigo-900 hover:bg-indigo-50 font-semibold rounded-xl text-xs sm:text-sm transition-all shadow-xs flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Broadcast Notice</span>
            </button>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {role === 'student' ? (
          <>
            <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Enrolled Courses
                </span>
                <BookOpen className="w-4 h-4 text-indigo-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">{courses.length}</p>
              <p className="text-[11px] text-slate-500">All registered & active</p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Pending Tasks
                </span>
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-2xl font-bold text-amber-600">{pendingAssignments.length}</p>
              <p className="text-[11px] text-slate-500">Next due tomorrow</p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Academic GPA
                </span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">3.86</p>
              <p className="text-[11px] text-emerald-600 font-medium">94.2% weighted avg</p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Today's Classes
                </span>
                <Calendar className="w-4 h-4 text-indigo-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">{todaySessions.length}</p>
              <p className="text-[11px] text-slate-500">Next at 09:00 AM</p>
            </div>
          </>
        ) : (
          <>
            <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Active Classes
                </span>
                <BookOpen className="w-4 h-4 text-indigo-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">{courses.length}</p>
              <p className="text-[11px] text-slate-500">Taught this semester</p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Total Students
                </span>
                <Users className="w-4 h-4 text-teal-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">84</p>
              <p className="text-[11px] text-slate-500">Across 3 sections</p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Needs Grading
                </span>
                <CheckSquare className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-2xl font-bold text-amber-600">{ungradedCount}</p>
              <p className="text-[11px] text-slate-500">Submissions awaiting score</p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Avg Attendance
                </span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">93.5%</p>
              <p className="text-[11px] text-emerald-600 font-medium">+2.1% from midterm</p>
            </div>
          </>
        )}
      </div>

      {/* Main Grid: Schedule & Homework on Left, Announcements & Quick Actions on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Schedule Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <h2 className="text-sm sm:text-base font-bold text-slate-900">
                  Today's Classroom Schedule
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setCurrentTab('schedule')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>Full Timetable</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {todaySessions.map((session) => (
                <div
                  key={session.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/60 transition-colors gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="px-2.5 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-800 text-xs font-bold shrink-0 text-center">
                      <div>{session.startTime.split(' ')[0]}</div>
                      <div className="text-[10px] font-normal text-indigo-600">
                        {session.startTime.split(' ')[1]}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-slate-900">
                          {session.courseCode} — {session.courseTitle}
                        </span>
                        <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-slate-200 text-slate-700">
                          {session.type}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                        <span>{session.room}</span>
                        <span>•</span>
                        <span>{session.instructor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {session.meetingUrl && (
                      <a
                        href={session.meetingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
                      >
                        <span>Join Session</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Tasks / Homework */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-amber-500" />
                <h2 className="text-sm sm:text-base font-bold text-slate-900">
                  {role === 'student' ? 'Assignments Due Soon' : 'Submissions Pending Review'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setCurrentTab('assignments')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {assignments.slice(0, 3).map((asg) => (
                <div
                  key={asg.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[11px] font-semibold rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {asg.courseCode}
                      </span>
                      <span className="text-xs font-semibold text-slate-900">{asg.title}</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{asg.description}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                      <span className="flex items-center gap-1 font-medium text-amber-700">
                        <Clock className="w-3 h-3 text-amber-500" />
                        {asg.dueDate}
                      </span>
                      <span>•</span>
                      <span>{asg.points} points total</span>
                    </div>
                  </div>

                  <div className="shrink-0 self-end sm:self-center">
                    {role === 'student' ? (
                      asg.status === 'pending' ? (
                        <button
                          type="button"
                          onClick={() => onOpenSubmitModal(asg)}
                          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-2xs"
                        >
                          Submit Work
                        </button>
                      ) : asg.status === 'submitted' ? (
                        <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md border border-blue-200">
                          Submitted
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-md border border-emerald-200">
                          Graded: {asg.submission?.grade}/{asg.points}
                        </span>
                      )
                    ) : (
                      <button
                        type="button"
                        onClick={() => setCurrentTab('assignments')}
                        className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        Grade Submissions
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Course Shortcuts & Announcements */}
        <div className="space-y-6">
          {/* Announcements Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-sm">Campus Noticeboard</h3>
              </div>
              {role === 'teacher' && (
                <button
                  type="button"
                  onClick={onOpenNewAnnouncementModal}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  + Post
                </button>
              )}
            </div>

            <div className="space-y-3">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                    ann.isUrgent
                      ? 'bg-amber-50/50 border-amber-200/80 text-amber-950'
                      : 'bg-slate-50/60 border-slate-200/80 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-semibold line-clamp-1">{ann.title}</span>
                    {ann.isUrgent && (
                      <span className="px-1.5 py-0.5 bg-amber-200 text-amber-900 rounded text-[10px] font-bold shrink-0">
                        Urgent
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px] line-clamp-3">
                    {ann.content}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>{ann.author}</span>
                    <span>{ann.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Enrolled Classes List */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">
                {role === 'student' ? 'My Courses' : 'Taught Sections'}
              </h3>
              <button
                type="button"
                onClick={() => setCurrentTab('courses')}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                All Courses
              </button>
            </div>

            <div className="space-y-2">
              {courses.map((c) => (
                <div
                  key={c.id}
                  onClick={() => onSelectCourse(c)}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 cursor-pointer transition-all flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900">{c.code}</span>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{c.title}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-slate-700">{c.progress}%</span>
                    <p className="text-[10px] text-slate-600">Syllabus</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Award,
  TrendingUp,
  BookOpen,
  Users,
  Download,
  Mail,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Check,
} from 'lucide-react';
import { Course, Assignment, StudentRecord, UserRole } from '../types';

interface GradesViewProps {
  role: UserRole;
  courses: Course[];
  assignments: Assignment[];
  students: StudentRecord[];
}

export const GradesView: React.FC<GradesViewProps> = ({
  role,
  courses,
  assignments,
  students,
}) => {
  const [exported, setExported] = useState(false);
  const [selectedStudentFilter, setSelectedStudentFilter] = useState<'all' | 'Excelling' | 'On Track' | 'Needs Attention'>('all');

  const gradedAssignments = assignments.filter((a) => a.status === 'graded');

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  const filteredStudents = students.filter(
    (s) => selectedStudentFilter === 'all' || s.status === selectedStudentFilter
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            {role === 'student' ? 'Academic Performance & GPA' : 'Class Roster & Gradebook'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {role === 'student'
              ? 'View cumulative GPA, grade distributions by course, and graded assignment evaluations.'
              : 'Monitor student academic standing, attendance rates, and assessment completion across sections.'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleExport}
          className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-2 self-start sm:self-auto transition-colors"
        >
          {exported ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700">Official Report Downloaded</span>
            </>
          ) : (
            <>
              <FileSpreadsheet className="w-4 h-4 text-slate-500" />
              <span>Export Grade Transcript</span>
            </>
          )}
        </button>
      </div>

      {role === 'student' ? (
        /* Student Performance View */
        <div className="space-y-6">
          {/* Summary Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Term Grade Point Average
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-900">3.86</span>
                <span className="text-xs font-semibold text-emerald-600">/ 4.00 Max</span>
              </div>
              <p className="text-xs text-slate-500">Dean's Honors Distinction</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Weighted Academic Average
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-indigo-600">94.2%</span>
                <span className="text-xs font-semibold text-indigo-700">Grade: A</span>
              </div>
              <p className="text-xs text-slate-500">Across 4 enrolled subjects</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Registered Units & Credits
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-900">16.0</span>
                <span className="text-xs font-semibold text-slate-500">Semester Credits</span>
              </div>
              <p className="text-xs text-slate-500">100% on-time submission rate</p>
            </div>
          </div>

          {/* Breakdown by Course */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">Course Grade Breakdown</h2>

            <div className="space-y-4">
              {[
                { code: 'CS 301', title: 'Data Structures & Algorithms', score: 94.0, letter: 'A', weight: 'HW 30%, Midterm 30%, Final 40%' },
                { code: 'CS 340', title: 'Modern Web Architecture', score: 92.5, letter: 'A-', weight: 'Labs 35%, Project 35%, Final 30%' },
                { code: 'MATH 220', title: 'Discrete Mathematics & Logic', score: 93.8, letter: 'A', weight: 'HW 25%, Quizzes 25%, Exams 50%' },
                { code: 'CS 480', title: 'Machine Learning & Neural Nets', score: 96.0, letter: 'A+', weight: 'Projects 50%, Benchmarks 20%, Final 30%' },
              ].map((c) => (
                <div key={c.code} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900">{c.code}</span>
                      <span className="text-slate-500 ml-2">{c.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{c.score}%</span>
                      <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold border border-indigo-100">
                        {c.letter}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${c.score}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-400">Curriculum weightings: {c.weight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Graded Assessments History */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">Graded Work History & Rubric Scores</h2>

            <div className="space-y-3">
              {gradedAssignments.map((asg) => (
                <div
                  key={asg.id}
                  className="p-4 rounded-xl border border-slate-200 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 font-bold rounded bg-indigo-50 text-indigo-700">
                        {asg.courseCode}
                      </span>
                      <span className="font-bold text-slate-900">{asg.title}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                      Score: {asg.submission?.grade} / {asg.points} pts (
                      {Math.round(((asg.submission?.grade || 0) / asg.points) * 100)}%)
                    </span>
                  </div>

                  {asg.submission?.feedback && (
                    <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 italic">
                      "{asg.submission.feedback}"
                    </p>
                  )}

                  <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                    <span>Submitted: {asg.submission?.submittedAt}</span>
                    <span>Evaluated: {asg.submission?.gradedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Teacher Class Roster & Student Performance View */
        <div className="space-y-6">
          {/* Section Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Enrolled Students
              </span>
              <p className="text-3xl font-bold text-slate-900">{students.length}</p>
              <p className="text-xs text-slate-500">Section 1 (CS 301)</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Class Mean Score
              </span>
              <p className="text-3xl font-bold text-indigo-600">89.4%</p>
              <p className="text-xs text-slate-500">Median: 91.5%</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Average Attendance
              </span>
              <p className="text-3xl font-bold text-emerald-600">92.8%</p>
              <p className="text-xs text-slate-500">Lecture hall scans</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Attention Required
              </span>
              <p className="text-3xl font-bold text-amber-600">
                {students.filter((s) => s.status === 'Needs Attention').length}
              </p>
              <p className="text-xs text-slate-500">Under 75% threshold</p>
            </div>
          </div>

          {/* Student Roster Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-base font-bold text-slate-900">Student Roster & Academic Status</h2>

              {/* Status Filter */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
                {(['all', 'Excelling', 'On Track', 'Needs Attention'] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setSelectedStudentFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      selectedStudentFilter === filter
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {filter === 'all' ? 'All Students' : filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Student ID</th>
                    <th className="py-3 px-4">Current Score</th>
                    <th className="py-3 px-4">Attendance</th>
                    <th className="py-3 px-4">Assignments</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((stu) => (
                    <tr key={stu.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={stu.avatar}
                            alt={stu.name}
                            className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                          />
                          <div>
                            <span className="font-semibold text-slate-900 block">{stu.name}</span>
                            <span className="text-[11px] text-slate-400">{stu.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600">{stu.studentNumber}</td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900">{stu.currentScore}%</span>
                        <span className="ml-1.5 px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[10px]">
                          {stu.letterGrade}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-1.5 rounded-full ${
                                stu.attendanceRate >= 90
                                  ? 'bg-emerald-500'
                                  : stu.attendanceRate >= 80
                                  ? 'bg-amber-500'
                                  : 'bg-rose-500'
                              }`}
                              style={{ width: `${stu.attendanceRate}%` }}
                            />
                          </div>
                          <span className="font-medium text-slate-700">{stu.attendanceRate}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {stu.completedAssignments} / {stu.totalAssignments}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                            stu.status === 'Excelling'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : stu.status === 'On Track'
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : 'bg-rose-50 text-rose-800 border-rose-200'
                          }`}
                        >
                          {stu.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <a
                          href={`mailto:${stu.email}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Contact</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

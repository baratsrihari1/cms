import React, { useState } from 'react';
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  FileText,
  AlertCircle,
  Plus,
  Filter,
  Paperclip,
  Award,
  User,
  MessageSquare,
} from 'lucide-react';
import { Assignment, AssignmentStatus, UserRole } from '../types';

interface AssignmentsViewProps {
  assignments: Assignment[];
  role: UserRole;
  searchQuery: string;
  onOpenSubmitModal: (assignment: Assignment) => void;
  onOpenCreateModal: () => void;
  onOpenGradeModal: (assignment: Assignment) => void;
}

export const AssignmentsView: React.FC<AssignmentsViewProps> = ({
  assignments,
  role,
  searchQuery,
  onOpenSubmitModal,
  onOpenCreateModal,
  onOpenGradeModal,
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | AssignmentStatus>('all');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');

  const courseCodes = Array.from(new Set(assignments.map((a) => a.courseCode)));

  const filteredAssignments = assignments.filter((asg) => {
    const matchesStatus = statusFilter === 'all' || asg.status === statusFilter;
    const matchesCourse = selectedCourseFilter === 'all' || asg.courseCode === selectedCourseFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      asg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asg.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asg.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCourse && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            {role === 'student' ? 'Assignments & Homework' : 'Assignment Management & Grading'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {role === 'student'
              ? 'Submit project files, monitor deadlines, and view instructor evaluation feedback.'
              : 'Publish problem sets, review submissions, and allocate grades with feedback notes.'}
          </p>
        </div>

        {role === 'teacher' && (
          <button
            id="assignments-create-btn"
            type="button"
            onClick={onOpenCreateModal}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-2xs flex items-center gap-1.5 self-start sm:self-auto transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Assignment</span>
          </button>
        )}
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {(['all', 'pending', 'submitted', 'graded'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-colors whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Course Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium whitespace-nowrap">Course:</span>
          <select
            value={selectedCourseFilter}
            onChange={(e) => setSelectedCourseFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Courses</option>
            {courseCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Assignment List */}
      <div className="space-y-4">
        {filteredAssignments.map((asg) => {
          const isPending = asg.status === 'pending';
          const isSubmitted = asg.status === 'submitted';
          const isGraded = asg.status === 'graded';

          return (
            <div
              key={asg.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs hover:border-slate-300 transition-all space-y-4"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-xs font-semibold rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {asg.courseCode}
                    </span>
                    <span className="text-xs text-slate-500">{asg.courseTitle}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{asg.title}</h3>
                </div>

                {/* Status Badge */}
                <div className="shrink-0 self-start">
                  {isPending && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      Pending Submission
                    </span>
                  )}
                  {isSubmitted && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                      <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
                      Submitted (Awaiting Review)
                    </span>
                  )}
                  {isGraded && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Graded: {asg.submission?.grade}/{asg.points} pts
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
                {asg.description}
              </p>

              {/* Attachments (if any) */}
              {asg.attachments && asg.attachments.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  <span className="text-slate-500 font-medium flex items-center gap-1">
                    <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                    Specifications:
                  </span>
                  {asg.attachments.map((att, idx) => (
                    <div
                      key={idx}
                      className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-mono text-[11px] flex items-center gap-1.5 border border-slate-200"
                    >
                      <span>{att.name}</span>
                      <span className="text-slate-600">({att.size})</span>
                    </div>
                  ))}
                </div>
              )}

              {/* If Graded: Show teacher feedback & Score */}
              {isGraded && asg.submission?.feedback && (
                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 text-xs space-y-1">
                  <div className="flex items-center justify-between font-semibold text-emerald-900">
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Instructor Evaluation & Feedback</span>
                    </div>
                    <span>{asg.submission.gradedAt}</span>
                  </div>
                  <p className="text-emerald-800 leading-relaxed italic">
                    "{asg.submission.feedback}"
                  </p>
                </div>
              )}

              {/* If Submitted: Show submission receipt */}
              {isSubmitted && asg.submission && (
                <div className="p-3 rounded-xl bg-blue-50/40 border border-blue-200/70 text-xs text-blue-900 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span className="font-semibold">{asg.submission.fileName}</span>
                    <span className="text-blue-600">({asg.submission.fileSize})</span>
                  </div>
                  <span className="text-[11px] text-blue-700">{asg.submission.submittedAt}</span>
                </div>
              )}

              {/* Bottom footer: Due date, points, and actions */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-4 text-slate-500">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Due: {asg.dueDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Award className="w-3.5 h-3.5 text-slate-400" />
                    Max: {asg.points} pts
                  </span>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {role === 'student' ? (
                    isPending ? (
                      <button
                        type="button"
                        onClick={() => onOpenSubmitModal(asg)}
                        className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors shadow-2xs"
                      >
                        Turn In Work
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onOpenSubmitModal(asg)}
                        className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg font-medium transition-colors"
                      >
                        Resubmit / Update
                      </button>
                    )
                  ) : (
                    <button
                      type="button"
                      onClick={() => onOpenGradeModal(asg)}
                      className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isGraded ? 'Review / Edit Grade' : 'Grade Submission'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredAssignments.length === 0 && (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
            No assignments match your selected status or search filter.
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, CheckCircle2, FileText, User, MessageSquare } from 'lucide-react';
import { Assignment } from '../types';

interface GradeSubmissionModalProps {
  assignment: Assignment;
  onClose: () => void;
  onSaveGrade: (assignmentId: string, grade: number, feedback: string) => void;
}

export const GradeSubmissionModal: React.FC<GradeSubmissionModalProps> = ({
  assignment,
  onClose,
  onSaveGrade,
}) => {
  const initialGrade = assignment.submission?.grade ?? Math.round(assignment.points * 0.92);
  const [grade, setGrade] = useState(String(initialGrade));
  const [feedback, setFeedback] = useState(
    assignment.submission?.feedback || 'Great structural organization and edge-case handling. Clean logic and thorough test execution.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericGrade = Math.min(assignment.points, Math.max(0, Number(grade) || 0));
    onSaveGrade(assignment.id, numericGrade, feedback.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-semibold rounded bg-emerald-100 text-emerald-800">
                Grading Interface
              </span>
              <span className="text-xs text-slate-600 font-medium">{assignment.courseCode}</span>
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-1 line-clamp-1">{assignment.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Student Info & Submission Details */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600" />
                <span className="font-semibold text-slate-900">
                  {assignment.submission?.studentName || 'Alex Chen'}
                </span>
                <span className="text-slate-600">(STU-2024-8841)</span>
              </div>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium border border-emerald-200">
                Submitted on time
              </span>
            </div>

            <div className="flex items-center gap-2 pt-1 text-slate-700">
              <FileText className="w-4 h-4 text-slate-500 shrink-0" />
              <span className="font-mono text-[11px] truncate">
                {assignment.submission?.fileName || 'submission_final_build.pdf'}
              </span>
              <span className="text-slate-600">({assignment.submission?.fileSize || '1.8 MB'})</span>
            </div>

            {assignment.submission?.note && (
              <div className="pt-2 border-t border-slate-200/80 text-slate-600 italic">
                "{assignment.submission.note}"
              </div>
            )}
          </div>

          {/* Grade Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Award Score (Max {assignment.points} pts)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                max={assignment.points}
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-32 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-slate-600">/ {assignment.points} points</span>
              <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-700 font-semibold ml-auto">
                {Math.round(((Number(grade) || 0) / assignment.points) * 100)}%
              </span>
            </div>
          </div>

          {/* Written Feedback */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
              Written Feedback & Evaluation
            </label>
            <textarea
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Highlight strengths, point deductions, or suggestions for subsequent projects..."
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-xs flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              Post Grade & Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

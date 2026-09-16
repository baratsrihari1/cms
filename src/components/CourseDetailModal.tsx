import React from 'react';
import { X, BookOpen, User, Mail, MapPin, Clock, CheckCircle2, Circle } from 'lucide-react';
import { Course } from '../types';

interface CourseDetailModalProps {
  course: Course;
  onClose: () => void;
  onOpenAssignments: () => void;
  onOpenResources: () => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onOpenAssignments,
  onOpenResources,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 text-xs font-semibold rounded ${course.badgeBg}`}>
                {course.code}
              </span>
              <span className="text-xs text-slate-600 font-medium">{course.department}</span>
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-1">{course.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 text-xs">
          {/* Instructor & Location strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-slate-700">
                <User className="w-3.5 h-3.5 text-indigo-600" />
                <span className="font-semibold text-slate-900">{course.instructor}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{course.instructorEmail}</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                <span>{course.room}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{course.scheduleText}</span>
              </div>
            </div>
          </div>

          {/* Course Description */}
          <div>
            <span className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
              Course Overview & Objectives
            </span>
            <p className="mt-1 text-slate-600 leading-relaxed bg-white border border-slate-200/70 p-3 rounded-xl">
              {course.description}
            </p>
          </div>

          {/* Syllabus Topics */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
                Syllabus Progression ({course.completedModules} of {course.totalModules} modules covered)
              </span>
              <span className="font-semibold text-indigo-700">{course.progress}%</span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-2 mb-3 overflow-hidden">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              />
            </div>

            <div className="space-y-2">
              {course.syllabusTopics.map((topic, idx) => {
                const isCompleted = idx < Math.floor(course.syllabusTopics.length * (course.progress / 100));
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs ${
                      isCompleted
                        ? 'bg-slate-50/80 border-slate-200/80 text-slate-800'
                        : 'bg-white border-dashed border-slate-200 text-slate-600'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                    )}
                    <span className="font-medium flex-1">{topic}</span>
                    <span className="text-[11px] text-slate-600 shrink-0">
                      Module {idx + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAssignments();
              }}
              className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold transition-colors"
            >
              View Assignments
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenResources();
              }}
              className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold transition-colors"
            >
              Course Resources
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg text-xs font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Send, AlertTriangle } from 'lucide-react';
import { Course, Announcement } from '../types';

interface NewAnnouncementModalProps {
  courses: Course[];
  onClose: () => void;
  onPost: (announcement: Omit<Announcement, 'id' | 'date'>) => void;
}

export const NewAnnouncementModal: React.FC<NewAnnouncementModalProps> = ({
  courses,
  onClose,
  onPost,
}) => {
  const [courseCode, setCourseCode] = useState(courses[0]?.code || 'General Academic');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Please provide a title and announcement body.');
      return;
    }

    onPost({
      courseCode,
      title: title.trim(),
      content: content.trim(),
      author: 'Dr. Marcus Vance',
      authorRole: 'Associate Professor',
      isUrgent,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div>
            <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">Communication Desk</span>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">Broadcast Announcement</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Target Course / Audience</label>
            <select
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All Enrolled Classes">All Enrolled Classes & Students</option>
              {courses.map((c) => (
                <option key={c.id} value={c.code}>
                  {c.code} — {c.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Subject / Announcement Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Schedule Change: Friday Lab moved to Turing 304"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Message Content</label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide clear directions, dates, or relevant links for students..."
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Urgency Toggle */}
          <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <input
              type="checkbox"
              id="urgent-checkbox"
              checked={isUrgent}
              onChange={(e) => setIsUrgent(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
            />
            <label htmlFor="urgent-checkbox" className="text-xs text-slate-700 flex items-center gap-1.5 font-medium cursor-pointer">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              Mark as High Priority / Urgent Notice
            </label>
          </div>

          {error && (
            <p className="text-xs font-medium text-rose-600 bg-rose-50 p-2 rounded-md border border-rose-200">
              {error}
            </p>
          )}

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
              className="px-5 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-xs flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              Broadcast to Students
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  ExternalLink,
  Copy,
  Check,
  ChevronRight,
} from 'lucide-react';
import { ScheduleSession, UserRole } from '../types';

interface ScheduleViewProps {
  schedule: ScheduleSession[];
  role: UserRole;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ schedule, role }) => {
  // Current active day tab (1: Mon, 2: Tue, 3: Wed, 4: Thu, 5: Fri)
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [copied, setCopied] = useState(false);

  const days = [
    { num: 1, label: 'Monday', short: 'Mon' },
    { num: 2, label: 'Tuesday', short: 'Tue' },
    { num: 3, label: 'Wednesday', short: 'Wed' },
    { num: 4, label: 'Thursday', short: 'Thu' },
    { num: 5, label: 'Friday', short: 'Fri' },
  ];

  const sessionsForDay = schedule.filter((s) => s.dayOfWeek === selectedDay);

  const handleCopySummary = () => {
    const summary = sessionsForDay
      .map(
        (s) =>
          `[${s.startTime} - ${s.endTime}] ${s.courseCode}: ${s.courseTitle} (${s.type}) at ${s.room}`
      )
      .join('\n');

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Weekly Class Timetable</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {role === 'student'
              ? 'View lecture rooms, seminar halls, virtual meeting links, and lab hours.'
              : 'View assigned lecture halls, office hours, and section discussion schedules.'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopySummary}
          className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-2 self-start sm:self-auto transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700">Copied to Clipboard</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-500" />
              <span>Copy Daily Agenda</span>
            </>
          )}
        </button>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {days.map((day) => {
          const isSelected = selectedDay === day.num;
          const sessionCount = schedule.filter((s) => s.dayOfWeek === day.num).length;
          return (
            <button
              key={day.num}
              type="button"
              onClick={() => setSelectedDay(day.num)}
              className={`px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{day.label}</span>
              <span
                className={`px-1.5 py-0.5 text-[10px] rounded-full font-bold ${
                  isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {sessionCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Timeline List of Sessions for Selected Day */}
      <div className="space-y-3">
        {sessionsForDay.map((session, idx) => (
          <div
            key={session.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            {/* Time & Session Info */}
            <div className="flex items-start gap-4">
              <div className="w-24 shrink-0 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-xs font-bold text-slate-900 block">{session.startTime}</span>
                <span className="text-[10px] font-medium text-slate-600 block mt-0.5">
                  to {session.endTime}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs font-semibold rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {session.courseCode}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[11px] font-medium rounded ${
                      session.type === 'Lecture'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : session.type === 'Lab'
                        ? 'bg-teal-50 text-teal-700 border border-teal-200'
                        : session.type === 'Office Hours'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-purple-50 text-purple-700 border border-purple-200'
                    }`}
                  >
                    {session.type}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{session.courseTitle}</h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {session.room}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    {session.instructor}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Action */}
            <div className="flex items-center gap-3 self-end md:self-center shrink-0">
              {session.meetingUrl && (
                <a
                  href={session.meetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 shadow-2xs"
                >
                  <span>Launch Video Room</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}

        {sessionsForDay.length === 0 && (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500 space-y-1">
            <p className="font-semibold text-slate-700">No scheduled sessions for this day.</p>
            <p className="text-slate-600">Enjoy dedicated study hours or library research time.</p>
          </div>
        )}
      </div>
    </div>
  );
};

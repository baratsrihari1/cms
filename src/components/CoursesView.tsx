import React, { useState } from 'react';
import {
  BookOpen,
  User,
  MapPin,
  Clock,
  ArrowRight,
  Plus,
  Search,
  Filter,
  Users,
} from 'lucide-react';
import { Course, UserRole } from '../types';

interface CoursesViewProps {
  courses: Course[];
  role: UserRole;
  searchQuery: string;
  onSelectCourse: (course: Course) => void;
  onAddCourse: (newCourse: Course) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  courses,
  role,
  searchQuery,
  onSelectCourse,
  onAddCourse,
}) => {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New course state
  const [newCode, setNewCode] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDept, setNewDept] = useState('Computer Science');
  const [newRoom, setNewRoom] = useState('Turing Hall 202');
  const [newSchedule, setNewSchedule] = useState('Tue, Thu 10:00 AM - 11:30 AM');
  const [newDesc, setNewDesc] = useState('');

  const departments = ['All', 'Computer Science', 'Software Engineering', 'Mathematics', 'Artificial Intelligence'];

  const filteredCourses = courses.filter((c) => {
    const matchesDept = selectedDept === 'All' || c.department === selectedDept;
    const matchesSearch =
      !searchQuery.trim() ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim() || !newTitle.trim()) return;

    const created: Course = {
      id: `course-${Date.now()}`,
      code: newCode.trim().toUpperCase(),
      title: newTitle.trim(),
      department: newDept,
      instructor: 'Dr. Marcus Vance',
      instructorEmail: 'm.vance@university.edu',
      room: newRoom.trim(),
      scheduleText: newSchedule.trim(),
      color: 'border-l-indigo-500 text-indigo-600',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      term: 'Fall 2026',
      progress: 0,
      totalModules: 10,
      completedModules: 0,
      description: newDesc.trim() || 'Comprehensive exploration of curriculum topics and practical assignments.',
      syllabusTopics: ['Introduction & Environment Setup', 'Foundational Paradigms', 'Architectural Patterns', 'Applied Projects & Benchmarks'],
      enrolledStudentsCount: 24,
    };

    onAddCourse(created);
    setIsCreateModalOpen(false);
    setNewCode('');
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            {role === 'student' ? 'Registered Courses' : 'Taught Courses & Curriculum'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {role === 'student'
              ? 'Track syllabus progression, view lecture schedules, and download course documents.'
              : 'Manage class sections, syllabus topics, student capacities, and lecture rooms.'}
          </p>
        </div>

        {role === 'teacher' && (
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-2xs flex items-center gap-1.5 self-start sm:self-auto transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Course Section</span>
          </button>
        )}
      </div>

      {/* Department Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-semibold text-slate-600 mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" />
          Filter:
        </span>
        {departments.map((dept) => (
          <button
            key={dept}
            type="button"
            onClick={() => setSelectedDept(dept)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedDept === dept
                ? 'bg-indigo-600 text-white shadow-2xs font-semibold'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-4"
          >
            {/* Top row */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${course.badgeBg}`}>
                  {course.code}
                </span>
                <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  {course.term}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 line-clamp-1">{course.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Instructor, room, time strip */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-600" />
                  {course.instructor}
                </span>
                {role === 'teacher' && course.enrolledStudentsCount && (
                  <span className="flex items-center gap-1 text-slate-600">
                    <Users className="w-3.5 h-3.5 text-teal-600" />
                    {course.enrolledStudentsCount} students
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-slate-500 text-[11px]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {course.room}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {course.scheduleText.split(' ')[0]}
                </span>
              </div>

              {/* Syllabus Progress */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-medium text-slate-600">Syllabus Completion</span>
                  <span className="font-semibold text-indigo-600">{course.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Card Action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onSelectCourse(course)}
                className="w-full py-2 bg-slate-50 hover:bg-indigo-50/50 text-indigo-700 hover:text-indigo-800 rounded-xl text-xs font-semibold border border-slate-200 hover:border-indigo-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View Syllabus & Modules</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
          No courses match your filter or search criteria.
        </div>
      )}

      {/* Teacher Create Course Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900">Create Course Section</h2>

            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Course Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., CS 420"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Department</label>
                  <select
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Course Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Distributed Systems & Microservices"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Classroom / Hall</label>
                  <input
                    type="text"
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Lecture Schedule</label>
                  <input
                    type="text"
                    value={newSchedule}
                    onChange={(e) => setNewSchedule(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Description</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Overview of core curriculum principles..."
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

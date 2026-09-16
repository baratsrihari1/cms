import React, { useState } from 'react';
import {
  FolderOpen,
  FileText,
  Download,
  Eye,
  Plus,
  Search,
  Filter,
  Check,
  HardDrive,
  Calendar,
} from 'lucide-react';
import { ResourceMaterial, Course, UserRole } from '../types';

interface ResourcesViewProps {
  resources: ResourceMaterial[];
  courses: Course[];
  role: UserRole;
  searchQuery: string;
  onPreviewResource: (resource: ResourceMaterial) => void;
  onAddResource: (newResource: ResourceMaterial) => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({
  resources,
  courses,
  role,
  searchQuery,
  onPreviewResource,
  onAddResource,
}) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  // Upload modal state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newCourseId, setNewCourseId] = useState(courses[0]?.id || '');
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'pdf' | 'slides' | 'notes' | 'code'>('pdf');
  const [newDesc, setNewDesc] = useState('');
  const [newContent, setNewContent] = useState('');

  const filteredResources = resources.filter((res) => {
    const matchesType = selectedType === 'all' || res.type === selectedType;
    const matchesCourse = selectedCourse === 'all' || res.courseCode === selectedCourse;
    const matchesSearch =
      !searchQuery.trim() ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesCourse && matchesSearch;
  });

  const handleDownload = (id: string) => {
    setDownloadedId(id);
    setTimeout(() => setDownloadedId(null), 2000);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const courseObj = courses.find((c) => c.id === newCourseId) || courses[0];

    const created: ResourceMaterial = {
      id: `res-${Date.now()}`,
      courseId: courseObj.id,
      courseCode: courseObj.code,
      title: newTitle.trim(),
      type: newType,
      size: '2.1 MB',
      uploadDate: 'Just now',
      description: newDesc.trim() || 'Supplemental lecture material and reference guide.',
      previewContent:
        newContent.trim() ||
        `MODULE DOCUMENTATION: ${newTitle.toUpperCase()}\n\nCourse: ${courseObj.code} - ${courseObj.title}\nPrepared by Faculty for review.\n\nAll examples, diagrams, and problem exercises are licensed for enrolled campus students.`,
    };

    onAddResource(created);
    setIsUploadOpen(false);
    setNewTitle('');
    setNewDesc('');
    setNewContent('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Study Materials & Resources</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {role === 'student'
              ? 'Access lecture slide decks, algorithmic cheat sheets, and practice exam solutions.'
              : 'Upload and organize syllabus materials, textbook readings, and lab problem sheets.'}
          </p>
        </div>

        {role === 'teacher' && (
          <button
            type="button"
            onClick={() => setIsUploadOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-2xs flex items-center gap-1.5 self-start sm:self-auto transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Material</span>
          </button>
        )}
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'All Resources' },
            { id: 'pdf', label: 'PDF Guides' },
            { id: 'slides', label: 'Slide Decks' },
            { id: 'notes', label: 'Cheat Sheets' },
          ].map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setSelectedType(type.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                selectedType === type.id
                  ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium whitespace-nowrap">Course:</span>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Courses</option>
            {courses.map((c) => (
              <option key={c.id} value={c.code}>
                {c.code}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 text-xs font-semibold rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {resource.courseCode}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-slate-100 text-slate-600">
                  {resource.type}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-1">
                {resource.title}
              </h3>

              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {resource.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <HardDrive className="w-3.5 h-3.5" />
                  {resource.size}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {resource.uploadDate}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onPreviewResource(resource)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-medium transition-colors flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload(resource.id)}
                  className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg font-medium transition-colors flex items-center gap-1"
                >
                  {downloadedId === resource.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Saved</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
          No resources found for the selected category or filter.
        </div>
      )}

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900">Upload Course Document</h2>

            <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Select Course</label>
                  <select
                    value={newCourseId}
                    onChange={(e) => setNewCourseId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.code}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Resource Category</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="pdf">PDF Study Guide</option>
                    <option value="slides">Lecture Slide Deck</option>
                    <option value="notes">Quick Reference / Notes</option>
                    <option value="code">Starter Code & Specs</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asymptotic Complexity Master Sheet"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Summary / Topic Notes</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Short description of what this material covers..."
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Document Text & Formulas</label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Enter key equations, algorithmic steps, or summary notes for student viewing..."
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
                >
                  Publish Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

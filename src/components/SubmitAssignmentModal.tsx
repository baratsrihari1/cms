import React, { useState, useRef } from 'react';
import { X, UploadCloud, FileText, CheckCircle2, AlertTriangle, Link as LinkIcon } from 'lucide-react';
import { Assignment } from '../types';

interface SubmitAssignmentModalProps {
  assignment: Assignment;
  onClose: () => void;
  onSubmit: (assignmentId: string, submissionData: { fileName: string; fileSize: string; note: string; content?: string }) => void;
}

export const SubmitAssignmentModal: React.FC<SubmitAssignmentModalProps> = ({
  assignment,
  onClose,
  onSubmit,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [repositoryUrl, setRepositoryUrl] = useState('');
  const [studentNote, setStudentNote] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !repositoryUrl.trim()) {
      setError('Please upload a file or provide a project repository URL.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit(assignment.id, {
        fileName: file ? file.name : (repositoryUrl.includes('/') ? repositoryUrl.split('/').pop() || 'Repository Link' : 'Online Submission'),
        fileSize: file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : 'Cloud Link',
        note: studentNote.trim() || 'Work submitted on time.',
        content: repositoryUrl ? `Repo / Link: ${repositoryUrl}` : undefined,
      });
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-semibold rounded bg-indigo-100 text-indigo-800">
                {assignment.courseCode}
              </span>
              <span className="text-xs text-slate-600 font-medium">Assignment Submission</span>
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-1 line-clamp-1">
              {assignment.title}
            </h2>
          </div>
          <button
            id="close-submit-modal-btn"
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Submission Guidelines:</p>
              <p className="text-amber-800 mt-0.5">
                Maximum points: {assignment.points} pts. Due by {assignment.dueDate}. Ensure all source files or compiled reports are properly named before uploading.
              </p>
            </div>
          </div>

          {/* Drag & Drop Box */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Upload Files (PDF, ZIP, Code, Documents)
            </label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-indigo-500 bg-indigo-50/50'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-medium text-slate-800">
                <span className="text-indigo-600 font-semibold">Click to browse</span> or drag and drop files here
              </p>
              <p className="text-[11px] text-slate-600 mt-1">
                Supports .pdf, .zip, .py, .ts, .docx up to 25 MB
              </p>
            </div>

            {/* Selected File Badge */}
            {file && (
              <div className="flex items-center justify-between p-2.5 bg-indigo-50/60 border border-indigo-200 rounded-lg text-xs mt-2">
                <div className="flex items-center gap-2 text-indigo-900 truncate">
                  <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="font-medium truncate">{file.name}</span>
                  <span className="text-[11px] text-indigo-600 shrink-0">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="text-indigo-700 hover:text-indigo-900 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Repository / Drive Link Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              External Link / Repository (Optional)
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="url"
                value={repositoryUrl}
                onChange={(e) => setRepositoryUrl(e.target.value)}
                placeholder="https://github.com/username/project-repo"
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Note to Instructor */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Notes for Instructor (Optional)
            </label>
            <textarea
              rows={3}
              value={studentNote}
              onChange={(e) => setStudentNote(e.target.value)}
              placeholder="Mention any dependencies, testing commands, or notes regarding your implementation..."
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {error && (
            <p className="text-xs font-medium text-rose-600 bg-rose-50 p-2 rounded-md border border-rose-200">
              {error}
            </p>
          )}

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              id="confirm-submit-assignment-btn"
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-xs flex items-center gap-1.5 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              {isSubmitting ? 'Submitting...' : 'Turn In Work'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

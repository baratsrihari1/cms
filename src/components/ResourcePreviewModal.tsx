import React from 'react';
import { X, Download, FileText, Calendar, HardDrive, Check } from 'lucide-react';
import { ResourceMaterial } from '../types';

interface ResourcePreviewModalProps {
  resource: ResourceMaterial;
  onClose: () => void;
}

export const ResourcePreviewModal: React.FC<ResourcePreviewModalProps> = ({
  resource,
  onClose,
}) => {
  const [downloaded, setDownloaded] = React.useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs font-semibold rounded bg-indigo-100 text-indigo-800">
                  {resource.courseCode}
                </span>
                <span className="text-xs text-slate-600 uppercase tracking-wider font-semibold">
                  {resource.type.toUpperCase()} Document
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 line-clamp-1">
                {resource.title}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Bar */}
        <div className="px-6 py-2.5 bg-slate-100/70 border-b border-slate-200/80 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-slate-400" />
              {resource.size}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Uploaded {resource.uploadDate}
            </span>
          </div>
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-md text-slate-700 hover:bg-slate-50 font-medium transition-colors"
          >
            {downloaded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Saved to Downloads</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Save Offline</span>
              </>
            )}
          </button>
        </div>

        {/* Content Viewer */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/80">
            {resource.description}
          </p>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Document Preview & Notes
            </span>
            <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs leading-relaxed whitespace-pre-wrap overflow-x-auto shadow-inner border border-slate-800">
              {resource.previewContent}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-medium transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  CheckSquare,
  Calendar,
  FolderOpen,
  Award,
  Users,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { NavTab, UserRole } from '../types';

interface SidebarProps {
  currentTab: NavTab;
  setCurrentTab: (tab: NavTab) => void;
  role: UserRole;
  pendingAssignmentsCount: number;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  role,
  pendingAssignmentsCount,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const navItems = [
    {
      id: 'dashboard' as NavTab,
      label: 'Overview',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'courses' as NavTab,
      label: role === 'student' ? 'My Courses' : 'Taught Courses',
      icon: BookOpen,
      badge: null,
    },
    {
      id: 'assignments' as NavTab,
      label: 'Assignments',
      icon: CheckSquare,
      badge: pendingAssignmentsCount > 0 ? `${pendingAssignmentsCount}` : null,
    },
    {
      id: 'schedule' as NavTab,
      label: 'Timetable',
      icon: Calendar,
      badge: null,
    },
    {
      id: 'resources' as NavTab,
      label: 'Resources',
      icon: FolderOpen,
      badge: null,
    },
    {
      id: 'grades' as NavTab,
      label: role === 'student' ? 'Grades & GPA' : 'Class Roster',
      icon: role === 'student' ? Award : Users,
      badge: null,
    },
  ];

  const handleSelect = (tab: NavTab) => {
    setCurrentTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200 bg-white min-h-[calc(100vh-4rem)] p-4 justify-between shrink-0">
        <div className="space-y-6">
          {/* Active Mode Banner */}
          <div className="px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${role === 'student' ? 'bg-indigo-500' : 'bg-emerald-500'}`} />
              <span className="text-xs font-semibold text-slate-800">
                {role === 'student' ? 'Student Workspace' : 'Faculty Workspace'}
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-600 bg-white px-1.5 py-0.5 rounded border border-slate-200">
              Active
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <span className="px-3 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
              Navigation
            </span>
            <div className="mt-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`sidebar-nav-${item.id}`}
                    type="button"
                    onClick={() => handleSelect(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 ${
                          isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                          isActive
                            ? 'bg-indigo-600 text-white'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Bottom Semester Info Widget */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-700 font-medium">
            <span>Fall Term 2026</span>
            <span className="text-[11px] text-slate-600">Week 7 / 15</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div className="bg-indigo-600 h-1.5 rounded-full w-[47%]" />
          </div>
          <p className="text-[11px] text-slate-600 leading-normal">
            Midterm examination and project submission window in progress.
          </p>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative flex flex-col w-72 max-w-xs bg-white h-full shadow-2xl p-5 z-10 justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-slate-900 text-base">Menu</span>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>

              <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                <span className="font-semibold text-slate-800">
                  {role === 'student' ? 'Student Workspace' : 'Faculty Workspace'}
                </span>
                <span className="text-[11px] text-indigo-600 font-medium">Active</span>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelect(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-700 font-semibold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-800 font-medium">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
              <p className="font-medium text-slate-700">Need Campus Help?</p>
              <p className="text-[11px] text-slate-600 mt-0.5">Library desk & IT support open until 8 PM.</p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky Bottom Navigation (Touch friendly, >=44px) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              id={`mobile-bottom-${item.id}`}
              type="button"
              onClick={() => setCurrentTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg min-w-[56px] min-h-[44px] transition-colors relative ${
                isActive ? 'text-indigo-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] leading-tight tracking-tight">{item.label.split(' ')[0]}</span>
              {item.badge && (
                <span className="absolute top-1 right-3 w-2 h-2 bg-amber-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};

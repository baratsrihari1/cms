import React, { useState } from 'react';
import {
  GraduationCap,
  Bell,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  Menu,
  X,
  UserCheck,
  User
} from 'lucide-react';
import { UserRole, NotificationItem } from '../types';

interface NavbarProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  role,
  setRole,
  searchQuery,
  setSearchQuery,
  notifications,
  setNotifications,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-base tracking-tight text-slate-900 leading-none">
                  EduHub
                </span>
                <span className="text-[11px] font-medium text-slate-600 leading-tight mt-0.5">
                  Academic Workspace
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-2">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="global-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, assignments, topics..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Right actions: Role Switcher, Notifications, Profile */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Role Toggle Pill */}
            <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs font-medium text-slate-600">
              <button
                id="role-student-btn"
                type="button"
                onClick={() => setRole('student')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all ${
                  role === 'student'
                    ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Student View</span>
                <span className="sm:hidden">Student</span>
              </button>
              <button
                id="role-teacher-btn"
                type="button"
                onClick={() => setRole('teacher')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all ${
                  role === 'teacher'
                    ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Teacher View</span>
                <span className="sm:hidden">Teacher</span>
              </button>
            </div>

            {/* Notifications Popover */}
            <div className="relative">
              <button
                id="notifications-bell-btn"
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-lg z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="px-2 py-0.5 text-xs bg-indigo-50 text-indigo-700 font-medium rounded-full border border-indigo-100">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={markAllAsRead}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {notifications.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-600">
                        No recent notifications
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-3 rounded-lg border text-xs transition-colors relative group ${
                            n.read
                              ? 'bg-white border-slate-100 text-slate-600'
                              : 'bg-indigo-50/50 border-indigo-100 text-slate-900'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-1.5 font-medium text-slate-900">
                              {n.type === 'grade' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                              {n.type === 'assignment' && <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                              {n.type === 'announcement' && <AlertCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                              <span>{n.title}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => clearNotification(n.id)}
                              className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Dismiss"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="mt-1 text-slate-600 leading-relaxed">{n.message}</p>
                          <span className="inline-block mt-1.5 text-[11px] text-slate-600">{n.timestamp}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <img
                src={
                  role === 'student'
                    ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
                    : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'
                }
                alt="User Profile"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
              />
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-900 leading-none">
                  {role === 'student' ? 'Alex Chen' : 'Dr. Marcus Vance'}
                </span>
                <span className="text-[11px] text-slate-600 leading-none mt-1">
                  {role === 'student' ? 'Undergrad • CS' : 'Associate Professor'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="mobile-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, assignments, topics..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

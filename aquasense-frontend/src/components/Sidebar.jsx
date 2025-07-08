

import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/Dashboard1', label: 'Dashboard1' },
  { path: '/Waterusageoverview', label: 'Water Usage Overview' },
  { path: '/Waterinput', label: 'Water Input' },
  { path: '/Usagequota', label: 'Usage Quota' },
  { path: '/Alerts', label: 'Alerts' },
  { path: '/Optimizationtips', label: 'Optimization Tips' },
  { path: '/Leaderboard', label: 'Leaderboard' },
  { path: '/LocationComparison', label: 'Location Comparison' },
  { path: '/Watercycling', label: 'Water Recycling Tracker' },
  { path: '/SmartgardernScheduler', label: 'Smart Garden Scheduler' },
  { path: '/CommunityWall', label: 'Community Wall' },
  { path: '/productsuggestions', label: 'Product Suggestions' },
];

export default function Sidebar({ isOpen, onClose, className = '' }) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`
          ${className}
          bg-indigo-700 text-white p-6 flex flex-col
        `}
        aria-label="Primary Navigation"
      >
        <h1 className="text-2xl font-bold mb-8">AquaSense</h1>

        <nav className="flex flex-col space-y-3 flex-1 overflow-auto" role="navigation" tabIndex={0}>
          {navItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `rounded px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  isActive ? 'bg-indigo-900 font-semibold' : 'hover:bg-indigo-600'
                }`
              }
              end={path === '/Dashboard1'}
              onClick={onClose}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto text-sm text-indigo-300">© 2025 AquaSense</div>
      </aside>
    </>
  );
}
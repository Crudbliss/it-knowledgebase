import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  GitBranch,
  FileText,
  Braces,
  GitPullRequest,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/', icon: LayoutDashboard, exact: true },
  { label: 'Knowledge Structure', to: '/structure', icon: GitBranch },
  { label: 'Articles', to: '/articles', icon: FileText },
  { label: 'JSON Export', to: '/json-export', icon: Braces },
  { label: 'Workflow & Versioning', to: '/workflow', icon: GitPullRequest },
]

const CATEGORY_ITEMS = [
  { label: 'Networking', to: '/articles?category=networking', color: '#228BE6' },
  { label: 'Hardware', to: '/articles?category=hardware', color: '#FD7E14' },
  { label: 'Software', to: '/articles?category=software', color: '#40C057' },
  { label: 'Troubleshooting', to: '/articles?category=troubleshooting', color: '#FA5252' },
]

interface SidebarProps {
  onNavigate?: () => void
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const location = useLocation()

  return (
    <aside className="w-[210px] min-w-[210px] bg-white border-r border-gray-200 flex flex-col h-full overflow-y-auto">
      {/* Brand */}
      <div className="px-3.5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-[11px] font-bold font-mono flex-shrink-0">
            IK
          </div>
          <div>
            <p className="text-[13px] font-semibold text-gray-900 leading-tight">
              IT KnowledgeBase
            </p>
            <p className="text-[10px] text-gray-400 leading-tight mt-0.5">
              Content Management
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-2 pt-3">
        <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
          Navigation
        </p>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = item.exact
            ? location.pathname === item.to
            : location.pathname === item.to
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              onClick={onNavigate}
              className={({ isActive: active }) =>
                cn(
                  'flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[13px] mb-0.5 transition-colors',
                  active
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                )
              }
            >
              <Icon size={14} className="flex-shrink-0" />
              {item.label}
            </NavLink>
          )
        })}
      </div>

      {/* Categories */}
      <div className="px-2 pt-4">
        <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
          Categories
        </p>
        {CATEGORY_ITEMS.map((item) => {
          const params = new URLSearchParams(item.to.split('?')[1] || '')
          const cat = params.get('category')
          const isActive =
            location.pathname === '/articles' &&
            new URLSearchParams(location.search).get('category') === cat
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[13px] mb-0.5 transition-colors',
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-medium'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              )}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              {item.label}
            </NavLink>
          )
        })}
      </div>

      {/* Stats Box */}
      <div className="mt-auto mx-2 mb-3">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
            Knowledge Stats
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {[
              { val: '6', lbl: 'Articles' },
              { val: '4', lbl: 'Categories' },
              { val: '5', lbl: 'Published' },
              { val: '1', lbl: 'In Review' },
            ].map(({ val, lbl }) => (
              <div key={lbl}>
                <p className="text-base font-semibold text-gray-900">{val}</p>
                <p className="text-[10px] text-gray-400">{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

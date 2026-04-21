import {
  MetricCards,
  StatusOverview,
  CategoryGrid,
  RecentArticles,
  TrendingArticles,
  TagCloud,
} from '@/components/dashboard'
import { useNavigate } from 'react-router-dom'

export function DashboardPage() {
  const navigate = useNavigate()

  return (
    <div className="p-5">
      <h1 className="text-[22px] font-semibold text-gray-900 mb-4">
        Dashboard
      </h1>

      {/* Welcome Banner */}
      <div
        className="relative overflow-hidden rounded-xl p-6 mb-5 text-white"
        style={{
          background:
            'linear-gradient(135deg, #3B5BDB 0%, #4C6EF5 60%, #748FFC 100%)',
        }}
      >
        {/* Decorative circles */}
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/[0.07]" />
        <div className="absolute right-16 top-12 w-20 h-20 rounded-full bg-white/[0.05]" />

        <div className="relative z-10">
          <p className="text-[11px] font-medium text-white/70 mb-1 uppercase tracking-widest">
            IT KnowledgeBase System
          </p>
          <h2 className="text-[20px] font-semibold mb-1.5">
            Welcome to IT KnowledgeBase
          </h2>
          <p className="text-[12px] text-white/75 max-w-md leading-relaxed mb-4">
            A centralised repository for IT documentation, structured articles,
            troubleshooting guides, and knowledge management workflows. Find
            answers fast, share knowledge effectively.
          </p>
          <div className="flex gap-2 flex-wrap">
            {[
              {
                label: '📄 Browse Articles',
                action: () => navigate('/articles'),
              },
              {
                label: '🗂 View Structure',
                action: () => navigate('/structure'),
              },
              {
                label: '⚙️ Workflow Docs',
                action: () => navigate('/workflow'),
              },
            ].map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                className="px-3.5 py-1.5 rounded-lg text-[12px] font-medium bg-white/20 hover:bg-white/30 transition-colors border border-white/25 backdrop-blur-sm"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics */}
      <MetricCards />

      {/* Two Column: Status + Categories */}
      <div className="grid grid-cols-2 gap-3.5 mb-3.5">
        <StatusOverview />
        <CategoryGrid />
      </div>

      {/* Two Column: Recent + Trending */}
      <div className="grid grid-cols-2 gap-3.5 mb-3.5">
        <RecentArticles />
        <TrendingArticles />
      </div>

      {/* Tag Cloud */}
      <TagCloud />
    </div>
  )
}

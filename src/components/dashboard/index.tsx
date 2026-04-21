import { FileText, Layers, Users, Tag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ARTICLES, CATEGORIES, ALL_TAGS } from '@/data/mock'
import { StatusBadge, Tag as TagComp, SectionHeader, Card, IdBadge } from '@/components/ui/shared'
import type { ArticleStatus } from '@/types'

// ─── MetricCard ──────────────────────────────────────────────────
const METRIC_DATA = [
  {
    value: '6',
    label: 'Total Articles',
    Icon: FileText,
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  {
    value: '4',
    label: 'Categories',
    Icon: Layers,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    value: '6',
    label: 'Authors',
    Icon: Users,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    value: '20',
    label: 'Unique Tags',
    Icon: Tag,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
]

export function MetricCards() {
  return (
    <div className="grid grid-cols-4 gap-3 mb-5">
      {METRIC_DATA.map(({ value, label, Icon, iconBg, iconColor }) => (
        <Card key={label} className="flex flex-col gap-2">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center ${iconBg}`}
          >
            <Icon size={14} className={iconColor} />
          </div>
          <div>
            <p className="text-[22px] font-semibold text-gray-900 leading-tight">
              {value}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">{label}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}

// ─── StatusOverview ──────────────────────────────────────────────
const STATUS_ROWS: {
  label: string
  status: ArticleStatus
  color: string
  barColor: string
}[] = [
  { label: 'Published', status: 'published', color: 'bg-green-500', barColor: 'bg-green-500' },
  { label: 'Review', status: 'review', color: 'bg-yellow-400', barColor: 'bg-yellow-400' },
  { label: 'Draft', status: 'draft', color: 'bg-gray-300', barColor: 'bg-gray-300' },
  { label: 'Archived', status: 'archived', color: 'bg-gray-400', barColor: 'bg-gray-400' },
]

export function StatusOverview() {
  const counts = ARTICLES.reduce(
    (acc, a) => ({ ...acc, [a.status]: (acc[a.status] ?? 0) + 1 }),
    {} as Record<ArticleStatus, number>
  )
  const total = ARTICLES.length

  return (
    <Card>
      <SectionHeader title="Article Status Overview" />
      <div className="space-y-2">
        {STATUS_ROWS.map(({ label, status, color, barColor }) => {
          const count = counts[status] ?? 0
          const pct = total ? Math.round((count / total) * 100) : 0
          return (
            <div key={status} className="flex items-center gap-2 text-[12px]">
              <span className={`w-2 h-2 rounded-sm flex-shrink-0 ${color}`} />
              <span className="flex-1 text-gray-600">{label}</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${barColor} transition-all`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-4 text-right font-medium text-gray-700">
                {count}
              </span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

// ─── CategoryGrid ────────────────────────────────────────────────
export function CategoryGrid() {
  const navigate = useNavigate()
  return (
    <Card>
      <SectionHeader
        title="Knowledge Categories"
        action={
          <button
            onClick={() => navigate('/structure')}
            className="text-[12px] text-indigo-600 font-medium hover:text-indigo-700"
          >
            View all →
          </button>
        }
      />
      <div className="grid grid-cols-2 gap-2.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() =>
              navigate(`/articles?category=${cat.key}`)
            }
            className="text-left p-3 border border-gray-100 rounded-lg hover:border-indigo-200 transition-colors group"
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center mb-2 text-base"
              style={{ backgroundColor: cat.bgColor }}
            >
              {cat.icon}
            </div>
            <p className="text-[13px] font-medium text-gray-800 group-hover:text-indigo-700 transition-colors">
              {cat.label}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">
              {cat.articleCount} articles · {cat.subcategories.length}{' '}
              subcategories
            </p>
          </button>
        ))}
      </div>
    </Card>
  )
}

// ─── RecentArticles ──────────────────────────────────────────────
export function RecentArticles() {
  const navigate = useNavigate()
  return (
    <Card className="mb-3.5">
      <SectionHeader
        title="Recently Updated Articles"
        action={
          <button
            onClick={() => navigate('/articles')}
            className="text-[12px] text-indigo-600 font-medium hover:text-indigo-700"
          >
            View all →
          </button>
        }
      />
      <div className="divide-y divide-gray-50">
        {ARTICLES.slice(0, 4).map((article) => (
          <div
            key={article.id}
            onClick={() => navigate(`/article/${article.id}`)}
            className="flex items-start gap-2.5 py-2.5 first:pt-0 last:pb-0 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-indigo-50 transition-colors">
              <FileText size={13} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-gray-800 group-hover:text-indigo-600 truncate leading-tight transition-colors">
                {article.title}
              </p>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <IdBadge id={article.id} />
                <span className="text-[11px] text-gray-400">
                  {article.category}
                </span>
                <span className="text-[11px] text-gray-400">
                  🕐 {article.readTime} read
                </span>
                <span className="text-[11px] text-gray-400">
                  Updated {article.updatedAt}
                </span>
              </div>
            </div>
            <StatusBadge status={article.status} />
          </div>
        ))}
      </div>
    </Card>
  )
}

// ─── TrendingArticles ──────────────────────────────────────────────
export function TrendingArticles() {
  const navigate = useNavigate()
  // Sort by views descending
  const trending = [...ARTICLES].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 4)
  
  return (
    <Card className="mb-3.5">
      <SectionHeader
        title="Trending & Most Helpful"
      />
      <div className="divide-y divide-gray-50">
        {trending.map((article) => (
          <div
            key={article.id}
            onClick={() => navigate(`/article/${article.id}`)}
            className="flex items-start gap-2.5 py-2.5 first:pt-0 last:pb-0 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[13px]">🔥</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-gray-800 group-hover:text-indigo-600 truncate leading-tight transition-colors">
                {article.title}
              </p>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="text-[11px] text-indigo-600 font-medium">
                  {article.views?.toLocaleString()} views
                </span>
                <span className="text-[11px] text-gray-300">·</span>
                <span className="text-[11px] text-green-600 font-medium">
                  {article.helpfulCount} found helpful
                </span>
                <span className="text-[11px] text-gray-300">·</span>
                <span className="text-[11px] text-gray-400">
                  {article.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

// ─── TagCloud ────────────────────────────────────────────────────
export function TagCloud() {
  const navigate = useNavigate()
  return (
    <Card>
      <SectionHeader
        title="All Content Tags"
        action={
          <span className="text-[11px] text-gray-400">20 tags</span>
        }
      />
      <div className="flex flex-wrap gap-1.5">
        {ALL_TAGS.map((tag) => (
          <TagComp
            key={tag}
            tag={tag}
            onClick={(t) =>
              navigate(`/articles?search=${encodeURIComponent(t)}`)
            }
          />
        ))}
      </div>
    </Card>
  )
}

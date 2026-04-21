import { cn } from '@/lib/utils'
import type { ArticleStatus } from '@/types'
import { TAG_COLORS } from '@/data/mock'

// ─── StatusBadge ────────────────────────────────────────────────
interface StatusBadgeProps {
  status: ArticleStatus
  className?: string
}

const STATUS_CONFIG: Record<
  ArticleStatus,
  { label: string; className: string }
> = {
  published: {
    label: '● Published',
    className: 'bg-green-100 text-green-700',
  },
  review: {
    label: '● Review',
    className: 'bg-yellow-100 text-yellow-700',
  },
  draft: {
    label: '● Draft',
    className: 'bg-gray-100 text-gray-600',
  },
  archived: {
    label: '● Archived',
    className: 'bg-gray-100 text-gray-500',
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status]
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}

// ─── Tag ────────────────────────────────────────────────────────
interface TagProps {
  tag: string
  onClick?: (tag: string) => void
  className?: string
}

export function Tag({ tag, onClick, className }: TagProps) {
  const colors = TAG_COLORS[tag] ?? {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
  }
  return (
    <span
      onClick={() => onClick?.(tag)}
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium',
        colors.bg,
        colors.text,
        onClick && 'cursor-pointer hover:opacity-80 transition-opacity',
        className
      )}
    >
      #{tag}
    </span>
  )
}

// ─── SectionHeader ──────────────────────────────────────────────
interface SectionHeaderProps {
  title: string
  action?: React.ReactNode
}

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-[13px] font-semibold text-gray-800">{title}</h3>
      {action}
    </div>
  )
}

// ─── Card ────────────────────────────────────────────────────────
interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white border border-gray-200 rounded-xl p-4',
        className
      )}
    >
      {children}
    </div>
  )
}

// ─── Breadcrumb ──────────────────────────────────────────────────
interface BreadcrumbProps {
  items: string[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-3">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span>/</span>}
          <span>{item}</span>
        </span>
      ))}
    </div>
  )
}

// ─── IdBadge ────────────────────────────────────────────────────
export function IdBadge({ id }: { id: string }) {
  return (
    <span className="font-mono text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
      {id}
    </span>
  )
}

import { Lock, Eye, Edit, Shield } from 'lucide-react'
import { WORKFLOW_STAGES, COLLABORATION_ROLES, VERSION_ENTRIES } from '@/data/mock'
import { cn } from '@/lib/utils'
import type { WorkflowAction } from '@/types'

// ─── LifecycleDiagram ─────────────────────────────────────────────
export function LifecycleDiagram() {
  const stages = [
    { name: 'Draft', icon: '✏️', bg: 'bg-gray-100', color: 'text-gray-600', ring: 'ring-gray-200' },
    { name: 'Review', icon: '🔍', bg: 'bg-yellow-100', color: 'text-yellow-700', ring: 'ring-yellow-200' },
    { name: 'Published', icon: '✅', bg: 'bg-green-100', color: 'text-green-700', ring: 'ring-green-200' },
    { name: 'Archived', icon: '🗄', bg: 'bg-gray-100', color: 'text-gray-500', ring: 'ring-gray-200' },
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
      <p className="text-[13px] font-semibold text-gray-800 mb-4">
        Content Lifecycle: Draft → Review → Published → Archived
      </p>
      <div className="relative flex items-center justify-between">
        {/* connector line */}
        <div className="absolute left-[12%] right-[12%] top-5 h-0.5 bg-gray-200 z-0" />
        {stages.map(({ name, icon, bg, color, ring }) => (
          <div key={name} className="flex flex-col items-center gap-2 z-10">
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center text-lg ring-2',
                bg, ring
              )}
            >
              {icon}
            </div>
            <p className={cn('text-[12px] font-medium', color)}>{name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── ActionButton ─────────────────────────────────────────────────
function ActionButton({ action }: { action: WorkflowAction }) {
  const cls = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100',
  }
  return (
    <button
      className={cn(
        'inline-flex items-center px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors',
        cls[action.variant]
      )}
    >
      {action.label}
    </button>
  )
}

// ─── WorkflowStageCards ───────────────────────────────────────────
export function WorkflowStageCards() {
  const permIcon = (perm: string) => {
    if (perm.toLowerCase().includes('author')) return <Edit size={10} className="text-gray-400 flex-shrink-0" />
    if (perm.toLowerCase().includes('reviewer')) return <Eye size={10} className="text-gray-400 flex-shrink-0" />
    if (perm.toLowerCase().includes('admin')) return <Shield size={10} className="text-gray-400 flex-shrink-0" />
    return <Lock size={10} className="text-gray-400 flex-shrink-0" />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
      {WORKFLOW_STAGES.map((stage) => (
        <div
          key={stage.name}
          className="rounded-xl p-4 border"
          style={{
            backgroundColor: stage.bgColor,
            borderColor: stage.borderColor,
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-black/[0.06]">
            <span className="text-base">{stage.icon}</span>
            <span className="text-[13px] font-semibold text-gray-800">
              {stage.label}
            </span>
          </div>

          {/* Description */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
              Description
            </p>
            <p className="text-[12px] text-gray-600 leading-relaxed mb-3">
              {stage.description}
            </p>
          </div>

          {/* Permissions */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
              Access Permissions
            </p>
            <div className="space-y-1 mb-3">
              {stage.permissions.map((p) => (
                <div key={p} className="flex items-center gap-1.5 text-[12px] text-gray-600">
                  {permIcon(p)}
                  {p}
                </div>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
              Business Rules
            </p>
            <div className="space-y-1 mb-3">
              {stage.rules.slice(0, 3).map((r) => (
                <div key={r} className="flex items-start gap-1.5 text-[12px] text-gray-600">
                  <span className="text-indigo-500 font-bold leading-none mt-0.5">›</span>
                  {r}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
              Available Actions
            </p>
            <div className="flex flex-wrap gap-2">
              {stage.actions.map((action) => (
                <ActionButton key={action.label} action={action} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── VersioningPolicy ─────────────────────────────────────────────
export function VersioningPolicy() {
  const variantStyle = {
    initial: 'bg-cyan-100 text-cyan-700',
    minor: 'bg-indigo-100 text-indigo-700',
    major: 'bg-yellow-100 text-yellow-700',
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
      <p className="text-[13px] font-semibold text-gray-800 mb-1">
        Versioning Policy (Semantic Versioning for Content)
      </p>
      <p className="text-[12px] text-gray-500 mb-3 leading-relaxed">
        Versioning format:{' '}
        <code className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-[11px]">
          vMAJOR.MINOR
        </code>{' '}
        — A major bump (v1→v2) indicates a full content overhaul. A minor bump
        (v1.1→v1.2) indicates small corrections or additions. The version is
        locked when an article is Published; edits create a new Draft version.
      </p>
      <div className="divide-y divide-gray-100">
        {VERSION_ENTRIES.map((entry) => (
          <div
            key={entry.tag}
            className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0"
          >
            <span
              className={cn(
                'inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold font-mono flex-shrink-0 mt-0.5',
                variantStyle[entry.variant]
              )}
            >
              {entry.tag}
            </span>
            <div>
              <p className="text-[12px] font-medium text-gray-800">
                {entry.title}
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Trigger: {entry.trigger}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Rules summary */}
      <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-[11px] font-semibold text-yellow-700 mb-2">
          Versioning Rules Summary
        </p>
        {[
          'Versions are immutable once Published — you cannot edit v1.0 directly',
          'A new Draft is always created from the current Published version as a baseline',
          'All previous versions are stored and accessible to administrators',
          'The system always surfaces the highest Published version to users',
          'Version history is part of the audit trail for compliance',
        ].map((rule) => (
          <div key={rule} className="flex items-start gap-1.5 text-[11px] text-yellow-700 py-0.5">
            <span className="mt-0.5">•</span>
            {rule}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── CollaborationRoles ───────────────────────────────────────────
export function CollaborationRoles() {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[13px] font-semibold text-gray-800">
          Collaboration & Author Roles
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {COLLABORATION_ROLES.map((role) => (
          <div
            key={role.name}
            className={cn(
              'rounded-xl p-4 border',
              role.colorClass
            )}
          >
            <p className="text-[13px] font-semibold text-gray-800 mb-2">
              {role.name}
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
              Responsibilities
            </p>
            <div className="space-y-1 mb-3">
              {role.responsibilities.map((r) => (
                <div key={r} className="flex items-start gap-1.5 text-[11px] text-gray-600">
                  <span className="text-indigo-500 font-bold leading-none mt-0.5">›</span>
                  {r}
                </div>
              ))}
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
              Permissions
            </p>
            <div className="space-y-1">
              {role.permissions.map((p) => (
                <div key={p} className="flex items-start gap-1.5 text-[11px] text-gray-600">
                  <span className="text-indigo-500 font-bold leading-none mt-0.5">›</span>
                  {p}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── IntegrationsPanel ────────────────────────────────────────────
const INTEGRATION_SECTIONS = [
  {
    icon: '🔍',
    name: 'Search Systems',
    sub: 'Elasticsearch / Algolia / Azure Search',
    items: [
      'Index article id, title, problem, tags and category fields for full-text search',
      'Use status Published filter to only surface live articles to end-users',
      'Tag arrays enable multi-faceted filtering (e.g. filter by "urgent" AND "windows")',
    ],
  },
  {
    icon: '🔐',
    name: 'Security & Access Control',
    sub: 'Role-Based Access / Audit Logging',
    items: [
      'Status field gates visibility: Draft and Review articles require author/reviewer role',
      'Author field enables ownership-based edit permissions',
      'Date and version fields create an immutable audit trail of all content changes',
    ],
  },
  {
    icon: '📊',
    name: 'Analytics & Reporting',
    sub: 'Power BI / Looker / Custom Dashboards',
    items: [
      'Track article view counts, search hit rates, and feedback scores by category and tag',
      'Use status distribution to measure knowledge management health (% Published vs Draft)',
      'Author field enables productivity metrics per team member',
    ],
  },
  {
    icon: '⚡',
    name: 'Integrations & Automation',
    sub: 'Webhooks / Zapier / Power Automate',
    items: [
      'Trigger notification workflows when an article changes status (e.g. Draft → Review)',
      'Auto-generate ITSM tickets for articles approaching scheduled review date',
      'Sync with Microsoft Teams or Slack to surface relevant articles on search queries',
    ],
  },
]

export function IntegrationsPanel() {
  return (
    <div className="bg-[#1e2a4a] rounded-xl p-4">
      <p className="text-[12px] font-semibold text-white/80 mb-3 flex items-center gap-2">
        <span>⚡</span> How This Data Is Used by Other Systems
      </p>
      <div className="grid grid-cols-2 gap-3">
        {INTEGRATION_SECTIONS.map(({ icon, name, sub, items }) => (
          <div key={name} className="bg-white/[0.07] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-sm">
                {icon}
              </div>
              <div>
                <p className="text-[12px] font-semibold text-white leading-tight">
                  {name}
                </p>
                <p className="text-[10px] text-white/40 leading-tight">{sub}</p>
              </div>
            </div>
            <div className="space-y-1">
              {items.map((item) => (
                <div key={item} className="flex items-start gap-1.5 text-[11px] text-white/60">
                  <span className="text-indigo-400 font-bold leading-none mt-0.5 flex-shrink-0">›</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

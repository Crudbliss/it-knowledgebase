import { useState } from 'react'
import { Download, Copy, ChevronDown, ChevronUp, Check } from 'lucide-react'
import type { Article } from '@/types'
import { StatusBadge, IdBadge } from '@/components/ui/shared'
import { CATEGORIES } from '@/data/mock'
import { cn } from '@/lib/utils'

// ─── JSON serialiser ─────────────────────────────────────────────
function articleToJSON(article: Article): object {
  return {
    id: article.id,
    title: article.title,
    category: article.category,
    subcategory: article.subcategory,
    tags: article.tags,
    content: {
      problem: article.description,
      solution: 'See full article for detailed solution steps.',
      steps: [
        {
          step: 1,
          title: 'Initial assessment',
          description: 'Assess the problem environment before proceeding.',
        },
      ],
    },
    version: article.version,
    status: article.status,
    author: article.author,
    date: article.updatedAt,
    readTime: article.readTime,
  }
}

// ─── CodeBlock ───────────────────────────────────────────────────
function CodeBlock({ json }: { json: object }) {
  const lines = JSON.stringify(json, null, 2).split('\n')

  const colorize = (line: string) => {
    // key
    if (/"[\w-]+":\s/.test(line)) {
      const [key, ...rest] = line.split(/:(.+)/)
      return (
        <>
          <span className="text-[#79c0ff]">{key}</span>
          <span className="text-gray-400">:</span>
          <span className={/true|false|null|\d+/.test(rest.join(':').trim())
            ? 'text-[#d2a8ff]' : 'text-[#a5d6ff]'}>{rest.join(':')}</span>
        </>
      )
    }
    if (/^\s*[{\[\]},]/.test(line)) return <span className="text-gray-400">{line}</span>
    return <span className="text-[#a5d6ff]">{line}</span>
  }

  return (
    <div className="bg-[#161b22] rounded-lg p-3.5 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-64 overflow-y-auto">
      {lines.map((line, i) => (
        <div key={i} className="whitespace-pre">
          {colorize(line)}
        </div>
      ))}
    </div>
  )
}

// ─── CopyButton ──────────────────────────────────────────────────
function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 px-2 py-1 border border-gray-200 rounded text-[11px] text-gray-500 hover:bg-gray-50 transition-colors"
    >
      {copied ? <Check size={10} className="text-green-600" /> : <Copy size={10} />}
      {copied ? 'Copied!' : label}
    </button>
  )
}

// ─── JSONItem ────────────────────────────────────────────────────
interface JSONItemProps {
  article: Article
  defaultOpen?: boolean
}

export function JSONItem({ article, defaultOpen = false }: JSONItemProps) {
  const [open, setOpen] = useState(defaultOpen)
  const catInfo = CATEGORIES.find(
    (c) => c.key === article.category.toLowerCase()
  )
  const json = articleToJSON(article)
  const jsonStr = JSON.stringify(json, null, 2)

  return (
    <div
      className={cn(
        'border rounded-xl transition-colors overflow-hidden',
        open ? 'border-indigo-300' : 'border-gray-200 hover:border-gray-300'
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2.5 px-3.5 py-3 bg-white hover:bg-gray-50/50 transition-colors text-left"
      >
        {/* Icon */}
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[11px] font-semibold text-indigo-700 bg-indigo-50 font-mono"
        >
          {article.id.split('-')[1]}
        </div>
        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-medium text-gray-800 truncate">
            {article.title}
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">
            {article.category} · {article.subcategory}
          </p>
        </div>
        {/* Right */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <StatusBadge status={article.status} />
          <span className="font-mono text-[10px] text-gray-400">
            {article.version}
          </span>
          <CopyButton text={jsonStr} />
          {open ? (
            <ChevronUp size={14} className="text-gray-400" />
          ) : (
            <ChevronDown size={14} className="text-gray-400" />
          )}
        </div>
      </button>

      {open && (
        <div className="px-3.5 pb-3.5 bg-white border-t border-gray-100">
          <CodeBlock json={json} />
        </div>
      )}
    </div>
  )
}

// ─── JSONControls ────────────────────────────────────────────────
interface JSONControlsProps {
  filter: string
  onFilterChange: (v: string) => void
  articles: Article[]
}

export function JSONControls({ filter, onFilterChange, articles }: JSONControlsProps) {
  const allJSON = JSON.stringify(articles.map(articleToJSON), null, 2)

  const handleDownload = () => {
    const blob = new Blob([allJSON], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'knowledgebase-export.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-3.5">
      <select
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="flex-1 max-w-[200px] px-2.5 py-1.5 border border-gray-200 rounded-lg text-[12px] text-gray-600 bg-white outline-none"
      >
        <option value="all">All {articles.length} Articles</option>
        <option value="published">Published Only</option>
        <option value="networking">Networking</option>
        <option value="hardware">Hardware</option>
        <option value="software">Software</option>
        <option value="troubleshooting">Troubleshooting</option>
      </select>
      <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-[12px] text-gray-600 bg-white hover:bg-gray-50 transition-colors">
        {'{ }'} JSON Schema
      </button>
      <CopyButton text={allJSON} label="Copy JSON" />
      <button
        onClick={handleDownload}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-[12px] font-medium hover:bg-indigo-700 transition-colors"
      >
        <Download size={12} />
        Download
      </button>
    </div>
  )
}

// ─── IntegrationReference ─────────────────────────────────────────
const INTEGRATIONS = [
  {
    title: 'Search Index',
    subtitle: 'Elasticsearch / Algolia / Azure Search',
    code: 'PUT /kb-articles/_doc/{id}\n{ "title": ..., "tags": [...] }',
    desc: 'Ingest this JSON into Elasticsearch using the id, title, tags, and problem fields for full-text search.',
  },
  {
    title: 'REST API Endpoint',
    subtitle: 'GET with query parameters for filtered responses',
    code: 'GET /api/v1/articles?category=Networking\n&status=Published&tags=[]',
    desc: 'Expose articles via a REST API. Use category, status, and tag query parameters for filtered responses.',
  },
  {
    title: 'Analytics Pipeline',
    subtitle: 'Power BI / Looker / Custom Dashboards',
    code: '{ "event": "article_view",\n  "article_id": "KB-001",\n  "tags": ["dns","windows"] }',
    desc: 'Expose article metadata alongside metadata to your analytics tool. Use tags and category for dimension filtering.',
  },
]

export function IntegrationReference() {
  return (
    <div className="bg-[#1e2a4a] rounded-xl p-4 mt-3.5">
      <p className="text-[12px] font-semibold text-white/80 mb-3 flex items-center gap-2">
        <span>⚡</span> System Integration Reference
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {INTEGRATIONS.map(({ title, subtitle, code, desc }) => (
          <div key={title} className="bg-white/[0.07] rounded-lg p-3">
            <p className="text-[12px] font-semibold text-white mb-1">{title}</p>
            <p className="text-[10px] text-white/50 mb-2 leading-relaxed">{desc}</p>
            <div className="bg-black/30 rounded p-2 font-mono text-[10px] text-[#79c0ff] whitespace-pre-wrap">
              {code}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

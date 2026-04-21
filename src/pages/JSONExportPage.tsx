import { useState, useMemo } from 'react'
import { Info } from 'lucide-react'
import { ARTICLES } from '@/data/mock'
import { Breadcrumb } from '@/components/ui/shared'
import {
  JSONItem,
  JSONControls,
  IntegrationReference,
} from '@/components/json'
import type { Article } from '@/types'

export function JSONExportPage() {
  const [filter, setFilter] = useState('all')

  const filtered: Article[] = useMemo(() => {
    if (filter === 'all') return ARTICLES
    if (filter === 'published') return ARTICLES.filter((a) => a.status === 'published')
    return ARTICLES.filter((a) => a.category.toLowerCase() === filter)
  }, [filter])

  return (
    <div className="p-5">
      <Breadcrumb items={['JSON Export']} />
      <h1 className="text-[22px] font-semibold text-gray-900 mb-4">
        JSON Export
      </h1>

      {/* Header card */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
        <p className="text-[13px] font-semibold text-gray-800 mb-1">
          JSON Format — All Articles
        </p>
        <p className="text-[12px] text-gray-500 leading-relaxed mb-3">
          All knowledgebase articles exported as structured JSON. Use this data
          for system integrations, search indexing, API endpoints, or analytics
          pipelines.
        </p>
        {/* Info bar */}
        <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2.5">
          <Info size={13} className="text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-[12px] text-blue-700 leading-relaxed">
            <strong>Structured Data Export.</strong> Each article is serialised
            into a consistent JSON schema with fields:{' '}
            <code className="font-mono bg-blue-100 px-1 py-0.5 rounded text-[11px]">
              id, title, category, subcategory, tags[], content, version,
              status, author, date
            </code>
          </p>
        </div>
      </div>

      {/* Controls */}
      <JSONControls
        filter={filter}
        onFilterChange={setFilter}
        articles={filtered}
      />

      {/* JSON items list */}
      <div className="space-y-2 mb-2">
        {filtered.map((article, i) => (
          <JSONItem
            key={article.id}
            article={article}
            defaultOpen={i === filtered.length - 2}
          />
        ))}
      </div>

      {/* Integration reference */}
      <IntegrationReference />
    </div>
  )
}

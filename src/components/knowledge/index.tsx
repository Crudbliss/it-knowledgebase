import { useNavigate } from 'react-router-dom'
import { Tag as TagIcon, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import type { Category } from '@/types'
import { CATEGORIES, ALL_TAGS } from '@/data/mock'
import { Tag, Card } from '@/components/ui/shared'

// ─── ArchBanner ──────────────────────────────────────────────────
export function ArchBanner() {
  return (
    <div className="bg-[#1e2a4a] rounded-xl p-5 mb-4 text-white">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60 mb-3">
        Architecture Overview
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-4">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.key}
            className="bg-white/10 rounded-lg p-3 text-center"
          >
            <div className="text-xl mb-1">{cat.icon}</div>
            <p className="text-[12px] font-semibold capitalize">{cat.label}</p>
            <p className="text-[10px] text-white/50 mt-0.5">
              {cat.subcategories.length} sub · {cat.articleCount} articles
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 pt-3.5 border-t border-white/15">
        {[
          { val: '4', lbl: 'Main Categories' },
          { val: '24', lbl: 'Total Subcategories' },
          { val: '20', lbl: 'Available Tags' },
        ].map(({ val, lbl }) => (
          <div key={lbl}>
            <p className="text-xl font-semibold">{val}</p>
            <p className="text-[10px] text-white/50">{lbl}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── CategoryExpandCard ──────────────────────────────────────────
interface CategoryExpandCardProps {
  category: Category
}

export function CategoryExpandCard({ category }: CategoryExpandCardProps) {
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()

  return (
    <Card className="mb-3">
      <div className="flex items-start gap-3 mb-2">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0"
          style={{ backgroundColor: category.bgColor }}
        >
          {category.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-gray-900 capitalize">
            {category.label}
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">
            {category.description}
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[11px] text-gray-400">
              {category.articleCount} articles in this knowledgebase
            </span>
            <button
              onClick={() =>
                navigate(`/articles?category=${category.key}`)
              }
              className="text-[11px] text-indigo-600 font-medium hover:text-indigo-700"
            >
              View articles →
            </button>
          </div>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-400 hover:text-gray-600 flex-shrink-0"
        >
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {open && (
        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-100">
          {category.subcategories.map((sub) => (
            <div
              key={sub.name}
              className="flex items-center justify-between px-2.5 py-1.5 bg-gray-50 rounded-lg"
            >
              <span className="text-[12px] text-gray-700">{sub.name}</span>
              <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                {sub.count}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

// ─── TagTaxonomy ─────────────────────────────────────────────────
const TAG_CONVENTIONS = [
  {
    tag: 'error',
    desc: 'Marks articles that resolve a specific error or failure',
  },
  {
    tag: 'setup',
    desc: 'Installation or initial configuration procedures',
  },
  {
    tag: 'beginner',
    desc: 'Accessible to users with basic IT knowledge',
  },
  {
    tag: 'urgent',
    desc: 'High-priority issues affecting business operations',
  },
]

export function TagTaxonomy() {
  return (
    <Card className="mb-3.5">
      <div className="flex items-center gap-2 mb-2">
        <TagIcon size={13} className="text-gray-500" />
        <h3 className="text-[13px] font-semibold text-gray-800">
          Tag Taxonomy
        </h3>
      </div>
      <p className="text-[11px] text-gray-400 leading-relaxed mb-3">
        Tags are metadata labels applied to each article to enable fast
        searching, filtering, and categorisation across the knowledgebase.
      </p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {ALL_TAGS.slice(0, 12).map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>
      <div className="border-t border-gray-100 pt-3">
        <p className="text-[11px] font-semibold text-gray-600 mb-2">
          Tag Naming Conventions
        </p>
        <div className="space-y-2">
          {TAG_CONVENTIONS.map(({ tag, desc }) => (
            <div key={tag} className="flex items-start gap-2">
              <Tag tag={tag} className="flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-gray-400 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

// ─── StructureRules ──────────────────────────────────────────────
const RULES = [
  'Every article must belong to exactly one Category and one Subcategory',
  'A minimum of 2 and maximum of 7 tags per article',
  'Tags must use lowercase, hyphen-separated format (e.g. active-directory)',
  'New subcategories require approval from the Knowledge Manager',
  'Archived articles retain their category assignment for audit purposes',
]

export function StructureRules() {
  return (
    <Card>
      <h3 className="text-[13px] font-semibold text-gray-800 mb-3">
        Structure Rules
      </h3>
      <div className="space-y-2">
        {RULES.map((rule, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="w-4.5 h-4.5 min-w-[18px] h-[18px] rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-semibold mt-0.5">
              {i + 1}
            </span>
            <p className="text-[12px] text-gray-500 leading-relaxed">{rule}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

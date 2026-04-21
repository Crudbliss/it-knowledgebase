import { CATEGORIES } from '@/data/mock'
import { Breadcrumb } from '@/components/ui/shared'
import {
  ArchBanner,
  CategoryExpandCard,
  TagTaxonomy,
  StructureRules,
} from '@/components/knowledge'

export function KnowledgeStructurePage() {
  return (
    <div className="p-5">
      <Breadcrumb items={['Knowledge Architecture']} />
      <h1 className="text-[22px] font-semibold text-gray-900 mb-1">
        Knowledge Structure
      </h1>
      <p className="text-[13px] text-gray-400 mb-4 leading-relaxed">
        The complete taxonomy of the IT KnowledgeBase — organised into main
        categories, subcategories, and a tag system for fast filtering and
        discoverability.
      </p>

      {/* Dark architecture banner */}
      <ArchBanner />

      {/* Two-column layout */}
      <div className="grid grid-cols-[1fr_280px] gap-4">
        {/* Left: categories */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[13px] font-semibold text-gray-800">
              🗂 Categories & Subcategories
            </span>
          </div>
          {CATEGORIES.map((cat) => (
            <CategoryExpandCard key={cat.key} category={cat} />
          ))}
        </div>

        {/* Right: taxonomy + rules */}
        <div>
          <TagTaxonomy />
          <StructureRules />
        </div>
      </div>
    </div>
  )
}

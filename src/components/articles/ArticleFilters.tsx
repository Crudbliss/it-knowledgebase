import { Search, SlidersHorizontal } from 'lucide-react'

interface ArticleFiltersProps {
  searchValue: string
  onSearchChange: (val: string) => void
  sortValue: string
  onSortChange: (val: string) => void
}

export function ArticleFilters({
  searchValue,
  onSearchChange,
  sortValue,
  onSortChange,
}: ArticleFiltersProps) {
  return (
    <div className="flex items-center gap-2 pb-3.5">
      <div className="relative flex-1 max-w-sm">
        <Search
          size={13}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search by title, keyword, tag or article ID..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 text-[13px] bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all placeholder:text-gray-400 text-gray-800"
        />
      </div>
      <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-[12px] text-gray-600 bg-white hover:bg-gray-50 transition-colors">
        <SlidersHorizontal size={12} />
        Filters
      </button>
      <select
        value={sortValue}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-2.5 py-1.5 border border-gray-200 rounded-lg text-[12px] text-gray-600 bg-white outline-none hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="title">Title A–Z</option>
      </select>
    </div>
  )
}

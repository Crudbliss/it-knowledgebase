import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useState } from 'react'

export interface FilterState {
  category: string
  author: string
  tags: string[]
}

interface ArticleFiltersProps {
  searchValue: string
  onSearchChange: (val: string) => void
  sortValue: string
  onSortChange: (val: string) => void
  filterState: FilterState
  onFilterChange: (state: FilterState) => void
  availableAuthors: string[]
  availableCategories: string[]
  availableTags: string[]
}

export function ArticleFilters({
  searchValue,
  onSearchChange,
  sortValue,
  onSortChange,
  filterState,
  onFilterChange,
  availableAuthors,
  availableCategories,
  availableTags,
}: ArticleFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)

  const toggleTag = (tag: string) => {
    const newTags = filterState.tags.includes(tag)
      ? filterState.tags.filter(t => t !== tag)
      : [...filterState.tags, tag]
    onFilterChange({ ...filterState, tags: newTags })
  }

  const clearFilters = () => {
    onFilterChange({ category: '', author: '', tags: [] })
  }

  const activeFilterCount = (filterState.category ? 1 : 0) + (filterState.author ? 1 : 0) + filterState.tags.length

  return (
    <div className="flex flex-col gap-3 pb-3.5 border-b border-gray-100 mb-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, keyword, tag or article ID..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-[13px] bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all placeholder:text-gray-400 text-gray-800"
          />
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-[12px] transition-colors ${showFilters || activeFilterCount > 0 ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'}`}
        >
          <SlidersHorizontal size={12} />
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>
        <select
          value={sortValue}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-2.5 py-1.5 border border-gray-200 rounded-lg text-[12px] text-gray-600 bg-white outline-none hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <option value="relevance">Relevance</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="title">Title A–Z</option>
        </select>
      </div>

      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mt-1 animate-in slide-in-from-top-2 fade-in duration-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[13px] font-semibold text-gray-800">Advanced Filters</h3>
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="text-[12px] text-indigo-600 hover:text-indigo-800 font-medium">
                Clear all
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Category</label>
              <select 
                value={filterState.category} 
                onChange={e => onFilterChange({...filterState, category: e.target.value})}
                className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-[13px] text-gray-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50"
              >
                <option value="">All Categories</option>
                {availableCategories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Author</label>
              <select 
                value={filterState.author} 
                onChange={e => onFilterChange({...filterState, author: e.target.value})}
                className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-[13px] text-gray-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50"
              >
                <option value="">All Authors</option>
                {availableAuthors.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-[12px] font-medium text-gray-600 mb-2">Tags</label>
            <div className="flex flex-wrap gap-1.5">
              {availableTags.map(tag => {
                const isSelected = filterState.tags.includes(tag)
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors border ${
                      isSelected 
                        ? 'bg-indigo-600 border-indigo-600 text-white' 
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300'
                    }`}
                  >
                    {tag}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

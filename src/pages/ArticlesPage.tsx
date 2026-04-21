import { useState, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { ARTICLES, CATEGORIES, ALL_TAGS } from '@/data/mock'
import { ArticleCard } from '@/components/articles/ArticleCard'
import { ArticleFilters, FilterState } from '@/components/articles/ArticleFilters'
import { Breadcrumb } from '@/components/ui/shared'
import { createSearchIndex } from '@/lib/search'

export function ArticlesPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const [localSearch, setLocalSearch] = useState(searchParams.get('search') ?? '')
  const [sort, setSort] = useState(localSearch ? 'relevance' : 'newest')
  
  const initialCategory = searchParams.get('category') ?? ''
  const [filterState, setFilterState] = useState<FilterState>({
    category: initialCategory,
    author: '',
    tags: []
  })

  // Pre-calculate available filter options
  const availableCategories = useMemo(() => CATEGORIES.map(c => c.label), [])
  const availableAuthors = useMemo(() => Array.from(new Set(ARTICLES.map(a => a.author))), [])
  const availableTags = ALL_TAGS

  // Initialize search index once
  const searchIndex = useMemo(() => createSearchIndex(ARTICLES), [])

  const filtered = useMemo(() => {
    let result = [...ARTICLES]

    // 1. Full-text search with Fuse.js
    const q = localSearch.trim()
    if (q) {
      const searchResults = searchIndex.search(q)
      result = searchResults.map(r => r.item)
      // If we are sorting by relevance, keep the fuse.js order (it's already sorted by score)
    }

    // 2. Apply advanced filters
    if (filterState.category) {
      result = result.filter(a => a.category.toLowerCase() === filterState.category.toLowerCase() || a.category.toLowerCase() === CATEGORIES.find(c => c.label === filterState.category)?.key.toLowerCase())
    }
    if (filterState.author) {
      result = result.filter(a => a.author === filterState.author)
    }
    if (filterState.tags.length > 0) {
      result = result.filter(a => filterState.tags.every(tag => a.tags.includes(tag)))
    }

    // 3. Sorting
    if (sort === 'oldest') {
      result.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime())
    } else if (sort === 'newest') {
      result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    } else if (sort === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title))
    }

    return result
  }, [localSearch, sort, filterState, searchIndex])

  const catInfo = filterState.category
    ? CATEGORIES.find(c => c.label.toLowerCase() === filterState.category.toLowerCase() || c.key === filterState.category)
    : null

  const clearCategoryFilter = () => {
    setFilterState({ ...filterState, category: '' })
    if (searchParams.has('category')) {
      navigate('/articles')
    }
  }

  return (
    <div className="p-5">
      <Breadcrumb items={['Articles Library']} />
      <h1 className="text-[22px] font-semibold text-gray-900 mb-0.5">
        All Articles
      </h1>
      <p className="text-[12px] text-gray-400 mb-3">
        {filtered.length} of {ARTICLES.length} articles
        {catInfo && (
          <>
            {' '}
            in <strong className="text-gray-600">{catInfo.label}</strong>
          </>
        )}
      </p>

      {/* Active category filter banner */}
      {filterState.category && catInfo && (
        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-2 mb-3">
          <svg
            className="w-3.5 h-3.5 text-indigo-500"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <polygon points="1,2 15,2 9,9 9,14 7,14 7,9" />
          </svg>
          <span className="text-[12px] text-indigo-700">
            Filtered by category:
          </span>
          <span className="inline-flex items-center px-2 py-0.5 bg-indigo-600 text-white rounded text-[11px] font-medium capitalize">
            {catInfo.label}
          </span>
          <button
            onClick={clearCategoryFilter}
            className="ml-auto flex items-center gap-1 text-[12px] text-indigo-600 font-medium hover:text-indigo-800"
          >
            <X size={12} />
            Clear filter
          </button>
        </div>
      )}

      {/* Filters */}
      <ArticleFilters
        searchValue={localSearch}
        onSearchChange={setLocalSearch}
        sortValue={sort}
        onSortChange={setSort}
        filterState={filterState}
        onFilterChange={setFilterState}
        availableAuthors={availableAuthors}
        availableCategories={availableCategories}
        availableTags={availableTags}
      />

      {/* Article cards */}
      <div className="space-y-2.5">
        {filtered.length > 0 ? (
          filtered.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onTagClick={(tag) => {
                if (!filterState.tags.includes(tag)) {
                  setFilterState({ ...filterState, tags: [...filterState.tags, tag] })
                }
              }}
            />
          ))
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <p className="text-gray-400 text-[13px]">
              No articles match your criteria.
            </p>
            <button
              onClick={() => {
                setLocalSearch('')
                setFilterState({ category: '', author: '', tags: [] })
              }}
              className="mt-2 text-indigo-600 text-[12px] font-medium hover:text-indigo-700"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

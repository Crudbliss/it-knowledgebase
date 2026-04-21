import { useState, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { ARTICLES, CATEGORIES } from '@/data/mock'
import { ArticleCard } from '@/components/articles/ArticleCard'
import { ArticleFilters } from '@/components/articles/ArticleFilters'
import { Breadcrumb } from '@/components/ui/shared'

export function ArticlesPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [localSearch, setLocalSearch] = useState(
    searchParams.get('search') ?? ''
  )
  const [sort, setSort] = useState('newest')

  const categoryFilter = searchParams.get('category')
  const catInfo = categoryFilter
    ? CATEGORIES.find((c) => c.key === categoryFilter)
    : null

  const filtered = useMemo(() => {
    let result = [...ARTICLES]

    // category filter
    if (categoryFilter) {
      result = result.filter(
        (a) => a.category.toLowerCase() === categoryFilter
      )
    }

    // search filter
    const q = localSearch.toLowerCase().trim()
    if (q) {
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.id.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.category.toLowerCase().includes(q) ||
          a.author.toLowerCase().includes(q)
      )
    }

    // sort
    if (sort === 'oldest') result.reverse()
    if (sort === 'title') result.sort((a, b) => a.title.localeCompare(b.title))

    return result
  }, [categoryFilter, localSearch, sort])

  const clearCategoryFilter = () => navigate('/articles')

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
      {categoryFilter && catInfo && (
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
      />

      {/* Article cards */}
      <div className="space-y-2.5">
        {filtered.length > 0 ? (
          filtered.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onTagClick={(tag) => setLocalSearch(tag)}
            />
          ))
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <p className="text-gray-400 text-[13px]">
              No articles match your search.
            </p>
            <button
              onClick={() => setLocalSearch('')}
              className="mt-2 text-indigo-600 text-[12px] font-medium hover:text-indigo-700"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

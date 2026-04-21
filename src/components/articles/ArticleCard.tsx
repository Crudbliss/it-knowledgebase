import { Clock, User } from 'lucide-react'
import type { Article } from '@/types'
import { StatusBadge, Tag, IdBadge } from '@/components/ui/shared'
import { CATEGORIES } from '@/data/mock'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

interface ArticleCardProps {
  article: Article
  onTagClick?: (tag: string) => void
  className?: string
}

export function ArticleCard({ article, onTagClick, className }: ArticleCardProps) {
  const navigate = useNavigate()
  const catInfo = CATEGORIES.find(
    (c) => c.key === article.category.toLowerCase()
  )

  const handleCardClick = () => {
    navigate(`/article/${article.id}`)
  }

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        'bg-white border border-gray-200 rounded-xl p-4 hover:border-indigo-200 hover:shadow-sm transition-all group cursor-pointer',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-start gap-2.5 flex-1 min-w-0">
          {/* Category icon */}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-sm"
            style={{ backgroundColor: catInfo?.bgColor ?? '#F1F5F9' }}
          >
            {catInfo?.icon ?? '📄'}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[13px] font-medium text-gray-900 group-hover:text-indigo-700 transition-colors leading-snug">
              {article.title}
            </h3>
            <p className="text-[12px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
              {article.description}
            </p>
          </div>
        </div>
        <StatusBadge status={article.status} className="flex-shrink-0" />
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-2.5 text-[11px] text-gray-400 mt-2.5 flex-wrap">
        <IdBadge id={article.id} />
        <span
          className="font-medium"
          style={{ color: catInfo?.color ?? '#6366F1' }}
        >
          {article.category}
        </span>
        <span className="text-gray-300">·</span>
        <span>{article.subcategory}</span>
        <span className="text-gray-300">·</span>
        <span className="flex items-center gap-1">
          <Clock size={10} />
          {article.readTime} read
        </span>
        <span className="text-gray-300">·</span>
        <span className="font-mono text-[10px]">{article.version}</span>
        <span className="text-gray-300">·</span>
        <span className="flex items-center gap-1">
          <User size={10} />
          {article.author}
        </span>
        <span className="ml-auto text-gray-300 text-[10px]">
          Updated {article.updatedAt}
        </span>
      </div>

      {/* Tags */}
      <div className="flex gap-1.5 flex-wrap mt-2.5">
        {article.tags.map((tag) => (
          <Tag 
            key={tag} 
            tag={tag} 
            onClick={(e) => {
              e.stopPropagation(); // prevent card click
              onTagClick?.(tag)
            }} 
          />
        ))}
      </div>
    </div>
  )
}

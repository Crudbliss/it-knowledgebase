import { Article } from '@/types'
import { ARTICLES } from '@/data/mock'
import { Link } from 'react-router-dom'

interface RelatedArticlesProps {
  currentArticle: Article
}

export function RelatedArticles({ currentArticle }: RelatedArticlesProps) {
  // Find articles with overlapping tags
  const related = ARTICLES
    .filter(a => a.id !== currentArticle.id)
    .map(a => {
      const matchCount = a.tags.filter(t => currentArticle.tags.includes(t)).length
      return { article: a, matchCount }
    })
    .filter(item => item.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, 3)
    .map(item => item.article)

  if (related.length === 0) return null

  return (
    <div className="mt-8 pt-8 border-t border-gray-200">
      <h3 className="text-[15px] font-semibold text-gray-900 mb-4">Related Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {related.map(article => (
          <Link 
            key={article.id} 
            to={`/article/${article.id}`}
            className="block p-4 bg-gray-50 border border-gray-100 rounded-xl hover:border-indigo-300 hover:bg-white hover:shadow-sm transition-all group"
          >
            <h4 className="text-[13px] font-medium text-gray-900 leading-snug mb-2 group-hover:text-indigo-600 transition-colors">
              {article.title}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {article.tags.slice(0, 2).map(tag => (
                <span key={tag} className="px-1.5 py-0.5 rounded border border-gray-200 bg-white text-gray-500 text-[10px]">
                  {tag}
                </span>
              ))}
              {article.tags.length > 2 && <span className="px-1.5 py-0.5 rounded border border-gray-200 bg-white text-gray-500 text-[10px]">+{article.tags.length - 2}</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

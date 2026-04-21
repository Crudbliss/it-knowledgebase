import { useParams, useNavigate } from 'react-router-dom'
import { ARTICLES } from '@/data/mock'
import { Breadcrumb, StatusBadge, Tag, IdBadge } from '@/components/ui/shared'
import { Clock, User, ArrowLeft, Eye, ThumbsUp } from 'lucide-react'
import { RelatedArticles } from '@/components/articles/RelatedArticles'

export function ArticleDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const article = ARTICLES.find(a => a.id === id)

  if (!article) {
    return <div className="p-8 text-center text-gray-500">Article not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-5 pb-20">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors mb-5 text-[12px] font-medium"
      >
        <ArrowLeft size={14} /> Back
      </button>

      <Breadcrumb items={['KnowledgeBase', article.category, article.title]} />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mt-4 shadow-sm">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-[22px] font-semibold text-gray-900 leading-tight">
            {article.title}
          </h1>
          <StatusBadge status={article.status} className="flex-shrink-0" />
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[12px] text-gray-500 mb-8 pb-6 border-b border-gray-100">
          <IdBadge id={article.id} />
          <span className="flex items-center gap-1.5"><Clock size={12} /> {article.readTime} read</span>
          <span className="flex items-center gap-1.5"><User size={12} /> {article.author}</span>
          <span className="flex items-center gap-1.5"><Eye size={12} /> {article.views?.toLocaleString()} views</span>
          <span className="flex items-center gap-1.5 text-green-600"><ThumbsUp size={12} /> {article.helpfulCount} found helpful</span>
          <span className="ml-auto text-gray-400">Updated {article.updatedAt}</span>
        </div>

        <div className="prose prose-sm sm:prose-base max-w-none text-gray-800 text-[14px]">
          {article.content?.split('\n').map((para, i) => {
            if (para.startsWith('## ')) return <h2 key={i} className="text-xl font-semibold text-gray-900 mt-6 mb-3">{para.replace('## ', '')}</h2>
            if (para.startsWith('### ')) return <h3 key={i} className="text-lg font-medium text-gray-900 mt-5 mb-2">{para.replace('### ', '')}</h3>
            if (!para.trim()) return <br key={i} />
            return <p key={i} className="mb-3 leading-relaxed">{para}</p>
          })}
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap gap-2">
          {article.tags.map(tag => (
            <Tag key={tag} tag={tag} onClick={() => navigate(`/articles?search=${tag}`)} />
          ))}
        </div>
        
        <RelatedArticles currentArticle={article} />
      </div>
    </div>
  )
}

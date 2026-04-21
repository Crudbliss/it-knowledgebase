import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import React, { Suspense } from 'react'

const DashboardPage = React.lazy(() => import('@/pages/DashboardPage').then(module => ({ default: module.DashboardPage })))
const KnowledgeStructurePage = React.lazy(() => import('@/pages/KnowledgeStructurePage').then(module => ({ default: module.KnowledgeStructurePage })))
const ArticlesPage = React.lazy(() => import('@/pages/ArticlesPage').then(module => ({ default: module.ArticlesPage })))
const ArticleDetailPage = React.lazy(() => import('@/pages/ArticleDetailPage').then(module => ({ default: module.ArticleDetailPage })))
const JSONExportPage = React.lazy(() => import('@/pages/JSONExportPage').then(module => ({ default: module.JSONExportPage })))
const WorkflowPage = React.lazy(() => import('@/pages/WorkflowPage').then(module => ({ default: module.WorkflowPage })))

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full p-8 text-gray-500 text-sm">
    Loading...
  </div>
)

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Suspense fallback={<LoadingFallback />}><DashboardPage /></Suspense>} />
          <Route path="/structure" element={<Suspense fallback={<LoadingFallback />}><KnowledgeStructurePage /></Suspense>} />
          <Route path="/articles" element={<Suspense fallback={<LoadingFallback />}><ArticlesPage /></Suspense>} />
          <Route path="/article/:id" element={<Suspense fallback={<LoadingFallback />}><ArticleDetailPage /></Suspense>} />
          <Route path="/json-export" element={<Suspense fallback={<LoadingFallback />}><JSONExportPage /></Suspense>} />
          <Route path="/workflow" element={<Suspense fallback={<LoadingFallback />}><WorkflowPage /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}



import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { DashboardPage } from '@/pages/DashboardPage'
import { KnowledgeStructurePage } from '@/pages/KnowledgeStructurePage'
import { ArticlesPage } from '@/pages/ArticlesPage'
import { JSONExportPage } from '@/pages/JSONExportPage'
import { WorkflowPage } from '@/pages/WorkflowPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/structure" element={<KnowledgeStructurePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/json-export" element={<JSONExportPage />} />
          <Route path="/workflow" element={<WorkflowPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export type ArticleStatus = 'published' | 'review' | 'draft' | 'archived'

export interface Article {
  id: string
  title: string
  category: string
  subcategory: string
  status: ArticleStatus
  version: string
  author: string
  readTime: string
  updatedAt: string
  tags: string[]
  description: string
}

export interface Category {
  key: string
  label: string
  icon: string
  color: string
  bgColor: string
  borderColor: string
  articleCount: number
  subcategories: Subcategory[]
  description: string
}

export interface Subcategory {
  name: string
  count: number
}

export interface WorkflowStage {
  name: string
  label: string
  icon: string
  color: string
  bgColor: string
  borderColor: string
  description: string
  permissions: string[]
  rules: string[]
  actions: WorkflowAction[]
}

export interface WorkflowAction {
  label: string
  variant: 'primary' | 'secondary' | 'danger'
}

export interface CollaborationRole {
  name: string
  colorClass: string
  responsibilities: string[]
  permissions: string[]
}

export interface VersionEntry {
  tag: string
  variant: 'initial' | 'minor' | 'major'
  title: string
  trigger: string
}

import Fuse from 'fuse.js'
import { Article } from '@/types'

export function createSearchIndex(articles: Article[]) {
  return new Fuse(articles, {
    keys: [
      { name: 'title', weight: 3 },
      { name: 'tags', weight: 2 },
      { name: 'subcategory', weight: 1.5 },
      { name: 'category', weight: 1.5 },
      { name: 'description', weight: 1 },
      { name: 'author', weight: 1 },
      { name: 'id', weight: 2 },
      { name: 'logs', weight: 1.5 },
      { name: 'errorCodes', weight: 2 }
    ],
    threshold: 0.3,
    includeScore: true,
    ignoreLocation: true, // Finds matches anywhere in the string
  })
}

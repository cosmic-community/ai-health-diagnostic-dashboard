'use client'

import { DiagnosticCategory } from '@/types'

interface CategoryFilterProps {
  categories: DiagnosticCategory[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Filter by Category
      </h2>
      <div className="flex flex-wrap gap-3">
        <button 
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className="px-4 py-2 rounded-lg font-medium transition-colors hover:opacity-80"
            style={{
              backgroundColor: category.metadata?.color ? `${category.metadata.color}20` : '#f3f4f6',
              color: category.metadata?.color || '#374151'
            }}
          >
            {category.metadata?.category_name || category.title}
          </button>
        ))}
      </div>
    </div>
  )
}
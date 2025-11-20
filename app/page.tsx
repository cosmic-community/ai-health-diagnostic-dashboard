import { cosmic } from '@/lib/cosmic'
import { hasStatus } from '@/lib/cosmic'
import { DiagnosticVideo, DiagnosticCategory } from '@/types'
import DashboardHeader from '@/components/DashboardHeader'
import StatsCards from '@/components/StatsCards'
import VideoGrid from '@/components/VideoGrid'
import CategoryFilter from '@/components/CategoryFilter'

async function getVideos(): Promise<DiagnosticVideo[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'diagnostic-videos' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as DiagnosticVideo[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

async function getCategories(): Promise<DiagnosticCategory[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'diagnostic-categories' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as DiagnosticCategory[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function HomePage() {
  const videos = await getVideos()
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Diagnostic Video Dashboard
          </h1>
          <p className="text-gray-600">
            Manage patient diagnostic videos and AI analysis reports
          </p>
        </div>

        <StatsCards videos={videos} />
        
        <div className="mt-8">
          <CategoryFilter categories={categories} />
        </div>

        <div className="mt-8">
          <VideoGrid videos={videos} />
        </div>
      </main>
    </div>
  )
}
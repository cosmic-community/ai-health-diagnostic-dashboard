// app/videos/[slug]/page.tsx
import { cosmic } from '@/lib/cosmic'
import { hasStatus } from '@/lib/cosmic'
import { DiagnosticVideo } from '@/types'
import { notFound } from 'next/navigation'
import VideoDetail from '@/components/VideoDetail'
import BackButton from '@/components/BackButton'

async function getVideo(slug: string): Promise<DiagnosticVideo | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'diagnostic-videos', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as DiagnosticVideo
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

export default async function VideoPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const video = await getVideo(slug)

  if (!video) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton />
        <VideoDetail video={video} />
      </div>
    </div>
  )
}
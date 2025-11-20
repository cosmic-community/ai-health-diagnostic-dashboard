import { DiagnosticVideo } from '@/types'
import { getPriorityColor, getStatusColor, formatDate } from '@/lib/utils'
import Link from 'next/link'

interface VideoCardProps {
  video: DiagnosticVideo
}

export default function VideoCard({ video }: VideoCardProps) {
  const thumbnail = video.metadata?.thumbnail?.imgix_url || video.metadata?.diagnostic_video?.imgix_url
  const category = video.metadata?.category
  const priorityLevel = video.metadata?.priority_level?.key
  const status = video.metadata?.processing_status?.key
  const uploadDate = video.metadata?.upload_date

  return (
    <Link href={`/videos/${video.slug}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        {thumbnail && (
          <div className="relative h-48 bg-gray-100">
            <img
              src={`${thumbnail}?w=800&h=400&fit=crop&auto=format,compress`}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 flex gap-2">
              {priorityLevel && (
                <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(priorityLevel)}`}>
                  {video.metadata.priority_level?.value}
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 text-lg">
              {video.metadata?.patient_name || video.title}
            </h3>
          </div>
          
          {category && (
            <div className="mb-3">
              <span 
                className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: category.metadata?.color ? `${category.metadata.color}20` : '#f3f4f6',
                  color: category.metadata?.color || '#374151'
                }}
              >
                {category.metadata?.category_name || category.title}
              </span>
            </div>
          )}

          <div className="space-y-2 text-sm text-gray-600">
            {video.metadata?.patient_age && (
              <p>Age: {video.metadata.patient_age} years</p>
            )}
            {uploadDate && (
              <p>Uploaded: {formatDate(uploadDate)}</p>
            )}
          </div>

          {status && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
                {video.metadata.processing_status?.value}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
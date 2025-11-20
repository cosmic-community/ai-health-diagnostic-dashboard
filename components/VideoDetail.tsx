import { DiagnosticVideo } from '@/types'
import { getPriorityColor, getStatusColor, formatDate, calculateAge } from '@/lib/utils'

interface VideoDetailProps {
  video: DiagnosticVideo
}

export default function VideoDetail({ video }: VideoDetailProps) {
  const category = video.metadata?.category
  const keyFindings = video.metadata?.key_findings
  const thumbnail = video.metadata?.thumbnail?.imgix_url || video.metadata?.diagnostic_video?.imgix_url

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {video.title}
              </h1>
              <p className="text-gray-600">Patient: {video.metadata?.patient_name}</p>
            </div>
            <div className="flex gap-2">
              {video.metadata?.priority_level && (
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(video.metadata.priority_level.key)}`}>
                  {video.metadata.priority_level.value}
                </span>
              )}
              {video.metadata?.processing_status && (
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(video.metadata.processing_status.key)}`}>
                  {video.metadata.processing_status.value}
                </span>
              )}
            </div>
          </div>

          {category && (
            <div>
              <span 
                className="inline-block px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: category.metadata?.color ? `${category.metadata.color}20` : '#f3f4f6',
                  color: category.metadata?.color || '#374151'
                }}
              >
                {category.metadata?.category_name || category.title}
              </span>
            </div>
          )}
        </div>

        {/* Video/Thumbnail Section */}
        {thumbnail && (
          <div className="relative h-96 bg-gray-100">
            <img
              src={`${thumbnail}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={video.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Patient Information */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Patient Information
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Patient Name</p>
              <p className="font-semibold text-gray-900">
                {video.metadata?.patient_name || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Age</p>
              <p className="font-semibold text-gray-900">
                {video.metadata?.patient_age || calculateAge(video.metadata?.date_of_birth) || 'N/A'} years
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Date of Birth</p>
              <p className="font-semibold text-gray-900">
                {formatDate(video.metadata?.date_of_birth)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Upload Date</p>
              <p className="font-semibold text-gray-900">
                {formatDate(video.metadata?.upload_date)}
              </p>
            </div>
          </div>
        </div>

        {/* Summary */}
        {video.metadata?.summary && (
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Summary</h2>
            <p className="text-gray-700 leading-relaxed">
              {video.metadata.summary}
            </p>
          </div>
        )}

        {/* Key Findings */}
        {keyFindings && (
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Key Findings
            </h2>
            
            {keyFindings.risk_level && (
              <div className="mb-4">
                <span className="inline-block px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold">
                  Risk Level: {keyFindings.risk_level}
                </span>
              </div>
            )}

            {keyFindings.findings && keyFindings.findings.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Findings:</h3>
                <ul className="space-y-2">
                  {keyFindings.findings.map((finding, index) => (
                    <li key={index} className="flex items-start">
                      <svg 
                        className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span className="text-gray-700">{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {keyFindings.recommendations && keyFindings.recommendations.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Recommendations:</h3>
                <ul className="space-y-2">
                  {keyFindings.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <svg 
                        className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span className="text-gray-700">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Full Analysis Report */}
        {video.metadata?.ai_analysis_report && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Detailed Analysis Report
            </h2>
            <div 
              className="prose prose-blue max-w-none"
              dangerouslySetInnerHTML={{ __html: video.metadata.ai_analysis_report }}
            />
          </div>
        )}

        {/* Analysis Date */}
        {video.metadata?.analysis_completed_date && (
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Analysis completed on: <span className="font-semibold text-gray-900">
                {formatDate(video.metadata.analysis_completed_date)}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
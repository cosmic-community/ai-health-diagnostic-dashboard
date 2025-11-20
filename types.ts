// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Diagnostic Category type
export interface DiagnosticCategory extends CosmicObject {
  type: 'diagnostic-categories';
  metadata: {
    category_name: string;
    description?: string;
    color?: string;
  };
}

// Priority Level type
export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent';

// Processing Status type
export type ProcessingStatus = 'pending' | 'processing' | 'completed' | 'failed';

// Key Findings structure
export interface KeyFindings {
  findings: string[];
  risk_level: string;
  recommendations: string[];
}

// Diagnostic Video type
export interface DiagnosticVideo extends CosmicObject {
  type: 'diagnostic-videos';
  metadata: {
    patient_name: string;
    patient_age?: number;
    date_of_birth?: string;
    diagnostic_video?: {
      url: string;
      imgix_url: string;
    };
    thumbnail?: {
      url: string;
      imgix_url: string;
    };
    category?: DiagnosticCategory;
    ai_analysis_report?: string;
    summary?: string;
    key_findings?: KeyFindings;
    priority_level?: {
      key: PriorityLevel;
      value: string;
    };
    processing_status?: {
      key: ProcessingStatus;
      value: string;
    };
    upload_date?: string;
    analysis_completed_date?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip?: number;
}

// Type guards
export function isDiagnosticVideo(obj: CosmicObject): obj is DiagnosticVideo {
  return obj.type === 'diagnostic-videos';
}

export function isDiagnosticCategory(obj: CosmicObject): obj is DiagnosticCategory {
  return obj.type === 'diagnostic-categories';
}

// Helper function for error checking
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}
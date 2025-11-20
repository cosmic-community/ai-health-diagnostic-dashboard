# AI Health Diagnostic Dashboard

![App Preview](https://imgix.cosmicjs.com/88ab7900-a045-11ed-81f2-f50e185dd248-78A265wPiO4.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive healthcare diagnostic management system built with Next.js 16 and Cosmic CMS. Upload patient diagnostic videos, automatically analyze them with AI, and generate detailed medical reports across multiple medical specialties.

## ✨ Features

- 📹 **Video Upload & Management** - Upload diagnostic videos with patient information
- 🤖 **AI Analysis Integration** - Automated video analysis with detailed medical reports
- 🏥 **Multi-Category Support** - Cardiology, Neurology, Orthopedics, General Health
- 🎯 **Priority-Based Workflow** - Low, Medium, High, Urgent priority levels
- 📊 **Real-Time Status Tracking** - Monitor processing from upload to completion
- 👤 **Patient Management** - Comprehensive patient profiles and diagnostic history
- 🔍 **Smart Filtering** - Filter by category, priority, status, and patient name
- 📄 **Detailed Reports** - Rich HTML-formatted analysis reports with clinical summaries
- 🎨 **Modern UI** - Professional medical-grade interface with responsive design
- 📱 **Mobile Responsive** - Works seamlessly on all devices

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=691efcaab183692bb397c825&clone_repository=691eff04b183692bb397c852)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "AI Health Diagnostic app which should contain video upload feature from that uploaded video, we should be able to generate the report, summary of the video, etc"

### Code Generation Prompt

> "Create a React dashboard that displays and manages my existing content"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic
- **Package Manager**: Bun
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Bun installed on your machine
- A Cosmic account with bucket credentials

### Installation

1. Clone this repository
```bash
git clone <your-repo-url>
cd ai-health-diagnostic-dashboard
```

2. Install dependencies
```bash
bun install
```

3. Create a `.env.local` file in the root directory with your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Diagnostic Videos

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all diagnostic videos with category data
const { objects: videos } = await cosmic.objects
  .find({ type: 'diagnostic-videos' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1) // Includes connected category objects

// Filter by category
const { objects: cardiologyVideos } = await cosmic.objects
  .find({ 
    type: 'diagnostic-videos',
    'metadata.category': 'category-id-here'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Creating a New Diagnostic Video

```typescript
await cosmic.objects.insertOne({
  title: 'Neurological Assessment - Patient Name',
  type: 'diagnostic-videos',
  metadata: {
    patient_name: 'John Doe',
    patient_age: 45,
    date_of_birth: '1979-01-15',
    diagnostic_video: 'video-file-name.mp4', // Media name from bucket
    thumbnail: 'thumbnail-image.jpg',
    category: 'category-id-here', // Category object ID
    processing_status: {
      key: 'pending',
      value: 'Pending Analysis'
    },
    upload_date: new Date().toISOString().split('T')[0]
  }
})
```

### Updating Analysis Results

```typescript
// Only include the fields being updated
await cosmic.objects.updateOne('video-id-here', {
  metadata: {
    processing_status: {
      key: 'completed',
      value: 'Completed'
    },
    ai_analysis_report: '<h2>Analysis Report</h2><p>Detailed findings...</p>',
    summary: 'Brief summary of findings',
    key_findings: {
      findings: ['Finding 1', 'Finding 2'],
      risk_level: 'Low',
      recommendations: ['Recommendation 1']
    },
    priority_level: {
      key: 'low',
      value: 'Low'
    },
    analysis_completed_date: new Date().toISOString().split('T')[0]
  }
})
```

## 🔗 Cosmic CMS Integration

This application uses Cosmic as a headless CMS with the following content structure:

### Object Types

**Diagnostic Videos** (`diagnostic-videos`)
- Patient Name (text, required)
- Patient Age (number)
- Date of Birth (date)
- Diagnostic Video (file, required)
- Thumbnail (file)
- Category (object relationship to diagnostic-categories)
- AI Analysis Report (html-textarea)
- Summary (textarea)
- Key Findings (json)
- Priority Level (select-dropdown: Low, Medium, High, Urgent)
- Processing Status (select-dropdown: Pending Analysis, Processing, Completed, Failed)
- Upload Date (date)
- Analysis Completed Date (date)

**Diagnostic Categories** (`diagnostic-categories`)
- Category Name (text, required)
- Description (textarea)
- Color (color picker)

### Content Relationships

- Diagnostic Videos connect to Categories via object metafield
- Categories are fetched with `depth=1` to include full category data
- Filtering by category uses the category object ID

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Environment Variables

Make sure to set these environment variables in your production environment:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## 📝 License

MIT License - feel free to use this project for your healthcare applications.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com) - The Headless CMS for modern applications.

<!-- README_END -->
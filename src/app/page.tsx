// import { BlogsSection } from '@/components/main/Blogs'
import Hero from '@/components/main/Hero'
import Projects from '@/components/main/Projects'
import ResumeSection from '@/components/main/Resume'
import Skills from '@/components/main/Skills'
import Timeline from '@/components/main/Timeline'
import { Toaster } from 'react-hot-toast'
import { Metadata } from 'next'
import CertificationsSection from '@/components/main/Certifications'
import { AnalyticsDebug } from '@/components/analytics/AnalyticsDebug'
import InteractiveWrapper from '@/components/main/InteractiveWrapper'

export const metadata: Metadata = {
  title: 'Miguel Zacharias | Portfólio',
  description: 'Portfólio profissional de Miguel Zacharias, destacando experiência em desenvolvimento, design e inovação. Veja meus projetos e trajetória.',
  alternates: {
    canonical: 'https://miguelzacharias.com',
  },
}

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen" >
      {/* Hidden SEO content for better indexing */}
      <div className="sr-only">
        <h1>Hasan Ashab - DevOps Engineer and Cloud Specialist Portfolio</h1>
        <p>
          Welcome to my professional portfolio. I am a DevOps engineer and cloud specialist
          with expertise in AWS, Kubernetes, Docker, CI/CD pipelines, infrastructure automation,
          and scalable cloud solutions. Browse my projects, skills, and professional experience.
        </p>
      </div>

      <InteractiveWrapper>
        <Hero />
        <Skills />
        <ResumeSection />
        <Timeline />
        {/* <CertificationsSection /> */}
        <Projects />
  {/* <BlogsSection /> */}
        <Toaster position="bottom-right" />
      </InteractiveWrapper>
      
      {/* Temporary test components for analytics - remove in production */}
      {/* <AnalyticsDebug /> */}
    </div>
  )
}

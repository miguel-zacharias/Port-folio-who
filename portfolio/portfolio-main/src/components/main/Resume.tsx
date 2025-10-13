'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaDownload, FaExternalLinkAlt } from 'react-icons/fa'

const ResumeSection = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Convert Google Docs edit URL to embeddable format
  const googleDocsUrl = 'https://docs.google.com/document/d/147fIVr0h67cWMlcfYRiU-DhmwO20NrS_2EeXnJaYpe4/edit?tab=t.0'
  const documentId = googleDocsUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1]
  const embedUrl = `https://docs.google.com/document/d/${documentId}/preview`
  const pdfUrl = `https://docs.google.com/document/d/${documentId}/export?format=pdf`

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  const handleIframeError = () => {
    setError('Failed to load resume from Google Docs')
    setIsLoading(false)
  }

  return (
    <section
      id="resume"
      className="relative bg-background text-foreground px-6 py-20 flex flex-col items-center min-h-screen overflow-hidden"
    >
      {/* Elementos de fundo animados */}
      <div className="absolute inset-0 -z-10">
        {/* Formas geométricas flutuantes */}
        <div className="absolute top-32 right-16 w-28 h-28 bg-gradient-to-br from-gray-200/60 via-gray-400/40 to-gray-600/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-80 left-20 w-20 h-20 bg-gradient-to-tr from-gray-300/40 via-gray-500/30 to-gray-700/20 rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute bottom-60 right-1/3 w-16 h-16 bg-gradient-to-tl from-gray-100/60 via-gray-400/30 to-gray-700/20 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-gradient-to-bl from-gray-200/40 via-gray-500/20 to-gray-800/10 rounded-lg rotate-12 float-animation"></div>

        {/* Padrão de grade */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,120,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(180,180,180,0.06)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        {/* Orbes em gradiente */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-gray-200/30 via-gray-400/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-l from-gray-400/20 via-gray-600/10 to-transparent rounded-full blur-2xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-10 relative z-10"
      >
        <h2 title="Meu Currículo" className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-700 via-gray-500 to-gray-100 bg-clip-text text-transparent tracking-tight mb-4">
          Meu Currículo
        </h2>
        <p className="text-lg text-muted-foreground">
          Veja minhas qualificações profissionais e experiência.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full max-w-4xl bg-card/60 backdrop-blur-sm border border-primary/20 rounded-2xl shadow-2xl overflow-hidden relative z-10"
      >
        <div className="relative w-full h-[800px] overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-muted-foreground">Carregando currículo...</p>
              </div>
            </div>
          )}

          {error ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <p className="text-destructive text-lg mb-4">{error}</p>
              <motion.a
                title="Ver currículo no Google Docs"
                href={googleDocsUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium"
              >
                <FaExternalLinkAlt className="text-sm" />
                Ver no Google Docs
              </motion.a>
            </div>
          ) : (
            <iframe
              src={embedUrl}
              title="Currículo"
              className="w-full h-full border-0"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              loading="lazy"
            ></iframe>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 flex flex-wrap gap-4 justify-center relative z-10"
      >
        <motion.a
          title="Baixar currículo em PDF"
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-400 hover:from-gray-400 hover:to-gray-100 text-gray-900 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="relative z-10 flex items-center gap-2">
            <FaDownload className="text-base" />
            Baixar PDF
          </div>
          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </motion.a>

        <motion.a
          title="Ver currículo no Google Docs"
          href={googleDocsUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/30 hover:border-primary/60 hover:bg-card/80 text-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <FaExternalLinkAlt className="text-base" />
          Ver no Google Docs
        </motion.a>
      </motion.div>
    </section>
  )
}

export default ResumeSection

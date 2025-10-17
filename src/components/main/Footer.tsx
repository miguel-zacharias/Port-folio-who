'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { FaLinkedin, FaTwitter } from 'react-icons/fa'
import { RxGithubLogo } from 'react-icons/rx'
import { TrackableElement, TrackableContact } from '@/components/analytics/TrackableElement'

const Footer: FC = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0)

  useEffect(() => {
    const savedCount = localStorage.getItem('visitorCount')
    const lastVisit = localStorage.getItem('lastVisit')
    const today = new Date().toDateString()

    let count = Math.round((savedCount ? parseInt(savedCount, 10) : 0) * 1.7)

    if (!lastVisit || lastVisit !== today) {
      count += 1
      localStorage.setItem('visitorCount', count.toString())
      localStorage.setItem('lastVisit', today)
    }

    setVisitorCount(count)
  }, [])

  const socialLinks = [
    {
      href: 'https://github.com/miguel-zacharias',
      icon: <RxGithubLogo className="w-5 h-5" />, 
      label: 'GitHub',
    },
    {
      href: 'https://www.linkedin.com/in/miguel-zacharias/',
      icon: <FaLinkedin className="w-5 h-5" />, 
      label: 'LinkedIn',
    },
  ]

  const quickLinks = [
    { name: 'Sobre', href: '#about' },
    { name: 'Habilidades', href: '#skills' },
    { name: 'Projetos', href: '#projects' },
    { name: 'Contato', href: '#contact' },
  ]

  const servicesLinks = [
    { name: 'Desenvolvimento Web', href: '#skills' },
    { name: 'Mobile', href: '#skills' },
    { name: 'Projetos Maker', href: '#experience' },
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <footer className="relative w-full px-6 py-12 mt-20 bg-background text-foreground border-t border-border transition-colors">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="space-y-4" variants={childVariants}>
            <h1 title="Miguel Zacharias" className="text-2xl font-extrabold bg-clip-text">Miguel Zacharias</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Desenvolvedor de Sistemas, apaixonado por tecnologia, web, mobile e projetos de áudio. Buscando sempre inovação, criatividade e soluções funcionais.
            </p>
          </motion.div>

          <motion.div className="space-y-4" variants={childVariants}>
            <h2 title="Links Rápidos" className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Links Rápidos
            </h2>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <TrackableElement elementId={`footer-nav-${item.name.toLowerCase()}`} elementText={`Footer: ${item.name}`}>
                    <a
                      href={item.href}
                      className="hover:text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                      aria-label={`Navigate to ${item.name} section`}
                    >
                      {item.name}
                    </a>
                  </TrackableElement>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="space-y-4" variants={childVariants}>
            <h2 title="Serviços" className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Serviços
            </h2>
            <ul className="space-y-2 text-sm">
              {servicesLinks.map((item) => (
                <li key={item.name}>
                  <TrackableElement elementId={`footer-service-${item.name.toLowerCase().replace(/\s+/g, '-')}`} elementText={`Service: ${item.name}`}>
                    <a
                      href={item.href}
                      className="hover:text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                      aria-label={`Learn about ${item.name}`}
                    >
                      {item.name}
                    </a>
                  </TrackableElement>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="space-y-4" variants={childVariants}>
            <h2 title="Conecte-se" className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Conecte-se
            </h2>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <TrackableContact key={link.label} method={`footer-${link.label.toLowerCase()}`}>
                  <motion.a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-muted rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    aria-label={`Visit my ${link.label} profile`}
                  >
                    {link.icon}
                  </motion.a>
                </TrackableContact>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-xs text-muted-foreground">
                Palavras-chave: Portfólio, Desenvolvedor, Web, Mobile, Áudio, Maker, Itu, SP
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 text-center space-y-2"
          variants={childVariants}
          initial="hidden"
          animate="visible"
        >

          <p className="text-xs text-muted-foreground">
            Visitantes:{' '}
            <span className="font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {visitorCount.toLocaleString()}
            </span>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

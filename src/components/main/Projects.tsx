'use client'

import {
  IconArrowWaveRightUp,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from '@tabler/icons-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import { Badge } from '../ui/badge'
import { BentoGrid, BentoGridItem } from '../ui/bento-grid'
import { Tags } from 'lucide-react'
import { useState, useMemo } from 'react'

const projectsData = [
  {
    title: 'MGS 2030 S',
    description: 'Caixa de som projetada e construída do zero, com foco em qualidade sonora, potência e design robusto. Projeto maker completo: acústica, eletrônica e acabamento.',
    imageURL: '/Diagrama MGS.png',
    tags: ['Áudio', 'Maker', 'Design', 'Eletrônica'],
    github: 'https://github.com/miguel-zacharias/MGV---Technology',
  },
  {
    title: 'MSC 1000',
    description: 'Receiver moderno em desenvolvimento, com VU meter de LEDs, monitor de potência, integração com rádio automotivo e sistema Transmission Line Speaker.',
    imageURL: '/desenvolver.png',
    tags: ['Áudio', 'Inovação', 'VU Meter', 'Projetos Pessoais'],
    github: 'https://github.com/miguel-zacharias/MGV---Technology',
  },
  {
    title: 'Cadastro de Imóveis',
    description: 'Sistema de cadastro, organização e atualização de imóveis para imobiliária, garantindo controle e precisão das informações.',
    imageURL: '/Matheus-Martins.png',
    tags: ['Organização', 'Imobiliária', 'Sistemas'],
  },
  {
    title: 'La Bombonera Repository',
    description: 'Repositório focado no desenvolvimento de diversos segmentos no SENAI, como Raspberry PI Pico, Ideias ON e muito mais..',
    imageURL: '/La Bombonera.png',
    tags: ['Segurança', 'Tecnologia', 'Infraestrutura'],
    github: 'https://github.com/miguel-zacharias/La-Bombonera-Repository'
  },
  {
    title: 'Jornal Entre-Linhas',
    description: 'Um jornal escolar que visa informar e entreter a comunidade acadêmica com notícias, artigos e eventos relevantes.',
    imageURL: '/entre_linhas.png',
    github: 'https://github.com/miguel-zacharias/EntreLinhas',
    
    tags: ['AWS', 'Github Actions', 'Terraform', 'GitOps', 'DevSecOps', 'Docker'],
  },
  {
    title: 'MGV Records',
    description: 'Um projeto dedicado à produção e distribuição de música, com foco em um espaço aprimorado com Produtos Do It Yourselft.',
    imageURL: '/recordes-emegeve.png',
    tags: ['Música', 'Produção', 'Distribuição'],
    github: 'https://github.com/miguel-zacharias/MGV-Records',
  },


]

// Extract all unique tags from projects
const allTags = Array.from(
  new Set(projectsData.flatMap(project => project.tags))
).sort();

const LiveIndicator = () => (
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
  </span>
)

const VideoIndicator = () => (
  <svg fill="#000000" width="15px" height="15px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>youtube</title> <path d="M12.932 20.459v-8.917l7.839 4.459zM30.368 8.735c-0.354-1.301-1.354-2.307-2.625-2.663l-0.027-0.006c-3.193-0.406-6.886-0.638-10.634-0.638-0.381 0-0.761 0.002-1.14 0.007l0.058-0.001c-0.322-0.004-0.701-0.007-1.082-0.007-3.748 0-7.443 0.232-11.07 0.681l0.434-0.044c-1.297 0.363-2.297 1.368-2.644 2.643l-0.006 0.026c-0.4 2.109-0.628 4.536-0.628 7.016 0 0.088 0 0.176 0.001 0.263l-0-0.014c-0 0.074-0.001 0.162-0.001 0.25 0 2.48 0.229 4.906 0.666 7.259l-0.038-0.244c0.354 1.301 1.354 2.307 2.625 2.663l0.027 0.006c3.193 0.406 6.886 0.638 10.634 0.638 0.38 0 0.76-0.002 1.14-0.007l-0.058 0.001c0.322 0.004 0.702 0.007 1.082 0.007 3.749 0 7.443-0.232 11.07-0.681l-0.434 0.044c1.298-0.362 2.298-1.368 2.646-2.643l0.006-0.026c0.399-2.109 0.627-4.536 0.627-7.015 0-0.088-0-0.176-0.001-0.263l0 0.013c0-0.074 0.001-0.162 0.001-0.25 0-2.48-0.229-4.906-0.666-7.259l0.038 0.244z"></path> </g></svg>
)
const BlogIndicator = () => (
  <svg fill="#000000" height="15px" width="15px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.8,18H15c-0.6,0-1-0.4-1-1v-2.8c0-0.3,0.1-0.5,0.3-0.7L24.9,2.9c0.2-0.2,0.4-0.3,0.7-0.3l0,0c0.3,0,0.5,0.1,0.7,0.3 l2.8,2.8c0.4,0.4,0.4,1,0,1.4L18.5,17.7C18.3,17.9,18.1,18,17.8,18z"></path> </g> <path d="M19.9,19.1c-0.6,0.6-1.3,0.9-2.1,0.9H15c-1.7,0-3-1.3-3-3v-2.8c0-0.8,0.3-1.6,0.9-2.1L18.9,6H9<C7.3,6,6,7.3,6,9v14 c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3v-9.9L19.9,19.1z"></path> </g></svg>
)

const Projects = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showAll, setShowAll] = useState(false)

  // Filter projects based on selected tags
  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return projectsData

    return projectsData.filter(project =>
      selectedTags.every(tag => project.tags.includes(tag))
    )
  }, [selectedTags])

  // Determine which projects to display based on showAll state
  const projectsToDisplay = useMemo(() => {
    if (showAll) return filteredProjects
    return filteredProjects.slice(0, 5) // Show only first 5 projects when showAll is false
  }, [filteredProjects, showAll])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSelectedTags([])
  }

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  let lastColSpan2Index = 0
  const isColSpan2 = (index: number) => {
    if (index === lastColSpan2Index + 3) {
      lastColSpan2Index = index
      return true
    }
    return false
  }

  const totalProjects = projectsData.length // only added: data to show

  return (
    <section id="projects" className="relative py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-32 left-16 w-28 h-28 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-80 right-24 w-20 h-20 bg-blue-500/20 rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute bottom-60 left-1/3 w-16 h-16 bg-primary/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 right-1/4 w-24 h-24 bg-blue-400/10 rounded-lg rotate-12 float-animation"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 right-1/2 translate-x-1/2 w-96 h-96 bg-gradient-to-r from-primary/20 via-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-l from-blue-400/15 via-primary/10 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 title="Meus Projetos" className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-700 via-gray-500 to-gray-100 bg-clip-text text-transparent mb-4">
            Meus Projetos
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-3">
            Uma coleção de projetos inovadores que demonstram minha experiência técnica e criatividade.
          </p>
          <p className="text-sm text-muted-foreground font-medium">
            Total de projetos: {totalProjects}
          </p>
        </motion.div>
      </div>

      <BentoGrid className="max-w-6xl mx-auto [@media(max-width:425px)]:grid-cols-1">
        {projectsToDisplay.map((project, i) => {
          const isFifthProject = !showAll && i === 4
          const isHiddenProject = !showAll && i >= 5

          if (isHiddenProject) return null

          return (
            <div key={project.title} className={`relative ${isColSpan2(i) ? 'md:col-span-2' : ''}`}>
              <BentoGridItem
                title={project.title}
                description={
                  <div className="space-y-1 text-sm text-foreground">
                    <p>{project.description}</p>
                    <div className="flex flex-wrap gap-3 ">
                      <Badge asChild variant="secondary" className="gap-1 rounded-full">
                        <a
                          title={`View ${project.title} on GitHub`}
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          <FaGithub className="size-3" />
                          GitHub
                        </a>
                      </Badge>

                      {"live" in project && (
                        <a
                          title={`View ${project.title} live demo`}
                          href={project.live as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-0.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                          <LiveIndicator />
                          Live
                        </a>
                      )}
                      {"video" in project && (
                        <a
                          title={`Watch ${project.title} video demo`}
                          href={project.video as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-0.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50" >
                          <VideoIndicator />
                          Video
                        </a>
                      )}
                      {"blog" in project && (
                        <a
                          title={`Read ${project.title} blog post`}
                          href={project.blog as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-0.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50" >
                          <BlogIndicator />
                          Blog
                        </a>
                      )}
                    </div>
                  </div>
                }
                header={
                  <div className="relative w-full h-full [@media(max-width:425px)]:min-h-[9rem] min-h-[6rem] rounded-xl overflow-hidden">
                    <Image
                      src={project.imageURL}
                      alt={project.title}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={80}
                      fill
                    />
                  </div>
                }
                className={isFifthProject ? 'blur-[3px] pointer-events-none' : ''}
              />

              {/* Show All Button overlay for 5th project */}
              {isFifthProject && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <button
                    title={`Show All Projects (${filteredProjects.length - 4})`}
                    onClick={toggleShowAll}
                    className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-400 text-gray-900 rounded-full font-medium hover:from-gray-400 hover:to-gray-100 transition-colors shadow-lg"
                  >
                    Show All ({filteredProjects.length}) Projects
                  </button>
                </div>
              )}
            </div>
          )
        })}

        {/* Show message when no projects match the filter */}
        {filteredProjects.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground text-lg">
              No projects match the selected tags. Try selecting different tags.
            </p>
          </div>
        )}

        {/* Show Less button when showAll is true */}
        {showAll && filteredProjects.length > 5 && (
          <div className="col-span-full text-center mt-8">
            <button
              title="Show Less Projects"
              onClick={toggleShowAll}
              className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Show Less
            </button>
          </div>
        )}
      </BentoGrid>
    </section>
  )
}

export default Projects

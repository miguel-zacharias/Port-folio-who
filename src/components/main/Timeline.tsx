'use client'

import { motion } from 'framer-motion'
import { FC, JSX } from 'react'
import Image from 'next/image'
import { Timeline as TimelineComponent } from '@/components/ui/timeline'
import { FaBook, FaCode, FaLaptopCode } from 'react-icons/fa'

export interface TimelineItem {
  id: number
  type: 'work' | 'project'
  title: string
  company: string
  location: string
  date: string
  imageURL: string
  description: string
  achievements: string[]
  icon: JSX.Element
  // companyIcon: JSX.Element
}

export const timelineData: TimelineItem[] = [
  {
    id: 2,
    type: 'work',
    title: 'Cadastro e Organização de Imóveis',
    company: 'Matheus Martins Imobiliária',
    location: 'Salto/SP',
    imageURL: '/icon_profile_mz.jpg',
    date: 'Outubro 2025 - Atual',
    description: 'Responsável pelo cadastro, organização e atualização de imóveis, garantindo precisão e controle do portfólio.',
    achievements: [
      "Coleta e registro de dados de imóveis",
      "Organização e atualização de informações no sistema",
      "Atenção aos detalhes e responsabilidade com dados",
    ],
    icon: <FaBook className="w-6 h-6 text-secondary" />,
  // companyIcon: <FaLaptopCode className="w-8 h-8 text-gray-500" />,
  },
  {
    id: 1,
    type: 'work',
    title: 'Estagiário em Segurança Eletrônica',
    company: 'PROTELT',
    location: 'Itu/SP',
    imageURL: '/  ',
    date: 'Apr 2025 - Jun 2025',
    description: 'Atuação prática com sistemas de alarme, câmeras e monitoramento em ambientes corporativos e residenciais.',
    achievements: [
      "Instalação e manutenção de sistemas de segurança",
      "Configuração de câmeras e alarmes",
      "Atendimento a clientes e suporte técnico",
    ],
    icon: <FaCode className="w-6 h-6 text-primary" />,
  // companyIcon: <FaLaptopCode className="w-8 h-8 text-blue-500" />,
  },
  {
    id: 3,
    type: 'project',
    title: 'Projetos de Áudio (MGS 2030 S e MSC 1000)',
    company: 'Projetos Pessoais',
    location: 'Salto/SP',
    imageURL: '',
    date: '2019 - Atual',
    description: 'Desenvolvimento de equipamentos de áudio, caixas de som e receivers, unindo criatividade, eletrônica e design.',
    achievements: [
      "Projeto e construção da caixa de som MGS 2030 S",
      "Desenvolvimento do receiver MSC 1000 com VU meter de LEDs",
      "Inovação em sistemas Transmission Line Speaker",
    ],
    icon: <FaCode className="w-6 h-6 text-primary" />,
  // companyIcon: <FaLaptopCode className="w-8 h-8 text-blue-500" />,
  },
]

export const TimelineElement: FC<{ item: TimelineItem; index: number }> = ({ item, index }) => (
  <div className="space-y-6" key={index}>
    <div>
      <h3 title={item.title} className="text-lg font-semibold text-foreground">{item.title}</h3>
      <p className="text-sm text-muted-foreground">
        {item.company} • {item.location}
      </p>
      <p className="text-sm text-muted-foreground">{item.date}</p>
    </div>

    <p className="text-sm text-muted-foreground">{item.description}</p>

    <ul className="list-disc pl-5 space-y-1 text-sm text-foreground">
      {item.achievements.map((ach) => (
        <li key={ach}>{ach}</li>
      ))}
    </ul>

    {item.type === 'project' && (
      <div className="w-full mt-4">
        <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-md bg-background">
          <Image
            src={item.imageURL}
            alt={`${item.title} Architecture`}
            className="object-contain"
            loading="lazy"
            fill
          />
        </div>
      </div>
    )}
  </div>
)

const Timeline: FC = () => {
  const timelineContent = timelineData.map((item) => ({
    title: item.date,
    content: <TimelineElement key={item.id} item={item} index={item.id} />,
  }))

  return (
    <section id="experience" className="relative py-20 text-foreground transition-colors overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-60 left-20 w-20 h-20 bg-blue-500/20 rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute bottom-40 right-1/4 w-16 h-16 bg-primary/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-blue-400/10 rounded-lg rotate-12 float-animation"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/3 right-1/2 translate-x-1/2 w-96 h-96 bg-gradient-to-r from-primary/20 via-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-l from-blue-400/15 via-primary/10 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 title="Experiência Profissional & Projetos" className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-700 via-gray-500 to-gray-100 bg-clip-text text-transparent mb-4">
            Experiência Profissional & Projetos
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Destaques da minha trajetória e projetos que demonstram minhas habilidades e impacto.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full"
        >
          <TimelineComponent data={timelineContent} />
        </motion.div>
      </div>
    </section>
  )
}

export default Timeline

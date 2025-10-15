export interface Skill {
  skill_name: string
  Image: string
  width: number
  height: number
}

export const skills: Skill[] = [
  // Linguagens de Programação
  { skill_name: 'PHP', Image: '/php.png', width: 70, height: 70 },
  { skill_name: 'JavaScript', Image: '/js.png', width: 70, height: 70 },
  { skill_name: 'Python', Image: '/python.svg', width: 70, height: 70 },
  { skill_name: 'HTML', Image: '/html.png', width: 70, height: 70 },
  { skill_name: 'CSS', Image: '/css-3.png', width: 70, height: 70 },

  // Frameworks
  { skill_name: 'Prisma', Image: '/prisma.webp', width: 70, height: 70 },
  { skill_name: 'Laravel', Image: '/laravel.png', width: 70, height: 70 },
  { skill_name: 'Vue', Image: '/vue.png', width: 70, height: 70 },

  // Mobile
  { skill_name: 'Flutter', Image: '/flutter.png', width: 70, height: 70 },
  { skill_name: 'Dart', Image: '/dart.png', width: 70, height: 70 },
  { skill_name: 'Github', Image: '/github.png', width: 70, height: 70 },
  { skill_name: 'Figma', Image: '/figma.png', width: 70, height: 70 },
]

export const Socials = [
  {
    name: 'Discord',
    src: '/instagram.svg',
    link: '',
  },
  {
    name: 'Facebook',
    src: '/facebook.svg',
    link: '',
  },
  {
    name: 'Instagram',
    src: '/discord.svg',
    link: '',
  },
]

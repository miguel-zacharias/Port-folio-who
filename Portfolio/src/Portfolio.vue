<script setup>
import { ref } from 'vue'

// Informações pessoais do desenvolvedor
const desenvolvedor = ref({
  nome: 'Miguel Zacharias',
  foto: 'https://avatars.githubusercontent.com/u/184536316?v=4',
  descricao: 'Web Developer | Laravel, PHP & JS | Cybersecurity Intern | Audio Gear Builder | Learning Full-Stack.',
  email: 'miguel.zacharias@aluno.senai.br',
  github: 'https://github.com/miguel-zacharias',
  linkedin: 'https://linkedin.com/in/miguel-zacharias'
})

// Lista de projetos para renderização dinâmica
const projetos = ref([
  {
    id: 1,
    titulo: 'Projeto La Bombonera Repository',
    descricao: 'Especializado em Raspberry Pi Pico 2w, automação industrial com esteira inteligente e entrega automatizada.',
    link: 'https://github.com/miguel-zacharias/La-Bombonera-Repository',
    tecnologias: ['Python', 'Raspberry', 'Automação']
  },
  {
    id: 2,
    titulo: 'Repositório de aulas VUE.JS',
    descricao: 'Projeto de estudo com diversas funcionalidades em Vue.js, incluindo manipulação de eventos, formulários e componentes reutilizáveis.',
    link: 'https://github.com/miguel-zacharias/Vue-JS',
    tecnologias: ['Vue.js', 'LocalHost', 'Tarefas']
  },
  {
    id: 3,
    titulo: 'Projeto Entre-Linhas',
    descricao: 'Um projeto de jornal escolar que visa promover a leitura e a escrita entre os alunos.',
    link: 'https://github.com/miguel-zacharias/EntreLinhas',
    tecnologias: ['HTML', 'PHP', 'JavaScript', 'Urls']
  }
])

// Função para abrir links em nova aba
function abrirLink(url) {
  window.open(url, '_blank')
}
</script>

<template>
  <div class="portfolio">
    <!-- Navbar flutuante glassmorphism -->
    <nav class="glass-navbar">
      <ul class="header-menu">
        <li><a href="#sobre">Sobre</a></li>
        <li><a href="#projetos">Projetos</a></li>
        <li><a href="#contato">Contato</a></li>
      </ul>
    </nav>
    <!-- Seção Header/Apresentação -->
    <header class="hero-section">
      <div class="perfil-container">
        <img 
          :src="desenvolvedor.foto" 
          :alt="`Foto de ${desenvolvedor.nome}`" 
          class="foto-perfil"
        />
        <div class="info-pessoal">
          <!-- Removido o texto Portifolio Zacharias -->
          <h1 class="nome-dev">{{ desenvolvedor.nome }}</h1>
          <p class="descricao">{{ desenvolvedor.descricao }}</p>
        </div>
      </div>
    </header>

    <!-- Seção de Projetos -->
    <section class="projetos-section">
      <h2 class="secao-titulo">🚀 Meus Projetos</h2>
      <div class="projetos-grid">
        <!-- Renderização dinâmica com v-for -->
        <div 
          v-for="projeto in projetos" 
          :key="projeto.id" 
          class="projeto-card"
        >
          <h3 class="projeto-titulo">{{ projeto.titulo }}</h3>
          <p class="projeto-descricao">{{ projeto.descricao }}</p>
          
          <!-- Tecnologias utilizadas -->
          <div class="tecnologias">
            <span 
              v-for="tech in projeto.tecnologias" 
              :key="tech" 
              class="tech-tag"
            >
              {{ tech }}
            </span>
          </div>
          
          <!-- Link clicável que abre em nova aba -->
          <button 
            @click="abrirLink(projeto.link)" 
            class="btn-projeto"
          >
            Ver Projeto →
          </button>
        </div>
      </div>
    </section>

    <!-- Seção de Contato -->
    <section class="contato-section">
      <h2 class="secao-titulo">Entre em Contato</h2>
      <div class="contato-links">
        <a 
          :href="`mailto:${desenvolvedor.email}`" 
          class="contato-link email"
        >
          📧 {{ desenvolvedor.email }}
        </a>
        <a 
          :href="desenvolvedor.github" 
          target="_blank" 
          class="contato-link github"
        >
          GitHub
        </a>
        <a 
          :href="desenvolvedor.linkedin" 
          target="_blank" 
          class="contato-link linkedin"
        >
          LinkedIn
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Navbar flutuante centralizada com efeito glassmorphism */
.glass-navbar {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 320px;
  max-width: 480px;
  width: 60vw;
  height: 54px;
  background: rgba(30, 30, 30, 0.28);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  box-shadow: 0 8px 32px rgba(0,0,0,0.22);
  font-weight: bold;
  letter-spacing: 2px;
  border-radius: 32px;
  border: 1.5px solid rgba(255,255,255,0.18);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  padding: 0 2.5rem;
}
.glass-navbar .header-menu {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.glass-navbar .header-menu li {
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 1px;
}
.glass-navbar .header-menu a {
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1.2rem;
  border-radius: 12px;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  background: rgba(220,220,220,0.08);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.glass-navbar .header-menu a:hover {
  background: #fff;
  color: #181818;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}
/* Estilos gerais do portfolio */
.portfolio {
  width: 100vw;
  margin: 0;
  padding: 2rem 4rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  background: #181818;
  min-height: 100vh;
  box-sizing: border-box;
}

/* Seção Hero/Apresentação */
.hero-section {
  background: rgba(40, 40, 40, 0.35);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-radius: 25px;
  padding: 3rem 2rem;
  color: #fff;
  margin-bottom: 3rem;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.37);
  border: 1px solid rgba(255,255,255,0.12);
  transition: all 0.3s ease;
}

.hero-section:hover {
  transform: translateY(-5px) scale(1.01);
  box-shadow: 0 15px 35px rgba(0,0,0,0.5);
  background: rgba(60,60,60,0.8);
}

.perfil-container {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.foto-perfil {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.3);
  object-fit: cover;
  box-shadow: 
    0 8px 20px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.foto-perfil:hover {
  transform: scale(1.05);
  box-shadow: 
    0 12px 25px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
}

.info-pessoal {
  flex: 1;
  min-width: 300px;
}

.nome-dev {
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  font-weight: bold;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  color: #ffffff;
  transition: all 0.3s ease;
}

.nome-dev:hover {
  text-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
  transform: scale(1.02);
}

.descricao {
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

/* Seção de Projetos */
.projetos-section {
  margin-bottom: 3rem;
}

.secao-titulo {
  font-size: 2rem;
  color: #ffffff;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: bold;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.projetos-grid {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}

/* Cards dos projetos */
.projeto-card {
  background: rgba(30, 30, 30, 0.35);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-radius: 25px;
  padding: 2rem;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.37);
  transition: all 0.3s ease;
  border: 1px solid rgba(255,255,255,0.10);
  flex: 1;
  min-width: 300px;
  max-width: 380px;
}

.projeto-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  background: rgba(60,60,60,0.8);
}

.projeto-titulo {
  color: #ffffff;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: bold;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.projeto-descricao {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

/* Tags de tecnologias */
.tecnologias {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.tech-tag {
  background: rgba(220,220,220,0.2);
  backdrop-filter: blur(8px);
  color: #fff;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(255,255,255,0.08);
}

/* Botão dos projetos */
.btn-projeto {
  background: rgba(220,220,220,0.2);
  backdrop-filter: blur(8px);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.08);
  padding: 0.8rem 1.5rem;
  border-radius: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;
}

.btn-projeto:hover {
  background: #fff;
  color: #181818;
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0,0,0,0.12);
}

/* Seção de Contato */
.contato-section {
  text-align: center;
  padding: 2rem;
  background: rgba(40, 40, 40, 0.35);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-radius: 25px;
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.37);
}

.contato-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.contato-link {
  color: #fff;
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border-radius: 15px;
  transition: all 0.3s ease;
  font-weight: 500;
  background: rgba(220,220,220,0.12);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
}

.contato-link:hover {
  transform: translateY(-2px) scale(1.02);
  color: #181818;
  background: #fff;
  box-shadow: 0 8px 25px rgba(0,0,0,0.12);
  border-color: #fff;
}

.email:hover { 
  background: rgba(255, 182, 193, 0.3);
  color: #ffffff; 
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  box-shadow: 
    0 8px 25px rgba(255, 182, 193, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.github:hover { 
  background: rgba(108, 117, 125, 0.3); 
  color: #ffffff; 
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  box-shadow: 
    0 8px 25px rgba(108, 117, 125, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.linkedin:hover { 
  background: rgba(0, 119, 181, 0.3); 
  color: #ffffff; 
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  box-shadow: 
    0 8px 25px rgba(0, 119, 181, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

/* Responsividade */
@media (max-width: 1200px) {
  .portfolio {
    padding: 2rem 2rem;
  }
}

@media (max-width: 768px) {
  .portfolio {
    padding: 1rem;
  }
  
  .perfil-container {
    flex-direction: column;
    text-align: center;
  }
  
  .nome-dev {
    font-size: 2rem;
  }
  
  .projetos-grid {
    flex-direction: column;
    align-items: center;
  }
  
  .projeto-card {
    max-width: 100%;
  }
  
  .contato-links {
    flex-direction: column;
    align-items: center;
  }
}

@media (min-width: 1920px) {
  .portfolio {
    padding: 2rem 6rem;
  }
  
  .projetos-grid {
    max-width: none;
    justify-content: space-evenly;
  }
  
  .projeto-card {
    max-width: 420px;
  }
}
</style>
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
    <!-- Cabeçalho flutuante estilo menu -->
    <nav class="floating-header">
      <ul class="header-menu">
        <li><a href="#sobre">Sobre</a></li>
        <li><a href="#projetos">Projetos</a></li>
        <li><a href="#contato">Contato</a></li>
      </ul>
    </nav>
    <!-- Seção Header/Apresentação -->
  <header class="hero-section" id="sobre">
      <div class="perfil-container">
        <img 
          :src="desenvolvedor.foto" 
          :alt="`Foto de ${desenvolvedor.nome}`" 
          class="foto-perfil"
        />
        <div class="info-pessoal">
          <h1 class="nome-dev">{{ desenvolvedor.nome }}</h1>
          <p class="descricao">{{ desenvolvedor.descricao }}</p>
        </div>
      </div>
    </header>

    <!-- Seção de Projetos -->
  <section class="projetos-section" id="projetos">
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
  <section class="contato-section" id="contato">
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
/* Menu do cabeçalho flutuante */
.header-menu {
  list-style: none;
  display: flex;
  gap: 2.5rem;
  margin: 0;
  padding: 0;
}
.header-menu li {
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 1px;
}
.header-menu a {
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1.2rem;
  border-radius: 12px;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.header-menu a:hover {
  background: rgba(255,255,255,0.25);
  color: #000;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}
/* Estilo preto e branco para toda a página */
.portfolio {
  width: 100vw;
  margin: 0;
  padding: 2rem 4rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  background: #000;
  color: #fff;
  min-height: 100vh;
  box-sizing: border-box;
}

/* Cabeçalho flutuante */
.floating-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  background: rgba(20, 20, 20, 0.6);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  font-weight: bold;
  letter-spacing: 2px;
  border-bottom: 1px solid rgba(255,255,255,0.15);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-radius: 0 0 20px 20px;
}
.header-logo {
  font-size: 2.2rem;
  margin-right: 1rem;
  font-weight: bold;
}
.header-title {
  font-size: 1.7rem;
  font-weight: bold;
}

/* Espaço para o header flutuante */
.portfolio {
  padding-top: 80px;
}

/* Seção Hero/Apresentação */
.hero-section {
  background: rgba(20, 20, 20, 0.6);
  border-radius: 25px;
  padding: 3rem 2rem;
  color: #fff;
  margin-bottom: 3rem;
  transition: all 0.3s ease;
}
.hero-section:hover {
  background: rgba(40,40,40,0.7);
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
  border: 3px solid #fff;
  object-fit: cover;
  box-shadow: 0 8px 20px rgba(0,0,0,0.7);
  transition: all 0.3s ease;
  background: #fff;
}
.foto-perfil:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 25px rgba(0,0,0,0.8);
  border-color: #fff;
}
.info-pessoal {
  flex: 1;
  min-width: 300px;
}
.nome-dev {
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  font-weight: bold;
  text-shadow: 0 2px 10px #000;
  color: #fff;
  transition: all 0.3s ease;
}
.nome-dev:hover {
  text-shadow: 0 4px 15px #fff;
  transform: scale(1.02);
}
.descricao {
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0;
  color: #fff;
  text-shadow: 0 1px 3px #000;
  transition: all 0.3s ease;
}

/* Seção de Projetos */
.projetos-section {
  margin-bottom: 3rem;
}
.secao-titulo {
  font-size: 2rem;
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: bold;
  text-shadow: 0 2px 10px #000;
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
  background: rgba(20, 20, 20, 0.6);
  border-radius: 25px;
  padding: 2rem;
  flex: 1;
  min-width: 300px;
  max-width: 380px;
  color: #fff;
  transition: all 0.3s ease;
  border: 1px solid rgba(255,255,255,0.18);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}
.projeto-card:hover {
  background: rgba(40,40,40,0.7);
}
.projeto-titulo {
  color: #fff;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: bold;
  text-shadow: 0 1px 3px #000;
}
.projeto-descricao {
  color: #fff;
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
  background: #fff;
  color: #000;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid #222;
}
/* Botão dos projetos */
.btn-projeto {
  background: #fff;
  color: #000;
  border: 1px solid #222;
  padding: 0.8rem 1.5rem;
  border-radius: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;
}
.btn-projeto:hover {
  background: #000;
  color: #fff;
  transform: scale(1.05);
  box-shadow: 0 5px 15px #fff;
}
/* Seção de Contato */
.contato-section {
  text-align: center;
  padding: 2rem;
  color: #fff;
  background: rgba(20, 20, 20, 0.6);
  border-radius: 25px;
  border: 1px solid rgba(255,255,255,0.18);
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.37);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
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
  background: #000;
  border: 1px solid #222;
  box-shadow: 0 4px 15px #fff;
}
.contato-link:hover {
  transform: translateY(-2px) scale(1.02);
  color: #000;
  background: #fff;
  box-shadow: 0 8px 25px #000;
  border-color: #fff;
}
.email:hover { 
  background: #fff;
  color: #000; 
  box-shadow: 0 8px 25px #fff;
  border-color: #fff;
}
.github:hover { 
  background: #fff; 
  color: #000; 
  box-shadow: 0 8px 25px #fff;
  border-color: #fff;
}
.linkedin:hover { 
  background: #fff; 
  color: #000; 
  box-shadow: 0 8px 25px #fff;
  border-color: #fff;
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

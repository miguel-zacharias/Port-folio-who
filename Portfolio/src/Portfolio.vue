<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

// preserved developer information
const desenvolvedor = ref({
  nome: 'Miguel Zacharias',
  foto: 'https://avatars.githubusercontent.com/u/184536316?v=4',
  descricao: 'Web Developer | Laravel, PHP & JS | Cybersecurity Intern | Audio Gear Builder | Learning Full-Stack.',
  email: 'miguel.zacharias@aluno.senai.br',
  github: 'https://github.com/miguel-zacharias',
  linkedin: 'https://linkedin.com/in/miguel-zacharias'
})

// preserved projects
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
  },
  {
    id: 4,
    titulo: 'Audio Gear Builder',
    descricao: 'Projetos pessoais de montagem e modificação de equipamentos de áudio e sintetizadores.',
    link: 'https://github.com/miguel-zacharias',
    tecnologias: ['Electronics', 'Soldering', 'DIY']
  },
  {
    id: 5,
    titulo: 'Cybersecurity Labs',
    descricao: 'Exercícios e laboratórios de segurança computacional para aprendizado prático.',
    link: 'https://github.com/miguel-zacharias',
    tecnologias: ['Security', 'Networking', 'Linux']
  }
])

// theme (dark / light) with persistence
const theme = ref('dark')
function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

// persist theme and apply to documentElement
watch(theme, (val) => {
  try { localStorage.setItem('pf_theme', val) } catch(e){}
  document.documentElement.setAttribute('data-theme', val)
})


function abrirLink(url) {
  window.open(url, '_blank')
}

// Lightweight particle background (no deps)
let raf
let _cardListeners = []
let resizeFn = null
let canvasMouseMove = null
let canvasMouseLeave = null
let mousePos = { x: -9999, y: -9999 }
let onMoveHandler = null
onMounted(() => {
  // restore theme from storage and apply immediately
  try { const saved = localStorage.getItem('pf_theme'); if (saved) theme.value = saved } catch(e){}
  document.documentElement.setAttribute('data-theme', theme.value)
  const canvas = document.getElementById('particles')
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let DPR = Math.max(1, window.devicePixelRatio || 1)
    resizeFn = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(rect.width * DPR))
      canvas.height = Math.max(1, Math.floor(rect.height * DPR))
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      // keep drawing crisp on high-DPI
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    resizeFn()

    // particles: larger pool but darker colors / low alpha to avoid interfering with text
    const particles = []
    const baseCount = Math.floor((canvas.clientWidth * canvas.clientHeight) / 120000)
    const count = Math.max(40, Math.min(180, Math.floor(baseCount * 1.4)))
    const colors = [
      '8,18,28',   // deep navy
      '12,28,42',  // dark blue
      '20,34,46',  // slate
      '30,40,54'   // charcoal
    ]

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.clientWidth,
        y: Math.random() * canvas.clientHeight,
        r: 0.8 + Math.random() * 4.2,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        col: colors[Math.floor(Math.random() * colors.length)],
        // darker, subtler particles so text remains legible
        alpha: 0.02 + Math.random() * 0.08
      })
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // slight twinkle variation
        p.alpha += (Math.random() - 0.5) * 0.008
        p.alpha = Math.max(0.01, Math.min(0.12, p.alpha))

        // mouse interaction: repel when cursor is near
        const dx = p.x - mousePos.x
        const dy = p.y - mousePos.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (mousePos.x >= 0 && dist < 120) {
          const force = (120 - dist) / 120
          // apply small velocity away from cursor
          if (dist > 0) {
            p.vx += (dx / dist) * force * 0.12
            p.vy += (dy / dist) * force * 0.12
          }
        }

        // move and apply slight damping
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.98
        p.vy *= 0.98

        // clamp velocities to keep field calm
        p.vx = Math.max(-1.2, Math.min(1.2, p.vx))
        p.vy = Math.max(-1.2, Math.min(1.2, p.vy))

        // wrap around edges for a continuous field
        if (p.x < -20) p.x = canvas.clientWidth + 20
        if (p.x > canvas.clientWidth + 20) p.x = -20
        if (p.y < -20) p.y = canvas.clientHeight + 20
        if (p.y > canvas.clientHeight + 20) p.y = -20

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.col}, ${p.alpha})`
        ctx.fill()
        ctx.closePath()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    window.addEventListener('resize', resizeFn)

    // --- custom cursor setup ---
    const cursor = document.getElementById('custom-cursor')
    if (cursor) {
      cursor.style.position = 'fixed'
      cursor.style.left = '0'
      cursor.style.top = '0'
      cursor.style.width = '14px'
      cursor.style.height = '14px'
      cursor.style.borderRadius = '50%'
      cursor.style.pointerEvents = 'none'
      cursor.style.zIndex = '9999'
      cursor.style.background = 'rgba(255,255,255,0.12)'
      cursor.style.transform = 'translate3d(-50%, -50%, 0) scale(1)'
      cursor.style.transition = 'transform 180ms cubic-bezier(.2,.9,.2,1), background 120ms'
    }

    function onMove(e) {
      if (cursor) cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) scale(1)`
    }

    // store handler so we can remove it on unmount
    onMoveHandler = onMove

    function onHoverIn() { if (cursor) cursor.style.transform = cursor.style.transform.replace(/scale\(1\)/, 'scale(2.2)') }
    function onHoverOut() { if (cursor) cursor.style.transform = cursor.style.transform.replace(/scale\([0-9.]+\)/, 'scale(1)') }

  window.addEventListener('mousemove', onMoveHandler)
    const interactive = 'a, button, .project-card, .nav-link, .pill, .btn-primary, .icon-btn, .contact-link'
    function bindHover() {
      document.querySelectorAll(interactive).forEach(el => {
        el.addEventListener('mouseenter', onHoverIn)
        el.addEventListener('mouseleave', onHoverOut)
      })
    }
    bindHover()

    // canvas mouse handlers for particle interaction
    canvasMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mousePos.x = e.clientX - rect.left
      mousePos.y = e.clientY - rect.top
    }
    canvasMouseLeave = () => {
      mousePos.x = -9999
      mousePos.y = -9999
    }
  canvas.addEventListener('mousemove', canvasMouseMove)
  canvas.addEventListener('mouseleave', canvasMouseLeave)

    // fluid sheen that follows cursor on project cards
    const cards = Array.from(document.querySelectorAll('.project-card'))
    cards.forEach(card => {
      // initialize CSS variables
      card.style.setProperty('--mx', '50')
      card.style.setProperty('--my', '50')

        const onMoveCard = (e) => {
          const r = card.getBoundingClientRect()
          const x = ((e.clientX - r.left) / r.width) * 100
          const y = ((e.clientY - r.top) / r.height) * 100
          // smooth by setting with small rounding
          card.style.setProperty('--mx', x.toFixed(1))
          card.style.setProperty('--my', y.toFixed(1))
          // small tilt: rx (rotateX) and ry (rotateY) in degrees
          const cx = (e.clientX - r.left) / r.width - 0.5
          const cy = (e.clientY - r.top) / r.height - 0.5
          const rx = (cy * 10) // tilt sensitivity vertical
          const ry = (-cx * 12) // tilt sensitivity horizontal
          card.style.setProperty('--rx', rx.toFixed(2) + 'deg')
          card.style.setProperty('--ry', ry.toFixed(2) + 'deg')
        }
      const onEnterCard = () => card.classList.add('hovering')
      const onLeaveCard = () => card.classList.remove('hovering')

      card.addEventListener('mousemove', onMoveCard)
      card.addEventListener('mouseenter', onEnterCard)
      card.addEventListener('mouseleave', onLeaveCard)

      _cardListeners.push({ card, onMoveCard, onEnterCard, onLeaveCard })
    })
})
onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf)
  // remove custom cursor
  const cursor = document.getElementById('custom-cursor')
  if (cursor && cursor.parentNode) cursor.parentNode.removeChild(cursor)

  // remove card listeners added in onMounted
  try {
    _cardListeners.forEach(({ card, onMoveCard, onEnterCard, onLeaveCard }) => {
      if (!card) return
      card.removeEventListener('mousemove', onMoveCard)
      card.removeEventListener('mouseenter', onEnterCard)
      card.removeEventListener('mouseleave', onLeaveCard)
    })
  } catch (e) {
    // ignore
  }
  _cardListeners = []
})
</script>

<template>
  <main :class="['page', theme]">
    <!-- enlarged nav with extra elements -->
    <header class="topbar" role="banner">
      <div class="topbar-inner">
        <div class="brand" @click.prevent="document.getElementById('sobre').scrollIntoView({behavior: 'smooth'})">
          <div style="display:flex;flex-direction:column;">
            <span class="brand-name">{{ desenvolvedor.nome }}</span>
            <span class="brand-role">Web Developer & Maker</span>
          </div>
        </div>

        <nav class="top-nav" aria-label="principal">
          <a class="nav-link" href="#sobre">Sobre</a>
          <a class="nav-link" href="#projetos">Projetos</a>
          <a class="nav-link" href="#contato">Contato</a>
        </nav>

        <div class="top-actions">
          <input class="search" placeholder="Procurar projetos..." aria-label="Pesquisar projetos" />
          <button class="icon-btn" title="Tema" aria-label="Alternar tema" @click="toggleTheme">
            <span v-if="theme === 'dark'">☀️</span>
            <span v-else>🌙</span>
          </button>
          <a class="icon-btn" title="GitHub" aria-label="Abrir GitHub" href="" @click.prevent="abrirLink(desenvolvedor.github)">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.95 3.22 9.15 7.69 10.63.56.1.77-.24.77-.54 0-.27-.01-1-.02-1.96-3.13.68-3.79-1.51-3.79-1.51-.51-1.3-1.25-1.65-1.25-1.65-1.02-.69.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 .17 1.56.98 1.56.98.99 1.71 2.6 1.22 3.24.93.1-.72.39-1.22.71-1.5-2.5-.29-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.45.11-3.03 0 0 .95-.3 3.12 1.15.9-.25 1.87-.37 2.83-.37.96 0 1.92.12 2.82.37 2.16-1.46 3.11-1.15 3.11-1.15.62 1.58.24 2.74.12 3.03.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.26-5.15 5.56.4.35.75 1.03.75 2.08 0 1.5-.01 2.71-.01 3.08 0 .3.21.65.78.54C19.03 20.9 22.25 16.7 22.25 11.75 22.25 5.48 17.27.5 12 .5z" fill="currentColor"/></svg>
          </a>
          <a class="icon-btn" title="LinkedIn" aria-label="Abrir LinkedIn" href="" @click.prevent="abrirLink(desenvolvedor.linkedin)">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.025-3.036-1.852-3.036-1.853 0-2.136 1.445-2.136 2.939v5.666H9.351V9h3.414v1.561h.049c.476-.901 1.637-1.852 3.368-1.852 3.602 0 4.268 2.37 4.268 5.456v6.287zM5.337 7.433a2.07 2.07 0 11.001-4.139 2.07 2.07 0 01-.001 4.14zM6.96 20.452H3.713V9h3.247v11.452z" fill="currentColor"/></svg>
          </a>
        </div>
      </div>
    </header>

    <!-- animated liquid-glass hero/banner -->
    <section id="sobre" class="hero">
      <canvas id="particles" aria-hidden="true"></canvas>
      <div class="hero-inner">
        <div class="avatar-wrap">
          <img :src="desenvolvedor.foto" :alt="`Foto de ${desenvolvedor.nome}`" class="avatar" />
          <div class="avatar-reflection"></div>
        </div>

        <div class="intro">
          <h1 class="title">{{ desenvolvedor.nome }}</h1>
          <p class="subtitle">{{ desenvolvedor.descricao }}</p>

          <div class="contact-row">
            <a :href="`mailto:${desenvolvedor.email}`" class="contact-link">📧 {{ desenvolvedor.email }}</a>
              <a class="contact-link social" href="#" @click.prevent="abrirLink(desenvolvedor.github)" aria-label="Abrir GitHub">
                <!-- small GitHub icon -->
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.95 3.22 9.15 7.69 10.63.56.1.77-.24.77-.54 0-.27-.01-1-.02-1.96-3.13.68-3.79-1.51-3.79-1.51-.51-1.3-1.25-1.65-1.25-1.65-1.02-.69.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 .17 1.56.98 1.56.98.99 1.71 2.6 1.22 3.24.93.1-.72.39-1.22.71-1.5-2.5-.29-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.45.11-3.03 0 0 .95-.3 3.12 1.15.9-.25 1.87-.37 2.83-.37.96 0 1.92.12 2.82.37 2.16-1.46 3.11-1.15 3.11-1.15.62 1.58.24 2.74.12 3.03.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.26-5.15 5.56.4.35.75 1.03.75 2.08 0 1.5-.01 2.71-.01 3.08 0 .3.21.65.78.54C19.03 20.9 22.25 16.7 22.25 11.75 22.25 5.48 17.27.5 12 .5z" />
                </svg>
                <span>GitHub</span>
              </a>
              <a class="contact-link social" href="#" @click.prevent="abrirLink(desenvolvedor.linkedin)" aria-label="Abrir LinkedIn">
                <!-- small LinkedIn icon -->
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.025-3.036-1.852-3.036-1.853 0-2.136 1.445-2.136 2.939v5.666H9.351V9h3.414v1.561h.049c.476-.901 1.637-1.852 3.368-1.852 3.602 0 4.268 2.37 4.268 5.456v6.287zM5.337 7.433a2.07 2.07 0 11.001-4.139 2.07 2.07 0 01-.001 4.14zM6.96 20.452H3.713V9h3.247v11.452z" />
                </svg>
                <span>LinkedIn</span>
              </a>
          </div>
        </div>
      </div>

      <div class="floating-controls" aria-hidden="true">
        <div class="control pill">Focus</div>
        <div class="control">🔔</div>
        <div class="control">�</div>
      </div>
    </section>

    <section id="projetos" class="projects">
      <div class="section-header">
        <h2>Projetos</h2>
        <p class="lead">Selecione um projeto para ver o repositório</p>
      </div>

      <ul class="projects-grid">
        <li v-for="(p, idx) in projetos" :key="p.id" class="project-card" :style="{ '--delay': (idx * 120) + 'ms' }" @click="abrirLink(p.link)" role="link" tabindex="0" @keydown.enter="abrirLink(p.link)">
          <h3 class="card-title">{{ p.titulo }}</h3>
          <p class="card-desc">{{ p.descricao }}</p>
          <div class="tags">
            <span v-for="t in p.tecnologias" :key="t" class="tag">{{ t }}</span>
          </div>
          <div class="card-actions">
            <button class="btn-ghost" @click.stop.prevent="abrirLink(p.link)">Abrir</button>
            <button class="btn-ghost" @click.stop.prevent="navigator.clipboard?.writeText(p.link)">Copiar URL</button>
          </div>
        </li>
      </ul>
    </section>

    <section id="contato" class="contact">
      <div class="contact-card">
        <h3>Vamos conversar?</h3>
        <p>Se quiser trabalhar comigo, perguntas ou apenas dizer oi — mande um email.</p>
        <div class="contact-actions">
          <a class="btn-primary" :href="`mailto:${desenvolvedor.email}`">Enviar Email</a>
          <a class="btn-outline" href="#" @click.prevent="abrirLink(desenvolvedor.github)">Ver GitHub</a>
        </div>
      </div>
    </section>
  </main>
  <!-- custom animated cursor -->
  <div id="custom-cursor" aria-hidden="true"></div>
</template>

<style scoped>
/* Page base - dark neutral to let glass colors pop */
.page {
  min-height: 100vh;
  padding: 4rem 2rem 6rem;
  background: linear-gradient(180deg, #0b0b0d 0%, #0f1113 60%);
  color: #e9eef8;
  font-family: Inter, 'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial;
}

/* tweakable variables for sheen and rim */
.page {
  --sheen-alpha: 0.08; /* intensity of sheen */
  --sheen-size: 600px; /* radius of sheen area */
  --sheen-transition: 280ms; /* transition speed */
}


.topbar { position:fixed; left:50%; transform:translateX(-50%); top:22px; z-index:80; padding:6px; backdrop-filter: blur(18px) saturate(140%); -webkit-backdrop-filter: blur(18px) saturate(140%); width: calc(100% - 140px); max-width:1000px; border-radius:18px; box-shadow: 0 10px 30px rgba(2,6,23,0.55); }
.topbar-inner { display:flex; align-items:center; gap:1rem; justify-content:space-between; padding:10px 14px; }
.brand { display:flex; align-items:center; gap:0.75rem; cursor:pointer; }
.brand-avatar { width:46px; height:46px; border-radius:12px; object-fit:cover; border:1px solid rgba(255,255,255,0.06); box-shadow: 0 6px 20px rgba(2,6,23,0.6); }
.brand-name { display:block; font-size:1rem; color:#f7fbff; }
.brand-role { display:block; color:rgba(220,230,255,0.7); font-size:0.72rem; }
.top-nav { display:flex; gap:0.6rem; }
.nav-link { background:transparent; color:rgba(240,246,255,0.92); border:none; padding:.5rem .8rem; border-radius:12px; cursor:pointer; font-weight:600; }
.nav-link:hover { transform:translateY(-3px); background:rgba(255,255,255,0.02); }
.nav-link, .top-nav a, a { text-decoration: none; }
.top-actions { display:flex; gap:0.6rem; align-items:center; }
.search { padding:.45rem .6rem; border-radius:10px; border:none; min-width:180px; background:rgba(255,255,255,0.02); color:inherit; }
.icon-btn { background:rgba(255,255,255,0.03); color:inherit; padding:.45rem .6rem; border-radius:10px; border:1px solid rgba(255,255,255,0.04); cursor:pointer; }

/* sizes for any inline svg icons inside buttons */
.icon-btn svg { width:16px; height:16px; display:block; }
.icon-btn { padding:.5rem .6rem; min-width:44px; min-height:40px; display:inline-flex; align-items:center; justify-content:center; }
/* slightly smaller topbar icons */
.top-actions .icon-btn svg { width:14px; height:14px }

/* enhanced interactive states */
.nav-link { transition: transform .18s ease, background .18s ease; }
.search:focus { outline: none; box-shadow: 0 6px 20px rgba(74,144,226,0.12); background: rgba(255,255,255,0.04); }
.icon-btn { transition: transform .12s ease, box-shadow .12s ease; }
.icon-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 30px rgba(2,6,23,0.5); }


/* Floating pill nav */
.hero {
  margin: 8rem auto 2rem;
}
.banner { max-width:1100px; padding:2rem; border-radius:20px; position:relative; overflow:visible; }
.banner-inner { display:flex; gap:2rem; align-items:center; }
.banner-left { flex:0 0 200px; }
.avatar-wrap.large { width:200px; height:200px; flex:0 0 200px; position:relative; }
.glow-ellipse { position:absolute; right:-18px; bottom:-12px; width:92px; height:92px; border-radius:999px; background:linear-gradient(120deg,#6ec1ff,#ff97c3); filter:blur(20px); opacity:0.18; }
.banner-title { font-size:2.4rem; margin:0 0 .4rem; color:#f7fbff; }
.banner-sub { margin:0 0 1rem; color:rgba(235,240,255,0.95); }

.floating-controls { display:none; }
.control { padding:12px 18px; border-radius:999px; background:rgba(255,255,255,0.03); backdrop-filter: blur(8px); border:1px solid rgba(255,255,255,0.05); box-shadow:0 8px 30px rgba(0,0,0,0.5); }
.control-pill { min-width:120px; text-align:center; font-weight:700; }
.pill {
  background: rgba(255,255,255,0.04);
  color: #eaf0ff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  transition: transform .18s ease, background .18s ease, box-shadow .18s ease;
}
.pill:hover { transform: translateY(-3px); background: rgba(255,255,255,0.07); }

/* HERO */
.hero {
  margin: 5.2rem auto 2rem; /* pulled up so floating nav sits comfortably above */
  max-width: 1100px;
  padding: 2.4rem;
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.004));
  box-shadow: 0 22px 80px rgba(2,6,23,0.8), inset 0 1px 0 rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.04);
  backdrop-filter: blur(24px) saturate(160%);
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
  /* rim stroke and subtle inner sheen */
}

/* glossy rim */
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 28px;
  padding: 1px 1px 2px 1px; /* asymmetric for more natural rim */
  -webkit-mask: linear-gradient(#000, #000) content-box, linear-gradient(#000, #000);
  mask: linear-gradient(#000, #000) content-box, linear-gradient(#000, #000);
  background: linear-gradient(90deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03));
  pointer-events: none;
}

/* animated gradient accent blobs (liquid glass color highlights) */
.hero::after {
  content: "";
  position: absolute;
  right: -6%;
  bottom: -8%;
  width: 340px;
  height: 220px;
  border-radius: 48px;
  filter: blur(36px) saturate(160%);
  background: linear-gradient(120deg, rgba(110,193,255,0.15), rgba(255,151,195,0.12));
  opacity: 0.9;
  transform: translateY(0);
  animation: floatAccent 6s ease-in-out infinite;
  pointer-events: none;
}

@keyframes floatAccent {
  0% { transform: translateY(0) translateX(0) rotate(0deg); }
  50% { transform: translateY(-8px) translateX(-6px) rotate(2deg); }
  100% { transform: translateY(0) translateX(0) rotate(0deg); }
}
.hero-inner { display:flex; gap:2.2rem; align-items:center; width:100%; position:relative; z-index:2; }
.avatar-wrap { position:relative; width:160px; height:160px; flex:0 0 160px; }
.avatar {
  width:100%; height:100%; border-radius:20px; object-fit:cover;
  border-radius: 22px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.02) inset;
  border: 1px solid rgba(255,255,255,0.08);
  transform: translateZ(0);
}
.avatar-reflection {
  position:absolute; inset:0; pointer-events:none; border-radius:22px;
  background: linear-gradient(120deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02));
  mix-blend-mode: overlay; opacity:0.9;
  filter: blur(8px);
}
.intro { flex:1; }
.title { font-size:2.2rem; margin:0 0 .4rem; color:#f7fbff; letter-spacing: -0.02em; opacity:0; transform: translateY(6px); animation: textIn .6s ease forwards; }
.subtitle { margin:0 0 1rem; color:rgba(235,240,255,0.9); }
.contact-row { display:flex; gap:0.8rem; align-items:center; flex-wrap:wrap; }
.contact-link { display:inline-block; padding:.5rem .9rem; border-radius:12px; text-decoration:none; color:inherit; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.04); transition:all .18s ease; }
.contact-link:hover { transform:translateY(-3px); background:rgba(255,255,255,0.06); }

@keyframes textIn { to { opacity:1; transform: translateY(0); } }

/* cards entrance animation: slide up and fade in */
@keyframes cardIn {
  from { opacity: 0; transform: translateY(12px) scale(.995); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* Projects */
.projects { max-width:1100px; margin:2rem auto; }
.section-header { text-align:center; margin-bottom:1rem; }
.section-header h2 { font-size:1.6rem; margin:0; }
.section-header .lead { color:rgba(220,230,255,0.7); margin:0.4rem 0 0; }

.projects-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:1.2rem; list-style:none; padding:0; margin:1.2rem 0 0; }
.project-card {
  padding:1.2rem;
  border-radius:16px;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  border:1px solid rgba(255,255,255,0.05);
  backdrop-filter: blur(14px) saturate(130%);
  box-shadow: 0 8px 30px rgba(0,0,0,0.55);
  display:flex;
  flex-direction:column;
  gap:.9rem;
  height:100%;
  cursor:pointer;
  transform:translateY(12px) scale(.995);
  opacity:0;
  animation: cardIn .56s cubic-bezier(.2,.9,.2,1) forwards;
  animation-delay: var(--delay, 0ms);
  position: relative;
  overflow: hidden;
}
.project-card:hover { transform: translateY(-6px) scale(1.02); box-shadow: 0 18px 60px rgba(2,6,23,0.6); }
.project-card:focus { outline:3px solid rgba(110,193,255,0.18); }

/* sheen layer */
.project-card::before {
  /* subtle rim: soft inner stroke and shadow to suggest glass edge */
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 16px;
  pointer-events: none;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.03) inset, 0 8px 30px rgba(0,0,0,0.45);
  mix-blend-mode: overlay;
  opacity: 1;
}

.project-card::after {
  /* radial sheen centered on mouse position (controlled via --mx/--my) */
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 16px;
  pointer-events: none;
  background: radial-gradient(var(--sheen-size,420px) circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,var(--sheen-alpha,0.08)), rgba(255,255,255,0.02) 18%, rgba(255,255,255,0) 38%);
  mix-blend-mode: overlay;
  opacity: 0;
  transition: opacity var(--sheen-transition,360ms) ease, transform var(--sheen-transition,360ms) ease;
}

.project-card.hovering::after { opacity: 1; }

/* 3D tilt and smoother hover transitions (use CSS vars set by JS) */
.project-card {
  --rx: 0deg;
  --ry: 0deg;
  transition: transform 280ms cubic-bezier(.2,.9,.2,1), box-shadow 280ms ease;
  transform-origin: center center;
}
.project-card.hovering {
  transform: perspective(900px) rotateX(var(--rx)) rotateY(var(--ry)) translateZ(0) scale(1.01);
}

/* light theme overrides */
.page.light {
  background: linear-gradient(180deg, #f6f8fb 0%, #eef3f9 60%);
  color: #0b1220;
}
.page.light .topbar { background: rgba(255,255,255,0.6); box-shadow: 0 8px 24px rgba(8,12,20,0.06); }
.page.light .hero { background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.96)); box-shadow: 0 12px 40px rgba(8,12,20,0.06); border:1px solid rgba(10,18,30,0.04); }
.page.light .project-card { background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.96)); border:1px solid rgba(10,18,30,0.04); color: #0b1220; box-shadow: 0 6px 18px rgba(8,12,20,0.06); }
.page.light .project-card::before { box-shadow: 0 0 0 1px rgba(12,18,28,0.02) inset, 0 6px 18px rgba(0,0,0,0.04); }

.contact-actions { margin-top:1rem; display:flex; gap:0.8rem; justify-content:center; flex-wrap:wrap; }
.btn-primary { background: linear-gradient(180deg,#6ec1ff,#4a90e2); color:#061127; padding:.7rem 1rem; border-radius:10px; text-decoration:none; font-weight:700; }
.btn-outline { padding:.6rem .9rem; border-radius:10px; border:1px solid rgba(255,255,255,0.06); color:inherit; text-decoration:none; }

/* subtle floating accent blobs to imitate liquid glass colorful highlights */
.page::before, .page::after {
  content:""; position:fixed; pointer-events:none; border-radius:999px; filter: blur(40px); opacity:0.12; mix-blend-mode: screen; z-index:0;
}
.page::before { width:400px; height:400px; left:6%; top:8%; background:linear-gradient(120deg,#5cc8ff, #ff97c3); }
.page::after { width:480px; height:480px; right:4%; bottom:6%; background:linear-gradient(120deg,#9b8bff, #4ad7b3); }

/* make canvas fill hero area */
#particles { position:absolute; inset:0; width:100%; height:100%; border-radius:20px; z-index:1; pointer-events:none; mix-blend-mode: multiply; opacity:0.92 }

/* custom animated cursor */
#custom-cursor { width:14px; height:14px; border-radius:50%; position:fixed; left:0; top:0; transform: translate3d(-50%, -50%, 0); pointer-events:none; z-index:9999; transition: transform 160ms cubic-bezier(.2,.9,.2,1), background 140ms }
#custom-cursor.hover { transform: translate3d(-50%, -50%, 0) scale(2.2); background: rgba(110,193,255,0.18) }


/* responsiveness tweaks */
@media (max-width: 800px) {
  .hero { margin-top:4.5rem; padding:1.2rem; }
  .avatar-wrap { width:110px; height:110px; flex:0 0 110px; }
  .title { font-size:1.4rem; }
  .nav-pill { top:16px; }
}

</style>
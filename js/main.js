// ============================================
// ARTE IN TAVOLA - Main JavaScript
// ============================================

// Importar CSS
import '../css/style.css'

// ============================================
// MOBILE MENU TOGGLE
// ============================================
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn')
  const mobileMenu = document.getElementById('mobile-menu')
  const mobileMenuClose = document.getElementById('mobile-menu-close')

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-full')
      document.body.style.overflow = 'hidden'
    })

    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full')
        document.body.style.overflow = 'auto'
      })
    }

    // Close menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a')
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full')
        document.body.style.overflow = 'auto'
      })
    })
  }
}

// ============================================
// STICKY NAVIGATION COM FUNDO OPACO
// ============================================
function initStickyNav() {
  const nav = document.querySelector('nav')
  if (!nav) return

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset

    // Quando rolar mais de 50px, adiciona fundo opaco
    if (currentScroll > 50) {
      // Aplicar estilos diretamente via JavaScript
      nav.style.backgroundColor = 'rgba(31, 77, 58, 0.95)'
      nav.style.backdropFilter = 'blur(10px)'
      nav.style.webkitBackdropFilter = 'blur(10px)'
      nav.classList.add('shadow-lg')
      nav.classList.remove('bg-transparent')
    } else {
      // Remover estilos e voltar ao transparente
      nav.style.backgroundColor = ''
      nav.style.backdropFilter = ''
      nav.style.webkitBackdropFilter = ''
      nav.classList.remove('shadow-lg')
      nav.classList.add('bg-transparent')
    }
  })
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href')
      
      if (href === '#') return
      
      e.preventDefault()
      const target = document.querySelector(href)
      
      if (target) {
        const offsetTop = target.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        })
      }
    })
  })
}

// ============================================
// REVEAL ON SCROLL ANIMATION
// ============================================
function initRevealOnScroll() {
  const reveals = document.querySelectorAll('.reveal')
  
  if (reveals.length === 0) return

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active')
        revealObserver.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  })

  reveals.forEach(reveal => {
    revealObserver.observe(reveal)
  })
}

// ============================================
// PARALLAX EFFECT FOR HERO VIDEO
// ============================================
function initParallax() {
  const hero = document.querySelector('.hero-section')
  if (!hero) return

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset
    const parallaxSpeed = 0.5
    
    if (scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`
    }
  })
}

// ============================================
// VIDEO FALLBACK FOR MOBILE
// ============================================
function initVideoFallback() {
  const video = document.querySelector('.hero-video')
  if (!video) return

  // Check if mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  
  if (isMobile) {
    // Ensure video plays on mobile
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')
    video.muted = true
    
    // Try to play video
    const playPromise = video.play()
    
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // If video fails, hide it and show fallback background
        video.style.display = 'none'
        const heroSection = video.closest('.hero-section')
        if (heroSection) {
          heroSection.style.background = 'linear-gradient(135deg, #1f4d3a 0%, #163528 100%)'
        }
      })
    }
  }
}

// ============================================
// ACTIVE LINK HIGHLIGHT
// ============================================
function initActiveLinks() {
  const currentPath = window.location.pathname
  const navLinks = document.querySelectorAll('nav a')
  
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname
    
    if (currentPath === linkPath || 
        (currentPath === '/' && linkPath.includes('index.html')) ||
        (currentPath.includes('index.html') && linkPath === '/')) {
      link.classList.add('border-b-2', 'border-tavola-gold')
    }
  })
}

// ============================================
// BUTTON RIPPLE EFFECT
// ============================================
function initRippleEffect() {
  const buttons = document.querySelectorAll('.btn-primary, .btn-outline')
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span')
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2
      
      ripple.style.width = ripple.style.height = size + 'px'
      ripple.style.left = x + 'px'
      ripple.style.top = y + 'px'
      ripple.classList.add('ripple')
      
      this.appendChild(ripple)
      
      setTimeout(() => ripple.remove(), 600)
    })
  })
}

// ============================================
// INITIALIZE ALL FUNCTIONS ON DOM LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu()
  initStickyNav()
  initSmoothScroll()
  initRevealOnScroll()
  initParallax()
  initVideoFallback()
  initActiveLinks()
  initRippleEffect()
  
  console.log('🍝 Arte In Tavola website loaded successfully!')
})

// ============================================
// EXPORT FUNCTIONS FOR USE IN OTHER FILES
// ============================================
export {
  initMobileMenu,
  initStickyNav,
  initSmoothScroll,
  initRevealOnScroll
}
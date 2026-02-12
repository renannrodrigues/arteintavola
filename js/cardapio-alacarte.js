// ============================================
// ARTE IN TAVOLA - Cardápio à La Carte JavaScript
// ============================================

import '../css/style.css'
import { initMobileMenu, initStickyNav, initSmoothScroll } from './main.js'

// ============================================
// MENU DATA - ARTE IN TAVOLA
// ============================================
const menuData = [
  // ========== ENTRADAS / APPETIZERS ==========
  {
    category: 'entradas',
    name: 'Bala de massa folhada recheada com cogumelos Paris frescos e presunto tipo Parma',
    description: 'Polvilhada com parmesão ralado e mostarda Dijon e creme quatro queijos. Puff pastry ball with Paris mushroom, Parma ham and four cheeses',
    price: 'R$ 38,00',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&h=400&fit=crop'
  },
  {
    category: 'entradas',
    name: 'Couvert Arte in Tavola',
    description: 'Com baguete e focaccias artesanais com fermentação natural, grissini, salame, queijo colonial e patê',
    price: 'R$ 37,00',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop'
  },

  // ========== SALADAS / SALADS ==========
  {
    category: 'saladas',
    name: 'A moda da casa',
    description: 'Mix de folhas, com tahine, azeite de oliva, mel, aceto balsâmico, confit de tomates cereja e lascas de parmesão. Mixed leaves with tahini, olive oil, honey, balsamic vinagre, witchery tomato and chips of Parmesan cheese',
    price: 'R$ 29,00',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop'
  },

  // ========== ADICIONAIS / ADDITIONALS ==========
  {
    category: 'adicionais',
    name: 'Salmão grelhado',
    description: 'Grilled salmon (100g)',
    price: 'R$ 33,00',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop'
  },
  {
    category: 'adicionais',
    name: 'Filé mignon grelhado',
    description: 'Grilled filet mignon (100g)',
    price: 'R$ 29,00',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=400&fit=crop'
  },

  // ========== SOPAS / SOUPS ==========
  {
    category: 'sopas',
    name: 'Sopa de cebola gratinada ao estilo francês',
    description: 'Com pão e queijo colonial. Onion soup with french style au gratin, colonial cheese and bread',
    price: 'R$ 55,00',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop'
  },
  {
    category: 'sopas',
    name: 'Sopa de capeletti com recheio de frango',
    description: 'Capeletti soup with chicken filling',
    price: 'R$ 55,00',
    image: 'https://images.unsplash.com/photo-1588566565463-180a5b2090d2?w=600&h=400&fit=crop'
  },

  // ========== PRIMEIRO PRATO / FIRST COURSES (RISOTOS) ==========
  {
    category: 'risotos',
    name: 'Risoto com camarões e abobrinha',
    description: 'Arroz arbóreo e açafrão. Pumpkin and prawn risotto',
    price: 'R$ 115,00',
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=600&h=400&fit=crop'
  },
  {
    category: 'risotos',
    name: 'Risoto de tomate seco, rúcula e cogumelos Paris fresco',
    description: 'Dried tomato risotto, arugula and fresh Paris mushroom',
    price: 'R$ 89,00',
    image: 'https://images.unsplash.com/photo-1476124369491-f51ad4d3c149?w=600&h=400&fit=crop'
  },
  {
    category: 'risotos',
    name: 'Risoto de aspargos frescos',
    description: 'Risotto with fresh asparagus',
    price: 'R$ 74,00',
    image: 'https://images.unsplash.com/photo-1593560704563-f176a2eb61db?w=600&h=400&fit=crop'
  },

  // ========== MASSAS FRESCAS / FRESH PASTA ==========
  {
    category: 'massas',
    name: 'Ravioli de búfala Gomes de Sá',
    description: 'Ravioli recheado com mussarela de búfala ao molho de tomate fresco. Gomes de Sá styled soft codfish ravioli',
    price: 'R$ 115,00',
    image: 'https://images.unsplash.com/photo-1587740896339-96a76170508d?w=600&h=400&fit=crop',
    featured: true
  },
  {
    category: 'massas',
    name: 'Tortelloni de pato ao noccioli',
    description: 'Duck tortelloni pasta with noccioli sauce',
    price: 'R$ 114,00',
    image: 'https://images.unsplash.com/photo-1611171711912-e4d17ff276e0?w=600&h=400&fit=crop'
  },
  {
    category: 'massas',
    name: 'Lasanha de coelho',
    description: 'Rabbit lasagna',
    price: 'R$ 89,00',
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&h=400&fit=crop'
  },
  {
    category: 'massas',
    name: 'Tortéi ao molho de provolone, manjericão e farofa de presunto Parma',
    description: 'Tortellini with Provolone cheese, basil and Parma ham sauce',
    price: 'R$ 88,00',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop'
  },
  {
    category: 'massas',
    name: 'Tagliarini (bianco ou tricolori) ao molho quatro queijos ou sugo',
    description: 'Tagliarini pasta (bianco or tricolori) with four cheese or sugo sauce',
    price: 'R$ 82,00',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&h=400&fit=crop'
  },

  // ========== PRATO PRINCIPAL / MAIN COURSES ==========
  {
    category: 'principais',
    name: 'Salmão em crosta de gergelim',
    description: 'Ao molho de ervas finas com purê de batata baroa estilo Bairro. Sesame crust salmon with fine herb sauce and Bairro-style mashed potatoes',
    price: 'R$ 115,00',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop',
    featured: true
  },
  {
    category: 'principais',
    name: 'Codorna com massa caseira da Vó Nita',
    description: 'Massa cortada na faca. Quail with Grandma\'s Nita homemade pasta (pasta cut with knife)',
    price: 'R$ 103,00',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop'
  },
  {
    category: 'principais',
    name: 'Stinco de cordeiro',
    description: 'Com tagliarini bianco aos três cogumelos. Roasted lamb with bianco tagliarini pasta and three mushrooms sauce',
    price: 'R$ 126,00',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&h=400&fit=crop'
  },
  {
    category: 'principais',
    name: 'Ossobuco com risoto à la milanesa',
    description: 'Risoto de açafrão. Ossobuco meat with fresh tomato sauce (saffron risotto)',
    price: 'R$ 115,00',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&h=400&fit=crop'
  },
  {
    category: 'principais',
    name: 'Filé mignon com rúcula ao aceto balsâmico',
    description: 'E batata ao forno. Filet mignon with arugula on balsamic vinegar and oven baked potato',
    price: 'R$ 89,00',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=400&fit=crop'
  },
  {
    category: 'principais',
    name: 'Risoto de ervas finas com frango ou alcatra grelhado',
    description: 'Fine herbs risotto with grilled chicken or rump',
    price: 'R$ 63,00',
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600&h=400&fit=crop'
  },

  // ========== SOBREMESAS / DESSERTS ==========
  {
    category: 'sobremesas',
    name: 'Semifredo',
    description: 'Consultar sabores. Ice cream (ask flavors)',
    price: 'R$ 29,00',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=400&fit=crop'
  },
  {
    category: 'sobremesas',
    name: 'Creme brulée',
    description: 'Creme brulée',
    price: 'R$ 29,00',
    image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&h=400&fit=crop'
  },
  {
    category: 'sobremesas',
    name: 'Sorvete natural',
    description: 'Consultar sabores. Natural ice cream (ask flavors)',
    price: 'R$ 25,00',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=400&fit=crop'
  }
]

// ============================================
// FILTER MENU BY CATEGORY
// ============================================
function filterMenu(category) {
  const filteredItems = category === 'todos' 
    ? menuData 
    : menuData.filter(item => item.category === category)
  
  renderMenuItems(filteredItems)
  updateActiveFilter(category)
}

// ============================================
// GET CATEGORY LABEL
// ============================================
function getCategoryLabel(category) {
  const labels = {
    'entradas': 'Entradas',
    'saladas': 'Saladas',
    'sopas': 'Sopas',
    'risotos': 'Risotos',
    'massas': 'Massas Frescas',
    'principais': 'Principais',
    'sobremesas': 'Sobremesas',
    'adicionais': 'Adicionais'
  }
  return labels[category] || category
}

// ============================================
// RENDER MENU ITEMS - ESTILO BOX COM IMAGEM
// ============================================
function renderMenuItems(items) {
  const menuGrid = document.getElementById('menu-grid')
  
  if (!menuGrid) return
  
  // Add fade out animation
  menuGrid.style.opacity = '0'
  
  setTimeout(() => {
    menuGrid.innerHTML = items.map(item => `
      <div class="reveal">
        <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
          <!-- Imagem -->
          <div class="relative h-56 overflow-hidden">
            <img 
              src="${item.image}" 
              alt="${item.name}"
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <div class="absolute top-4 left-4">
              <span class="inline-block bg-tavola-green/90 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide shadow-lg">
                ${getCategoryLabel(item.category)}
              </span>
            </div>
          </div>
          
          <!-- Conteúdo -->
          <div class="p-6 flex-grow flex flex-col">
            <h3 class="text-xl font-display font-bold text-tavola-green mb-3 leading-tight">
              ${item.name}
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
              ${item.description}
            </p>
            <div class="pt-4 border-t border-gray-200">
              <span class="text-3xl font-bold text-tavola-green">
                ${item.price}
              </span>
            </div>
          </div>
        </div>
      </div>
    `).join('')
    
    // Fade in animation
    menuGrid.style.opacity = '1'
    
    // Re-initialize reveal animations
    const reveals = menuGrid.querySelectorAll('.reveal')
    reveals.forEach((reveal, index) => {
      setTimeout(() => {
        reveal.classList.add('active')
      }, index * 50)
    })
  }, 300)
}

// ============================================
// UPDATE ACTIVE FILTER BUTTON
// ============================================
function updateActiveFilter(activeCategory) {
  const filterButtons = document.querySelectorAll('.filter-btn')
  
  filterButtons.forEach(btn => {
    const category = btn.dataset.category
    
    if (category === activeCategory) {
      btn.classList.remove('bg-white', 'text-tavola-green', 'hover:bg-gray-50')
      btn.classList.add('bg-tavola-green', 'text-white')
    } else {
      btn.classList.remove('bg-tavola-green', 'text-white')
      btn.classList.add('bg-white', 'text-tavola-green', 'hover:bg-gray-50')
    }
  })
}

// ============================================
// INITIALIZE MENU PAGE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize common functions
  initMobileMenu()
  initStickyNav()
  initSmoothScroll()
  
  // Render all menu items initially
  renderMenuItems(menuData)
  
  // Setup filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn')
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category
      filterMenu(category)
    })
  })
  
  // Reveal animations for initial items
  setTimeout(() => {
    const reveals = document.querySelectorAll('.reveal')
    reveals.forEach((reveal, index) => {
      setTimeout(() => {
        reveal.classList.add('active')
      }, index * 50)
    })
  }, 100)
  
  console.log('🍽 Página de Cardápio à La Carte carregada!')
  console.log(`${menuData.length} itens no menu`)
})
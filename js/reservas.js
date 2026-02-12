// ============================================
// ARTE IN TAVOLA - Reservas JavaScript
// ============================================

import '../css/style.css'
import { initMobileMenu, initStickyNav, initSmoothScroll } from './main.js'

// ============================================
// RESTAURANT INFO
// ============================================
const RESTAURANT_INFO = {
  phone: '5554996350445', // (54) 99635-0445
  whatsappNumber: '5554996350445',
  openDays: ['tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
  closedDay: 'monday',
  // Horários específicos permitidos
  allowedTimes: ['19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30'],
  minGuests: 1,
  maxGuests: 20,
  maxChildren: 10
}

// ============================================
// POPULATE TIME SELECT
// ============================================
function populateTimeSelect() {
  const timeSelect = document.getElementById('time')
  
  if (timeSelect) {
    // Limpar opções existentes
    timeSelect.innerHTML = '<option value="">Selecione o horário</option>'
    
    // Adicionar horários permitidos
    RESTAURANT_INFO.allowedTimes.forEach(time => {
      const option = document.createElement('option')
      option.value = time
      option.textContent = time
      timeSelect.appendChild(option)
    })
  }
}

// ============================================
// HANDLE CHILDREN COUNT CHANGE
// ============================================
function handleChildrenCountChange() {
  const childrenCount = parseInt(document.getElementById('children-count').value) || 0
  const childrenAgesContainer = document.getElementById('children-ages-container')
  const childrenAgesInputs = document.getElementById('children-ages-inputs')
  
  if (childrenCount > 0) {
    childrenAgesContainer.classList.remove('hidden')
    
    // Criar inputs para idade das crianças
    childrenAgesInputs.innerHTML = ''
    
    for (let i = 0; i < childrenCount; i++) {
      const ageInput = document.createElement('div')
      ageInput.className = 'flex items-center gap-3'
      ageInput.innerHTML = `
        <label class="text-sm font-medium text-gray-700 w-32">Criança ${i + 1}:</label>
        <input 
          type="number" 
          id="child-age-${i}"
          name="child-age-${i}"
          min="0" 
          max="17" 
          placeholder="Idade"
          class="form-input flex-1"
          required
        />
        <span class="text-xs text-gray-500">anos</span>
      `
      childrenAgesInputs.appendChild(ageInput)
    }
  } else {
    childrenAgesContainer.classList.add('hidden')
    childrenAgesInputs.innerHTML = ''
  }
}

// ============================================
// VALIDATE OPENING HOURS
// ============================================
function validateOpeningHours(date, time) {
  // Parse date in local timezone to avoid offset issues
  const [year, month, day] = date.split('-').map(Number)
  const selectedDate = new Date(year, month - 1, day)
  const dayOfWeek = selectedDate.getDay() // 0 = Sunday, 1 = Monday, etc.
  
  // Check if closed on Monday
  if (dayOfWeek === 1) {
    return {
      valid: false,
      message: 'Restaurante fechado às segundas-feiras. Por favor, selecione outro dia.'
    }
  }
  
  // Validate time is in allowed times
  if (time && !RESTAURANT_INFO.allowedTimes.includes(time)) {
    return {
      valid: false,
      message: `Por favor, selecione um dos horários disponíveis: ${RESTAURANT_INFO.allowedTimes.join(', ')}`
    }
  }
  
  return { valid: true }
}

// ============================================
// FORM VALIDATION
// ============================================
function validateForm(formData) {
  const errors = []
  
  // Validate name
  if (formData.name.trim().length < 3) {
    errors.push('Nome deve ter pelo menos 3 caracteres')
  }
  
  // Validate phone
  const phoneRegex = /^[\d\s\-\(\)]+$/
  if (!phoneRegex.test(formData.phone) || formData.phone.length < 10) {
    errors.push('Telefone inválido. Por favor, digite um número válido.')
  }
  
  // Validate date - permite reservas até hoje
  const [year, month, day] = formData.date.split('-').map(Number)
  const selectedDate = new Date(year, month - 1, day)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  if (selectedDate < today) {
    errors.push('Data deve ser hoje ou no futuro')
  }
  
  // Validate opening hours
  const hoursValidation = validateOpeningHours(formData.date, formData.time)
  if (!hoursValidation.valid) {
    errors.push(hoursValidation.message)
  }
  
  // Validate time
  if (!formData.time) {
    errors.push('Selecione um horário')
  }
  
  // Validate guests
  const totalGuests = formData.adults + formData.children
  if (totalGuests < RESTAURANT_INFO.minGuests || totalGuests > RESTAURANT_INFO.maxGuests) {
    errors.push(`Número total de pessoas deve ser entre ${RESTAURANT_INFO.minGuests} e ${RESTAURANT_INFO.maxGuests}`)
  }
  
  // Validate adults
  if (formData.adults < 1) {
    errors.push('Deve haver pelo menos 1 adulto')
  }
  
  // Validate children count
  if (formData.children > RESTAURANT_INFO.maxChildren) {
    errors.push(`Número máximo de crianças: ${RESTAURANT_INFO.maxChildren}`)
  }
  
  // Validate children ages
  if (formData.children > 0 && formData.childrenAges.length !== formData.children) {
    errors.push('Por favor, informe a idade de todas as crianças')
  }
  
  // Validate each child age
  formData.childrenAges.forEach((age, index) => {
    if (age < 0 || age > 17) {
      errors.push(`Idade da criança ${index + 1} deve estar entre 0 e 17 anos`)
    }
  })
  
  return errors
}

// ============================================
// SHOW ERROR MESSAGES
// ============================================
function showErrors(errors) {
  const errorContainer = document.getElementById('error-messages')
  
  if (errors.length > 0) {
    errorContainer.innerHTML = errors.map(error => 
      `<div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded mb-2">
        <p class="text-sm">${error}</p>
      </div>`
    ).join('')
    errorContainer.classList.remove('hidden')
    
    // Scroll to errors
    errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' })
  } else {
    errorContainer.classList.add('hidden')
    errorContainer.innerHTML = ''
  }
}

// ============================================
// SHOW SUCCESS MESSAGE
// ============================================
function showSuccess(formData) {
  const successModal = document.getElementById('success-modal')
  const overlay = document.getElementById('modal-overlay')
  
  // Format date correctly in local timezone
  const [year, month, day] = formData.date.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  
  const formattedDate = date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  
  // Update success message
  document.getElementById('success-name').textContent = formData.name
  document.getElementById('success-date').textContent = formattedDate
  document.getElementById('success-time').textContent = formData.time
  
  // Formatação de pessoas (adultos + crianças)
  let guestsText = `${formData.adults} adulto${formData.adults > 1 ? 's' : ''}`
  if (formData.children > 0) {
    guestsText += ` e ${formData.children} criança${formData.children > 1 ? 's' : ''}`
  }
  document.getElementById('success-guests').textContent = guestsText
  
  // Show modal
  successModal.classList.remove('hidden')
  overlay.classList.remove('hidden')
  document.body.style.overflow = 'hidden'
}

// ============================================
// CLOSE SUCCESS MODAL
// ============================================
function closeSuccessModal() {
  const successModal = document.getElementById('success-modal')
  const overlay = document.getElementById('modal-overlay')
  
  successModal.classList.add('hidden')
  overlay.classList.add('hidden')
  document.body.style.overflow = 'auto'
}

// ============================================
// FORMAT PHONE INPUT
// ============================================
function formatPhone(input) {
  let value = input.value.replace(/\D/g, '')
  
  if (value.length <= 11) {
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2')
    value = value.replace(/(\d)(\d{4})$/, '$1-$2')
  }
  
  input.value = value
}

// ============================================
// SET MIN DATE TO TODAY
// ============================================
function setMinDate() {
  const dateInput = document.getElementById('date')
  const today = new Date().toISOString().split('T')[0]
  dateInput.setAttribute('min', today)
}

// ============================================
// SEND WHATSAPP MESSAGE
// ============================================
function sendWhatsAppNotification(formData) {
  // Parse date correctly in local timezone
  const [year, month, day] = formData.date.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  
  const formattedDate = date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
  
  // Formatação de pessoas
  let guestsText = `${formData.adults} adulto${formData.adults > 1 ? 's' : ''}`
  if (formData.children > 0) {
    guestsText += ` e ${formData.children} criança${formData.children > 1 ? 's' : ''}`
    
    // Adicionar idades das crianças
    const agesText = formData.childrenAges.map((age, idx) => `Criança ${idx + 1}: ${age} anos`).join(', ')
    guestsText += ` (${agesText})`
  }
  
  const message = `🍽 *NOVA RESERVA - Arte in Tavola*

👤 *Nome:* ${formData.name}
📞 *Telefone:* ${formData.phone}
📅 *Data:* ${formattedDate}
🕐 *Horário:* ${formData.time}
👥 *Pessoas:* ${guestsText}
${formData.notes ? `\n📝 *Observações:*\n${formData.notes}` : ''}

_Reserva realizada através do site_`

  const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`
  
  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank')
}

// ============================================
// HANDLE FORM SUBMISSION
// ============================================
function handleFormSubmit(e) {
  e.preventDefault()
  
  const form = e.target
  
  // Coletar idades das crianças
  const childrenCount = parseInt(form['children-count'].value) || 0
  const childrenAges = []
  
  for (let i = 0; i < childrenCount; i++) {
    const ageInput = form[`child-age-${i}`]
    if (ageInput) {
      childrenAges.push(parseInt(ageInput.value))
    }
  }
  
  const formData = {
    name: form.name.value,
    phone: form.phone.value,
    date: form.date.value,
    time: form.time.value,
    adults: parseInt(form.adults.value),
    children: childrenCount,
    childrenAges: childrenAges,
    notes: form.notes.value
  }
  
  // Validate form
  const errors = validateForm(formData)
  
  if (errors.length > 0) {
    showErrors(errors)
    return
  }
  
  // Clear errors
  showErrors([])
  
  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = 'Enviando...'
  submitBtn.disabled = true
  
  // Simulate processing
  setTimeout(() => {
    // Reset button
    submitBtn.textContent = originalText
    submitBtn.disabled = false
    
    // Show success modal
    showSuccess(formData)
    
    // Send WhatsApp notification
    setTimeout(() => {
      sendWhatsAppNotification(formData)
    }, 1000)
    
    // Reset form
    form.reset()
    handleChildrenCountChange() // Hide children ages
    
    // Log data (for debugging)
    console.log('📋 Reserva processada:', formData)
    
  }, 800)
}

// ============================================
// DISABLE MONDAYS IN DATE PICKER
// ============================================
function setupDatePicker() {
  const dateInput = document.getElementById('date')
  
  if (dateInput) {
    dateInput.addEventListener('input', (e) => {
      // Parse date in local timezone
      const [year, month, day] = e.target.value.split('-').map(Number)
      const selectedDate = new Date(year, month - 1, day)
      const dayOfWeek = selectedDate.getDay()
      
      // If Monday is selected, show warning
      if (dayOfWeek === 1) {
        showErrors(['⚠️ Restaurante fechado às segundas-feiras. Por favor, escolha outro dia.'])
        e.target.value = ''
      }
    })
  }
}

// ============================================
// INITIALIZE RESERVATIONS PAGE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize common functions
  initMobileMenu()
  initStickyNav()
  initSmoothScroll()
  
  // Set minimum date (allows today)
  setMinDate()
  
  // Populate time select with specific times
  populateTimeSelect()
  
  // Setup date picker
  setupDatePicker()
  
  // Phone formatting
  const phoneInput = document.getElementById('phone')
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => formatPhone(e.target))
  }
  
  // Children count change
  const childrenCountInput = document.getElementById('children-count')
  if (childrenCountInput) {
    childrenCountInput.addEventListener('change', handleChildrenCountChange)
  }
  
  // Form submission
  const reservationForm = document.getElementById('reservation-form')
  if (reservationForm) {
    reservationForm.addEventListener('submit', handleFormSubmit)
  }
  
  // Close modal button
  const closeModalBtn = document.getElementById('close-modal')
  const overlay = document.getElementById('modal-overlay')
  
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeSuccessModal)
  }
  
  if (overlay) {
    overlay.addEventListener('click', closeSuccessModal)
  }
  
  // Close modal on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSuccessModal()
    }
  })
  
  console.log('📅 Página de Reservas - Arte in Tavola')
  console.log(`🕐 Horários disponíveis: ${RESTAURANT_INFO.allowedTimes.join(', ')}`)
  console.log('🚫 Fechado às segundas-feiras')
})
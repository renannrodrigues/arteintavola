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
  openingTime: '19:00',
  closingTime: '22:00',
  minGuests: 1,
  maxGuests: 20
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
  
  // Validate time
  if (time) {
    const [hours, minutes] = time.split(':').map(Number)
    const selectedTime = hours * 60 + minutes
    
    const [openHour, openMin] = RESTAURANT_INFO.openingTime.split(':').map(Number)
    const [closeHour, closeMin] = RESTAURANT_INFO.closingTime.split(':').map(Number)
    
    const openTime = openHour * 60 + openMin
    const closeTime = closeHour * 60 + closeMin
    
    if (selectedTime < openTime || selectedTime > closeTime) {
      return {
        valid: false,
        message: `Horário de funcionamento: ${RESTAURANT_INFO.openingTime} às ${RESTAURANT_INFO.closingTime}`
      }
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
  
  // Validate date
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
  if (formData.guests < RESTAURANT_INFO.minGuests || formData.guests > RESTAURANT_INFO.maxGuests) {
    errors.push(`Número de pessoas deve ser entre ${RESTAURANT_INFO.minGuests} e ${RESTAURANT_INFO.maxGuests}`)
  }
  
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
  document.getElementById('success-guests').textContent = formData.guests
  
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
  
  const message = `🍝 *NOVA RESERVA - Arte in Tavola*

👤 *Nome:* ${formData.name}
📞 *Telefone:* ${formData.phone}
📅 *Data:* ${formattedDate}
🕐 *Horário:* ${formData.time}
👥 *Pessoas:* ${formData.guests}
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
  const formData = {
    name: form.name.value,
    phone: form.phone.value,
    date: form.date.value,
    time: form.time.value,
    guests: parseInt(form.guests.value),
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
// SETUP TIME PICKER WITH VALID HOURS
// ============================================
function setupTimePicker() {
  const timeInput = document.getElementById('time')
  
  if (timeInput) {
    // Set min and max time
    timeInput.setAttribute('min', RESTAURANT_INFO.openingTime)
    timeInput.setAttribute('max', RESTAURANT_INFO.closingTime)
    timeInput.setAttribute('step', '1800') // 30 minutes intervals
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
  
  // Set minimum date
  setMinDate()
  
  // Setup date picker
  setupDatePicker()
  
  // Setup time picker
  setupTimePicker()
  
  // Phone formatting
  const phoneInput = document.getElementById('phone')
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => formatPhone(e.target))
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
  console.log(`📍 Horário: ${RESTAURANT_INFO.openingTime} às ${RESTAURANT_INFO.closingTime}`)
  console.log('🚫 Fechado às segundas-feiras')
})
// Countdown Timer
function initCountdown() {
  // Set launch date to January 1, 2026
  const launchDate = new Date("2026-01-01T00:00:00").getTime()

  function updateCountdown() {
    const now = new Date().getTime()
    const distance = launchDate - now

    if (distance < 0) {
      // If launch date has passed
      document.getElementById("days").textContent = "00"
      document.getElementById("hours").textContent = "00"
      document.getElementById("minutes").textContent = "00"
      document.getElementById("seconds").textContent = "00"
      return
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    document.getElementById("days").textContent = days.toString().padStart(2, "0")
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0")
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0")
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0")
  }

  // Update countdown immediately and then every second
  updateCountdown()
  setInterval(updateCountdown, 1000)
}

// Email Form Handler
function initEmailForm() {
  const form = document.getElementById("emailForm")
  const emailInput = document.getElementById("email")
  const messageDiv = document.getElementById("formMessage")

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const email = emailInput.value.trim()

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email) {
      showMessage("Please enter your email address.", "error")
      return
    }

    if (!emailRegex.test(email)) {
      showMessage("Please enter a valid email address.", "error")
      return
    }

    // Simulate form submission
    const submitBtn = form.querySelector(".submit-btn")
    const originalText = submitBtn.querySelector(".btn-text").textContent

    submitBtn.querySelector(".btn-text").textContent = "Submitting..."
    submitBtn.disabled = true

    setTimeout(() => {
      showMessage(
        "🎉 Thank you! We'll notify you when Availlo launches. Get ready for the ultimate appointment booking experience!",
        "success",
      )
      emailInput.value = ""
      submitBtn.querySelector(".btn-text").textContent = originalText
      submitBtn.disabled = false

      // Add a subtle celebration effect
      createCelebrationEffect()
    }, 1500)
  })

  function showMessage(text, type) {
    messageDiv.textContent = text
    messageDiv.className = `form-message ${type}`

    setTimeout(() => {
      messageDiv.className = "form-message"
    }, 5000)
  }
}

// Smooth scroll animations on scroll
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running"
      }
    })
  }, observerOptions)

  // Observe all animated elements
  document.querySelectorAll(".slide-up, .fade-in").forEach((el) => {
    el.style.animationPlayState = "paused"
    observer.observe(el)
  })
}

// Parallax effect for floating shapes
function initParallaxEffect() {
  const shapes = document.querySelectorAll(".floating-shape")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5

    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.1
      shape.style.transform = `translateY(${rate * speed}px)`
    })
  })
}

// Add loading animation
function initLoadingAnimation() {
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")

    // Start animations with staggered delays
    const animatedElements = document.querySelectorAll(".fade-in, .slide-up")
    animatedElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.animationPlayState = "running"
      }, index * 200)
    })
  })
}

// Enhanced hover effects
function initHoverEffects() {
  // Add ripple effect to buttons
  const buttons = document.querySelectorAll(".submit-btn, .social-link")

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })
}

// Add CSS for ripple effect
function addRippleStyles() {
  const style = document.createElement("style")
  style.textContent = `
        .submit-btn, .social-link {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `
  document.head.appendChild(style)
}

// Add colorful floating particles
function initParticleEffect() {
  const colors = ["#4ecdc4", "#44a08d", "#2c5aa0", "#1a365d", "#0f2027", "#5dd3d3"]

  function createParticle() {
    const particle = document.createElement("div")
    particle.style.position = "fixed"
    particle.style.width = Math.random() * 6 + 2 + "px"
    particle.style.height = particle.style.width
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    particle.style.borderRadius = "50%"
    particle.style.pointerEvents = "none"
    particle.style.zIndex = "0"
    particle.style.left = Math.random() * window.innerWidth + "px"
    particle.style.top = window.innerHeight + "px"
    particle.style.opacity = Math.random() * 0.8 + 0.2
    particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px currentColor`

    document.body.appendChild(particle)

    const duration = Math.random() * 3000 + 2000
    const drift = (Math.random() - 0.5) * 100

    particle.animate(
      [
        { transform: `translateY(0px) translateX(0px)`, opacity: particle.style.opacity },
        { transform: `translateY(-${window.innerHeight + 100}px) translateX(${drift}px)`, opacity: 0 },
      ],
      {
        duration: duration,
        easing: "linear",
      },
    ).onfinish = () => particle.remove()
  }

  // Create particles periodically
  setInterval(createParticle, 300)
}

// Celebration effect for successful email submission
function createCelebrationEffect() {
  const colors = ["#4ecdc4", "#44a08d", "#2c5aa0", "#1a365d"]

  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div")
      confetti.style.position = "fixed"
      confetti.style.width = "8px"
      confetti.style.height = "8px"
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.borderRadius = "50%"
      confetti.style.pointerEvents = "none"
      confetti.style.zIndex = "1000"
      confetti.style.left = Math.random() * window.innerWidth + "px"
      confetti.style.top = "50%"
      confetti.style.opacity = "1"

      document.body.appendChild(confetti)

      const duration = Math.random() * 2000 + 1000
      const fallDistance = Math.random() * 300 + 200
      const drift = (Math.random() - 0.5) * 200

      confetti.animate(
        [
          { transform: `translateY(0px) translateX(0px) rotate(0deg)`, opacity: 1 },
          { transform: `translateY(${fallDistance}px) translateX(${drift}px) rotate(360deg)`, opacity: 0 },
        ],
        {
          duration: duration,
          easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        },
      ).onfinish = () => confetti.remove()
    }, i * 100)
  }
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initCountdown()
  initEmailForm()
  initScrollAnimations()
  initParallaxEffect()
  initLoadingAnimation()
  initHoverEffects()
  addRippleStyles()
  initParticleEffect() // Add this line
})

// Add smooth scrolling for any anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply throttling to scroll-based animations
const throttledParallax = throttle(initParallaxEffect, 16)
window.addEventListener("scroll", throttledParallax)

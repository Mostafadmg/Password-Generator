// =========================================
// RANGE SLIDER FUNCTIONALITY
// Handles dynamic fill color and value updates
// =========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // =========================================
  // SLIDER ELEMENTS
  // =========================================
  const slider = document.getElementById('slider');
  const sliderValueDisplay = document.querySelector('.character-length-text span');
  
  // =========================================
  // UPDATE SLIDER FILL COLOR
  // Creates a gradient showing filled vs unfilled
  // =========================================
  function updateSliderFill() {
    // Get current value and range
    const value = slider.value;
    const min = slider.min || 0;
    const max = slider.max || 100;
    
    // Calculate percentage filled
    const percentage = ((value - min) / (max - min)) * 100;
    
    // Create gradient: green (filled) to dark gray (unfilled)
    const gradient = `linear-gradient(
      to right,
      var(--green-200) 0%,
      var(--green-200) ${percentage}%,
      var(--grey-950) ${percentage}%,
      var(--grey-950) 100%
    )`;
    
    // Apply the gradient as background
    slider.style.background = gradient;
    
    // Update the display number
    if (sliderValueDisplay) {
      sliderValueDisplay.textContent = value;
    }
    
    // Optional: Update strength based on length
    updatePasswordStrength(value);
  }
  
  // =========================================
  // PASSWORD STRENGTH INDICATOR
  // Updates strength display based on length
  // =========================================
  function updatePasswordStrength(length) {
    const strengthText = document.querySelector('.strength-rating-text');
    const strengthBars = document.querySelectorAll('.strength-bar');
    
    if (!strengthText) return;
    
    let strength = '';
    let strengthLevel = 0;
    
    // Determine strength based on length
    if (length < 8) {
      strength = 'TOO WEAK!';
      strengthLevel = 1;
    } else if (length < 12) {
      strength = 'WEAK';
      strengthLevel = 2;
    } else if (length < 16) {
      strength = 'MEDIUM';
      strengthLevel = 3;
    } else {
      strength = 'STRONG';
      strengthLevel = 4;
    }
    
    // Update text
    strengthText.textContent = strength;
    
    // Update bars if they exist
    if (strengthBars.length > 0) {
      strengthBars.forEach((bar, index) => {
        // Reset all bars first
        bar.style.background = 'transparent';
        bar.style.border = '2px solid var(--grey-300)';
        
        // Fill bars based on strength level
        if (index < strengthLevel) {
          switch(strengthLevel) {
            case 1:
              bar.style.background = 'var(--red-500)';
              bar.style.border = '2px solid var(--red-500)';
              break;
            case 2:
              bar.style.background = 'var(--orange-400)';
              bar.style.border = '2px solid var(--orange-400)';
              break;
            case 3:
              bar.style.background = 'var(--yellow-300)';
              bar.style.border = '2px solid var(--yellow-300)';
              break;
            case 4:
              bar.style.background = 'var(--green-200)';
              bar.style.border = '2px solid var(--green-200)';
              break;
          }
        }
      });
    }
  }
  
  // =========================================
  // EVENT LISTENERS
  // =========================================
  
  // Update on slider input (while dragging)
  slider.addEventListener('input', function(e) {
    updateSliderFill();
    
    // Optional: Add haptic feedback sound (if you want)
    // playTickSound();
  });
  
  // Update on change (when released)
  slider.addEventListener('change', function(e) {
    console.log('Slider value changed to:', e.target.value);
  });
  
  // =========================================
  // KEYBOARD ACCESSIBILITY
  // =========================================
  slider.addEventListener('keydown', function(e) {
    let newValue = parseInt(slider.value);
    
    switch(e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        newValue = Math.max(parseInt(slider.min), newValue - 1);
        slider.value = newValue;
        updateSliderFill();
        break;
        
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        newValue = Math.min(parseInt(slider.max), newValue + 1);
        slider.value = newValue;
        updateSliderFill();
        break;
        
      case 'Home':
        e.pre
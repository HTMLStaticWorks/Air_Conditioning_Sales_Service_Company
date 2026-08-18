/**
 * booking.js
 * Multi-step booking logic and service estimator with unified footer.
 */

document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.getElementById('booking-form');
  const steps = document.querySelectorAll('.booking-step');
  
  const btnNext = document.getElementById('btn-next');
  const btnBack = document.getElementById('btn-back');
  const btnSubmit = document.getElementById('btn-submit');
  
  let currentStep = 0;

  function updateProgress(stepIndex) {
    // Update indicators
    for (let i = 1; i <= steps.length; i++) {
        const indicator = document.getElementById(`indicator-${i}`);
        if (indicator) {
            if (i - 1 < stepIndex) {
                indicator.classList.add('completed');
                indicator.classList.remove('active');
                indicator.innerHTML = '<i class="fa-solid fa-check"></i>';
            } else if (i - 1 === stepIndex) {
                indicator.classList.add('active');
                indicator.classList.remove('completed');
                indicator.innerHTML = i;
            } else {
                indicator.classList.remove('active', 'completed');
                indicator.innerHTML = i;
            }
        }
    }
  }

  function updateButtons(stepIndex) {
      if (!btnBack || !btnNext || !btnSubmit) return;

      // Back button visibility
      if (stepIndex === 0) {
          btnBack.style.visibility = 'hidden';
      } else {
          btnBack.style.visibility = 'visible';
      }

      // Next / Submit button toggle
      if (stepIndex === steps.length - 1) {
          btnNext.style.display = 'none';
          btnSubmit.style.display = 'inline-block';
      } else {
          btnNext.style.display = 'inline-block';
          btnSubmit.style.display = 'none';
      }
  }

  function validateStep(stepIndex) {
      const stepElement = steps[stepIndex];
      const inputs = stepElement.querySelectorAll('input[required], select[required], textarea[required]');
      let isValid = true;
      inputs.forEach(input => {
          if (!input.value.trim()) {
              input.classList.add('is-invalid');
              isValid = false;
          } else {
              input.classList.remove('is-invalid');
          }
      });
      return isValid;
  }

  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      step.classList.toggle('d-none', index !== stepIndex);
    });
    updateProgress(stepIndex);
    updateButtons(stepIndex);
  }

  if (steps.length > 0) {
    showStep(currentStep);

    // Clear validation errors on input
    if (bookingForm) {
        bookingForm.addEventListener('input', (e) => {
            if (e.target.classList.contains('is-invalid')) {
                e.target.classList.remove('is-invalid');
            }
        });
    }

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                if (currentStep < steps.length - 1) {
                    currentStep++;
                    showStep(currentStep);
                }
            }
        });
    }

    if (btnBack) {
        btnBack.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    }
  }

  // Handle form submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (!validateStep(currentStep)) return;

      // Simulate booking save
      localStorage.setItem('lastBooking', JSON.stringify({
        date: new Date().toISOString(),
        status: 'BOOKED'
      }));
      // Show success
      alert('Booking Confirmed! You can track your service in the dashboard.');
      window.location.href = 'dashboard.html';
    });
  }
});

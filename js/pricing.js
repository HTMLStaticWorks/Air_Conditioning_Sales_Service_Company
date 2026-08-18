/**
 * pricing.js
 * Logic for pricing estimator
 */

document.addEventListener('DOMContentLoaded', () => {
  const estimatorForm = document.getElementById('pricing-estimator');
  const estimatorResult = document.getElementById('estimator-result');

  if (estimatorForm && estimatorResult) {
    estimatorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const serviceType = document.getElementById('est-service').value;
      const acType = document.getElementById('est-actype').value;
      
      let basePrice = 50;
      
      if (serviceType === 'installation') basePrice += 150;
      if (serviceType === 'repair') basePrice += 80;
      
      if (acType === 'ducted' || acType === 'cassette') basePrice += 100;

      estimatorResult.innerHTML = `
        <div class="alert alert-success mt-4">
          <h4 class="alert-heading">Estimated Cost: $${basePrice} - $${basePrice + 100}</h4>
          <p class="mb-0 small">Indicative estimate — final price confirmed after inspection.</p>
        </div>
      `;
    });
  }
});

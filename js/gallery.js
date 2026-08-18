/**
 * gallery.js
 * Logic for gallery filtering and lightbox (simulated)
 */

document.addEventListener('DOMContentLoaded', () => {
  const galleryFilters = document.querySelectorAll('.gallery-filter');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (galleryFilters.length > 0 && galleryItems.length > 0) {
    galleryFilters.forEach(filter => {
      filter.addEventListener('click', () => {
        galleryFilters.forEach(f => f.classList.remove('active', 'btn-primary'));
        galleryFilters.forEach(f => f.classList.add('btn-outline'));
        
        filter.classList.remove('btn-outline');
        filter.classList.add('active', 'btn-primary');

        const filterValue = filter.getAttribute('data-filter');

        galleryItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
});

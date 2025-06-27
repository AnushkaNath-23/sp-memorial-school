/**
 * Gallery.js
 * This script fetches and displays school gallery images from the API
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get the gallery container element
  const galleryContainer = document.getElementById('gallery-container');
  
  if (!galleryContainer) return;
  
  // Show loading state
  galleryContainer.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>';
  
  // Fetch images from the API
  fetch('/api/gallery')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.success && data.images && data.images.length > 0) {
        // Clear loading indicator
        galleryContainer.innerHTML = '';
        
        // Create and append gallery items
        data.images.forEach(image => {
          // Determine category based on filename or use 'events' as default
          let category = 'events'; // Default category
          
          // Try to extract category from filename if it contains category indicators
          const lowerFilename = image.toLowerCase();
          if (lowerFilename.includes('classroom')) {
            category = 'classroom';
          } else if (lowerFilename.includes('activity') || lowerFilename.includes('activities')) {
            category = 'activities';
          } else if (lowerFilename.includes('sport') || lowerFilename.includes('sports')) {
            category = 'sports';
          }
          
          const galleryItem = createGalleryItem(image, category);
          galleryContainer.appendChild(galleryItem);
        });
        
        // Initialize isotope for filtering after all images are loaded
        initializeIsotope();
      } else {
        // No images found
        galleryContainer.innerHTML = `
          <div class="alert alert-info" role="alert">
            <i class="fas fa-info-circle"></i> No gallery images available at this time.
          </div>
        `;
      }
    })
    .catch(error => {
      console.error('Error fetching gallery images:', error);
      galleryContainer.innerHTML = `
        <div class="alert alert-danger" role="alert">
          <i class="fas fa-exclamation-triangle"></i> Unable to load gallery images. Please try again later.
        </div>
      `;
    });
});

/**
 * Creates a gallery item element from image data
 * @param {string} imageName - The image filename
 * @param {string} category - The category of the image
 * @returns {HTMLElement} - The gallery item element to be appended to the DOM
 */
function createGalleryItem(imageName, category) {
  const galleryItem = document.createElement('div');
  galleryItem.className = `col-lg-4 col-md-6 gallery-item ${category}`;
  
  galleryItem.innerHTML = `
    <div class="gallery-wrap">
      <img src="/uploads/gallery/${imageName}" class="img-fluid" alt="Gallery Image">
      <div class="gallery-info">
        <h4>${formatImageName(imageName)}</h4>
        <p>${capitalizeFirstLetter(category)}</p>
        <div class="gallery-links">
          <a href="/uploads/gallery/${imageName}" data-gallery="portfolioGallery" class="portfolio-lightbox" title="${formatImageName(imageName)}"><i class="fas fa-plus"></i></a>
        </div>
      </div>
    </div>
  `;
  
  return galleryItem;
}

/**
 * Formats the image name for display by removing extension and replacing hyphens with spaces
 * @param {string} filename - The image filename
 * @returns {string} - Formatted image name
 */
function formatImageName(filename) {
  // Remove file extension
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  
  // Remove timestamp/unique identifiers (assuming format like 'image-1234567890')
  const cleanName = nameWithoutExt.replace(/[-_]\d+.*$/, "");
  
  // Replace hyphens and underscores with spaces and capitalize words
  return cleanName.split(/[-_]/).map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

/**
 * Capitalizes the first letter of a string
 * @param {string} string - The input string
 * @returns {string} - String with first letter capitalized
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Initializes isotope for gallery filtering
 */
function initializeIsotope() {
  // Check if isotope is available
  if (typeof Isotope !== 'undefined') {
    // Initialize isotope
    const elem = document.querySelector('.gallery-container');
    const iso = new Isotope(elem, {
      itemSelector: '.gallery-item',
      layoutMode: 'fitRows'
    });
    
    // Filter items on button click
    const filterButtons = document.querySelectorAll('#gallery-flters li');
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('filter-active'));
        
        // Add active class to clicked button
        this.classList.add('filter-active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Filter items
        iso.arrange({ filter: filterValue });
      });
    });
  }
}
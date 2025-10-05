/**
 * Announcements.js
 * This script fetches and displays school notices from the API
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get the announcements container element
  const announcementsContainer = document.getElementById('announcements-container');
  
  if (!announcementsContainer) return;
  
  // Determine if we need to filter by category based on the current page
  let category = null;
  const currentPage = window.location.pathname;
  
  // Check if we're on the admission notice page
  if (currentPage.includes('admission-notice.html')) {
    category = 'admission';
  }
  
  // Show loading state
  announcementsContainer.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>';
  
  // Construct the API URL with category filter if needed
  const apiUrl = category ? `/api/notices?category=${category}` : '/api/notices';
  
  // Fetch notices from the API
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.success && data.notices && data.notices.length > 0) {
        // Clear loading indicator
        announcementsContainer.innerHTML = '';
        
        // Create and append notice elements
        data.notices.forEach(notice => {
          const noticeElement = createNoticeElement(notice);
          announcementsContainer.appendChild(noticeElement);
        });
      } else {
        // No notices found
        const message = category === 'admission' ? 
          `` : 
          'There is no announcement at this time.';
        
        announcementsContainer.innerHTML = `
          <div class="alert alert-info text-center" role="alert">
            <i class="fas fa-info-circle me-2"></i> ${message}
          </div>
        `;
      }
    })
    .catch(error => {
      console.error('Error fetching notices:', error);
      // Show "no announcements" message when API fails
      const message = category === 'admission' ? 
        `` : 
        'There is no announcement at this time.';
      
      if (message) {
        announcementsContainer.innerHTML = `
          <div class="alert alert-info text-center" role="alert">
            <i class="fas fa-info-circle me-2"></i> ${message}
          </div>
        `;
      } else {
        announcementsContainer.innerHTML = '';
      }
    });
});

/**
 * Creates a notice element from notice data
 * @param {Object} notice - The notice object from the API
 * @returns {HTMLElement} - The notice element to be appended to the DOM
 */
function createNoticeElement(notice) {
  const noticeDiv = document.createElement('div');
  noticeDiv.className = 'card mb-4 announcement-card';
  
  const date = new Date(notice.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  noticeDiv.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${notice.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${date}</h6>
      <p class="card-text">${notice.content}</p>
    </div>
  `;
  
  return noticeDiv;
}
/**
 * Mobile Announcement Toggle Functionality
 * This script adds a mobile-only announcement toggle to all pages of the website.
 * It dynamically creates the toggle button and announcement box if they don't exist.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Add mobile announcement toggle and box to the page if they don't exist
    const body = document.body;
    
    // Check if elements already exist
    if (!document.getElementById('mobileToggle')) {
        // Create mobile toggle button
        const mobileToggle = document.createElement('div');
        mobileToggle.className = 'mobile-toggle-announcement';
        mobileToggle.id = 'mobileToggle';
        mobileToggle.innerHTML = '<i class="fas fa-plus"></i>';
        
        // Create mobile announcement box
        const mobileAnnouncementBox = document.createElement('div');
        mobileAnnouncementBox.className = 'mobile-announcement-box';
        mobileAnnouncementBox.id = 'mobileAnnouncementBox';
        
        // Determine the correct path for the Apply Now link
        let applyPath = 'pages/apply-online.html';
        if (window.location.pathname.includes('/pages/')) {
            applyPath = '../pages/apply-online.html';
        }
        
        mobileAnnouncementBox.innerHTML = `
            <h5>New Academic Year 2025-26</h5>
            <p>Admissions open for all classes.</p>
            <a href="${applyPath}" class="btn-apply">Apply Now</a>
        `;
        
        // Find the hero section to append our elements
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            // If hero section exists, append to it (best placement)
            heroSection.appendChild(mobileToggle);
            heroSection.appendChild(mobileAnnouncementBox);
        } else {
            // Find the first section element to insert before
            const firstSection = document.querySelector('section');
            if (firstSection) {
                body.insertBefore(mobileToggle, firstSection);
                body.insertBefore(mobileAnnouncementBox, firstSection);
            } else {
                // If no section found, append to body
                body.appendChild(mobileToggle);
                body.appendChild(mobileAnnouncementBox);
            }
        }
    }
    
    // Add toggle functionality
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileAnnouncementBox = document.getElementById('mobileAnnouncementBox');
    
    if (mobileToggle && mobileAnnouncementBox) {
        // Ensure the announcement box is initially hidden
        mobileAnnouncementBox.style.display = 'none';
        mobileAnnouncementBox.classList.remove('active');
        
        // Toggle announcement box when toggle button is clicked
        mobileToggle.addEventListener('click', function() {
            mobileToggle.classList.toggle('active');
            mobileAnnouncementBox.classList.toggle('active');
            
            // If box is being closed, wait for animation to complete before hiding
            if (!mobileAnnouncementBox.classList.contains('active')) {
                // Immediately disable pointer events when closing
                mobileAnnouncementBox.style.pointerEvents = 'none';
                
                setTimeout(function() {
                    if (!mobileAnnouncementBox.classList.contains('active')) {
                        mobileAnnouncementBox.style.display = 'none';
                    }
                }, 300); // Match transition duration from CSS
            } else {
                // Show the box and enable pointer events
                mobileAnnouncementBox.style.display = 'block';
                mobileAnnouncementBox.style.pointerEvents = 'auto';
            }
        });
    }
});
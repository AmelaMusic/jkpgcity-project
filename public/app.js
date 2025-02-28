document.addEventListener('DOMContentLoaded', () => {
  const venuesList = document.getElementById('venues-list');

  // Fetch data from the API endpoint
  fetch('/api/venues')
      .then(response => response.json())
      .then(data => {

        venuesList.innerHTML = '';

          // Display each venue as a list item
          data.forEach(venue => {
              const venueItem = document.createElement('div');
              venueItem.className = 'venue-item';
              
              venueItem.innerHTML = `
                  <h2>${venue.name}</h2>
                  <p>District: ${venue.district ?? 'N/A'}</p>
                  <p><a href="https://${venue.url}" target="_blank">${venue.url}</a></p>
              `;

              venuesList.appendChild(venueItem);
          });
      })
      .catch(error => {
          console.error('Error fetching venues:', error);
          venuesList.innerHTML = '<p>Failed to load venues.</p>';
      });
});

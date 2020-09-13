import reddit from './redditapi.js';

const searchForm = document.getElementById('search-form');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', e => {
  // Get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  // Get limit
  const searchLimit = document.getElementById('limit').value;
  // Get search
  const searchTerm = searchInput.value;
  // Check for input
  if (searchTerm == '') {
    // Show message
    showMessage('Please enter search input', 'alert-danger');
  }
  // Clear field
  searchInput.value = '';

  // Search Reddit
  reddit.search(searchTerm, searchLimit, sortBy).then(results => {
    let output = '<div class="card-columns">';
    console.log(results);
    results.forEach(post => {
      // Check for image
      let image = post.preview
        ? post.preview.images[0].source.url
        : 'https://redditupvoted.files.wordpress.com/2019/10/dxfmwbkq.png';
      output += `
      <a href="${post.url}" target="_blank">
      <div class="card mb-1">
      <h6 class="card-header">${truncateString(post.title, 180)}</h6>
      <img class="card-img-top" src="${image}" alt="Reddit Card Image">
      <div class="card-body">
        <p class="card-text">${truncateString(post.selftext, 100)}</p>
      </div>
      <div class="card-footer">
        <span class="badge badge-dark">Subreddit: ${post.subreddit}</span><br>
        <span class="badge badge-pill badge-secondary">Upvotes: ${post.score}</span>
        <span class="badge badge-pill badge-secondary">Comments: ${post.num_comments}</span>
      </div>
    </div>
    </a>
      `;
    });
    output += '</div>';
    document.getElementById('results').innerHTML = output;
  });

  e.preventDefault();
});

// Show Message Function
function showMessage(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const searchContainer = document.getElementById('search-container');
  // Get form
  const search = document.getElementById('search');

  // Insert alert
  searchContainer.insertBefore(div, search);

}

// Truncate String Function
function truncateString(myString, limit) {
  const shortened = myString.indexOf(' ', limit);
  if (shortened == -1) return myString;
  return myString.substring(0, shortened);
}

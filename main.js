import reddit from './redditapi.js';

const searchForm = document.getElementById('search-form');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', e => {
  // get sort by:
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  // get results per page
  const searchLimit = document.getElementById('limit').value;
  // get search input
  const searchTerm = searchInput.value;
  // check for search input
  if (searchTerm == '') {
  // Show message
    showMessage('Please enter search input', 'alert-danger');
  }
  // clear search field after user press submit
  searchInput.value = '';

  // search reddit; pass following parameters to reddit API
  reddit.search(searchTerm, searchLimit, sortBy).then(results => {
    let output = '<div class="card-columns">';
    console.log(results);
    results.forEach(post => {
      // check if reddit post has image. if no image, display default image
      let image = post.preview
        ? post.preview.images[0].source.url
        : 'https://redditupvoted.files.wordpress.com/2019/10/dxfmwbkq.png';
      output += `
      <div class="card">
      <h5 class="card-header bg-white">
      <a class="text-dark" href="https://reddit.com${post.permalink}" target="_blank">${truncateString(post.title, 200)}</a></h5>
      <img class="card-img-top" src="${image}" alt="Reddit Card Image">
      <div class="card-body">
        <p class="card-text">${truncateString(post.selftext, 200)}
        <a href="${(post.url)}" target="_blank"><small>${shortUrl(post.url,32)}</small></a>
      </div>
      <div class="card-footer bg-white">
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

//Truncate URL Function
function shortUrl(url, l){
  var l = typeof(l) != "undefined" ? l : 50;
  var chunk_l = (l/2);
  var url = url.replace("http://","").replace("https://","");

  if(url.length <= l){ return url; }

  var start_chunk = shortString(url, chunk_l, false);
  var end_chunk = shortString(url, chunk_l, true);
  return start_chunk + ".." + end_chunk;
}
function shortString(s, l, reverse){
  var stop_chars = [' ','/', '&'];
  var acceptable_shortness = l * 0.80; // When to start looking for stop characters
  var reverse = typeof(reverse) != "undefined" ? reverse : false;
  var s = reverse ? s.split("").reverse().join("") : s;
  var short_s = "";

  for(var i=0; i < l-1; i++){
      short_s += s[i];
      if(i >= acceptable_shortness && stop_chars.indexOf(s[i]) >= 0){
          break;
      }
  }
  if(reverse){ return short_s.split("").reverse().join(""); }
  return short_s;
}
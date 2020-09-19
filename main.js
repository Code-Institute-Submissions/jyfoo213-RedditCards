// search reddit API function
function search(searchTerm, sortBy) {
  return fetch(
    `https://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=100`
  )
    .then(res => res.json())
    .then(data => {
      return data.data.children.map(data => data.data);
    })
    .catch(err => console.log(err));
}

// inputs from search input and button
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', e => {
  // get sort by:
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  // // get results per page
  // const searchLimit = document.getElementById('limit').value;
  // get search input
  const searchTerm = searchInput.value;
  // check for search input
  if (searchTerm == '') {
  // Error Message
    errorMessage('Please enter search input', 'alert-info');
  }  
  // // clear search field after user press submit
  // searchInput.value = '';

  // search reddit; pass following parameters to reddit API
  search(searchTerm, sortBy)
  .then(results => {
    let output = '<div class="card-columns">';
    console.log(results);
    results.forEach(post => {
      // check if reddit post has image. if no image, display default image
      let image = post.preview
        // ? post.media.reddit_video.fallback_url
        ? post.preview.images[0].source.url
        : 'https://redditupvoted.files.wordpress.com/2019/10/dxfmwbkq.png';
      output += `
      <div class="card">
      <h5 class="card-header bg-white" p-2>
      <a class="text-dark" href="https://reddit.com${post.permalink}" target="_blank">${truncateString(post.title, 200)}</a></h5>
      <img class="card-img-top" src="${image}" alt="Reddit media">
      <div class="card-body p-2">
        <div class="card-text">${truncateString(post.selftext, 200)}
        <a href="${(post.url)}" target="_blank"><small>${shortUrl(post.url,28)}</small></a>
        </div>
      </div>
      <div class="card-footer bg-white p-2">
      <span class="badge badge-dark">Subreddit: ${post.subreddit}</span><br>
        <a class="badge badge-pill badge-secondary" href="https://reddit.com${post.permalink}" target="_blank">Upvotes: ${post.score}</a>
        <a class="badge badge-pill badge-secondary" href="https://reddit.com${post.permalink}" target="_blank">Comments: ${post.num_comments}</a>
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

// Error Message Function
function errorMessage(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const searchForm= document.getElementById('search-form');
  // Get recommendations
  const recommendations = document.getElementById('recommendations');

  // Insert alert into parent element, before recommendations
  searchForm.insertBefore(div, recommendations);
}

// Hide Error Message On Any Click
document.addEventListener('click',function(){
  $('.alert').hide();
})

//Auto-fill form and trigger search with popular recommendation
$('.recc').on('click',function(){
  $('input[name="search"]').val($(this).text());
})

// Trigger search when radio buttons are clicked
$('input[name=sortby]').click(function(){
  document.getElementById("btn").click();
});

// Truncate String Function 
function truncateString(myString, limit) {
  const shortened = myString.indexOf(' ', limit);
  if (shortened == -1) return myString;
  return myString.substring(0, shortened);
}

//Truncate URL Function https://stackoverflow.com/questions/1301512/truncate-a-string-straight-javascript
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
// search reddit API function with reference from TraversyMedia
function search(searchTerm, sortBy) {
  return fetch(
    `https://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=100`
  )
    .then((res) => res.json())
    .then((data) => {
      return data.data.children.map((data) => data.data);
    })
    .catch((err) => console.log(err));
}

// retrieve inputs from search field and button
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", (e) => {
  // get sort by
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  // get search input
  const searchTerm = searchInput.value;
  // check if search input is blank
  if (searchTerm == "") {
    // trigger error message
    errorMessage("Please enter search input", "alert-info");
  }

  // excute search; pass following parameters to reddit API
  search(searchTerm, sortBy).then((results) => {
    let output = '<div class="card-columns">';
    // console.log(results);
    results.forEach((post) => {
      // check if reddit post has image. if no image, display default image
      let image = post.preview
        ? // ? post.media.reddit_video.fallback_url
          post.preview.images[0].source.url
        : "assets/images/reddit_placeholder_image.png";
      output += `
      <div class="card">
      <h5 class="card-header bg-white" p-2>
      <a class="text-dark" href="https://reddit.com${
        post.permalink
      }" target="_blank">${truncateString(post.title, 180)}</a></h5>
      <img class="card-img-top" src="${image}" alt="Reddit Media">
      <div class="card-body p-2">
        <div class="card-text">${truncateString(post.selftext, 140)}
        <a href="${post.url}" target="_blank"><small>Link: ${shortUrl(
        post.url,
        26
      )}</small></a>
        </div>
      </div>
      <div class="card-footer bg-white p-2">
      <span class="badge badge-dark">Subreddit: ${post.subreddit}</span><br>
        <a class="badge badge-pill badge-secondary" href="https://reddit.com${
          post.permalink
        }" target="_blank">Upvotes: ${post.score}</a>
        <a class="badge badge-pill badge-secondary" href="https://reddit.com${
          post.permalink
        }" target="_blank">Comments: ${post.num_comments}</a>
      </div>
    </div>
    </a>
      `;
    });
    output += "</div>";
    document.getElementById("results").innerHTML = output;
  });
  e.preventDefault();
});

// error message function
function errorMessage(message, className) {
  // create div
  const div = document.createElement("div");
  // add classes
  div.className = `alert ${className}`;
  // add text
  div.appendChild(document.createTextNode(message));
  // get parent
  const searchForm = document.getElementById("search-form");
  // get recommendations
  const recommendations = document.getElementById("recommendations");
  // insert alert into parent element, before recommendations
  searchForm.insertBefore(div, recommendations);
}

// hide error message on any click
document.addEventListener("click", function () {
  $(".alert").hide();
});

//auto-fill form and trigger search with popular recommendation
$(".recc").on("click", function () {
  $('input[name="search"]').val($(this).text());
  document.getElementById("btn").click();
});

//trigger search when radio buttons are clicked
$("input[name=sortby]").click(function () {
  document.getElementById("btn").click();
});

//truncate string function
function truncateString(myString, limit) {
  const shortened = myString.indexOf(" ", limit);
  if (shortened == -1) return myString;
  return myString.substring(0, shortened);
}

//truncate url function
function shortUrl(url, l) {
  var l = typeof l != "undefined" ? l : 50;
  var chunk_l = l / 2;
  var url = url.replace("http://", "").replace("https://", "");

  if (url.length <= l) {
    return url;
  }

  var start_chunk = shortString(url, chunk_l, false);
  var end_chunk = shortString(url, chunk_l, true);
  return start_chunk + ".." + end_chunk;
}
function shortString(s, l, reverse) {
  var stop_chars = [" ", "/", "&"];
  var acceptable_shortness = l * 0.8; // When to start looking for stop characters
  var reverse = typeof reverse != "undefined" ? reverse : false;
  var s = reverse ? s.split("").reverse().join("") : s;
  var short_s = "";

  for (var i = 0; i < l - 1; i++) {
    short_s += s[i];
    if (i >= acceptable_shortness && stop_chars.indexOf(s[i]) >= 0) {
      break;
    }
  }
  if (reverse) {
    return short_s.split("").reverse().join("");
  }
  return short_s;
}

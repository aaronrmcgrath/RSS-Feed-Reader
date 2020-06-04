// CLIENT app

'use strict'

$(document).ready(function(){

  loadFeedsForPage();
});

function loadFeedsForPage() {
  $.ajax({
    type: 'GET',
    url: '/feeds',
    success: function(data){
      console.log(data);
      document.getElementById("feed").innerHTML = display(data);
    }
  });
}

function display(data) {
  var html = ``;
  data.forEach((feed, i) => {
    console.log(feed);
    html += `
      <div>
        <img src="${feed.link}/image/large.png" alt="">
        <h2>
          <a href="${feed.link}" target="_blank" rel="noopener">
            ${feed.title}
          </a>
        </h2>
      </div>`;
    feed.entries.forEach((entry, j) => {
      html += getArticle(entry)
    });
    html = `
    <div>
      ${html}
    </div>
    `;
  });
  document.body.insertAdjacentHTML("beforeend", html);
}

function getArticle(entry) {
  var div = `<article>
    <h3>
      <a href="${entry.link}" target="_blank" rel="noopener">
        ${entry.title}
      </a>
    </h3>
    <p>${entry.author}</p>
    <p>${entry.publishedDate}</p>
    <span/>
    <p>${entry.content}</p>
  </article>
  <span/>`;
  return div;
}

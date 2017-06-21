let searchInput = document.querySelector("#search_query");
let searchForm = document.querySelector(".search-form");
let results = document.querySelector(".results");
let searchSubmitButton = document.querySelector("#submit");
let header = document.querySelector("header");
let searchContainer = document.querySelector(".search");
let footer = document.querySelector("footer");
// SEARCH BY TRACK FROM USERNAME //
searchForm.addEventListener('submit', searchMusic);

function searchMusic (e) {
  'use strict';
  e.preventDefault();

  header.style.display='none';
  searchContainer.style.transition='5s';

  let searchQuery = searchInput.value;
  fetch(`http://api.soundcloud.com/tracks/?q=${searchQuery}&client_id=8538a1744a7fdaa59981232897501e04`)
    .then(

      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;

        } else {
            response.json().then(function(data) {
              results.innerHTML = "";
              for (let i = 0; i < data.length; i++) {
                let artwork = data[i].artwork_url;
                let title = data[i].title;
                let url = data[i].permalink_url;
                let likes = data[i].likes_count;
                let artist = data[i].user.username;
                let audioFile = data[i].stream_url;

                let markup = `
                      <div class="track">
                        <div class="image-container">
                          <button id="playButton${i}" class="play" style="background-image: url(${artwork})">&#9654;</button>
                        </div>
                        <div class="song_info">
                          <h3>${artist}</h3>
                          <p class="title">${title}</p>
                          <div class="second_row">
                            <p class="likes">Likes: ${likes}</p>
                          </div>
                        </div>
                        <section class="player">
                          <audio id="audioFile${i}" class="music-player" controls="controls" src="${audioFile}/?client_id=8538a1744a7fdaa59981232897501e04"></audio>
                        </section>
                      </div>
                  `
                results.innerHTML += markup;

             }

             for (let j = 0; j < data.length; j++) {
               let audioButton = document.querySelector(`#playButton${j}`);
               console.log(audioButton);
               let audioPlayer = document.querySelector(`#audioFile${j}`);
               audioButton.addEventListener('click', function(ev) {
                 audioPlayer.play();
               }); //End event listener
             } //End second for loop
           }) // End response json
        } // end
      } // end function response
    ) // end then
} //end search  function

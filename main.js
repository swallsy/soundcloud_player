const searchInput = document.querySelector("#search_query");
const searchForm = document.querySelector(".search-form");
const results = document.querySelector(".results");
const searchSubmitButton = document.querySelector("#submit");
const header = document.querySelector("header");
const searchContainer = document.querySelector(".search");
const footer = document.querySelector("footer");
let playing;

// SEARCH BY TRACK FROM USERNAME //
searchForm.addEventListener('submit', searchMusic);

function searchMusic(e) {
  'use strict';

  e.preventDefault();

  header.classList.add('collapsed');
  footer.classList.add('collapsed');

  setTimeout(function() {
    let searchQuery = searchInput.value;

    fetch(`https://api.soundcloud.com/tracks/?q=${searchQuery}&client_id=8538a1744a7fdaa59981232897501e04`)
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
                let user = data[i].user.username;
                let audioFile = data[i].stream_url;
                let soundcloudLink = data[i].permalink_url;

                let markup = `
                      <div class="track">
                        <div class="image-container">
                          <button id="playButton${i}" class="play" style="background-image: url(${artwork})">&#9654;</button>
                        </div>
                          <a href="${soundcloudLink}" class="song_info" target="_blank">
                            <p class="user">${user}</p>
                            <h3 class="title">${title}</h3>
                            <div class="second_row">
                              <p class="likes">${likes} likes</p>
                            </div>
                          </a>
                        <section class="player">
                          <audio id="audioFile${i}" class="music-player" controls="controls" src="${audioFile}/?client_id=8538a1744a7fdaa59981232897501e04"></audio>
                        </section>
                      </div>
                  `
                results.innerHTML += markup;

              }

              for (let j = 0; j < data.length; j++) {

                let audioButton = document.querySelector(`#playButton${j}`);
                let audioPlayer = document.querySelector(`#audioFile${j}`);

                function updateButton() {
                  let icon = this.paused ? "►" : "❚ ❚";
                  audioButton.textContent = icon;
                }

                function playPauseAudio() {
                  if (audioPlayer.paused) {
                    if (playing) {
                      playing.pause();
                    }
                    audioPlayer.play();
                    playing = audioPlayer;
                  } else {
                    audioPlayer.pause();
                    playing = false;
                  }
                }

                audioPlayer.addEventListener('play', updateButton);
                audioPlayer.addEventListener('pause', updateButton);
                audioButton.addEventListener('click', playPauseAudio);


              } //End second for loop
            }) // End response json
          } // end
        } // end function response
      ) // end then
  }, 300);
} //end search  function

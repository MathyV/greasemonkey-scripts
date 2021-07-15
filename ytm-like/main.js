// ==UserScript==
// @name        Youtube Music "Like all in playlist"
// @description This script adds a like button at the top of the playlist which allows you to like all songs in the playlist
// @version     1
// @grant       none
// @namespace   https://github.com/MathyV/greasemonkey-scripts
// @include     https://music.youtube.com/*
// ==/UserScript==

function log(text) {
  // Uncomment if you want some debug logging in console log
  // console.log(text);
}

log("Watching for URL changes");

var lastPathname = "";
var lastSearch = "";

var watchURL = setInterval(function () {
  if (lastPathname !== location.pathname || lastSearch !== location.search) {
    lastPathname = location.pathname;
    lastSearch = location.search;

    log("URL Changed");

    if (lastPathname === "/playlist" && lastSearch !== "?list=LM") {
      addLikeButton()
    }
  }
}, 200);

function addLikeButton() {
  log("Adding like all button");

  var waitOnButtons = setInterval(function() {
    log("Looking for buttons");
    buttons = document.getElementById("top-level-buttons");

    if(buttons) {
      log("Found buttons");

      // Style a button
      likeButton = document.createElement("a");
      likeButton.style.border = "1px solid #FFFFFF";
      likeButton.style.marginLeft = "15px";
      likeButton.style.display = "flex";
      likeButton.style.alignItems = "center";
      likeButton.style.justifyContent = "center";
      likeButton.style.cursor = "pointer";

      likeText = document.createElement("span");
      likeText.innerHTML = "LIKE ALL SONGS";
      likeText.style.fontSize = "14px";
      likeText.style.margin = "0px 10px";

      likeButton.append(likeText);

      // Make the button do something
      likeButton.addEventListener("click",
        function (event) {
          log("Clicked");

          event.preventDefault();

          if (!confirm('Are you sure you want to like all these songs? (This might take a while and slow down your browser!)')) {
            return;
          }

          Array.from(document.getElementsByClassName("like")).forEach(
            function(element, index, array) {
              setTimeout(function() {
                if (element.getAttribute("aria-pressed") !== "true") {
                  // Only click songs that aren't liked yet
                  element.click();
                }
              }, 10);
            }
          );
        },
      false);

      buttons.append(likeButton);
      clearInterval(waitOnButtons);
    }
  }, 100);
}

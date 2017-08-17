// <--- Get quotes using mashape api
$.ajax({
  type: 'GET',
  url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1',
  headers: {  "X-Mashape-Key": "SLfUMIHaM2mshTPCSwMUCGUKPHs2p1DHW1qjsnFe4vDZl2k59m",
              Accept: "application/json"  }
}).done(function(response) {
  let quote = response.quote;
  $('span.remain').text(quote);
  setGivenText(quote);

  let name = response.author;
  $('span.quote-author').text(name)
  setAuthor(name);
})
// --->

// <--- Get high scores from Rails HighScores API
$.ajax({
  url: 'http://localhost:3000/high_scores/',
}).done(function(response) {
  populateScoreBoard(response);
})

function populateScoreBoard(response) {
  response.forEach(function(record) {
    $(".high-scores").append(`
      <p><span>${record.name}: WPM: ${record.wpm} Accuracy: ${record.accuracy}%</span></p>
    `);
  })
}
// --->

// <--- Get/Send High Scores to/from Rails HighScores API
function createScore(wpm, accuracy, name) {
  $.ajax({
    url: 'http://localhost:3000/high_scores/',
    method: 'POST',
    data: {
      high_score: {
        wpm: wpm,
        accuracy: accuracy,
        name: name
      }
    }
  }).done(function(response) {
    console.log("Score submitted successfully!");
  })
}

$("#score-form").on("submit", function(event) {
  event.preventDefault();
  let wpm, accuracy, name;
  [wpm, accuracy, name] = $(this).serializeArray().map( (obj) => obj.value );
  createScore(wpm, accuracy, name);
}) // --->

// <--- Get values from API
var givenText;
function setGivenText(quote) {
  givenText = quote;
  return givenText;
}

var authorName;
function setAuthor(author) {
  authorName = author;
}
// --->

// <--- Score and credits buttons
$('#credits-button').click(function() {
  $('.credits').toggle();
  $('.score-board').css('display', 'none');
})

$('#scores-button').click(function() {
  $('.score-board').toggle();
  $('.credits').css('display', 'none');
})
// --->


gameFuncs(); // allow access to game clock functions
function gameFuncs() {
  let counter, gameClock;
  function startGameTime() {
    counter = 60;
    gameClock = setInterval(function() {
      counter--;
      if (counter >= 0) {
        $('#time-counter').html(counter);
      }
      if (counter === 0) {
        // trigger time's up event
        clearInterval(counter);
      }
    }, 1000);
  }
  function stopGameTime() {
    clearInterval(gameClock);
  }
  function calculateWPM() {
    wpm = (givenText.length / 5) / ((60 - counter) / 60)
    wpm = Math.round(wpm * 100) / 100 // up to two decimal places
    setWPM(wpm);
  }
  function calculateAccuracy() {
    acc = (givenText.length / allTyped.length) * 100;
    acc = Math.round(acc * 100) / 100 // up to two decimal places
    setAcc(acc);
  }
  gameFuncs.startGameTime = startGameTime;
  gameFuncs.stopGameTime = stopGameTime;
  gameFuncs.calculateWPM = calculateWPM;
  gameFuncs.calculateAccuracy = calculateAccuracy;
}

// <--- set wpm from gameFunc
var gameWPM;
function setWPM(wpm) {
  gameWPM = wpm;
  $('span.wpm').replaceWith(`<span class="wpm">${wpm}</span>`);
  $('input.wpm').attr('value', wpm);
} // --->

// <--- set acc from gameFunc
var gameAcc;
function setAcc(acc) {
  gameAcc = acc;
  $('span.acc').replaceWith(`<span class="acc">${acc}</span>`);
  $('input.acc').attr('value', acc);
} // --->

// <--- Countdown
const modal = $('.modal');
$('#play-button').click(function() {
  $('#landing-title').fadeOut(500, function() {
    newCountDown();
  });
})

function newCountDown() {
  let counter = 2;
  var countDownLoop = function() {
    console.log(counter);
    $('#landing-title').text(counter)

    if (counter >= 0) {
      $('#landing-title').fadeIn(500, function() {
        $('#landing-title').fadeOut(500);
      });
    }
    if (counter === 0) {
      $('#landing-title').text('GO!');
      clearInterval(countDownTimer);
    };
    counter--;
  }
  var countDownTimer = setInterval(countDownLoop, 1000);
  countDownLoop();
  countDownTimer
}

function countDown() {
  let counter = 5;
  var countDownLoop = function() {
    if (counter >= 0) {
      $('#countdown').html(counter);
    }
    if (counter === 2) {
      $('.modal-header').css('background-color', 'yellow');
    }
    if (counter === 0) {
      $('.modal-header').css('background-color', '#27e833');
      $('#countdown').html("GO!");
      setTimeout(function() {
        modal.css('display', 'none')
        clearInterval(counter);
        $('.main-jumbotron').css('display', 'none');
        $('.challenge-jumbotron').css('display', 'block');
        $('#challenge-input').focus();
        gameFuncs.startGameTime();
      }, 500);
    }
    counter--;
  }
  countDownLoop();
  setInterval(countDownLoop, 1000);
}
// --->

// <--- Shake function
$.fn.shake = function() {
  this.each(function(i) {
      $(this).css({ "position": "relative" });
      for (var x = 1; x <= 3; x++) {
        $(this).animate({ left: -1 }, 1).animate({ left: 0 }, 1).animate({ left: 1 }, 1).animate({ left: 0 }, 1);
      }
  });
  return this;
}
// --->

// after win animation
function winAnimate() {
  $('.animation-container').css({width: `${$(document).width()}`,
                                overflow: 'visible'});
  $('.animation-container img').attr('src', 'img/plane-flame.png');
  $('.paper-plane').animate({
    left: `-${$(document).width()}`
  }, 5000)}


// <--- catch all typed and compare to given text to calculate accuracy
var allTyped = "";

$('input#challenge-input').keypress(function (e) {
  if (e.which !== 0 && !e.ctrlKey && !e.metaKey && !e.altKey) {
    allTyped += String.fromCharCode(e.which)
  }
});
// --->

// <--- User input logic
$('input#challenge-input').on('input', function() {
  // progress bar
  const stringLength = givenText.length;
  let typedText = $('input').val();
  var typedLength = $('input').val().length;
  let percentComplete = (typedLength / stringLength) * 100;
  let remainStr = givenText.slice(typedLength, givenText.length)

  // plane animation
  var planeObj = $('.paper-plane');
  function moveRight() {
    planeObj.css('left', `${percentComplete + '%'}`);
  }

  // word highlighting logic
  if (typedText === givenText.slice(0, typedLength)) {
    $('img').attr({src: 'img/paper-plane.png', class: 'paper-plane'});
    moveRight();
    let correctStr = givenText.slice(0, typedLength);
    $('span.correct').replaceWith(`<span class='correct'>${correctStr}</span>`);
    $('span.incorrect').replaceWith(`<span class='incorrect'></span>`);
    $('span.remain').replaceWith(`<span class='remain'>${remainStr}</span>`);
  } else if (typedText[0] !== givenText[0]) { // bad start, i.e. 0 characters matched
    $('img').attr({src: 'img/crumpled.png', class: 'crumpled'});
    $('.type-challenge').shake();
    $('span.incorrect').replaceWith(`<span class='incorrect'>${givenText.slice(0, typedLength)}</span>`);
    $('span.remain').replaceWith(`<span class='remain'>${remainStr}</span>`);
  } else {
    $('img').attr({src: 'img/crumpled.png', class: 'crumpled'});
    $('.type-challenge').shake();
    let startWrong = $('span.correct').text().length;
    $('span.incorrect').replaceWith(`<span class='incorrect'>${givenText.slice(startWrong, typedLength)}</span>`);
    $('span.remain').replaceWith(`<span class='remain'>${givenText.slice(typedLength, givenText.length)}</span>`);
  }

  // win message
  if ($('input').val() === givenText) {
    gameFuncs.stopGameTime();
    gameFuncs.calculateWPM();
    gameFuncs.calculateAccuracy();
    setTimeout(winAnimate(), 500);
    $('.game-play').css('display', 'none');
    $('.after-win').css('display', 'block');
    // $('.win-modal').css('display', 'block');
    // setTimeout(function() { location.reload(); }, 5000); // Wait, then reload page
  }
});
// --->

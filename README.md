![](http://s3.amazonaws.com/thomasleeio/projects/screenshots/000/000/004/medium/typeracerx-logo-posterized.png?1514498205)

#### Based on the classic [typeracer](http://play.typeracer.com/) game. Renders random famous quotes and calculates words-per-minute and accuracy as you type. Test your typing skills and see if you can top the scoreboard.

**[Play it!](http://typeracerx.surge.sh/)**

Created: August 2017

## Features
- Click ► to start the count down.
- Type the generated quote. Don't mess up!
- The animated paper plane will crumble and you'll receive feedback (red text, shaking animation) when you mistype a character.
- A score is calculated from your words-per-minute and accuracy.
- Integrated with [Ruby on Rails API backend](https://github.com/thomasjlee/typeracerx-api) for posting and receiving scores.
- Uses AJAX to request random famous quotes from Tadas Talaikis's [Random Quotes API](https://talaikis.com/random_quotes_api/).
- Javascript and jQuery handle all the frontend logic and animation.
- Deployed on [Surge](http://surge.sh/).

## Why did I build this?
TypeRacerX was built after a two-week introduction to Javascript, jQuery, AJAX, and using Rails in API mode. At the time it felt like grasping at straws but the mantra for the week was *if it works, it works!* After finally pulling it together, I was happy to have made a game that people could actually use (I swear those scores aren't hard-coded).

That being said, it looks to me now like spaghetti code. **Surely it's a miracle it works at all.**

## What I would improve
This project is no longer in development, but I think it serves as a snapshot of what I knew then, and a way to gauge how much I've improved since. If I were to continue building it, I would:

- Add tests.
- Is it secure? I honestly am not sure...
- There's a funny bug: if you play it on your smartphone, you'll get infinity % accuracy due to keyboard predictions and autocorrect. Your score will be 0 but you'll end up at the top of the scoreboard anyway.
- Reduce the code's spaghetti-ness. Simplify the logic.
- Modularize the code by breaking it up into separate files.
- Learn and implement a framework like Angular or Backbone.

## Author
I am a developer, coffee-lover, career-changer, and former classical pianist. Visit [thomaslee.io](http://www.thomaslee.io) to see what I'm up to.

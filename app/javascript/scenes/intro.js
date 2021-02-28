import { game } from "../channels/game"
import Typed from 'typed.js';

var text
var skip
var then = 0
var wordIndex = 0;
var letterIndex = 0;
var lineIndex = 0;
var line = "";
var run = true


class Intro extends Phaser.Scene {

  constructor ()
  {
      super('Intro');
  }

create ()
{
    
    var graphics = this.add.graphics();

    graphics.fillStyle(0xFFFFFF);
    graphics.fillRect(50, 50, innerWidth - 100, 200);
    var content = [ "You wake up.", "Alone, confused, naked", "You feel like something is wrong", "For some reason...", "Something tells you...", "You need to find the sabers."]

    text = this.add.text(60, 300, "", {color: '#FFFFFF', font: "32px", wordWrap: {width: innerWidth - 120, height: 200 }})
    skip = this.add.text(innerWidth - 250, innerHeight - 50, "Press Enter to skip...", {color: '#FFFFFF', font: "16px"})

  
    // nextLine();

    this.input.keyboard.on('keydown', (event)  => {

      if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER)
      {
          this.scene.stop();
          this.scene.start('Play');
      }

    })

    // function nextLine() {
    //   if (lineIndex === content.length)
    //   {
    //       //  We're finished
    //       return;
    //   }
    
    //   //  Split the current line on spaces, so one word per array element
    //   line = content[lineIndex].split(' ');
    
    //   //  Reset the word index to zero (the first word in the line)
    //   wordIndex = 0;
    
    //   //  Call the 'nextWord' function once for each word in the line (line.length)
    //   t.events.repeat(wordDelay, line.length, nextWord, this);
    //   // line.forEach((w)=>{
    //   //   // setTimeout(wordDelay/1000);
    //   //   nextWord();
    //   // })
    
    //   //  Advance to the next line
    //   lineIndex++;
    
    // }

    // function nextWord() {

    //   //  Add the next word onto the text string, followed by a space
    //   text.text = text.text.concat(line[wordIndex] + " ");
    
    //   //  Advance the word index to the next word in the line
    //   wordIndex++;
    
    //   //  Last word?
    //   if (wordIndex === line.length)
    //   {
    //       //  Add a carriage return
    //       text.text = text.text.concat("\n");
    //       // setTimeout(lineDelay/1000)
    //       //  Get the next line after the lineDelay amount of ms has elapsed
    //       t.events.add(lineDelay, nextLine, this);
    //   }
    
    // }
  };
  update ()
  {
    if (run) {
      var t = this
      var content = [ "You wake up.", "Alone, confused, naked...", "You feel like something is wrong.", "For some reason...", "Something tells you...", "You need to find the sabers."]
      var word = content[lineIndex].split(" ")
      var letter = content[lineIndex].split("")
      var letterDelay = 30;
      if (letter.length == letterIndex) { letterDelay = 2000 }
      var now = t.time.now
      console.log(now)
      if (lineIndex < content.length) {
        if ((now - then) > letterDelay) {
            if (letterIndex == letter.length) {lineIndex++, letterIndex = 0, line = ""}
            if (lineIndex == content.length) {run = false; return ;}
            if (run) { letter = content[lineIndex].split("") }
            line = line.concat(letter[letterIndex])
            text.setText(line),
            letterIndex++
            then = now
          }
      }
    } else {
      skip.setText("Press Enter").setAlign('right')
    }
    }

}

export { Intro }

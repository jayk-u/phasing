import { game } from "../channels/game"
import Typed from 'typed.js';

var text


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
    var content = [ "Obi-Wan: You were the Chosen One! It was said that you would destroy the Sith, not join them. bring balance to the force, not leave it in darkness.",
    "Darth Vader: I hate you!",
    "Obi-Wan: You were my brother, Anakin! I loved you."]

    text = this.add.text(60, 300, content, {color: '#FFFFFF', font: "32px", wordWrap: {width: innerWidth - 120, height: 200 }})

  
    // nextLine();

    this.input.keyboard.on('keydown', (event)  => {

      if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER)
      {
          this.scene.stop();
          console.log(event)
          // this.scene.start('Game');
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
  // update ()
  // {
  //   var t = this
  //   var line = [];

  //   var wordIndex = 0;
  //   var lineIndex = 0;
    
  //   var wordDelay = 120;
  //   var lineDelay = 400;
  //   var content = [ "Obi-Wan: You were the Chosen One! It was said that you would destroy the Sith, not join them. bring balance to the force, not leave it in darkness.",
  //   "Darth Vader: I hate you!",
  //   "Obi-Wan: You were my brother, Anakin! I loved you."]
  //   var now = 0
  //   var then = 0
  //   now ++
  //   console.log(now)
  //   if (lineIndex < content.length) {
  //     if ((now) > 1000) {
  //         if (wordIndex == content[lineIndex].split(" ").length) {lineIndex++, wordIndex = 0, line = ""}
  //         if (lineIndex == content.length) {return ;}
  //         line = line.concat(content[lineIndex].split(" ")[wordIndex] + " ")
  //         text.setText(line),
  //         wordIndex++
  //         console.log(now - then)
  //         then = now
  //         now = 0
  //       }
  //   }
  //   }

}

export { Intro }

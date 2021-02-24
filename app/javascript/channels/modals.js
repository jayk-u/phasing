// // Get the modal
// var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

//This is how I refactor every display
const everymodal = document.querySelectorAll(".modal");

const modalToDisplay = (modal, btn, span) => {
  everymodal.forEach(m => {
    btn.onclick = () => {
      m.style.display = "none";
      modal.style.display = "block";
    }
    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    span.onclick = () => {
      modal.style.display = "none";
    }
    document.addEventListener("keyup", (e) => {
      if (e.key == "Escape") { modal.style.display = "none" }
    })
  })
}

//Options & Controls

import { defineControls } from '../channels/controls'

const optionsmodal = document.getElementById("optionsModal");

const optionsbtn = document.getElementById("optionsBtn");

const controlsmodal = document.getElementById("controlsModal");

const controlsbtn = document.getElementById("controlsBtn");

const span = document.getElementsByClassName("close");

modalToDisplay(optionsmodal, optionsbtn, span[0]);
modalToDisplay(controlsmodal, controlsbtn, span[1]);


//Without refacto
// optionsbtn.onclick = function() {
//   optionsmodal.style.display = "block";
// }

// controlsbtn.onclick = function() {
//   controlsmodal.style.display = "block";
//   optionsmodal.style.display = "none";
// }

// span[0].onclick = function() {
//   optionsmodal.style.display = "none";
// }

// span[1].onclick = function() {
//   controlsmodal.style.display = "none";
// }


// window.onclick = function(event) {
//   if (event.target == optionsmodal || event.target == controlsmodal) {
//     optionsmodal.style.display = "none";
//     controlsmodal.style.display = "none";
//   }
// }

defineControls();

const chaser = document.querySelector('#chaser');
const escapee = document.querySelector('#escapee');
const score = document.querySelector('.score');


//Randomly position escapee at start
runAway();
// Move escapee on interval
setInterval(runAway, 2500);

// key events:
// https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values#navigation_keys
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'Down') {
    moveVerticaly(chaser, 50);
  } else if ( e.key === 'ArrowUp' || e.key === 'Up') {
    moveVerticaly(chaser, -50);
  } else if ( e.key === 'ArrowLeft' || e.key === 'Left') {
    moveHorizontaly(chaser, -50);
    chaser.style.transform = 'scale(-1, 1)';
  } else if ( e.key === 'ArrowRight' || e.key === 'Right') {
    moveHorizontaly(chaser, 50);
    chaser.style.transform = 'scale(1, 1)';
  }

  // Move escapee if chaser touches him
  if (isTouching(chaser, escapee)) {
    runAway();
    score.innerText = +(score.innerText) +1;
  }

});


// **FUNCTIONS**
// Get current position of player (return a number from style)
// 200px.slice(0, -2) - removes last 2 chars, in this case 'px'
// Turn string to a number, three ways:
// 1) Number(pos.slice(0, -2)); 
// 2) parseInt(pos.slice(0, -2)); 
// 3) +pos.slice(0, -2);
function  getPosition(pos) {
  if (!pos) return 100; // starting pos in css is top: 100px
  return +pos.slice(0, -2);
}

function moveVerticaly(element, amount) {
  let currTop = getPosition(element.style.top);
  // Stop player from going off screen
  if (currTop > (window.innerHeight - 150)) {
    currTop = window.innerHeight - 150;
  } else if ( currTop <= 0) {
    currTop = 50;
  }
  element.style.top = `${currTop + amount}px`;
}

function moveHorizontaly(element, amount) {
  currLeft = getPosition(element.style.left);
  if (currLeft > (window.innerWidth - 150)) {
    currLeft = window.innerWidth - 150;
  } else if (currLeft <= 0) {
    currLeft = 50;
  }
  element.style.left = `${currLeft + amount}px`;
}


//
function runAway() {
  const topMax= window.innerHeight - 100;
  const leftMax = window.innerWidth - 100;

  let x = Math.floor(Math.random() * leftMax);
  let y = Math.floor(Math.random() * topMax);

  escapee.style.top = `${y}px`;
  escapee.style.left = `${x}px`;
}



// Check if two objects overlap
// Solution found: https://bobbyhadz.com/blog/javascript-check-if-two-elements-overlap

function isTouching(a, b) {
  const domRect1 = a.getBoundingClientRect();
  const domRect2 = b.getBoundingClientRect();

  return !(
    domRect1.top > domRect2.bottom ||
    domRect1.right < domRect2.left ||
    domRect1.bottom < domRect2.top ||
    domRect1.left > domRect2.right
  );
}

// Movement code before refactoring: 

// window.addEventListener('keydown', (e) => {
//   if (e.key === 'ArrowDown' || e.key === 'Down') {
//     let currTop = getPosition(chaser.style.top);
//       // Stop player from going off screen
//       if (currTop > (window.innerHeight - 180)) {
//         currTop = window.innerHeight - 180;
//       }
//     chaser.style.top = `${currTop +50}px`;
//   } else if ( e.key === 'ArrowUp' || e.key === 'Up') {
//       let currTop = getPosition(chaser.style.top);
//         // Stop player from going off screen
//         if (currTop <= 0) {
//           currTop = 50;
//       }
//     chaser.style.top = `${currTop - 50}px`;
//   } else if ( e.key === 'ArrowLeft' || e.key === 'Left') {
//     let currLeft = getPosition( chaser.style.left);
//       // Stop player from going off screen
//       if (currLeft <= 0) {
//         currLeft = 50;
//       }
//     chaser.style.left = ` ${currLeft - 50}px`;
//     // Flip image to face left ( scale on X-axis)
//     chaser.style.transform = 'scale(-1, 1)';
//   } else if ( e.key === 'ArrowRight' || e.key === 'Right') {
//     let currLeft = getPosition(chaser.style.left);
//       // Stop player from going off screen
//       if (currLeft > (window.innerWidth - 150)) {
//         currLeft = window.innerWidth - 150;
//       }
//     chaser.style.left = ` ${currLeft + 50}px`;
//     // Flip image to face right
//     chaser.style.transform = 'scale(1, 1)';
//   }


//   // Move escapee if chaser touches him
//   if (isTouching(chaser, escapee)) {
//     runAway();
//     score.innerText = +(score.innerText) +1;
//   }
// });
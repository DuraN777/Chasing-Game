const chaser = document.querySelector('#chaser');
const escapee = document.querySelector('#escapee');



// https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values#navigation_keys
window.addEventListener('keydown', (e) => {

  if (e.key === 'ArrowDown' || e.key === 'Down') {
    const currTop = getPosition(chaser.style.top);
    if (currTop > 450) {
      currTop = 450;
    }
    chaser.style.top = `${currTop +50}px`;
    
  } else if ( e.key === 'ArrowUp' || e.key === 'Up') {
    let currTop = getPosition(chaser.style.top);
    // Stop player from going off screen on top
    if (currTop === 0) {
      currTop = 50;
    }
    chaser.style.top = `${currTop - 50}px`;

  } else if ( e.key === 'ArrowLeft' || e.key === 'Left') {
    let currLeft = getPosition( chaser.style.left);
    if (currLeft <= 0) {
      currLeft = 50;
    }
    chaser.style.left = ` ${currLeft - 50}px`;

  } else if ( e.key === 'ArrowRight' || e.key === 'Right') {
    let currL = getPosition(chaser.style.left);
    if (currL > (window.innerWidth - 150)) {
      currL = window.innerWidth - 150;
    }

    chaser.style.left = ` ${currL + 50}px`;
  }

})


// Get current position of player (return a number from style)
// 200px.slice(0, -2) - removes last 2 chars, int this case 'px'
// Turn string to a number, three ways:
// 1) Number(pos.slice(0, -2)); 
// 2) parseInt(pos.slice(0, -2)); 
// 3) +pos.slice(0, -2);
function  getPosition(pos) {
  if (!pos) return 100; // starting pos in css is top: 100px
  return +pos.slice(0, -2);
}

// Check if two objects overlap
// Solution found: https://bobbyhadz.com/blog/javascript-check-if-two-elements-overlap

function isTouching(a, b) {
  const domRect1 = el1.getBoundingClientRect();
  const domRect2 = el2.getBoundingClientRect();

  return !(
    domRect1.top > domRect2.bottom ||
    domRect1.right < domRect2.left ||
    domRect1.bottom < domRect2.top ||
    domRect1.left > domRect2.right
  );
}
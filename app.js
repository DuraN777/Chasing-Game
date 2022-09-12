







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
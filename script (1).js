document.addEventListener('DOMContentLoaded', () => {
  let characterPosX = 0; // Character's position on the X-axis
  const character = document.getElementById('character'); // Your character element
  const screenWidth = window.innerWidth; // Width of the screen
  const threshold = screenWidth - 100; // Threshold to change room, 100px from the right edge

  function moveCharacter(direction) {
    const moveAmount = 10; // Pixels to move the character each keypress
    if (direction === 'right') {
      characterPosX += moveAmount;
      if (characterPosX >= threshold) {
        goToNextScreen();
      }
    } else if (direction === 'left' && characterPosX > 0) {
      characterPosX -= moveAmount;
    }
    character.style.transform = `translateX(${characterPosX}px)`; // Move the character
  }

  function goToNextScreen() {
    // Logic to determine and navigate to the next screen
    // Reset character position for the next screen
    characterPosX = 0;
    character.style.transform = 'translateX(0px)';

    // Here add your logic to transition to the next screen
    // For example, you could increment a screen index and show/hide screens accordingly
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      moveCharacter('right');
    } else if (event.key === 'ArrowLeft') {
      moveCharacter('left');
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  let currentScreen = 'start-screen';
  const character = document.createElement('div');
  character.id = 'character';
  character.style.left = '0px';
  document.getElementById(currentScreen).appendChild(character);

  const screenBounds = {
    'start-screen': { right: 'main-hall', leftLimit: 0, rightLimit: 200 }, // Example limits
    'main-hall': { right: 'hallway-1', leftLimit: 0, rightLimit: 300 },
    'hallway-1': { right: 'hallway-2', up: 'room1.html', leftLimit: 0, rightLimit: 300 },
    'hallway-2': { right: 'exit', up: 'room2.html', leftLimit: 0, rightLimit: 300 },
    'exit': { right: 'start-screen', leftLimit: 0, rightLimit: 200 }
  };

  document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    const moveAmount = 10; // Adjust as needed
    let characterPos = parseInt(character.style.left, 10);

    if (keyName === 'ArrowRight') {
      if (characterPos < screenBounds[currentScreen].rightLimit) {
        characterPos += moveAmount;
        character.style.left = `${characterPos}px`;
        if (characterPos >= screenBounds[currentScreen].rightLimit) {
          navigateTo(screenBounds[currentScreen].right);
        }
      }
    } else if (keyName === 'ArrowLeft') {
      if (characterPos > screenBounds[currentScreen].leftLimit) {
        characterPos -= moveAmount;
        character.style.left = `${characterPos}px`;
      }
    } else if (keyName === 'ArrowUp') {
      if (screenBounds[currentScreen].up) {
        window.location.href = screenBounds[currentScreen].up;
      }
    }
  });

  function navigateTo(nextScreen) {
    if (nextScreen.startsWith('/')) {
      window.location.href = nextScreen;
      return;
    }

    const currentScreenEl = document.getElementById(currentScreen);
    const nextScreenEl = document.getElementById(nextScreen);

    if (currentScreenEl && nextScreenEl) {
      currentScreenEl.removeChild(character);
      nextScreenEl.appendChild(character);
      character.style.left = '0px'; // Reset character position in new screen
      currentScreenEl.classList.remove('active');
      nextScreenEl.classList.add('active');
      currentScreen = nextScreen;
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  let currentScreen = 'start-screen';
  const character = document.createElement('img');
  character.id = 'character';
  character.style.left = '1300px';
  character.src = "img/character pngs/right.png";
  document.getElementById(currentScreen).appendChild(character);

  const screenBounds = {
    'start-screen': { right: 'main-hall', leftLimit: 1300, rightLimit: 1520 }, // Example limits
    'main-hall': { right: 'hallway', leftLimit: 350, rightLimit: 1300 },
    'hallway': { right: 'exit', up1: 'room1.html', up2: 'room2.html', leftLimit: 350, rightLimit: 1400 },
    'exit': { right: 'start-screen', leftLimit: 250, rightLimit: 250 }
  };

  document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    const moveAmount = 10; // Adjust as needed
    let characterPos = parseInt(character.style.left, 10);

    if (keyName === 'ArrowRight') {
      if (characterPos < screenBounds[currentScreen].rightLimit) {
        character.src = "img/character pngs/right.png";
        characterPos += moveAmount;
        character.style.left = `${characterPos}px`;
        if (characterPos >= screenBounds[currentScreen].rightLimit) {
          navigateTo(screenBounds[currentScreen].right);
        }
      }
    } else if (keyName === 'ArrowLeft') {
      if (characterPos > screenBounds[currentScreen].leftLimit) {
        character.src = "img/character pngs/left.png";
        characterPos -= moveAmount;
        character.style.left = `${characterPos}px`;
      }
    } else if (keyName === 'ArrowUp' && screenBounds[currentScreen].right == 'exit') {
      if (parseInt(character.style.left) <= 850) {
        window.location.href = screenBounds[currentScreen].up1;
      }
      else {
        window.location.href = screenBounds[currentScreen].up2;
      }
    }
  });

  var observer = new MutationObserver(function (mutations) {
    // Check each mutation in the list
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === 'style') {
        // The 'style' attribute has changed
        var newLeftValue = parseInt(character.style.left) || 0;

        if (screenBounds[currentScreen].right == 'hallway') {
          if (newLeftValue == 260) {
            alert();
          }
          else if (newLeftValue == 1000) {
            alert();
          }
          else if (newLeftValue == 1280) {
            alert();
          }
        }
        else if (screenBounds[currentScreen].right == 'exit') {
          if (newLeftValue == 460) {
            alert();
          }
          else if (newLeftValue == 1000) {
            alert();
          }
          else if (newLeftValue == 1280) {
            alert();
          }
        }
        else if (screenBounds[currentScreen].right == 'start-screen') {

          setTimeout(() => {
            alert('This alert appeared after 0.5 second!');
          }, 500);
        }

      }
    });
  });

  var config = { attributes: true, subtree: false, attributeFilter: ['style'] };

  observer.observe(character, config);

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
      character.style.left = '250px'; // Reset character position in new screen
      currentScreenEl.classList.remove('active');
      nextScreenEl.classList.add('active');
      currentScreen = nextScreen;
    }
  }
});

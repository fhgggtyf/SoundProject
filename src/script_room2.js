document.addEventListener('DOMContentLoaded', () => {
  let currentScreen = 'bathroom';
  const character = document.createElement('img');
  character.id = 'character';
  character.style.left = '300px';
  character.style.top = '450px';
  character.src = "img/character pngs/right.png";
  let isAudioPlaying=false;
  const water = new Audio('../assets/sounds/WATER.wav');
  const mirror = new Audio('../assets/sounds/MIRROR.wav');
  const room2 = new Audio('../assets/sounds/ROOM2.wav');
  const phone = new Audio('../assets/sounds/PHONE.wav');

  document.getElementById(currentScreen).appendChild(character);

  const screenBounds = {
    'bathroom': { leftLimit: 300, rightLimit: 1120 }, // Example limits
  };

  document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    const moveAmount = 10; // Adjust as needed
    let characterPos = parseInt(character.style.left, 10);

    if (keyName === 'ArrowRight') {
      if (characterPos < screenBounds[currentScreen].rightLimit) {
        characterPos += moveAmount;
        character.style.left = `${characterPos}px`;
        character.src = "img/character pngs/right.png";
      }
    } else if (keyName === 'ArrowLeft') {
      if (characterPos > screenBounds[currentScreen].leftLimit) {
        characterPos -= moveAmount;
        character.style.left = `${characterPos}px`;
        character.src = "img/character pngs/left.png";
      }      
      else{
        window.location.href = "index.html";
      }
    }
  });

  var observer = new MutationObserver(function (mutations) {
    // Check each mutation in the list
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === 'style') {
        // The 'style' attribute has changed
        var newLeftValue = parseInt(character.style.left) || 0;

        if (newLeftValue == 310) {
          room2.play()
          isAudioPlaying = true;
          room2.onended = () => {
            console.log('Audio 1 finished playing');
            isAudioPlaying = false;
            // Any additional code to run after the audio finishes
          };
        }
        else if (newLeftValue == 520) {
          mirror.play()
          isAudioPlaying = true;
          mirror.onended = () => {
            console.log('Audio 1 finished playing');
            isAudioPlaying = false;
            // Any additional code to run after the audio finishes
          };
        }
      }
    });
  });

  var config = { attributes: true, subtree: false, attributeFilter: ['style'] };

  observer.observe(character, config);
});

document.addEventListener('DOMContentLoaded', () => {
  let currentScreen = 'bedroom';
  const character = document.createElement('img');
  character.id = 'character';
  character.style.left = '1220px';
  character.style.top = '400px';
  character.src = "img/character pngs/left.png";
  let isAudioPlaying=false;
  const portrait = new Audio('../assets/sounds/PORTRAIT.wav');
  const skele = new Audio('../assets/sounds/WARDROBE.wav');
  const room1 = new Audio('../assets/sounds/ROOM1.wav');
  const phone = new Audio('../assets/sounds/PHONE.wav');
  document.getElementById(currentScreen).appendChild(character);

  const screenBounds = {
    'bedroom': { leftLimit: 600, rightLimit: 1220 }, // Example limits
  };

  document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    const moveAmount = 10; // Adjust as needed
    let characterPos = parseInt(character.style.left, 10);
    if(!isAudioPlaying){
    if (keyName === 'ArrowRight') {
      if (characterPos < screenBounds[currentScreen].rightLimit) {
        characterPos += moveAmount;
        character.style.left = `${characterPos}px`;
        character.src = "img/character pngs/right.png";
      }      
      else{
        window.location.href = "index.html";
      }
    } else if (keyName === 'ArrowLeft') {
      if (characterPos > screenBounds[currentScreen].leftLimit) {
        characterPos -= moveAmount;
        character.style.left = `${characterPos}px`;
        character.src = "img/character pngs/left.png";
      }
    }
  }});

  var observer = new MutationObserver(function (mutations) {
    // Check each mutation in the list
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === 'style') {
        // The 'style' attribute has changed
        var newLeftValue = parseInt(character.style.left) || 0;

        if (newLeftValue == 1210) {
          phone.play()
          isAudioPlaying = true;
          phone.onended = () => {
            console.log('Audio 1 finished playing');
            isAudioPlaying = false;
            // Any additional code to run after the audio finishes
          };
        }
        else if (newLeftValue == 740) {
          skele.play()
          isAudioPlaying = true;
          skele.onended = () => {
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

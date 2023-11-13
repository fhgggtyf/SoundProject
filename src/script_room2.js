document.addEventListener('DOMContentLoaded', () => {
  let currentScreen = 'bathroom';
  const character = document.createElement('img');
  character.id = 'character';
  character.style.left = '300px';
  character.style.top = '450px';
  character.src = "img/character pngs/right.png";
  let isAudioPlaying=false;
  const footsteps = new Audio('../assets/sounds/FOOTSTEPS.wav');
  footsteps.loop=true;
  const water = new Audio('../assets/sounds/BATHROOM_BACKGROUND.wav');
  water.loop=true
  const mirror = new Audio('../assets/sounds/MIRROR.wav');
  const room2 = new Audio('../assets/sounds/ROOM2.wav');
  const phone = new Audio('../assets/sounds/PHONE.wav');
  let mirrorcheck=false;
  let room2check=false;
  document.getElementById(currentScreen).appendChild(character);

  const screenBounds = {
    'bathroom': { leftLimit: 300, rightLimit: 1120 }, // Example limits
  };

  document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    const moveAmount = 10; // Adjust as needed
    if(water.paused)
      water.play();
    let characterPos = parseInt(character.style.left, 10);
    if(!isAudioPlaying){
      footsteps.play();
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
  }});

  // Keyup event to stop footsteps
  document.addEventListener('keyup', (event) => {
    const keyName = event.key;
    if (keyName === 'ArrowRight' || keyName === 'ArrowLeft' || keyName === 'ArrowUp' || keyName === 'ArrowDown') {
      footsteps.pause();
      footsteps.currentTime = 0; // Reset audio to start
    }
  });

  var observer = new MutationObserver(function (mutations) {
    // Check each mutation in the list
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === 'style') {
        // The 'style' attribute has changed
        var newLeftValue = parseInt(character.style.left) || 0;

        if (newLeftValue == 310 && !room2check) {
          footsteps.pause();
      footsteps.currentTime = 0; // Reset audio to start

          room2.play()
          isAudioPlaying = true;
          room2.onended = () => {
            console.log('Audio 1 finished playing');
            isAudioPlaying = false;
            // Any additional code to run after the audio finishes
            room2check=true;
          };
        }
        else if (newLeftValue == 520 && !mirrorcheck) {
          footsteps.pause();
      footsteps.currentTime = 0; // Reset audio to start
          mirror.play()
          isAudioPlaying = true;
          mirror.onended = () => {
            console.log('Audio 1 finished playing');
            isAudioPlaying = false;
            // Any additional code to run after the audio finishes
            sessionStorage.setItem('mirror','Yes')
            mirrorcheck=true;
          };
        }
      }
    });
  });

  var config = { attributes: true, subtree: false, attributeFilter: ['style'] };

  observer.observe(character, config);
});

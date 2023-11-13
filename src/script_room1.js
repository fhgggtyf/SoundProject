document.addEventListener('DOMContentLoaded', () => {
  let currentScreen = 'bedroom';
  const character = document.createElement('img');
  character.id = 'character';
  character.style.left = '1230px';
  character.style.top = '400px';
  character.src = "img/character pngs/left.png";
  let isAudioPlaying=false;
  const footsteps = new Audio('../assets/sounds/FOOTSTEPS.wav');
  footsteps.loop=true;
  const phoneringback = new Audio('../assets/sounds/PHONE_RINGING.wav');
  const skele = new Audio('../assets/sounds/WARDROBE.wav');
  const phonering = new Audio('../assets/sounds/PHONE_RING1.wav');
  const phone = new Audio('../assets/sounds/PHONE.wav');
  const background = new Audio('../assets/sounds/BACKGROUND_BEDROOM.wav');
  background.loop=true;

  let phonecheck=false;
  let phoneringcheck=false;
  let skelecheck=false;
  document.getElementById(currentScreen).appendChild(character);

  const screenBounds = {
    'bedroom': { leftLimit: 600, rightLimit: 1220 }, // Example limits
  };

  document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    const moveAmount = 10; // Adjust as needed
    if(background.paused)
      background.play();
    let characterPos = parseInt(character.style.left, 10);
    if(!isAudioPlaying){
      footsteps.play();
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
        if (newLeftValue == 1220 && !phoneringcheck) {
          footsteps.pause();
            footsteps.currentTime = 0;
          phonering.play()
          isAudioPlaying = true;
          phonering.onended = () => {
            console.log('Audio 1 finished playing');
            isAudioPlaying = false;
            // Any additional code to run after the audio finishes
            sessionStorage.setItem('phone','Yes')
            phoneringcheck=true;
            phoneringback.play();
          };
        }
        else if (newLeftValue == 1210 && !phonecheck) {
          footsteps.pause();
            footsteps.currentTime = 0;
          phoneringback.pause();
          phone.play()
          isAudioPlaying = true;
          phone.onended = () => {
            console.log('Audio 1 finished playing');
            isAudioPlaying = false;
            // Any additional code to run after the audio finishes
            sessionStorage.setItem('phone','Yes')
            phonecheck=true;
          };
        }
        else if (newLeftValue == 740 && !skelecheck) {
          document.getElementById("closet").src="img/bedroom/closet_opened.png";
          footsteps.pause();
            footsteps.currentTime = 0;
          skele.play()
          isAudioPlaying = true;
          skele.onended = () => {
            console.log('Audio 1 finished playing');
            isAudioPlaying = false;
            // Any additional code to run after the audio finishes
            skelecheck=true;
          };
        }
      }
    });
  });

  var config = { attributes: true, subtree: false, attributeFilter: ['style'] };

  observer.observe(character, config);
});

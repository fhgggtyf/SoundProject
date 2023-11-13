document.addEventListener('DOMContentLoaded', () => {
  let currentScreen = sessionStorage.getItem("current"); // get the current page

  // if it is empty then give it initial value, this init value is used only in cover so it is determined.
  if (!currentScreen) {
    sessionStorage.setItem('current', 'start-screen');
    currentScreen = sessionStorage.getItem("current");
    console.log(sessionStorage.getItem("current"))
    
  }


  const character = document.createElement('img');
  character.id = 'character';

  //sounds
  const start = new Audio('../assets/sounds/START.wav');
  const intro = new Audio('../assets/sounds/INTRO.wav');
  const footsteps = new Audio('../assets/sounds/FOOTSTEPS.wav');
  footsteps.loop=true;
  const portrait = new Audio('../assets/sounds/PORTRAIT.wav');
  const door = new Audio('../assets/sounds/CREAKY_DOOR.wav');
  const hall1 = new Audio('../assets/sounds/ENTER_HALL.wav');
  const door1 = new Audio('../assets/sounds/DOOR1.wav');
  const door2 = new Audio('../assets/sounds/DOOR2.wav');
  //const door1 = new Audio('../assets/sounds/ENTER_HALL.wav');
  const notend = new Audio('../assets/sounds/NOTEND.wav');
  const end = new Audio('../assets/sounds/END.wav');
  const end2 = new Audio('../assets/sounds/END2.wav');
  const background = new Audio('../assets/sounds/BACKGROUNDS.wav');
  let room1check=false;
  let room2check=false;
  let portraitcheck=false;
  let introcheck=false;
  let isAudioPlaying=false;

  const startButton = document.getElementById('startButton');
  startButton.addEventListener('click', () => {
    // Play the audio
    if (currentScreen === 'start-screen') {
      start.play();
      background.loop = true;
      background.play()
      isAudioPlaying = true;
      start.onended = () => {
        isAudioPlaying = false;
        // Additional code that runs after the audio finishes can go here
      };
    }

    // Hide the button after it's clicked
    startButton.style.display = 'none';
  });
  // same, getting the stored x value (in string)
  let xCord=sessionStorage.getItem("currentX");
  if (!xCord) {
    sessionStorage.setItem('currentX', '1300');
    xCord = sessionStorage.getItem("currentX");
    console.log(sessionStorage.getItem("currentX"))
  }
  

  character.src = "img/character pngs/right.png";
  document.getElementById(currentScreen).appendChild(character);

  const screenBounds = {
    'start-screen': { right: 'main-hall', leftLimit: 1300, rightLimit: 1520 }, // Example limits
    'main-hall': { right: 'hallway', leftLimit: 350, rightLimit: 1300 },
    'hallway': { right: 'exit', up1: 'room1.html', up2: 'room2.html', leftLimit: 350, rightLimit: 1400 },
    'exit': { right: 'start-screen', leftLimit: 250, rightLimit: 250 }
  };
  
  navigateTo(currentScreen);
  character.style.left = `${xCord}px`;

  document.addEventListener('keydown', (event) => {
    console.log(sessionStorage.getItem("current")) // test code should be commented out
    console.log(sessionStorage.getItem("currentX"))
    const keyName = event.key;
    const moveAmount = 10; // Adjust as needed
    let characterPos = parseInt(character.style.left, 10);
    if(!isAudioPlaying){
      footsteps.play()

    if (keyName === 'ArrowRight') {
      if (characterPos < screenBounds[currentScreen].rightLimit) {
        character.src = "img/character pngs/right.png";
        characterPos += moveAmount;
        character.style.left = `${characterPos}px`;
        if (characterPos >= screenBounds[currentScreen].rightLimit) {
          sessionStorage.setItem("current",screenBounds[currentScreen].right);
          sessionStorage.setItem("currentX",screenBounds[screenBounds[currentScreen].right].leftLimit);
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
        sessionStorage.setItem("current",currentScreen);
        sessionStorage.setItem("currentX",characterPos.toString());
        console.log(sessionStorage.getItem("current"))// test code should be commented out
        console.log(sessionStorage.getItem("currentX"))
        window.location.href = screenBounds[currentScreen].up1;
      }
      else {
        sessionStorage.setItem("current",currentScreen);
        sessionStorage.setItem("currentX",characterPos.toString())
        console.log(sessionStorage.getItem("current"))// test code should be commented out
        console.log(sessionStorage.getItem("currentX"))
        window.location.href = screenBounds[currentScreen].up2;
      }
    }}
  });
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
        
        if (screenBounds[currentScreen].right == 'hallway') {
          if (newLeftValue == 360 && !introcheck) {
            footsteps.pause();
            footsteps.currentTime = 0;
            intro.play()
            isAudioPlaying = true;
            intro.onended = () => {
              console.log('Audio 1 finished playing');
              isAudioPlaying = false;
              // Any additional code to run after the audio finishes
              introcheck=true;
            };
          }
          else if (newLeftValue == 1000 && !portraitcheck) {
            footsteps.pause();
            footsteps.currentTime = 0;

            portrait.play()
            isAudioPlaying = true;
            portrait.onended = () => {
              console.log('Audio 2 finished playing');
              isAudioPlaying = false;
              // Any additional code to run after the audio finishes
              portraitcheck=true;
            };
          }
          else if (newLeftValue == 1280) {
            footsteps.pause();
            footsteps.currentTime = 0;
            door.play()
            
          }
        }
        else if (screenBounds[currentScreen].right == 'exit' && !room1check) {
          if (newLeftValue == 460) {
            footsteps.pause();
            footsteps.currentTime = 0;
            door1.play()
            isAudioPlaying = true;
            door1.onended = () => {
              console.log('Audio 2 finished playing');
              isAudioPlaying = false;
              // Any additional code to run after the audio finishes
              room1check=true;
            };
          }
          else if (newLeftValue == 1000 && !room2check) {
            footsteps.pause();
            footsteps.currentTime = 0;
            door2.play()
            isAudioPlaying = true;
            door2.onended = () => {
              console.log('Audio 2 finished playing');
              isAudioPlaying = false;
              // Any additional code to run after the audio finishes
              room2check=true;
            };
          }
          else if (newLeftValue == 1280) {
            if((sessionStorage.getItem('phone') && sessionStorage.getItem('mirror'))){
              footsteps.pause();
              footsteps.currentTime = 0;
              end.play()
            isAudioPlaying = true;
            end.onended = () => {
              console.log('Audio 2 finished playing');
              isAudioPlaying = false;
              // Any additional code to run after the audio finishes
            };
          }
            else{
              footsteps.pause();
            footsteps.currentTime = 0;
              notend.play()
            isAudioPlaying = true;
            notend.onended = () => {
              console.log('Audio 2 finished playing');
              isAudioPlaying = false;
              // Any additional code to run after the audio finishes
            };
          }
            }
        }
        else if (screenBounds[currentScreen].right == 'start-screen') {

          setTimeout(() => {
            end2.play();
          }, 500);
        }
      }
    });
  });

  var config = { attributes: true, subtree: false, attributeFilter: ['style'] };

  observer.observe(character, config);

  function navigateTo(nextScreen) {
    if (nextScreen.startsWith('/')) {
      door.play()
      window.location.href = nextScreen;
      return;
    }
    else if(nextScreen=='exit')
    {
      if(!(sessionStorage.getItem('phone') && sessionStorage.getItem('mirror')))
        return;
    }
    const currentScreenEl = document.getElementById(currentScreen);
    const nextScreenEl = document.getElementById(nextScreen);

    if (currentScreenEl && nextScreenEl) {
      currentScreenEl.removeChild(character);
      nextScreenEl.appendChild(character);
      character.style.left = sessionStorage.getItem("currentX")+'px'; // Reset character position in new screen
      console.log("update"+sessionStorage.getItem("currentX"))  // test code should be commented out
      currentScreenEl.classList.remove('active');
      nextScreenEl.classList.add('active');
      currentScreen = nextScreen;
    }
    if(currentScreen=='hallway')
      hall1.play()
  }
});

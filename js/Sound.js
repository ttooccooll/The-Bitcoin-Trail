let currentSound = null; // Variable to keep track of the currently playing sound

function playSound(soundId) {
  // Stop the current sound if it's playing
  if (currentSound) {
    currentSound.pause();
    currentSound.currentTime = 0; // Reset the sound to the beginning
  }

  // Play the new sound
  const sound = document.getElementById(soundId);
  if (sound) {
    sound.play();
    currentSound = sound; // Update the current sound
  }
}


function playSound(soundId) {
    const sound = document.getElementById(soundId);
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }

  function playSound(soundId) {
    // Stop the current sound if it's playing
    if (currentSound) {
      currentSound.pause();
      currentSound.currentTime = 0; // Reset the sound to the beginning
    }

    // Play the new sound
    const sound = document.getElementById(soundId);
    if (sound) {
      sound.play();
      currentSound = sound; // Set the new sound as the current sound
    }
  }

  // Add event listeners to buttons and actions
  document.getElementById('start-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    playSound('sound-theme');
    // Continue with the start journey logic...
  });

  document.getElementById('attack').addEventListener('click', function() {
    playSound('sound-attack');
    // Continue with the attack logic...
  });

  document.getElementById('shop').addEventListener('click', function() {
    playSound('sound-town');
    // Continue with the runaway logic...
  });

  document.getElementById('gameover').addEventListener('click', function() {
    playSound('sound-theme');
    // Reload the page to start over...
  });
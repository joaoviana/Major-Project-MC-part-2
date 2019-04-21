let customObject = {};
let customAudio, customAudioSource;
let customAudioReady = false;

let customAudioContext;
let customScene;
let customSound;
let customSoundSource;
let customSource;


//handle selections and fallbacks.
function handleCustomisedSelection(customPropsObj) {
  console.log(customPropsObj);

  //handle shape selected, also set default
  if (!customPropsObj.geometry) {
    customPropsObj.geometry = "sphere";
  }

  //handle sound src selected, also set default
  if (!customPropsObj.soundFile) {
    customPropsObj.soundFile = "./soundFiles/trippy.wav";
  }

  //handle selected room properties, otherwise set those null ones to a default value, like transparent
  if (!customPropsObj.roomProperties.left) {
    customPropsObj.roomProperties.left = "transparent";
  }

  if (!customPropsObj.roomProperties.right) {
    customPropsObj.roomProperties.right = "transparent";
  }

  if (!customPropsObj.roomProperties.front) {
    customPropsObj.roomProperties.front = "transparent";
  }

  if (!customPropsObj.roomProperties.back) {
    customPropsObj.roomProperties.back = "transparent";
  }

  if (!customPropsObj.roomProperties.ceiling) {
    customPropsObj.roomProperties.ceiling = "transparent";
  }

  if (!customPropsObj.roomProperties.floor) {
    customPropsObj.roomProperties.floor = "transparent";
  }

  //handle gain
  if (!customPropsObj.gain) {
    customPropsObj.gain = 1;
  }

  //handle rolloff
  if (!customPropsObj.rolloff) {
    customPropsObj.rolloff = "logarithmic";
  }

  //handle speed of sound
  if (!customPropsObj.speedOfSound) {
    customPropsObj.speedOfSound = 343;
  }

  customObject = customPropsObj;

  //call init audio here with new customPropsObj
  initAudioCustomised(customObject);
}

function initAudioCustomised(customPropsObj) {
  let roomDimensions = {
    width: 20,
    height: 20,
    depth: 20
  };

  let customMaterial = setCustomRoomProperties(customPropsObj.roomProperties);

  //instantiate audio context and RA
  customAudioContext = new (window.AudioContext || window.webkitAudioContext)();
  // Create a (1st-order Ambisonic) ResonanceAudio scene.
  customScene = new ResonanceAudio(customAudioContext);
  // console.log('SCENE IN CUSTOMISED SCENE', scene);

  // Send scene's rendered binaural output to stereo out.
  customScene.output.connect(customAudioContext.destination);

  // Set room acoustics properties.
  customScene.setRoomProperties(roomDimensions, customMaterial);

  // Set speed of sound
  customScene.setSpeedOfSound(customPropsObj.speedOfSound);

  // console.log('SCENE AFTER BEING SET NEW PROPS: ', customScene);

  //set up the audio source

  // attach

  // Create an audio element. Feed into audio graph.
  customAudio = document.createElement("audio");
  customAudio.src = "./soundFiles/" + customPropsObj.soundFile;
  customAudio.crossOrigin = "anonymous";
  customAudio.load();
  // console.log('custom Audio: ', customAudio);
  customAudioSource = customAudioContext.createMediaElementSource(customAudio);

  // Create a Source, connect desired audio input to it.
  customSource = customScene.createSource();
  // console.log('SOURCE BEFORE SET PROPS', customSource);
  customSource.setGain(customPropsObj.gain);
  customSource.setRolloff(customPropsObj.rolloff);
  // console.log('SOURCE AFTER PROPS LOL: ', customSource);
  customAudioSource.connect(customSource.input);
  customAudioReady = true;
}

AFRAME.registerComponent("customise-menu-sound-source", {
  init: function() {
    this.wpVector = new THREE.Vector3();
    var isPlayingCustom = false;
    if(customObject.geomery == 'cube') {
        this.el.setAttribute("geometry", 'primitive: box');
    } else {
        this.el.setAttribute("geometry", 'primitive: ' + customObject.geometry);
    }
    this.el.setAttribute("position", { x: 0, y: 1, z: -3.25 });
    this.el.setAttribute("material", "color:pink");
    this.el.setAttribute("class", "cube");
    this.el.setAttribute("mixin", "cube");
    this.el.setAttribute("shadow", "receive:true;castShadow:true");
    this.el.addEventListener("click", function() {
      
      if (customAudioContext) customAudioContext.resume();

      if (isPlayingCustom == false && customAudio) {
        this.setAttribute('material', "color:green");
        customAudio.play();
        isPlayingCustom = true;
      } else if (isPlayingCustom == true && customAudio) {
        this.setAttribute('material', "color:pink");
        customAudio.pause();
        isPlayingCustom = false;
      }
    });
  },
  tick: function() {
    var cameraEl = this.el.sceneEl.camera.el;
    if (customSource) {
      customSource.setFromMatrix(new THREE.Matrix4().getInverse(new THREE.Matrix4().multiplyMatrices(
        new THREE.Matrix4().getInverse(this.el.object3D.matrixWorld),
        cameraEl.object3D.matrixWorld)
    ));
    }
  }
});
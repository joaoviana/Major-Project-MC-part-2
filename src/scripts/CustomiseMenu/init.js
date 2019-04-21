let customiseMenuObject = {
  roomProperties: {
  }
};

// CUSTOMISE MENU - 1
AFRAME.registerComponent("object-sound-src", {
  init: function() {
    this.el.addEventListener("click", function(e) {
      let sceneEl = document.querySelector("a-scene");
      if (this.id == "sphere-obj") {
        customiseMenuObject.geometry = "sphere";
      } else if (this.id == "cube-obj") {
        customiseMenuObject.geometry = "box";
      } else if (this.id == "torus-obj") {
        customiseMenuObject.geometry = "torus";
      }
      let mask = sceneEl.querySelector("#mask");
      mask.setAttribute(
        "template",
        "src",
        "./src/templates/customiseMenu/customiseMenu2.template"
      );
    });
  }
});

// CUSTOMISE MENU - 2

AFRAME.registerComponent("sound-file-selected", {
  init: function() {
    this.el.addEventListener("click", function(e) {
      let sceneEl = document.querySelector("a-scene");
      let mask = sceneEl.querySelector("#mask");
      let fileName = this.childNodes[1].components.text.attrValue.value;
      // get filename according to text box chosen
      if (fileName == "funky") {
        customiseMenuObject.soundFile = "funky.wav";
      } else if (fileName == "trippy") {
        customiseMenuObject.soundFile = "trippy.wav";
      } else if (fileName == "spoken") {
        customiseMenuObject.soundFile = "spoken.wav";
      }
      mask.setAttribute(
        "template",
        "src",
        "./src/templates/customiseMenu/customiseMenu3.template"
      );
    });
  }
});

// CUSTOMISE MENU - 3

AFRAME.registerComponent("register-selection", {
  init: function() {
    this.el.addEventListener("click", function(e) {
      let wallMaterial = this.getAttribute("src").replace("#", "");
      let wall = this.classList[0];
      //setting custom room materials
      if (wall == "floor-wall") {
        customiseMenuObject.roomProperties.floor = wallMaterial;
      } else if (wall == "ceiling-wall") {
        customiseMenuObject.roomProperties.ceiling = wallMaterial;
      } else if (wall == "left-wall") {
        customiseMenuObject.roomProperties.left = wallMaterial;
      } else if (wall == "right-wall") {
        customiseMenuObject.roomProperties.right = wallMaterial;
      } else if (wall == "front-wall") {
        customiseMenuObject.roomProperties.front = wallMaterial;
      } else if (wall == "back-wall") {
        customiseMenuObject.roomProperties.back = wallMaterial;
      }
    });
  }
});

AFRAME.registerComponent("set-props-button", {
  init: function() {
    this.el.addEventListener("click", function(evt) {
      let sceneEl = document.querySelector("a-scene");
      let mask = sceneEl.querySelector("#mask");
      mask.setAttribute(
        "template",
        "src",
        "./src/templates/customiseMenu/customiseMenu4.template"
      );
    });
  }
});

// CUSTOMISE MENU - 4

AFRAME.registerComponent("register-speed-of-sound", {
  init: function() {
    this.el.addEventListener("click", function(e) {
      let speedOfSound = this.childNodes[1].components.text.attrValue.value;
      // get speed of sound according to text box chosen
      if (speedOfSound == "343") {
        customiseMenuObject.speedOfSound = 343;
      } else if (speedOfSound == "500") {
        customiseMenuObject.speedOfSound = 500;
      } else if (speedOfSound == "240") {
        customiseMenuObject.speedOfSound = 240;
      }
    });
  }
});

AFRAME.registerComponent("register-sound-src-gain", {
  init: function() {
    this.el.addEventListener("click", function(e) {
      let gain = this.childNodes[1].components.text.attrValue.value;
      // get gain according to text box chosen
      if (gain == "1") {
        customiseMenuObject.gain = 1;
      } else if (gain == "0.7") {
        customiseMenuObject.gain = 0.7;
      } else if (gain == "0.5") {
        customiseMenuObject.gain = 0.5;
      }
    });
  }
});

AFRAME.registerComponent("register-rolloff", {
  init: function() {
    this.el.addEventListener("click", function(e) {
      let rolloff = this.childNodes[1].components.text.attrValue.value;
      customiseMenuObject.rolloff = rolloff;
    });
  }
});

AFRAME.registerComponent("set-extra-props-button", {
  init: function() {
    this.el.addEventListener("click", function(evt) {
      let sceneEl = document.querySelector("a-scene");
      let mask = sceneEl.querySelector("#mask");
      mask.setAttribute(
        "template",
        "src",
        "./src/templates/customiseMenu/customiseMenu5.template"
      );
      //hiding a-sky and making environment visible
      let sky = sceneEl.querySelector("#sky");
      let environment = sceneEl.querySelector("#environment");
      sky.setAttribute('visible', 'false');
      environment.setAttribute('environment','active: true');
      handleCustomisedSelection(customiseMenuObject);
    });
  }
});

//CUSTOMISE MENU 5
let isVisible = false;
AFRAME.registerComponent("open-customised-details", {
  init: function() {
    this.el.addEventListener("click", function(evt) {
      isVisible = !isVisible;
      let sceneEl = document.querySelector("a-scene");
      //toggling details box
      let detailsBox = sceneEl.querySelector("#details-box");
      if(!isVisible)
        detailsBox.setAttribute('visible', 'true');
      else
        detailsBox.setAttribute('visible', 'false');
      
      //add text content to the details box afterwards:
      // getting values/text content and inserting them into the a-text tags
      sceneEl.querySelector("#gain").setAttribute('value', 'gain: ' + customObject.gain.toString());
      sceneEl.querySelector("#geometry-chosen").setAttribute('value', 'geometry: ' + customObject.geometry);
      sceneEl.querySelector("#rolloff").setAttribute('value', 'rolloff: ' + customObject.rolloff);
      sceneEl.querySelector("#back-wall-text").setAttribute('value', 'Back Wall: ' + customObject.roomProperties.back);
      sceneEl.querySelector("#front-wall-text").setAttribute('value', 'Front Wall: ' + customObject.roomProperties.front);
      sceneEl.querySelector("#left-wall-text").setAttribute('value', 'Left Wall: ' + customObject.roomProperties.left);
      sceneEl.querySelector("#right-wall-text").setAttribute('value', 'Right Wall: ' + customObject.roomProperties.right);
      sceneEl.querySelector("#floor-text").setAttribute('value', 'Floor: ' + customObject.roomProperties.floor);
      sceneEl.querySelector("#ceiling-text").setAttribute('value', 'Ceiling: ' + customObject.roomProperties.ceiling);
    });
  }
});


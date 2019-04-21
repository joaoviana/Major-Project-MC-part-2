let roomProperties = {};
let customiseMenuObject = {};

AFRAME.registerComponent("testing-menu", {
  init: function() {
    // initAudio('default');
  }
});

AFRAME.registerComponent("set-props-button", {
  init: function() {
    this.el.addEventListener("click", function(evt) {
      //call set room props and hide menus
      let sceneEl = document.querySelector("a-scene");
      let menuTitle = sceneEl.querySelector("#room-props-title");
      let allMenus = sceneEl.getElementsByClassName("room-props-menu");
      let setPropsButton = sceneEl.querySelector(".room-props-button");
      for (var i = 0; i < allMenus.length; i++) {
        allMenus[i].setAttribute("visible", "false");
      }
      menuTitle.setAttribute("visible", "false");
      setPropsButton.setAttribute("visible", "false");
    });
  }
});

AFRAME.registerComponent("register-selection", {
  init: function() {
    this.el.addEventListener("click", function(e) {
      e.stopPropagation();
      let wallMaterial = this.getAttribute("src").replace("#", "");
      let wall = this.getAttribute("class");
      if (wall == "floor-wall") {
        roomProperties.floor = wallMaterial;
      } else if (wall == "ceiling-wall") {
        roomProperties.ceiling = wallMaterial;
      } else if (wall == "left-wall") {
        roomProperties.left = wallMaterial;
      } else if (wall == "right-wall") {
        roomProperties.right = wallMaterial;
      } else if (wall == "front-wall") {
        roomProperties.front = wallMaterial;
      } else if (wall == "back-wall") {
        roomProperties.back = wallMaterial;
      }

      //hiding submenu 3, displaying submenu 4
      let sceneEl = document.querySelector("a-scene");
      let customiseMenu3 = sceneEl.querySelector("#customise-menu-3");
      let customiseMenu4 = sceneEl.querySelector("#customise-menu-4");
      customiseMenu3.setAttribute("visible", "false");
      customiseMenu3.setAttribute("material", "visible: false");
      customiseMenu4.setAttribute("visible", "true");
      customiseMenu4.setAttribute("material", "visible: true");
    });
  }
});

/*
  Registering AFrame components related to the customisation menu
*/

AFRAME.registerComponent("object-sound-src", {
  update: function() {
    this.el.addEventListener("click", function(e) {
      e.cancelBubble = true;
      e.stopPropagation();
      // console.log(e);
      if (this.id == "sphere-obj") {
        customiseMenuObject.geometry = "sphere";
      } else if (this.id == "cube-obj") {
        customiseMenuObject.geometry = "box";
      } else if (this.id == "torus-obj") {
        customiseMenuObject.geometry = "torus";
      }
      let sceneEl = document.querySelector("a-scene");
      //hide submenu 1, make submenu 2 visible
      let customiseMenu1 = sceneEl.querySelector("#customise-menu-1");
      let customiseMenu2 = sceneEl.querySelector("#customise-menu-2");
      customiseMenu1.setAttribute("material", "visible: false");
      customiseMenu1.setAttribute("visible", "false");
      customiseMenu2.setAttribute("material", "visible: true");
      customiseMenu2.setAttribute("visible", "true");

    });
  }
});

AFRAME.registerComponent("sound-file-selected", {
  update: function() {
    this.el.addEventListener("click", function(e) {
      e.stopPropagation();
      let fileName = this.childNodes[1].components.text.attrValue.value;
      // get filename according to text box chosen
      if (fileName == "funky") {
        customiseMenuObject.soundFile = "funky.wav";
      } else if (fileName == "trippy") {
        customiseMenuObject.soundFile = "trippy.wav";
      } else if (fileName == "spoken") {
        customiseMenuObject.soundFile = "spoken.wav";
      }
      let sceneEl = document.querySelector("a-scene");
      //hide submenu 2, make submenu 3 visible
      let customiseMenu2 = sceneEl.querySelector("#customise-menu-2");
      customiseMenu2.setAttribute("visible", "false");
      customiseMenu2.setAttribute("material", "visible: false");
    });
  }
});

AFRAME.registerComponent("register-speed-of-sound", {
  init: function() {
    this.el.addEventListener("click", function(e) {
      let speedOfSound = this.childNodes[1].components.text.attrValue.value;
      // get filename according to text box chosen
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
      // get filename according to text box chosen
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
      // get filename according to text box chosen
      customiseMenuObject.rolloff = rolloff;
      let sceneEl = document.querySelector("a-scene");
      //hide submenu 2, make submenu 3 visible
      let customiseMenu4 = sceneEl.querySelector("#customise-menu-4");
      customiseMenu4.setAttribute("visible", "false");
      customiseMenu4.setAttribute("material", "visible: false");
    });
  }
});


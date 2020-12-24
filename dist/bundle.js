/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return initMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addMarkerOnMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return visitDreamOnMap; });
let map;
let panorama;
const resetMapButton = document.querySelector('#reset-map');
const backToMapButton = document.querySelector('#back-to-map');
const panoramaElement = document.querySelector('#panorama');

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 48.858227, lng: 2.294559},
        zoom: 2.2,
        streetViewControl: false
    });
    panorama = new google.maps.StreetViewPanorama(document.getElementById('panorama'), {
        position: {lat: 48.858227, lng: 2.294559},
        pov: {
          heading: 34,
          pitch: 10
        }
    });
    addMapListeners();
    panoramaElement.style.display = "none";
    backToMapButton.style.display = "none";  
}

function addMapListeners(){
    resetMapButton.addEventListener("click", resetMap);
    backToMapButton.addEventListener("click", backToMap);
}

function addMarkerOnMap(dream){
    const marker = new google.maps.Marker({
        position:  dream.coordinates,
        map: map,
        icon: dream.done ? "images/marker_done.png" : "images/marker.png"
    });  
     marker.addListener('click', function() {
        zoomOn(marker.getPosition());
    });
}

function zoomOn(position){
    map.setCenter(position);
    map.setMapTypeId('satellite');
    map.setZoom(20);  
}

function resetMap(){
    map.setCenter( {lat: 48.858227, lng: 2.294559});
    map.setMapTypeId('roadmap');
    map.setZoom(3);  
}

function backToMap(){
    panoramaElement.style.display = "none";
    backToMapButton.style.display = "none";
    resetMapButton.style.display = "block";  
}

function visitDreamOnMap(position){
    panorama.setPosition(position);
    panoramaElement.style.display = "block";
    backToMapButton.style.display = "block";
    resetMapButton.style.display = "none";
}




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__map__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dream__ = __webpack_require__(2);



function init() {
    Object(__WEBPACK_IMPORTED_MODULE_0__map__["b" /* initMap */])();
    Object(__WEBPACK_IMPORTED_MODULE_1__dream__["a" /* buildAllDreams */])();
}
window.init = init;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buildAllDreams; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__map__ = __webpack_require__(0);



const dreamsContainer = document.querySelector('#dreams-container');

function buildAllDreams(){
    while (dreamsContainer.hasChildNodes()) {
        dreamsContainer.removeChild(dreamsContainer.lastChild);
    }
    __WEBPACK_IMPORTED_MODULE_0__data__["a" /* data */].forEach(buildOneDream);
    addDreamsListeners();
}

function buildOneDream(dream){
    const dreamElement = document.createElement('div');
    dreamElement.innerHTML = 
    `<div class="card text-center" id="${dream.id}">
      <h4 class="card-header font-weight-bold">${dream.title}</h4>
      <img class="card-img-top" src="${dream.imagePath}" alt="">
      <div class="card-body">
          <a href="#" class="button-action btn btn-${dream.done?"secondary":"danger"} btn-block font-weight-bold">${dream.done?"Je veux le refaire":"Je me lance !"}</a>
      </div>
      <p>${dream.description}</p>
      <div class="card-footer text-right">
          <a href="#" class="button-visit btn btn-outline-secondary btn-sm">Visiter</a>
          <a href="${dream.link}" target="_blank" class="button-info btn btn-outline-dark btn-sm">Plus d'infos</a>
      </div>
    </div>`;
    dreamsContainer.appendChild(dreamElement);
    Object(__WEBPACK_IMPORTED_MODULE_1__map__["a" /* addMarkerOnMap */])(dream);
}

function addDreamsListeners(){
  document.querySelectorAll(".button-visit").forEach(item => {
    item.addEventListener("click", event => {
      visitDream(item.parentElement.parentElement.getAttribute('id'));
    });
  });
  document.querySelectorAll(".button-action").forEach(item =>{
      item.addEventListener("click", event =>{
        toggleDreamDone(item.parentElement.parentElement.getAttribute('id'));
        buildAllDreams();
      });
  });
}

function visitDream(dreamId){
  let position = __WEBPACK_IMPORTED_MODULE_0__data__["a" /* data */].filter(item => item.id == dreamId)[0].coordinates;
  Object(__WEBPACK_IMPORTED_MODULE_1__map__["c" /* visitDreamOnMap */])(position);
}


function toggleDreamDone(dreamId){
  let dream = __WEBPACK_IMPORTED_MODULE_0__data__["a" /* data */].filter(item => item.id == dreamId)[0];
  dream.done = !dream.done;  
}



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return data; });
const data = [
    {
        id:1,
        imagePath:"images/img_canada.jpeg",
        description:"visiter le Canada",
        title:"Canada",
        done:false,
        link:"https://generationvoyage.fr/endroits-visiter-canada/",
        coordinates:{ 
            lat: 51.32513305197062, 
            lng: -116.18634347281385 
        } 
    },
    {
        id:2,
        imagePath:"images/img_bresil.jpeg",
        description:"Se baigner dans les grottes de Bonito au Brésil",
        title:"Brésil",
        done:false,
        link:"https://generationvoyage.fr/endroits-visiter-bresil/",
        coordinates:{ 
            lat: -21.123819583930402, 
            lng: -56.484250715217016 
        } 
    },
    {
        id:3,
        imagePath:"images/img_chine.jpeg",
        description:"Marcher sur la grande Muraille",
        title:"Chine",
        done:false,
        link:"https://generationvoyage.fr/endroits-visiter-chine/",
        coordinates:{  
            lat: 40.43604704218967, 
            lng: 116.57003546896041
        } 
    },
    {
        id:4,
        imagePath:"images/img_japon.jpeg",
        description:"Visiter Konoha",
        title:"Japon",
        done:false,
        link:"https://generationvoyage.fr/endroits-visiter-japon/",
        coordinates:{   
            lat: 35.36478446747005, 
            lng: 138.72839678390199
        } 
    },
    {
        id:5,
        imagePath:"images/img_inde.jpeg",
        description:"Une nuit au Taj Mahal",
        title:"Inde",
        done:false,
        link:"https://generationvoyage.fr/endroits-visiter-inde/",
        coordinates:{    
            lat: 27.177884979776575, 
            lng: 78.04214297572048
        } 
    },
    {
        id:6,
        imagePath:"images/img_dubai.jpeg",
        description:"Faire du jet ski à Dubai",
        title:"Dubai",
        done:false,
        link:"https://generationvoyage.fr/visiter-dubai-incontournables/",
        coordinates:{     
            lat: 25.145487598535865, 
            lng: 55.18560036867045
        } 
    },
    {
        id:7,
        imagePath:"images/img_kenya.png",
        description:"Faire un Safari au Kenya",
        title:"Kenya",
        done:true,
        link:"https://generationvoyage.fr/endroits-visiter-kenya/",
        coordinates:{      
            lat: -1.324438211871896, 
            lng: 36.85302726556032
        } 
    },
    {
        id:8,
        imagePath:"images/img_royaume_uni.jpeg",
        description:"Aller régler sa montre au Big Ben en Angleterre",
        title:"Angleterre",
        done:false,
        link:"https://generationvoyage.fr/endroits-visiter-angleterre/",
        coordinates:{       
            lat: 51.50303846710912, 
            lng: -0.12462223334653759
        } 
    },
    {
        id:9,
        imagePath:"images/img_thaillande.jpeg",
        description:"Aller pique-niquer au Wat Arun en Thaillande",
        title:"Thaillande",
        done:false,
        link:"https://generationvoyage.fr/visiter-bangkok-faire-voir/",
        coordinates:{        
            lat: 13.746532302345237, 
            lng: 100.48534185921271
        } 
    },
    {
        id:10,
        imagePath:"images/img_egypte.jpeg",
        description:"Traverser le desert blanc en dromadaire en Egypte",
        title:"Egypte",
        done:false,
        link:"https://generationvoyage.fr/endroits-visiter-egypte/",
        coordinates:{         
            lat: 29.981306992684726, 
            lng: 31.13420254164622
        } 
    },
    {
        id:11,
        imagePath:"images/img_bahamas.jpeg",
        description:"Faire une excurtion au Paradise Island au Bahamas",
        title:"Bahamas",
        done:false,
        link:"https://generationvoyage.fr/visiter-bahamas-faire-voir/",
        coordinates:{           
            lat: 25.084919145227836, 
            lng: -77.3137857341172
        } 
    },
    {
        id:12,
        imagePath:"images/img_cambodge.jpeg",
        description:"Visiter les temples d'Angkor au Cambodge",
        title:"Cambodge",
        done:false,
        link:"https://generationvoyage.fr/endroits-visiter-cambodge/",
        coordinates:{            
            lat: 11.553736432557416, 
            lng: 105.76091789713776
        } 
    },
    {
        id:13,
        imagePath:"images/img_seattle.jpeg",
        description:"Aller manger au Space Needle aux USA",
        title:"Etats-unis",
        done:false,
        link:"https://generationvoyage.fr/visiter-seattle-faire-voir/",
        coordinates:{             
            lat: 47.625555300017325, 
            lng: -122.34995776989588
        } 
    },
    {
        id:14,
        imagePath:"images/img_croatie.jpeg",
        description:"Faire du saut à l'élastique en Croatie",
        title:"Croatie",
        done:false,
        link:"https://generationvoyage.fr/parcs-nationaux-croatie/",
        coordinates:{             
            lat: 43.86928151831956, 
            lng: 15.972829941896336 
        } 
    },
    {
        id:15,
        imagePath:"images/img_tanzanie.jpeg",
        description:"Escalade jusqu'à la grotte de Kuza en Tanzanie",
        title:"Tanzanie",
        done:false,
        link:"https://generationvoyage.fr/endroits-visiter-tanzanie/",
        coordinates:{              
            lat: -6.300716641453618, 
            lng: 39.535166487081725 
        } 
    },
    {
        id:16,
        imagePath:"images/img_monaco.jpeg",
        description:"Nager dans l'aquarium de Monaco",
        title:"Monaco",
        done:false,
        link:"https://generationvoyage.fr/visiter-cote-azur-faire-voir/",
        coordinates:{               
            lat: 43.740873213007696, 
            lng: 7.423918079913598 
        } 
    },
    {
        id:17,
        imagePath:"images/img_philippine.jpeg",
        description:"Aller voir les requins baleines des Phillipines",
        title:"Phillipines",
        done:false,
        link:"https://generationvoyage.fr/plus-beaux-endroits-philippines/",
        coordinates:{                
            lat: 13.258169127396027, 
            lng: 123.68559779224228 
        } 
    },
    {
        id:18,
        imagePath:"images/img_maroc.jpeg",
        description:"Faire du quad sur les au desert du Maroc",
        title:"Maroc",
        done:false,
        link:"https://generationvoyage.fr/visiter-fes-faire-voir/",
        coordinates:{                  
            lat: 34.0047811209651,
            lng: -6.840510194111259 
        } 
    },
    {
        id:19,
        imagePath:"images/img_senegal.jpeg",
        description:"Aller voir le monument de la renaissance africaine au Sénégal",
        title:"Sénégal",
        done:false,
        link:"https://generationvoyage.fr/endroits-visiter-senegal/",
        coordinates:{                   
            lat: 14.72519244440762,
            lng: -17.494781895660193  
        } 
    },
    {
        id:20,
        imagePath:"images/img_comores.jpeg",
        description:"Faire un road Trip à Ngazidja aux Comores",
        title:"Comores",
        done:false,
        link:"https://tsilemewa.com/blogs/blog-voyage/les-10-meilleurs-endroits-a-visiter-aux-comores",
        coordinates:{                    
            lat: -11.418790012940416,
            lng: 43.41001777829655
        } 
    }
];



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
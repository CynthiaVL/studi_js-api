import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.167.1/build/three.module.js';

// Créer une div pour y ajouter notre 3D
const canvas = document.querySelector('.js-canvas');
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

// Créer une scène : espace de dessin 3D
const scene = new THREE.Scene();
scene.background = new THREE.Color('#87CEEB');

// Créer une caméra : point de vue
const aspectRatio = canvasWidth/canvasHeight;
const camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000 );

// Rendre la scène et la caméra dans la div
const renderer = new THREE.WebGLRenderer();
renderer.setSize( canvasWidth, canvasHeight );
canvas.appendChild( renderer.domElement );

// Fais le rendu de la scene : montrer le point de vue de la caméra
renderer.render( scene, camera );

//Boucle de rendu
function animate(){
    //requestAnimationFrame( animate );
}

animate();
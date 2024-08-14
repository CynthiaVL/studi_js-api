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
camera.position.z = 100;

// Rendre la scène et la caméra dans la div
const renderer = new THREE.WebGLRenderer();
renderer.setSize( canvasWidth, canvasHeight );
canvas.appendChild( renderer.domElement );

//Ajouter une forme
const geometry = new THREE.BoxGeometry( 15, 15, 15 );
const material = new THREE.MeshBasicMaterial( { color: 0xFFFF00 } );
const cube = new THREE.Mesh( geometry, material );
cube.rotation.x = Math.PI * 0.25;
cube.rotation.y = Math.PI * 0.25;
scene.add( cube );

//Boucle de rendu
function animate(){
    //Appelle la fonction animate en continu afin de créé de l'animation
    requestAnimationFrame( animate );

    //Créer la rotation du cube grâce à l'incrémentation
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Fais le rendu de la scene : montrer le point de vue de la caméra
    renderer.render( scene, camera );
}

animate();
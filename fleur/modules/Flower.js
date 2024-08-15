import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

class Flower {
    constructor(){
        this.canvas = document.querySelector('.js-canvas');
        this.canvasHeight = window.innerHeight;
        this.canvasWidth = window.innerWidth;
        this.flowerSize = 30;

        this.init()
    }

    init(){
        //Fonction pour la création du plan et le rendu
        this.createScene();
        this.createCamera();
        this.createRender();

        //Fonction pour la création des éléments
        this.createStem();
        this.createPistil();
        this.createPetals();

        //Fonction pour l'animation des éléments
        this.controlCamera();
        this.animate();
    }

    createScene(){
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('#87CEEB');
    }

    createCamera(){
        const aspectRatio = this.canvasWidth/this.canvasHeight;
        this.camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000 );
        this.camera.position.z = 100;
    }

    controlCamera(){
        this.control = new OrbitControls( this.camera, this.renderer.domElement );
        this.camera.position.set( 0, 20, 100 );
        this.control.update();
    }

    createRender(){
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( this.canvasWidth, this.canvasHeight );
        this.canvas.appendChild( this.renderer.domElement );
    }

    createStem(){
        this.stemRadiusTop = 2;
        this.stemRadiusBottom = 2;
        this.stemRadialSegments = 25;
        const geometry = new THREE.CylinderGeometry( this.stemRadiusTop, this.stemRadiusBottom, this.flowerSize, this.stemRadialSegments ); 
        const material = new THREE.MeshBasicMaterial( {color: 0x23d60e } ); 
        this.stem = new THREE.Mesh( geometry, material ); 
        this.scene.add( this.stem );
    }

    createPistil(){
        this.pistilRadius = 5;
        this.pistilWidthSegments = 32;
        this.pistilHeightSegments = 16;
        const geometry = new THREE.SphereGeometry( this.pistilRadius, this.pistilWidthSegments, this.pistilHeightSegments ); 
        const material = new THREE.MeshBasicMaterial( { color: 'yellow' } ); 
        this.pistil = new THREE.Mesh( geometry, material );
        this.pistil.position.y = this.flowerSize / 2;
        this.scene.add( this.pistil );
    }

    createPetals(){
        this.petalRadius = 4;
        this.petalTube = 1;
        this.petalRadialSegments = 16;
        this.petalTubularSegments = 100;
        const geometry = new THREE.TorusGeometry( this.petalRadius, this.petalTube, this.petalRadialSegments, this.petalTubularSegments ); 
        const material = new THREE.MeshBasicMaterial( { color: 'red' } );

        const positionX = [-4.8, 0, 4.8, 0];
        const positionZ = [0, -4.8, 0, 4.8];
        const rotationY = [-30, 0, 30, 0];
        const rotationX = [90, 120, 90, 60];

        for (let i = 0; i < 4; i++) {
            this.petal = new THREE.Mesh( geometry, material );
            this.petal.position.y = this.flowerSize / 2;
            this.petal.position.x = positionX[i];
            this.petal.position.z = positionZ[i];
            this.petal.rotation.x = THREE.MathUtils.degToRad(rotationX[i]);
            this.petal.rotation.y = THREE.MathUtils.degToRad(rotationY[i]);
            this.scene.add( this.petal );
        }

    }

    animate(){
        //Appelle la fonction animate en continu afin de créé de l'animation
        requestAnimationFrame( this.animate.bind(this) );

        // Permet à l'utilisateur d'utiliser control
        this.control.update();

        // Fais le rendu de la scene : montrer le point de vue de la caméra
        this.renderer.render( this.scene, this.camera );
    }
}

export { Flower }
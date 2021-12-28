import * as THREE from './libs/three.module.js';
let camera, scene, renderer, geometry, material, flagArrowLeft = false, flagArrowRight = false; 
// once everything is loaded, we run our Three.js stuff

window.onload = function init() {

    // create an empty scene, that will hold all our elements (objects, cameras and lights)
    scene = new THREE.Scene();

    // create a camera, which defines where we're looking at
    const aspect = window.innerWidth / window.innerHeight;

    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000); // perspective camera

    camera.position.x = 0
    camera.position.y = -20;
    camera.position.z = 10 // place the camera using world coordinates
    camera.lookAt(scene.position); //point the camera to the center of the scene

    // create a renderer: if no Canvas parameter is passed, a new canvas element will be created
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight); // set output canvas and viewport size

    renderer.setClearColor("#FF0000"); // configure clear color (background color)


    geometry = new THREE.BoxGeometry(2, 2, 2);
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.y = -10
    scene.add(cube);


    // immediately use the texture for material creation
    const texture = new THREE.TextureLoader().load('textures/floor.jpg.jpg');

    geometry = new THREE.PlaneGeometry(50, 3000);
    material = new THREE.MeshBasicMaterial({ map: texture })
    const plane = new THREE.Mesh(geometry, material);
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = -5;
    scene.add(plane);
    renderer.setAnimationLoop(render);

    document.onkeydown = function (e) {
        switch (e.key) {
            case 'ArrowUp':
                // up arrow
                break;
            case 'ArrowDown':
                // down arrow
                break;
            case 'ArrowLeft':
                flagArrowLeft = true;
                break;
            case 'ArrowRight':
                flagArrowRight = true;
                break;
        }
    };


    function render() {
        console.log(plane.position)

        plane.position.y--;

        if (plane.position.y < -2500) {
            plane.position.y = 2500
        }

        if (flagArrowLeft) {
            cube.position.x -= 0.25;
            if (cube.position.x <= -10) {
                flagArrowLeft = false
            }
        }
        
        
        if (flagArrowRight) {
            cube.position.x += 0.25;
            if (cube.position.x >= 10) {
                flagArrowRight = false
            }
        }

        renderer.render(scene, camera);
    };


    // add the output of the renderer to an HTML element (adds a Canvas element to the body)
    document.body.appendChild(renderer.domElement);
}
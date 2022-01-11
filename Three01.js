import * as THREE from './libs/three.module.js';
let camera, scene, renderer, geometry, material, flagArrowLeft = false, flagArrowRight = false, flagArrowUp = false, jumpInterval, leftInterval, rightInterval
let goingUp = false, goingLeft = false, goingRight = false ,isAtCenter = true;
let cx = 0; let cy = -20; let cz = 10;
const posY = [-10, 0, 10]
// once everything is loaded, we run our Three.js stuff

window.onload = function init() {

    // create an empty scene, that will hold all our elements (objects, cameras and lights)
    scene = new THREE.Scene();

    // create a camera, which defines where we're looking at
    const aspect = window.innerWidth / window.innerHeight;

    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000); // perspective camera

    camera.position.x = cx
    camera.position.y = cy;
    camera.position.z = cz // place the camera using world coordinates
    camera.lookAt(scene.position); //point the camera to the center of the scene

    // create a renderer: if no Canvas parameter is passed, a new canvas element will be created
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight); // set output canvas and viewport size

    renderer.setClearColor("#FF0000"); // configure clear color (background color)


    geometry = new THREE.BoxGeometry(2, 2, 2);
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = cy + 10;
    cube.position.z = 0;
    scene.add(cube);


    // immediately use the texture for material creation
    const texture = new THREE.TextureLoader().load('textures/floor.jpg');

    geometry = new THREE.PlaneGeometry(50, 20000);
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
                flagArrowUp = true;
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

    function jump() {
        if (cube.position.z > 8) {
            goingUp = false;
        }
        if (goingUp)
            cube.position.z += 0.2;
        if (!goingUp) {
            cube.position.z -= 0.2;
            if (cube.position.z < 0) {
                clearInterval(jumpInterval);
            }
        }
    }
    function turnLeft() {
        if (cube.position.x <= -9.9 || cube.position.x >= 10){
            isAtCenter=false;
        }
        if(isAtCenter){
                cube.position.x -= 0.2;
            if(cube.position.x <= -10){
                clearInterval(leftInterval);
            }
        }
        if(!isAtCenter){
            cube.position.x -= 0.2
            if(cube.position.x <=0){
                console.log(isAtCenter);
               isAtCenter = true && clearInterval(leftInterval);
                
            }
        }
    }

    function turnRight() {
        if (cube.position.x <= -9.9 || cube.position.x >= 10){
            isAtCenter=false;
            console.log(isAtCenter)
        }
        if(isAtCenter){
                cube.position.x += 0.2;
            if(cube.position.x >= 10){
                clearInterval(rightInterval);
            }
        }
        if(!isAtCenter){
            cube.position.x += 0.2
            if(cube.position.x <=0){
               isAtCenter = true && clearInterval(rightInterval);
                
            }
        }
    }
    function render() {

        cube.position.y++;
        camera.position.y++;

        if (flagArrowLeft) {
            flagArrowLeft = false;
            goingLeft = true;
            leftInterval = setInterval(turnLeft, 10);
        }

        if (flagArrowRight) {
            flagArrowRight = false;
            goingRight = true;
            rightInterval = setInterval(turnRight, 10);

        }
        if (flagArrowUp) {
            flagArrowUp = false;
            goingUp = true;
            jumpInterval = setInterval(jump, 15)
        }

        renderer.render(scene, camera);
    };


    // add the output of the renderer to an HTML element (adds a Canvas element to the body)
    document.body.appendChild(renderer.domElement);
}
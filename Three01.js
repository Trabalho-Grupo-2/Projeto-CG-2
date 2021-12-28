import * as THREE from './libs/three.module.js';
let camera, scene, renderer;
// once everything is loaded, we run our Three.js stuff

window.onload = function init() {

    // create an empty scene, that will hold all our elements (objects, cameras and lights)
    scene = new THREE.Scene();

    // create a camera, which defines where we're looking at
    const aspect = window.innerWidth / window.innerHeight;

    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000); // perspective camera

    camera.position.x = camera.position.y = 0;
    camera.position.z = 0 // place the camera using world coordinates
    camera.lookAt(scene.position); //point the camera to the center of the scene

    // create a renderer: if no Canvas parameter is passed, a new canvas element will be created
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight); // set output canvas and viewport size

    renderer.setClearColor("#0000FF"); // configure clear color (background color)

    let geometry = new THREE.PlaneGeometry(100 , 0.1);
    let material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    renderer.setAnimationLoop(render);


    function render() {
        console.log(plane.position)
        renderer.render(scene, camera);
    };


    // add the output of the renderer to an HTML element (adds a Canvas element to the body)
    document.body.appendChild(renderer.domElement);
}
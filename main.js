import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { dl, goFullScreen, rotate180, zoom, zoomToPosition } from './helpers';

function init(){
const el = document.getElementById("model-viewer")

const zoomInButton = document.getElementById("zoom-in")
const zoomOutButton = document.getElementById("zoom-out")
const rotateButton = document.getElementById("rotate")
const fullscreenButton = document.getElementById("fullscreen")

 if(el){
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, el.offsetWidth / el.offsetHeight, 0.1, 1000 );
  const renderer = new THREE.WebGLRenderer();
  const controls = new OrbitControls( camera, renderer.domElement );
  const loader = new GLTFLoader();
  const light = new THREE.AmbientLight( 0xffffff, 200 );
  
  
  let model = null
  let modelUrl = el.dataset.modelUrl
  scene.background = new THREE.Color("rgb(210, 210, 210)")
  scene.add( light );
  scene.add(dl(0,2,0,THREE))
  scene.add(dl(2,0,0,THREE))
  scene.add(dl(0,0,2,THREE))
  scene.add(dl(0,-2,0,THREE))
  scene.add(dl(0,0,-2,THREE))
  scene.add(dl(-2,0,0,THREE))

  if(modelUrl){
    loader.load( modelUrl, function ( gltf ) {
    
      gltf.scene.scale.x =2
      gltf.scene.scale.y =2
      gltf.scene.scale.z =2
      scene.add( gltf.scene );
      model = gltf.scene
    
    }, undefined, function ( error ) {
    
      console.error( error );
    
    } );
  }
  else{
    console.log(`Please provide a source to your model url using the "data-model-url" attribute on the element with id of "model-viewer"`)
  }
  
  
  camera.position.z = 5;
  renderer.setSize( el.offsetWidth, el.offsetHeight );
  el.appendChild( renderer.domElement );
  
  // controls.autoRotate = true
  controls.autoRotate = true
  controls.autoRotateSpeed = 10
  controls.maxDistance = 8
  
  // controls.zoomToCursor = true
  controls.update();
  
  zoomInButton.addEventListener('click',()=>{
    zoom(controls,"in")
  }) 
  zoomOutButton.addEventListener('click',()=>{
    zoom(controls,"out")
  })  
  rotateButton.addEventListener('click',()=>{
    rotate180(model)
  })  
  fullscreenButton.addEventListener('click',()=>{
    goFullScreen(el)
  })
   window.addEventListener('click',(e)=>{
      console.log(el.offsetWidth,el.offsetHeight)
      let x = (e.clientX/el.offsetWidth) * 2 - 1
      let y = (e.clientY / el.offsetHeight) * 2 + 1
      zoomToPosition(camera,{
        x,
        y      
       })
    })
    window.addEventListener('resize',()=>{
      camera.aspect = el.offsetWidth / el.offsetHeight
      camera.updateProjectionMatrix()
      renderer.setSize(el.offsetWidth, el.offsetHeight)
    })
  
  function animate() {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
  }
  animate();
 }else{
  console.log(`Please Create a container with an ID of  "model-viewer" to enable your model viewer`)
 }

}

window.addEventListener('load',()=>{
  init()
})
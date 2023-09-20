import gsap from "gsap"

export function zoomToPosition(camera,{x,y,controls}){
    gsap.to(camera.position,{
     y,
     x,
     duration:2,
     onComplete:()=>{
      if(controls){
        controls.autoRotate = false
        controls.minDistance = 0
        controls.update()
      }
     }
   })
 }
 
 export function zoom(controls,type){
  if(type === "in"){
   gsap.to(controls, {
     maxDistance: 2, // target min distance
     duration: 1,
     overwrite: 'auto',
     ease: 'power1.inOut',
     onComplete: () => {
         controls.autoRotate = false
         controls.maxDistance = 8
         controls.update()
          // reset to initial min distance
     },
   })
  }
  else{
   gsap.to(controls, {
     minDistance: 6, // target min distance
     duration: 1,
     overwrite: 'auto',
     ease: 'power1.inOut',
     onComplete: () => {
         controls.autoRotate = false
         controls.update()
         controls.minDistance = 0 // reset to initial min distance
     },
   })
  }
 }
 
 export function rotate180(model){
   gsap.to(model.rotation,{
     duration: 4,
     y:model.rotation.y + Math.PI
   })
 }
 export function rotateReverse180(model){
   gsap.to(model.rotation,{
     duration: 4,
     y:model.rotation.y - Math.PI
   })
 }

 
export function dl(x,y,z,THREE){
    const dLight = new THREE.DirectionalLight(0xffffff, 2)
    dLight.position.set(x,y,z)
    return dLight
   }
 
   export function goFullScreen(elem){
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
   }
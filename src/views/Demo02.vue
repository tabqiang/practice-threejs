<template>
  <div ref="containerRef2"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const aspect = window.innerWidth / window.innerHeight

const containerRef2 = ref(null)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, aspect, 1, 200)
camera.position.set(2, 3, 25)

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const planeGeometry = new THREE.PlaneGeometry(20, 20)
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.position.set(0, -3, 0)
plane.rotation.x = -Math.PI / 2
plane.receiveShadow = true
scene.add(plane)

const clipPlanes = [
  new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0),
  new THREE.Plane(new THREE.Vector3(0, -1, 0), 0),
  new THREE.Plane(new THREE.Vector3(0, 0, -1), 0)
]
function createSphereGroup(radius) {
  const _group = new THREE.Group()
  for (let i = 0; i < 8; i++) {
    const geometry = new THREE.SphereGeometry(0.4 * i, 42, 24)
    const material = new THREE.MeshLambertMaterial({
      color: new THREE.Color().setHSL(
        Math.random(),
        0.5,
        0.5,
        THREE.SRGBColorSpace
      ),
      side: THREE.DoubleSide,
      clippingPlanes: clipPlanes,
      clipIntersection: true,
      wireframe: i % 2 === 1
    })
    const sphere = new THREE.Mesh(geometry, material)
    sphere.castShadow = true //default is false
    sphere.receiveShadow = false
    _group.add(sphere)
  }
  return _group
}
const sphereGroup = createSphereGroup(2)
sphereGroup.castShadow = true
scene.add(sphereGroup)

const dLight = new THREE.DirectionalLight(0xffffff, 1)
dLight.position.set(0, 10, 0)
dLight.castShadow = true
dLight.shadow.mapSize.width = 512 // default
dLight.shadow.mapSize.height = 512 // default
dLight.shadow.camera.near = 1 // default
dLight.shadow.camera.far = 50 // default
scene.add(dLight)

const Alight = new THREE.AmbientLight(0x404040)
scene.add(Alight)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth - 200, window.innerHeight - 64)
renderer.localClippingEnabled = true

const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', render)
// controls.minDistance = 1
// controls.maxDistance = 10
controls.enablePan = false
function render() {
  console.log(2222)
  renderer.render(scene, camera)
}
render()

onMounted(() => {
  containerRef2.value.appendChild(renderer.domElement)
  console.log(renderer)
})
</script>

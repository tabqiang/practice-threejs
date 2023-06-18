<template>
  <div></div>
</template>

<script setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

const gui = new dat.GUI()
// 1、创建场景
const scene = new THREE.Scene()

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
)

// 设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)

const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20)
const material = new THREE.MeshStandardMaterial()
const sphere = new THREE.Mesh(sphereGeometry, material)
// 投射阴影
sphere.castShadow = true
scene.add(sphere)

const planeGeometry = new THREE.PlaneBufferGeometry(10, 10)
const plane = new THREE.Mesh(planeGeometry, material)
plane.position.set(0, -1, 0)
plane.rotation.x = -Math.PI / 2
plane.receiveShadow = true
scene.add(plane)

const light = new THREE.AmbientLight(0xffffff, 0.3)
scene.add(light)
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(7, 7, 7)
directionalLight.castShadow = true
directionalLight.shadow.radius = 10
directionalLight.shadow.mapSize.set(4096, 4096)

// 设置平行光投射相机的属性
directionalLight.shadow.camera.near = 0.5
directionalLight.shadow.camera.far = 50
directionalLight.shadow.camera.top = 5
directionalLight.shadow.camera.bottom = -5
directionalLight.shadow.camera.left = -5
directionalLight.shadow.camera.right = 5

scene.add(directionalLight)
gui
  .add(directionalLight.shadow.camera, 'near')
  .min(0)
  .max(10)
  .step(0.1)
  .onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix()
  })

gui
  .add(directionalLight.shadow.camera, 'far')
  .min(0)
  .max(50)
  .step(5)
  .onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix()
  })

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
let a = 1
setInterval(() => {
  console.log(a)
  a = 0
}, 1000)
function render() {
  a++
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()
</script>

<style lang="less" scoped></style>

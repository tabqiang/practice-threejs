<template>
  <div ref="containerRef"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const containerRef = ref(null)
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import gsap from 'gsap'

import * as dat from 'dat.gui'

const gui = new dat.GUI()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
)
camera.position.set(0, 0, 10)
scene.add(camera)

const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20)
const material = new THREE.MeshStandardMaterial()
const sphere = new THREE.Mesh(sphereGeometry, material)
// 投射阴影
sphere.castShadow = true
scene.add(sphere)

// 创建平面
const planeGeometry = new THREE.PlaneBufferGeometry(10, 10)
const plane = new THREE.Mesh(planeGeometry, material)
plane.position.set(0, -1, 0)
plane.rotation.x = -Math.PI / 2

// 接收阴影
plane.receiveShadow = true
scene.add(plane)

// 灯光

// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
scene.add(light)
// 直线光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(10, 5, 0)
directionalLight.castShadow = true

// 设置阴影贴图模糊度
directionalLight.shadow.radius = 20
// 设置阴影贴图的分辨率
directionalLight.shadow.mapSize.set(4096, 4096)
// console.log(directionalLight.shadow);

// 设置平行光投射相机的属性
directionalLight.shadow.camera.near = 0.5
directionalLight.shadow.camera.far = 500
directionalLight.shadow.camera.top = 5
directionalLight.shadow.camera.bottom = -5
directionalLight.shadow.camera.left = -5
directionalLight.shadow.camera.right = 5

scene.add(directionalLight)

const lightBall = new THREE.PointLight('red', 0.5)
scene.add(lightBall)
const smallBall = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.1, 10, 10),
  new THREE.MeshBasicMaterial({ color: 'red' })
)
smallBall.add(lightBall)
smallBall.position.set(2, 2, 2)
scene.add(smallBall)

// gui
//   .add(directionalLight.shadow.camera, 'near')
//   .min(0)
//   .max(10)
//   .step(0.1)
//   .onChange(() => {
//     directionalLight.shadow.camera.updateProjectionMatrix()
//   })

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true

onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
controls.enableDamping = true

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
// 设置时钟
const clock = new THREE.Clock()

function render() {
  let time = clock.getElapsedTime()
  smallBall.position.x = Math.sin(time) * 3
  smallBall.position.z = Math.cos(time) * 3
  controls.update()
  renderer.render(scene, camera)
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render)
}

render()

// 监听画面变化，更新渲染画面
window.addEventListener('resize', () => {
  //   console.log("画面变化了");
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix()

  //   更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight)
  //   设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio)
})
</script>

<style lang="less" scoped></style>

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
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
camera.position.set(0, 0, 10)

// 创建平面
const planeGeometry = new THREE.PlaneGeometry(10, 10)
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.position.set(0, -1, 0)
plane.rotation.x = -Math.PI / 2

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const clipPlanes = [
  new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0),
  new THREE.Plane(new THREE.Vector3(0, -1, 0), 0),
  new THREE.Plane(new THREE.Vector3(0, 0, -1), 0)
]
function createSphereGroup(radius) {
  const _group = new THREE.Group()
  for (let i = 0; i < 10; i++) {
    const geometry = new THREE.SphereGeometry(0.3 * i, 1000, 1000)
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(
        Math.random(),
        0.5,
        0.5,
        THREE.SRGBColorSpace
      ),
      side: THREE.DoubleSide,
      clippingPlanes: clipPlanes,
      clipIntersection: true
    })
    const sphere = new THREE.Mesh(geometry, material)
    _group.add(sphere)
  }
  return _group
}
const sphereGroup = createSphereGroup(2)
scene.add(sphereGroup)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth - 200, window.innerHeight - 64)
renderer.localClippingEnabled = true

const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', render)
controls.enableDamping = true
function render() {
  renderer.render(scene, camera)
}
render()

onMounted(() => {
  containerRef2.value.appendChild(renderer.domElement)
  console.log(renderer)
})
</script>

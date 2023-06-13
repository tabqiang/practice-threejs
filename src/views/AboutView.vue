<template>
  <div></div>
</template>

<script setup>
import * as THREE from 'three'
import { GUI } from 'dat.gui'

// initialize the tools
const gui = new GUI()

// 1. Create scene
const scene = new THREE.Scene()

// 2. Create camera
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01,
  10
)
camera.position.z = 1

const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3)

const material = new THREE.MeshNormalMaterial()

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

gui
  .add(scene.rotation, 'x')
  .min(0)
  .max(100)
  .name('x轴')
  .onChange(value => {
    console.log(value)
  })
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
// renderer.setAnimationLoop(animation);
document.body.appendChild(renderer.domElement)

// animation

function animation(time) {
  mesh.rotation.x = time / 2000
  mesh.rotation.y = time / 2000

  renderer.render(scene, camera)
}
</script>

<style lang="less" scoped></style>

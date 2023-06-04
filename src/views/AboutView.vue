<template>
  <div></div>
</template>

<script setup>
import * as THREE from "three";
import { GUI } from "dat.gui";

// 实例化GUI
const gui = new GUI();
// init

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01,
  10
);
camera.position.z = 1;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

gui
  .add(scene.rotation, "x")
  .min(0)
  .max(100)
  .name("x轴")
  .onChange((value) => {
    console.log(value);
  });
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animation);
document.body.appendChild(renderer.domElement);

// animation

function animation(time) {
  mesh.rotation.x = time / 2000;
  mesh.rotation.y = time / 2000;

  renderer.render(scene, camera);
}
</script>

<style lang="less" scoped></style>

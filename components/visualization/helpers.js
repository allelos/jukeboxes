import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Mesh,
  IcosahedronGeometry,
  MeshLambertMaterial,
  PointLight,
  Vector3,
} from "three"
import { createNoise2D } from "simplex-noise"
import { max } from "../visualizations/utilities"

export const renderer = new WebGLRenderer({ alpha: true, antialias: false })
renderer.setSize(window.innerWidth, window.innerHeight)

const scene = new Scene()
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight)

camera.position.set(0, 0, 50)

const geometry = new IcosahedronGeometry(10, 25)
const material = new MeshLambertMaterial({
  color: 0xffffff,
  wireframe: true,
})

const sphere = new Mesh(geometry, material)

const topLight = new PointLight(0xffffff, 1, 500)
const bottomLight = new PointLight(0xffffff, 1, 250)
const rightLight = new PointLight(0xffffff, 1.25, 250)
const leftLight = new PointLight(0xffffff, 0.5, 250)

topLight.position.set(0, 20, 17)
bottomLight.position.set(0, -20, 17)
rightLight.position.set(25, -20, 10)
leftLight.position.set(-25, 20, 10)

scene.add(sphere)
scene.add(topLight)
scene.add(bottomLight)
scene.add(rightLight)
scene.add(leftLight)

const modulate = (val, minVal, maxVal, outMin, outMax) => {
  const fr = (val - minVal) / (maxVal - minVal)
  const delta = outMax - outMin
  return outMin + fr * delta
}

const noise2d = createNoise2D()

const getBall = (mesh, audioData) => {
  const halfArray = Math.floor(audioData.length / 2)
  const lowerHalf = audioData.slice(0, halfArray)
  const upperHalf = audioData.slice(halfArray, audioData.length)

  const lowerMax = max(lowerHalf)
  const upperMax = max(upperHalf)

  const bass = modulate(lowerMax * 0.0275, 0, 1, 0, 2)
  const treble = modulate(upperMax * 0.01, 0, 1, 0, 2)

  const offset = mesh.geometry.parameters.radius
  const positions = mesh.geometry.attributes.position.array

  for (let i = 0; i < positions.length; i += 3) {
    const vector = new Vector3(positions[i], positions[i + 1], positions[i + 2])

    vector.normalize()

    const radius = offset + bass + noise2d(vector.x * treble * 0.75, vector.y * treble * 0.75)

    vector.multiplyScalar(radius)

    Object.keys(vector).forEach((key, index) => (positions[i + index] = vector[key]))
  }

  mesh.geometry.attributes.position.needsUpdate = true
  mesh.geometry.verticesNeedUpdate = true
  mesh.geometry.normalsNeedUpdate = true
  mesh.geometry.computeVertexNormals()
}

let hideAnimation = false

export const animate = (audioData) => {
  if (hideAnimation) return

  getBall(sphere, audioData)

  sphere.rotation.x += 0.005
  sphere.rotation.y += 0.005
  sphere.rotation.z += 0.005

  renderer.render(scene, camera)
}

export const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

export const onVisibility = () => {
  hideAnimation = document.hidden
}

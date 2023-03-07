<template>
  <div id='guide' @click.prevent.stop='handleGuide'>
    <svg-icon icon='guide'></svg-icon>
  </div>
</template>

<script setup>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { onMounted } from 'vue'
import { setps } from './setps'

let driver
onMounted(() => {
  driver = new Driver({
    animate: false, // Whether to animate or not
    opacity: 0.75, // Background opacity (0 means only popovers and without overlay)
    padding: 10, // Distance of element from around the edges
    allowClose: true, // Whether the click on overlay should close or not
    overlayClickNext: false, // Whether the click on overlay should move next
    doneBtnText: 'Done', // Text on the final button
    closeBtnText: 'Close', // Text on the close button for this step
    stageBackground: '#ffffff', // Background color for the staged behind highlighted element
    nextBtnText: 'Next', // Next button text for this step
    prevBtnText: 'Previous' // Previous button text for this step
  })
})

const handleGuide = () => {
  driver.defineSteps(setps)
  driver.start()
}

</script>

<style scoped>

</style>

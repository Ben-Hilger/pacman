<script setup lang="ts">
import GridLayout from "@/components/GridLayout.vue"
import {onMounted} from "vue";
import usePacman from "@/composable/Pacman";
import ClassicLayout from "@/layouts/ClassicLayout";

const { setup, move, gridLayoutRef } = usePacman()

const keyMap = new Map<string, number[]>([
  ["ArrowUp", [0, -1]],
  ["ArrowDown", [0, 1]],
  ["ArrowLeft", [-1, 0]],
  ["ArrowRight", [1, 0]],
])

onMounted(() => {

  setup(new ClassicLayout());
  window.addEventListener("keydown", (event: KeyboardEvent) => {

    if (keyMap.has(event.key)) {
      const [xDelta, yDelta] = keyMap.get(event.key) as number[]
      move(xDelta, yDelta);
    }

  })
});

</script>

<template>
  <div class="flex w-screen h-screen items-center justify-center">
  <grid-layout v-bind:grid="gridLayoutRef" />
  </div>
</template>


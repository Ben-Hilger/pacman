<script setup lang="ts">
import type {PropType} from "vue";
import { type GameTile, Ghost} from "@/composable/Pacman"

defineProps({
  grid: {
    type: Array as PropType<Array<Array<GameTile>>>,
    required: true
  }
})

function getGridBoxTexture(gameTile: GameTile) {
  if (gameTile.item === "wall") {
    return "bg-blue-800";
  } else if (gameTile.spaceOccupied === 'user') {
    return "bg-yellow-400";
  } else if (gameTile.spaceOccupied instanceof Ghost) {
    return gameTile.spaceOccupied.color;
  }

  return "w-full"
}

</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-row" v-for="(gridRow, index) in grid" v-bind:key="index">
      <div v-for="(gridItem, index2) in gridRow" v-bind:key="index2">
        <div
            v-bind:class="getGridBoxTexture(gridItem)"
            class="grid-box rounded">
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.grid-box {
  width: 2rem;
  height: 2rem;
  border: 1px solid black;
}
</style>

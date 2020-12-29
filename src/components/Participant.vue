<template>
  <div class="fl center w-100">
    <div class="pa2">Score: {{ stars }}</div>
    <img
      v-bind:class="{
        winner: true,
        'w-20': true,
        'o-10': true,
        'winner-load': beginAnimate,
      }"
      :src="imagePath"
      alt=""
    />
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";

export default {
  props: {
    totalStars: Number,
    imagePath: String,
  },
  setup(props) {
    const stars = ref(0);
    const beginAnimate = ref(false);
    let incrementStars = () => stars.value++;

    let offset = Math.floor(props.totalStars / 10);
    let offset2 = Math.floor(props.totalStars / 40);
    let intervalId = window.setInterval(incrementStars, 10);

    watchEffect(() => {
      // anim counter 1:
      if (stars.value == props.totalStars - offset) {
        clearInterval(intervalId);
        intervalId = window.setInterval(incrementStars, 40);
      }

      // anim counter 2:
      if (stars.value == props.totalStars - offset2) {
        clearInterval(intervalId);
        intervalId = window.setInterval(incrementStars, 200);
      }

      // anim counter 3:
      if (stars.value == props.totalStars) {
        clearInterval(intervalId);
        beginAnimate.value = true;
      }
    });

    return {
      stars,
      beginAnimate,
    };
  },
};
</script>

<style scoped>
div {
  color: white;
}

img {
  /* width: 86px; */
  min-height: 86px;
}

.winner {
  -webkit-transition: opacity 0.5s ease-in;
  -moz-transition: opacity 0.5s ease-in;
  -ms-transition: opacity 0.5s ease-in;
  -o-transition: opacity 0.5s ease-in;
  transition: opacity 0.5s ease-in;
}

.winner-load {
  opacity: 0.8;
}
</style>
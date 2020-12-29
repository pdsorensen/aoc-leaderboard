<template>
  <div>
    <img src="../assets/images/shape1.svg" />
    <img src="../assets/images/shape2.svg" />
    <img src="../assets/images/shape3.svg" />
  </div>
</template>

<style scoped>
div {
  position: absolute;
  bottom: 10%;
  width: 100%;
  margin-right: 50px;
}

img {
  margin-right: 50px;
  width: 5%;
  animation-name: ckw;
  animation-duration: 45s;
  animation-iteration-count: infinite;
  transform-origin: 50% 50%;
  display: inline-block;
}

@keyframes ckw {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
<template>
  <div>
    <transition name="fade" mode="out-in">
      <div class="fl" v-if="people.length == 0"></div>
      <div v-else class="fl">
        <div class="w-30 dib pa2" v-for="(member, key) in people" :key="key">
          <Participant :imagePath="member.image" :totalStars="member.score" />
        </div>
      </div>
    </transition>

    <StarBackground />
    <RotatingCubes />
  </div>
</template>

<script>
import { ref, computed } from "vue";

import StarBackground from "./components/StarBackground";
import RotatingCubes from "./components/RotatingCubes";
import Participant from "./components/Participant";

const getImagePath = (key) => {
  // match users by keynames in AoC names and upload images
  switch (key) {
    case "pdsorensen":
      return require("./assets/images/people/patrikk.jpg");
  }
};

export default {
  components: {
    RotatingCubes,
    StarBackground,
    Participant,
  },
  methods: {},
  setup() {
    // since jsons are blocked by CORS, we need to fetch this through something else, e.g azure http function or api gateway
    let url = "https://link-to-your-proxy.com";

    const response = ref({ members: [] });

    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        response.value = data;
      });

    const people = computed(() => {
      let people = [];
      for (const key in response.value.members) {
        let name = response.value.members[key].name;
        let score = response.value.members[key].local_score;

        people = people.concat({
          image: getImagePath(name),
          score,
          name,
        });
      }

      return people;
    });

    return {
      response,
      people,
    };
  },
};
</script>

<style>
p {
  font-family: "Source Code Pro", monospace;
  color: white;
}

#app {
  font-family: "Source Code Pro", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

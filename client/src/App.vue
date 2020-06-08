<template>
  <div id="app" class="flex flex-col select-none w-screen h-screen">
    <router-view class="px-4 py-2" />
    <div class="fixed m-4 p-4 rounded-full bg-blue-400 text-white right-0 bottom-0" @click="top" v-if="this.$route.name === 'Home'">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-arrow-up"
      >
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["init"]),
    top: function() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
#app {
  font-family: "Roboto", sans-serif;
}
</style>

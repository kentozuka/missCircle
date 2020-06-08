<template>
  <div id="app" class="flex flex-col select-none">
    <router-view class="px-4 py-2" />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(['init']) 
  },
  mounted() {
    this.init()
  }
};
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
}
</style>

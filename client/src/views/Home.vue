<template>
  <div>
    <Navigation />
    <Selector />
    <div class="flex flex-col" v-if="selected === 'total'">
      <ListItem v-for="(item, index) of all" :key="item._id" :item="item" :index="index" :type="'total'" />
    </div>
    <div class="flex flex-col" v-else-if="selected === 'compare'">
      <ListItem v-for="(item, index) of compare" :key="item._id" :item="item" :index="index" :type="'compare'" />
    </div>
    <div class="flex flex-col" v-else-if="selected === 'showroom'">
      <ListItem v-for="(item, index) of showroom" :key="item._id" :item="item" :index="index" :type="'showroom'" />
    </div>
    <div class="flex flex-col" v-else-if="selected === 'instagram'">
      <ListItem v-for="(item, index) of instagram" :key="item._id" :item="item" :index="index" :type="'instagram'" />
    </div>
    <div class="flex flex-col" v-else-if="selected === 'twitter'">
      <ListItem v-for="(item, index) of twitter" :key="item._id" :item="item" :index="index" :type="'twitter'" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navigation from "../components/Navigation";
import ListItem from "../components/ListItem";
import Selector from "../components/Selector";

export default {
  components: {
    ListItem,
    Selector,
    Navigation
  },
  computed: {
    ...mapGetters({
      all: "all",
      compare: "compare",
      showroom: "showroom",
      twitter: "twitter",
      instagram: "instagram",
      selected: "selected"
    })
  }
};
</script>

<style scoped>
</style>
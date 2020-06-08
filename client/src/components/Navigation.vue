<template>
  <div class="w-full h-16 bg-white flex items-center px-4">
    <h3 class="text-lg font-bold my-auto">{{title}}</h3>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed:{
    ...mapGetters(['selected']),
    title: function () {
      const x = this.selected
      let title = ''
      switch (x) {
        case 'total':
          title = '総合ランキング'
          break;
        case 'compare':
          title = '前日比ランキング'
          break;
        case 'showroom':
          title = 'Showroomランキング'
          break;
        case 'instagram':
          title = 'Instagramランキング'
          break;
        case 'twitter':
          title = 'Twitterランキング'
          break;
      }
      return title
    }
  }
};
</script>

<style>
</style>
<template>
  <div class="flex items-center py-4 border-b hover:bg-gray-100" @click="go(item.entry_id)" :id="item.entry_id">
    <div class="w-1/12 text-xs flex flex-col justify-center items-center mr-2">
      <span
        class="mb-1"
        v-show="index < 3"
        :class="{ 'gold': index === 0, 'silver': index === 1, 'copper': index === 2 }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      </span>
      <p v-show="index > 2">{{index + 1}}</p>
      <p v-show="index > 2">位</p>
    </div>
    <img :src="item.image" alt class="w-3/12 rounded-lg" />
    <div class="w-8/12 ml-4 truncate">
      <div class="mb-1">
        <h3 class="font-bold">{{item.public_name}}</h3>
        <p class="text-sm text-gray-800">{{item.university}}</p>
      </div>
      <p class="text-sm" v-if="type ==='total' || type === 'compare'">
        <span>総合フォローワー</span>
        {{num(item.total)}}
        <span>人</span>
      </p>
      <p class="text-sm" v-if="type ==='showroom'">
        <span>Showroom</span>
        {{num(item.showroom.length ? item.showroom[item.showroom.length - 1].followers : 0)}}
        <span>人</span>
      </p>
      <p class="text-sm" v-if="type ==='instagram'">
        <span>Instagram</span>
        {{num(item.instagram.length ? item.instagram[item.instagram.length - 1].followers : 0)}}
        <span>人</span>
      </p>
      <p class="text-sm" v-if="type ==='twitter'">
        <span>Twitter</span>
        {{num(item.twitter.length ? item.twitter[item.twitter.length - 1].followers : 0)}}
        <span>人</span>
      </p>

      <p class="text-sm flex items-center">
        <span class="text-red-400" v-if="diff < 0">
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
          >
            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
            <polyline points="17 18 23 18 23 12" />
          </svg>
        </span>
        <span class="text-green-400" v-else-if="diff > 0">
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
          >
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
        </span>
        <span class="text-gray-400" v-else>
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
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
        <span class="ml-2">{{num(diff)}}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item", "index", "type"],
  methods: {
    num: function(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    go: function(x) {
      this.$router.replace(`/about/${x}`);
    }
  },
  computed: {
    diff: function() {
      let result = "";
      switch (this.type) {
        case "showroom":
          result =
            this.item.showroom.length == 2
              ? this.item.showroom[1].followers -
                this.item.showroom[0].followers
              : 0;
          break;
        case "instagram":
          result =
            this.item.instagram.length == 2
              ? this.item.instagram[1].followers -
                this.item.instagram[0].followers
              : 0;
          break;
        case "twitter":
          result =
            this.item.twitter.length == 2
              ? this.item.twitter[1].followers - this.item.twitter[0].followers
              : 0;
          break;
        default:
          result = this.item.compare;
      }
      return result;
    }
  }
};
</script>

<style>
.gold {
  color: #f7da41;
}
.silver {
  color: #c0c0c0;
}
.copper {
  color: #b87333;
}
</style>
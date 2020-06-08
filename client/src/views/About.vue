<template>
  <div class="about py-4">
    <div class="w-full flex mb-4">
      <router-link to="/" class="rounded-full hover:bg-gray-200 p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </router-link>
    </div>
    <div class="flex">
      <img :src="dt.image" alt="thumbnail" class="w-1/3 rounded-lg object-cover" />
      <div class="w-2/3 ml-3">
        <small class="text-gray-700">{{dt.public_name_kana}}</small>
        <a
          :href="`https://2020.misscircle.jp/profiles/${dt.entry_id}`"
          target="_blank"
          class="text-xl mb-1 flex items-center"
        >
          {{dt.public_name}}
          <span class="ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-external-link"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </span>
        </a>
        <p>
          <span class="mr-2">{{dt.university}}</span>
          <span>{{dt.grade}}年</span>
        </p>
        <p class="text-sm text-gray-600">{{dt.circle}}</p>
      </div>
    </div>
    <div class="flex my-2 text-gray-400">
      <a
        :href="showroom"
        target="_blank"
        class="w-1/3 mx-auto py-2"
        :class="{ 'text-black': showroom }"
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
          class="mx-auto"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      </a>
      <a
        :href="instagram"
        target="_blank"
        class="w-1/3 mx-auto py-2"
        :class="{ 'text-black': instagram }"
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
          class="mx-auto"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      </a>
      <a
        :href="twitter"
        target="_blank"
        class="w-1/3 mx-auto py-2"
        :class="{ 'text-black': twitter }"
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
          class="mx-auto"
        >
          <path
            d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
          />
        </svg>
      </a>
    </div>
    <div class="mb-4" v-show="dt && dt.showroom.length">
      <h3 class="font-bold mb-2">
        Showroom
        <span class="ml-2 font-normal text-sm m-auto text-gray-600">全体の{{total.showroom}}%</span>
      </h3>
      <table class="border w-full">
        <tr class="font-normal bg-blue-200 text-white font-light">
          <th>日付</th>
          <th>フォローワー</th>
          <th>レベル</th>
          <th>ランク</th>
        </tr>
        <tr v-for="sh of dt.showroom" :key="sh._id" class="text-center">
          <td class="p-1">{{format(sh.date)}}</td>
          <td class="p-1">{{num(sh.followers)}}</td>
          <td class="p-1">{{sh.level}}</td>
          <td class="p-1">{{sh.rank}}</td>
        </tr>
      </table>
    </div>
    <div class="mb-4" v-show="dt && dt.instagram.length">
      <h3 class="font-bold mb-2">
        Instagram
        <span class="ml-2 font-normal text-sm m-auto text-gray-600">全体の{{total.instagram}}%</span>
      </h3>
      <table class="border w-full">
        <tr class="font-normal bg-blue-200 text-white font-light">
          <th>日付</th>
          <th>投稿数</th>
          <th>フォローワー</th>
          <th>フォロー中</th>
        </tr>
        <tr v-for="ins of dt.instagram" :key="ins._id" class="text-center">
          <td class="p-1">{{format(ins.date)}}</td>
          <td class="p-1">{{num(ins.posts)}}</td>
          <td class="p-1">{{num(ins.followers)}}</td>
          <td class="p-1">{{num(ins.following)}}</td>
        </tr>
      </table>
    </div>
    <div class="mb-4" v-show="dt && dt.twitter.length">
      <h3 class="font-bold mb-2">
        Twitter
        <span class="ml-2 font-normal text-sm m-auto text-gray-600">全体の{{total.twitter}}%</span>
      </h3>
      <table class="border w-full">
        <tr class="font-normal bg-blue-200 text-white font-light">
          <th>日付</th>
          <th>フォローワー</th>
          <th>フォロー中</th>
        </tr>
        <tr v-for="twi of dt.twitter" :key="twi._id" class="text-center">
          <td class="p-1">{{format(twi.date)}}</td>
          <td class="p-1">{{num(twi.followers)}}</td>
          <td class="p-1">{{num(twi.following)}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  props: ["entry_id"],
  data() {
    return {
      dt: ""
    };
  },
  computed: {
    showroom: function() {
      if (this.dt && this.dt.showroom.length) {
        return `https://www.showroom-live.com/room/profile?room_id=${
          this.dt.showroom[this.dt.showroom.length - 1].id
        }`;
      }
      return null;
    },
    instagram: function() {
      if (this.dt && this.dt.instagram.length) {
        return `https://www.instagram.com/${
          this.dt.instagram[this.dt.instagram.length - 1].id
        }/`;
      }
      return null;
    },
    twitter: function() {
      if (this.dt && this.dt.twitter.length) {
        return `https://twitter.com/${
          this.dt.twitter[this.dt.twitter.length - 1].id
        }`;
      }
      return null;
    },
    total: function() {
      const sho = this.dt.showroom
        ? parseInt(this.dt.showroom[this.dt.showroom.length - 1].followers)
        : 0;
      const ins = this.dt.instagram
        ? parseInt(this.dt.instagram[this.dt.instagram.length - 1].followers)
        : 0;
      const twi = this.dt.twitter
        ? parseInt(this.dt.twitter[this.dt.twitter.length - 1].followers)
        : 0;
      const total = sho + ins + twi;
      return {
        showroom: Math.floor((sho / total) * 100),
        instagram: Math.floor((ins / total) * 100),
        twitter: Math.floor((twi / total) * 100)
      };
    }
  },
  methods: {
    format: function(x) {
      if (x) return moment(x).format("MM/DD");
    },
    num: function(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  async mounted() {
    const t = await axios.get(`/single/${this.entry_id}`);
    this.dt = t.data.data[0];
  }
};
</script>

<style scoped>
th {
  font-weight: 400;
}
tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
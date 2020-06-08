import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
    selected: 'total'
  },
  getters: {
    all: state => {
      return state.data.sort((a, b) => b.total - a.total)
    },
    compare: state => {
      return state.data.sort((a, b) => b.compare - a.compare)
    },
    showroom: state => {
      return state.data.sort((a, b) => {
        let aaa = a.showroom.length ? a.showroom[a.showroom.length - 1].followers : 0
        let bbb = b.showroom.length ? b.showroom[b.showroom.length - 1].followers : 0
        return bbb - aaa
      })
    },
    instagram: state => {
      return state.data.sort((a, b) => {
        let aaa = a.instagram.length ? a.instagram[a.instagram.length - 1].followers : 0
        let bbb = b.instagram.length ? b.instagram[b.instagram.length - 1].followers : 0
        return bbb - aaa
      })
    },
    twitter: state => {
      return state.data.sort((a, b) => {
        let aaa = a.twitter.length ? a.twitter[a.twitter.length - 1].followers : 0
        let bbb = b.twitter.length ? b.twitter[b.twitter.length - 1].followers : 0
        return bbb - aaa
      })
    },
    selected: state => {
      return state.selected
    }
  },
  mutations: {
    ADD_DATA: (state, payload) => {
      state.data = payload
    },
    SELECT: (state, payload) => {
      state.selected = payload
    },
    SELECT_RESET: (state) => {
      state.selected = ''
    }
  },
  actions: {
    init: async ({ commit }) => {
      const stem = await axios.get('/data')
      const modified = stem.data.all.map(calculate) 
      commit('ADD_DATA', modified.sort((a, b) => b.total - a.total))
    },
    select: ({ commit }, x) => {
      commit('SELECT_RESET')
      commit('SELECT', x)
    }
  }
})

function calculate (x) {
  let counter = 0
  if (x.instagram.length) counter += Number(x.instagram[x.instagram.length - 1].followers)
  if (x.twitter.length) counter += Number(x.twitter[x.twitter.length - 1].followers)
  if (x.showroom.length) counter += Number(x.showroom[x.showroom.length -1].followers)
  x.total = counter

  let before = 0
  if (x.instagram.length) before += Number(x.instagram[0].followers)
  if (x.twitter.length) before += Number(x.twitter[0].followers)
  if (x.showroom.length) before += Number(x.showroom[0].followers)
  x.before = before

  x.compare = counter - before

  return x
}

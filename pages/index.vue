<template>
  <div class="mx-0 my-0 px-0" style="background: #f6f5f3;">
    <div class="px-4 pt-5">
      <div class="px-4">
        <h3 class="px-lg-5">{{ currentRegionStr }} Overview</h3>
        <div class="row justify-content-between px-lg-5">
          <p class="text-muted px-3">Data from {{ newestDate }}</p>
          <v-selectmenu :data="menu" :query="true" language="en" type="advanced" key-field="code" show-field="name" align="right" class="px-3" :title="title" v-model="currentRegion"></v-selectmenu>
        </div>
      </div>
    </div>
    <div>
      <NationalView v-if="currentRegion == 'US'" :nationalCumulative="nationalCumulative" :stateCumulative="stateCumulative"></NationalView>
      <StateView v-if="isState(states,currentRegion)" :currentState="currentRegion" :currentStateStr="currentRegionStr"></StateView>
    </div>
  </div>
</template>

<script>
import StateView from '~/components/StateView.vue'
import NationalView from '~/components/NationalView.vue'
import { findObject } from '~/mixins/helper.js'
import axios from 'axios'

export default {
  components: {
    StateView,
    NationalView
  },

  data() {
    return {
      currentRegion: 'US',
      title: false,
      menu: [
        {
          title: 'National',
          list: [
            {code: 'US', name: 'United States'}
          ]
        },
        {
          title: 'State',
          list: []
        }
      ]
    }
  },
  
  /* Initial import for national outbreak data. Called before initial page load. */
  async asyncData () {
      console.log (process.env.API_URL + process.env.API_PREFIX)
      const stateCumulative = await axios.get(process.env.API_URL + process.env.API_PREFIX + 'outbreak/cumulative/states')
      const states = await axios.get(process.env.API_URL + process.env.API_PREFIX + 'regions/states')
      const nationalCumulative = await axios.get('https://covidtracking.com/api/v1/us/daily.json')
      return {stateCumulative: stateCumulative.data, states: states.data, nationalCumulative: nationalCumulative.data}
  },
  
  computed: {
    newestDate: function () {
      return this.stateCumulative[0]['date']
    },

    currentRegionStr: function () {
      if (this.currentRegion == 'US') {
        return this.currentRegion
      }
      else {
        var regionObject = findObject(this.menu[1].list, 'code', this.currentRegion)
        return regionObject['name']
      }
    }
  },

  methods: {
    getMenuStates: function (states) {
      var newStateMenu = []
      for (var i=0; i < states.length; i++) {
        var newStateInstance = {
          code: states[i]['code'],
          name: states[i]['name']
        }
        newStateMenu.push(newStateInstance)
      }
      return this.menu[1].list = newStateMenu
    },

    isState: function(states, regionCode) {
      let obj = states.find(o => o.code === regionCode);
      return obj != null
    }
  },

  mounted: function () {
    this.getMenuStates(this.states)
  }
}
</script>
<style>
  
</style>

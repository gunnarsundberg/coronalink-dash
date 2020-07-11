<template>
  <div class="mx-0 my-0 px-0" style="background: #f6f5f3;">
    <div class="px-4 pt-5">
      <div class="px-4">
        <b-row align-h="between" class="px-lg-5">
          <b-col cols="auto">
            <h3>{{ currentRegionStr }} Overview</h3>
            <p class="text-muted">Data from {{ newestDate }}</p>
          </b-col>
          <b-col cols="auto" class="pt-2 text-right">
            <b-alert
              :show="dismissCountDown"
              dismissible
              variant="info"
              @dismissed="dismissCountDown=0"
              @dismiss-count-down="countDownChanged"
            >
              <b-icon-arrow-down></b-icon-arrow-down> Tip: click to change view
            </b-alert>
            <v-selectmenu :data="menu" :query="true" language="en" type="advanced" key-field="code" show-field="name" align="right" :title="title" v-model="currentRegion"></v-selectmenu>
          </b-col>
        </b-row>
      </div>
    </div>
    <div>
      <NationalView v-if="currentRegion == 'US'" :stateCumulative="stateCumulative"></NationalView>
      <StateView v-if="isState(states,currentRegion)" :currentState="currentRegion" :currentStateStr="currentRegionStr"></StateView>
    </div>
  </div>
</template>

<script>
import StateView from '~/components/StateView.vue'
import NationalView from '~/components/NationalView.vue'
import { findObject } from '~/mixins/helper.js'
import { BIconArrowDown } from 'bootstrap-vue'

export default {
  components: {
    StateView,
    NationalView,
    BIconArrowDown
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
      ],

      dismissSecs: 3,
      dismissCountDown: 0
    }
  },
  
  /* Initial import for national outbreak data. Called before initial page load. */
  async asyncData ({ $axios }) {
    $axios.setToken(process.env.AUTH_TOKEN, 'Token')

    const stateCumulative = await $axios.get('/api/outbreak/cumulative/states')
    const states = await $axios.get('/api/regions/states')
    
    return {stateCumulative: stateCumulative.data, states: states.data}
  },
  
  computed: {
    nationalCumulative () {
      return this.$store.state.nationalcumulative.list
    },

    newestDate () {
      return this.stateCumulative[0]['date']
    },

    currentRegionStr () {
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
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },

    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },

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
  
  created: function () {
    this.showAlert()
    this.getMenuStates(this.states)
  },
}
</script>
<style>
  .sm-default-btn {
    font-size: 1.25rem!important;
  }
</style>

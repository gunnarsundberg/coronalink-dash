<template>
    <div class="px-lg-5">
      <div class="mx-0 px-5">
        <b-card-group deck class="pt-5">
          <numeric-data-card :data="cumulativeCases" title="Cumulative Cases" class="order-md-2"></numeric-data-card>
          <div class="d-lg-none d-md pt-md-3 pt-sm-3 w-100"></div>
          <area-chart-card :data="caseChartData(nationalCumulative)" title="New Cases by Day" :colors="['#ae0001']"></area-chart-card>
          <div class="d-lg-none d-md pt-md-3 pt-sm-3 w-100"></div>
          <numeric-data-card :data="cumulativeDeaths" title="Cumulative Deaths"></numeric-data-card>
        </b-card-group>
        <b-card-group deck class="pt-3">
            <b-card title="Top States by Cases" class="col-xl-4 shadow order-md-2 order-sm-2">
              <div class="card-body">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    <b-row class="">
                      <b-col class="">
                        <h5>State</h5>
                      </b-col>
                      <b-col class="float-right">
                        <h5 class="">Cases</h5>
                      </b-col>
                    </b-row>
                  </li>
                  <li v-for="state in sortedNationalOutbreak" :key="state['state']" class="list-group-item">
                    <b-row>
                      <b-col class="">
                        {{ state['state'] }}
                      </b-col>
                      <b-col class="float-right">
                        {{ numberWithCommas(state['cases']) }}
                      </b-col>
                    </b-row>
                  </li>
                </ul>
              </div>
            </b-card>
            
            <b-card title="Outbreak Map" class="shadow col-xl-8">
              <div class="px-sm-0 mx-sm-0">
                <outbreak-map :stateCumulativeData="stateCumulative" class="px-sm-0 mx-sm-0"></outbreak-map>
              </div>
            </b-card>
            <div class="d-lg-none d-md d-sm pt-md-3 pt-sm-3 w-100"></div>
        </b-card-group>
        <div class="py-5">
        </div>
      </div>
  </div>
</template>

<script>
import {compareCases, numberWithCommas, caseChartData} from '~/mixins/helper.js'
import NumericDataCard from '~/components/cards/reporting/NumericDataCard.vue'
import AreaChartCard from '~/components/cards/visualizations/AreaChartCard.vue'
import OutbreakMap from '~/components/cards/visualizations/OutbreakMap.vue'

export default {
  props: {
   nationalCumulative: {
    type: Array,
    required: true
   },
   stateCumulative: {
     type: Array,
     required: true
   }
  },

  components: {
    NumericDataCard,
    AreaChartCard,
    OutbreakMap
  },

  computed: {
    sortedNationalOutbreak: function () {
      return this.stateCumulative.sort(compareCases).slice(0, 5)
    },

    cumulativeCases: function() {
      return numberWithCommas(this.nationalCumulative[0]['positive'])
    },

    cumulativeDeaths: function() {
      return numberWithCommas(this.nationalCumulative[0]['death'])
    }
  },
  
  methods: {
    numberWithCommas,
    caseChartData
  }
}
</script>
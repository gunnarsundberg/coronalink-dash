<template>
    <div>
            <l-map 
                v-if="states"
                :center="[38,-97]" 
                :zoom="4" 
                style="height: 375px;"
            >
                <choropleth-layer  
                    :data="mapData"
                    titleKey="stateName"
                    idKey="state"
                    :value="value"
                    geojsonIdKey="STATE" 
                    :geojson="usGeoJSON"
                    :colorScale="colorScale"
                    strokeColor="A9A9A9"
                >
                    <template slot-scope="props">
                    <info-control 
                        :item="props.currentItem" 
                        :unit="props.unit" 
                        title="Outbreak Summary" 
                        placeholder="Hover over a state to see outbreak information <br>(zoom out for Hawaii and Alaska)</br>"/>
                    <reference-chart 
                        title="Cumulative Cases" 
                        :colorScale="colorScale" 
                        :min="props.min" 
                        :max="props.max" 
                        position="topright"/>
                    </template>
                </choropleth-layer>
                
            </l-map>
            <loading v-else></loading>
    </div>
</template>

<script>
import {findObject} from '~/mixins/helper.js'
import usGeoJSON from '~/assets/usStates.json'
import Loading from '~/components/Loading.vue'
import axios from 'axios'

export default {
    props: {
        stateCumulativeData: {
            type: Array,
            required: true
        }
    },

    components: {
        Loading
    },

    data () {
        return {
            usGeoJSON,
            states: null,
            value: {
                key: 'cases',
                metric: 'Cases'
            },
            colorScale: ["fff8dc", "e9967a", "d64646", "b22222", "8f0000"],
            strokeColor: "565554"
        }
    },

    computed: {
        mapData: function () {
            var mapData = []
            for (var i = 0; i < this.states.length; i++) {
                var state = this.states[i]
                var caseObject = findObject(this.stateCumulativeData, 'state', state['code'])
                var cases = caseObject['cases']
                var newElement = {state: state['fips_code'], stateName: state['name'], cases: cases }
                mapData[i] = newElement
            }
            return mapData
        }
    },

    methods: {
        async getStates () {
            const statesRequest = await axios.get(process.env.API_URL + process.env.API_PREFIX + 'regions/states')
            this.states = statesRequest.data
        }
    },

    created() {
        this.getStates()
    }
}
</script>

<style>
    @import "leaflet/dist/leaflet.css";

    .leaflet-container {
        font-family: 'Open Sans'!important;
        font-weight: lighter!important;
        background: white!important;
    }

    .leaflet-top, .leaflet-right {
        z-index: 900!important;
    }

    .leaflet-bottom, .leaflet-left {
        z-index: 900!important;
    }

    b {
        font-weight: lighter!important;
    }

    b, strong {
        font-weight: normal!important;
    }

    .info h4 {
        color: black!important;
        font-weight: lighter!important;
    }

    .info {
        color: black!important;
        font-weight: lighter!important;
    }
</style>
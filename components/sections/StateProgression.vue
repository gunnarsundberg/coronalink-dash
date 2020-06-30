<template>
    <div class="py-5 bg-white">
        <div class="px-5">
            <div class="align-center">
                <h3 align-middle>Outbreak Progression</h3>
            </div>
            <div v-if="stateCumulativeData && stateDailyData && stateCumulativeHistoric && allStatesCumulativeHistoric">
                <div class="px-xl-5">
                    <div class="px-md-5 py-5" align="center">
                        <line-chart v-if="stateCumulativeHistoric" :data="getChartData()" :points="false" :colors="['#2a35c9', '#ababab']" ytitle="Total Cases"></line-chart>
                        <loading v-else></loading>
                    </div>
                </div>
                <div>
                    <p>{{ currentStateStr }} first reached 100 cases on {{ displayDate(dateOfOutbreak) }}, becoming the  {{ outbreakDateRank }} state to do so. {{ schoolClosureDescription }} {{ stayAtHomeDescription }}</p>
                </div>
            </div>
            <loading v-else></loading>
        </div>
    </div>
</template>

<script>
import { caseChartData, findObjectList, findObject, getObjectsAverage, getFormattedDateString, outbreakDateSort, getObjectRank, ordinalSuffixOf } from '~/mixins/helper.js'
import Loading from '~/components/Loading.vue'
import axios from 'axios'

export default {
    props: {
        currentState: {
            required: true
        },

        currentStateStr: {
            required: true
        },

        stateCumulativeData: {
            required: true
        },

        stateDailyData: {
            required: true
        }
    },

    components: {
        Loading
    },
    
    data () {
        return {
            stateCumulativeHistoric: null,
            allStatesCumulativeHistoric: null,
            allStatesCumulative: null,
            schoolClosure: null,
            stayInPlace: null
        }
    },

    computed: {
        dateOfOutbreak: function () {
            return this.stateCumulativeData[0]['date_of_outbreak']
        },

        newestDate: function () {
            return this.stateDailyData[0]['date']
        },

        outbreakDateRank: function () {
            return this.getOutbreakRank()
        },

        schoolClosureDescription: function() {
            var description = "In response, the state closed schools on " + this.displayDate(this.schoolClosure[0]['date']) + ". "
            if (this.orderExpired(this.schoolClosure)) {
                var expiredOrder = findObject(orderObjects, 'order', 'Expired')
                description += "Students returned to school on " + this.displayDate(expiredOrder['date']) + ". "
            }
            return description
        },

        stayAtHomeDescription: function () {
            var description = null
            if (findObject(this.stayInPlace, 'order', 'Active')) {
                var order = findObject(this.stayInPlace, 'order', 'Active')
                description = "Additionally, " + this.currentStateStr + " took the preventative step of issuing a stay-at-home order on " + this.displayDate(order['date']) + ". "
                if (this.orderExpired(this.stayInPlace)) {
                    var expiredOrder = findObject(orderObjects, 'order', 'Expired')
                    description += "The order expired on " + this.displayDate(expiredOrder['date']) + ". "
                }
                else {
                    description += "The order remains in place. "
                }
            }
            else {
                description = this.currentStateStr + " did not take the preventative action of issuing a stay-at-home order. "
            }
            return description
        }
    },

    methods: {
        caseChartData,

        async getStateCumulativeHistoricData() {
            const stateCumulativeHistoricRequest = await axios.get('http://161.35.60.204/api/v1/outbreak/cumulative/historic/states?state=' + this.currentState)
            this.stateCumulativeHistoric = stateCumulativeHistoricRequest.data
        },

        async getAllCumulativeData() {
            const allStatesCumulativeHistoricRequest = await axios.get('http://161.35.60.204/api/v1/outbreak/cumulative/historic/states')
            const allStatesCumulativeRequest = await axios.get('http://161.35.60.204/api/v1/outbreak/cumulative/states')
            this.allStatesCumulativeHistoric = allStatesCumulativeHistoricRequest.data
            this.allStatesCumulative = allStatesCumulativeRequest.data
        },

        async getDistancingData() {
            const schoolClosureRequest = await axios.get('http://161.35.60.204/api/v1/distancing/schoolclosure/states?state=' + this.currentState)
            const stayInPlaceRequest = await axios.get('http://161.35.60.204/api/v1/distancing/stayinplace/states?state=' + this.currentState)
            this.schoolClosure = schoolClosureRequest.data
            this.stayInPlace = stayInPlaceRequest.data
        },

        getChartData() {
            const currentStateData = this.getCurrentStateData()
            const averageStateData = this.getAverageData()
            return [
                {name: this.currentStateStr, data: currentStateData},
                {name: 'National Average', data: averageStateData},
            ]
        },

        getCurrentStateData() {
            var currentStateData = {}
            for (var i = 0; i < this.stateCumulativeHistoric.length; i++) {
                currentStateData[this.stateCumulativeHistoric[i]['date']] = this.stateCumulativeHistoric[i]['cases']
            }
            return currentStateData
        },

        getAverageData() {
            var averageStateData = {}
            const startDate = new Date(this.dateOfOutbreak)
            const endDate = new Date(this.newestDate)
            var iterDate = startDate

            while (iterDate < endDate) {
                var formattedDate = getFormattedDateString(iterDate)

                var dailyData = findObjectList(this.allStatesCumulativeHistoric, 'date', formattedDate)
                var average = getObjectsAverage(dailyData, 'cases')
                averageStateData[formattedDate] = average.toFixed(0)

                var nextDay = iterDate.setDate(iterDate.getDate() + 1)
                iterDate = new Date(nextDay)
            }
            return averageStateData
        },

        displayDate(date) {
            return date
        },

        getOutbreakRank() {
            var sorted = this.allStatesCumulative.sort(outbreakDateSort)
            var rank = getObjectRank(sorted, 'state', this.currentState)
            console.log("Got rank!")
            return ordinalSuffixOf(rank)
        },

        orderExpired(orderObjects) {
            if (findObject(orderObjects, 'order', 'Expired')) {
                return true
            }
            return false
        }

    },

    created() {
        this.getStateCumulativeHistoricData()
        this.getAllCumulativeData()
        this.getDistancingData()
    },

    watch: {
        currentState: function () {
            this.getStateCumulativeHistoricData()
            this.getDistancingData()
            console.log("Updated state")
        }
    }
}
</script>
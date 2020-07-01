<template>
    <div class="px-xl-5 py-5">
        <b-card-group deck class="px-lg-5 pt-3">
            <b-card class="shadow" title="Cumulative Testing">
                <div class="card-body">
                    <b-table :stacked="true" :items="cumulativeTableData"></b-table>
                </div>
            </b-card>
            <div class="d-lg-none d-md d-sm pt-md-3 pt-sm-3 w-100"></div>
            <b-card class="shadow" title="Most Recent Testing">
                <div class="card-body">
                    <b-table :stacked="true" :items="newTableData"></b-table>
                </div>
                <template v-slot:footer>
                    <small class="text-muted">Testing data for {{ stateDailyData[0]['date'] }}</small>
                </template>
            </b-card>
        </b-card-group>

        <b-card-group deck class="pt-3 px-lg-5">
            <column-chart-card :data="positivePercentageChartData(stateDailyData)" title="Positive Test Percent by Day" :colors="['#ae0001']" class="col-lg-8"></column-chart-card>
            <div class="d-lg-none d-md d-sm pt-md-3 pt-sm-3 w-100"></div>
            <numeric-data-card :data="positivePercentage" title="Cumulative Positive Test Percentage" class="col-lg-4"></numeric-data-card>
        </b-card-group>

        <b-card-group class="px-lg-5 pt-3">
            <column-chart-card :data="caseTestData" title="Cases vs Tests" :stacked="true" :discrete="true" :colors="['#ae0001','#2a35c9']"></column-chart-card>
        </b-card-group>

        <b-card-group deck class="px-lg-5 pt-3">
            <numeric-data-card v-if="allStatesCumulative" :data="rawRank" title="Raw Testing Rank"></numeric-data-card>
            <div class="d-lg-none d-md d-sm pt-md-3 pt-sm-3 w-100"></div>
            <numeric-data-card v-if="allStatesCumulative" :data="populationWeightedRank" title="Population Weighted Testing Rank" footerText="Measured in tests/person"></numeric-data-card>
            <div class="d-lg-none d-md d-sm pt-md-3 pt-sm-3 w-100"></div>
            <numeric-data-card v-if="allStatesCumulative" :data="caseWeightedRank" title="Case Weighted Testing Rank" footerText="Measured in tests/case"></numeric-data-card>
        </b-card-group>
    </div>
</template>

<script>
import {numberWithCommas, compareTests, compareWeighted, findObject, getObjectRank, ordinalSuffixOf, caseChartData, testingChartData} from '~/mixins/helper.js'
import NumericDataCard from '~/components/cards/reporting/NumericDataCard.vue'
import ColumnChartCard from '~/components/cards/visualizations/ColumnChartCard.vue'

export default {
    props: {
        stateDailyData: {
            required: true
        },

        stateCumulativeData: {
            required: true
        },

        currentState: {
            required: true
        }
    },

    components: {
        NumericDataCard,
        ColumnChartCard
    },

    data () {
        return {
            stateDemographics: null,
            allStatesCumulative: null
        }
    },
    
    computed: {
        newPositive: function () {
            return numberWithCommas(this.stateDailyData[0]['cases'])
        },

        newNegative: function () {
            return numberWithCommas(this.stateDailyData[0]['negative_tests'])
        },

        newTotal: function () {
            return numberWithCommas(this.stateDailyData[0]['total_tested'])
        },

        cumulativePositive: function () {
            return numberWithCommas(this.stateCumulativeData[0]['cases'])
        },

        cumulativeNegative: function () {
            return numberWithCommas(this.stateCumulativeData[0]['negative_tests'])
        },

        cumulativeTotal: function () {
            return numberWithCommas(this.stateCumulativeData[0]['total_tested'])
        },

        positivePercentage: function () {
            const total_tested = this.stateCumulativeData[0]['total_tested']
            const positive = this.stateCumulativeData[0]['cases']
            return (((positive/total_tested) * 100).toFixed(1))
        },

        caseTestData: function () {
            var chartData = [
                {name: 'Cases', data: caseChartData(this.stateDailyData)},
                {name: 'Tests', data: testingChartData(this.stateDailyData)}
            ]
            return chartData
        },

        cumulativeTableData: function () {
            return [
                {
                    cumulative_positive: this.cumulativePositive,
                    cumulative_negative: this.cumulativeNegative,
                    cumulative_total: this.cumulativeTotal
                }
            ]
        },

        newTableData: function () {
            return [
                {
                    new_positive: this.newPositive,
                    new_negative: this.newNegative,
                    new_total: this.newTotal
                }
            ]
        },

        rawRank: function () {
            var testSorted = this.allStatesCumulative.sort(compareTests)
            var rank = getObjectRank(testSorted, 'state', this.currentState)
            return ordinalSuffixOf(rank)
        },

        populationWeightedRank: function () {
            const statesPopulationWeighted = []
            for (var i = 0; i < this.allStatesCumulative.length; i++) {
                var state = this.allStatesCumulative[i]['state']
                
                var totalTested = this.allStatesCumulative[i]['total_tested']
                
                var demographics = findObject(this.stateDemographics, 'state', state)
                var statePopulation = demographics['population']
                
                var testsPerPerson = totalTested/statePopulation
                statesPopulationWeighted[i] = {state: state, weighted_tests: testsPerPerson}
            }
            const weightedSorted = statesPopulationWeighted.sort(compareWeighted)
            var newrank = getObjectRank(weightedSorted, 'state', this.currentState)
            return ordinalSuffixOf(newrank)
        },

        caseWeightedRank: function () {
            const statesPopulationWeighted = []
            for (var i = 0; i < this.allStatesCumulative.length; i++) {
                var state = this.allStatesCumulative[i]['state']
                
                var totalTested = this.allStatesCumulative[i]['total_tested']
                var totalCases = this.allStatesCumulative[i]['cases']
                
                var testsPerCase = totalTested/totalCases
                statesPopulationWeighted[i] = {state: state, weighted_tests: testsPerCase}
            }
            const weightedSorted = statesPopulationWeighted.sort(compareWeighted)
            var newrank = getObjectRank(weightedSorted, 'state', this.currentState)
            return ordinalSuffixOf(newrank)
        },
    },

    methods: {
        testingChartData,
        positivePercentageChartData: function (dailyData) {
            var newChartData = []
            for (var i=dailyData.length - 1; i >= 0 ; i--) {
                var newElement = [];    
                newElement[0] = dailyData[i]['date']
                const total_tested = dailyData[i]['total_tested']
                const positive = dailyData[i]['cases']
                newElement[1] = (((positive/total_tested) * 100).toFixed(1))
                newChartData.push(newElement);
            }
            return newChartData
        },

        async getStateData () {
            const stateDemographicsRequest = await this.$axios.get('/api/v1/demographics/states')
            const allStatesCumulativeRequest = await this.$axios.get('/api/v1/outbreak/cumulative/states')
            this.stateDemographics = stateDemographicsRequest.data
            this.allStatesCumulative = allStatesCumulativeRequest.data
        },

    },

    created() {
        this.getStateData()
    },
}
</script>
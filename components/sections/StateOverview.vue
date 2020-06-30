<template>
    <div class="px-xl-5">
        <div class="px-5 py-5">
            <!-- Cumulative Outbreak Information Deck -->
            <b-card-group deck>
                <!-- Cumulative cases -->
                <numeric-data-card :data="cumulativeCases" title="Cumulative Cases" class="order-lg-1"></numeric-data-card>
                
                <!-- <div class="d-lg-none d-md pt-md-3 pt-sm-3 w-100"></div> -->
                <!-- New cases by day visualization -->
                <area-chart-card :data="caseChartData(stateDailyData)" title="New Cases by Day" class="order-md-3 order-sm-3 order-lg-2" :colors="['#ae0001']"></area-chart-card>
                
                <!-- Cumulative deaths -->
                <numeric-data-card :data="cumulativeDeaths" title="Cumulative Deaths" class="order-lg-3"></numeric-data-card>
                <div class="d-lg-none d-md d-sm pt-md-3 pt-sm-3 w-100"></div>
                
            </b-card-group>
            

            <!-- New Outbreak Information Deck -->
            <b-card-group deck class="pt-3">
                <!-- New cases -->
                <percent-change-card :initialData="initialCases" :newData="newCases" title="New Cases" class="order-lg-1"></percent-change-card>
                <!-- New cases this week visualization -->
                <line-chart-card :data="weeklyCasesChartData" title="New Cases This Week"  :colors="['#ae0001']" class="order-md-3 order-sm-3 order-lg-2"></line-chart-card>
                <!-- New deaths -->
                <percent-change-card :initialData="initialDeaths" :newData="newDeaths" title="New Deaths" class="order-lg-3"></percent-change-card>
                <div class="d-lg-none d-md pt-md-3 pt-sm-3 w-100"></div>
            </b-card-group>

            <!-- Testing Information Deck -->
            <b-card-group deck class="pt-3">
                <!-- Cumulative total tests performed with testing modal -->
                <modal-card title="Cumulative Tests" :data="cumulativeTotalTests" modalTitle="Testing Information" footerText="Detailed Testing Information " class="order-lg-1">
                    <testing :stateDailyData="stateDailyData" :stateCumulativeData="stateCumulativeData" :currentState="currentState"></testing>
                </modal-card>
                <!-- Tests performed by day visualization -->
                <column-chart-card :data="testingChartData(stateDailyData)" title="Tests Performed by Day" class="order-md-3 order-sm-3 order-lg-2"></column-chart-card>
                <!-- Cumulative negative tests -->
                <numeric-data-card title="Cumulative Negative Tests" :data="cumulativeNegativeTests" class="order-lg-3"></numeric-data-card>
                <div class="d-lg-none d-md pt-md-3 pt-sm-3 w-100"></div>
            </b-card-group>
        </div>
    </div>
</template>

<script>
import { numberWithCommas, testingChartData, caseChartData, isLoaded } from '~/mixins/helper.js'
import Testing from '~/components/sections/Testing.vue'
import PercentChangeCard from '~/components/cards/reporting/PercentChangeCard.vue'
import NumericDataCard from '~/components/cards/reporting/NumericDataCard.vue'
import ColumnChartCard from '~/components/cards/visualizations/ColumnChartCard.vue'
import AreaChartCard from '~/components/cards/visualizations/AreaChartCard.vue'
import LineChartCard from '~/components/cards/visualizations/LineChartCard.vue'
import ModalCard from '~/components/cards/reporting/ModalCard.vue'

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
        Testing,
        PercentChangeCard,
        NumericDataCard,
        ModalCard,
        ColumnChartCard,
        AreaChartCard,
        LineChartCard
    },

    computed: {
        /* 
            Section: Day-over-day values 
        */

        initialCases: function() {
            if (isLoaded(this.stateDailyData)) {
                return numberWithCommas(this.stateDailyData[1]['cases'])
            }
            else {
                return null
            }
        },

        newCases: function() {
            if (isLoaded(this.stateDailyData)) {
                return numberWithCommas(this.stateDailyData[0]['cases'])
            }
            else {
                return null
            }
        },

        initialDeaths: function() {
            if (isLoaded(this.stateDailyData)) {
                return numberWithCommas(this.stateDailyData[1]['deaths'])
            }
            else {
                return null
            }
        },

        newDeaths: function() {
            if (isLoaded(this.stateDailyData)) {
                return numberWithCommas(this.stateDailyData[0]['deaths'])
            }
            else {
                return null
            }
        },

        /* 
            Section: Cumulative values 
        */

        cumulativeCases: function() {
            if (isLoaded(this.stateCumulativeData)) {
                return numberWithCommas(this.stateCumulativeData[0]['cases'])
            }
            else {
                return null
            }
        },

        cumulativeDeaths: function() {
            if (isLoaded(this.stateCumulativeData)) {
                return numberWithCommas(this.stateCumulativeData[0]['deaths'])
            }
            else {
                return null
            }
        },

        cumulativeNegativeTests: function () {
            if (isLoaded(this.stateCumulativeData)) {
                return numberWithCommas(this.stateCumulativeData[0]['negative_tests'])
            }
            else {
                return null
            }
        },

        cumulativeTotalTests: function () {
            if (isLoaded(this.stateCumulativeData)) {
                return numberWithCommas(this.stateCumulativeData[0]['total_tested'])
            }
            else {
                return null
            }
        },

        /* 
            Section: Chart data 
        */

        weeklyCasesChartData: function () {
            if (isLoaded(this.stateDailyData)) {
                var newWeeklyData = []
                for (var i=6; i >= 0; i--) {
                    var newElement = [];
                    newElement[0] = this.stateDailyData[i]['date'] 
                    newElement[1] = this.stateDailyData[i]['cases']
                    newWeeklyData.push(newElement);
                }
                return newWeeklyData
            }
            else {
                return null
            }
        }
    },
    
    methods: {
        testingChartData,
        caseChartData
    }
}
</script>
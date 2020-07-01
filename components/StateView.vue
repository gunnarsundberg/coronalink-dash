<template>
    <div>
        <div>
            <state-overview :stateDailyData="stateDailyData" :stateCumulativeData="stateCumulativeData" :currentState="currentState" class="px-lg-5"></state-overview>
            <state-fast-facts :currentState="currentState" :currentStateStr="currentStateStr" :stateDemographics="stateDemographics" class="px-lg-5"></state-fast-facts>
            <state-progression :stateCumulativeData="stateCumulativeData" :stateDailyData="stateDailyData" :currentState="currentState" :currentStateStr="currentStateStr" class="px-lg-5 mx-0 bg-white"></state-progression>
        </div>
    </div>
</template>

<script>
import StateOverview from '~/components/sections/StateOverview.vue'
import StateFastFacts from '~/components/sections/StateFastFacts.vue'
import StateProgression from '~/components/sections/StateProgression.vue'

export default {
    components: {
        StateOverview,
        StateFastFacts,
        StateProgression
    },

    props: {
        currentState: {
            required: true
        },

        currentStateStr: {
            required: true
        }
    },

    data() {
        return {
            stateDailyData: null,
            stateCumulativeData: null,
            stateDemographics: null,
        }
    },
  
    methods: {
        dataLoaded(data) {
            return (data != null)
        },

        /* Import outbreak data for a state (given in params). This is called each time a state is selected. */
        async updateStateData () {
            const stateDailyRequest = await this.$axios.get('/api/outbreak/daily/states?state=' + this.currentState)
            const stateCumulativeRequest = await this.$axios.get('/api/outbreak/cumulative/states?state=' + this.currentState)
            const stateDemographics = await this.$axios.get('/api/demographics/states?state=' + this.currentState)
            
            this.stateDailyData = stateDailyRequest.data
            this.stateCumulativeData = stateCumulativeRequest.data
            this.stateDemographics = stateDemographics.data
        },
    },
    
    created() {
        this.updateStateData()
    },

    watch: {
        currentState: function () {
            this.stateDailyData = null
            this.stateCumulativeData = null
            this.stateDemographics = null
            this.updateStateData()
        }
    },
}

</script>
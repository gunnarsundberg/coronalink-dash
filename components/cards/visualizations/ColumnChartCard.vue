<template>
    <b-card class="shadow" :title="title">
        <div class="card-body px-0">
            <column-chart v-if="data" :data="data" min="0" :library="{scales: {xAxes: [{ticks: {display: false}}]}}" :label="false" height="150px" :stacked="stacked" :colors="colors" :discrete="discrete"></column-chart>
            <loading v-else></loading>
        </div>
    </b-card>
</template>

<script>
import Loading from '~/components/Loading.vue'

export default {
    props: {
        data: {
            required: true
        },

        title: {
            type: String,
            required: true
        },

        stacked: {
            required: false
        },

        discrete: {
            required: false
        },

        colors: {
            required: false
        }
    },

    components: {
        Loading
    },
}
</script>
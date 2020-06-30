<template>
    <b-card :title="title" class="shadow" align="center">
        <b-card-text>
            <div v-if="newData && initialData" class="py-4">
                <h1>{{ newData }}</h1>
                <h3 class="text-danger" v-if="displacement(newData, initialData) > 0 && isFinite(percentChange(initialData, newData))">+{{ percentChange(initialData, newData) }}%</h3>
                <h3 class="text-success" v-if="displacement(newData, initialData) <= 0 && isFinite(percentChange(initialData, newData))">{{ percentChange(initialData, newData) }}%</h3>
            </div>
            <loading v-else></loading>
        </b-card-text>
    </b-card>
</template>

<script>
import {displacement, percentChange} from '~/mixins/helper.js'
import Loading from '~/components/Loading.vue'

export default {
    props: {
        newData: {
            required: true,
        },

        initialData: {
            required: true,
        },

        title: {
            required: true,
            type: String
        }
    },

    components: {
        Loading
    },
    
    methods: {
        displacement,
        percentChange
    }
}
</script>
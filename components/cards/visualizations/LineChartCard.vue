<template>
    <b-card :title="title" class="shadow">
        <div class="card-body px-0">
            <line-chart :data="data" height="150px" :colors="colors"></line-chart>
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

        colors: {
            required: false
        }
    },

    components: {
        Loading
    }
}
</script>
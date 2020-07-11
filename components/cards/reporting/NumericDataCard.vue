<template>
    <b-card :title="title" class="shadow" align="center" align-v="center" data-aos="slide-up">
        <b-card-text align-middle>
            <h1 v-if="data" class="py-5">{{ data}}</h1>
            <loading v-else></loading>
        </b-card-text>
        <template v-if="footerText" v-slot:footer>
            <small class="text-muted">{{ footerText }}</small>
        </template>
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
            required: true,
            type: String
        },
        footerText: {
            required: false,
        }
    },

    components: {
        Loading
    }
}
</script>
<template>
    <b-card class="shadow" :title="title">
        <b-card-text align="center" class="py-5">
            <h1>{{ data }}</h1>
        </b-card-text>
        <b-link href="#" class="card-link" v-b-modal.modal>{{ footerText }}<b-icon-arrow-up-right-square></b-icon-arrow-up-right-square></b-link>
        <b-modal id="modal" size="xl" :title="modalTitle">
            <slot></slot>
            <template v-slot:modal-footer="{ ok }">
                <b-button size="sm" variant="secondary" @click="ok()">
                    Close
                </b-button>
            </template>
        </b-modal>
    </b-card>
</template>

<script>
import { BIconArrowUpRightSquare } from 'bootstrap-vue'

export default {
    props: {
        title: {
            type: String,
            required: true
        },

        modalTitle: {
            type: String,
            required: true
        },

        data: {
            required: true
        },

        footerText: {
            type: String,
            required: true
        }
    },

    components: {
        BIconArrowUpRightSquare
    }
}
</script>
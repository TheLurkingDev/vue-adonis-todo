<template>
    <v-layout row wrap>
        <v-flex xs9 class="text-xs-left">
            <slot> </slot>
            <span
                v-if="!isEditMode"
                @click="$emit('onClick')"
            >
                {{ title }}
            </span>
            <v-text-field
                autofocus
                v-if="isEditMode"
                :value="title"
                @keyup.enter="$emit('onSave')"
                @input="$emit('onInput', $event)">
            </v-text-field>
        </v-flex>
        <v-flex xs3 class="text-xs-right">
            <v-icon
                class="edit-icon"
                @click="$emit('onEdit')"
                v-if="!isEditMode">
                edit
            </v-icon>
            <v-icon
                class="edit-icon"
                @click="$emit('onSave')"
                v-if="isEditMode">
                check
            </v-icon>
            <v-icon
                class="edit-icon"
                @click="$emit('onDelete')">
                delete
            </v-icon>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    props: [
        'isEditMode',
        'title',
        'record',
    ],
};
</script>

<style>

</style>

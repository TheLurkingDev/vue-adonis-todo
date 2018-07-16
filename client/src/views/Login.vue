<template>
    <v-container>
        <v-layout row rap>
            <v-flex xs6 offset-xs3> <!-- Occupies 6 columns out of 12 and pushes over 3 columns to center. -->
                <h1>Login</h1>
                <v-text-field
                    label="Email"
                    placeholder="Email"
                    :value="loginEmail"
                    @input="setLoginEmail"
                ></v-text-field> <!-- ":value" binds to loginEmail state field. -->
                <v-text-field
                    label="Password"
                    placeholder="Password"
                    type="password"
                    autocomplete="new-password"
                    :value="loginPassword"
                    @input="setLoginPassword">
                </v-text-field>
                <v-alert type="error" :value="loginError">
                    {{ loginError }}
                </v-alert>
                <v-btn color="green" dark @click="login">
                    <v-icon class="mr-2">fingerprint</v-icon>
                    Login
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex';

    export default {
        computed: {
            ...mapState('authentication', [
                'loginEmail',
                'loginPassword',
                'loginError',
            ]),
        },
        methods: {
            ...mapMutations('authentication', [
                'setLoginEmail',
                'setLoginPassword',
            ]),
            ...mapActions('authentication', [
                'login',
            ]),
        },
    };
</script>

<style>
</style>

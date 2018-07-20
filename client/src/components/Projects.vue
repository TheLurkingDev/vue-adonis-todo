<template>
    <Panel title="Projects">
        <div v-for="project in projects" :key="project.id" class="project mt-2">
            <v-layout row wrap>
                <v-flex xs9 class="text-xs-left">
                    <span v-if="!project.isEditMode">
                        {{ project.title }}
                    </span>
                    <v-text-field
                        autofocus
                        v-if="project.isEditMode"
                        :value="project.title"
                        @keyup.enter="saveProject(project)"
                        @input="setProjectTitle({ project, title: $event})">
                    </v-text-field>
                </v-flex>
                <v-flex xs3>
                    <v-icon
                        class="edit-icon"
                        @click="setEditMode(project)"
                        v-if="!project.isEditMode">
                        edit
                    </v-icon>
                    <v-icon
                        class="edit-icon"
                        @click="saveProject(project)"
                        v-if="project.isEditMode">
                        check
                    </v-icon>
                    <v-icon
                        class="edit-icon"
                        @click="deleteProject(project)">
                        delete
                    </v-icon>
                </v-flex>
            </v-layout>
        </div>
        <v-layout row wrap class="mt-4">
            <v-flex xs8>
                <v-text-field
                    placeholder="Project name..."
                    :value = "newProjectName"
                    @input="setNewProjectName"
                    @keyup.enter="createProject">
                </v-text-field>
            </v-flex>
            <v-flex xs4>
                <v-btn
                    @click="createProject"
                    dark
                    class="mt-2"
                    color="green">
                    <v-icon class="mr-2">
                        add_circle
                    </v-icon>
                    Create
                </v-btn>
            </v-flex>
        </v-layout>
    </Panel>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';

export default {
    mounted() {
        this.fetchProjects();
    },
    computed: {
        ...mapState('projects', [
            'newProjectName',
            'projects',
        ]),
    },
    methods: {
        ...mapMutations('projects', [
            'setNewProjectName',
            'setEditMode',            
            'setProjectTitle',
        ]),
        ...mapActions('projects', [
            'createProject',
            'fetchProjects',
            'saveProject',
            'deleteProject',
        ]),
    },
};
</script>

<style>
    .project {
        font-size: 20px;
    }
    .icon {
        cursor: pointer;
    }
    .edit-icon:hover {
        color: green;
        border: 1px solid green;
    }
</style>

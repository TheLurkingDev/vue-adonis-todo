<template>
    <Panel title="Projects">
        <div v-for="project in projects" :key="project.id" class="project mt-2">
            <EditableRecord 
                :isEditMode="project.isEditMode"
                :title="project.title"
                @onInput="setProjectTitle({ project, title: $event })"
                @onClick="projectClicked(project)"
                @onEdit="setEditMode(project)"
                @onSave="saveProject(project)"
                @onDelete="deleteProject(project)"
            />
        </div>
        <CreateRecord 
            placeholder="Project name..."
            @onInput="setNewProjectName"
            :value="newProjectName"
            @create="createProject"
        />
    </Panel>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import CreateRecord from '@/components/CreateRecord.vue';
import EditableRecord from '@/components/EditableRecord.vue';

export default {
    mounted() {
        this.fetchProjects();
    },
    components: {
        CreateRecord,
        EditableRecord,
    },
    computed: {
        ...mapState('projects', [
            'newProjectName',
            'projects',
        ]),
    },
    methods: {
        projectClicked(project) {
            this.setCurrentProject(project);
            this.fetchTasksForProject(project);
        },
        ...mapMutations('projects', [
            'setNewProjectName',
            'setEditMode',            
            'setProjectTitle',
            'setCurrentProject',
        ]),
        ...mapActions('projects', [
            'createProject',
            'fetchProjects',
            'saveProject',
            'deleteProject',
        ]),
        ...mapActions('tasks', [
            'fetchTasksForProject',
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

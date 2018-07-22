import Vue from 'vue';
import http from '../http';

export default {
  namespaced: true,
  state: {
    tasks: [],
    newTaskName: null,
  },
  actions: {
    fetchTasksForProject({ commit }, project) {
    return http().get(`projects/${project.id}/tasks`, project)
        .then(({ data }) => {
            commit('setTasks', data);
        });
    },
    createTask({ commit, state, rootState }) {
        return http().post(`/projects/${rootState.projects.currentProject.id}/tasks`, {
            description: state.newTaskName,
        })
        .then(({ data }) => {
            commit('appendTask', data);
            commit('setNewTaskName', null);
        });
    },
    saveTask({ commit }, task) {
        return http().patch(`/tasks/${task.id}`, task)
        .then(() => {
            commit('exitEditMode', task);
        });
    },
    deleteTask({ commit }, task) {
        return http().delete(`/tasks/${task.id}`)
        .then(() => {
            commit('removeTask', task);
        });
    },    
  },
  getters: {
    
  },
  mutations: { // Functions that affect the state are defined here.
    setTasks(state, tasks) {
        state.tasks = tasks;
    },
    setNewTaskName(state, newTaskName) {
        state.newTaskName = newTaskName;
    },
    appendTask(state, task) {
        state.tasks.push(task);
    },
    setTaskDescription(state, { task, description }) {
        task.description = description;
    },
    setEditMode(state, task) {
        Vue.set(task, 'isEditMode', true);
    },
    exitEditMode(state, task) {
        Vue.set(task, 'isEditMode', false);
    },
    removeTask(state, task) {
        state.tasks.splice(state.tasks.indexOf(task), 1);
    },
    toggleCompleted(state, task) {
        task.completed = !task.completed;
    },
  },
};

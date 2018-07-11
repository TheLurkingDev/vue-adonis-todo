'use strict'

const Project = use('App/Models/Project');
const Task = use('App/Models/Task');
const AuthorizationService = use('App/Services/AuthorizationService');

class TaskController {
    async index({ auth, request, params }) {
        const user = await auth.getUser();                
        const project = await Project.find(params.id);      

        AuthorizationService.verifyPermission(project, user);

        return await project.tasks().fetch();
    }

    async create({ auth, request, params }) {
        const user = await auth.getUser();
        const { description } = request.all();
        const project = await Project.find(params.id);

        AuthorizationService.verifyPermission(project, user);

        const task = new Task();
        task.fill({
            description
        });
        
        await project.tasks().save(task);
        return task;
    }
}

module.exports = TaskController

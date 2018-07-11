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

    async destroy({ auth, request, params }) {
        const user = await auth.getUser();
        const task = await Task.find(params.id);
        const project = await task.project().fetch();
        
        AuthorizationService.verifyPermission(project, user);

        await task.delete();
        return task;
    }

    async update({ auth, request, params }) {
        const user = await auth.getUser();
        const task = await Task.find(params.id);
        const project = await task.project().fetch();
        
        AuthorizationService.verifyPermission(project, user);

        await task.merge(request.only([
            'description',
            'completed'
        ]));

        await task.save();
        return task;
    }
}

module.exports = TaskController

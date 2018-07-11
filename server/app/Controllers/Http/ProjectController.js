'use strict'

const Project = use('App/Models/Project');
const AuthorizationService = use('App/Services/AuthorizationService');

class ProjectController {
    async index({ auth }) {
        const user = await auth.getUser();        
        return await user.projects().fetch();        
    }
    
    async create({ auth, request }) {
        const user = await auth.getUser();
        const { title } = request.all();
        const project = new Project();
        project.fill({
            title
        });
        await user.projects().save(project);
        return project;
    }

    async update({ auth, request, params }) {
        const user = await auth.getUser();
        const project = await Project.find(params.id);

        AuthorizationService.verifyPermission(project, user);

        // await project.update(); Is there no support for this?
        project.merge(request.only('title'));
        await project.save();
        return project;
    }
    
    async destroy({ auth, request, params }) {
        const user = await auth.getUser();        
        const project = await Project.find(params.id);
        
        AuthorizationService.verifyPermission(project, user);

        await project.delete();
        return project;
    }
}
module.exports = ProjectController

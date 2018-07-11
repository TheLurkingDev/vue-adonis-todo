const InvalidAccessException = use('App/Exceptions/InvalidAccessException');
const ResourceDoesNotExistException = use('App/Exceptions/ResourceDoesNotExistException');

class AuthorizationService {
    verifyPermission(resource, user) {
        if(!resource) {
            throw new ResourceDoesNotExistException();
        }
        if(resource.user_id !== user.id) {
            throw new InvalidAccessException();
        }
    }
}

module.exports = new AuthorizationService();
export class UserDetailDTO {
    constructor({id, username, firstname, lastname, role, isActive, lastLogin }) {
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
        this.status = (isActive) ? 'ACTIVE' : 'DISABLED';
        this.lastLogin = lastLogin.toISOString().split('T')[0];
    }
}
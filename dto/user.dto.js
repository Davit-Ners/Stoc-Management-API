export class UserDetailDTO {
    constructor({id, username, email, firstname, lastname, role, isActive, lastLogin }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
        this.status = (isActive) ? 'ACTIVE' : 'DISABLED';
        this.lastLogin = lastLogin.toISOString().split('T')[0];
    }
}
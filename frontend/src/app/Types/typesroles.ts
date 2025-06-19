export interface UserRole {
    type: string;
}
export interface UserRoles {
    roles: UserRole[];

}
export type UserRoleType = 'admin' | 'user' | 'platinum';
export const UserRoles = ['admin', 'user'] as const;
export type UserRole = typeof UserRoles[number];

export interface User {
  id: number;
  name: string;
  role: UserRole;
}

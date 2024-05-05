export type withChildren = { children?: React.ReactNode };

export type WithClassName = { className?: string };

// Consider using $Enums.UserRole instead of UserRoleEnum
export enum UserRoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
}

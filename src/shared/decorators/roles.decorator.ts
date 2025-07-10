import { SetMetadata } from "@nestjs/common";
import { ProfileType } from "../enum";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ProfileType[]) => SetMetadata(ROLES_KEY, roles);
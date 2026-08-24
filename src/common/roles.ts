import { UserRole } from "generated/prisma/enums";

/**
 * What an account may do, as opposed to what it is currently doing.
 *
 * One person can hold both the CUSTOMER and PROVIDER roles — they sign up as
 * one and add the other from Settings — so every "is this a provider?" question
 * is asked of `roles`. `User.role` only records what the account was created
 * as and must never be used to authorise anything.
 */

/**
 * Whether an account may act in `role`, whatever mode its app is in.
 *
 * `roles` is deliberately required rather than optional: a `select` that
 * forgets the column would silently fall back to `role` and lock a dual-role
 * user out of the side they added. Making it mandatory turns that into a
 * compile error at the query instead.
 */
export function hasRole(
  subject: { roles: UserRole[] },
  role: UserRole,
): boolean {
  return subject.roles.includes(role);
}

/**
 * The same question asked of a JWT payload rather than a database row.
 *
 * Access tokens minted before dual-role accounts shipped carry only `role` and
 * stay valid until they expire, so the single-role fallback has to stand for
 * the lifetime of a token.
 */
export function tokenRoles(payload: {
  role?: UserRole | null;
  roles?: UserRole[] | null;
}): UserRole[] {
  if (payload.roles && payload.roles.length > 0) return payload.roles;
  return payload.role ? [payload.role] : [];
}

/**
 * The mode the app is currently showing.
 *
 * Only ever used for presentation and defaults — authorisation goes through
 * `hasRole`, so a request arriving moments after a switch is never rejected
 * for being in the "wrong" mode.
 */
export function activeRoleOf(subject: {
  role: UserRole;
  roles: UserRole[];
  activeRole: UserRole;
}): UserRole {
  if (hasRole(subject, subject.activeRole)) return subject.activeRole;
  return subject.roles[0] ?? subject.role;
}

/** The roles a person can switch between in the app. ADMIN is web-only. */
export const SWITCHABLE_ROLES: UserRole[] = [
  UserRole.CUSTOMER,
  UserRole.PROVIDER,
];

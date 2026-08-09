import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';

/**
 * Declares the admin permissions required to access a route.
 *
 * Permission model (future-ready): an `Admin` record's `permissions`
 * array lists the permission keys it holds. An empty permissions array
 * means full access (SUPER_ADMIN). When a permission key is added to a
 * route, only admins holding that key (or full-access admins) can use it.
 *
 * Example:
 *   @Permissions('wallet.adjust')
 *   @Post('/users/:id/adjust')
 */
export const Permissions = (...permissions: string[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);

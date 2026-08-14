/**
 * The admin permission catalogue.
 *
 * One source of truth shared by the route guards, the account-management
 * service and the dashboard UI, so a module cannot be granted in the UI without
 * a route actually honouring it.
 *
 * Each module carries a `view` key plus the action keys already used by
 * `@Permissions()` across the admin controllers. Access is granted per module
 * at one of three levels:
 *
 *   none  — no keys
 *   view  — the module's `view` key only (read-only)
 *   full  — the `view` key plus every action key
 *
 * Super admins are stored with an empty `permissions` array, which
 * PermissionsGuard already treats as unrestricted — that convention predates
 * this file and is deliberately preserved.
 */
export const ADMIN_MODULES = [
  {
    key: "overview",
    label: "Overview",
    view: "overview.view",
    actions: [] as string[],
  },
  {
    key: "providers",
    label: "Providers",
    view: "providers.view",
    actions: ["providers.suspend", "providers.ban", "ranking.recalculate"],
  },
  {
    key: "users",
    label: "Customers",
    view: "users.view",
    actions: ["users.suspend", "users.delete"],
  },
  {
    key: "jobs",
    label: "Jobs",
    view: "jobs.view",
    actions: ["jobs.cancel"],
  },
  {
    key: "categories",
    label: "Categories",
    view: "categories.view",
    actions: ["categories.manage"],
  },
  {
    key: "verifications",
    label: "Verifications",
    view: "verification.view",
    actions: ["verification.review"],
  },
  {
    key: "disputes",
    label: "Disputes",
    view: "disputes.view",
    actions: ["disputes.manage", "disputes.resolve", "penalties.review"],
  },
  {
    key: "wallet",
    label: "Wallet & Payouts",
    view: "wallet.view",
    actions: [
      "wallet.adjust",
      "wallet.freeze",
      "wallet.topups",
      "wallet.withdrawals",
    ],
  },
  {
    key: "reports",
    label: "Reports",
    view: "reports.view",
    actions: [] as string[],
  },
  {
    key: "notifications",
    label: "Notifications",
    view: "notifications.view",
    actions: ["notifications.send", "notifications.broadcast"],
  },
  {
    key: "analytics",
    label: "Analytics",
    view: "analytics.view",
    actions: [] as string[],
  },
  {
    key: "admins",
    label: "Admin accounts",
    view: "admins.view",
    actions: ["admins.manage"],
  },
] as const;

export type AdminModuleKey = (typeof ADMIN_MODULES)[number]["key"];
export type AdminAccessLevel = "none" | "view" | "full";

export const ADMIN_MODULE_KEYS = ADMIN_MODULES.map((m) => m.key);

/** Every permission key the catalogue knows about. */
export const ALL_PERMISSION_KEYS: string[] = ADMIN_MODULES.flatMap((m) => [
  m.view,
  ...m.actions,
]);

/** Expands a per-module access map into the flat key list stored on Admin. */
export function permissionsFromAccess(
  access: Partial<Record<AdminModuleKey, AdminAccessLevel>>,
): string[] {
  const keys: string[] = [];
  for (const module of ADMIN_MODULES) {
    const level = access[module.key];
    if (level === "view" || level === "full") keys.push(module.view);
    if (level === "full") keys.push(...module.actions);
  }
  return keys;
}

/**
 * The inverse, for rendering an existing admin back into the UI. A module whose
 * view key is present but which is missing some action keys reads as "view" —
 * partial grants are not representable in the three-level model, and rounding
 * down is the safe direction.
 */
export function accessFromPermissions(
  permissions: string[],
): Record<AdminModuleKey, AdminAccessLevel> {
  const held = new Set(permissions);
  const access = {} as Record<AdminModuleKey, AdminAccessLevel>;
  for (const module of ADMIN_MODULES) {
    if (!held.has(module.view)) {
      access[module.key] = "none";
    } else if (module.actions.every((action) => held.has(action))) {
      access[module.key] = "full";
    } else {
      access[module.key] = "view";
    }
  }
  return access;
}

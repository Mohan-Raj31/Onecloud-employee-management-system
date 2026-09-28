import {
  getDashboardStats,
  getPlatformHealth,
  getRecentActivities,
  getTenantGrowth,
  getTenantStatusBreakdown,
} from "./tenantService";

export async function getSuperAdminDashboard() {
  const [stats, health, growth, tenantStatus, activities] = await Promise.all([
    getDashboardStats(),
    getPlatformHealth(),
    getTenantGrowth(),
    getTenantStatusBreakdown(),
    getRecentActivities(),
  ]);

  return { stats, health, growth, tenantStatus, activities };
}

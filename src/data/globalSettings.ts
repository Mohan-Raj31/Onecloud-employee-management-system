import type { GlobalSettings } from "../types";

export const globalSettingsData: GlobalSettings = {
  settingId: "GS-001",
  settingName: "Default Global Settings",
  category: "Platform",
  description:
    "Default platform-wide settings and administrative preferences.",
  status: "Active",

  defaultLanguage: "English",
  defaultTimeZone: "Asia/Kolkata",
  defaultCurrency: "INR (₹)",
  dateFormat: "DD/MM/YYYY",
  timeFormat: "24 Hours",
  numberFormat: "1,234.56",

  sessionTimeout: 30,
  autoLogout: true,
  passwordExpiry: 90,
  maximumLoginAttempts: 5,
  maintenanceNotification: true,
  systemAnnouncement: true,

  updatedBy: "Super Administrator",
  updatedOn: "05-Oct-2026 02:30 PM",
};

export const globalSettingCategories = [
  "Platform",
  "Security",
  "Localization",
  "Application",
] as const;

export const globalSettingStatuses = [
  "Active",
  "Inactive",
] as const;

export const globalLanguages = [
  "English",
  "Hindi",
  "Tamil",
  "Telugu",
] as const;

export const globalTimeZones = [
  "Asia/Kolkata",
  "UTC",
  "Asia/Singapore",
  "Europe/London",
  "America/New_York",
] as const;

export const globalCurrencies = [
  "INR (₹)",
  "USD ($)",
  "EUR (€)",
  "GBP (£)",
] as const;

export const globalDateFormats = [
  "DD/MM/YYYY",
  "MM/DD/YYYY",
  "YYYY-MM-DD",
] as const;

export const globalTimeFormats = [
  "12 Hours",
  "24 Hours",
] as const;

export const globalNumberFormats = [
  "1,234.56",
  "1.234,56",
  "1 234.56",
] as const;

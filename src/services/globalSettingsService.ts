import { globalSettingsData } from "../data/globalSettings";

import type { GlobalSettings } from "../types";

const GLOBAL_SETTINGS_STORAGE_KEY =
  "onecloud_global_settings_v1";

const clone = <T,>(value: T): T =>
  JSON.parse(JSON.stringify(value)) as T;

function getDefaultSettings(): GlobalSettings {
  return clone(globalSettingsData);
}

function readSettings(): GlobalSettings {
  const saved = localStorage.getItem(
    GLOBAL_SETTINGS_STORAGE_KEY,
  );

  if (!saved) {
    const initial = getDefaultSettings();

    localStorage.setItem(
      GLOBAL_SETTINGS_STORAGE_KEY,
      JSON.stringify(initial),
    );

    return initial;
  }

  try {
    return JSON.parse(saved) as GlobalSettings;
  } catch {
    const initial = getDefaultSettings();

    localStorage.setItem(
      GLOBAL_SETTINGS_STORAGE_KEY,
      JSON.stringify(initial),
    );

    return initial;
  }
}

function writeSettings(
  settings: GlobalSettings,
): void {
  localStorage.setItem(
    GLOBAL_SETTINGS_STORAGE_KEY,
    JSON.stringify(settings),
  );
}

function getCurrentDateTime(): string {
  return new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function getGlobalSettings(): Promise<GlobalSettings> {
  return clone(readSettings());
}

export async function updateGlobalSettings(
  settings: GlobalSettings,
): Promise<GlobalSettings> {
  const updatedSettings: GlobalSettings = {
    ...settings,
    settingName: settings.settingName.trim(),
    description: settings.description.trim(),
    updatedBy: "Super Administrator",
    updatedOn: getCurrentDateTime(),
  };

  if (!updatedSettings.settingName) {
    throw new Error("Setting Name is required");
  }

  if (!updatedSettings.category) {
    throw new Error("Category is required");
  }

  if (!updatedSettings.defaultLanguage) {
    throw new Error("Default Language is required");
  }

  if (!updatedSettings.defaultTimeZone) {
    throw new Error("Default Time Zone is required");
  }

  if (!updatedSettings.defaultCurrency) {
    throw new Error("Default Currency is required");
  }

  if (updatedSettings.sessionTimeout <= 0) {
    throw new Error(
      "Session Timeout must be greater than zero",
    );
  }

  if (updatedSettings.passwordExpiry <= 0) {
    throw new Error(
      "Password Expiry must be greater than zero",
    );
  }

  if (updatedSettings.maximumLoginAttempts <= 0) {
    throw new Error(
      "Maximum Login Attempts must be greater than zero",
    );
  }

  writeSettings(updatedSettings);

  return clone(updatedSettings);
}

export async function resetGlobalSettings(): Promise<GlobalSettings> {
  const defaults = getDefaultSettings();

  writeSettings(defaults);

  return clone(defaults);
}

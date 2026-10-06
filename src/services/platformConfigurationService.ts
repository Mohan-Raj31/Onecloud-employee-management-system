import { platformConfigurationData } from "../data/platformConfiguration";

import type { PlatformConfiguration } from "../types";

const PLATFORM_CONFIGURATION_STORAGE_KEY =
  "onecloud_platform_configuration_v1";

const clone = <T,>(value: T): T =>
  JSON.parse(JSON.stringify(value)) as T;

function readPlatformConfiguration(): PlatformConfiguration {
  const saved = localStorage.getItem(
    PLATFORM_CONFIGURATION_STORAGE_KEY,
  );

  if (!saved) {
    const initial = clone(platformConfigurationData);

    localStorage.setItem(
      PLATFORM_CONFIGURATION_STORAGE_KEY,
      JSON.stringify(initial),
    );

    return initial;
  }

  try {
    return JSON.parse(saved) as PlatformConfiguration;
  } catch {
    const initial = clone(platformConfigurationData);

    localStorage.setItem(
      PLATFORM_CONFIGURATION_STORAGE_KEY,
      JSON.stringify(initial),
    );

    return initial;
  }
}

function writePlatformConfiguration(
  configuration: PlatformConfiguration,
) {
  localStorage.setItem(
    PLATFORM_CONFIGURATION_STORAGE_KEY,
    JSON.stringify(configuration),
  );
}

export async function getPlatformConfiguration(): Promise<PlatformConfiguration> {
  return clone(readPlatformConfiguration());
}

export async function updatePlatformConfiguration(
  data: PlatformConfiguration,
): Promise<PlatformConfiguration> {
  const updatedConfiguration = clone(data);

  writePlatformConfiguration(updatedConfiguration);

  return clone(updatedConfiguration);
}

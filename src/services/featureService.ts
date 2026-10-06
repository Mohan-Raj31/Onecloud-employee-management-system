import { featureManagementData } from "../data/features";

import type { Feature } from "../types";

const FEATURES_STORAGE_KEY =
  "onecloud_features_v1";

const clone = <T,>(value: T): T =>
  JSON.parse(JSON.stringify(value)) as T;

function readFeatures(): Feature[] {
  const saved = localStorage.getItem(
    FEATURES_STORAGE_KEY,
  );

  if (!saved) {
    const initial = clone(featureManagementData);

    localStorage.setItem(
      FEATURES_STORAGE_KEY,
      JSON.stringify(initial),
    );

    return initial;
  }

  try {
    return JSON.parse(saved) as Feature[];
  } catch {
    const initial = clone(featureManagementData);

    localStorage.setItem(
      FEATURES_STORAGE_KEY,
      JSON.stringify(initial),
    );

    return initial;
  }
}

function writeFeatures(
  features: Feature[],
) {
  localStorage.setItem(
    FEATURES_STORAGE_KEY,
    JSON.stringify(features),
  );
}

export async function getFeatures(): Promise<Feature[]> {
  return clone(readFeatures());
}

export async function updateFeature(
  id: number,
  data: Partial<Feature>,
): Promise<Feature> {
  const current = readFeatures();

  const existing = current.find(
    (feature) => feature.id === id,
  );

  if (!existing) {
    throw new Error("Feature not found");
  }

  const updatedFeature: Feature = {
    ...existing,
    ...data,
  };

  const updatedFeatures = current.map(
    (feature) =>
      feature.id === id
        ? updatedFeature
        : feature,
  );

  writeFeatures(updatedFeatures);

  return clone(updatedFeature);
}

export async function setFeatureStatus(
  id: number,
  status: Feature["status"],
): Promise<Feature> {
  return updateFeature(id, {
    status,
  });
}
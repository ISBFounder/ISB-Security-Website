export type FeatureStatus = "foundation" | "development" | "planned" | "future";

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface FeatureItem {
  name: string;
  description: string;
  status: FeatureStatus;
}

export interface FeatureCategory {
  title: string;
  description: string;
  features: FeatureItem[];
}

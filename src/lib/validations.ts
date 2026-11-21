import { z } from "zod";

const honeypot = z.string().max(0).optional().or(z.literal(""));

export const enquiryTypes = [
  "general",
  "platform",
  "pilot",
  "partnership",
  "security",
  "other",
] as const;

export type EnquiryType = (typeof enquiryTypes)[number];

export const enquiryTypeLabels: Record<EnquiryType, string> = {
  general: "General enquiry",
  platform: "Platform enquiry",
  pilot: "Pilot conversation",
  partnership: "Strategic partnership",
  security: "Security / responsible disclosure",
  other: "Other",
};

export const contactSchema = z.object({
  name: z
    .string({ required_error: "name_required", invalid_type_error: "name_required" })
    .trim()
    .min(2, "name_required")
    .max(120),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  email: z
    .string({ required_error: "email_invalid", invalid_type_error: "email_invalid" })
    .trim()
    .email("email_invalid")
    .max(200)
    .transform((v) => v.toLowerCase()),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z
    .string({ required_error: "subject_required", invalid_type_error: "subject_required" })
    .trim()
    .min(2, "subject_required")
    .max(200),
  message: z
    .string({
      required_error: "message_incomplete",
      invalid_type_error: "message_incomplete",
    })
    .trim()
    .min(20, "message_incomplete")
    .max(5000),
  enquiryType: z.enum(enquiryTypes).default("general"),
  privacy: z.literal("on", {
    errorMap: () => ({ message: "privacy_required" }),
  }),
  website: honeypot,
});

export const companySizeOptions = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+",
] as const;

export const workforceSizeOptions = [
  "1-10",
  "11-50",
  "51-100",
  "101-250",
  "251-500",
  "501-1000",
  "1000+",
  "unknown",
] as const;

export const sectorOptions = [
  "object",
  "mobile",
  "event",
  "retail",
  "corporate",
  "healthcare",
  "education",
  "municipal",
  "government",
  "other",
] as const;

export const sectorLabels: Record<(typeof sectorOptions)[number], string> = {
  object: "Object Security",
  mobile: "Mobile Patrol",
  event: "Event Security",
  retail: "Retail Security",
  corporate: "Corporate Security",
  healthcare: "Healthcare Security",
  education: "Educational Security",
  municipal: "Municipal Security",
  government: "Government Contracts",
  other: "Other",
};

export const reportingMethodOptions = [
  "paper",
  "spreadsheets",
  "word_pdf",
  "security_software",
  "internal",
  "multiple",
  "other",
] as const;

export const reportingMethodLabels: Record<(typeof reportingMethodOptions)[number], string> = {
  paper: "Paper forms",
  spreadsheets: "Spreadsheets",
  word_pdf: "Word / PDF templates",
  security_software: "Existing security software",
  internal: "Internal software",
  multiple: "Multiple systems",
  other: "Other",
};

export const challengeOptions = [
  "reporting_consistency",
  "repeated_admin",
  "object_information",
  "personnel_context",
  "planning",
  "patrol_verification",
  "incident_followup",
  "customer_visibility",
  "compliance_audit",
  "mobile_workflows",
  "offline_workflows",
  "operational_analytics",
  "ai_reporting",
  "system_fragmentation",
  "other",
] as const;

export const challengeLabels: Record<(typeof challengeOptions)[number], string> = {
  reporting_consistency: "Reporting consistency",
  repeated_admin: "Repeated administration",
  object_information: "Object information",
  personnel_context: "Personnel context",
  planning: "Planning",
  patrol_verification: "Patrol verification",
  incident_followup: "Incident follow-up",
  customer_visibility: "Customer visibility",
  compliance_audit: "Compliance / auditability",
  mobile_workflows: "Mobile workflows",
  offline_workflows: "Offline workflows",
  operational_analytics: "Operational analytics",
  ai_reporting: "AI-assisted reporting",
  system_fragmentation: "System fragmentation",
  other: "Other",
};

export const conversationOptions = [
  "demonstration",
  "operational_fit",
  "future_pilot",
  "technology",
  "security_governance",
  "partnership",
  "other",
] as const;

export const conversationLabels: Record<(typeof conversationOptions)[number], string> = {
  demonstration: "Platform demonstration",
  operational_fit: "Operational fit",
  future_pilot: "Future pilot",
  technology: "Technology evaluation",
  security_governance: "Security / governance evaluation",
  partnership: "Strategic partnership",
  other: "Other",
};

export const timelineOptions = [
  "exploring",
  "within_3",
  "3_6",
  "6_12",
  "longer",
  "none",
] as const;

export const timelineLabels: Record<(typeof timelineOptions)[number], string> = {
  exploring: "Exploring now",
  within_3: "Within 3 months",
  "3_6": "3–6 months",
  "6_12": "6–12 months",
  longer: "Longer-term evaluation",
  none: "No fixed timeline",
};

export const demoSchema = z.object({
  company: z
    .string({ required_error: "company_required", invalid_type_error: "company_required" })
    .trim()
    .min(2, "company_required")
    .max(160),
  contactPerson: z
    .string({ required_error: "contact_required", invalid_type_error: "contact_required" })
    .trim()
    .min(2, "contact_required")
    .max(120),
  jobTitle: z.string().trim().max(120).optional().or(z.literal("")),
  email: z
    .string({ required_error: "email_business", invalid_type_error: "email_business" })
    .trim()
    .email("email_business")
    .max(200)
    .transform((v) => v.toLowerCase()),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  companySize: z.enum(companySizeOptions, {
    errorMap: () => ({ message: "company_size_required" }),
  }),
  workforceSize: z.enum(workforceSizeOptions, {
    errorMap: () => ({ message: "workforce_required" }),
  }),
  country: z
    .string({ required_error: "country_required", invalid_type_error: "country_required" })
    .trim()
    .min(2, "country_required")
    .max(80),
  website: honeypot,
  websiteUrl: z.string().trim().max(200).optional().or(z.literal("")),
  sectors: z
    .array(z.enum(sectorOptions), {
      required_error: "sector_required",
      invalid_type_error: "sector_required",
    })
    .min(1, "sector_required"),
  currentSoftware: z.string().trim().max(500).optional().or(z.literal("")),
  reportingMethods: z.array(z.enum(reportingMethodOptions)).optional().default([]),
  activeObjects: z.string().trim().max(80).optional().or(z.literal("")),
  multiCustomer: z.enum(["yes", "no", "unknown"]).optional(),
  centralPlanning: z.enum(["yes", "no", "unknown"]).optional(),
  mobileWorkforce: z.enum(["yes", "no", "unknown"]).optional(),
  challenges: z
    .array(z.enum(challengeOptions), {
      required_error: "challenge_required",
      invalid_type_error: "challenge_required",
    })
    .min(1, "challenge_required"),
  conversation: z.enum(conversationOptions, {
    errorMap: () => ({ message: "conversation_required" }),
  }),
  timeline: z.enum(timelineOptions, {
    errorMap: () => ({ message: "timeline_required" }),
  }),
  message: z.string().trim().max(5000).optional().or(z.literal("")),
  privacy: z.literal("on", {
    errorMap: () => ({ message: "privacy_required" }),
  }),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type DemoInput = z.infer<typeof demoSchema>;


export type ApplicationStatus =
  | "applied"
  | "interview"
  | "rejected"
  | "offer";

export interface JobApplication {
  id: number;
  company: string;
  position: string;
  status: ApplicationStatus;
  notes?: string | null;
}

export type ApplicationFormData = Pick<
  JobApplication,
  "company" | "position"
>;
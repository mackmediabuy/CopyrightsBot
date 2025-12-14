export enum CaseStatus {
  SUBMITTED = 'Submitted',
  UNDER_REVIEW = 'Under Review',
  NOTICE_SENT = 'Notice Sent',
  RESOLVED = 'Resolved',
  REJECTED = 'Rejected'
}

export enum Platform {
  YOUTUBE = 'YouTube',
  FACEBOOK = 'Facebook',
  INSTAGRAM = 'Instagram',
  WEBSITE = 'Website/Blog',
  OTHER = 'Other'
}

export interface Case {
  id: string;
  originalContentUrl: string;
  infringingUrl: string;
  platform: Platform;
  description: string;
  status: CaseStatus;
  dateSubmitted: string;
  notes?: string;
  aiAnalysis?: string;
}

export interface User {
  id: string;
  username: string;
  role: 'ADMIN' | 'USER';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface DmcaTemplateData {
  originalWork: string;
  infringingUrl: string;
  copyrightOwner: string;
  address: string;
  phone: string;
  email: string;
  signature: string;
}
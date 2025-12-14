import { Case, CaseStatus, Platform } from '../types';

const STORAGE_KEY = 'copyrightsbot_cases_v1';

// Initial Mock Data with more resolved cases to simulate history
const INITIAL_DATA: Case[] = [
  {
    id: 'CASE-8821',
    originalContentUrl: 'https://youtube.com/watch?v=original',
    infringingUrl: 'https://facebook.com/video/pirated123',
    platform: Platform.FACEBOOK,
    description: 'Direct re-upload of my travel vlog without permission.',
    status: CaseStatus.UNDER_REVIEW,
    dateSubmitted: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
  {
    id: 'CASE-9904',
    originalContentUrl: 'https://myblog.com/article-1',
    infringingUrl: 'https://shady-site.net/copy-paste',
    platform: Platform.WEBSITE,
    description: 'Copied my entire article text.',
    status: CaseStatus.RESOLVED,
    dateSubmitted: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'CASE-1023',
    originalContentUrl: 'https://youtube.com/original',
    infringingUrl: 'https://youtube.com/reupload',
    platform: Platform.YOUTUBE,
    description: 'Stolen video',
    status: CaseStatus.RESOLVED,
    dateSubmitted: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    id: 'CASE-1024',
    originalContentUrl: 'https://insta.com/pic',
    infringingUrl: 'https://twitter.com/stolen',
    platform: Platform.INSTAGRAM,
    description: 'Photo theft',
    status: CaseStatus.RESOLVED,
    dateSubmitted: new Date(Date.now() - 86400000 * 12).toISOString(),
  }
];

export const mockDb = {
  getCases: (): Case[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
      return INITIAL_DATA;
    }
    return JSON.parse(stored);
  },

  getCaseById: (id: string): Case | undefined => {
    const cases = mockDb.getCases();
    return cases.find(c => c.id === id);
  },

  addCase: (newCase: Omit<Case, 'id' | 'dateSubmitted' | 'status'>): Case => {
    const cases = mockDb.getCases();
    const createdCase: Case = {
      ...newCase,
      id: `CASE-${Math.floor(1000 + Math.random() * 9000)}`,
      status: CaseStatus.SUBMITTED,
      dateSubmitted: new Date().toISOString(),
    };
    cases.unshift(createdCase); // Add to top
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
    return createdCase;
  },

  updateCaseStatus: (id: string, status: CaseStatus, aiAnalysis?: string): Case | undefined => {
    const cases = mockDb.getCases();
    const index = cases.findIndex(c => c.id === id);
    if (index === -1) return undefined;

    cases[index].status = status;
    if (aiAnalysis) {
        cases[index].aiAnalysis = aiAnalysis;
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
    return cases[index];
  },

  // Helper for public statistics
  getPublicStats: () => {
    const cases = mockDb.getCases();
    // Start with a base number to match user request (900+ resolved)
    // We add the actual length to make it dynamic
    const baseResolved = 890; 
    const realResolved = cases.filter(c => c.status === CaseStatus.RESOLVED).length;
    const pending = cases.filter(c => c.status !== CaseStatus.RESOLVED && c.status !== CaseStatus.REJECTED).length;
    
    return {
      resolved: baseResolved + realResolved,
      pending: pending + 45, // Adding base pending for visual
      totalProtected: 1500 + cases.length
    };
  }
};
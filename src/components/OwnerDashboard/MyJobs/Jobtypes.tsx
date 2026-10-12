export interface JobData {
  id: string;
  title: string;
  location: string;
  status: 'Active' | 'Paused' | 'Closed';
  applicants: number;
  views: number;
  postedDate: string;
  shortlisted: number;
  avgScore: string;
}

export interface StatData {
  title: string;
  amount: string;
  change: string;
  unit: string;
}
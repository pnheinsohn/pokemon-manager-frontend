export interface IGenerateReportParams {
  reportType: 'common' | 'level';
}

export interface IDeleteReportParams {
  reportId: string;
}

export interface IReport {
  id: string;
  pendingAt: string;
  completedAt: string | null;
  failedAt: string | null;
  reportType: 'common' | 'level';
  status: 'pending' | 'completed' | 'failed';
  data: Record<string, unknown>[];
}

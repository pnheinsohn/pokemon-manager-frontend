import { reportsApiInstance } from '@/modules/apis/axios';
import type { IPaginatedResponse, ICreateResponse } from '@/modules/apis/axios/types';
import type { IGenerateReportParams, IReport } from './types';

export const reportsApi = {
  deleteReport: (reportId: string) => reportsApiInstance.delete(`/${reportId}`),

  getHighestLevelPokemonReports: () => reportsApiInstance.get<IPaginatedResponse<IReport>>('/', { params: { reportType: 'level' } }),

  getMostCommonBasePokemonReports: () => reportsApiInstance.get<IPaginatedResponse<IReport>>('/', { params: { reportType: 'common' } }),

  getReport: (reportId: string) => reportsApiInstance.get<IReport>(`/${reportId}`),

  postGenerateReport: (generateReportParams: IGenerateReportParams) => reportsApiInstance.post<ICreateResponse>('/', generateReportParams),
};

import { reportsApiInstance } from '@/modules/apis/axios';
import type { IPaginatedResponse, ICreateResponse, IDeleteResponse } from '@/modules/apis/axios/types';
import type { IGenerateReportParams, IReport, IDeleteReportParams } from './types';

export const reportsApi = {
  deleteReport: (deleteReportParams: IDeleteReportParams) => reportsApiInstance.delete<IDeleteResponse>(`/${deleteReportParams.reportId}`),

  getHighestLevelPokemonReports: () => reportsApiInstance.get<IPaginatedResponse<IReport>>('/', { params: { reportType: 'level' } }),

  getMostCommonBasePokemonReports: () => reportsApiInstance.get<IPaginatedResponse<IReport>>('/', { params: { reportType: 'common' } }),

  getReport: (reportId: string) => reportsApiInstance.get<IReport>(`/${reportId}`),

  postGenerateReport: (generateReportParams: IGenerateReportParams) => reportsApiInstance.post<ICreateResponse>('/', generateReportParams),
};

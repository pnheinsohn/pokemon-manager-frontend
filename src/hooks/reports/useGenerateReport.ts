import { useMutation } from '@tanstack/react-query';
import { reportsApi } from '@/modules/apis';
import type { IGenerateReportParams } from '@/modules/apis/reports/types';

export const useGenerateReport = () => {
  return useMutation({
    mutationFn: (generateReportParams: IGenerateReportParams) => reportsApi.postGenerateReport(generateReportParams).then(res => res.data),
  });
};

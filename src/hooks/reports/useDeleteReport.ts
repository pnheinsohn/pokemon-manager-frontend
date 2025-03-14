import { useMutation } from '@tanstack/react-query';
import { reportsApi } from '@/modules/apis';
import type { IDeleteReportParams } from '@/modules/apis/reports/types';

export const useDeleteReport = () => {
  return useMutation({
    mutationFn: (deleteReportParams: IDeleteReportParams) =>
      reportsApi.deleteReport(deleteReportParams).then((res) => res.data),
  });
};

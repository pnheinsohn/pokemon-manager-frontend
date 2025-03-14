import { useMutation } from '@tanstack/react-query';
import { reportsApi } from '@/modules/apis';

export const useDeleteReport = () => {
  return useMutation({
    mutationFn: (reportId: string) => reportsApi.deleteReport(reportId).then(res => res.data),
  });
};

import { useQuery } from '@tanstack/react-query';
import { reportsApi } from '@/modules/apis';

export const useReport = (reportId: string) => {
  return useQuery({
    queryKey: ['report', reportId],
    queryFn: () => reportsApi.getReport(reportId).then(res => res.data),
    enabled: !!reportId
  });
};

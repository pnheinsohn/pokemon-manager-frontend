import { useQuery } from '@tanstack/react-query';
import { reportsApi } from '@/modules/apis';
import type { UseQueryOptions } from '@tanstack/react-query';
import type { IReport } from '@/modules/apis/reports/types';
import type { IPaginatedResponse } from '@/modules/apis/axios/types';

export const MOST_COMMON_REPORTS_QUERY_KEY = ['reportInstances', 'common'] as const;

export const useMostCommonBasePokemonReports = (
  options?: Pick<UseQueryOptions<IPaginatedResponse<IReport>>, 'enabled'>
) => {
  return useQuery({
    queryKey: MOST_COMMON_REPORTS_QUERY_KEY,
    queryFn: () => reportsApi.getMostCommonBasePokemonReports().then(res => res.data),
    ...options
  });
};

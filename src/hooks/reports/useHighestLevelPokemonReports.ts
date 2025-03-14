import { useQuery } from '@tanstack/react-query';
import { reportsApi } from '@/modules/apis';
import type { UseQueryOptions } from '@tanstack/react-query';
import type { IReport } from '@/modules/apis/reports/types';
import type { IPaginatedResponse } from '@/modules/apis/axios/types';

export const HIGHEST_LEVEL_REPORTS_QUERY_KEY = ['reportInstances', 'level'] as const;

export const useHighestLevelPokemonReports = (
  options?: Pick<UseQueryOptions<IPaginatedResponse<IReport>>, 'enabled'>
) => {
  return useQuery({
    queryKey: HIGHEST_LEVEL_REPORTS_QUERY_KEY,
    queryFn: () => reportsApi.getHighestLevelPokemonReports().then(res => res.data),
    ...options
  });
};

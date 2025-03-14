import { useMostCommonBasePokemonReports, useHighestLevelPokemonReports, useGenerateReport } from '@/hooks/reports';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IReport } from '@/modules/apis/reports/types';
import { LoadingRow } from '@/components/LoadingRow/LoadingRow';
import { useDeleteReport } from '@/hooks/reports/useDeleteReport';
import toast from 'react-hot-toast';

function DashboardPage(): React.ReactNode {
  const [showCommon, setShowCommon] = useState(true);
  const navigate = useNavigate();

  const { data: mostCommonBasePokemonReports, isLoading: isLoadingMostCommonBasePokemonReports, refetch: refetchMostCommon } =
    useMostCommonBasePokemonReports({
      enabled: showCommon
    });

  const { data: highestLevelPokemonReports, isLoading: isLoadingHighestLevelPokemonReports, refetch: refetchHighest } =
    useHighestLevelPokemonReports({
      enabled: !showCommon
    });

  const { mutate: generateReport } = useGenerateReport();
  const { mutate: deleteReport } = useDeleteReport();

  const getStatusTimestamp = (report: IReport) => {
    if (report.completedAt) return { status: 'completed', timestamp: report.completedAt };
    if (report.failedAt) return { status: 'failed', timestamp: report.failedAt };
    return { status: 'pending', timestamp: report.pendingAt };
  };

  const handleReportClick = (reportId: string) => {
    navigate(`/dashboard/report-details/${reportId}`);
  };

  const handleDeleteReport = (e: React.MouseEvent, reportId: string) => {
    e.stopPropagation();

    deleteReport(reportId, {
      onSuccess: ({ success, error }) => {
        if (success) {
          toast.success('Report deleted successfully');
          if (showCommon) {
            refetchMostCommon();
          } else {
            refetchHighest();
          }
        } else {
          toast.error(`Failed to delete report: ${error}`);
        }
      },
      onError: () => {
        toast.error('Failed to delete report: Unknown error');
      }
    });
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full max-w-6xl">
        <div className="flex mb-4 border-b">
          <div className="flex">
            <button
              className={`px-4 py-2 ${showCommon ? 'border-b-2 border-primary font-semibold' : 'text-gray-500'}`}
              onClick={() => setShowCommon(true)}
            >
              Most Common Pokemon Reports
            </button>
            <button
              className={`px-4 py-2 ${!showCommon ? 'border-b-2 border-primary font-semibold' : 'text-gray-500'}`}
              onClick={() => setShowCommon(false)}
            >
              Highest Level Pokemon Reports
            </button>
          </div>
        </div>

        <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-background-primary text-text-primary">
              <th className="px-6 py-3 text-left">Report ID</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Timestamp</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-50">
              <td colSpan={4} className="px-6 py-4 border-b border-gray-200">
                <button
                  className="w-full text-left text-gray-400 hover:text-primary flex items-center"
                  onClick={() => generateReport({ reportType: showCommon ? 'common' : 'level' }, {
                    onSuccess: ({ success, error }) => {
                      if (success) {
                        toast.success('Report generated successfully');
                        if (showCommon) {
                          refetchMostCommon();
                        } else {
                          refetchHighest();
                        }
                      } else {
                        toast.error(`Failed to generate report: ${error}`);
                      }
                    },
                    onError: () => {
                      toast.error('Failed to generate report: Unknown error');
                    }
                  })}
                >
                  <span className="text-lg mr-2">+</span>
                  <span>Generate new report</span>
                </button>
              </td>
            </tr>
            {showCommon ? (
              isLoadingMostCommonBasePokemonReports ? (
                <LoadingRow />
              ) : (
                mostCommonBasePokemonReports?.items.map((report) => {
                  const { status, timestamp } = getStatusTimestamp(report);
                  return (
                    <tr
                      key={report.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleReportClick(report.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">{report.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">{status}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={(e) => handleDeleteReport(e, report.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )
            ) : (
              isLoadingHighestLevelPokemonReports ? (
                <LoadingRow />
              ) : (
                highestLevelPokemonReports?.items.map((report) => {
                  const { status, timestamp } = getStatusTimestamp(report);
                  return (
                    <tr
                      key={report.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleReportClick(report.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">{report.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">{status}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={(e) => handleDeleteReport(e, report.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardPage;

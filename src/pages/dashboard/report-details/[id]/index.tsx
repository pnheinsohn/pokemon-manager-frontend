import { useParams } from 'react-router-dom';
import React from 'react';
import { useReport } from '@/hooks/reports/useReport';
import toast from 'react-hot-toast';

function ReportDetailsPage(): React.ReactNode {
  const { id } = useParams();
  const { data: report, isLoading, error, refetch } = useReport(id || '');

  const handleRefetch = () => {
    refetch().then(
      () => toast.success('Report data refreshed'),
      () => toast.error('Failed to refresh report data')
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <div className="text-red-500">Failed to load report details</div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <div className="text-gray-500">Report not found</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full max-w-6xl">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Report Details</h1>
            <button
              onClick={handleRefetch}
              className="px-4 py-2 bg-background-primary text-text-primary rounded-lg shadow-sm hover:bg-background-primary/80 transition-colors flex items-center gap-2"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>
          <div className="mb-4">
            <span className="font-medium">Report ID: </span>
            <span className="font-mono">{report.id}</span>
          </div>

          <div className="mb-4">
            <span className="font-medium">Status: </span>
            <span className={`capitalize ${
              report.status === 'completed' ? 'text-green-600' :
              report.status === 'failed' ? 'text-red-600' :
              'text-yellow-600'
            }`}>
              {report.status}
            </span>
          </div>

          <div className="mb-4">
            <span className="font-medium">Report Type: </span>
            <span className="capitalize">{report.reportType}</span>
          </div>

          <div className="mb-4">
            <span className="font-medium">Created At: </span>
            <span>{new Date(report.pendingAt).toLocaleString()}</span>
          </div>

          {report.completedAt && (
            <div className="mb-4">
              <span className="font-medium">Completed At: </span>
              <span>{new Date(report.completedAt).toLocaleString()}</span>
            </div>
          )}

          {report.failedAt && (
            <div className="mb-4">
              <span className="font-medium">Failed At: </span>
              <span>{new Date(report.failedAt).toLocaleString()}</span>
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded">
            <h2 className="text-lg font-medium mb-2">Report Data</h2>
            <pre className="whitespace-pre-wrap overflow-auto">
              {JSON.stringify(report.data, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportDetailsPage;

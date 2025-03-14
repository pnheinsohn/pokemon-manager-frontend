import React from 'react';

interface LoadingRowProps {
  colSpan?: number;
}

export function LoadingRow({ colSpan = 8 }: LoadingRowProps): React.ReactNode {
  return (
    <tr>
      <td colSpan={colSpan} className="px-6 py-4">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
        </div>
      </td>
    </tr>
  );
}

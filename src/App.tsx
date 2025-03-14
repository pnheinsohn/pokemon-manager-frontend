import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import AppLayout from './components/AppLayout/AppLayout';
import './index.css'

export const App = (): React.ReactNode => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppLayout />
        <Toaster position="top-right" />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

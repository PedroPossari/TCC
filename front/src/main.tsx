import ReactDOM from 'react-dom/client';
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import '@mantine/core/styles.css';
import './index.scss';
import App from './App';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider defaultColorScheme="auto">
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </MantineProvider>
)

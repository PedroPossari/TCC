import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import { MantineProvider } from "@mantine/core";
import App from './App.tsx';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <App />
  </MantineProvider>
)

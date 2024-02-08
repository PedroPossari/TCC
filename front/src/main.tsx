import ReactDOM from 'react-dom/client';
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import '@mantine/core/styles.css';
import './index.scss';
import App from './App';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider defaultColorScheme="auto">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MantineProvider>
)

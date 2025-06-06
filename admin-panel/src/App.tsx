import '@mantine/core/styles.css';
import {MantineProvider} from '@mantine/core';
import {theme} from './theme';
import {Layout} from "@/components/Layout/Layout";
import {Provider} from "react-redux";
import store, {persistor} from "@/store";
import {PersistGate} from "redux-persist/integration/react";
import {BrowserRouter} from "react-router-dom";
import './main.css'
import '@mantine/notifications/styles.css';
import '@mantine/dropzone/styles.css';
import {ModalsProvider} from "@mantine/modals";
import {Notifications} from "@mantine/notifications";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications position={'top-center'} autoClose={3500}/>

      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ModalsProvider>
            <PersistGate loading={null} persistor={persistor}>
              <BrowserRouter>
                <Layout/>
              </BrowserRouter>
            </PersistGate>
          </ModalsProvider>
        </Provider>
      </QueryClientProvider>
    </MantineProvider>
  );
}

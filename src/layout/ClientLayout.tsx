"use client";

import AuthProvider from "@/src/providers/AuthProvider";
import { Provider as ReduxProvider } from 'react-redux';
import { setupStore } from "@/src/store";
import { I18nProvider } from "@/src/providers/I18nProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { defaultOptions } from "@/src/core/toast";
import EasterEggModal from "@/src/components/EasterEggModal";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const store = setupStore();
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <I18nProvider>
          {children}
          <EasterEggModal />
          <ToastContainer {...defaultOptions} />
        </I18nProvider>
      </AuthProvider>
    </ReduxProvider>
  );
}
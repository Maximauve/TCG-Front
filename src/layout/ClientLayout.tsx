"use client";

import AuthProvider from "@/src/providers/AuthProvider";
import { Provider as ReduxProvider } from 'react-redux';
import { setupStore } from "@/src/store";
import { I18nProvider } from "@/src/providers/I18nProvider";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const store = setupStore();
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <I18nProvider>
          {children}
        </I18nProvider>
      </AuthProvider>
    </ReduxProvider>
  );
}
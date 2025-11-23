'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useEffect, useState } from 'react';
import { useLanguageStore } from './language-store';

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const locale = useLanguageStore((state) => state.locale);
  const [messages, setMessages] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set document direction based on locale
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;

    // Load messages for the current locale
    const loadMessages = async () => {
      try {
        const messages = await import(`../messages/${locale}.json`);
        setMessages(messages.default);
      } catch (error) {
        console.error(`Failed to load messages for locale: ${locale}`, error);
        // Fallback to English if loading fails
        const fallbackMessages = await import('../messages/en.json');
        setMessages(fallbackMessages.default);
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, [locale]);

  if (isLoading || !messages) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

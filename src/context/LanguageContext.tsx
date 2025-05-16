
import React, { createContext, useState, useContext, useEffect } from "react";
import { translations, Translations } from "@/lib/translations";

type LanguageContextType = {
  language: string;
  t: Translations;
  changeLanguage: (lang: string) => void;
};

const defaultContext: LanguageContextType = {
  language: "en",
  t: translations.en,
  changeLanguage: () => {},
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || "en";
  });

  const t = translations[language] || translations.en;

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const changeLanguage = (lang: string) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

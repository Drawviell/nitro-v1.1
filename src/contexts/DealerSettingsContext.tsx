import { createContext, useContext, useState, ReactNode } from "react";

interface DealerSettings {
  companyName: string;
  address: string;
  phone: string;
  email: string;
  salesTaxRate: number;
  markupPercentage: number;
  logo?: string;
}

interface DealerSettingsContextType {
  settings: DealerSettings;
  updateSettings: (newSettings: Partial<DealerSettings>) => void;
}

const DealerSettingsContext = createContext<DealerSettingsContextType | undefined>(undefined);

export function DealerSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<DealerSettings>({
    companyName: "ABC Trailers",
    address: "123 Dealer St",
    phone: "(555) 555-5555",
    email: "contact@abctrailers.com",
    salesTaxRate: 8.25,
    markupPercentage: 15,
  });

  const updateSettings = (newSettings: Partial<DealerSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings,
    }));
  };

  return (
    <DealerSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </DealerSettingsContext.Provider>
  );
}

export function useDealerSettings() {
  const context = useContext(DealerSettingsContext);
  if (context === undefined) {
    throw new Error("useDealerSettings must be used within a DealerSettingsProvider");
  }
  return context;
}

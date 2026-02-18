import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserContextType {
  role: string;
  region: string;
  subRegion: string;
  agroEcologicalZone: string;
  objective: string;
  crop?: string;
  budgetLevel?: string;
  farmSize?: string;
  climateRiskLevel?: string;
  isAuthenticated: boolean;
  selectedInnovations: string[];
  comparisonList: string[];
  rankingWeights: {
    readiness: number;
    adoption: number;
    sdg: number;
    regional: number;
  };
}

interface UserContextProviderProps {
  children: ReactNode;
}

const defaultContext: UserContextType = {
  role: '',
  region: '',
  subRegion: '',
  agroEcologicalZone: '',
  objective: '',
  crop: '',
  budgetLevel: '',
  farmSize: '',
  climateRiskLevel: '',
  isAuthenticated: false,
  selectedInnovations: [],
  comparisonList: [],
  rankingWeights: {
    readiness: 0.35,
    adoption: 0.30,
    sdg: 0.20,
    regional: 0.15,
  },
};

const UserContext = createContext<{
  context: UserContextType;
  updateContext: (updates: Partial<UserContextType>) => void;
  addToComparison: (innovationId: string) => void;
  removeFromComparison: (innovationId: string) => void;
  clearComparison: () => void;
  logout: () => void;
}>({
  context: defaultContext,
  updateContext: () => {},
  addToComparison: () => {},
  removeFromComparison: () => {},
  clearComparison: () => {},
  logout: () => {},
});

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [context, setContext] = useState<UserContextType>(defaultContext);

  const updateContext = (updates: Partial<UserContextType>) => {
    setContext((prev) => ({ ...prev, ...updates }));
  };

  const addToComparison = (innovationId: string) => {
    setContext((prev) => ({
      ...prev,
      comparisonList: prev.comparisonList.includes(innovationId)
        ? prev.comparisonList
        : [...prev.comparisonList, innovationId],
    }));
  };

  const removeFromComparison = (innovationId: string) => {
    setContext((prev) => ({
      ...prev,
      comparisonList: prev.comparisonList.filter((id) => id !== innovationId),
    }));
  };

  const clearComparison = () => {
    setContext((prev) => ({ ...prev, comparisonList: [] }));
  };

  const logout = () => {
    setContext(defaultContext);
  };

  return (
    <UserContext.Provider
      value={{
        context,
        updateContext,
        addToComparison,
        removeFromComparison,
        clearComparison,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const contextValue = useContext(UserContext);
  if (!contextValue) {
    throw new Error('useUserContext must be used within UserContextProvider');
  }
  return contextValue;
};

import { createContext, ReactNode, useContext, useMemo, useState } from "react"

export type AppContextType = {
  headerTitle?: string;
  setHeaderTitle: (title: string | undefined) => void; // eslint-disable-line no-unused-vars
}

const AppContext = createContext<AppContextType>({
  setHeaderTitle: () => {}
})

type Props = {
  children: ReactNode;
}

export function AppContextProvider({ children }: Props) {
  const [headerTitle, setHeaderTitle] = useState<string>()

  // Any context variable which isn't of a primitive type (string, number, boolean) should be wrapped in a useCallback to avoid infinite loops

  const contextValue = useMemo(() => ({
    headerTitle,
    setHeaderTitle,
  }), [headerTitle])

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext(): AppContextType {
  return useContext(AppContext)
}

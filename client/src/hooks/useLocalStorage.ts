import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const getInitialValue = () => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  };

  const [storedValue, setStoredValue] = useState<T>(getInitialValue);

  const setValue = (value: T) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;

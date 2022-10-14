import { useEffect, useState } from 'react';

const useLocalStorage = (key: string, initialValue?: unknown) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value?: unknown) => {
    try {
      setStoredValue(value);

      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue];
};

const useDarkMode = () => {
  const [enabled, setEnabled] = useLocalStorage('dark-theme');
  const isEnabled = typeof enabled === 'undefined' || enabled;
  if (enabled === undefined) {
    setEnabled(window.matchMedia?.('(prefers-color-scheme: dark)')?.matches);
  }

  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;

    isEnabled ? bodyClass.add(className) : bodyClass.remove(className);
  }, [enabled, isEnabled]);

  return [enabled, setEnabled];
};

export default useDarkMode;

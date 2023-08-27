import { useEffect, useState } from 'react';

const useLocalStorage = (key: string, initialValue?: boolean) => {
  const [storedValue, setStoredValue] = useState<boolean | undefined>(() => {
    try {
			const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) as boolean : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value?: boolean) => {
    try {
      setStoredValue(value);

      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
	};

  return [storedValue, setValue] as const;
};

const useDarkMode = () => {
  const [enabled, setEnabled] = useLocalStorage('dark-theme');
	const isEnabled = typeof enabled === 'undefined' || enabled;

	if (enabled === undefined) {
		const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setEnabled(prefersDarkMode);
  }

  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;

    isEnabled ? bodyClass.add(className) : bodyClass.remove(className);
  }, [enabled, isEnabled]);

  return [enabled , setEnabled] as const;
};

export default useDarkMode;

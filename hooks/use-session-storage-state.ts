import { useState } from 'react';

export const useSessionStorageState = <ValueType>(
  keyName: string,
  defaultValue: ValueType,
  deserialize = JSON.parse,
  serialize = JSON.stringify
): [ValueType, (newValue: ValueType) => void] => {
    const [storedValue, setStoredValue] = useState<ValueType>(() => {
        const value = globalThis.sessionStorage?.getItem(keyName);

        if (value !== null) {
            try {
                return deserialize(value) as ValueType;
            } catch {
                return defaultValue;
            }
        }

        if (typeof defaultValue !== 'undefined') {
            globalThis.sessionStorage?.setItem(keyName, serialize(defaultValue));
        }

        return defaultValue;
    });

    const setValue = (newValue: ValueType): void => {
        if (typeof newValue === 'string') {
            globalThis.sessionStorage?.setItem(keyName, newValue);
        } else {
            try {
                globalThis.sessionStorage?.setItem(keyName, serialize(newValue));
            } catch {
                throw new Error(`Failed to set ${keyName} in local storage.`);
            }
        }

        setStoredValue(newValue);
    };

    return [storedValue, setValue];
};
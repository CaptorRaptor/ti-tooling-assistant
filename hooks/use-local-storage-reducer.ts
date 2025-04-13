import { Dispatch, Reducer, useCallback, useEffect, useReducer } from 'react';

const initializer =
  (keyName: string, deserialize:(value:string) => any, serialize:(value: any) => string) =>
  <ValueType>(initial: ValueType) => {
    const stored = globalThis.localStorage?.getItem(keyName);
    if (stored !== null) {
        try {
            return deserialize(stored) as ValueType;
        } catch {
            return initial;
        }
    }

    if (typeof initial !== 'undefined') {
        globalThis.localStorage?.setItem(keyName, serialize(initial));
    }

    return initial;
  };

export const useLocalStorageReducer = <ValueType extends object, A>(
    keyName: string,
    reducer: Reducer<ValueType, A>,
    defaultValue: ValueType,
    deserialize = JSON.parse,
    serialize = JSON.stringify
): [ValueType, Dispatch<A>, VoidFunction] => {
    const [state, dispatch] = useReducer(reducer, defaultValue, initializer(keyName, deserialize, serialize));
    const clearValue = useCallback(() => globalThis.localStorage?.removeItem(keyName), [keyName]);

    useEffect(() => {
            globalThis.localStorage?.setItem(keyName, serialize(state));
    }, [state]);

    return [state, dispatch, clearValue];
};
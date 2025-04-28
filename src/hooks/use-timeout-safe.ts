import React, { useCallback } from 'react';

export const useTimeoutSafe = () => {
    const timeouts = React.useRef<number[]>([]);

    const set = useCallback((fn: () => void, delay: number) => {
        const id = window.setTimeout(fn, delay);

        timeouts.current.push(id);
    }, []);

    const clear = () => {
        timeouts.current.forEach((id) => clearTimeout(id));
        timeouts.current = [];
    };

    React.useEffect(() => clear, []);

    return { set, clear };
};

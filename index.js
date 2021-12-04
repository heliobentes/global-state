import { useEffect, useState } from "react";

/**
 * Set a globally/system-wide state without the use of Redux or any similar tools.\
 * Usage: const [counter, setCounter] = useGlobalState("counter", 0, false);
 * @param {string} stateId The state identificatior. Must be the same on every component you use.
 * @param {any} value The initial state value. Can be any type.
 * @param {boolean} [forceNewState] Flag to reset and force the state to the initial state value. Useful when you need to reset the state on a new component rendering. Defaults to false.
 * @returns The current state value and a function to set the current state
 */
function useGlobalState(stateId, value, forceNewState = false) {
    //handling errors
    if (typeof stateId !== "string") throw new TypeError("Global State expects a string for stateId!");
    if (forceNewState != undefined && typeof forceNewState !== "boolean") throw new TypeError("Global State expects a boolean for forceNewState!");

    const [state, changeState] = useState(undefined);


    function setState(val) {
        if (typeof window !== undefined) {
            window.globalState[stateId] = val;
            var event = new CustomEvent("setglobalstate");
            event.value = val;
            window.dispatchEvent(event);
        }
    }

    function handleGlobalStateChange(e) {
        const newVal = e.value !== undefined ? e.value : value;
        if (newVal !== state) {
            changeState(newVal);
        }
    }

    useEffect(() => {
        if (typeof window !== undefined) {
            window.addEventListener("setglobalstate", handleGlobalStateChange);
            
            if (!window.globalState) window.globalState = {};
            if (forceNewState) {
                setState(value);
            } else {
                setState(window.globalState[stateId] !== undefined ? window.globalState[stateId] : value);
            }
        }
        return () => {
            if (typeof window !== undefined) {
                window.removeEventListener("setglobalstate", handleGlobalStateChange);
            }
        }
    }, []);

    return [state, setState];
}

export default useGlobalState;
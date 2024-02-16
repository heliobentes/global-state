import React from "react";
const { useEffect, useState } = React;
/**
 * Set a globally/system-wide state without the use of Redux or any similar tools.\
 * Usage: const [counter, setCounter] = useGlobalState("counter", 0, false);
 * @param {string} stateId The state identificatior. Must be the same on every component you use.
 * @param {any} value The initial state value. Can be any type.
 * @param {boolean} [forceNewState] Flag to reset and force the state to the initial state value. Useful when you need to reset the state on a new component rendering. Defaults to false.
 * @param {object} [windowRef] The window object. Defaults to window. Use window.top for iframes.
 * @returns The current state value and a function to set the current state
 */
function useGlobalState(stateId, value, forceNewState = false, windowRef = window) {
    //handling errors
    if (typeof stateId !== "string") throw new TypeError("Global State expects a string for stateId!");
    if (forceNewState != undefined && typeof forceNewState !== "boolean") throw new TypeError("Global State expects a boolean for forceNewState!");

    const [state, changeState] = useState(undefined);


    function setState(val) {
        if (typeof windowRef !== undefined) {
            windowRef.globalState[stateId] = val;
            var event = new CustomEvent(`setglobalstate-${stateId}`);
            event.value = val;
            windowRef.dispatchEvent(event);
        }
    }

    function handleGlobalStateChange(e) {
        const newVal = e.value !== undefined ? e.value : value;
        if (newVal !== state) {
            changeState(newVal);
        }
    }

    useEffect(() => {
        if (typeof windowRef !== undefined) {
            windowRef.addEventListener(`setglobalstate-${stateId}`, handleGlobalStateChange);
            
            if (!windowRef.globalState) windowRef.globalState = {};
            if (forceNewState) {
                setState(value);
            } else {
                setState(windowRef.globalState[stateId] !== undefined ? windowRef.globalState[stateId] : value);
            }
        }
        return () => {
            if (typeof windowRef !== undefined) {
                windowRef.removeEventListener(`setglobalstate-${stateId}`, handleGlobalStateChange);
            }
        }
    }, []);

    return [state, setState];
}

export default useGlobalState;
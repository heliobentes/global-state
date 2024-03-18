import React from "react";
const { useEffect, useState } = React;
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
    if (forceNewState !== undefined && typeof forceNewState !== "boolean") throw new TypeError("Global State expects a boolean for forceNewState!");

    const [state, changeState] = useState(undefined);


    const getWindow = () => {
        if (typeof window !== "undefined") {
            try {
                window.top.addEventListener('check-top-window',()=>{});
                return window.top;
            }   catch (e) {
                console.log("ERROR",e);
                return window;
            }
        }
        return null;
    }


    function setState(val) {
        const window = getWindow();
        if (window) {
            // this condition is to make sure calls like setState(current = > current + 1) works
            // window.globalState[stateId] works like the current state
            const newValue = typeof val === "function" ? val(window.globalState[stateId]) : val;
            window.globalState[stateId] = newValue;
            var event = new CustomEvent(`setglobalstate-${stateId}`);
            event.value = newValue;
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
        const window = getWindow();
        if (window) {
            window.addEventListener(`setglobalstate-${stateId}`, handleGlobalStateChange);

            if (!window.globalState) window.globalState = {};
            if (forceNewState) {
                setState(value);
            } else {
                setState(window.globalState[stateId] !== undefined ? window.globalState[stateId] : value);
            }
        }
        return () => {
            if (window) {
                window.removeEventListener(`setglobalstate-${stateId}`, handleGlobalStateChange);
            }
        }
    }, []);

    return [state, setState];
}

export default useGlobalState;
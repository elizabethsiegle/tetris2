import { useEffect, useRef } from 'react';
import { gravityDelay } from '../constants.js';

// Fires dispatch({ type: 'TICK' }) on a timer that adjusts with level.
// Clears and re-creates the interval whenever level or phase changes.
export function useGameLoop(dispatch, phase, level) {
  const dispatchRef = useRef(dispatch);
  dispatchRef.current = dispatch;

  useEffect(() => {
    if (phase !== 'playing') return;
    const id = setInterval(() => dispatchRef.current({ type: 'TICK' }), gravityDelay(level));
    return () => clearInterval(id);
  }, [phase, level]);
}

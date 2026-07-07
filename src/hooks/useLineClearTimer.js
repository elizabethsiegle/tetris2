import { useEffect, useRef } from 'react';
import { FLASH_DURATION_MS } from '../constants.js';

// Fires dispatch({ type: 'FINISH_CLEAR' }) once, FLASH_DURATION_MS after
// entering the 'clearing' phase.
export function useLineClearTimer(dispatch, phase, clearingRows) {
  const dispatchRef = useRef(dispatch);
  dispatchRef.current = dispatch;

  useEffect(() => {
    if (phase !== 'clearing' || clearingRows.length === 0) return;
    const id = setTimeout(() => dispatchRef.current({ type: 'FINISH_CLEAR' }), FLASH_DURATION_MS);
    return () => clearTimeout(id);
  }, [phase, clearingRows]);
}

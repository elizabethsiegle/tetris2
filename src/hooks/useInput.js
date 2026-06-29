import { useEffect } from 'react';

const KEY_MAP = {
  ArrowLeft:  'MOVE_LEFT',
  ArrowRight: 'MOVE_RIGHT',
  ArrowDown:  'SOFT_DROP',
  ArrowUp:    'ROTATE',
  x:          'ROTATE',
  X:          'ROTATE',
  ' ':        'HARD_DROP',
  p:          'PAUSE',
  P:          'PAUSE',
  r:          'START',
  R:          'START',
};

// Attaches a keydown listener to window and dispatches mapped actions.
export function useInput(dispatch) {
  useEffect(() => {
    function onKeyDown(e) {
      const actionType = KEY_MAP[e.key];
      if (!actionType) return;
      e.preventDefault();
      dispatch({ type: actionType });
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [dispatch]);
}

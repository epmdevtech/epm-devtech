import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const HOVER_OPEN_DELAY_MS = 120;
export const HOVER_CLOSE_DELAY_MS = 150;

interface InspectorState {
  activeId: string | null;
  pinned: boolean;
}

const CLOSED: InspectorState = { activeId: null, pinned: false };

export interface InspectorHandlers {
  hoverEnter: (id: string) => void;
  hoverLeave: () => void;
  cancelClose: () => void;
  focusNode: (id: string) => void;
  toggleNode: (id: string) => void;
  pinActive: () => void;
  dismiss: (id: string) => void;
}

/**
 * Estado do Constellation Inspector: apenas um nó ativo por vez,
 * hover intent (abre em 120ms, fecha em 150ms) e modo "pinned" (clique/toque).
 * Todos os timers são limpos no unmount; nenhum listener global é registrado aqui.
 */
export function useConstellationInspector() {
  const [state, setState] = useState<InspectorState>(CLOSED);
  const openTimer = useRef<number | undefined>(undefined);
  const closeTimer = useRef<number | undefined>(undefined);

  const clearTimers = useCallback(() => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const handlers = useMemo<InspectorHandlers>(() => {
    const cancelClose = () => window.clearTimeout(closeTimer.current);

    const scheduleClose = () => {
      window.clearTimeout(openTimer.current);
      cancelClose();
      closeTimer.current = window.setTimeout(
        () => setState((s) => (s.pinned ? s : CLOSED)),
        HOVER_CLOSE_DELAY_MS,
      );
    };

    return {
      cancelClose,
      hoverLeave: scheduleClose,
      hoverEnter: (id) => {
        cancelClose();
        window.clearTimeout(openTimer.current);
        openTimer.current = window.setTimeout(
          () =>
            setState((s) =>
              s.pinned || s.activeId === id ? s : { activeId: id, pinned: false },
            ),
          HOVER_OPEN_DELAY_MS,
        );
      },
      focusNode: (id) => {
        clearTimers();
        setState((s) => (s.activeId === id ? s : { activeId: id, pinned: false }));
      },
      toggleNode: (id) => {
        clearTimers();
        setState((s) =>
          s.pinned && s.activeId === id ? CLOSED : { activeId: id, pinned: true },
        );
      },
      pinActive: () => {
        clearTimers();
        setState((s) => (s.activeId ? { ...s, pinned: true } : s));
      },
      dismiss: (id) => {
        clearTimers();
        setState((s) => (s.activeId === id ? CLOSED : s));
      },
    };
  }, [clearTimers]);

  return { activeId: state.activeId, pinned: state.pinned, handlers };
}

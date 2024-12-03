import { useCallback, useEffect, useRef } from "react";
import { BehaviorSubject } from "rxjs";

export function useBehaviourSubject<TData>(
  initialValue: TData
): [BehaviorSubject<TData>, (newValue: TData) => void] {
  const ref = useRef<BehaviorSubject<TData>>(new BehaviorSubject(initialValue));

  // for cleanup
  useEffect(() => {
    if (ref.current != null) {
      // initial render
      ref.current.complete();
    }

    ref.current = new BehaviorSubject(ref.current?.value);
    return () => {
      // close the current subject
      if (!ref.current.closed) {
        ref.current.complete();
      }
    };
  }, []);

  const setValue = useCallback((newValue: TData) => {
    const subject$ = ref.current;

    if (!subject$ || subject$.closed) {
      return;
    }

    subject$.next(newValue);
  }, []);

  return [ref.current, setValue];
}

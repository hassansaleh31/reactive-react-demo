import { useCallback, useState } from "react";
import { BehaviorSubject } from "rxjs";

export function useBehaviourSubject<TData>(
  initialValue: TData
): [BehaviorSubject<TData>, (newValue: TData) => void] {
  const [subject$] = useState(() => new BehaviorSubject(initialValue));

  const setValue = useCallback(
    (newValue: TData) => {
      if (!subject$.closed) {
        subject$.next(newValue);
      }
    },
    [subject$]
  );

  return [subject$, setValue];
}

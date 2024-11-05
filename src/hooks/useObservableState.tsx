import { useEffect, useState } from "react";
import { BehaviorSubject, Observable } from "rxjs";

export function useObservableState<TData>(
  source$: BehaviorSubject<TData>
): TData;

export function useObservableState<TData>(
  source$: Observable<TData>
): TData | undefined;

export function useObservableState<TData>(
  source$: Observable<TData> | BehaviorSubject<TData>
): TData {
  const [value, setValue] = useState<TData>(
    source$ instanceof BehaviorSubject ? source$.value : undefined
  );

  useEffect(() => {
    const subscription = source$.subscribe((newValue) => {
      setValue(newValue);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [source$]);

  return value;
}

import { DependencyList, useMemo } from "react";
import { Observable } from "rxjs";
import { useObservableState } from "./useObservableState";

export function usePipedObserbaleState<TData>(
  factory: () => Observable<TData>,
  deps: DependencyList
): TData | undefined {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const newObservable$ = useMemo(factory, deps);

  return useObservableState(newObservable$);
}

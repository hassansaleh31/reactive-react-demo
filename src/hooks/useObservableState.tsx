import { useEffect, useState } from "react";
import { Observable } from "rxjs";

export function useObservableState<TData>(
  source$: Observable<TData>
): TData | undefined {
  const [value, setValue] = useState<TData>();

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

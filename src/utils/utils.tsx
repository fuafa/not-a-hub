import React, { Suspense, LazyExoticComponent } from 'react';

export function WaitingComponent(C: LazyExoticComponent<any>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line react/display-name
  return (props: any) => (
    <Suspense fallback={<div>Loading...</div>}>
      <C {...props} />
    </Suspense>
  );
}

export function camel2dash(s: string): string {
  return [...s].reduce((ret, c, idx) => {
    if (c.charCodeAt(0) >= 65 && c.charCodeAt(0) <= 90 && idx !== 0) {
      ret += `-`;
    }
    ret += c.toLowerCase();

    return ret;
  }, '');
}
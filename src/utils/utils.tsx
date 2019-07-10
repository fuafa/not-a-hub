import React, { Suspense, LazyExoticComponent } from 'react';

export function WaitingComponent(C: LazyExoticComponent<any>) {
  return (props: any) => (
    <Suspense fallback={<div>Loading...</div>}>
      <C {...props} />
    </Suspense>
  );
}
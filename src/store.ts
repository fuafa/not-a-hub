import { init, RematchRootState } from '@rematch/core'
import * as models from './models/index';

export const store = init({
  models,
});

export type Store = typeof store;
export type Dispatch = typeof store.dispatch;
export type iRootState = RematchRootState<typeof models>;







// import {ExtractRematchDispatcherAsyncFromEffect, ExtractRematchDispatchersFromModels, ExtractRematchDispatchersFromEffects} from '@rematch/core';
// type F = (payload: number, mata: string) => Promise<any>;
// const foo: ExtractRematchDispatcherAsyncFromEffect<F>

// type T<R> = R extends (payload: number) => Promise<any> ? true : false;
// type H = T<F>




// declare const dispatch: ExtractRematchDispatchersFromModels<typeof models>

// dispatch.issuesAndPRs.getFeeds('issue')
// type A = typeof models['issuesAndPRs']['effects'];
// type B = ExtractRematchDispatchersFromEffects<A>;
// declare let b: B;
// b.getFeeds('');
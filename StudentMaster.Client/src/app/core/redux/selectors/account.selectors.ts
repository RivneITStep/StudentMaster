import { IAppState } from '@core/redux/state/app.state';
import { createSelector } from '@ngrx/store';
import { AccountState } from '@core/redux/state/reducers-state/account.state';

export const selectAccount = (state: IAppState) => state.account;


export const selectAccountError = createSelector(selectAccount, (state: AccountState) => state.error);
export const selectAccountIsLoading = createSelector(selectAccount, (state: AccountState) => state.isLoading);
export const selectAccountIsSuccess = createSelector(selectAccount, (state: AccountState) => state.success);
export const selectAccountIsFailed = createSelector(selectAccount, (state: AccountState) => state.failed);

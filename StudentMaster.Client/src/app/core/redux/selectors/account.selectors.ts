import { IAppState } from '@core/redux/state/app.state';

export const selectAccount = (state: IAppState) => state.account;
export const selectAccountError = (state: IAppState) => state.account.error;

import { User } from '@core/models/user';

export interface AuthState {
  user: User;
  isAuthorize: boolean;
  isLoading: boolean;
}

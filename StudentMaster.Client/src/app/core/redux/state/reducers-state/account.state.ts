import { ErrorResponse } from '@core/models/errorResponse.model';

export interface AccountState {
  isLoading: boolean;
  failed: boolean;
  success: boolean;
  error: ErrorResponse;
}

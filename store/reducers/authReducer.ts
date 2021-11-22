import { Reducer } from "redux";
import { createReducer } from "reduxsauce";
import { RegisterRequestAction, Types } from "../actions/authAction";

export interface IAuthState {}

const INITIAL_STATE: IAuthState = {};

const registerRequest: Reducer<IAuthState, RegisterRequestAction> = (
  state = INITIAL_STATE,
  action
) => {
  return state;
};

const HANLDERS = {
  [Types.REGISTER_REQUEST]: registerRequest,
};

const reducer = createReducer(INITIAL_STATE, HANLDERS);

export default reducer;

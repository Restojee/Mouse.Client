import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "@/store";
import { AnyAction } from "redux";

export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;
export const useAppDispatch: () => AppDispatch = useDispatch;

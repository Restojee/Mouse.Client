import { useDispatch } from "react-redux";
import { RootState } from "@/store";
import { AnyAction } from "redux";
import { ThunkDispatch } from "@reduxjs/toolkit";

export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;
export const useAppDispatch: () => AppDispatch = useDispatch;

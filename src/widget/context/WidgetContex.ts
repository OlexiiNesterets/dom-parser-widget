import { createContext } from "react";
import { IWidgetContex } from "./types";

export const WidgetContex = createContext<IWidgetContex>({ displayNonVisible: true, elementToIgnore: null });

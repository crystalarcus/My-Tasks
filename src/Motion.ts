import { Easing } from "react-native-reanimated";

export const EasingEmphasizedDecelerate = Easing.bezier(0.05, 0.7, 0.1, 1);
export const EasingEmphasizedAccelerate = Easing.bezier(0.3, 0, 0.8, 0.15);
export const EasingStandard = Easing.bezier(0.2, 0, 0, 1);
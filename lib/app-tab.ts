import {
    BottomTabNavigationEventMap,
    BottomTabNavigationOptions,
    createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";

const { Navigator } = createBottomTabNavigator();

export const Tabs = withLayoutContext<
    BottomTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    BottomTabNavigationEventMap
>(Navigator);

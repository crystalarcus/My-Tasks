import 'react-native-gesture-handler';
import { Icon, useTheme } from "react-native-paper";
import { TasksView } from "./Views/TasksView";
import { CompletedView } from "./Views/CompletedView";
import { SettingsView } from "./Views/SettingsView";
import { CreateTaskView } from "./Views/CreateTaskView";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { StarredView } from './Views/StarredView';
import { Easing } from 'react-native';


const Stack = createStackNavigator<RootStackParamList>();
const Tab = createMaterialBottomTabNavigator();
export const AppNavigation = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main" component={MainNavigator} />
                <Stack.Screen name="CreateTask" component={CreateTaskView} />
            </Stack.Navigator>
        </NavigationContainer>


    );
}
const MainNavigator = () => {
    const theme = useTheme();
    return <Tab.Navigator initialRouteName="Tasks"
        barStyle={{ backgroundColor: theme.colors.elevation.level2 }}
        activeColor={theme.colors.onSurface}
        inactiveColor={theme.colors.onSurfaceVariant}
        activeIndicatorStyle={{ backgroundColor: theme.colors.secondaryContainer }}
        shifting
        sceneAnimationEnabled
        sceneAnimationType='shifting'
        sceneAnimationEasing={Easing.bezier(0.2, 0, 0, 1)}>
        <Tab.Screen name={"Tasks"}
            component={TasksView}
            options={{
                tabBarIcon: () => <Icon source={"format-list-bulleted"} size={24} />,
            }} />
        <Tab.Screen name={"Starred"}
            component={StarredView}
            options={{
                tabBarIcon: ({ focused }) => <Icon source={focused ? "star" : "star-outline"} size={24} />,
            }} />
        <Tab.Screen name={"Completed"}
            component={CompletedView}
            options={{
                tabBarIcon: ({ focused }) => <Icon source={focused ? "check-circle" : "check-circle-outline"} size={24} />,
            }} />
        <Tab.Screen name={"Settings"}
            component={SettingsView}
            options={{
                tabBarIcon: ({ focused }) => <Icon source={focused ? "cog" : "cog-outline"} size={24} />,
            }} />
    </Tab.Navigator>
}

import { StyleSheet, View } from "react-native";
import { Appbar, Icon, Portal, Snackbar, Text } from "react-native-paper";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { TasksViewModel } from "../ViewModels/TasksViewModel";
import { TaskItem } from "../Components/TaskItem";
import { Fab } from "../Components/Fab";
import { useEffect } from "react";
import { setBackgroundColorAsync } from "expo-navigation-bar";


export const TasksView = () => {
    const { todo,
        extra,
        theme,
        snackVisible,
        isExtended,
        onScroll,
        onCreatePress,
        onCompletePress,
        onSnackDismiss,
        navigation,
        fabVisible,
        setFabVisible,
        onStarPress,
        onSnackUndoPress
    } = TasksViewModel();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async() => {
            setFabVisible(true);
            await setBackgroundColorAsync(theme.colors.elevation.level2);
        });
        const unsubscribe2 = navigation.addListener('blur', () => setFabVisible(false));
        return () => {
            unsubscribe();
            unsubscribe2();
        }
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: theme.colors.surface, flex: 1 }}>
            <Animated.FlatList
                style={{ height: '100%', }}
                contentContainerStyle={{ paddingHorizontal: 8, gap: 8, paddingBottom: 80, }}
                ListEmptyComponent={ListEmptyComponent}
                ListHeaderComponent={() => <Appbar mode='small'>
                    <Appbar.Content title="Tasks" />
                </Appbar>}
                stickyHeaderHiddenOnScroll
                stickyHeaderIndices={[0]}
                onScroll={onScroll}
                extraData={extra}
                data={todo}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                    return <TaskItem task={item}
                        onStarPress={onStarPress}
                        theme={theme}
                        index={index}
                        onCirclePress={onCompletePress} />
                }} />
            <Fab
                title="Create"
                isVisible={fabVisible}
                isExtended={isExtended}
                onPress={onCreatePress} />

            <Portal>
                <View style={{ bottom: 90, flex: 1 }}>
                    <Snackbar visible={snackVisible}
                        duration={3000}
                        action={{ label: "Undo", onPress: () => onSnackUndoPress() }}
                        onDismiss={onSnackDismiss}>
                        Task marked as completed
                    </Snackbar>
                </View>
            </Portal>
        </SafeAreaView >
    );
}


function ListEmptyComponent() {
    return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <Icon source={"checkbox-marked-circle-outline"} size={40} />
        <Text style={{ fontSize: 18 }}>No new tasks</Text>
    </View>);
}
const styles = StyleSheet.create({
    fabStyle: {
        bottom: 16,
        right: 16,
        position: 'absolute',
    },
});
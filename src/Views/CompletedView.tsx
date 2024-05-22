import { useEffect } from "react";
import { View } from "react-native";
import { Appbar, Portal, Snackbar } from "react-native-paper";
import Animated, { CurvedTransition } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { CompletedViewModel } from "../ViewModels/CompletedViewModel";
import { TaskCompletedItem } from "../Components/TaskItem";
import { EasingStandard } from "../Motion";

export const CompletedView = () => {
    const { completed,
        extra,
        snackVisible,
        theme,
        onRestorePress,
        onSnackDismiss,
        RefreshList,
        navigation,
    } = CompletedViewModel();
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            RefreshList();
        });
        return unsubscribe;
    }, [completed.toString()])
    return (
        <SafeAreaView style={{ backgroundColor: theme.colors.surface, flex: 1 }}>
            <Animated.FlatList
                ListHeaderComponent={() => <Appbar mode='small'>
                    <Appbar.Content title="Completed" />
                </Appbar>}
                // @ts-ignore
                itemLayoutAnimation={CurvedTransition.easingY(EasingStandard).duration(450)}
                stickyHeaderHiddenOnScroll
                stickyHeaderIndices={[0]}
                extraData={extra}
                contentContainerStyle={{ paddingHorizontal: 8, gap: 8, flex: 1 }}
                keyExtractor={(item) => item.id}
                data={completed}
                renderItem={({ item, index }) => {
                    return <TaskCompletedItem task={item}
                        theme={theme}
                        index={index}
                        onPress={onRestorePress} />
                }} />

            <Portal>
                <View style={{ bottom: 90, flex: 1 }}>
                    <Snackbar visible={snackVisible}
                        duration={3000}
                        action={{ label: "Undo", onPress: () => { } }}
                        onDismiss={onSnackDismiss}>
                        Task restored
                    </Snackbar>
                </View>
            </Portal>
        </SafeAreaView >
    );
}



import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Icon, IconButton, MD3Theme, Portal, Snackbar, Text, TouchableRipple } from "react-native-paper";
import Animated, { CurvedTransition } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { StarredViewModel } from "../ViewModels/StarredViewModel";
import { Fab } from "../Components/Fab";
import { TaskItem } from "../Components/TaskItem";
import { setBackgroundColorAsync } from "expo-navigation-bar";
import { EasingStandard } from "../Motion";


export const StarredView = () => {
    const {
        todo,
        starredList,
        extra,
        theme,
        snackVisible,
        isExtended,
        LoadStarredList,
        navigation,
        onScroll,
        onCreatePress,
        onCompletePress,
        onSnackDismiss,
        fabVisible,
        setFabVisible,
        onStarPress
    } = StarredViewModel();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            LoadStarredList();
            setFabVisible(true);
            await setBackgroundColorAsync(theme.colors.elevation.level2);
        });
        const unsubscribe2 = navigation.addListener('blur', () => setFabVisible(false));
        return () => {
            unsubscribe();
            unsubscribe2();
        };
    }, [todo.length]);

    return (
        <SafeAreaView style={{ backgroundColor: theme.colors.surface, flex: 1 }}>
            <Animated.FlatList
                style={{ height: '100%', }}
                contentContainerStyle={{ paddingHorizontal: 8, gap: 8, paddingBottom: 80, }}
                ListEmptyComponent={ListEmptyComponent}
                ListHeaderComponent={() => <Appbar mode='small'>
                    <Appbar.Content title="Starred" />
                </Appbar>}
                // @ts-ignore
                itemLayoutAnimation={CurvedTransition.easingY(EasingStandard).duration(450)}
                stickyHeaderHiddenOnScroll
                stickyHeaderIndices={[0]}
                onScroll={onScroll}
                extraData={extra}
                data={starredList}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                    return <TaskItem task={item}
                        theme={theme}
                        onStarPress={onStarPress}
                        index={index}
                        onCirclePress={onCompletePress} />
                }} />
            <Fab
                title="Starred"
                isVisible={fabVisible}
                isExtended={isExtended}
                onPress={onCreatePress} />

            <Portal>
                <View style={{ bottom: 90, flex: 1 }}>
                    <Snackbar visible={snackVisible}
                        duration={3000}
                        action={{ label: "Undo", onPress: () => { } }}
                        onDismiss={onSnackDismiss}>
                        Task marked as completed
                    </Snackbar>
                </View>
            </Portal>
        </SafeAreaView >
    );
}

const ListEmptyComponent = () =>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: '50%' }}>
        <Icon source={"star-outline"} size={55} />
        <Text style={{ fontSize: 22 }}>No starred tasks</Text>
        <Text style={{ fontSize: 14 }}>Starred tasks will appear here</Text>
    </View>

const styles = StyleSheet.create({

});
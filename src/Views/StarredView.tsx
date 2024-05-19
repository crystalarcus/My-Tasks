import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Icon, IconButton, MD3Theme, Portal, Snackbar, Text, TouchableRipple } from "react-native-paper";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { StarredViewModel } from "../ViewModels/StarredViewModel";
import { Fab } from "../Components/Fab";
import { TaskItem } from "../Components/TaskItem";


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
        setFabVisible
    } = StarredViewModel();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            LoadStarredList();
            setFabVisible(true);
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
                stickyHeaderHiddenOnScroll
                stickyHeaderIndices={[0]}
                onScroll={onScroll}
                extraData={extra}
                data={starredList}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                    return <TaskItem task={item}
                        theme={theme}
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <Icon source={"star-outline"} size={40} />
        <Text style={{ fontSize: 18 }}>No starred tasks</Text>
    </View>

const styles = StyleSheet.create({

});
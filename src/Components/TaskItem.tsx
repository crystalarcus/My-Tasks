import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { MD3Theme, TouchableRipple, Icon, IconButton } from "react-native-paper";
import Animated from "react-native-reanimated";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

export const TaskItem = ({ task, theme, index, onCirclePress, onStarPress }: {
    task: Task, theme: MD3Theme, index: number,
    onCirclePress: (index: number) => void,
    onStarPress: (index: number) => void
}) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    return (
        <Animated.View
            style={{
                backgroundColor: theme.colors.surfaceVariant,
                borderRadius: 16,
                overflow: 'hidden',
            }}>
            <TouchableRipple unstable_pressDelay={60} onPress={() => { navigation.navigate("CreateTask", { task: task, index: index }) }}>
                <View style={styles.container}>
                    <View style={styles.contentView}>
                        <View style={{ borderRadius: 20, overflow: 'hidden' }} >
                            <TouchableRipple onPress={() => onCirclePress(index)} >
                                <View style={[styles.circle, { borderColor: theme.colors.onSurfaceVariant }]}>
                                    {task.isComplete ? <Icon source={'check'} size={18} /> : null}
                                </View>
                            </TouchableRipple>
                        </View>

                        <View style={styles.subContentView}>
                            <Text style={[styles.titleStyle, { color: theme.colors.onSurface }]}>{task.title}</Text>
                            {task.date ?
                                <Text style={[styles.contentStyle, { color: theme.colors.onSurfaceVariant }]}>{task.date?.toString() + task.time?.toString()}</Text>
                                : null
                            }
                        </View>
                    </View>
                    <IconButton onPress={() =>onStarPress(index)} icon={task.isStarred ? 'star' : 'star-outline'}
                        iconColor={task.isStarred ? theme.colors.primary : theme.colors.onSurfaceVariant} />
                </View>
            </TouchableRipple >
        </Animated.View >

    );
}
export const TaskCompletedItem = ({ task, theme, index, onPress }: {
    task: Task, theme: MD3Theme, index: number,
    onPress: (index: number) => void,
}) => {
    return (
        <Animated.View
            style={{
                // @ts-ignore
                backgroundColor: theme.colors.surfaceContainer,
                borderRadius: 16,
                overflow: 'hidden',
            }}>
            <TouchableRipple unstable_pressDelay={45} onPress={() => onPress(index)}>
                <View style={styles.container}>
                    <View style={styles.contentView}>
                        <View style={[styles.circle, { borderColor: theme.colors.onSurfaceVariant }]}>
                            {task.isComplete ? <Icon source={'check'} size={18} /> : null}
                        </View>
                        <View style={styles.subContentView}>
                            <Text style={[styles.titleStyle, { color: theme.colors.onSurface }]}>{task.title}</Text>
                            {task.date ?
                                <Text style={[styles.contentStyle, { color: theme.colors.onSurfaceVariant }]}>{task.date?.toString() + task.time?.toString()}</Text>
                                : null
                            }
                        </View>
                    </View>
                    <IconButton onPress={() => { }} icon={task.isStarred ? 'star' : 'star-outline'}
                        iconColor={task.isStarred ? theme.colors.primary : theme.colors.onSurfaceVariant} />
                </View>
            </TouchableRipple >
        </Animated.View >

    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    contentView: {
        flexDirection: 'row',
        gap: 16,
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    subContentView: {
        flexDirection: 'column',
        gap: 4
    },
    circle: {
        height: 28,
        width: 28,
        borderRadius: 20,
        borderWidth: 2.4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: '400'
    },
    contentStyle: {
        fontSize: 14,
        fontWeight: '400',
    },
});
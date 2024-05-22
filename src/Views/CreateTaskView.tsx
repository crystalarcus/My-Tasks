import { View } from "react-native";
import { Appbar, Button, Divider, IconButton, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { CreateTaskViewModel } from "../ViewModels/CreateTaskViewModel";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import Animated, { EntryAnimationsValues, EntryExitAnimationFunction, withTiming, ZoomIn } from "react-native-reanimated";
import { EasingEmphasizedAccelerate, EasingEmphasizedDecelerate } from "../Motion";
import { DefaultStyle } from "react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes";
import { DatePickerModal } from "react-native-paper-dates";

export const CreateTaskView = ({ route }:
    NativeStackScreenProps<RootStackParamList, 'CreateTask'>) => {
    const {
        theme,
        title,
        date,
        isStarred,
        onTitleChange,
        onStarPress,
        onbackButtonPress,
        isDatePickerOpen,
        openDateModal,
        onDateModalDismiss,
        onDateConfirm,
        onCreateButtonPress, } = CreateTaskViewModel(
            route.params?.task,
            route.params?.index
        );
    const screenEnteringAnim: EntryExitAnimationFunction = (value: EntryAnimationsValues) => {
        'worklet';
        const animations = {
            opacity: withTiming(1, { duration: 100, easing: EasingEmphasizedDecelerate }),
            transform: [{ scale: withTiming(1, { duration: 450, easing: EasingEmphasizedDecelerate }) }]
        }
        const initialValues = {
            opacity: 0,
            transform: [{ scale: 0.45 }]
        }
        return {
            animations,
            initialValues
        }
    }
    return (
        // @ts-ignore
        <Animated.View entering={screenEnteringAnim}
            style={{ flex: 1, backgroundColor: theme.colors.surface }}>
            <SafeAreaView>
                <Appbar mode='small' style={{ backgroundColor: 'transparent' }}>
                    <Appbar.BackAction onPress={onbackButtonPress} />
                    <Appbar.Content title="Create task" />
                    <Appbar.Action icon={isStarred ? 'star' : 'star-outline'}
                        iconColor={isStarred ? theme.colors.primary : theme.colors.onSurface}
                        onPress={onStarPress} />
                </Appbar>
                <View style={{ paddingHorizontal: 16, gap: 24, }}>
                    <TextInput label="Title"
                        onChangeText={text => onTitleChange(text)}
                        mode="outlined"
                        value={title}
                        style={{ height: 56 }} />
                    <Divider />
                    <View style={{ gap: 18 }}>
                        <Text style={{ fontSize: 18 }}>Date and Time</Text>
                        {date == undefined ? <Button mode='contained-tonal'
                            onPress={openDateModal}
                            style={{ borderRadius: 36 }}
                            contentStyle={{ height: 56 }}
                            icon={'plus'} >Add Date and Time</Button> :
                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: theme.colors.surfaceVariant,
                                paddingVertical: 12,
                                borderRadius: 24,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingHorizontal: 16
                            }}>
                                <Text style={{ fontSize: 16 }}>{JSON.stringify(date).substring(1, 11)}</Text>
                                <Button mode='contained' onPress={openDateModal}>Change </Button>
                            </View>}
                    </View>
                    <Divider />
                    <View style={{ gap: 18 }}>
                        <Text style={{ fontSize: 18 }}>Sub tasks</Text>
                        <TextInput mode='outlined'
                            placeholder="Add a sub task"
                            placeholderTextColor={theme.colors.outline}
                            left={<TextInput.Icon
                                size={24}
                                icon={'plus'}
                                onPress={() => { }} />}
                            contentStyle={{ height: 52 }}
                            maxFontSizeMultiplier={2}
                            outlineStyle={{ borderRadius: 30 }} />
                    </View>

                </View>
            </SafeAreaView>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                position: 'absolute',
                width: '100%',
                right: 16,
                bottom: 16
            }}>
                <Button icon={route.params?.task ? undefined : 'plus'}
                    mode='contained-tonal'
                    onPress={() => onCreateButtonPress()}>{route.params?.task ? "Save" : "Create"}</Button>
            </View>
            <DatePickerModal
                locale="en"
                label='Select due date'
                mode='single'
                visible={isDatePickerOpen}
                onDismiss={onDateModalDismiss}
                date={date}
                onConfirm={onDateConfirm} />
        </Animated.View>
    );
}
import { View } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { CreateTaskViewModel } from "../ViewModels/CreateTaskViewModel";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

export const CreateTaskView = ({ route }: NativeStackScreenProps<RootStackParamList, 'CreateTask'>) => {

    const {
        theme,
        title,
        isStarred,
        onTitleChange,
        onStarPress,
        onbackButtonPress,
        onCreateButtonPress, } = CreateTaskViewModel(
            route.params?.task,
            route.params?.index
        );
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.surface }}>
            <Appbar mode='small' style={{ backgroundColor: 'transparent' }}>
                <Appbar.BackAction onPress={onbackButtonPress} />
                <Appbar.Content title="Create task" />
                <Appbar.Action icon={isStarred ? 'star' : 'star-outline'}
                    iconColor={isStarred ? theme.colors.primary : theme.colors.onSurface}
                    onPress={onStarPress} />
            </Appbar>
            <View style={{ paddingHorizontal: 16, gap: 12, }}>
                <TextInput label="Title"
                    onChangeText={text => onTitleChange(text)}
                    mode="outlined"
                    value={title}
                    style={{ backgroundColor: 'transparent' }} />
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                position: 'absolute',
                width: '100%',
                right: 16,
                bottom: 16
            }}>
                <Button icon={'plus'}
                    mode='contained'
                    onPress={() => onCreateButtonPress()}>Create</Button>
            </View>
        </SafeAreaView>
    );
}
import { ScrollView } from "react-native-gesture-handler";
import { Appbar, Button, List, Portal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { SettingsViewModel } from "../ViewModels/SettingsViewModel";
import { ThemeDialog } from "../Components/Dialogs";
import { StyleSheet, View } from "react-native";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

function capitalizeFirstLetter(value: string): string {
    return value[0].toUpperCase() + value.substring(1)
}

export const SettingsView = () => {

    const ViewModel = SettingsViewModel();

    return (
        <SafeAreaView style={{
            flex: 1,
            // @ts-ignore
            backgroundColor: ViewModel.theme.colors.surface
        }}>
            <Appbar mode="small" style={{ backgroundColor: 'transparent' }}>
                <Appbar.Content title="Settings" />
            </Appbar>
            <ScrollView style={{ flex: 1, paddingHorizontal: 12 }}>
                <SettingsItem title="Theme"
                    onPress={ViewModel.onThemeItemPress}
                    colors={ViewModel.theme.colors}
                    right={() =>
                        <Button icon={ViewModel.appTheme == 'system' ? 'brightness-4' :
                            ViewModel.appTheme == 'light' ? 'white-balance-sunny' : 'brightness-2'
                        }
                            mode="contained-tonal">
                            {capitalizeFirstLetter(ViewModel.appTheme)}
                        </Button>} />
            </ScrollView>
            <Portal>
                <ThemeDialog
                    visible={ViewModel.isThemeDialogVisible}
                    onDismiss={ViewModel.onThemeDialogDismis}
                    onThemeChange={ViewModel.onThemeChange}
                    appTheme={ViewModel.appTheme}
                />
            </Portal>
        </SafeAreaView>

    );
}

type SettingsItemProps = {
    title: string,
    right: () => React.ReactNode | undefined,
    onPress: () => void,
    colors: MD3Colors
}

const SettingsItem = ({ title, right, onPress, colors }: SettingsItemProps) => {
    return (
        <View style={styles.listOutline}>
            <List.Item title={title}
                titleStyle={styles.listTitle}
                right={right}
                style={[
                    styles.listStyle,
                    // @ts-ignore
                    { backgroundColor: colors.surfaceContainerLow }
                ]}
                onPress={onPress} />
        </View>
    );
}

const styles = StyleSheet.create({
    listOutline: {
        borderRadius: 24,
        overflow: 'hidden',
    },
    listStyle: {
        borderRadius: 24,
        paddingHorizontal: 8,
        paddingVertical: 12
    },
    listTitle: {
        fontSize: 18
    }
})
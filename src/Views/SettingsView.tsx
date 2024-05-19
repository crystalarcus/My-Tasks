import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export const SettingsView = () => {
    return (
        <SafeAreaView>
            <Appbar mode="small">
                <Appbar.Content title="Settings" />
            </Appbar>
        </SafeAreaView>

    );
}
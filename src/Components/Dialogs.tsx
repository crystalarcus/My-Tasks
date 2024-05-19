import { StyleSheet } from "react-native"
import { Button, Dialog, RadioButton } from "react-native-paper"

// Settings Dialogs------------------------------------------------
type ThemeDialogProps = {
    visible: boolean,
    appTheme: string,
    onDismiss: () => void,
    onThemeChange: (value: string) => void,
}
export const ThemeDialog = ({ visible, onDismiss, appTheme, onThemeChange }: ThemeDialogProps) => {
    return (
        <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Title>Theme</Dialog.Title>
            <Dialog.Content style={styles.dialogContent}>
                <RadioButton.Group
                    value={appTheme}
                    onValueChange={value => onThemeChange(value)}>
                    <RadioButton.Item label="System"
                        style={styles.listStyle}
                        labelStyle={styles.labelStyle}
                        value="system" />
                    <RadioButton.Item label="Light"
                        style={styles.listStyle}
                        labelStyle={styles.labelStyle}
                        value="light" />
                    <RadioButton.Item label="Dark"
                        style={styles.listStyle}
                        labelStyle={styles.labelStyle}
                        value="dark" />
                </RadioButton.Group>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={onDismiss}>Done</Button>
            </Dialog.Actions>
        </Dialog>
    )
}

const styles = StyleSheet.create({
    dialogContent: {
        paddingHorizontal: 0
    },
    listStyle: {
        paddingHorizontal: 32,
    },
    labelStyle: {
        fontSize: 18
    }
});
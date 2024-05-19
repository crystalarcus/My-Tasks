import { View } from "react-native";
import { AnimatedFAB } from "react-native-paper";
import Animated, { ZoomIn } from "react-native-reanimated";
import { EasingEmphasizedDecelerate } from "../Motion";

type FabProps = {
    title: string,
    onPress: () => void,
    isVisible: boolean,
    isExtended: boolean,
}

export const Fab = ({ title, onPress, isVisible, isExtended }: FabProps) => (
    <View style={{
        position: 'absolute', height: '100%', bottom: 16, pointerEvents: 'box-none',
        width: '100%', alignItems: 'flex-end', justifyContent: 'flex-end'
    }}>
        {isVisible ?
            /*  @ts-ignore */
            <Animated.View entering={ZoomIn.duration(300).delay(100).easing(EasingEmphasizedDecelerate)}
                style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <AnimatedFAB
                    style={{
                        right: 16,
                        position: 'absolute'
                    }}
                    label={title}
                    icon={"plus"}
                    onPress={onPress}
                    extended={isExtended}
                    iconMode='dynamic'
                />
            </Animated.View> : true}
    </View>
);
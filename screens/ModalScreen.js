import React from 'react'
import { View, Text, Image } from 'react-native'
import tw from 'tailwind-rn';
import useAuth from '../hooks/useAuth';

const ModalScreen = () => {
    const { user } = useAuth();
    return (
        <View style={tw("flex-1 items-center pt-1")}>
            <Image
                style={tw("h-20 w-full")}
                resizeMode="contain"
                source={require("../modal.png")}
            />
        </View>
    )
}

export default ModalScreen

import { useNavigation } from '@react-navigation/core';
import React, { useLayoutEffect, useRef } from 'react'
import { View, Text, Button, TouchableOpacity, Image, StyleSheet, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-rn';
import useAuth from '../hooks/useAuth';
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";

const DUMMY_DATA = [
    {
        firstName: "Dayna",
        lastName: "Florendo",
        job: "Teacher",
        photoURL: "data:image/jpeg;base64,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",
        age: 22,
    },
    {
        firstName: "Dayna",
        lastName: "Florendo",
        job: "Teacher",
        photoURL: "data:image/jpeg;base64,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",
        age: 22,
    },
    
];

const HomeScreen = () => {
    const navigation = useNavigation();
    const { user, logout } = useAuth();
    const swipeRef = useRef(null);

    return (
        <SafeAreaView style={tw("flex-1")}>
            {/* Header */}
            <View style={tw("flex-row items-center justify-between px-5")}>
                <TouchableOpacity onPress={logout}>
                    <Image style={tw('h-10 w-10 rounded-full')}
                        source={{ uri: user.photoURL }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
                    <Image style={tw('h-14 w-14')}
                        source={require("../logo.png")} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                    <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
                </TouchableOpacity>
            </View>
            {/* End of Header */}
            
            {/* Cards */}
            <View style={tw("flex-1 -mt-6")}>
            <Swiper
                ref={swipeRef} 
                containerStyle={{ backgroundColor: "transparent" }}
                cards={DUMMY_DATA}
                stackSize={5}
                cardIndex={0}
                verticalSwipe={false}
                onSwipedLeft={() => {
                    console.log("Swipe NOPE");
                }}
                onSwipedRight={() => {
                    console.log("Swipe MATCH");
                }}
                backgroundColor={"#4FD0E9"}
                overlayLabels={{
                    left: {
                        title: "NOPE",
                        style: {
                            label: {
                                textAlign: "right",
                                color: "red",
                            },
                        },
                    },
                    right: {
                        title: "MATCH",
                        style: {
                            label: {
                                color: "#4DED30",
                            },
                        },
                    },
                }}
                renderCard={card => (
                    <View 
                        key={card.id} 
                        style={tw("relative bg-white h-3/4 rounded-xl")}
                    >
                        <Image 
                        style={tw("absolute top-0 h-full w-full rounded-xl")}
                        source={{ uri: card.photoURL }}
                        />

                        <View 
                            style={[
                                tw(
                                "absolute bottom-0 bg-white w-full flex-row justify-between items-center h-20 px-6 py-2 rounded-b-xl"
                            ),
                            styles.cardShadow,
                            ]}
                        >
                            <View>
                                <Text style={tw("text-xl font-bold")}>
                                    {card.firstName} {card.lastName}
                                </Text>
                                <Text>{card.job} </Text>
                             </View>
                             <Text style={tw("text-2xl font-bold")}>{card.age}</Text>
                        </View>
                    </View>
                )}
            />
            </View>
            
            <View style={tw("flex flex-row justify-evenly")}>
                <TouchableOpacity 
                onPress={() => swipeRef.current.swipeLeft()}
                style={tw("items-center justify-center rounded-full w-16 h-16 bg-red-200")}>
                    <Entypo name="cross" size={24} color="red" />
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={() => swipeRef.current.swipeRight()}
                style={tw("items-center justify-center rounded-full w-16 h-16 bg-green-200")}>
                    <AntDesign name="heart" size={24} color="green" />
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    );
};

export default HomeScreen

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
});

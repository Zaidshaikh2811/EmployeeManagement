import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";

export default function Home() {
    return (
        <ScrollView>
            {/* Soft gradient background */}
            <LinearGradient colors={["#667eea", "#764ba2"]} style={{ flex: 1 }}>
                {/* Header Section */}
                <View style={{ padding: 16 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Feather name="search" size={24} color="white" />
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "bold",
                                color: "white",
                                letterSpacing: 0.5,
                            }}
                        >
                            Employee Management
                        </Text>
                        <Entypo name="home" size={24} color="white" />
                    </View>
                </View>

                {/* Content Section */}
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 30,
                        marginBottom: 20,
                        flexDirection: "row",
                        gap: 20,
                        flex: 1,
                        paddingHorizontal: 10,
                    }}
                >
                    {/* Employee List Button */}
                    <Pressable
                        style={{
                            backgroundColor: "#5a67d8",
                            borderRadius: 8,
                            alignItems: "center",
                            padding: 16,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.3,
                            shadowRadius: 4,
                            flex: 1,
                        }}
                    >
                        <View
                            style={{
                                alignItems: "center",
                                borderRadius: 50,
                                backgroundColor: "white",
                                width: 60,
                                height: 60,
                                justifyContent: "center",
                            }}
                        >
                            <Ionicons name="person" size={28} color="#5a67d8" />
                        </View>
                        <Text
                            style={{
                                marginTop: 10,
                                fontSize: 16,
                                fontWeight: "600",
                                color: "white",
                            }}
                        >
                            Employee List
                        </Text>
                    </Pressable>

                    {/* Mark Attendance Button */}
                    <Pressable
                        style={{
                            backgroundColor: "#5a67d8",
                            borderRadius: 8,
                            flex: 1,
                            alignItems: "center",
                            padding: 16,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.3,
                            shadowRadius: 4,
                        }}
                    >
                        <View
                            style={{
                                alignItems: "center",
                                borderRadius: 50,
                                backgroundColor: "white",
                                width: 60,
                                height: 60,
                                justifyContent: "center",
                            }}
                        >
                            <Ionicons name="checkmark" size={28} color="#5a67d8" />
                        </View>
                        <Text
                            style={{
                                marginTop: 10,
                                fontSize: 16,
                                fontWeight: "600",
                                color: "white",
                            }}
                        >
                            Mark Attendance
                        </Text>
                    </Pressable>
                </View>
                <View>
                    <Pressable>
                        <View style={{
                            padding: 7,
                            borderRadius: 7,
                            width: 45,
                            height: 45,
                            backgroundColor: "white",
                            alignItems: "center",
                        }}>
                            <Ionicons name="newspaper-outline" size={24} color="black"></Ionicons>
                        </View>
                        <Text style={{
                            marginLeft: 10,
                            fontSize: 16,
                            fontWeight: "600",
                            color: "white",
                        }}>Attendance Report</Text>
                        <View style={{
                            width: 35,
                            height: 35,
                            borderRadius: 7,
                            backgroundColor: "white",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <Entypo name="chevron-right" size={24} color="black" />
                        </View>
                    </Pressable>
                </View>
            </LinearGradient>
        </ScrollView>
    );
}

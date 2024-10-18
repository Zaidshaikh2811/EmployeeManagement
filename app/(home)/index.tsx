import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Entypo, Feather, Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Home() {
    const router = useRouter()
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
                        onPress={() => router.push("/Employees")}
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
                <View style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 30,
                    marginBottom: 20,
                    flexDirection: "column", // Corrected the spelling of "column"
                    gap: 20,
                    paddingHorizontal: 5,
                    flex: 1
                }}>
                    <Pressable style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 16,
                        backgroundColor: "#4c51bf", // Darker shade for better contrast
                        borderRadius: 12, // Smoother corners for a modern look
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.4, // Stronger shadow for better depth
                        shadowRadius: 5,
                        marginBottom: 15, // Add vertical spacing between buttons
                        width: "90%", // Responsive width
                        alignSelf: "center" // Center the button
                    }}>
                        <View style={{
                            padding: 7,
                            borderRadius: 10, // Smoother icon container
                            width: 45,
                            height: 45,
                            backgroundColor: "white",
                            alignItems: "center",
                            justifyContent: "center" // Center the icon vertically
                        }}>
                            <Ionicons name="newspaper-outline" size={24} color="black" />
                        </View>
                        <Text style={{
                            marginLeft: 10,
                            fontSize: 16,
                            fontWeight: "600",
                            color: "white" // White text for better contrast against dark background
                        }}>
                            Attendance Report
                        </Text>
                        <View style={{
                            width: 35,
                            height: 35,
                            borderRadius: 10,
                            backgroundColor: "white",
                            alignItems: "center",
                            justifyContent: "center" // Center chevron icon
                        }}>
                            <Entypo name="chevron-right" size={24} color="black" />
                        </View>
                    </Pressable>

                    {/* Duplicate similar blocks for other buttons */}
                    <Pressable style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 16,
                        backgroundColor: "#4c51bf",
                        borderRadius: 12,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.4,
                        shadowRadius: 5,
                        marginBottom: 15,
                        width: "90%",
                        alignSelf: "center"
                    }}>
                        <View style={{
                            padding: 7,
                            borderRadius: 10,
                            width: 45,
                            height: 45,
                            backgroundColor: "white",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Octicons name="repo-pull" size={24} color="black" />
                        </View>
                        <Text style={{
                            marginLeft: 10,
                            fontSize: 16,
                            fontWeight: "600",
                            color: "white"
                        }}>
                            Summary Report
                        </Text>
                        <View style={{
                            width: 35,
                            height: 35,
                            borderRadius: 10,
                            backgroundColor: "white",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Entypo name="chevron-right" size={24} color="black" />
                        </View>
                    </Pressable>

                    <Pressable style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 16,
                        backgroundColor: "#4c51bf",
                        borderRadius: 12,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.4,
                        shadowRadius: 5,
                        marginBottom: 15,
                        width: "90%",
                        alignSelf: "center"
                    }}>
                        <View style={{
                            padding: 7,
                            borderRadius: 10,
                            width: 45,
                            height: 45,
                            backgroundColor: "white",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Octicons name="report" size={24} color="black" />
                        </View>
                        <Text style={{
                            marginLeft: 10,
                            fontSize: 16,
                            fontWeight: "600",
                            color: "white"
                        }}>
                            All Generate Reports
                        </Text>
                        <View style={{
                            width: 35,
                            height: 35,
                            borderRadius: 10,
                            backgroundColor: "white",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Entypo name="chevron-right" size={24} color="black" />
                        </View>
                    </Pressable>

                    <Pressable style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 16,
                        backgroundColor: "#4c51bf",
                        borderRadius: 12,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.4,
                        shadowRadius: 5,
                        marginBottom: 15,
                        width: "90%",
                        alignSelf: "center"
                    }}>
                        <View style={{
                            padding: 7,
                            borderRadius: 10,
                            width: 45,
                            height: 45,
                            backgroundColor: "white",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Ionicons name="newspaper-outline" size={24} color="black" />
                        </View>
                        <Text style={{
                            marginLeft: 10,
                            fontSize: 16,
                            fontWeight: "600",
                            color: "white"
                        }}>
                            OverTime Employees
                        </Text>
                        <View style={{
                            width: 35,
                            height: 35,
                            borderRadius: 10,
                            backgroundColor: "white",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Entypo name="chevron-right" size={24} color="black" />
                        </View>
                    </Pressable>
                </View>
                <View style={{ flexDirection: "row", width: "90%", alignSelf: "center", gap: 10 }}>
                    <View
                        style={{
                            backgroundColor: "#6b73ff", // Gradient base color
                            borderRadius: 12,
                            padding: 16,
                            marginBottom: 15,
                            width: "50%",
                            alignSelf: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            shadowColor: "rgba(0, 0, 0, 0.2)", // Lighter shadow
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.4,
                            shadowRadius: 5,
                        }}
                    >
                        <View>
                            <MaterialCommunityIcons
                                name="guy-fawkes-mask"
                                size={50}
                                color="#fefefe" // White icon
                            />
                        </View>
                        <Text style={{ fontSize: 14, fontWeight: "600", color: "#fefefe" }}>Attendance Criteria</Text>
                    </View>
                    <View
                        style={{
                            backgroundColor: "#6b73ff", // Matching gradient base color
                            borderRadius: 12,
                            padding: 16,
                            marginBottom: 15,
                            width: "50%",
                            alignSelf: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            shadowColor: "rgba(0, 0, 0, 0.2)", // Lighter shadow
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.4,
                            shadowRadius: 5,
                        }}
                    >
                        <View>
                            <Feather name="bar-chart-2" size={50} color="#fefefe" />
                        </View>
                        <Text style={{ fontSize: 14, fontWeight: "600", color: "#fefefe" }}>Increased WorkFlow</Text>
                    </View>
                </View>

                <View style={{ flexDirection: "row", width: "90%", alignSelf: "center", gap: 10 }}>
                    <View
                        style={{
                            backgroundColor: "#6b73ff", // Lighter gradient color for variation
                            borderRadius: 12,
                            padding: 16,
                            marginBottom: 15,
                            width: "50%",
                            alignSelf: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            shadowColor: "rgba(0, 0, 0, 0.2)", // Lighter shadow
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.4,
                            shadowRadius: 5,
                        }}
                    >
                        <View>
                            <MaterialCommunityIcons
                                name="guy-fawkes-mask"
                                size={50}
                                color="#fefefe" // White icon for consistency
                            />
                        </View>
                        <Text style={{ fontSize: 14, fontWeight: "600", color: "#fefefe" }}>Cost Savings</Text>
                    </View>
                    <View
                        style={{
                            backgroundColor: "#6b73ff", // Matching the second set of cards
                            borderRadius: 12,
                            padding: 8,
                            paddingTop: 23,
                            marginBottom: 15,
                            width: "50%",
                            alignSelf: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            shadowColor: "rgba(0, 0, 0, 0.2)", // Lighter shadow
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.4,
                            shadowRadius: 5,
                        }}
                    >
                        <View>
                            <Feather name="bar-chart-2" size={50} color="#fefefe" />
                        </View>
                        <Text style={{ fontSize: 14, fontWeight: "600", color: "#fefefe" }}>Employee Performance</Text>
                    </View>
                </View>


            </LinearGradient>
        </ScrollView>
    );
}

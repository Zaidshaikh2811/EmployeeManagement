import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, Text, TextInput, View } from 'react-native'

import { AntDesign, Entypo, Feather, Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";

import { useRouter } from 'expo-router';

const Employees = () => {
    const router = useRouter()
    const [Employees, setEmployees] = useState([])
    const [filteredEmployees, setFilteredEmployees] = useState([Employees])
    const [showMessage, setShowMessage] = useState(false);
    const fetchEmployees = async () => {
        try {


            const res = await axios.get('https://employeemanagement-1-e1m0.onrender.com/employees');


            setEmployees(res.data)
        } catch (error) {

            console.log(error);
        }
    }

    useEffect(() => {
        fetchEmployees()
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMessage(true);
        }, 10000); // 10 seconds delay

        // Clear timeout if component unmounts
        return () => clearTimeout(timer);
    }, []);



    const onChangeSearch = (e) => {

        setFilteredEmployees(Employees.filter((employee) => employee.employeeName.toLowerCase().includes(e.toLowerCase())))
        console.log(filteredEmployees);


    }

    // Display loading screen if no employees are loaded
    if (Employees.length === 0) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 20, // Padding to ensure text doesn't touch edges
                    backgroundColor: '#f7f7f7', // Light background for readability
                }}
            >
                {/* Back Button Icon */}
                <Ionicons
                    onPress={() => router.back()}
                    name="arrow-back"
                    size={30}
                    color="#5a67d8" // Color to match overall theme
                    style={{ marginBottom: 20 }} // Add spacing below the icon
                />

                {/* Loading Text */}
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#333', // Dark gray for readability
                        letterSpacing: 0.5,
                        marginBottom: 20, // Space between text and icon
                    }}
                >
                    Loading...
                </Text>

                {/* Message after 10 seconds */}
                {showMessage && (
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: '500',
                            color: '#ff3b30', // Use red color to catch attention
                            textAlign: 'center',
                            marginTop: 10,
                        }}
                    >
                        Please wait a moment, or try again later.
                    </Text>
                )}
            </View>
        );
    }


    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 16,
                paddingHorizontal: 10
            }}>
                <Ionicons
                    onPress={() => router.back()}
                    name="arrow-back"
                    size={24}
                    color="black"
                />

                <Pressable style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#f7fafc', // Light background for input
                    borderRadius: 10,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    marginLeft: 28,
                    flex: 1, // Take full remaining width
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3.84,
                    elevation: 2 // Android shadow
                }}>
                    <AntDesign
                        name='search1'
                        size={20}
                        color='grey'
                    />
                    <TextInput
                        style={{
                            fontSize: 16,
                            color: 'black',
                            marginLeft: 8,
                            backgroundColor: '#f7fafc',
                            width: '100%',
                            borderRadius: 5,
                            paddingVertical: 6,
                            paddingHorizontal: 10,

                            borderWidth: 0, // Remove border
                            fontWeight: '400' // Regular font weight for better readability
                        }}
                        placeholder='Search Epmloyee'
                        onChangeText={onChangeSearch}

                        placeholderTextColor="#a0aec0" // Grey placeholder text
                    />
                </Pressable>
            </View>

            <Pressable
                style={({ pressed }) => ({
                    position: "absolute",
                    bottom: 0,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    justifyContent: 'center',
                    gap: 10,
                    backgroundColor: pressed ? "#4a5568" : "#5a67d8",  // Darken on press
                    width: 220,
                    alignSelf: "center",
                    borderRadius: 12,
                    marginTop: 15,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 3.84,
                    elevation: 5, // Shadow effect for Android
                })}
                onPress={() => {
                    router.push('/addDetails');
                }}
            >
                <AntDesign name='pluscircle' size={24} color='white' />
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: 'white', // White text for contrast
                    }}
                >
                    Add Employee
                </Text>
            </Pressable>

            {filteredEmployees.length > 0 ? (
                <FlatList
                    data={filteredEmployees} // Pass the entire Employees array
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    padding: 16,
                                    marginHorizontal: 16,
                                    marginVertical: 8,
                                    borderRadius: 10,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 8,
                                    elevation: 3, // For Android shadow
                                }}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        color: 'black',
                                        marginBottom: 8
                                    }}>
                                    {item.employeeName}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: '#4a5568', // Softer color for secondary text
                                        marginBottom: 8
                                    }}>
                                    {item.email}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: '#718096' // Even softer color for tertiary text
                                    }}>
                                    {item.designation}
                                </Text>
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => item._id} // Use _id as a unique key
                />

            ) : (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: 'black',
                            letterSpacing: 0.5,
                        }}
                    >
                        No Employees Found
                    </Text>
                </View>
            )}

        </View>
    )
}

export default Employees

import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, Button, ScrollView, Switch, TouchableOpacity, Animated, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import axios from 'axios';

const AddDetails = () => {
    const router = useRouter();

    // State to hold employee details
    const [employeeId, setEmployeeId] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [email, setEmail] = useState('');
    const [designation, setDesignation] = useState('');
    const [joiningDate, setJoiningDate] = useState('');
    const [salary, setSalary] = useState('');
    const [activeEmployee, setActiveEmployee] = useState(true);
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [address, setAddress] = useState('');
    const [scaleAnimation] = useState(new Animated.Value(1));

    // Function to handle form submission
    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://employeemanagement-1-e1m0.onrender.com/addEmployee', {
                employeeId,
                employeeName,
                email,
                designation,
                joiningDate,
                salary,
                activeEmployee,
                dateOfBirth,
                phoneNo,
                address,
            });
            console.log(response.data);
            router.back();
        } catch (error) {
            console.error(error);
        }
    };

    // Handle button press animation
    const handlePressIn = () => {
        Animated.spring(scaleAnimation, {
            toValue: 0.9,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnimation, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    // Keyboard handling
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            // Handle keyboard showing, e.g., adjust layout
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            // Handle keyboard hiding, e.g., reset layout
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView style={{ flex: 1, backgroundColor: "#f7f9fc", paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16 }}>
                    <Ionicons name="arrow-back" size={24} color="black" onPress={() => { router.back() }} />
                </View>
                <View>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 20 }}>Add New Employee</Text>
                </View>

                <View style={{ marginTop: 20 }}>
                    {/* Employee ID */}
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.label}>Employee ID</Text>
                        <TextInput
                            placeholder='Enter Employee ID'
                            value={employeeId}
                            onChangeText={setEmployeeId}
                            style={styles.input}
                        />
                    </View>

                    {/* Employee Name */}
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.label}>Employee Name</Text>
                        <TextInput
                            placeholder='Enter Employee Name'
                            value={employeeName}
                            onChangeText={setEmployeeName}
                            style={styles.input}
                        />
                    </View>

                    {/* Email */}
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            placeholder='Enter Email'
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                        />
                    </View>

                    {/* Designation */}
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.label}>Designation</Text>
                        <TextInput
                            placeholder='Enter Designation'
                            value={designation}
                            onChangeText={setDesignation}
                            style={styles.input}
                        />
                    </View>

                    {/* Joining Date */}
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.label}>Joining Date</Text>
                        <TextInput
                            placeholder='YYYY-MM-DD'
                            value={joiningDate}
                            onChangeText={setJoiningDate}
                            style={styles.input}
                        />
                    </View>

                    {/* Salary */}
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.label}>Salary</Text>
                        <TextInput
                            placeholder='Enter Salary'
                            value={salary}
                            keyboardType='numeric'
                            onChangeText={setSalary}
                            style={styles.input}
                        />
                    </View>

                    {/* Active Employee */}
                    <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.label, { marginRight: 10 }]} >Active Employee:</Text>
                        <Switch
                            value={activeEmployee}
                            onValueChange={(value) => setActiveEmployee(value)}
                            thumbColor={activeEmployee ? "#f5dd4b" : "#f4f3f4"}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                        />
                        <Text style={{ marginLeft: 10, fontWeight: 'bold', minWidth: 70, textAlign: 'center', color: activeEmployee ? "green" : "red", }}>
                            {activeEmployee ? "Active" : "Inactive"}
                        </Text>
                    </View>

                    {/* Date of Birth */}
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.label}>Date of Birth</Text>
                        <TextInput
                            placeholder='YYYY-MM-DD'
                            value={dateOfBirth}
                            onChangeText={setDateOfBirth}
                            style={styles.input}
                        />
                    </View>

                    {/* Phone No */}
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.label}>Phone No</Text>
                        <TextInput
                            placeholder='Enter Phone No'
                            value={phoneNo}
                            keyboardType='numeric'
                            onChangeText={setPhoneNo}
                            style={styles.input}
                        />
                    </View>

                    {/* Address */}
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.label}>Address</Text>
                        <TextInput
                            placeholder='Enter Address'
                            value={address}
                            onChangeText={setAddress}
                            style={styles.input}
                        />
                    </View>

                    {/* Submit Button with Animation */}
                    <Animated.View style={{ transform: [{ scale: scaleAnimation }] }}>
                        <TouchableOpacity
                            onPressIn={handlePressIn}
                            onPressOut={handlePressOut}
                            onPress={handleSubmit}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Add Employee</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

// Styles
const styles = {
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
};

export default AddDetails;

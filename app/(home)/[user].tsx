import { useLocalSearchParams } from 'expo-router'
import moment from 'moment'
import React, { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'

import { AntDesign, Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import axios from 'axios';

const User = () => {
    const params = useLocalSearchParams()

    const [currentDate, setCurrentDate] = useState(moment());
    const [attendanceStatus, setAttendanceStatus] = useState("present")

    const goToNextDay = () => {
        const nextDate = moment(currentDate).add(1, 'days');
        setCurrentDate(nextDate);
    }

    const gotoPreviousDay = () => {
        const previousDate = moment(currentDate).subtract(1, 'days');
        setCurrentDate(previousDate);
    }

    const formatDate = (date: moment.Moment) => {
        return date.format('YYYY-MM-DD');
    }

    const submitAttendace = async () => {
        try {
            const attendance = {
                employeeId: params.user,
                employeeName: params.name,
                date: currentDate.format("YYYY-MM-DD"),
                status: attendanceStatus
            }
            const res = await axios.post('https://employeemanagement-1-e1m0.onrender.com/attendance', attendance)
            console.log(res.data);

            if (res.data) {
                console.log(res.data)
            }

        } catch (error) {
            console.log(error);


        }
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginHorizontal: "auto", marginVertical: 10 }}>
                <AntDesign onPress={gotoPreviousDay} name="left" size={24} color="black" />
                <Text>{formatDate(currentDate)}</Text>
                <AntDesign onPress={goToNextDay} name="right" size={24} color="black" />
            </View>

            <Pressable>
                <View
                    style={{
                        backgroundColor: 'white', // Card background
                        padding: 20, // Add more padding for better spacing
                        marginHorizontal: 16,
                        marginVertical: 8,
                        borderRadius: 12,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.15,
                        shadowRadius: 12,
                        elevation: 5,
                    }}>
                    <View style={{ marginBottom: 12 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                            <Text
                                style={{
                                    fontSize: 20, // Slightly larger for prominence
                                    fontWeight: '600', // Semi-bold for emphasis
                                    color: '#2D3748', // Darker color for primary text

                                }}>
                                {params?.employeeName}
                            </Text>

                            <Text style={{
                                fontSize: 16,
                                color: '#718096', // Soft color for secondary text
                                marginTop: 4, // Spacing between name and email,
                                marginLeft: 20
                            }}>

                                ID: {params?.employeeId}
                            </Text>
                        </View>
                        <Text
                            style={{
                                fontSize: 16,
                                color: '#718096', // Soft color for secondary text
                                marginTop: 4 // Spacing between name and email
                            }}>
                            {params?.email}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text
                            style={{
                                fontSize: 14,
                                color: '#A0AEC0',
                            }}>
                            {params?.designation}
                        </Text>


                        <View
                            style={{
                                backgroundColor: params.activeEmployee ? '#38A169' : '#E53E3E', // Green for active, red for inactive
                                paddingHorizontal: 8,
                                paddingVertical: 4,
                                borderRadius: 12,
                            }}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: 'white', // White text for contrast
                                    fontWeight: 'bold',
                                }}>
                                {params?.activeEmployee ? 'Active' : 'Inactive'}
                            </Text>
                        </View>
                    </View>
                </View>
            </Pressable>
            <View>
                <Text
                    style={{
                        fontSize: 20, // Slightly larger for prominence
                        fontWeight: '600', // Semi-bold for emphasis
                        color: '#2D3748', // Darker color for primary text
                        marginVertical: 10,
                        alignSelf: 'center'
                    }}>Attendance</Text>

            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginVertical: 10

            }}>
                <Pressable onPress={() => setAttendanceStatus("present")}>
                    {attendanceStatus == "present" ?
                        <FontAwesome5 name="dot-circle" size={24} color="green" /> :
                        <Entypo name="circle" size={24} color="red" />}
                    <Text>Present</Text>

                </Pressable>
                <Pressable onPress={() => setAttendanceStatus("absent")}>
                    {attendanceStatus == "absent" ?
                        <FontAwesome5 name="dot-circle" size={24} color="green" /> :
                        <Entypo name="circle" size={24} color="red" />}
                    <Text>Absent</Text>

                </Pressable>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginVertical: 10

            }}>
                <Pressable onPress={() => setAttendanceStatus("halfday")}>
                    {attendanceStatus == "halfday" ?
                        <FontAwesome5 name="dot-circle" size={24} color="green" /> :
                        <Entypo name="circle" size={24} color="red" />}
                    <Text>Half day</Text>

                </Pressable>
                <Pressable onPress={() => setAttendanceStatus("holiday")}>
                    {attendanceStatus == "holiday" ?
                        <FontAwesome5 name="dot-circle" size={24} color="green" /> :
                        <Entypo name="circle" size={24} color="red" />}
                    <Text>Holiday</Text>

                </Pressable>
            </View>
            <View>
                <TextInput placeholder='advanace /loans'></TextInput>
                <TextInput placeholder='Extra Bonus'></TextInput>
            </View>
            <Pressable onPress={submitAttendace}>

                <Text>Submit</Text>
            </Pressable>

        </View>
    )
}

export default User

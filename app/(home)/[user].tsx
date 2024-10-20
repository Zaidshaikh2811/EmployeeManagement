import { useLocalSearchParams, useRouter } from 'expo-router'
import moment from 'moment'
import React, { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'

import { AntDesign, Entypo, FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import axios from 'axios';

const User = () => {
    const router = useRouter()
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
                employeeId: params.employeeId,
                employeeName: params.employeeName,
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
        <View style={{ padding: 16, backgroundColor: '#f7fafc', flex: 1 }}>
            <Ionicons
                onPress={() => router.back()}
                name="arrow-back"
                size={30}
                color="#5a67d8" // Color to match overall theme
                style={{ marginBottom: 20 }} // Add spacing below the icon
            />

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <AntDesign onPress={gotoPreviousDay} name="left" size={24} color="black" />
                <Text style={{ marginHorizontal: 16, fontSize: 16, fontWeight: 'bold', color: '#2D3748' }}>{formatDate(currentDate)}</Text>
                <AntDesign onPress={goToNextDay} name="right" size={24} color="black" />
            </View>

            <Pressable>
                <View
                    style={{
                        backgroundColor: 'white',
                        padding: 20,
                        marginHorizontal: 0,
                        marginVertical: 10,
                        borderRadius: 10,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                        elevation: 5,
                    }}>
                    <View style={{ marginBottom: 12 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: '#2D3748' }}>
                                {params?.employeeName}
                            </Text>
                            <Text style={{ fontSize: 16, color: '#718096', marginLeft: 20 }}>
                                ID: {params?.employeeId}
                            </Text>
                        </View>
                        <Text style={{ fontSize: 16, color: '#718096', marginTop: 4 }}>
                            {params?.email}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: '#A0AEC0' }}>{params?.designation}</Text>

                        <View
                            style={{
                                backgroundColor: params?.activeEmployee ? '#38A169' : '#E53E3E',
                                paddingHorizontal: 8,
                                paddingVertical: 4,
                                borderRadius: 12,
                            }}>
                            <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>
                                {params?.activeEmployee ? 'Active' : 'Inactive'}
                            </Text>
                        </View>
                    </View>
                </View>
            </Pressable>

            {/* Attendance Section */}
            <View style={{ marginVertical: 16 }}>
                <Text style={{ fontSize: 20, fontWeight: '600', color: '#2D3748', textAlign: 'center', marginBottom: 12 }}>
                    Attendance
                </Text>
            </View>

            {/* Attendance Options */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 }}>
                <Pressable onPress={() => setAttendanceStatus("present")}>
                    <FontAwesome5 name={attendanceStatus === "present" ? "dot-circle" : "circle"} size={24} color={attendanceStatus === "present" ? "green" : "red"} />
                    <Text style={{ marginTop: 4, textAlign: 'center', color: '#2D3748' }}>Present</Text>
                </Pressable>
                <Pressable onPress={() => setAttendanceStatus("absent")}>
                    <FontAwesome5 name={attendanceStatus === "absent" ? "dot-circle" : "circle"} size={24} color={attendanceStatus === "absent" ? "green" : "red"} />
                    <Text style={{ marginTop: 4, textAlign: 'center', color: '#2D3748' }}>Absent</Text>
                </Pressable>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 }}>
                <Pressable onPress={() => setAttendanceStatus("halfday")}>
                    <FontAwesome5 name={attendanceStatus === "halfday" ? "dot-circle" : "circle"} size={24} color={attendanceStatus === "halfday" ? "green" : "red"} />
                    <Text style={{ marginTop: 4, textAlign: 'center', color: '#2D3748' }}>Half day</Text>
                </Pressable>
                <Pressable onPress={() => setAttendanceStatus("holiday")}>
                    <FontAwesome5 name={attendanceStatus === "holiday" ? "dot-circle" : "circle"} size={24} color={attendanceStatus === "holiday" ? "green" : "red"} />
                    <Text style={{ marginTop: 4, textAlign: 'center', color: '#2D3748' }}>Holiday</Text>
                </Pressable>
            </View>


            <View style={{ marginBottom: 16 }}>
                <TextInput
                    placeholder="Advance / Loans"
                    style={{
                        backgroundColor: '#edf2f7',
                        padding: 12,
                        borderRadius: 8,
                        marginVertical: 8,
                        fontSize: 16,
                        color: '#2D3748',
                    }}
                />
                <TextInput
                    placeholder="Extra Bonus"
                    style={{
                        backgroundColor: '#edf2f7',
                        padding: 12,
                        borderRadius: 8,
                        marginVertical: 8,
                        fontSize: 16,
                        color: '#2D3748',
                    }}
                />
            </View>


            <Pressable
                onPress={submitAttendace}
                style={{
                    backgroundColor: '#3182ce',
                    padding: 16,
                    borderRadius: 10,
                    alignItems: 'center',
                    marginVertical: 10,
                }}>
                <Text style={{ fontSize: 18, color: 'white', fontWeight: '600' }}>Submit</Text>
            </Pressable>
        </View>

    )
}

export default User

import React, { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import moment from "moment"
import axios from 'axios';
import { AntDesign } from "@expo/vector-icons";
import { router, useRouter } from 'expo-router';
const MarkAttendance = () => {
    const router = useRouter()
    const [currentDate, setCurrentDate] = useState(moment());
    const [employee, setEmployee] = useState([])
    const [loading, setLoading] = useState(true)

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

    const fetchEmployees = async () => {
        try {


            const res = await axios.get('https://employeemanagement-1-e1m0.onrender.com/employees');

            setEmployee(res.data)
            setLoading(false);
        } catch (error) {

            console.log(error);
        }
    }


    const [attendanceList, setAttendanceList] = useState([]);
    const fetchAttendance = async () => {
        try {

            const resp = await axios.get('https://employeemanagement-1-e1m0.onrender.com/attendance', {

                params: {
                    date: currentDate.format("YYYY-MM-DD")
                }
            })
            setAttendanceList(resp.data)
        } catch (error) {

            console.log(error);
        } finally {

            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEmployees();
        fetchAttendance()
    }, [currentDate])

    if (loading) {
        return <Text>Loading...</Text>
    }



    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>



            <Pressable>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginHorizontal: "auto", marginVertical: 10 }}>
                    <AntDesign onPress={gotoPreviousDay} name="left" size={24} color="black" />
                    <Text>{formatDate(currentDate)}</Text>
                    <AntDesign onPress={goToNextDay} name="right" size={24} color="black" />
                </View>
                <View
                    style={{
                        backgroundColor: 'white',
                        padding: 20,
                        marginHorizontal: 16,
                        marginVertical: 8,
                        borderRadius: 12,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.15,
                        shadowRadius: 12,
                        elevation: 5,
                    }}>
                    {
                        employee.length > 0 ? employee.map((item) => {

                            return (


                                <Pressable onPress={() => {
                                    router.push({
                                        pathname: "/[user]",
                                        params: {
                                            employeeName: item?.employeeName,
                                            email: item?.email,
                                            activeEmployee: item?.activeEmployee,
                                            employeeId: item?.employeeId,
                                            salary: item?.salary,
                                            designation: item?.designation
                                        }
                                    })
                                }

                                }>
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
                                            <Text
                                                style={{
                                                    fontSize: 20, // Slightly larger for prominence
                                                    fontWeight: '600', // Semi-bold for emphasis
                                                    color: '#2D3748', // Darker color for primary text
                                                }}>
                                                {item.employeeName}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    color: '#718096', // Soft color for secondary text
                                                    marginTop: 4 // Spacing between name and email
                                                }}>
                                                {item.email}
                                            </Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: '#A0AEC0',
                                                }}>
                                                {item.designation}
                                            </Text>


                                            <View
                                                style={{
                                                    backgroundColor: item.activeEmployee ? '#38A169' : '#E53E3E', // Green for active, red for inactive
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
                                                    {item.activeEmployee ? 'Active' : 'Inactive'}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </Pressable>

                            )
                        }) : <Text>No Employee</Text>
                    }
                </View>
            </Pressable>
        </View>
    )
}

export default MarkAttendance

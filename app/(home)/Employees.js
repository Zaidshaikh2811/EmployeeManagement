import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

import { Entypo, Feather, Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";

const Employees = () => {
    const [Employees, setEmployees] = useState([])

    const fetchEmployees = async () => {
        try {

            console.log("Request Sending");
            const res = await axios.get('http://localhost:3000/employees');


            setEmployees(res.data)
        } catch (error) {

            console.log(error);
        }
    }

    if (Employees.length === 0) {
        return (
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
                >Loading...</Text>
            </View>
        )
    }

    useEffect(() => {
        fetchEmployees()
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View>
                <Ionicons name="ios-arrow-back" size={24} color="black" />
            </View>
        </View>
    )
}

export default Employees

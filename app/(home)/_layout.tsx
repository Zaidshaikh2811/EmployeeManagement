import { Stack } from "expo-router";

export default function HomeLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                headerShown: false
            }} />
            <Stack.Screen name="Employees" options={{
                headerShown: false
            }} />
            <Stack.Screen name="addDetails" options={{
                headerShown: false
            }} />
            <Stack.Screen name="markAttendance" options={{
                headerShown: false
            }} />
            <Stack.Screen name="[user]" options={{
                headerShown: false
            }} />
            <Stack.Screen name="summary" options={{
                headerShown: false
            }} />
        </Stack>
    );
}
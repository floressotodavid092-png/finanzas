import { AuthProvider, useAuth } from "@/context/AuthProvider";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import "./global.css";

function RootNavigation() {
    const { session, loading } = useAuth();

    const router = useRouter();

    useEffect(() => {

        if (loading) return;

        if (session) {
            router.replace('/(tabs)/home')
        }
        else {
            router.replace('/(Auth)/AuthScreen')
        }
    }, [session, loading])
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator color={"blue"} size={"large"} />
            </View>
        )
    }
    return <Stack screenOptions={{ headerShown: false }} />
}
export default function RootLayout() {
    return (
        <AuthProvider>
            <RootNavigation />
        </AuthProvider>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
/**
 * Leaderboard React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const ITEM_HEIGHT = Platform.select({ios: 106.33, android: 116});
const LEADER_COUNT = 10;

interface WeatherType {
    description: string;
}

interface WeatherItem {
    sunrise: number;
    sunset: number;
    humidity: number;
    temp: number;
    weather: WeatherType[];
}

const Main = (): JSX.Element => {
    const [weather, setWeather] = useState<WeatherItem | undefined>();
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [error, setError] = useState('');

    const getWeatherData = () => {
        fetch(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=34f3bb83e6fe7e4e7218fef57c2215b7`,
        )
            .then(it => it.json())
            .then(data => {
                console.log(JSON.stringify(data, null, 4));
                if (data.cod) {
                    setError(data.message);
                    return;
                }

                if (!data) {
                    setError('Location not found!');
                    return;
                }
                setWeather(data.current);
                setLat('');
                setLng('');
            })
            .catch(error => {
                setError(error.message);
            });
    };

    const handleSearch = () => {
        if (!lat || !lng) {
            setError('Please enter latitude and longitude.');
            return;
        }
        console.log(typeof lat);
        if (!/^\d{1,}\.?\d{1,}$/.test(lat)) {
            setError('Please enter only number to latitude');
            return;
        }
        if (!/^\d{1,}\.?\d{1,}$/.test(lng)) {
            setError('Please enter only number to longitude');
            return;
        }
        setError('');
        getWeatherData();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setLat}
                        value={lat}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setLng}
                        value={lng}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSearch}>
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </View>

                {weather && (
                    <>
                        <View style={styles.labelRow}>
                            <Text style={styles.label}>Weather: </Text>
                            <Text style={styles.value}>
                                {weather?.weather[0]?.description}
                            </Text>
                        </View>
                        <View style={styles.labelRow}>
                            <Text style={styles.label}>Humidity: </Text>
                            <Text style={styles.value}>
                                {weather?.humidity}
                            </Text>
                        </View>
                        <View style={styles.labelRow}>
                            <Text style={styles.label}>temperature: </Text>
                            <Text style={styles.value}>{weather?.temp}</Text>
                        </View>
                        <View style={styles.labelRow}>
                            <Text style={styles.label}>Sunrise: </Text>
                            <Text style={styles.value}>{weather?.sunrise}</Text>
                        </View>
                        <View style={styles.labelRow}>
                            <Text style={styles.label}>Sunset: </Text>
                            <Text style={styles.value}>{weather?.sunset}</Text>
                        </View>
                    </>
                )}

                <Text style={styles.error}>{error}</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 25,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        color: '#ccc',
    },
    value: {
        fontSize: 18,
        textTransform: 'capitalize',
        fontWeight: '500',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 4,
        marginRight: 10,
    },
    button: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: 'blue',
        fontWeight: '600',
    },
    error: {
        alignSelf: 'center',
        color: 'red',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        width: 250,
    },
});

export default Main;

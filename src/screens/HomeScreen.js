import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, fetchForecast } from '../../redux/actions/weatherActions';

export default function HomeScreen({navigation}) {
    const [city, setCity] = useState('');
    const dispatch = useDispatch();
    const { currentWeather, forecast, error } = useSelector((state) => state.weather);

    const searchCity = () => {
        dispatch(fetchWeather(city));
        dispatch(fetchForecast(city));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter city name"
                value={city}
                onChangeText={setCity}
            />
            <Button title="Search" onPress={searchCity} />
            <Button title="Goto Detail" onPress={()=>{navigation.navigate('Details')}} />
            {error && <Text style={styles.error}>{error}</Text>}
            {currentWeather && (
                <View>
                    <Text>Temperature: {currentWeather.current.temp_c}°C</Text>
                    <Text>Condition: {currentWeather.current.condition.text}</Text>
                </View>
            )}
            {forecast && (
                <FlatList
                    data={forecast.forecast.forecastday}
                    keyExtractor={(item) => item.date}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{item.date}</Text>
                            <Text>High: {item.day.maxtemp_c}°C</Text>
                            <Text>Low: {item.day.mintemp_c}°C</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    input: { borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 5 },
    error: { color: 'red' },
});

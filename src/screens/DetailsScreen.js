import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import BackgroundImage from '../utils/BackgroundImage';

export default function DetailsScreen({ route, navigation }) {
    const { forecastData } = route.params;

    return (
       <>
       <BackgroundImage/>
       <ScrollView contentContainerStyle={styles.container}>
            <View>
            <Text style={styles.title}>{forecastData.date}</Text>
            <Image
                source={{ uri: `https:${forecastData.day.condition.icon}` }}
                style={styles.weatherIcon}
            />
            <Text style={styles.conditionText}>{forecastData.day.condition.text}</Text>
            
            <View style={styles.tempContainer}>
                <Text style={styles.tempText}>
                    Max: {forecastData.day.maxtemp_c}°C
                </Text>
                <Text style={styles.tempText}>
                    Min: {forecastData.day.mintemp_c}°C
                </Text>
            </View>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>
                    🌦️ Chance of Rain: {forecastData.day.daily_chance_of_rain}%
                </Text>
                <Text style={styles.detailText}>
                    💧 Humidity: {forecastData.day.avghumidity}%
                </Text>
                <Text style={styles.detailText}>
                    🌬️ Wind Speed: {forecastData.day.maxwind_kph} kph
                </Text>
                <Text style={styles.detailText}>
                    🔆 UV Index: {forecastData.day.uv}
                </Text>
                <Text style={styles.detailText}>
                    🌅 Sunrise: {forecastData.astro.sunrise}
                </Text>
                <Text style={styles.detailText}>
                    🌇 Sunset: {forecastData.astro.sunset}
                </Text>
            </View>
            <TouchableOpacity style={styles.searchButton} onPress={()=>{navigation.pop()}}>
             <Text style={styles.searchButtonText}>Go Back</Text>
            </TouchableOpacity>
        </ScrollView>
       </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#fff'
    },
    weatherIcon: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: 10,
    },
    conditionText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20,
    },
    tempContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    tempText: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'#fff'
    },
    detailsContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        elevation: 3,
        
    },
    detailText: {
        fontSize: 16,
        marginVertical: 15,
        fontWeight: '500'
    },
    searchButton: {
      backgroundColor: '#D27D2D',
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
    marginVertical: 20,
    },
    searchButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
});

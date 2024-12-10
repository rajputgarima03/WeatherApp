import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, fetchForecast ,fetchAutoSuggest} from '../../redux/actions/weatherActions';
import BackgroundImage from '../utils/BackgroundImage';

export default function HomeScreen({ navigation }) {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const [forecastDays, setForecastDays] = useState(3); // Default to 3 days
  const [showAutoSuggest, SetShowAutoSuggest] = useState(false)
  const { currentWeather,autosuggest, forecast, error } = useSelector((state) => state.weather);


  useEffect(() => {
  if(city){
    if (typeof city === 'string' && city?.trim().length > 2) {
        dispatch(fetchAutoSuggest(city));
        SetShowAutoSuggest(true)
     }
  }
}, [city]);


const searchCity = (selectedCity) => {
    SetShowAutoSuggest(false)
    dispatch(fetchWeather(selectedCity || city));
    dispatch(fetchForecast(selectedCity || city, forecastDays));
    setCity(selectedCity || city);
};

  const handleDaysChange = (days) => {
    setForecastDays(days);
    searchCity(city);
  };
  const renderForecastCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', { forecastData: item })}
    >
      <View style={styles.cardLeft}>
        <Image
          source={{ uri: `https:${item.day.condition.icon}` }}
          style={styles.weatherIconLarge}
        />
        <View>
          <Text style={styles.dateText}>{item.date}</Text>
          <Text style={styles.cardconditionText}>{item.day.condition.text}</Text>
        </View>
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.tempText}>High: {item.day.maxtemp_c}°C</Text>
        <Text style={styles.tempText}>Low: {item.day.mintemp_c}°C</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSuggestion = ({ item }) => (
  
    <TouchableOpacity
        style={styles.suggestionItem}
        onPress={() => searchCity(item?.name)}
    >
       
        <Text style={styles.suggestionText}>{`${item.name}, ${item.region}, ${item.country}`}</Text>
    </TouchableOpacity>
);
  return (
    <>  
      <BackgroundImage/>
    <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Enter city name"
      value={city}
      onChangeText={(text) => setCity(text || '')}
    />
    {autosuggest.length > 0 && showAutoSuggest && (
                <FlatList
                    data={autosuggest}
                    keyExtractor={(item) => item.id || item.name}
                    renderItem={renderSuggestion}
                    style={styles.suggestionList}
                />
            )}
     <View style={styles.chipContainer}>
        <Text style={styles.chipLabel}>Select Forecast Days</Text>
        <View style={styles.chipGroup}>
          {[1,2, 3, 4,5,6, 7,8,9, 10].map((days) => (
            <TouchableOpacity
              key={days}
              style={[
                styles.chip,
                forecastDays === days && styles.chipSelected,
              ]}
              onPress={() => handleDaysChange(days)}
            >
              <Text
                style={[
                  styles.chipText,
                  forecastDays === days && styles.chipTextSelected,
                ]}
              >
                {days} 
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    <TouchableOpacity style={styles.searchButton} onPress={()=>{searchCity(city)}}>
      <Text style={styles.searchButtonText}>Search</Text>
    </TouchableOpacity>
    {error && <Text style={styles.error}>{error}</Text>}
    {!error &&currentWeather && (
      <View style={styles.currentWeatherCard}>
        <Text style={styles.currentWeatherTitle}>Current Weather</Text>
        <Image
          source={{ uri: `https:${currentWeather.current.condition.icon}` }}
          style={styles.weatherIcon}
        />
        <Text style={styles.currentTempText}>
          {currentWeather.current.temp_c}°C
        </Text>
        <Text style={styles.conditionText}>
          {currentWeather.current.condition.text}
        </Text>
      </View>
    )}
    {!error && forecast && (
      <FlatList
        data={forecast.forecast.forecastday}
        keyExtractor={(item) => item.date}
        renderItem={renderForecastCard}
        contentContainerStyle={styles.forecastList}
      />
    )}
  </View></>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  searchButton: {
    backgroundColor: '#D27D2D',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  currentWeatherCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
   
    borderColor:'#C04000',
    borderWidth: 2
  },
  currentWeatherTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  currentTempText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007bff',
    marginVertical: 10,
  },
  conditionText: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginVertical: 10,
  },
  forecastList: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardconditionText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  tempText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
  },
  weatherIconLarge: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  chipContainer: {
    marginVertical: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  chipLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  chipGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  chip: {
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: 60,
    backgroundColor: '#f0f4f8',
  },
  chipSelected: {
    backgroundColor: '#D27D2D',
    borderColor: '#C04000',
  },
  chipText: {
    color: '#333',
    fontWeight: 'bold',
  },
  chipTextSelected: {
    color: '#fff',
  },
  forecastList: {
    paddingBottom: 20,
  },
  suggestionList: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
},
suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
},
suggestionText: { fontSize: 16, color: '#333' },
});

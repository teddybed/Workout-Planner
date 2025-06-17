import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Header from './Header';

const workoutData = {
  exercises: [
    {
      name: "Squat",
      asset_url: "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/143513.png",
      equipment: "barbell"
    },
    {
      name: "Inclined Bench Press",
      asset_url: "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/031413.png",
      equipment: "barbell"
    },
    {
      name: "Pull Ups",
      asset_url: "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/142913.png",
      equipment: "bodyweight"
    },
    {
      name: "Shoulder Press",
      asset_url: "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/040513.png",
      equipment: "dumbbell"
    },
    {
      name: "Curl Biceps",
      asset_url: "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/016513.png",
      equipment: "cable"
    },
    {
      name: "Extension Triceps",
      asset_url: "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/020013.png",
      equipment: "cable"
    }
  ]
};

export default function FilterCategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const categoryArray = workoutData.exercises.map((item, index) => ({
      id: `${item.equipment}-${index}`,
      name: item.equipment,
      image: item.asset_url,
    }));

    setCategories(categoryArray);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.imageBackground}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header />

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  card: {
    alignItems: 'center',
    marginRight: 15,
    width: 75,
  },
  imageBackground: {
    width: 72,
    height: 72,
    borderRadius: 100,
    backgroundColor: '#fff',      // white background
        
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#f3f2f7',  
    padding: 4,

  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
});

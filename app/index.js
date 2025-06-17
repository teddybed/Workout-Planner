import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
 
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { MaterialIcons } from '@expo/vector-icons';
import Header from './Header'; 
import { Image } from 'expo-image';


const workoutData = {
  exercises: [
    {
      name: 'Squat',
      asset_url:
        'https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/143513.png',
      gif_asset_url:
        'https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/143513.gif',
      equipment: 'barbell',
    },
    {
      name: 'Inclined Bench Press',
      asset_url:
        'https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/031413.png',
      gif_asset_url:
        'https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/031413.gif',
      equipment: 'barbell',
    },
    {
      name: 'Pull Ups',
      asset_url:
        'https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/142913.png',
      gif_asset_url:
        'https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/142913.gif',
      equipment: 'bodyweight',
    },
    {
      name: 'Shoulder Press',
      asset_url:
        'https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/040513.png',
      gif_asset_url:
        'https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/040513.gif',
      equipment: 'dumbbell',
    },
    {
      name: 'Curl Biceps',
      asset_url:
        'https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/016513.png',
      gif_asset_url:
        'https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/016513.gif',
      equipment: 'cable',
    },
    {
      name: 'Extension Triceps',
      asset_url:
        'https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/020013.png',
      gif_asset_url:
        'https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/020013.gif',
      equipment: 'cable',
    },
  ],
};

export default function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [backupExercises, setBackupExercises] = useState([]);

  useEffect(() => {
    const exerciseArray = workoutData.exercises.map((item, index) => ({
      id: `${item.equipment}-${index}`,
      name: item.name,
      equipment: item.equipment,
      image: item.asset_url, // PNG thumbnail
      gif: item.gif_asset_url, // GIF animation
      exerciseIndex: index,
    }));
    setExercises(exerciseArray);
    setBackupExercises(exerciseArray);
    if (exerciseArray.length > 0) {
      setSelectedId(exerciseArray[0].id);
    }
  }, []);

  const selectedExercise = selectedId
    ? exercises.find((ex) => ex.id === selectedId)
    : null;

  const removeExercise = (id) => {
    setExercises((prev) => {
      const filtered = prev.filter((item) => item.id !== id);
      if (selectedId === id) {
        setSelectedId(filtered.length > 0 ? filtered[0].id : null);
      }
      return filtered;
    });
  };

  const renderItem = ({ item, drag, isActive }) => {
    const isSelected = item.id === selectedId;

    return (
      <TouchableOpacity
        style={[styles.card, isActive && { opacity: 0.7 }]}
        onPress={() => {
          if (!editMode) setSelectedId(item.id);
        }}
        onLongPress={() => {
          if (editMode) drag();
          else setEditMode(true);
        }}
      >
        <View
          style={[
            styles.borderWrapper,
            { borderColor: isSelected ? '#ffe74c' : '#e5e4e6' },
          ]}
        >
          <View style={styles.imageBackground}>
            {/* Using expo-image's Image */}
            <Image source={{ uri: item.image }} style={styles.image} contentFit="cover" />
            {isSelected && !editMode && (
              <View style={styles.playIconContainer}>
                <MaterialIcons name="play-arrow" size={16} color="black" />
              </View>
            )}
            {editMode && (
              <TouchableOpacity
                style={styles.removeIcon}
                onPress={() => removeExercise(item.id)}
              >
                <MaterialIcons name="remove-circle" size={20} color="red" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text style={styles.text} numberOfLines={1}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const onSave = () => {
    setBackupExercises(exercises);
    setEditMode(false);
  };

  const onDiscard = () => {
    setExercises(backupExercises);
    setEditMode(false);
    if (!backupExercises.find((ex) => ex.id === selectedId)) {
      setSelectedId(backupExercises.length > 0 ? backupExercises[0].id : null);
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      <DraggableFlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onDragEnd={({ data }) => setExercises(data)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        activationDistance={editMode ? 10 : 10000}
      />

      {selectedExercise && (
        <View style={styles.detailCardWrapper}>
          <View style={styles.detailCard}>
            {/* Use expo-image's Image here for GIF animation */}
            <Image
              source={{ uri: selectedExercise.gif }}
              style={styles.detailImage}
              contentFit="contain"
            />
            <Text style={styles.detailName}>{selectedExercise.name}</Text>
            <Text style={styles.detailEquipment}>
              Equipment: {selectedExercise.equipment}
            </Text>
            <ScrollView style={styles.detailDescriptionContainer}>
              <Text style={styles.detailDescription}>
                {selectedExercise.description || 'No description available.'}
              </Text>
            </ScrollView>
          </View>
        </View>
      )}

      {editMode && (
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.discardButton]}
            onPress={onDiscard}
          >
            <Text style={styles.buttonText}>Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={onSave}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    backgroundColor: '#f9f9f9',
    flex: 1,
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
  borderWrapper: {
    width: 79,
    height: 79,
    borderRadius: 100,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    width: 72,
    height: 72,
    borderRadius: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 100,
  },
  playIconContainer: {
    position: 'absolute',
    top: '75%',
    left: '65%',
    width: 20,
    height: 20,
    backgroundColor: '#ffe74c',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  removeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
  detailCardWrapper: {
    alignItems: 'center',
    marginTop: 20,
    flex: 1,
  },
  detailCard: {
    width: 361,
    height: 348,
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  detailImage: {
    width: 300,
    height: 200,
    borderRadius: 16,
    marginBottom: 15,
  },
  detailName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#222',
  },
  detailEquipment: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  detailDescriptionContainer: {
    maxHeight: 70,
  },
  detailDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  bottomButtonsContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
        flex: 1,

  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  discardButton: {
    backgroundColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

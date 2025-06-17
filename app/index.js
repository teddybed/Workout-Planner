import React, { useEffect, useState } from 'react';
import { View,Text,TouchableOpacity,} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { MaterialIcons ,Feather,Foundation,FontAwesome5 } from '@expo/vector-icons';
import Header from '../components/Header/Header'; 
import { Image } from 'expo-image';
import styles from './indexStyle';

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
  const [viewedExercises, setViewedExercises] = useState(new Set());

  useEffect(() => {
    const exerciseArray = workoutData.exercises.map((item, index) => ({
      id: `${item.equipment}-${index}`,
      name: item.name,
      equipment: item.equipment,
      image: item.asset_url,
      gif: item.gif_asset_url,
      exerciseIndex: index,
    }));
    setExercises(exerciseArray);
    setBackupExercises(exerciseArray);
    if (exerciseArray.length > 0) {
      setSelectedId(exerciseArray[0].id);
    }
  }, []);

  useEffect(() => {
    if (selectedId) {
      setViewedExercises((prev) => {
        const newSet = new Set(prev);
        newSet.add(selectedId);
        return newSet;
      });
    }
  }, [selectedId]);

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
    if (item.isAddButton) {
      return (
        <TouchableOpacity
          style={styles.addCard}
          onPress={() => setEditMode(true)}
        >
          <View style={styles.addCircle}>
            <MaterialIcons name="add" size={28} color="black" />
          </View>
        </TouchableOpacity>
      );
    }

    const isSelected = item.id === selectedId;
    const isViewed = viewedExercises.has(item.id);

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
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              contentFit="cover"
            />

            {isSelected && !editMode && (
              <View style={styles.playIconContainer}>
                <MaterialIcons name="play-arrow" size={16} color="black" />
              </View>
            )}

            {isViewed && !isSelected && !editMode && (
              <View style={styles.checkMarkContainer}>
                <MaterialIcons name="check" size={14} color="black" />
              </View>
            )}

            {editMode && (
              <TouchableOpacity
                style={styles.removeIcon}
                onPress={() => removeExercise(item.id)}
              >
                <MaterialIcons name="remove-circle" size={20} color="#990D35" />
              </TouchableOpacity>
            )}
          </View>
        </View>
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

  const extendedExercises = [...exercises, { id: 'add-button', isAddButton: true }];

  return (
    <View style={styles.container}>
      <Header />

      <DraggableFlatList
        data={extendedExercises}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onDragEnd={({ data }) => {
          const filtered = data.filter((item) => !item.isAddButton);
          setExercises(filtered);
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        activationDistance={editMode ? 10 : 10000}
      />

      {selectedExercise && (
        <View style={styles.detailCardWrapper}>
          <View style={styles.detailCard}>
            <View style={styles.actionCard}>
              <Text style={styles.actionText}>Inclined Bench Press</Text>
              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.iconColumn}>
                  <Feather name="arrow-left" size={12} color="black" />
                  <Feather name="arrow-right" size={12} color="black" />
                </View>
                <Text style={styles.actionButtonText}>Replace</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.imageCard}>
              <Image
                source={{ uri: selectedExercise.gif }}
                style={styles.detailImage}
                contentFit="contain"
              />
              <TouchableOpacity style={styles.equipmentButton}>
                <Text style={styles.equipmentButtonText}>
                  {selectedExercise.equipment}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bottomCard}>
              <TouchableOpacity style={styles.bottomActionButton}>
                <View style={styles.buttonContent}>
                  <Foundation name="page-doc" size={18} color="black" />
                  <Text style={styles.bottomActionButtonText}>Instructions</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomActionButton}>
                <View style={styles.buttonContent}>
                  <FontAwesome5 name="running" size={18} color="black" />
                  <Text style={styles.bottomActionButtonText}>Warm Up</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomActionButton}>
                <View style={styles.buttonContent}>
                  <MaterialIcons name="help-outline" size={18} color="#111" />
                  <Text style={styles.bottomActionButtonText}>FAQ</Text>
                </View>
              </TouchableOpacity>
            </View>
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
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

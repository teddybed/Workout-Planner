import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { MaterialIcons ,Feather,Foundation,FontAwesome5 } from '@expo/vector-icons';
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

  // Append add button to the data
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
const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    backgroundColor: '#f3f2f7',
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
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  detailCard: {
    width: 361,
    height: 390,
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
imageCard: {
  width: 329,
  height: 220,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#F3F2F7', 
  padding: 10,        
  backgroundColor: '#fff',
  alignItems: 'center',
  
},

detailImage: {
  width: '100%',
  height: '100%',
  borderRadius: 8,  
},
equipmentButton: {
  width: 102,
  height: 32,
  borderRadius: 24,
  borderWidth: 1,
  paddingTop: 8,
  paddingRight: 14,
  paddingBottom: 8,
  paddingLeft: 14,
  alignItems: 'center',
  justifyContent: 'center',
  borderColor: '#DFDFDF',
  backgroundColor:'#F3F2F7',
  bottom:60,
  right:105
},

equipmentButtonText: {
  fontSize: 12,
  fontWeight: '500',
  color: '#464B50',
},

  actionCard: {
    width: '100%',
    height: 64,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,

  },
  actionText: {
    fontFamily: 'Manrope',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0,
    color: '#010101',
    textAlignVertical: 'center',
  },
actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE74C',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4, 
  },
  actionButtonText: {
    fontFamily: 'Manrope',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#010101',
    textAlignVertical: 'center',
  },
  detailImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 15,
  },
  bottomCard: {
    width: '100%',
    height: 64,
    borderRadius: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginTop: 12,
  },


bottomActionButton: {
  alignSelf: 'flex-start', 
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 24,
  borderWidth: 1,
  borderColor: '#111',
  backgroundColor: '#fff',
    marginHorizontal: 2,  

},

buttonContent: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},

bottomActionButtonText: {
  fontFamily: 'Manrope',
  fontWeight: '600',
  fontSize: 14,
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: 'center',
  color: '#111',  
  marginLeft: 6,
},

bottomButtonsContainer: {
  position: 'absolute',
  top: 698, // Changed from bottom: 40
  left: 20,
  width: 353,
  height: 68,
  borderRadius: 100,
  padding: 8,
  backgroundColor: '#fff',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: "space-evenly", 
  gap: 16, 
},

 button: {
  width: 160.5,
  height: 52,
  borderRadius: 198,
  paddingTop: 8,
  paddingRight: 12,
  paddingBottom: 8,
  paddingLeft: 12,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},

  discardButton: {
    backgroundColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#FFF3A2',
  },
  buttonText: {
    color: '#010101',
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkMarkContainer: {
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
addCard: {
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 8,
},

addCircle: {
  width: 64,
  height: 64,
  borderRadius: 32,
  borderWidth: 2,
  borderColor: '#e5e4e6',
  backgroundColor: '#f9f9f9',
  justifyContent: 'center',
  alignItems: 'center',
},


});

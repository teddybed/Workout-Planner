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
  const [viewedExercises, setViewedExercises] = useState(new Set());

  // Initialize exercise list on mount
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

  // Track viewed exercises when selectedId changes
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

            {/* Show play button if selected and not editing */}
            {isSelected && !editMode && (
              <View style={styles.playIconContainer}>
                <MaterialIcons name="play-arrow" size={16} color="black" />
              </View>
            )}

            {/* Show check mark if viewed (and not selected, or maybe always) */}
            {isViewed && !isSelected && !editMode && (
              <View style={styles.checkMarkContainer}>
             <MaterialIcons name="check" size={14} color="black" />

              </View>
            )}

            {/* Show remove icon if in edit mode */}
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

        {/* Top Action Card */}
        <View style={styles.actionCard}>
          <Text style={styles.actionText}>Inclined Bench Press</Text>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Replace</Text>
          </TouchableOpacity>
        </View>

        {/* Exercise Image */}
<View style={styles.imageCard}>
  <Image
    source={{ uri: selectedExercise.gif }}
    style={styles.detailImage}
    resizeMode="contain"
  />
</View>

        {/* Bottom Card with Buttons */}

    <View style={styles.bottomCard}>
  <TouchableOpacity style={styles.bottomActionButton}>
    <View style={styles.buttonContent}>
      <MaterialIcons name="menu-book" size={18} color="#111" />
      <Text style={styles.bottomActionButtonText}>Instructions</Text>
    </View>
  </TouchableOpacity>
  <TouchableOpacity style={styles.bottomActionButton}>
    <View style={styles.buttonContent}>
      <MaterialIcons name="whatshot" size={18} color="#111" />
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
imageCard: {
  width: 329,
  height: 220,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#F3F2F7', // light border color
  padding: 10,         // equivalent to "gap" for inner spacing
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},

detailImage: {
  width: '100%',
  height: '100%',
  borderRadius: 8,     // slightly smaller than card's radius
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
    width: 98,
    height: 32,
    paddingTop: 4,
    paddingRight: 14,
    paddingBottom: 4,
    paddingLeft: 10,
    borderRadius: 24,
    backgroundColor: '#FFE74C',
    justifyContent: 'center',
    alignItems: 'center',
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

});

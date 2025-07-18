import { StyleSheet } from 'react-native';

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
  top: 698, 
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

export default styles;
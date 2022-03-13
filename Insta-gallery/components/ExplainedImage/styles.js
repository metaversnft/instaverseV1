import { StyleSheet } from 'react-360';

const radioFilled = {
  borderWidth: 1,
  width: 20,
  height: 20,
  borderRadius: 10,
  backgroundColor: 'green',
  marginRight: 16,
};

const boldText = {
  color: 'white',
  backgroundColor:'black',
  fontWeight: 'bold',
};

export default StyleSheet.create({

  scaledStyle: {
    transform: ([{ scaleX: 0.6 }, { scaleY: 0.6 }])
  },

  outerWrapper: {
    flexDirection: 'column',

    width: 400,
    backgroundColor: 'blue',
  },

  explainWrapperRow: {
    opacity: 0.9,
    flexDirection: 'row',
    backgroundColor: 'black',
    borderColor: 'black',
    borderWidth: 5,
  },

  poll: {
    flexDirection: 'column',
    backgroundColor: 'black',
    opacity: 0.95,
    width: 390,
  },

  firstPage: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 20,
  },

  questionWrapper: {
  },

  question: {
    fontSize: 32,
    color: 'black',
  },

  answerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },

  radioSuccess: {
    ...radioFilled,
    backgroundColor: 'green',
  },

  radioError: {
    ...radioFilled,
    backgroundColor: 'red',
  },

  radioButton: {
    ...radioFilled,
    backgroundColor: 'white',
  },

  answerText: {
    ...boldText,
  },

  hiddenResult: {
    opacity: 0,
  },

  message: {
    marginBottom: 16,
    height: 32,
  },

  correctness: {
    marginLeft: 4,
    color: 'black',
  },

  result: {
    flexDirection: 'row',
  },

  seeMore: {
    justifyContent: 'flex-end',
    color: 'blue',
    textDecorationStyle: 'solid',
  },

  explanation: {
    flexDirection: 'column',
    backgroundColor: 'black',
    padding: 20,
    opacity: 0.95,
    width: 350,
  },

  item: {
    marginBottom: 20,
  },

  title: {
    color: 'cyan',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  label: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 25,
  },

  content: {
    color: 'white',
    fontSize: 20,
  },

  closeButton: {
    backgroundColor: 'white',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: 800,

  },

  closeText: {
    ...boldText,
    textAlign: 'center',
  }
});

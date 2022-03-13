import { StyleSheet } from 'react-360';

const soundText = {
  color: 'black',
  textAlign: 'center',
};

export default StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'relative',
  },

  music: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderWidth: 4,
    borderColor: 'green',
  },

  grid: {
    display: 'flex',
    flexDirection: 'column',
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    backgroundColor: 'rgba(0, 183, 255, 0.2)',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flex: 2,
  },
  flex1: {
    flex: 1,
  },
  text: {
    color: 'black',
  },

  soundRow: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    width: 100,
    height: 40,
    justifyContent: 'center'
  },

  soundButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  soundOn: {
    ...soundText,
  },

  soundOff: {
    ...soundText,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});

import React from 'react';
import {StyleSheet, Text } from "react-native";
import { RNCamera } from 'react-native-camera';
import firebase from 'react-native-firebase';

export default class App extends React.Component {

  state = {
    flash: 'off',
    zoom: 0,
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    ratios: [],
    photoId: 1,
    showGallery: false,
    photos: [],
    faces: [],
    barcode: '',
  };

  componentDidMount() {
    firebase.messaging().getToken().then((token) => {
      this.setState({token: token})
    });
  }

  render() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus='on'
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        barCodeTypes={[RNCamera.Constants.BarCodeType.pdf417,
          RNCamera.Constants.BarCodeType.aztec,
          RNCamera.Constants.BarCodeType.code128,
          RNCamera.Constants.BarCodeType.code39,
          RNCamera.Constants.BarCodeType.code39mod43,
          RNCamera.Constants.BarCodeType.code93,
          RNCamera.Constants.BarCodeType.ean13,
          RNCamera.Constants.BarCodeType.ean8,
          RNCamera.Constants.BarCodeType.pdf417,
          RNCamera.Constants.BarCodeType.qr,
          RNCamera.Constants.BarCodeType.upce,
          RNCamera.Constants.BarCodeType.interleaved2of5,
          RNCamera.Constants.BarCodeType.itf14,
          RNCamera.Constants.BarCodeType.datamatrix]}
        onBarCodeRead={this.onBarCodeRead.bind(this)}
        focusDepth={this.state.depth}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
      >
        <Text style={styles.flipText}>{this.state.barcode}</Text>
        <Text style={styles.flipText}>{this.state.message}</Text>
        <Text style={styles.flipText}>{this.state.token}</Text>
      </RNCamera>
    );
  }

  onBarCodeRead(e) {
    this.setState({barcode: JSON.stringify(e.data)})
  }
}

const landmarkSize = 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  navigation: {
    flex: 1,
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  item: {
    margin: 4,
    backgroundColor: 'indianred',
    height: 35,
    width: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  galleryButton: {
    backgroundColor: 'indianred',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
  },
  fieldInput: {
    width: '100%',
    height: 44,
    fontSize: 22,
    lineHeight: 22,
    color: '#FFD700',
  },
});

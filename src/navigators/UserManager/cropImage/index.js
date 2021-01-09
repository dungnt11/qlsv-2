import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import AmazingCropper from 'react-native-amazing-cropper';
import CustomCropperFooter from './defaultFooter';
 
class AmazingCropperPage extends Component {
  onDone = async (croppedImageUri) => {
    if (croppedImageUri) {
      this.props.navigation.navigate('CreateUser', { uri: croppedImageUri });
    }
  }
 
  onError = (err) => {
    console.log(err);
  }
 
  onCancel = () => {
    this.props.navigation.navigate('CreateUser');
  }
 
  render() {
    const { route } = this.props;
    const { width, height, uri } = route.params;
    return (
      <AmazingCropper
        // Use your custom footer component
        // Do NOT pass onDone, onRotate and onCancel to the footer component, the Cropper will do it for you
        footerComponent={<CustomCropperFooter />}
        onDone={this.onDone}
        onError={this.onError}
        onCancel={this.onCancel}
        imageUri={uri}
        imageWidth={width}
        imageHeight={height}
        COMPONENT_HEIGHT={Dimensions.get('window').height - 60}
      />
    );
  }
}

export { AmazingCropperPage };

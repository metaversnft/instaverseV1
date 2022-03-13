import React, { Component } from 'react';
import { asset, Image, VrButton, NativeModules } from 'react-360';

const { ExplainedImageModule } = NativeModules;

export default class Picture extends Component {
  constructor(props) {
    super(props);
    this.getAdequateProps = this.getAdequateProps.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  getAdequateProps() {
    const {asset, question, answers, correctAnswer, artist, date, location, title,url} = this.props;
   
    return {
      asset, question, answers, correctAnswer, artist, date, location, title,url
    }
  }

  onClick() {
    const selectedProps = this.getAdequateProps();
    ExplainedImageModule.open(selectedProps);
  }

  render() {
    
    return (
      <VrButton
        onClick={this.onClick}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: this.props.height,
          width: this.props.width,
          backgroundColor: 'grey',
          transform: [
            { translate: [this.props.x, this.props.y, this.props.z] },
            { rotateY: this.props.rotateY },
          ],
        }}
      >
        {/* <Image source={asset(this.props.asset)} style={{ flex: 1 }} /> */}

          <Image access = "Access-Control-Allow-Origin" source={{uri:this.props.url}} style={{ flex: 1 }} />
      </VrButton>
    );
  }
}

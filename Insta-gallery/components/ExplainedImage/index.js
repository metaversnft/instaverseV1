import React from 'react';
import styles from './styles';
import {
  View,
  Text,
  asset,
  Animated,
  Image,
  VrButton,
  NativeModules,
} from 'react-360';

const { ExplainedImageModule } = NativeModules;
const { AudioModule } = NativeModules;

export default class ExplainedImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      fade: new Animated.Value(0),
      step: 1,
      selectedAnswer: -1,
      windowWidth: 0,
      iphoneX: 1125,
      isMobile: this.props.width < 500,
    };

    this.getButtonStyles = this.getButtonStyles.bind(this);
    this.updateWindowSize = this.updateWindowSize.bind(this);
  }

  // isCorrect = (answer) => {
  //   return answer === this.props.imageInfo.correctAnswer;
  // };

  getButtonStyles(index) {
    if (this.state.selectedAnswer === index) {
      if (this.state.selectedAnswer === this.props.imageInfo.correctAnswer) {
        return styles.radioSuccess;
      }
      return styles.radioError;
    }

    return styles.radioButton;
  }

  updateWindowSize() {
    this.setState({ windowWidth: window.innerWidth });
  }

  componentDidMount() {
    this.updateWindowSize();
    window.addEventListener('resize', this.updateWindowSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowSize);
  }

  render() {
    return (
      <View style={this.state.isMobile ? styles.scaledStyle : {}}>
        <View style={styles.explainWrapperRow}>
          <View>
            <Image
              source={{uri:this.props.imageInfo.url}}
              style={{ width: 400, height: 450 }}
            />
          </View>

          <View style={styles.poll}>
            {this.state.step % 2 === 0 ? (
              <View style={styles.firstPage}>
                <View style={styles.questionWrapper}>
                  <Text style={styles.question}>
                    {this.props.imageInfo.question}
                  </Text>
                  <Text style={styles.question}>
                    {this.props.imageInfo.answers}
                  </Text>

                  {/* {this.props.imageInfo.answers.map((answer, index) => (
                    <View style={styles.answerWrapper} key={index}>
                      <VrButton
                        style={this.getButtonStyles(index)}
                        onClick={() => {
                          this.setState({ selectedAnswer: index });

                          const sound =
                            index === this.props.imageInfo.correctAnswer
                              ? 'success.wav'
                              : 'error.wav';

                          AudioModule.playOneShot({
                            source: asset(sound),
                          });
                        }}
                      />
                      <Text style={styles.answerText}>{answer}</Text>
                    </View>
                  ))} */}
                </View>

                <View style={styles.result}>
                  <Text style={{ color: 'black' }}>Your answer is: </Text>
                  {this.state.selectedAnswer !== -1 && (
                    <Text style={styles.correctness}>
                      {this.state.selectedAnswer ===
                      this.props.imageInfo.correctAnswer
                        ? 'correct'
                        : 'incorrect'}
                    </Text>
                  )}
                </View>

                <View>
                  <VrButton onClick={() => this.setState({ step: 1 })}>
                    <Text style={styles.seeMore}>See more</Text>
                  </VrButton>
                </View>
              </View>
            ) : (
              <View style={styles.explanation}>
                <Text style={styles.title}>{this.props.imageInfo.title}</Text>

                <View style={styles.item}>
                  <Text style={styles.label}>Token ID: </Text>
                  <Text style={styles.content}>
                    {this.props.imageInfo.answers}
                  </Text>
                </View>

                <View style={styles.item}>
                  <Text style={styles.label}>Token Address:</Text>
                  <Text style={styles.content}>
                    {this.props.imageInfo.question}
                  </Text>
                </View>

                <View style={styles.item}>
                  <Text style={styles.label}>Contract Type:</Text>
                  <Text style={styles.content}>
                    {this.props.imageInfo.artist}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>

        <VrButton
          onClick={() => ExplainedImageModule.close()}
          style={styles.closeButton}
        >
          <Text style={styles.closeText}>Close</Text>
        </VrButton>
      </View>
    );
  }
}

import React, { Component } from 'react';
import {
  StyleSheet,
  Animated,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  PanResponderInstance,
  ViewStyle,
} from 'react-native';
import AnimatedPoint from './AnimatedPoint';

interface PointProps {
  point: AnimatedPoint;
  style?: ViewStyle;
  width: number;
}

export class Point extends Component<PointProps> {
  panResponder: PanResponderInstance;

  constructor(props: PointProps) {
    super(props);

    this.panResponder = this.getInitialPanResponder();
  }

  getTrue = () => true;

  getInitialPanResponder = () => {
    return PanResponder.create({
      onStartShouldSetPanResponder: this.getTrue,
      onStartShouldSetPanResponderCapture: this.getTrue,
      onMoveShouldSetPanResponder: this.getTrue,
      onMoveShouldSetPanResponderCapture: this.getTrue,
      onPanResponderGrant: this.props.point.startObserve,
      onPanResponderMove: (
        e: GestureResponderEvent,
        gestureState: PanResponderGestureState,
      ) => {
        this.props.point.setPoint(gestureState.dx);
      },
      onPanResponderTerminationRequest: this.getTrue,
      onPanResponderRelease: this.props.point.stopObserve,
      onPanResponderTerminate: this.props.point.stopObserve,
      onShouldBlockNativeResponder: this.getTrue,
    });
  };

  render() {
    const { point, style, width } = this.props;
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[
          styles.container,
          style,
          {
            width: width,
            height: width,
            borderRadius: width,
            left: point.getPoint(),
          },
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'black',
  },
});

export default Point;

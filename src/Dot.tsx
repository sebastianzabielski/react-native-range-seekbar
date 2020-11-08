import React, { Component } from "react";
import {
  StyleSheet,
  Animated,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  PanResponderInstance,
  ViewStyle,
} from "react-native";
import AnimatedPoint from "./AnimatedPoint";

interface DotProps {
  point: AnimatedPoint;
  style?: ViewStyle;
}

export class Dot extends Component<DotProps> {
  panResponder: PanResponderInstance;

  constructor(props: DotProps) {
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

      onPanResponderGrant: () => {
        this.props.point.startObserve();
      },

      onPanResponderMove: (
        e: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        console.log("'move");
        this.props.point.setPoint(gestureState.dx);
      },

      onPanResponderTerminationRequest: this.getTrue,

      onPanResponderRelease: () => {
        this.props.point.stopObserve();
      },
      onPanResponderTerminate: this.props.point.stopObserve,

      onShouldBlockNativeResponder: this.getTrue,
    });
  };

  render() {
    const { point, style } = this.props;
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[styles.container, style, { left: point.getPoint() }]}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",

    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: "black",
  },
});

export default Dot;

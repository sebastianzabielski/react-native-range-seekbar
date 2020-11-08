import React, { Component } from "react";
import { View, StyleSheet, LayoutChangeEvent, Animated } from "react-native";
import Dot from "./Dot";
import Controller from "./Controller";

export class RangeSeekBar extends Component {
  state = {
    loading: true,
  };

  test: Controller;

  constructor(props: any) {
    super(props);

    this.test = new Controller(0, 0, 0);
  }

  block = false;

  updateComponentWidth = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width - 15; //TODO
    this.test.boundaryPoints.setEnd(width);
    this.test.x2.setPoint(width);
    this.setState({ loading: false });
  };

  renderActiveLine = () => {
    return (
      <Animated.View
        style={[
          styles.absolute,
          styles.activeLine,
          {
            left: this.test.activeLineBegin.getPoint(),
            width: this.test.activeLineWidth.getPoint(),
          },
        ]}
      />
    );
  };

  render() {
    const { loading } = this.state;
    const ActiveLine = this.renderActiveLine;
    return (
      <>
        <View onLayout={this.updateComponentWidth} style={styles.container}>
          <View style={styles.inactiveContainer} />
          <View style={[styles.absolute, styles.animatedContainer]}>
            {!loading && (
              <>
                <ActiveLine />
                <Dot point={this.test.x1} style={{ backgroundColor: "red" }} />
                <Dot point={this.test.x2} />
              </>
            )}
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 16,
    // backgroundColor: 'gray',
    alignItems: "center",
    justifyContent: "center",
  },
  absolute: {
    position: "absolute",
    top: 0,
    bottom: 0,
  },
  animatedContainer: {
    left: 0,
    right: 0,
    flexDirection: "row",
  },
  inactiveContainer: {
    width: "100%",
    height: 5,
    backgroundColor: "gray",
  },
  activeLine: {
    backgroundColor: "green",
    borderRadius: 16,
  },
});
export default RangeSeekBar;

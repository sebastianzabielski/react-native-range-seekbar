import React, { Component } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Controller from './Controller';
import Point from './Point';

export interface RangeSeekBarProps {
  activeLineHeight: number;
  pointWidth: number;
  activeLineStyle?: ViewStyle;
  inactiveLineStyle?: ViewStyle;
  pointStyle?: ViewStyle;
  minValue: number;
  maxValue: number;
  // step: number; //TODO 0 default means that every value is send
  onValueChange: (values: [number, number]) => void;
  onPressStart?: () => void;
  onPressEnd?: () => void;
}
export class RangeSeekBar extends Component<RangeSeekBarProps> {
  static defaultProps = {
    activeLineHeight: 7,
    pointWidth: 15,
    // step: 1,
  };

  state = {
    initLoading: true,
  };

  controller: Controller;

  constructor(props: any) {
    super(props);

    this.controller = new Controller(
      0,
      0,
      this.props.minValue,
      this.props.maxValue,
      this.props.pointWidth,
      // this.props.step,
      1, //temporary value will be taken from props in next version
      this.onValueChange,
    );
  }

  block = false;

  componentDidUpdate(prevProps: RangeSeekBarProps) {
    if (
      this.props.minValue !== prevProps.minValue ||
      this.props.maxValue !== prevProps.maxValue ||
      this.props.pointWidth !== prevProps.pointWidth
    ) {
      this.controller.updatePropertyValues(
        this.props.minValue,
        this.props.maxValue,
        this.props.pointWidth,
      );
    }
  }
  onValueChange = async (values: [number, number]) => {
    this.props.onValueChange(values);
  };

  firstUpdate = true;
  updateComponentWidth = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width - this.props.pointWidth;
    this.controller.boundaryPoints.setEnd(width);

    const { realEnd, end } = this.controller.boundaryPoints;
    if (this.firstUpdate) {
      this.firstUpdate = false;
      this.controller.x2.forceSetValue(end, realEnd);
      this.controller.handlePointPositionChange(true);
      this.setState({ initLoading: false });
    } else {
      this.controller.fixPointPosition(true);
    }
  };

  renderActiveLine = () => {
    return (
      <View style={styles.activeLineContainer}>
        <Animated.View
          style={[
            styles.activeLine,
            this.props.activeLineStyle,
            {
              left: this.controller.activeLineBegin.getPoint(),
              width: this.controller.activeLineWidth.getPoint(),
              height: this.props.activeLineHeight,
            },
          ]}
        />
      </View>
    );
  };

  render() {
    const { initLoading } = this.state;
    const {
      pointWidth,
      inactiveLineStyle,
      pointStyle,
      onPressStart,
      onPressEnd,
      activeLineHeight,
    } = this.props;
    const ActiveLine = this.renderActiveLine;

    const maxHeight =
      activeLineHeight > pointWidth ? activeLineHeight : pointWidth;
    return (
      <>
        <View
          onLayout={this.updateComponentWidth}
          style={[styles.container, { height: maxHeight }]}
        >
          <View style={[styles.inactiveContainer, inactiveLineStyle]} />
          <View style={[styles.absolute, styles.animatedContainer]}>
            {!initLoading && (
              <>
                <ActiveLine />
                <Point
                  point={this.controller.x1}
                  width={pointWidth}
                  style={pointStyle}
                  onPressStart={onPressStart}
                  onPressEnd={onPressEnd}
                />
                <Point
                  point={this.controller.x2}
                  width={pointWidth}
                  style={pointStyle}
                  onPressStart={onPressStart}
                  onPressEnd={onPressEnd}
                />
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
    width: '100%',
    // height: 16,
    justifyContent: 'center',
  },
  absolute: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    bottom: 0,
  },
  animatedContainer: {
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  inactiveContainer: {
    marginHorizontal: 5,
    height: 5,
    backgroundColor: 'gray',
    borderRadius: 16,
  },
  activeLineContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeLine: {
    backgroundColor: 'green',
    borderRadius: 16,
    position: 'absolute',
  },
});

export default RangeSeekBar;

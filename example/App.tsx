import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import RangeSeekBar from 'react-native-range-seekbar';
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <RangeSeekBar />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;

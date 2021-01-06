import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Text, Button} from 'react-native';
import {RangeSeekBar} from 'react-native-range-seekbar';
const App = () => {
  const [range, setRange] = useState<[number, number]>([0, 150]);
  const [currentValue, setCurrentValue] = useState<[number, number]>(range);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{alignSelf: 'center'}}>
        {currentValue[0]} - {currentValue[1]}
      </Text>
      <RangeSeekBar
        minValue={range[0]}
        maxValue={range[1]}
        onValueChange={(value) => {
          setCurrentValue(value);

          console.log(value);
        }}
      />

      <Button title={'SET 0-0'} onPress={() => setRange([0, 0])} />
      <Button title={'SET 0-100'} onPress={() => setRange([0, 100])} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;

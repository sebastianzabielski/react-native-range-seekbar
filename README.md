# react-native-range-seekbar
____

React Native component used to select range of values.

IMG

## Installation
`
npm install --save react-native-range-seekbar
`
or
`
yarn add react-native-range-seekbar
`

| Prop              | Type       | Required | Default | Description                                                                                                    |
|-------------------|------------|----------|---------|----------------------------------------------------------------------------------------------------------------|
| activeLineHeight  | number     | NO       | 7       | Width of the line indicating the range that has been selected.                                                 |
| activeLineStyle   | ViewStyle  | NO       |         | Color of the line indicating the range that has been selected.                                                 |
| inactiveLineStyle | ViewStyle  | NO       |         | Color of the area that has been excluded from the range.                                                       |
| pointWidth        | number     | NO       | 15      | Width of the point.                                                                                            |
| pointStyle        | ViewStyle  | NO       |         | Styles applied to the point.                                                                                   |
| minValue          | number     | YES      |         | Minimum value to select.                                                                                       |
| maxValue          | number     | YES      |         | Maximum value to select.                                                                                       |
| onValueChange     | function   | YES      |         | Method that will be executed after value change. The method should take as a parameter a tuple of two numbers. |
| onPressStart      | function   | NO       |         | Method that will be executed after press in on a point.                                                        |
| onPressEnd        | function   | NO       |         | Method that will be executed after press out a point.                                                          |
| ~~step~~          | ~~number~~ | NO       |         |<span style="color:red"> PROPS NOT YET AVAILABLE.</span> <br/> A step that OnValueChange will be executed. For now, the value is set on 1.          |
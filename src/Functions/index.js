import React from 'react';
import { Alert } from 'react-native';

export function customMessage(title, message) {
  return Alert.alert(title, message);
}

import React from 'react';
import { Switch } from 'react-native';

const ToggleSwitch = ({ isNotificationEnabled, onToggle }) => {
  return <Switch value={isNotificationEnabled} onValueChange={onToggle} />;
};

export default ToggleSwitch;

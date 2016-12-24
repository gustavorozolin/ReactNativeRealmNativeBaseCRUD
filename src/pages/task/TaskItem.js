import React, {
  Component
} from 'react';
import {
  View,
  Text
} from 'react-native';
import styles from '../../styles/baseStyles.js';
import TaskService from './TaskService';

class TaskItem extends Component {
  render() {
    let obj = this.props.obj != null ? this.props.obj : TaskService.find(this.props.id);
    return (
      <View style={styles.listItem}>
        <Text>{obj.description}</Text>
      </View>
    );
  }
}

module.exports = TaskItem;

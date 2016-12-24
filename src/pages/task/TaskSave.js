'use strict';
import {
  TouchableHighlight, Text, ToastAndroid
} from 'react-native';
import { Container, Content, List, ListItem, Header, Title, InputGroup, Input, Icon, Picker, Button, Spinner } from 'native-base';

import styles from '../../styles/baseStyles.js';
import React, {Component} from 'react';
import TaskService from './TaskService';
import TaskDetail from './TaskDetail';

export default class TaskSave extends Component {
  constructor(props) {
    super(props);

    let editObj = this.props.route.editObj;
    let editIsNotNull = editObj != null;
    this.state = {
      // used to display a progress indicator if waiting for a network response.
      loading: false,
      id: editIsNotNull ? editObj.id : null,
      description: editIsNotNull ? editObj.description : ''
      }
  }

  save() {
    this.setState({
      loading: true
    });
   var hasError = false;
    if(this.state.description === ''){
      ToastAndroid.show('Description is required', ToastAndroid.LONG);
      hasError = true;
    }

    if(hasError){
      this.setState({
        loading: false
      });
      return;
    }

    var cond = {
        id: this.state.id != null ? this.state.id : new Date().getTime(),
        description: this.state.description
      };
    var saved = TaskService.save(cond);

    ToastAndroid.show('Saved!', ToastAndroid.LONG);

    this.props.route.callbackUpdateList();
    if(this.state.id == null){
      this.props.navigator.replace({
        component: TaskDetail,
        callbackUpdateList: this.props.route.callbackUpdateList,
        obj: saved
      });
    }else{
      this.props.navigator.pop();
    }

  }
  back = () => {
    this.props.navigator.pop();
  }

  render() {
      const content = this.state.loading ? <Content> <Spinner color='blue' /> </Content> :

      <Content keyboardDismissMode='interactive'
      keyboardShouldPersistTaps={true}>
          <List>
             <ListItem>
                 <InputGroup >
                               <Input
                                 onChangeText={(text) => this.setState({description: text})}
                                 value={this.state.description}
                                 stackedLabel label="Description"
                               autoFocus={true}/>
                           </InputGroup>
                       </ListItem>



                   </List><Button block success onPress={()=> this.save()} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
                       Save
                   </Button>
                 </Content>;

      return (
        <Container>
          <Header>
            <Button transparent onPress={() => this.back()}>
               <Icon name="ios-arrow-back" />
            </Button>
            <Title>{this.state.id == null ? "New task" : "Update task" }</Title>
          </Header>
            {content}
      </Container>)
  }
}

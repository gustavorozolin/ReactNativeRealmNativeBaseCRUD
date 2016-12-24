import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, InputGroup, Input } from 'native-base';
import {
  Text,
  View,
  ListView,
  RefreshControl,
  TouchableHighlight
} from 'react-native';
import styles from '../../styles/baseStyles.js';

import TaskSave from './TaskSave';
import TaskDetail from './TaskDetail';
import TaskService from './TaskService';

import TaskItem from './TaskItem';

export default class TaskList extends Component {

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          dataSource: ds.cloneWithRows([
            {description: 'initial'}
          ]),
          search: "",
          refreshing: false,
        };
  }

  showItem(obj){
      this.props.navigator.push({
        component: TaskDetail,
        callbackUpdateList: this.callbackUpdateList,
        obj: obj
      });

  }

  componentWillMount(){
    this.updateList();
  }

  render() {
    return (
      <Container>
               <Header>
                 <Button transparent onPress={() => console.log("Home")}>
                    <Icon name="ios-home" />
                  </Button>
                   <Title>Tasks</Title>
                   <Button transparent onPress={() => this.openSave()}>
                      <Icon name="ios-add" />
                    </Button>
               </Header>

               <Content >
                 <InputGroup>
                       <Icon name="ios-search" />
                       <Input value={this.state.search}
                         onChangeText={(text) => {
                           this.state.search = text;
                           console.log(this.state.search);
                           this.updateList();
                          }}
                          placeholder="Search" />
                   </InputGroup>
                <ListView
                 dataSource={this.state.dataSource}
                 enableEmptySections={true}
                 renderRow={this._renderItem.bind(this)}
                 style={styles.listView}
                 refreshControl={
                 <RefreshControl
                   refreshing={this.state.refreshing}
                   onRefresh={this.updateList.bind(this)}
                 />
                }/>
               </Content>
           </Container>
    );
  }

  updateList(){
    this.setState({refreshing: true});
    var all = TaskService.search(this.state.search);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(all)
    });
    this.setState({refreshing: false});
  }

  openSave() {
     this.props.navigator.push({
       component: TaskSave,
       callbackUpdateList: this.callbackUpdateList,
     });
 }

  _onActionSelected = (position) => {
    console.log(position);
    if(position == 0){
      this.props.navigator.push({
        component: TaskSave,
        callbackUpdateList: this.callbackUpdateList,
      });
    }
  };

  callbackUpdateList = () => {
    console.log('callbackUpdateList');
    this.updateList();
  }



  _renderItem(obj) {
    if(obj == null){
      return null;
    }
    return (
     <TouchableHighlight onPress={() => this.showItem(obj)}>
        <View>
          <TaskItem obj={obj}/>
        </View>
     </TouchableHighlight>
    );
  }
}

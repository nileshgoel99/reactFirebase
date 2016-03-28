/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

const Firebase = require('firebase');
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');

const { ListView, AlertIOS } = React;
const FirebaseUrl = 'https://luminous-heat-9071.firebaseio.com/';

class AwesomeProject extends Component {
   _renderItem(item) {
    return (
      <ListItem item={item} onPress={() => {}} />
    );
  }
  render() {
    return (
    	<View style={styles.container}>
        <StatusBar title="Activity List" />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listview}/>
        <ActionButton title="Add" onPress={this._addItem.bind(this)} />
      </View>
	);
  }
constructor(props) {
  super(props);
	this.itemsRef = new Firebase(FirebaseUrl).child('activity');
  this.state = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
  };
}

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key()
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  _addItem() {
    AlertIOS.alert(
      'Add New Item',
      null,
      [
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({ title: text })
          }
        },
      ],
      'plain-text'
    );
  }

componentDidMount() {
   this.listenForItems(this.itemsRef); 
  }

}

const styles = require('./styles.js')
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);

import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

//yarn add axios

import api from './src/services/api';
import Filmes from './src/Filmes';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filmes: [],
      loading: true // fazendo o loading
    };
  }

  async componentDidMount() {
    const respouse = await api.get('r-api/?api=filmes'); // get serve para buscar algo, nesse caso a continuação da url
    this.setState({
      filmes: respouse.data,
      loading: false // terminando o loading 
    });
  }


  render() {
    if (this.state.loading) {
      return (
        <View style={styles.carregamento}>
          <ActivityIndicator color="#09A6FF" size={40} />
        </View> // ActivityIndicator serve para mostrar um incone de carregamento na tela 
      )
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.filmes}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <Filmes data={item} />}
          />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carregamento: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
})

export default App;
import React, { Component } from 'react';
import { Button, Text, StyleSheet,  ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebaseDb';
import { TextInput } from 'react-native-paper';



//Screen donde se agregan los usuarios.
class AddUserScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('users');
    this.state = {
      name: '',
      email: '',
      mobile: '',
      isLoading: false
    };
  }

  //actualiza el valor ingresado por el usuario
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  //almacena un usuario en la db y navega hacia lista de usuarios.
  storeUser() {
    if(this.state.name === ''){
     alert('Fill at least your name!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        name: this.state.name,
        email: this.state.email,
        mobile: this.state.mobile,
      }).then((res) => {
        this.setState({
          name: '',
          email: '',
          mobile: '',
          isLoading: false,
        });
        this.props.navigation.navigate('UserScreen')
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <Text style={{fontSize:40, fontWeight: "bold", alignSelf: "center" }}> Hola!</Text>
        <Text></Text>
        <Text style={{fontSize:25, fontWeight: "normal", alignSelf: "center"}}> ¿Qué quieres hacer?</Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
          <View style={styles.inputGroup}>

          <TextInput
              placeholder={'Nombre'}
              value={this.state.name}
              onChangeText={(val) => this.inputValueUpdate(val, 'name')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={1}
              placeholder={'E-mail'}
              value={this.state.email}
              onChangeText={(val) => this.inputValueUpdate(val, 'email')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Teléfono'}
              value={this.state.mobile}
              onChangeText={(val) => this.inputValueUpdate(val, 'mobile')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Agregar contacto'
            onPress={() => this.storeUser()} 
            color="#19AC52"
            
          />
        </View>
        <Text></Text>
        
        <View style={styles.button}>
          <Button
            title='Ver lista de contactos'
            onPress={() => this.props.navigation.navigate('UserScreen')} 
            color="#19AC52"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AddUserScreen;
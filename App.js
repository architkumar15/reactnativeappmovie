import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableHighlight, Modal } from 'react-native';
import Profile from './profile';

export default function App() {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 70,
      paddingHorizontal: 20
    },
    title: {
      color: '#fff',
      fontSize: 32,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 20
    }, searchbox: {
      fontSize: 20,
      fontWeight: '300',
      padding: 20,
      width: '100%',
      backgroundColor: "#fff",
      borderRadius: 8,
      marginBottom: 40
    }, results: {
      flex: 1,
      width: '100%',
      marginBottom: 20
    },
    heading: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '700',
      padding: 20,
      backgroundColor: '#445565'
    },
    poptitle:
    {
      fontSize: 24,
      fontWeight: '700',
      marginBottom: 5
    },
    popup:
    {
      padding: 20
    },
    closeBtn: {
      padding: 20,
      fontSize: 20,
      fontWeight: '700',
      color: '#fff',
      backgroundColor: '#2484C4'
    },
    dev: {
      textAlign: 'right',
      color: '#FFF',
      fontSize: '18pt',
      width: '100%',
      marginBottom: 11
    }
  });
  const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=411b3842"///sorry cant get api from a website you given
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });

  const search = () => {
    axios(apiurl + "&s=" + state.s).then(({ data }) => {
      let results = data.Search;
      setState(prevState => {
        debugger
        return { ...prevState, results: results }
      })
    })
  }
  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      console.log(result);

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Movie app!</Text>
      <Router>
        <Link style={{ textDecoration: 'none', color: '#FFF' }} to="/profile">Click To See Developer Profile Component</Link>
        <Switch> 
        <Route exact path='/profile'  component={Profile}></Route>
        </Switch>
      </Router>

      <TextInput
        style={styles.searchbox}
        onChangeText={text => setState(prevState => {
          return { ...prevState, s: text }
        })}
        onSubmitEditing={search}
        value={state.s}
        placeholder='Enter movie name'
      />
      <ScrollView style={styles.results}>
        {state.results.map(result => (
          <TouchableHighlight
            key={result.imdbId}
            onPress={() => openPopup(result)}>
            <View key={result.imdbId}>
              <img src={result.Poster} style={{ height: 300, width: 290 }} alt="movie_poster"></img>
              {/* < Image
                source={{ url: result.Poster }}
                style={{
                  width: '100%',
                  height: 300
                }}
                resizemode="cover"
              /> */}
              <text className={styles.heading} style={{ color: '#FFF' }}>{result.Title}</text>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={false}
        visible={(typeof state.selected.Title != "undefined") ? true : false}
      >
        <view style={styles.openPopup}>
          <Text style={styles.poptitle}>{state.selected.Title}</Text>
          <Text style={{ marginBottom: 20 }}>Rating:{state.selected.imdbId} </Text>
          <Text>{state.selected.plot}</Text>
        </view>
        <TouchableHighlight
          onPress={() => setState(prevState => {
            return { ...prevState, selected: {} }
          })}
        >
          <Text style={styles.closeBtn}>Close</Text>
        </TouchableHighlight>

      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}


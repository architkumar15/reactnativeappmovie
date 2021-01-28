import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableHighlight, Modal } from 'react-native';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import App from './App';

const Profile = () => {
    const styles = StyleSheet.create({

    });

    return (
        <div>
         {/* <Router> */}
            <Link style={{ textDecoration: 'none', color: '#FFF' }} to="/">Click To Close Profile Component</Link>
            <Switch>
                <Route exact path='/' component={App}></Route>
            </Switch>
        {/* </Router> */}
        </div>
    );
};

export default Profile;

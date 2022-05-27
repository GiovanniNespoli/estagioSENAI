import { auto } from 'async';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';

import api from './src/services/api';

export default function App() 
{

  const [projects, setProjects] = useState([]);

  useEffect(() => {
      api.get('/express').then(resp => {
        console.log(resp.data);
        setProjects(resp.data);
      });
  }, []);

  let today = new Date();
  let cont = 0;

  async function handleAddProject()
  {
    const newProj = await api.post('/express/insert', {
      Title : `Projeto Mobile ${today.getDate()}/${today.getMonth()}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`,
      Owner : 'Giovanni Nespoli' 
    })

    setProjects([...projects, newProj.data]);
  }

  return ( 
    <>
    <StatusBar barStyle='black' backgroundColor="#8D36FF"/>  
     
    {/* //**melhor investimento para listas grandes */ }
    <SafeAreaView style={styles.container}>
    <FlatList
      style={styles.list}
      data={projects}
      keyExtractor={project=> project.id}
      renderItem={({ item : proj }) => (  
          <Text style={styles.title} >{`${proj.Title}`}</Text>
      )}
    />

    </SafeAreaView>

    <View style={styles.btnCtn}>
      <TouchableOpacity style={styles.btn} onPress={handleAddProject}>
              <Text style={styles.btnTxt}>Add projeto</Text>
      </TouchableOpacity>
    </View>
    
    </>
    
  )
} 

const styles = StyleSheet.create({
  container : { 
    flex : 0.80,
    backgroundColor : '#8D36FF',
    // justifyContent : 'center',
    // alignItems : 'center'

  },

  list : {
    margin : 10,
    backgroundColor : '#8D53FF',
    borderRadius : 10,
  },

  btnCtn : {
    flex : 0.20,
    backgroundColor : '#8D36FF',

    alignItems : 'center',
    justifyContent : 'center',
  },

  title : {
    color : '#FFF',
    fontSize : 20,
    fontWeight : 'bold', 
     
  },

  btnTxt : {
    color : '#000',
    fontSize : 30,
    fontWeight : 'bold',
  },

  btn : {
    backgroundColor : '#FFF',
    width: 200,

    justifyContent : 'center',
    alignItems : 'center',

    borderRadius : 10,
  },
})
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, FlatList, AsyncStorage,  ActivityIndicator, } from 'react-native';
import axios from 'axios'

import AccelerationItem from '../components/AccelerationItem';

export default function Acceleration() {

  const [userData, setUserData] = useState({})
  const [loading, setLoading] = useState(true)
  const [accelerations, setAccelerations] = useState([])

  useEffect(() => {
    getUserProfile()
    getAcelerations()
  },[]);

  async function getUserProfile() {
  try {
       const result = await AsyncStorage.getItem('user')
       setUserData(JSON.parse(result))
       return result;
    } catch(error) {
      console.log(error);
    }
}


  function finishingLoading(){
    setTimeout(() => {
      setLoading(false)
    }, 600);
  }


  async function getAcelerations(){
     
  let getItemResponse = await axios.get('https://api.codenation.dev/v1/acceleration')
      
  if (getItemResponse){
      try {
        setAccelerations(getItemResponse.data)
       
      } catch (error) {
         console.error("Error Get Aceleration", error);
      }
  }
}

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          source={{uri: 'https://forum.codenation.com.br/uploads/default/original/2X/2/2d2d2a9469f0171e7df2c4ee97f70c555e431e76.png'}}
        />

        <Image
          className="profile-image"
          style={styles.profileImage}
          source={{
            uri: userData.picture
          }}
      />

      </View>
      <Text style={styles.title}>Acelerações</Text>

      {loading && (
        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" color="#7800ff" />
        </View>
      )}

      <FlatList
      data={accelerations}
      keyExtractor={item => item.slug}
      renderItem={({item, index}) => <AccelerationItem item={item} />}
     />

    </View>
  );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: '#7800ff',
        borderBottomWidth: 2,
        padding: 16,
        paddingTop: 55
    },
    headerImage: {
        height: 45,
        width: 250
    },
    title: {
        color: '#7800ff',
        fontSize: 30,
        padding: 16
    }
});

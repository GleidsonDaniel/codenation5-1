import React, {useState, useEffect} from 'react'
import axios from 'axios'
import renderer from 'react-test-renderer'
import { StyleSheet, View,  TextInput, Button, Image, AsyncStorage } from 'react-native'

export default function Login(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [disableSubmit, SetDisabledSubmit] = useState(true)
    
    useEffect(() => {
        (email && password)? SetDisabledSubmit(false):SetDisabledSubmit(true)
    });

    async function handleSubmit(){
     
        let getItemResponse = await axios.post('https://api.codenation.dev/v1/user/auth', {
            email: email,
            password: password
        })
            
        if (getItemResponse){
            try {
               await AsyncStorage.setItem('user', JSON.stringify(getItemResponse.data))
               props.navigation.navigate('Acceleration')
             
            } catch (error) {
               console.error("Error saving the user", error);
            }
        }
    }

  return(
      <View style={styles.container}>
        <View style={styles.header}>
                <Image
                    className="header-image"
                    style={styles.headerImage}
                    source={{uri: 'https://forum.codenation.com.br/uploads/default/original/2X/2/2d2d2a9469f0171e7df2c4ee97f70c555e431e76.png'}}
                />
        </View>
        <View style={styles.form}>
            
            <TextInput 
              onChangeText={text => setEmail(text)}
              style={styles.input} 
              className="email-input"  
              autoCompleteType="email" 
              keyboardType="email-address" />
            
              <TextInput 
              onChangeText={text => setPassword(text)}
              style={styles.input} 
              className="password-input" 
              autoCompleteType="password" 
              secureTextEntry={true} />
            
            <Button 
             onPress={() => handleSubmit()}
             className="submit-login" 
             style={styles.btnSubmit} 
             title="Entrar" 
             disabled={disableSubmit}  />
        </View>

      </View>
  )
}

const styles = StyleSheet.create({
 
   container: {
      flex: 1,
    },

    header: {
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: '#7800ff',
        borderBottomWidth: 2,
        padding: 16,
        paddingTop: 55
      },
   
    form:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        padding:30,
        backgroundColor:'#f5f5f5'
    },

    input:{
        height:45,
        alignSelf:'stretch',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginBottom:5,
        padding:10,
        backgroundColor:'#fff'
    },
    btnSubmit:{
        height:45,
        alignSelf:'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor:'#3daaf5'
    }

  });

import ComboRol from '@/components/ComboBox';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomeScreen() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [rol, setRol] = useState('');

  useEffect(() => {
    console.log("el usuario cambio ", user)
   },[user])
   useEffect(() => {
    console.log("la contraseña cambio", pass)
   },[pass])

   const ingresar = () => {
      if(rol == 'admin') {
       router.replace('/(admin)/Home')
      }else {
        router.replace('/(socio)/Home')
        console.log("Hola", user, ": Ingresaste como socio")
      }
   }
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Strong<Text style={styles.acento}>Fit</Text>
      </Text>

      <View style={styles.login}>
        <Text style={styles.label}>Username</Text>
      
        <TextInput
          value={user}
          onChangeText={setUser}
          style={styles.input}
          placeholderTextColor="#f4f4f4"
          placeholder="Ingrese su usuario"
        />
          
        <Text style={styles.label}>Contraseña</Text>
    
        <TextInput
          value={pass}
          onChangeText={setPass}
          style={styles.input}
          placeholderTextColor="#f4f4f4"
          placeholder="Ingrese su contraseña"
          secureTextEntry
        />
        <ComboRol rol={rol} setRol={setRol}/>
        <Pressable 
        style={({ pressed }) => ({
          backgroundColor: pressed ? '#aa0000' : 'red',
          marginTop:10,
          padding: 12,
          borderRadius: 8,
        })} 
        onPress={ingresar}
        >
          <Text style={styles.texto}>Ingresar al sistema</Text>
        </Pressable>
      </View>

      <Text style={styles.subtitulo}>
        Software de gestión para gimnasios
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0f0f',
  },

  titulo: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  acento: {
    color: 'red',
  },

  login: {
    width: 300,
    backgroundColor: 'black',
    padding: 20,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
  },

  label: {
    color: 'white',
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    color: 'white',
    padding: 10,
    borderColor: 'white',
    borderRadius: 5,
    marginTop: 10,
  },

  boton: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },

  texto: {
    color: 'white',
    fontWeight: 'bold',
  },

  subtitulo: {
    marginTop: 30,
    color: '#aaa',
    fontSize: 16,
  },
    combo: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    backgroundColor: 'black',
  },

  picker: {
    color: 'white',
  },

});
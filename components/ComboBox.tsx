import { Picker } from '@react-native-picker/picker';
import { Dispatch, SetStateAction } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ComboRolProps = {
    rol: string;
    setRol: Dispatch<SetStateAction<string>>;
  };
  
export default function ComboRol({ rol, setRol}: ComboRolProps) {
  return (
    <View style={styles.combo}>
    <Text style={styles.label}>Rol</Text>
    <Picker
      selectedValue={rol}
      onValueChange={(value) => setRol( value)}
      style={styles.picker}
    >
      <Picker.Item label="Seleccione..." value="" />
      <Picker.Item label="Administrador" value="admin" />
      <Picker.Item label="Socio" value="socio" />
    </Picker>
  </View>
  )
}
const styles = StyleSheet.create({
    label: {
      color: 'white',
      marginTop: 10,
    },
  
    combo: {
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 5,
      marginTop: 10,
      backgroundColor: 'black',
    },
  
    picker: {
      color: 'white',
    },
  });
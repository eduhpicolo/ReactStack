import React from 'react';
import * as MailComposer from 'expo-mail-composer';
import { View, Image, TouchableOpacity, Text, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Detail() {
  const navigation = useNavigation();

  const route = useRoute();
  
  const incident = route.params.incident;
  const message = `Holla ${incident.name}, estoy entrando em contato para ayudar en el caso "${incident.title}" con urgencia de "${incident.value}"`;
  
  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Heroe del Caso: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    })
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
  }

  return (
    <View style={styles.container} >
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack} >
          <Feather name="arrow-left" size={28} color="#E82041" />
        </TouchableOpacity>

      </View>

      <View style={styles.incident}>
        <Text style={styles.incidentProperty, { marginTop: 0 }}>Causa:</Text>
        <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

        <Text style={styles.incidentProperty}>Caso:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>Nivel:</Text>

        <Text style={styles.incidentValue}>{incident.value}</Text>

        {/* <Text style={styles.incidentValue}>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(incident.value)}
        </Text> */}
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve el dia!</Text>
        <Text style={styles.heroTitle}>Se el heroe des este caso.</Text>

        <Text style={styles.heroDescription}>
          Entre en Contacto:
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}
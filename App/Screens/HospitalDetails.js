import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import SharedHeader from '../Components/common/SharedHeader';
import Colors from '../Components/Shared/Colors';
import HospitalInfo from '../Components/HospitalInfo';

export default function HospitalDetails() {
  const [clinic, setClinic] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { clinic: clinicParam } = route.params;

  useEffect(() => {
    setClinic(clinicParam);
  }, [clinicParam]);

  if (!clinic) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: '50%' }}>
        <Text style={{ fontSize: 45 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <ScrollView>
        <View style={{ position: 'absolute', margin: 15, zIndex: 10 }}>
          <SharedHeader title={clinic?.attributes?.Name || ''} />
        </View>

        <View>
          {clinic && clinic.attributes && clinic.attributes.image && clinic.attributes.image.data && clinic.attributes.image.data.attributes && clinic.attributes.image.data.attributes.url ? (
            <Image 
              source={{ uri: clinic.attributes.image.data.attributes.url }}
              style={{
                width: '100%',
                height: 260
              }}
            />
          ) : (
            <Text>Image not available</Text>
          )}

          <View style={{ marginTop: -20, backgroundColor: Colors.white, borderTopRightRadius: 20, borderTopLeftRadius: 20, padding: 20 }}>
            <HospitalInfo clinic={clinic} />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.navigate('book-appointment', { clinic: clinic })}
        style={{ backgroundColor: Colors.primary, borderRadius: 99, padding: 13, margin: 10, left: 0, right: 0, marginBottom: 10, zIndex: 20 }}
      >
        <Text style={{ fontSize: 20, textAlign: 'center', color: Colors.white, fontFamily: 'appFont-semibold' }}>
          Book Appointment
        </Text>
      </TouchableOpacity>
    </View>
  );
}
import { View, Text, Image } from 'react-native';
import React from 'react';
import { FlatList } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '../Shared/Colors';
export default function ClinicCardItem({ clinic }) {
  const imageUrl = clinic?.attributes?.image?.data?.attributes?.url;
  const categories = clinic?.attributes?.categories?.data || [];

  return (
    <View>
      {imageUrl ? (
        <View style={{ marginBottom:20,}}>
          <Image
            source={{ uri: imageUrl }}
            style={{
              width: '100%',
              height: 140,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            onError={(error) => {
              console.error('Image loading error:', error.nativeEvent.error);
            }}
          />
          <View style={{ padding: 10, backgroundColor:Colors.white, borderBottomLeftRadius:10, borderBottomRightRadius:10 }}>
            <Text style={{ fontSize: 18, fontFamily: 'Inter-Black-semi' }}>
              {clinic.attributes.Name}
            </Text>
            <FlatList
              data={categories}
              horizontal={true}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Text style={{ marginRight: 10, color: Colors.GRAY }}>
                  {item.attributes.name}
                </Text>
              )}
            />
            <View style={{borderBottomWidth:1, borderColor:Colors.LIGHT_GRAY, margin:5, marginBottom:10}}>
            <View style={{display: 'flex', flexDirection: 'row', gap:5, alignItems: 'center', marginTop:5}}>
            <MaterialIcons name="location-pin" size={18} color={Colors.PRIMARY} />
            <Text>{clinic.attributes.Address}</Text>
            </View>

            </View>
            
            {/* <Text>{clinic.attributes.Address}</Text>
            <Text>{clinic.attributes.Phone}</Text>
            <Text>{clinic.attributes.Email}</Text> */}
          </View>
        </View>
      ) : (
        <Text>No image available</Text>
      )}
    </View>
  );
}
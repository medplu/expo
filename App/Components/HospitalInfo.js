import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import ActionButton from './common/ActionButton';
import { Ionicons } from '@expo/vector-icons';


import { AntDesign } from '@expo/vector-icons';

import SubHeading from './home/SubHeading';
import HorizontalLine from './common/HorizontalLine';
import Colors from './Shared/Colors';

const HospitalInfo = ({ clinic }) => {
    const [showFullDesc, setShowFullDesc] = useState(false);

    if (!clinic || !clinic.attributes) {
        return null;
    }

    const truncatedDesc = showFullDesc ? clinic.attributes.Description : clinic.attributes.Description.split(" ").slice(0, 18).join(" ");

    return (
        <View>
            <Text style={{ fontSize: 23, fontFamily: 'appFont-semibold' }}>
                {clinic.attributes.Name}
            </Text>

            <FlatList
                data={clinic.attributes.categories.data}
                horizontal={true}
                renderItem={({ item }) => (
                    <Text style={{ marginTop: 10, color: Colors.gray, marginRight: 6 }}>
                        {item.attributes.name}
                    </Text>
                )}
                keyExtractor={(item) => item.id.toString()}
            />

            <HorizontalLine />

            {/* Address */}
            <View style={{ display: 'flex', flexDirection: 'row', gap: 9, alignItems: 'center' }}>
                <Ionicons name="location-sharp" size={22} color={Colors.primary} />
                <Text style={{ fontSize: 18, fontFamily: 'appFont', color: Colors.gray }}>
                    {clinic.attributes.Address}
                </Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', gap: 9, alignItems: 'center', marginTop: 6, marginBottom: 15 }}>
                <AntDesign name="clockcircle" size={16} color={Colors.primary} />
                <Text style={{ fontSize: 18, fontFamily: 'appFont', color: Colors.gray }}>
                    Mon Sun | 11Am - 8Am
                </Text>
            </View>

            <ActionButton />

            {/* Horizontal line */}
            <View style={{ borderBottomWidth: 1, borderColor: Colors.ligh_gray, margin: 5, marginTop: 10, marginBottom: 15 }}></View>

            <SubHeading subHeadingTitle={'About'} />

            {/* Description */}
            <Text>{truncatedDesc}</Text>

            <TouchableOpacity onPress={() => setShowFullDesc(prev => !prev)}>
                <Text style={{ color: Colors.primary, fontFamily: 'appFont-semibold' }}>
                    {showFullDesc ? 'Hide' : 'See More'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default HospitalInfo;
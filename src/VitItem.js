import React from 'react';
import {View, Text,StyleSheet, Image,TouchableOpacity,Button} from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from "@react-navigation/native";


function ListItem({deal}) {
    const navigation = useNavigation();
    if(deal.id[0] == 'A'){
        const deals = deal.deal;
        return(
            <TouchableOpacity onPress={()=>(navigation.navigate("Foods",{nameFood: deals}))}>
                <View style={styles.item}>
                    <Image source={require(`${deals.thumbnail[0]}`)} style={styles.thumbnail} />
                </View>
                <Text style={styles.title}>{deals.title}</Text>
            </TouchableOpacity>
        );
        
    }
    else{
        return(
            <TouchableOpacity onPress={()=>(navigation.navigate("Vitamin",{nameVitamin: deal.title}))}>
                <View style={styles.item}>
                    <Image source={require(`${deal.thumbnail}`)} style={styles.thumbnail} />
                </View>
                <Text style={styles.title}>{deal.title}</Text>
            </TouchableOpacity>
        );
    }
    
    
}

class VitItem extends React.Component{
    handlePress = () => {
        console.log("handle - "+id);
        navigation.navigate("VitaminA");
    };
    render(){
        const deal = this.props;
        return(
            <ListItem deal={deal} />
        );
    }
}
        
const styles = StyleSheet.create({
    item:{
        backgroundColor: '#D9EFF9',
        borderRadius: 20,
        width: 140,
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 20,
        margin: 10,
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 20,
    },
    title:{
        fontFamily: 'Mitr',
        fontSize: 17,
        alignSelf: 'center',
        marginBottom: 15,
    }
});

export default VitItem;
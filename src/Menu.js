import React, { Component, useState } from "react";
import {StyleSheet,Text,View,ImageBackground,Image,Dimensions, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const wtop = ((width*2459)/4688);

function Menu(){
	const navigation = useNavigation();
    return(
        <View style={styles.container}>
          		<Image
            		source={require("./image/BG-top-menu.png")}
            		style={styles.topimage}
              	    pointerEvents="none"
          		/>
          			<View style={styles.header}>
            		<Text style={styles.txtheader}>MY VITAMINS</Text>
          		</View>
          		<View style={styles.body}>
            		{/* <View style={styles.content}> */}
						<TouchableOpacity style={styles.boxcontain} onPress={()=>{navigation.navigate("Home")}}>
							<Image source={require("./image/Vitamin-Ingredient.png")} style={styles.imgbody} />
							<Text style={styles.textbody}>VITAMIN INGREDIENT</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.boxcontain} onPress={()=>{navigation.navigate("Routines")}}>
							<Image source={require("./image/Vitamin-Routines.png")} style={styles.imgbody} />
							<Text style={styles.textbody}>VITAMIN ROUTINES</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.boxcontain} onPress={()=>{navigation.navigate("Story")}}>
							<Image source={require("./image/Vitamin-Story.png")} style={styles.imgbody} />
							<Text style={styles.textbody}>VITAMIN STORY</Text>
						</TouchableOpacity>
					{/* </View> */}
				</View>
				<View style={styles.bottom}></View>
      	</View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
		backgroundColor: "#1E1D25",
    },
    topimage: {
        display: "flex",
        position: "absolute",
        top: 0,
        width: width,
        height: wtop,
        flex: 1,
        zIndex: 1,
    },
    header: {
        marginTop: 55,
        marginBottom: 15,
        zIndex: 6,
    },
    txtheader: {
        fontFamily: "Mitr",
        fontSize: 30,
        color: "white",
        alignSelf: "center",
        fontWeight: "bold",
    },
    body: {
        width: width,
        height: null,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        justifyContent: "center",
		alignItems: 'center',
		padding: 20,
        paddingBottom: 20,
		paddingTop: 70,
		flexWrap: 'wrap',
		flexDirection: 'row',
		flex:1,
    },
    textbody: {
        fontFamily: "Mitr",
        color: 'black',
        fontSize: 18,
		fontWeight: 500,
    	textAlign: "left",
		padding: 10,
    },
	imgbody:{
		width:'100%',
		height:130,
		borderTopLeftRadius: 10,
		borderTopRightRadius:10,
	},
	boxcontain:{
		backgroundColor:'white',
		justifyContent: 'center',
		width: '75%',
		margin: 10,
		borderRadius: 10
		
	},
});

export default Menu;
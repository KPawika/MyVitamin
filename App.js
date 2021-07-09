import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import BGimage from "./src/image/BG.png";
import VitItem from "./src/VitItem";
import * as datavit from './src/datavit.json';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Vitamin from './src/Vitamin/Vitamin';
import DetailDeal from './src/Vitamin/DetailDeal';
import Menu from "./src/Menu";
import Routines from "./src/Routines";
import Foods from "./src/Foods";
import Story from "./src/Story";
import StoryVitamin from "./src/StoryVitamin";

const { width, height } = Dimensions.get("window");
const wbottom = ((width*295)/812);
const wtop = ((width*590)/812);

const posts = datavit.datavit;
const listitem = posts.map((post) =>
	<VitItem
		title={post.title}
		thumbnail={post.thumbnail}
		id={post.id}
		key={post.id}
	/>
);

const Stack = createStackNavigator();

function HomeScreen({navigation}){
    	return (
      	<View style={styles.container}>
        	<ImageBackground source={BGimage} style={styles.image}>
          		<Image
            		source={require("./src/image/BG-top.png")}
            		style={styles.topimage}
              	pointerEvents="none"
          		/>
				<TouchableOpacity style={styles.btnBack} onPress={()=>navigation.goBack()}>
                    <Text style={styles.txtBack}>{"<"}</Text>
                </TouchableOpacity>
          		<View style={styles.header}>
            		<Text style={styles.txtheader}>VITAMIN INGREDIENT</Text>
          		</View>
          		<View style={styles.body}>
            		<Text style={styles.textbody}>VITAMINS</Text>
            		<View style={styles.content}>
						{listitem}
					</View>
				</View>
				<View style={styles.bottom}></View>
					<Image
						source={require("./src/image/BG-bottom.png")}
						style={styles.bottomimage}
					/>
        	</ImageBackground>
      	</View>
    	);
}


  function App() {
	return (
	  <NavigationContainer>
		<Stack.Navigator initialRouteName="Menu">
     	 	<Stack.Screen name="Menu" component={Menu} options={{headerShown:false}} />
		  	<Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
		  	<Stack.Screen name="Vitamin" component={Vitamin} options={{headerShown:false}} />
      		<Stack.Screen name="DetailDeal" component={DetailDeal} options={{headerShown:false}} />
			<Stack.Screen name="Routines" component={Routines} options={{headerShown:false}} />
			<Stack.Screen name="Foods" component={Foods} options={{headerShown:false}} />
			<Stack.Screen name="Story" component={Story} options={{headerShown:false}} />
			<Stack.Screen name="StoryVitamin" component={StoryVitamin} options={{headerShown:false}} />
		</Stack.Navigator>
	  </NavigationContainer>
	);
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
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
  bottomimage: {
    display: "flex",
    position: "fixed",
    bottom: 0,
    width: width,
    height: wbottom,
    flex: 1,
    resizeMode: "cover",
	  zIndex: -1,
  },
  header: {
    marginTop: 60,
    marginBottom: 15,
    zIndex: 6,
  },
  txtheader: {
    fontFamily: "Mitr",
    fontSize: 25,
    color: "white",
    alignSelf: "center",
    fontWeight: 600,
  },
  body: {
    backgroundColor: "white",
    width: width,
    height: null,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    padding: 20,
    justifyContent: "center",
	  paddingBottom: 50,
  },
  content: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    justifyContent: 'center',
  },
  textbody: {
    fontFamily: "Mitr",
    color: "#00856D",
    fontSize: 20,
    textAlign: "center",
  },
  btnBack: {
    zIndex: 10,
    position: "absolute",
    top: 55,
    left: 30,
  },
  txtBack: {
    fontFamily: "Mitr",
    fontSize: 30,
    color: "white",
  },
});

export default App;

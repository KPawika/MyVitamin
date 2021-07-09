import React from "react";
import {StyleSheet,Text,View,ImageBackground,Image,Dimensions,Object, Button, TouchableOpacity} from "react-native";
import BGimage from "./image/BG.png";
import { useNavigation } from "@react-navigation/native";
import * as datafood from './datafood.json';
import VitItem from "./VitItem";

const { width, height } = Dimensions.get("window");
const wbottom = ((width*295)/812);
const wtop = ((width*590)/812);

const posts = datafood.Foods;
const listitem = posts.map((post) =>
	<VitItem
		title={post.title}
		thumbnail={post.thumbnail}
        deal={post}
		id={post.id}
		key={post.id}
	/>
);

function Routines() {
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
        	<ImageBackground source={BGimage} style={styles.image}>
          		<Image
            		source={require("./image/BG-top.png")}
            		style={styles.topimage}
              	pointerEvents="none"
          		/>
				<TouchableOpacity style={styles.btnBack} onPress={()=>navigation.goBack()}>
                    <Text style={styles.txtBack}>{"<"}</Text>
                </TouchableOpacity>
          		<View style={styles.header}>
            		<Text style={styles.txtheader}>VITAMIN ROUTINES</Text>
          		</View>
          		<View style={styles.body}>
            		<Text style={styles.textbody}>FOODS</Text>
            		<View style={styles.content}>
						{listitem}
					</View>
				</View>
				<View style={styles.bottom}></View>
					<Image
						source={require("./image/BG-bottom.png")}
						style={styles.bottomimage}
					/>
        	</ImageBackground>
      	</View>
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
      paddingBottom: 40,
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

export default Routines;
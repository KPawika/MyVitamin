import React, {Component, useState} from 'react';
import {StyleSheet,Text,View,ImageBackground,Image,Dimensions,TouchableOpacity} from "react-native";
import BGimage from '../image/BG.png';
import listDataVitamin from './listDataVitamin.json';
import {  useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const wbottom = ((width*295)/812);
const wtop = ((width*590)/812);

function ListDataVit(arr) {
    var vitx = arr.arr;
    return vitx;
}

var vit = listDataVitamin["Vitamin A"];
const TestList=(arr)=>{
    var x = ListDataVit(arr);
    return x.map((list)=>{
    const styleslist = StyleSheet.create({
        item:{
            backgroundColor: 'black',
            borderRadius: 10,
            width: 140,
            height: 180,
			margin:13,
        },
        thumbnail: {
            width: '100%',
            height: 130,
            borderTopLeftRadius: 10,
            borderTopRightRadius:10,
        },
        title:{
            fontFamily: 'Mitr',
            fontSize: 14,
            alignSelf: 'left',
            color: 'white',
			margin:10,
        }
    })
    const img = list.thumbnail[0];
    const navigation = useNavigation();
    return(
        <TouchableOpacity onPress={()=>navigation.navigate("DetailDeal",{dealID:list})}>
          <View style={styleslist.item}>
            <Image source={require(`${img}`)} style={styleslist.thumbnail} />
            <Text style={styleslist.title}>{list.title}</Text>
			{/* <Text>{list.id}</Text> */}
          </View>
        </TouchableOpacity>
    );
});
}


function Vitamin({route}) {
    const navigation = useNavigation();
    const vitname = route.params.nameVitamin;
    const [mystate,updateState] = useState(vitname);
    vit = listDataVitamin[mystate];
    return(
            <View style={styles.container}>
        	<ImageBackground source={BGimage} style={styles.image}>
          		<Image
            		source={require("../image/BG-top.png")}
            		style={styles.topimage}
              	    pointerEvents="none"
          		/>
                  <TouchableOpacity style={styles.btnBack} onPress={()=>navigation.goBack()}>
                      <Text style={styles.txtBack}>{"<"}</Text>
                  </TouchableOpacity>
          			<View style={styles.header}>
            		<Text style={styles.txtheader}>{vitname}</Text>
          		</View>
                
          		<View style={styles.body}>
            		<View style={styles.content}>
                        <TestList arr={vit} />
					</View>
				</View>
				<View style={styles.bottom}></View>
					<Image
						source={require("../image/BG-bottom.png")}
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
    marginTop: 55,
    marginBottom: 15,
  },
  txtheader: {
    fontFamily: "Mitr",
    fontSize: 30,
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
	
  },
  body: {
    width: width,
    height: null,
    padding: 20,
    justifyContent: "center",
    paddingBottom: 50,
	
  },
  content: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "flex-start",
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

export default Vitamin;
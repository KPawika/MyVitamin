import React, { useState } from "react";
import {StyleSheet,Text,View,ImageBackground,Image,Dimensions, TouchableOpacity,ScrollView} from "react-native";
import BGimage from "./image/BG.png";
import { useNavigation } from "@react-navigation/native";
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import { ProgressBar } from "react-native-paper";

const { width, height } = Dimensions.get("window");
const wbottom = ((width*295)/812);
const wtop = ((width*590)/812);

function Foods({route}) {
	const navigation = useNavigation();
    const food = route.params.nameFood;

	const swipeimage = [];
	const img = food.thumbnail.map((deals)=>{
		swipeimage.push(require(`${deals}`));
	})
	const forswipe = swipeimage.map((list)=>{
		return(
			<View style={{width, justifyContent: 'center'}}>
				<Image source={list} style={styles.swipeimage} />
			</View>
			
		);
	});

	function scrolltoTop(){
		console.log("BACK");
		window.scrollTo({
			top:0,
			behavior: 'smooth'
		});
	}

	const [visible,setVisible] = useState("none");
	const toggleVisible=()=>{
		
		const scrolled = document.documentElement.scrollTop;
		if(scrolled>200){
			setVisible("flex");
		}
		else if(scrolled<=200){
			setVisible("none");
		}
	};

	window.addEventListener('scroll',toggleVisible);


	const dataProperty = food.Ingredient.map((prop)=>{
		return(
			<li style={{
				color:'white',
				fontFamily:'Mitr',
				fontWeight: 300,
				fontSize:12,
			}}>{prop}</li>
		);
	})

	const datax = food.Percent;
	const [color,setColor] = useState("#fff");

	function myColor(ind){
		switch(ind){
			case 0: return("#FCDA3B");
			case 1: return("#FFC201"); 
			case 2: return("#FF9114");
			case 3: return("#FF6A03");
			case 4: return("#FF3E38");
			case 5: return("#FD2C53");
			case 6: return("#CB2E5C");
			case 7: return("#9A2F65");
			case 8: return("#794D8A");
			case 9: return("#5C65C0");
			case 10: return("#2B9BDA");
			case 11: return("#007A62");
			case 12: return("#9DC668");
		}
	}
	
	const dataNutritional = datax.map((i,index)=>{
		
		return(
			<View style={styles.nutritional}>
				<Text style={styles.headNu}>{i[0]}</Text>
				<View style={{width:'80%'}}>
					<ProgressBar progress={i[1]/100} color={myColor(index)} style={styles.progressbar} />
				</View>
				<Text style={styles.valueNu}>{i[1]}%</Text>
			</View>
		);
	})
	function Data() {
		const styles = StyleSheet.create({
			headData:{
				fontFamily: 'Mitr',
				color: 'white',
				fontSize: 33,
				fontWeight: 'bold',
				lineHeight:45,
				letterSpacing:0.8,
			},
			headProperty:{
				fontFamily: 'Mitr',
				color: 'white',
				alignSelf:'center',
				fontSize:20,
				fontWeight:580,
				paddingTop:35,
				paddingBottom:0,
			},
			property:{
				fontFamily: 'Mitr',
				color: 'white',
			},

		})
		return(
			<View>
				<Text style={styles.headData}>{food.title}</Text>
				<Text style={styles.headProperty}>วัตถุดิบ</Text>
				<View>
					<ol style={{alignSelf:'center',marginTop:5,}}>
						{dataProperty}
					</ol>
				</View>
				<Text style={styles.headProperty}>ปริมาณวิตามินต่อความต้องการ</Text>
				<View style={{marginTop:20,paddingLeft:15,paddingRight:15}}>
					{dataNutritional}
				</View>
			</View>
			
		);
	}

    return(
        <View>
        <ScrollView style={styles.container} onScroll={toggleVisible}>
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
            	<Text style={styles.txtheader}></Text>
          	</View>
                
          	<View style={styles.body}>
            	<View style={styles.contentImage}>
					<SwiperFlatList
						showPagination
						autoplayLoop
						autoplayDelay={5}
						paginationStyleItemActive={{
							backgroundColor: '#1D9F58',
						}}
						paginationStyleItemInactive={{
							backgroundColor:'rgba(0,0,0,.2)',
						}}
						paginationStyleItem={{
							width:8,
							height:8,
							margin:4,
						}}
						paginationStyle={{
							backgroundColor: 'rgba(255,255,255,.6)',
							paddingLeft:5,
							paddingRight:5,
							height:16,
							borderRadius:8,
						}}
					>
						{forswipe}
					</SwiperFlatList>
				</View>
				<View style={styles.contentData}>
					<Data />
					<TouchableOpacity style={styles.btnAdd} >+เพิ่มลง STORY</TouchableOpacity>
				</View>
				</View>
				<View style={styles.bottom}>
				</View>
				<Image
					source={require("./image/BG-bottom.png")}
					style={styles.bottomimage}
				/>
        	</ImageBackground>
      	</ScrollView>

		<View style={{display:visible}}>
			<TouchableOpacity style={styles.backToTop} onPress={()=>{scrolltoTop()}}>
				<Text style={{color:'white', fontFamily:'Mitr'}}>UP</Text>
			</TouchableOpacity>
		</View>
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
      textTransform: 'uppercase',
    },
    body: {
      width: width,
      height: null,
	  padding:0,
	  paddingBottom: 50,
      justifyContent: "center",
	  flexDirection: 'column'
    },
    contentImage: {
      flexDirection: "row",
      flex: 1,
      flexWrap: "wrap",
      justifyContent: 'center',
	  marginTop: 10,
	  height:200,
    },
	contentData: {
		width: '100%',
		height: null,
		padding:30,
		paddingTop:15,
		// paddingBottom:60,
		// backgroundColor: 'white',
	},
    btnBack:{
        zIndex: 10,
        position: 'absolute',
        top: 30,
        left: 30,
    },
    txtBack:{
        fontFamily: 'Mitr',
        fontSize: 30,
        color: 'white'
    },
	swipeimage:{
		height: 200,
		width: '100%',
	},
	backToTop:{
		width:40,
		height:40,
		position:'fixed',
		bottom:15,
		right:15,
		backgroundColor:'rgba(29,159,88,0.8)',
		textAlign: 'center',
		borderRadius: 4,
		color: '#fff',
		justifyContent: 'center',
		fontFamily: 'Mitr',
	},
	nutritional:{
		width:'100%',
		flexDirection: 'row',
		marginBottom:10,
	},
	progressbar:{
		height: 18,
		backgroundColor: 'white',
		borderRadius:40,
	},
	headNu:{
		position: 'absolute',
		fontFamily: 'Mitr',
		fontSize: 12,
		paddingLeft: 12,
		zIndex: 5,
		height: 18,
		justifyContent: 'center',
	},
	valueNu:{
		position: 'relative',
		paddingLeft: 10,
		fontFamily: 'Mitr',
		textAlign: 'right',
		fontSize: 12,
		flex:1,
	},
	btnAdd:{
		backgroundColor:"#F9C609",
		width:'60%',
		borderRadius:40,
		fontSize: 15,
		fontFamily: 'Mitr',
		textAlign: 'center',
		margin: 30,
		height:30,
		justifyContent: 'center',
		alignSelf: 'center',
	}
  });
export default Foods;
import React, {Component, useState} from 'react';
import {View, Text,StyleSheet, Image,TouchableOpacity,Dimensions,ImageBackground, Button,ScrollView} from 'react-native';
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import BGimage from '../image/BG.png';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {FaArrowCircleUp} from 'react-icons/fa';
import {BackTop} from 'antd';


const { width, height } = Dimensions.get("window");
const wbottom = ((width*295)/812);
const wtop = ((width*590)/812);


function DetailDeal({route}) {
	const navigation = useNavigation();
	const deal = route.params.dealID;
	const swipeimage = [];
	const img = deal.thumbnail.map((deals)=>{
		swipeimage.push(require(`${deals}`));
	})
	const forswipe = swipeimage.map((list)=>{
		return(
			<View style={{width, justifyContent: 'center'}}>
				<Image source={list} style={styles.swipeimage} />
			</View>
			
		);
	});

	const [colors,changeColor] = useState("#000000");
	function myColor() {
		switch(deal.vit){
			case "Vitamin A":	return("#FCDA3B");
			case "Vitamin B1":	return("#FFC201"); 
			case "Vitamin B2":	return("#FF9114"); 
			case "Vitamin B3":	return("#FF6A03");
			case "Vitamin B5":	return("#FF3E38");
			case "Vitamin B6":	return("#FD2C53");
			case "Vitamin B7":	return("#CB2E5C");
			case "Vitamin B9":	return("#9A2F65");
			case "Vitamin B12":	return("#794D8A");
			case "Vitamin C":	return("#5C65C0");
			case "Vitamin D":	return("#2B9BDA");
			case "Vitamin E":	return("#007A62");
			case "Vitamin K":	return("#9DC668");
			default:	return("#000000");
		}
		console.log(colors);
	}

	const dataProperty = deal.Properties.map((prop)=>{
		return(
			<li style={{
				color:'white',
				fontFamily:'Mitr',
				fontWeight: 300,
				fontSize:12,
			}}>{prop}</li>
		);
	})
	const dataNutritional = deal.Nutritional.map((prop)=>{
		return(
			<li style={{
				color:'white',
				fontFamily:'Mitr',
				fontWeight: 300,
				fontSize:12,
			}}>{prop}</li>
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
			icon:{
				alignSelf: 'center',
				flexDirection: 'row',
				height: 33,
			},
			Sname:{
				fontFamily: 'Mitr',
				fontSize: 12,
				color: 'white',
				fontWeight:'300',
				lineHeight:18,
			},
			Nutrition:{
				fontFamily: 'Mitr',
				fontSize:16,
				color: 'white',
				fontWeight:580,
				letterSpacing:0.5,
				textAlign:'center',
				paddingTop:35,
			},
			tagicon:{
				backgroundColor:myColor(),
				alignSelf:'center',
				padding:1,
				paddingLeft:10,
				paddingRight:10,
				borderRadius:20,
				fontFamily: 'Mitr',
				marginRight: 10,
				fontWeight: 480,
			},
			txticon:{
				alignSelf:'center',
				fontFamily: 'Mitr',
				color: 'white',
				fontWeight: 300,
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
				<Text style={styles.headData}>{deal.title}</Text>
				<Text style={styles.Sname}>{deal.Sname[0]}</Text>
				<Text style={styles.Sname}>{deal.Sname[1]}</Text>
				<Text style={styles.Nutrition}>Nutritional value per 100g (3.5 oz)</Text>
				<View style={styles.icon}>
					<Text style={styles.tagicon}>{deal.vit}</Text>
					<Text style={styles.txticon}>{deal.NutritionalValue[0]} mg ({deal.NutritionalValue[1]}%)</Text>
				</View>
				<Text style={styles.headProperty}>สรรพคุณ</Text>
				<ol style={{alignSelf:'flex-start',marginTop:5}}>
					{dataProperty}
				</ol>
				<Text style={styles.headProperty}>คุณค่าทางโภชนาการ</Text>
				<ul style={{alignSelf:'center',marginTop:5}}>
					{dataNutritional}
				</ul>
					
			</View>
			
		);
	}

	function scrolltoTop(){
		console.log("BACK");
		window.scrollTo({
			top:0,
			behavior: 'smooth'
		});
		
		// listViewRef.scrollTo({x:0,y:0,animated:true});
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
		// console.log(scrolled+" / "+visible);
		// console.log(visible);
	};

	window.addEventListener('scroll',toggleVisible);
    return(
		<View>
        <ScrollView style={styles.container} onScroll={toggleVisible}>
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
							{/* <Image source={require("./image/Carrot-1.jpg")} style={{width:'100%',height:200}} />
							<Image source={require("./image/Carrot-2.jpg")} style={{width:'100%',height:200}} />
							<Image source={require("./image/Carrot-3.jpg")} style={{width:'100%',height:200}} /> */}
						{forswipe}
					</SwiperFlatList>
				</View>
				<View style={styles.contentData}>
					<Data />
				</View>
				</View>
				<View style={styles.bottom}>
				</View>
				<Image
					source={require("../image/BG-bottom.png")}
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
  });

export default DetailDeal;
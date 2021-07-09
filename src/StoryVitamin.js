import React,{useState,useEffect} from "react";
import {StyleSheet,Text,View,Image,Dimensions, TouchableOpacity,TouchableHighlight} from "react-native";
import moment from "moment";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import StoryFood from './Story/StoryFood.json';
import { useNavigation } from "@react-navigation/native";
import {VictoryBar, VictoryChart,VictoryGroup, VictoryAxis,VictoryPie, VictoryLabel} from 'victory';
import Svg,{Rect} from "react-native-svg";

const { width, height } = Dimensions.get("window");

var energy=0;
var vitamin=0;
const fullVitamin=1300;
const fullEnergy=2000;

var num=[0,0,0,0,0,0,0,0,0,0,0,0,0];
const countStory = StoryFood.StoryFoods.map((item,index)=>{
    const x = item["Percent"].map((deal,index)=>{
        num[index]+=deal[1];
        if(num[index]>100){
            num[index] = 100;
        }
    });
    energy += item.Energy;


    vitamin=0;
    num.map(x=>{vitamin+=x;})
});

const data = [
    {id:1 ,Y1: 80, Y2: 70, Y3: 40,Y4: 30 ,Y5: (energy*100)/fullEnergy },
    {id:2, Y1: 60, Y2: 30, Y3: 60,Y4: 20 ,Y5: (vitamin*100)/fullVitamin }
];

const GetBar1 = data.map((item)=>{
    return(
        <VictoryBar key={item.id} data={[{x:"1Jul",y:item.Y1}, {x:"2Jul",y:item.Y2},{x:"3Jul",y:item.Y3},{x:"4Jul",y:item.Y4},{x:"Today",y:item.Y5}]} />
    );

});

function AllBar() {
    return(
        <View>
            <VictoryChart width={600}>
                <VictoryAxis orientation="top" style={{
                    axis:{stroke: "rgba(0,0,0,0)"},
                    tickLabels:{fill:'white',fontFamily:'Mitr',fontSize:18},
                }}/>
                    <VictoryGroup
                        offset={40}
                        colorScale={["#444447","#444447"]}
                        style={{data:{width:30}}}
                    >
                        <VictoryBar data={[{x:"1Jul",y:100}, {x:"2Jul",y:100},{x:"3Jul",y:100},{x:"4Jul",y:100},{x:"Today",y:100}]} />
                        <VictoryBar data={[{x:"1Jul",y:100}, {x:"2Jul",y:100},{x:"3Jul",y:100},{x:"4Jul",y:100},{x:"Today",y:100}]} />
                    </VictoryGroup>
                    <VictoryGroup
                        offset={40}
                        colorScale={["#FF5656","#42D1B5"]}
                        style={{data:{width:30}}}
                    >
                        {GetBar1}
                        {/* <VictoryBar data={[{x:"1Jul",y:80}, {x:"2Jul",y:70},{x:"3Jul",y:40},{x:"4Jul",y:30},{x:"Today",y:50}]} />
                        <VictoryBar data={[{x:"1Jul",y:60}, {x:"2Jul",y:30},{x:"3Jul",y:60},{x:"4Jul",y:20},{x:"Today",y:90}]} /> */}
                    </VictoryGroup>
            </VictoryChart>
            <View style={{width:80,alignSelf:'center'}}>
                <View style={{flexDirection:"row",margin:3}}>
                    <Svg width="15" height="15"><Rect width="100%" height="100%" fill="#FF5656" /></Svg>
                    <Text style={{marginLeft:10,color:'white',fontFamily:'Mitr',fontSize:10}}>Energy</Text>
                </View>
                <View style={{flexDirection:"row",margin:3}}>
                    <Svg width="15" height="15"><Rect width="100%" height="100%" fill="#42D1B5" /></Svg>
                    <Text style={{marginLeft:10,color:'white',fontFamily:'Mitr',fontSize:10}}>Vitamin</Text>
                </View>
            </View>
        </View>
    );
}



const ListVittamins = num.map((item,index)=>{
    const styles = StyleSheet.create({
        panelVitamin:{
            // backgroundColor:'rgba(255,255,255,0.2)',
            margin:20,
            marginBottom:0,
            width:'85%',
            flexDirection:'row',
            alignItems:'center',
            alignSelf:'center',
            justifyContent:'space-between',
            height:80
        },
        thumbnailVit:{
            width:70,
            height:70,
            backgroundColor:'#D9EFF9',
            borderRadius:15,
            marginRight:10,
        },
        nameVit:{
            fontFamily:'Mitr',
            color:'white',
            fontSize:18,
            width:'100%'
        },
        percent:{
            alignSelf:'center',
            justifyContent:'center',
            position:'absolute',
            justifyContent:'center',
            top:30,
            color:'white',
            fontFamily:'Mitr',
            fontSize:12,
        }
    })
    const vit=[
        ["Vitamin A","#FCDA3B","./IconVit/Asset 4.png"],
        ["Vitamin B1","#FFC201","./IconVit/Asset 5.png"],
        ["Vitamin B2","#FF9114","./IconVit/Asset 6.png"],
        ["Vitamin B3","#FF6A03","./IconVit/Asset 7.png"],
        ["Vitamin B5","#FF3E38","./IconVit/Asset 8.png"],
        ["Vitamin B6","#FD2C53","./IconVit/Asset 9.png"],
        ["Vitamin B7","#CB2E5C","./IconVit/Asset 10.png"],
        ["Vitamin B9","#9A2F65","./IconVit/Asset 11.png"],
        ["Vitamin B12","#794D8A","./IconVit/Asset 12.png"],
        ["Vitamin C","#5C65C0","./IconVit/Asset 13.png"],
        ["Vitamin D","#2B9BDA","./IconVit/Asset 14.png"],
        ["Vitamin E","#007A62","./IconVit/Asset 15.png"],
        ["Vitamin K","#9DC668","./IconVit/Asset 16.png"]
    ];
    var x = require(`${vit[index][2]}`);
    return(
        <View style={styles.panelVitamin} key={item[index]}>
            <Image source={x} style={styles.thumbnailVit} />
            <Text style={styles.nameVit}>{vit[index][0]}</Text>
            <View style={{height:80,width:80}}>
                <VictoryPie
                    innerRadius={110}
                    colorScale={[`${vit[index][1]}`,"#AFAFAF"]}
                    labelComponent={<VictoryLabel style={{fill:'rgba(0,0,0,0)'}} />}
                    data={[{x:1,y:num[index]},{x:2,y:100-num[index]}]}
                />
                <Text style={styles.percent}>{Math.round(num[index])}%</Text>
            </View>
        </View>
    );
});



function StoryVitamin(){
	const navigation = useNavigation();
    const [currentDate,setCurrentDate] = useState("0");
    useEffect(() => {
        var date = moment().utcOffset('+05:30').format('MMM Do,YYYY');
        setCurrentDate(date);
    }, []);

    return(
        <View style={styles.container}>
            {countStory}
			<TouchableOpacity style={styles.btnBack} onPress={()=>navigation.goBack()}>
                <Text style={styles.txtBack}>{"<"}</Text>
            </TouchableOpacity>
          	<View style={styles.header}>
            	<Text style={styles.name}>Ever Medical</Text>
                <Text style={styles.profile}>Profile</Text>
                <Image source={require("./Story/Avatar.png")} style={styles.avatar} />
          	</View>
          	<View style={styles.body}>
                <Text style={styles.topic}>MY VITAMINS</Text>
                <Text style={styles.date}>{currentDate}</Text>
            	<View style={[styles.content,{marginBottom:30}]}>
					{AllBar()}
				</View>

                <Text style={styles.topic}>VITAMINS CATEGORY</Text>
                <View style={styles.content}>
                    {ListVittamins}
				</View>
			</View>
			<View style={styles.bottom}>

            </View>
      	</View>
    );
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: "#1E1D25",
		flex:1
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
    body: {
        width: width,
        height: null,
        paddingBottom: 50,
    },
    content: {
        width:width,
        position:'relative'

    },
	bottom:{
		position:'fixed',
		bottom:20,
		width:'75%',
		height:35,
		alignSelf:'center'
	},
    header:{
        marginTop: 65,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: 30,
    },
    name:{
        fontFamily: 'Mitr',
        color :'white',
        fontSize: 18,
        marginRight:70,
    },
    profile:{
        fontFamily: 'Mitr',
        color :'#45A2DB',
        fontSize: 12,
        marginRight:70,
        lineHeight: 10,
        fontWeight: 300,
    },
    avatar:{
        height:60,
        width:60,
        borderRadius:60,
        position: 'absolute',
        top:-8,
    },
    topic:{
        fontFamily: 'Mitr',
        color: 'white',
        fontSize: 22,
        fontWeight: 600,
        flex: 1,
        position: 'relative',
        paddingLeft:30,
    },
    date:{
        fontFamily: 'Mitr',
        color: '#EA9739',
        paddingLeft:30,
    },
	backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'flex-start',
        backgroundColor: '#FFC088',
		borderRadius: 20,
		padding:20,
		paddingTop:10,
		paddingBottom:10,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#FFC088',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
		borderRadius: 20,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
		backgroundColor: 'red',
        right: 0,
		borderTopRightRadius:20,
		borderBottomRightRadius:20,
    },
	swipe:{
		marginTop:10,
		marginBottom:10,
	},
	thumbnail: {
        width: 80,
        height: 80,
		borderRadius:80,
    },
	foodname:{
		fontFamily: 'Mitr',
		color: 'white',
		fontSize:23,
		fontWeight:500,
	},
	calories:{
		fontFamily:'Mitr',
		color:'#EA9739',
		fontSize:14,
		fontWeight:500,
		lineHeight:12,
	},
	btnvitamin:{
		backgroundColor :'#EA9739',
		height:'100%',
		textAlign:'center',
		justifyContent:'center',
		borderRadius:5,
	},
});

export default StoryVitamin;
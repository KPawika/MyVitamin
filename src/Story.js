import React,{useState,useEffect} from "react";
import {StyleSheet,Text,View,Image,Dimensions, TouchableOpacity,TouchableHighlight} from "react-native";
import moment from "moment";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import StoryFood from './Story/StoryFood.json';
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

function Story(){
	const navigation = useNavigation();

    const [currentDate, setCurrentDate] = useState('');
    useEffect(() => {
        var date = moment().utcOffset('+05:30').format('MMM Do,YYYY');
        setCurrentDate(date);
    }, []);

	const [listData, setListData] = useState(StoryFood.StoryFoods);

	const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
    };

	const renderItem = (data, rowMap) => (
        <SwipeRow
            disableRightSwipe
            rightOpenValue={-75}
			style={styles.swipe}
        >
            <View style={styles.rowBack}>
                <TouchableOpacity
                    style={styles.backRightBtn}
                    onPress={() => deleteRow(rowMap, data.item.key)}
                >
                    <Text style={styles.backTextWhite}>ลบ</Text>
                </TouchableOpacity>
            </View>
            <TouchableHighlight
                onPress={() => console.log('You touched me')}
                style={styles.rowFront}
                underlayColor={'#AAA'}
            >
                <View style={{flexDirection:'row'}}>
					<Image source={require(`${data.item.thumbnail[0]}`)} style={styles.thumbnail} />
					<View style={{flexDirection:'column',justifyContent:'center',paddingLeft:10}}>
						<Text style={styles.foodname}>{data.item.title}</Text>
						<Text style={styles.calories}>{data.item.Energy} Kcal</Text>
					</View>
                </View>
            </TouchableHighlight>
        </SwipeRow>
    );

    return(
        <View style={styles.container}>
			<TouchableOpacity style={styles.btnBack} onPress={()=>navigation.goBack()}>
                <Text style={styles.txtBack}>{"<"}</Text>
            </TouchableOpacity>
          	<View style={styles.header}>
            	<Text style={styles.name}>Ever Medical</Text>
                <Text style={styles.profile}>Profile</Text>
                <Image source={require("./Story/Avatar.png")} style={styles.avatar} />
          	</View>
          	<View style={styles.body}>
                <Text style={styles.topic}>VITAMIN STORY</Text>
                <Text style={styles.date}>{currentDate}</Text>
            	<View style={styles.content}>
					<SwipeListView data={listData} renderItem={renderItem} />
				</View>
			</View>
			<View style={styles.bottom}>
				<TouchableOpacity style={styles.btnvitamin} onPress={()=>navigation.navigate("StoryVitamin")}>
					<Text style={{
						fontFamily:'Mitr',
						textAlign:'center',
						color:'white',
						fontSize:15,
						fontWeight:500,
					}}>MY VINTAMINS</Text>
				</TouchableOpacity>
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
        padding: 20,
        justifyContent: "center",
        paddingBottom: 50,
    },
    content: {
        flex: 1,
        flexWrap: "wrap",
		marginTop: 15,
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
        fontWeight: 700,
        flex: 1,
        position: 'relative',
    },
    date:{
        fontFamily: 'Mitr',
        color: '#EA9739',
    },
	backTextWhite: {
        color: 'white',
        fontFamily: 'Mitr',
        fontSize:20,
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
        backgroundColor: '#BC4D53',
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
		backgroundColor: '#BC4D53',
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
	}
});

export default Story;
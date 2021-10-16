import React, {useEffect,useState} from 'react'
import {StyleSheet,Text,View,Image,FlatList,Pressable} from 'react-native'
import {Dimensions, Alert, TouchableOpacity, YellowBox } from 'react-native';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import Swipeout from 'react-native-swipeout';
import io from 'socket.io-client';
import Dialog from "react-native-dialog";
import { SearchBar } from 'react-native-elements';

const SearchScreen = ({navigation,route}) => {

const ty= route.params.type
const te= route.params.text
const[type,setType]=useState(ty);
const[text,setText]=useState(te);


   const[shop,setShop]=useState([]);
   const[food,setFood]=useState([]);
//   const[nameshop,setNameShop]=useState([]);
//   const[imageshop,setImageShop]=useState([]);
//   const[addressshop,setAddressShop]=useState([]);
//   const[search,setSearch]=useState([]);


  useEffect(()=>{
    const socket = io('http://10.0.2.2:3000')
    socket.on('server_msg', msg=>{
        if(type == 'shop'){
    fetch('http://10.0.2.2:3000/shop')
      .then((res)=>res.json())
      .then((data)=>{
        setShop(data.SearchShop)
      })
      .catch((err)=>console.error(err))
        }else{
    fetch('http://10.0.2.2:3000/food')
      .then((res)=>res.json())
      .then((data)=>{
        setFood(data.SearchFood)
      })
      .catch((err)=>console.error(err))
        }
    })
  } , [])
    
  useEffect(()=>{
    if(type == 'shop'){
        fetch('http://10.0.2.2:3000/shop/search/'+text)
          .then((res)=>res.json())
          .then((data)=>{
            setShop(data.SearchShop)
          })
          .catch((err)=>console.error(err))
            }else{
        fetch('http://10.0.2.2:3000/food/search/'+text)
          .then((res)=>res.json())
          .then((data)=>{
            setFood(data.SearchFood)
          })
          .catch((err)=>console.error(err))
            }
}, [])



const renderItemShop = ({item})=>{
	const swipeoutSettings = {
		autoClose: true,
		onClose: () => {},
		onOpen: () => {
			// item._setCurrent(item.item);
		},
		left: [
			{
				text: 'To Shop',
				type: 'secondary',
			},
			{
				text: 'Favorite',
				type: 'delete'				
			}
		]
	};
    return(
        <Swipeout {...swipeoutSettings}>
        <View style={styles.listContainer}>
            <Image
                source={{ uri: item.imageshop, width: 60, height: 60 }}
                style={{ borderWidth: 1, borderColor: 'black' }}
            />
            <View>
                <Text style={{ marginLeft: 10, fontSize: 20 }}>{item.nameshop}</Text>
                <Text style={{ marginLeft: 10 }}>{item.addressshop}</Text>
            </View>
        </View>
    </Swipeout>
    )
}

const renderItemFood = ({item})=>{
	const swipeoutSettings = {
		autoClose: true,
		onClose: () => {},
		onOpen: () => {
			// item._setCurrent(item.item);
		},
		left: [
			{
				text: 'To Shop',
				type: 'secondary',
			},
			{
				text: 'Favorite',
				type: 'delete'				
			}
		]
	};
    return(
        <Swipeout {...swipeoutSettings}>
        <View style={styles.listContainer}>
            <Image
                source={{ uri: item.imageimagefood, width: 60, height: 60 }}
                style={{ borderWidth: 1, borderColor: 'black' }}
            />
            <View>
                <Text style={{ marginLeft: 10, fontSize: 20 }}>{item.namefood}</Text>
                <Text style={{ marginLeft: 10 }}>{item.pricefood}</Text>
            </View>
        </View>
    </Swipeout>
    )
}
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		marginHorizontal:50,
		
	},
	containerBut: {
		flexDirection: 'row',
		marginTop:10,

	},
	awesomeBut:{
		marginHorizontal:5
	},
	searchBar:{
		color:"#007aff"
	},
	listContainer: {
		backgroundColor: '#f1f1f1',
		flexDirection: 'row',
		margin: width * 3.6 / 187.5,
		padding: width * 3.6 / 187.5,
		borderRadius: width * 3.6 / 187.5
	},
	fab: {
		height: 50,
		width: 50,
		borderRadius: 200,
		position: 'absolute',
		bottom: 20,
		right: 20,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#686cc3'

	},
	text: {
		fontSize: 30,
		color: 'white'
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22
	},
	modalView: {
		width: width * 167.5 / 187.5,
		padding: width * 8 / 187.5,
		borderRadius: width * 3.6 / 187.5,

		margin: 20,
		backgroundColor: 'white',

		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	openButton: {
		backgroundColor: '#F194FF',
		borderRadius: 20,
		padding: 10,
		margin: 2,
		elevation: 2
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	modalText: {
		fontSize: 20,
		marginBottom: 15,
		textAlign: 'center'
	},
	lineDialog: {
		width: '100%',
		height: 40,
		margin: 8,
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 5,
		backgroundColor: '#f1f1f1'
	},
	textInputDialog: {
		height: 34,
		flex: 1,
		marginRight: 4,
		borderWidth: 0.1,
		borderRadius: 5,
		color: '#111111',

		fontSize: 15,
		paddingLeft: 5
	}
});


return(
    
  <>
  {
      shop.length || food.length > 0 ?
  <View >

      <FlatList
          data={shop}
          renderItem={renderItemShop}
          keyExtractor={(item)=>item._id}
      />
        <FlatList
          data={food}
          renderItem={renderItemFood}
          keyExtractor={(item)=>item._id}
      />
  </View>
       : <Text>No data</Text>
  }
  </>
)
}
export default SearchScreen;



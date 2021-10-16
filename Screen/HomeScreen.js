import React, {useEffect,useState} from 'react'
import {StyleSheet,Text,View,Image,FlatList,Pressable} from 'react-native'
import {Dimensions, Alert, TouchableOpacity, YellowBox } from 'react-native';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import Swipeout from 'react-native-swipeout';
import io from 'socket.io-client';
import Dialog from "react-native-dialog";
import { Input, SearchBar } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown'

const HomeScreen = ({navigation}) => {
  const[shop,setShop]=useState([]);
  const[idshop,setIdShop]=useState([]);
  const[nameshop,setNameShop]=useState([]);
  const[imageshop,setImageShop]=useState([]);
  const[addressshop,setAddressShop]=useState([]);
  const[search,setSearch]=useState([]);
  const[Scode,setScode]=useState([]);
  const selectSearch = ["shop", "food"]

  useEffect(()=>{
    const socket = io('http://10.0.2.2:3000')
    socket.on('server_msg', msg=>{
      fetch('http://10.0.2.2:3000/shop')
      .then((res)=>res.json())
      .then((data)=>{
        setShop(data.ListShop)
      })
      .catch((err)=>console.error(err))
    })
  } , [])
    
  useEffect(()=>{
    fetch('http://10.0.2.2:3000/shop')
    .then((res)=>res.json())
    .then((data)=>{
      setShop(data.ListShop)
})
    .catch((err)=>console.error(err))
}, [])

const GetSearch = (selectedItem) =>{

console.log(selectedItem)


}



const renderItem = ({item})=>{
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
				onPress: () => {navigation.navigate('ShopScreen',{id: item._id})}
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
		color:"#007aff",
		width:'80̀%'
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
	},
	textSearch:{
		height:50,
		borderBottomEndRadius:10,
		backgroundColor:'#F0FFFF',
		width:'65%',
		borderColor:'#00CED1',
		borderWidth:2,
		borderRadius:25
		
	},
	viewSearch:{
		flexDirection: 'row',
	},
	selectOption:{
		height:40,
		borderColor:'#00CED1',
		borderWidth:2,
		borderRadius:25

		
	}
});


return(
  <>
  {
      shop.length > 0 ?
  <View >
<View style={styles.viewSearch}>
	<TextInput style={styles.textSearch} onChangeText={setSearch} placeholder='Search ?'/>
	<SelectDropdown
	style={styles.selectOption}
	data={selectSearch}
	onSelect={(selectedItem, index) => {

		navigation.navigate('SearchScreen',{type: selectedItem,text: search})
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		return item
	}}
/>
</View>

<View style={styles.containerBut}>
<AwesomeButtonRick type="secondary" size="small" style={styles.awesomeBut}
 onPress={() => navigation.navigate('CategoryScreen',{id: '61627c6888258e5e669299b2'})}	>Cơm</AwesomeButtonRick> 
<AwesomeButtonRick type="secondary" size="small" style={styles.awesomeBut}
 onPress={() => navigation.navigate('CategoryScreen',{id: '61627cec88258e5e669299b3'})}	>Gỏi cuốn</AwesomeButtonRick>
<AwesomeButtonRick type="secondary" size="small" style={styles.awesomeBut}
 onPress={() => navigation.navigate('CategoryScreen',{id: '61627d2488258e5e669299b4'})}	>Đồ ăn nhanh</AwesomeButtonRick>

</View>
<View style={styles.containerBut}>
<AwesomeButtonRick type="secondary" size="small" style={styles.awesomeBut}
 onPress={() => navigation.navigate('CategoryScreen',{id: '61627d5488258e5e669299b5'})}	>Đồ ăn vặt</AwesomeButtonRick>
<AwesomeButtonRick type="secondary" size="small" style={styles.awesomeBut}
 onPress={() => navigation.navigate('CategoryScreen',{id: '61627d8e88258e5e669299b6'})}	>Bánh ngọt</AwesomeButtonRick>
<AwesomeButtonRick type="secondary" size="small" style={styles.awesomeBut}
 onPress={() => navigation.navigate('CategoryScreen',{id: '61627dc488258e5e669299b7'})}	>Đồ uống</AwesomeButtonRick>
</View>
      <FlatList
          data={shop}
          renderItem={renderItem}
          keyExtractor={(item)=>item._id}
      />
  </View>
       : <Text>No data</Text>
  }
  </>
)
}
export default HomeScreen;



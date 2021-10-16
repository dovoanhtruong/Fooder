import React, {useEffect,useState} from 'react'
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Image,
    ToastAndroid
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import Dialog from "react-native-dialog";
import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const SignInScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        username: '',
        phonenumber: '',
        email:'',
        password: '',
        password_confirmation: '',
        check_textInputChange: true,
        check_numberInputChange: true,
        check_emailInputChange: true,
        check_passwordInputChange: true,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const [otp, setOtp] = useState(false);
    const [notification, setNotification] = useState(false);
    const channel='sms';
    const [error,setError]=useState('');
    var Str ;
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    // const[tName,setTname]=useState('')
    // const[tPhone,setTphone]=useState('')
    // const[tPass,setTpass]=useState('')
    // const[tConfirm,setTconfirm]=useState('')
    const countries = ["Egypt", "Canada", "Australia", "Ireland"]


    
    const showDialogOtp = () => {
	    setOtp(true);
    };

    const handleCancelOtp = () => {
        setOtp(false);
      };

      const showNoti = () => {
	    setNotification(true);
    };


    const textInputChange = (val) => {
        if( val.length >=4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }

    const numberInputChange = (val) => {
        if( val.length >= 8 ) {
            setData({
                ...data,
                phonenumber: val,
                check_numberInputChange: true
            });
        } else {
            setData({
                ...data,
                phonenumber: val,
                check_numberInputChange: false
            });
        }
    }

    const emailInputChange = (val) => {
        if( val.length >= 8 ) {
            setData({
                ...data,
                email: val,
                check_emailInputChange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_emailInputChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 6 ) {
            setData({
                ...data,
                password: val,
                check_passwordInputChange: true
            });
        } else {
            setData({
                ...data,
                password: val,
                check_passwordInputChange: false
            });
        }
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            password_confirmation: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    const ToastFail = (Str) => {
        ToastAndroid.showWithGravityAndOffset(
          Str,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,50
        );
      };

      const onRegister=(username,phonenumber,password,password_confirmation,email)=>{
        console.log('regis')
          const option={
              method:'post',
              headers:{'Content-Type' : 'application/json'},
              body: JSON.stringify({username,password,password_confirmation,phonenumber,email})
          }
              fetch('http://10.0.2.2:3000/api/register', option)
          .then((res)=>res.json())
          .then((res)=>{
              setError('')
             if(res.status){
                Str = 'Register Success !'
                ToastFail(Str);
                showNoti();
             }else{
                Str = 'Register Fail !'
                ToastFail(Str);
             }
      })
          .catch((err)=>console.error(err))
      }
    const check_sendOTP = (username,phonenumber,password,password_confirmation,email)=>{
        var Str ;
        if( username.trim().length >=4  && phonenumber.trim().length >=8  && email.trim().length >= 6){
            if( password == password_confirmation && password_confirmation.trim().length >= 6){
               // onGetCodeVerity(phonenumber);
                onRegister(username,phonenumber,password,password_confirmation,email);
                }else{
                    Str = 'Incorrect password !'
                   ToastFail(Str);
                }
            }else{
                Str = 'Please enter full information !'
                ToastFail(Str);
            }
        }

        // const onGetCodeVerity=(phonenumber)=>{
        //     const option={
        //         method:'post',
        //         headers:{'Content-Type' : 'application/json'},
        //         body: JSON.stringify({phonenumber,channel})
        //     }
        //         fetch('http://10.0.2.2:3000/api/test', option)
        //     .then((res)=>res.json())
        //     .then((res)=>{
        //         setError('')
        //          setTimeout(() => {
        //           if(res.status){
        //             showDialogOtp();
        //            }else{
        //             Str = 'Invalid phone number !'
        //             ToastFail(Str);
        //            }
        //             }, 1000);
        //   })
        //     .catch((err)=>console.error(err))
        //   }


    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>

          

            <Text style={styles.text_footer}>Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.check_textInputChange ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
            </Animatable.View>
            }

            <Text style={[styles.text_footer, {
                marginTop: 30
            }]}>Phone Number</Text>
            <View style={styles.action}>
               
            <FontAwesome 
                    name="phone"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    keyboardType="phone-pad"
                    placeholder="Phone Number"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => numberInputChange(val)}
                    
                />
                {data.check_numberInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.check_numberInputChange ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Phone Number must be 8 characters long.</Text>
            </Animatable.View>
            }

            <Text style={[styles.text_footer, {
                marginTop: 30
            }]}>Email</Text>
            <View style={styles.action}>
               
            <FontAwesome 
                    name="at"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    keyboardType="email-address"
                    placeholder="Email Address"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => emailInputChange(val)}
                    
                />
                {data.check_emailInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.check_emailInputChange ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Email address must be 8 characters long.</Text>
            </Animatable.View>
            }

            <Text style={[styles.text_footer, {
                marginTop: 30
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                    
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.check_passwordInputChange ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 6 characters long.</Text>
            </Animatable.View>
            }

            <Text style={[styles.text_footer, {
                marginTop: 30
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                   
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {check_sendOTP(
                        data.username,data.phonenumber,data.password,data.password_confirmation,data.email)}}
                    style={[styles.signInS, {
                        borderColor: '#009387',
                        borderWidth: 1,
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Get OTP</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 10
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign In</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>

        <Dialog.Container style={{borderColor:'#009387'}} visible={otp}>
        <Dialog.Title style={[styles.text_footer,{
            fontSize:20,
            color:'#009387',
            fontWeight: 'bold'
        }]}>Please confirm phone number !</Dialog.Title>
        <Image style={{width:175,height:150,marginLeft:50,marginHorizontal:60}} source={require("../assets/otp.png")} />
		<Dialog.Input style={{marginHorizontal:10,color: '#05375a', alignItems: 'center',justifyContent: 'center',}}  placeholder="Code OTP"  />

		<Dialog.Button label="Cancel" style={[styles.btnDialog, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 5
                    }]} onPress={handleCancelOtp} />
		<Dialog.Button label="Confirm" style={[styles.btnDialog, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 5,
                    }]} onPress={handleCancelOtp} />
      </Dialog.Container>

      <Dialog.Container style={{borderColor:'#009387'}} visible={notification}>
        <Dialog.Title style={[styles.text_footer,{
            fontSize:20,
            color:'#009387',
            fontWeight: 'bold'
        }]}>Register Success !</Dialog.Title>
        <Image style={{width:175,height:150,marginLeft:50,marginHorizontal:60}} source={require("../assets/otp.png")} />
		<Dialog.Button label="Login" style={[styles.btnDialog, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 5,
                    }]}  onPress={() => navigation.goBack()} />
      </Dialog.Container>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 40
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    signInS: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor:"#009387"
    },
    btnDialog: {
        width: '90%',
        height: 35,
        marginHorizontal:10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 12,
    }
  });

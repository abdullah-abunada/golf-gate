import {StyleSheet} from 'react-native'
import {ApplicationStyles, Colors, Fonts} from '../../Themes'


export default StyleSheet.create({
    ...ApplicationStyles.screen,
    containerStyle: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10
    },
    rowContainerStyle: {
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    textButtonStyle: {
        ...Fonts.style.normal,
        marginLeft: 10,
        color: Colors.white,
        alignSelf: 'center'
    },
    registerTextButtonStyle: {
        ...Fonts.style.normal,
        color: Colors.fire,
        marginLeft: 10,
        alignSelf: 'center'
    },
    GridContainerStyles: {
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    thumbContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    registerContainer:{
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor:'rgba(255,255,255,0.8)'
    },
    errorTextStyle:{
        ...Fonts.style.description,
        color : Colors.fire,
        alignSelf:'center'
    } ,
    spinner:{
        marginTop: 50 ,
        alignSelf : 'center'
    }
})

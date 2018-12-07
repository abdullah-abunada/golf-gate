import { StyleSheet } from 'react-native'
import{Colors} from '../../Themes'
export default StyleSheet.create({
   ContainerStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 40
    },
    labelContainer: {
        justifyContent: 'flex-end'
    },
    labelStyle: {
        color: '#999',
        fontSize: 20
    },
    buttonStyle: {
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderColor: '#fff'

    }
})

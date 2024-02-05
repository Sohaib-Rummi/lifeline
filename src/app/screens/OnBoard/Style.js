import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    wrapper:{
        flex:1
    },
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    headingContainer:{
        height:200,
        justifyContent:'center',
        alignItems:'center',
    },
    heading:{
        fontFamily:'Kalam-Bold',
        fontSize:62,
        color:'#ff0004',
    },
    subHeading:{
        marginTop:-28,
        fontFamily:'Kalam-Regular',
        fontSize:18,
        color:'#ff0004',
    },
    imageContainer:{
        height:300,
        overflow:'hidden',
    },
    image:{
        width:'100%',
        height:'100%',
        resizeMode:'contain'
    },
    buttonContainer:{
        marginTop:10,
        marginBottom:40,
        justifyContent:'center',
        alignItems:'center',
        flexGrow:1,
    },
    button:{
        paddingHorizontal:50,
        paddingVertical:10,
        backgroundColor:'#ff0004',
        borderWidth:2,
        borderColor:'#fff',
        borderRadius:15,
    },
    buttonText:{
        fontFamily:'Roboto-Regular',
        fontSize:18,
        color:'#fff'
    }


});
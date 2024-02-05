import { StyleSheet } from "react-native";
import { colors } from "./Colors";
export const globalStyles = StyleSheet.create({
    wrapper:{
        flex:1,
    },
    // Auth Section
    authContainer:{
        flex:1,
        backgroundColor:colors.red,
    },
    authHeadingContainer:{
        justifyContent:'center',
        alignItems:'center',
        paddingTop:80,
    },
    authHeading:{
        fontSize:64,
        fontFamily:'Kalam-Bold',
        color:colors.white,
        paddingHorizontal:20,
    },
    authSubheading:{
        marginTop:-25,
        fontFamily:'Kalam-Regular',
        color:colors.white,
        fontSize:18
    },
    errorContainer:{
        backgroundColor:colors.red_50,
        marginHorizontal:20,
        height:50,
        borderRadius:10,
        marginVertical:10,
        paddingHorizontal:10,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    error:{
        fontSize:16,
        color:colors.red,
        fontFamily:'Roboto-Regular',
    },
    authInputContainer:{
        marginVertical:10,
        paddingHorizontal:20,
    },
    authButtonContainer:{
        marginVertical:10,
        height:50,
        overflow:'hidden',
        paddingHorizontal:20,
    },
    googleButton:{
        width:'100%',
        height:'100%',
        borderRadius:15,
        backgroundColor:colors.white,
        display:'flex',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    googleButtonImage:{
        width:30,
        height:30,
    }, 
    googleButtonText:{
        color:'#4d4d4d',
        fontSize:16,
        marginLeft:10,
    },
    divider:{
        marginHorizontal:20,
        marginVertical:20,
        position: 'relative',
        borderWidth:0.5,
        borderColor:'#ff4d4d',
        justifyContent:'center',
        alignItems: 'center',
    },
    dividerText:{
        position: 'absolute',
        color:colors.white,
        fontSize:20,
        top:-16,
        fontFamily:'Kalam-Light'
        
        
    },
    label:{
        color:colors.white,
        fontSize:18,
        fontFamily:'Kalam-Regular',
        marginLeft:5,
    },
    inputField: {
        width:'100%',
        height:50,
        borderWidth:1,
        borderColor:'#cecece',
        marginTop:5,
        marginBottom:20,
        borderRadius:15,
        backgroundColor:colors.white,
        paddingHorizontal:10,
        color:colors.black,
        fontSize:16,
        
    },
    smallTextContainer:{
        marginTop:-15,
        justifyContent:'flex-end',
        alignItems: 'flex-end',
        marginRight:5,
    },  
    smallText:{
        fontSize:14,
        color:colors.white,        
    },
    
});
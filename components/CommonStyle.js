//================================GLOBAL STYLE======================================
export const Colors = {
    white: '#ffffff',
    black: '#000000',
    lightyellow: '#FEBE10',
    darkyellow: '#ff9900',
    grey: '#5a5c5a',
    lightblue: '#03eaff',
    blue: '#04c7d9'
};

export const Height = {
    hundred: '100%',
    fifty: '50%',
    twentyfive: '25%',
    ten: '10%',
    five: '5%'
};
export const Width = {
    hundred: '100%',
    fifty: '50%',
    twentyfive: '25%',
    ten: '10%',
    five: '5%'
};

export const Fontsize = {
    twenty: 20,
    fifteen: 15,
    ten: 10,
};

//================================COMMON STYLE======================================

import { Dimensions } from "react-native";

export const CommonStyle ={
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    Inputtext: {
        flexDirection: 'row',
        backgroundColor: '#d3d3d3',
        borderRadius: 10,
        padding: 5,
    },
    Logo: {
        height: '25%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Form: {
        marginTop: 40,
        padding: 20,
        height: '40%',
        width: '100%',
    },
    Btn: {
        marginTop: -50,
        height: '35%',
        width: '100%',
    },
    Img: {
        //aspect reation = width/height
        width: 150,
        height: 100,
    },
    Greyline: {
      height: 1,
      borderColor: "#D0D0D0",
      borderWidth: 1.5,
    }
};

export const Deviceheight = Dimensions.get('window');
export const Devicewidth = Dimensions.get('window');

    

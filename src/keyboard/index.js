import React, { useState } from 'react'
import {View, StyleSheet, TouchableHighlight , Dimensions , Text} from 'react-native'
import CloseArrow from '../icons/closeArrow'
import Backspace from '../icons/backspace'


const { height, width } = Dimensions.get('window');

export default function KeyPad(props) {

    const checkDot = () => {
        let aux = props.value.toString()

        let i

        for(i = 0; i < aux.length; i++){
            if(aux[i] === '.'){
                return(aux)
            }
        }

        return((aux + '.'))
    }


    return(
        <View style={styles.wrapper}>
            <View style={styles.screen}>
                <Text style={{color: '#fff', fontSize:16, paddingRight: 5}}>{props.value || 0}</Text>
            </View>
            <View style={styles.keyboard}>
                <TouchableHighlight style={styles.key} onPress={()=> props.updateValue(+(props.value + '7') )}>
                    <Text style={styles.text}>7</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.key} onPress={()=> props.updateValue(+(props.value + '8') )}>
                    <Text style={styles.text}>8</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.key} onPress={()=> props.updateValue(+(props.value + '9') )}>
                    <Text style={styles.text}>9</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.keyX} onPress={()=> props.close()}>
                    <View><CloseArrow /></View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.key} onPress={()=> props.updateValue(+(props.value + '4'))}>
                    <Text style={styles.text}>4</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.key} onPress={()=> props.updateValue(+(props.value + '5'))}>
                    <Text style={styles.text}>5</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.key} onPress={()=> props.updateValue(+(props.value + '6'))}>
                    <Text style={styles.text}>6</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.key} onPress={()=> props.updateValue(props.value*(-1))}>
                    <Text style={styles.text}>+/-</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.key} onPress={()=> props.updateValue(+(props.value + '1'))}>
                    <Text style={styles.text}>1</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.key} onPress={()=> props.updateValue(+(props.value + '2'))}>
                    <Text style={styles.text}>2</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.key} onPress={()=> props.updateValue(+(props.value + '3'))}>
                    <Text style={styles.text}>3</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.keyC} onPress={()=> props.updateValue('0')}>
                    <Text style={styles.text}>C</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.key} onPress={()=> props.updateValue(checkDot())}>
                    <Text style={styles.text}>.</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.key} onPress={()=> props.updateValue(props.value + '0')}>
                    <Text style={styles.text}>0</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.key} onPress={()=> props.updateValue((props.value.toString().slice(0,-1)))}>
                    <View><Backspace /></View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.keyN}>
                    <View>

                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        width: '100%',
        backgroundColor: '#FFF',
    },

    screen:{
        width: '100%',
        height: 35,
        backgroundColor:  'rgba(29, 41, 29, 0.7)',
        alignItems: 'flex-end' ,
        justifyContent: 'center',
        borderWidth:1,
        borderColor:'#FFF',
        borderRadius:5,
    },

    keyboard:{
        width: '100%',
        backgroundColor:  '#fff',
        flexDirection: 'row',
        flexWrap: 'wrap',
 
    },

    key:{
        width: (width/4),
        maxWidth: (500/4),
        height: 45,
        backgroundColor: '#333', 
        borderColor: '#fff',
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    keyC:{
        width: (width/4),
        maxWidth: (500/4),
        height: 45,
        backgroundColor: 'rgba(255,199,72,1)', 
        borderColor: '#fff',
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    keyX:{
        width: (width/4),
        maxWidth: (500/4),
        height: 45,
        backgroundColor: 'rgb(180, 0, 0)', 
        borderColor: '#fff',
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    keyN:{
        width: (width/4),
        maxWidth: (500/4),
        height: 45,
        backgroundColor: '#666', 
        borderColor: '#fff',
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text:{
        color: '#fff',
        fontSize: 14,

    }
})
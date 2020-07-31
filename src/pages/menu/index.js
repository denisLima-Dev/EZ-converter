import  React from 'react';
import {View , Text , StyleSheet , ScrollView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Dimensions } from 'react-native'
import Length from '../../icons/length'
import Area from '../../icons/area'
import Speed from '../../icons/speed'
import Volume from '../../icons/volume'
import Weight from '../../icons/weight'
import Temperature from '../../icons/temperature'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const { height, width } = Dimensions.get('window');


export default function Menu({navigation}) {
    return (
        <View style={styles.wrapper}>
            <View style={{height: (height-80-80)}}>
                <ScrollView style={{height:'100%', width:'100%'}} showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.content} onPress={()=> navigation.navigate('Length')}>
                            <Icon name='ruler' style={styles.ico} />
                            <Text style={styles.text}>Length</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.content} onPress={()=> navigation.navigate('Volume')}>
                            <Icon name='flask-outline' style={styles.ico} /> 
                            <Text style={styles.text}>Volume</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.content} onPress={()=> navigation.navigate('Area')}>
                            <Icon name='texture' style={styles.ico} /> 
                            <Text style={styles.text}>Area</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.content} onPress={()=> navigation.navigate('Speed')}>
                            <Icon name='speedometer' style={styles.ico} /> 
                            <Text style={styles.text}>Speed</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.content} onPress={()=> navigation.navigate('Weight')}>
                            <Icon name='scale-balance' style={styles.ico} /> 
                            <Text style={styles.text}>Weight</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.content} onPress={()=> navigation.navigate('Temperature')}>
                            <Icon name='thermometer' style={styles.ico} />
                            <Text style={styles.text}>Temperature</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.content} onPress={()=> navigation.navigate('Currency')}>
                            <Icon name='currency-usd' style={styles.ico} />
                            <Text style={styles.text}>Currency exchange</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.content} onPress={()=> navigation.navigate('Pressure')}>
                            <Icon name='gauge' style={styles.ico} />
                            <Text style={styles.text}>Pressure</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.ad}>
                <Text>Propaganda</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      flexWrap: 'wrap',
      flexDirection: 'row',
      padding: 5
    },
    content:{
        width: ((width/2) - 15),
        maxWidth: 200,
        height: 100,
        borderColor: '#666',
        borderRadius: 8,
        borderStyle: 'solid',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 1,  
        backgroundColor: 'rgba(240, 240, 240, 1)'
            },

    text:{
        padding: 5,
        fontSize: 14,
        fontWeight: 'bold',

    },

    ad: {
        position:'absolute', 
        bottom: 0, 
        width: '100%', 
        height:80, 
        backgroundColor: 'rgba(207, 207, 207, 0.6)',
        alignItems:'center',
        justifyContent: 'flex-start'
      },

    wrapper:{
        height: '100%',
        width: width,
        backgroundColor: 'rgba(170,170,170, 1)',
    },

    ico:{
        fontSize: 55,
        color: 'rgba( 0, 0, 0, 0.6)'
    }
})
    

  
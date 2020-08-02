import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback , StyleSheet, ScrollView, Dimensions, Animated} from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Keyboard from '../../keyboard'

const { height, width } = Dimensions.get('window');


class Template extends Component{
  state={
    value: 0,
    unitInUse: '',
    unit:{},
  }


  prepareNumber = e =>{
    let val = e.toString()

    let [int, dec] = val.split('.')
    
    if(!int)int = '0'

    let length = int.length

    let arr = Array.from(int)

    let output = new String

    if(int[0] === '-') length--

    let aux = parseInt(length/3)

    if((length%3) === 0) aux--

    if(length > 3){
      arr.length = arr.length + aux

      let i = arr.length - 1

      let cont = 0

      while(i >= 0){
        if(cont === 3 && aux > 0){
          arr[i] = ','
          cont = 0
          aux--
          
        }else{
          arr[i] = arr[i-aux]
          cont++
        }
        i--
      }
      arr.map(e=>{
        output = output + e
      })

    }else{
      output = int
    }
    if(dec){
      output = output + '.' + dec
    }

    if(val[val.length-1] === '.' && !dec){
      output = output + '.'
    }

    return(output)

  }

  truncateValue = e => {
    let i = +(e.toFixed(6))
    return(this.prepareNumber(i))
  }

//Functions to convert values
Convert = val => {
  let baseValue = val / this.props.unitConvert[this.state.unitInUse]


  let aux = new Object

  Object.keys(this.props.unitConvert).map(e=>{
    aux[e] = this.truncateValue(baseValue * this.props.unitConvert[e])
  })

  return(aux)
}


//Functions to deal with the keypad
updateValue = val => {

    if(val.toString().length > 11){
      return
    }

    let i = new Object
    i['unit'] =  this.Convert(val)

    i['unit'][this.state.unitInUse] = this.prepareNumber(val)
    
    i['value'] = val

    this.setState(i)
}

//Keyboard Animation
translateY = new Animated.Value(0)

  openKeyboard = () => {
    Animated.timing(this.translateY, {
        toValue: 235,
        duration: 200,
        useNativeDriver: false
    }).start()
  }

closeKeyboard = () => {
    this.setState({ unitInUse: ''})
    Animated.timing(this.translateY,{
        toValue: 0,
        duration: 200,
        useNativeDriver: false
    }).start()
}


onHandlerStateChange = (event) => {
  if(event.nativeEvent.oldState === State.ACTIVE){

      let closed = false

      let value = 0

      const {translationY} = event.nativeEvent;

      if(translationY >= 80){
        this.setState({ unitInUse: ''})

        closed = true            
      }

      Animated.timing(this.translateY,{
          toValue: closed? 0 : 235,
          duration: 200,
          useNativeDriver: false
      }).start(()=>{
          value = closed ? 0 : 235
          this.translateY.setValue(value)
      })
  }
}

render(){
    return(
      <View style={{height:'100%', width: '100%', backgroundColor: '#fff'}}>
          <View style={{height: '100%'}}>
            <Animated.View style={{height: this.translateY.interpolate({
                inputRange: [0, 235],
                outputRange: [(height-90-80) , (height-90-215-80)],
                extrapolate:'clamp'
            })}}>
                <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
                    {Object.keys(this.props.unitName).map(e=>(
                        <TouchableWithoutFeedback key={e}  onPress={() => {this.setState({value: 0, unitInUse: e})
                                                                            this.openKeyboard()}}>
                        <View style={[styles.container, 
                            this.state.unitInUse === e ? 
                            {backgroundColor:'rgba(164, 193, 247,0.4)'}:
                            {backgroundColor: 'rgba(0,0,0,0)'}]}>
                            <View style={styles.textContainer}>
                                <View style={{width:'100%'}}>
                                    <Text style={styles.bigText}>{e}</Text>
                                </View>
                                <View style={{width:'100%'}}>
                                    <Text style={styles.smallText}>{this.props.unitName[e]}</Text>
                                </View>
                            </View>
                            <View style={styles.content}>
                                <Text style={{textAlign: 'right', fontSize: 20}}>
                                    {this.state.unit[e] || 0}
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    ))}
                </ScrollView>
              </Animated.View>
              <PanGestureHandler
                onGestureEvent={e=> this.translateY.setValue(235 - e.nativeEvent.translationY)}
                onHandlerStateChange={this.onHandlerStateChange}>
                  <Animated.View style={[styles.animView, {
                   transform:[{
                    translateY: this.translateY.interpolate({
                      inputRange:[ 0, 235, 500],
                      outputRange:[ 0, -235, -245],
                      extrapolate: 'clamp'
                    })
                }]}
                    ]}>
                  <View>
                      <Keyboard 
                      updateValue={this.updateValue} 
                      value={this.state.value} 
                      close={this.closeKeyboard} 
                      />
                  </View>
                </Animated.View>
              </PanGestureHandler>
              <View style={styles.ad}>
                  <Text>Propaganda</Text>
                </View>
          </View>
        </View>
    )
}
}

const styles = StyleSheet.create({
wrapper:{
  width: '90%',
  alignSelf: 'center',
  backgroundColor: '#fff'
},

container:{
  width: '100%',
  flexDirection: 'row',
  flexWrap: 'wrap', 
  justifyContent: 'center',
  marginTop:5,
  borderBottomWidth: 1,
  borderColor: 'rgba(211, 211, 211, 0.4)',
  borderRadius: 5,
  borderRightWidth:1,
  paddingVertical: 5
},

textContainer:{
  width: '30%',
},  

content:{
  width: '70%',
  padding:6
  },

  bigText:{
    fontSize: 20,
    paddingLeft:2
  },

  smallText:{
    fontSize: 11,
    color: 'rgba(190,190,190, 1)',
    paddingLeft:2
  },

  ad: {
    position:'absolute', 
    bottom: 0, 
    width: '100%', 
    height:80, 
    backgroundColor: 'rgba(207, 207, 207, 1)',
    alignItems:'center',
    justifyContent: 'flex-start',
    zIndex: 10
  },

  animView:{
    position:'absolute', 
    bottom: (-235+80), 
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    zIndex: 5,

  }
})


export default Template
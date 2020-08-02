import React, { Component } from 'react'
import { Text, View , Animated} from 'react-native'
import { PanGestureHandler , State } from 'react-native-gesture-handler'

export default class Teste extends Component {
    translateY = new Animated.Value(0)

    animatedEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationY: this.translateY
                }
            }
        ],
        {useNativeDriver: true}
    )

    offset = 0

    onHandlerStateChange = (event) => {
        if(event.nativeEvent.oldState === State.ACTIVE){
            let opened = false
            const {translationY} = event.nativeEvent;

            this.offset += translationY

            if(translationY >= 80){
                opened = true            
            }

            Animated.timing(this.translateY,{
                toValue: opened? 240 : 0,
                duration: 200,
                useNativeDriver: true
            }).start(()=>{
                this.offset = opened ? 240 : 0
                this.translateY.setOffset(this.offset)
                this.translateY.setValue(0)
            })
        }
    }

    render() {
        return (
            
            <View style={{flex:1, backgroundColor: '#333', alignItems:'center'}}>
                <PanGestureHandler 
                onGestureEvent={this.animatedEvent}
                onHandlerStateChange={this.onHandlerStateChange}
                >
                    <Animated.View 
                    style={[{position:'absolute', height:215, width:'80%', bottom:80, backgroundColor:'#FFF'
                    , borderRadius: 50,
                    transform:[{
                        translateY: this.translateY.interpolate({
                            inputRange:[-400, 0, 240],
                            outputRange:[-30 , 0, 240],
                            extrapolate: 'clamp'
                        })
                    }]}
                    ]}></Animated.View>
                </PanGestureHandler>
            </View>
            
        )
    }
}

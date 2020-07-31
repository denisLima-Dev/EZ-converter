import React from 'react'
import {View} from 'react-native'
import { unitConvert , unitName } from './units'
import Template from '../template'

export default function Area (){
    return(
        <View style={{height: '100%', width:'100%'}}>
            <Template unitConvert={unitConvert} unitName={unitName} />
        </View>
    )
}
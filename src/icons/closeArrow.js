import Svg, {Path, Defs, G, Use} from 'react-native-svg'
import React from 'react'

const CloseArrow = () =>

 {
    return(
        <Svg  width="14" height="5">
            <Defs>
            <Path d="M 0 0 L 7 5 L 14 0" id="d1lOTsLEZ9">
            </Path>
        </Defs>
        <G>
            <G>
            <G>
            <Use href="#d1lOTsLEZ9" opacity="1" fillOpacity="0" stroke="#ffffff" strokeWidth="1" strokeOpacity="1">
            </Use>
        </G>
        </G>
        </G>
        </Svg>


    )
}

export default CloseArrow
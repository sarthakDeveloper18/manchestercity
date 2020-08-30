import React from 'react';
import Zoom from 'react-reveal/Zoom';
import jersey from '../../../resources/images/jersey.jpg'

class PromotionAnimation extends React.Component {
    state = {  }
    render() { 
        return ( 
            <div className = 'promotion_animation'>
                <div className = 'left'>
                    <Zoom>
                        <div>
                            <span>Win A</span>
                            <span>Jersey</span>
                        </div>
                    </Zoom>
                </div>
                <div className = 'right'>
                    <Zoom>
                        <div style = {{background: `url(${jersey}) no-repeat`}}></div>
                    </Zoom>
                </div>
            </div>
        );
    }
}
 
export default PromotionAnimation;
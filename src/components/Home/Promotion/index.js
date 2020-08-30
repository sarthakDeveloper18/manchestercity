import React from 'react';
import PromotionAnimation from './PromotionAnimation';
import Enroll from './enroll';

const Promotion = () => {
    return ( 
        <div className = 'promotion_wrapper' style = {{background: `white`}}>
            <div className = 'container'>
                <PromotionAnimation/>
                <Enroll/>
            </div>
        </div>
    );
}
 
export default Promotion;
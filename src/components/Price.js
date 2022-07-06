import React, { Component, createRef } from 'react';
import  styles from '../styles/price.module.css';
import {TimelineLite, Linear, Power3} from 'gsap'



class Price extends Component {

    constructor(props){
        super(props)
        this.price = createRef()
    }
    
    calculate(){
        var weekday_rate = 100;
        var weekend_rate = 150;
        var day = this.props.date.getDay()
        console.log(this.props.date.getDay())

        //if the date received is either a saturday or a sunday, use the weekend rate
        if(day === 5 || day === 6 ){
            return this.props.hours * weekend_rate
        }else{
            return this.props.hours * weekday_rate
        }

    }

    async componentDidMount(){

        //smooth animation to showcase the price
        await this.price.current

        var tl = new TimelineLite()

        tl.from(this.price.current, .5, { height: 0, ease:Linear.easeInOut})
        .from(this.price.current, .5, { opacity:0, ease:Power3.easeInOut})

    }


    render(){
        return (
            <div className={styles.price} ref = {this.price}>
                <p>TOTAL PRICE</p>
                <h3>${this.calculate()}</h3>
                <button>Make a booking?</button>
            </div>
        );
    }
}

export default Price;

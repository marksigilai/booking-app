import React, { Component} from 'react';
import  '../styles/App.css';
import Price from '../components/Price'
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import {setHours, setMinutes} from "date-fns";
import '../styles/booking.css';



class Booking extends Component{

    constructor(props){
        super(props)
        

        this.state = {
            date : new Date(),
            hours: null,
            submit : false,
            valid: false,
            dateSelected: false
        }
    }

    handleSubmit(event){
        event.preventDefault()
        //allow submission only if data is valid and also not empty
        if(this.state.valid && this.state.dateSelected){
            this.setState({submit:true})
        }    
    }


    myChangeHandler = (event) => {
        //updates state variables when input fields are updated
        let nam = event.target.name;
        let val = event.target.value;

        this.setState({[nam]: val},() => {
            this.validate()
        }) 
    }

    validate = () =>{
        //validate hours by checking if it is an integer above 0
        if(this.state.hours){
            var re = /^[1-9]\d*$/
            var hours = document.getElementById('hours')
            if(re.test(this.state.hours)){
                this.setState({valid : true}, () => {console.log("validity is " + this.state.valid)});
                hours.style = 'border: 2px solid black'
            }else{
                this.setState({valid : false}, () => {console.log("validity is " + this.state.valid)});
                hours.style = 'border: 2px solid red'
            }
        }           
    }

    
    render(){
        return (
            <div className="booking" ref = {this.booking}>
                <h1>Get a quote</h1>
                <form onSubmit={(event) => {this.handleSubmit(event)}} autoComplete='off'>
                    <div className='date_container'>
                        <label for=''>What <span>date</span> would you like to book?</label>

                        <DatePicker
                            selected={this.state.dateSelected ? this.state.date : ''} 
                            onChange={d => this.setState({date : d, dateSelected : true})}
                            showTimeSelect
                            minDate={new Date()}
                            //if the day chosen is today, only display times after the current time
                            minTime= { this.state.date.toDateString() === new Date().toDateString() ?  new Date() : setHours(setMinutes(new Date(), 0), 0)}
                            maxTime={ setHours(setMinutes(new Date(), 45), 23)}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            placeholderText="Select date and time"
                        />
                    </div>
                    
                    <div className='hours_container'>
                        <label for=''>...and for how many <span>hours</span>?</label>

                        <input type = "number" name = 'hours' id='hours' onChange={(e) => this.myChangeHandler(e)}/>
                    </div>

                    <button class = 'submit' type = "submit">
                        <p>Submit</p>
                        <i className="material-icons" id = "arrow_f">arrow_forward</i>
                    </button>

                </form>

                {this.state.submit && this.state.valid && <Price date={this.state.date} hours={this.state.hours}/>}
                
            </div>
            
            

        );
    }
}

export default Booking;

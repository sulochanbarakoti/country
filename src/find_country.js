import axios from 'axios'
import { useEffect, useState } from 'react';

const Find_country = () => {

    const [countries, setCountries] = useState([])
    const [filterCountry, setFilterCountry] = useState(countries)
    const [tooMany, setTooMany] = useState('')
    const [showAndHide, setShowAndHide] = useState(true)

    useEffect(()=>{
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(res=>{
                setCountries(res.data)
            })
    },[])

    const findCountryHandler = (event) => {
        let value = event.target.value.toLowerCase()
        let result = []
        if (value) {
            result = countries.filter(item=>{
                return item.name.common.match(value)
            })
        }

        if (result.length > 10) {
            setTooMany('Too many matches, specify another filter')
            setShowAndHide(true)
        }
        
        if (result.length < 10) {
            setFilterCountry(result)
            setTooMany('')
            setShowAndHide(true)
        } 
        if (result.length == 1){
            setFilterCountry(result)
            setShowAndHide(false)
        }
    }

    const buttonClickedHandler = (props) => {
        setFilterCountry([props])
        setShowAndHide(false)
    }


    return ( 
        <div>
            <div>find countries:</div> <input onChange={findCountryHandler}></input>

            <div>{showAndHide ? 
            <ul>
                {filterCountry.map((item,index)=>
                <li key={index}>{item.name.common}<button onClick={()=>buttonClickedHandler(item)}>show</button></li>
                )}
            </ul> : 
            <div>
                <h1>{filterCountry[0].name.common}</h1>
                <div>{filterCountry[0].capital}</div>
                <div>area {filterCountry[0].area}</div>
                <h2>Languages:</h2>
                <ul>
                    {Object.values(filterCountry[0].languages).map((item,index)=>
                        <li key={index}>{item}{console.log(item)}</li>
                    )}
                </ul>
                <img src={filterCountry[0].flags.png} alt="country flag"></img>

            </div>
            }</div>
            <div>{tooMany}</div>
        </div>
     );
}

export default Find_country;
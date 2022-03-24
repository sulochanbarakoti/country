import axios from 'axios'
import { useEffect, useState } from 'react';

const Find_country = () => {

    const [country, setCountry] = useState([])
    const [filterCountry, setFilterCountry] = useState(country)

    useEffect(()=>{
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(res=>{
                setCountry(res.data)
            })
    },[])

    const findCountryHandler = (event) => {
        let value = event.target.value.toLowerCase()
        let result = []
        result = country.filter(item=>{
            return item.name.common.match(value)
        })
        setFilterCountry(result)
    }

    return ( 
        <div>
            <div>find countries:</div> <input onChange={findCountryHandler}></input>
            <ul>
                {filterCountry.map((item,index)=>
                <li key={index}>{item.name.common}</li>
                )}
            </ul>
        </div>
     );
}

export default Find_country;


    // const displayData = search === '' ? country : country.filter(item => item.match(search))

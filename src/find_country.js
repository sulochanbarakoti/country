import axios from 'axios'
import { useEffect, useState } from 'react';

const Find_country = () => {

    const [country, setCountry] = useState([])
    const [search, setSearch] = useState('')

    useEffect(()=>{
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(res=>{
                setCountry(res.data)
            })
    },[])

    const findCountryHandler = (event) => {
        setSearch(event.target.value)
    }

       console.log(country)

    return ( 
        <div>
            <div>find countries: <input onChange={findCountryHandler}></input> </div>
            <ul>
                {country.map(item=>{
                    <li>{item.name.common}</li>
                })}
            </ul>
        </div>
     );
}

export default Find_country;


    // const displayData = search === '' ? country : country.filter(item => item.match(search))

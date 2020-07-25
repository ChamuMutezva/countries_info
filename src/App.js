import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function App() {
  const [countries, setCountries] = useState([])
  const [searchItem, setSearchItem] = useState("")
  let greaterThanTen = false;
  let greaterThanOne = false;
  let equalToOne = false;
  useEffect(() => {
    console.log("useEffect in action");
    axios.get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        console.log("promise fullfilled");
        setCountries(response.data)
        //console.log(countries)
      })
    //console.log(countries);
  }, [])
  const handleOnChange = (event) => {
    console.log(event.target.value)
    setSearchItem(event.target.value)
  }


  const listCountries = countries.map(country => country.name.toLocaleLowerCase())
  console.log(listCountries)
  const filterCountries = listCountries.filter(country => {
    console.log(country, searchItem)
    return country.includes(searchItem.toLocaleLowerCase())
  })
  console.log(filterCountries)
  const displayItems = filterCountries.map((country, idx) => <h3 key={idx}>{country}</h3>)

  console.log(displayItems.length)
  if (filterCountries.length > 10) {
    greaterThanTen = true
  } else if (filterCountries.length > 1) {
    greaterThanOne = true
  } else if (filterCountries.length === 1) {
    equalToOne = true
  }
  const details = () => {
    if (greaterThanTen) {
     return <h3>Too many mathces specify another filter</h3>
    } else if (greaterThanOne) {
      return displayItems
    } else if (equalToOne) {
      return displayItems
    }
  }



  // console.log(listCountries)
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello Chamu</h1>

        <div>
          <label>
            Find countries
          <input type="search" onChange={handleOnChange} />
          </label>
          <h3>{searchItem}</h3>
        </div>
        <div>
         
            {details()}
          

         
        </div>
      </header>
    </div >
  );
}

export default App;

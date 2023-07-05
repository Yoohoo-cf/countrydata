import React, {useState, useEffect} from 'react';
import countryService from './services/countries';
import Country from './component/Country';

export default function App() {

  const [ countries, setCountries ] = useState([]);
  const [ searchQuery, setSearchQuery ] = useState('');
  const [loading, setLoading] = useState(true);
  const [ error, setError ] = useState(false);

  useEffect(() => {
    countryService
    .getAll()
    .then((data)=> {
      setCountries(data)
      setLoading(false);
    })
    .catch((error) => 
    setError(error))
  }, [])

  const getFilteredCountries = countries.filter(country => 
    country.name.common && country.name.common.toLowerCase().includes
    (searchQuery.toLowerCase())
  )

  const handleClick = (name) => {
      countryService
      .getSingle(name)
      .then((data) => {
        setCountries(data)
      })
      .catch((error) => {
        setError('Error...')
      })
    }


  return (
    <>
      <article>
        <form className="form">
          <div className="form-control">
            <label>Find countries: </label>
            <input value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)} />
          </div>
        </form>
        <div className="showInfo">
          {loading ? (
            <p>Loading...</p>
          ) : getFilteredCountries.length > 10 ? (
            <p>Too many matches, specify another filter</p>
          ) : getFilteredCountries.length > 1 ? (
            getFilteredCountries.map((country) => (
              <div className='country_name' key={country.cca3}> 
              {country.name.common}
              <button className='btn' style={{backgroundColor: 'lightblue', color:'white' }}
              onClick={() => handleClick(country.name.common)}>
                Show
                </button>
              </div>
            ))
          ) : getFilteredCountries.map((country) => (
            <div key={country.name}>
              <Country country={country}/>
            </div>
          ))
          }
        </div>
      </article> 
    </>
  )
}

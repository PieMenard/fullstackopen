
import Country from "./Country";

const RenderCountries = ({ countries, search, setCountriesToShow}) => {
    if (search == '')
        return (
            <div>Please enter a query on box</div>
        )

    if (countries.length === 0)
        return (
            <div>No matches</div>
        )
    else if (countries.length > 10)
        return (
            <div>Too many matches, especify search</div>
        )
    else if ((countries.length < 10) && (countries.length > 2))
        return (
            <div>
            { countries.map(country => 
                        <div key={country.name.common}>
                        <Country key={country.cca3} country={country} toggleDisplay = {false} setCountriesToShow = {setCountriesToShow}/>
                        
                        </div>
            )}
            </div>
        )
    else if (countries.length == 1)
        return (
            <div>
            { <Country key={countries[0].name.common} country={countries[0]} toggleDisplay = {true} />
        }
        </div>
    )

  }
  
  export default RenderCountries
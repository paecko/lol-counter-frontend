import React from 'react'

const Search = ({ searchText, setSearchText, setDisplayChampions, champions }) => {

    const filterChampions = (event) => {
        setSearchText(event.target.value)
        if (event.target.value !== '') {
          const filteredChampions = champions.filter(champ => champ.name.toLowerCase().startsWith(event.target.value.toLowerCase()))
          setDisplayChampions(filteredChampions)
        } else {
          setDisplayChampions(champions)
        }
      }

    return (
        <form>
            <input style={{borderRadius:10, height:25, width:200, border:'4px solid #4F485D', backgroundColor:'#2A1355'}} 
            type='text' value={searchText} onChange={filterChampions} placeholder='Search Champions'></input>
        </form> 
    )
}

export default Search
import React, {useState} from 'react'
import Search from './Search'
import winRatesService from '../services/winRatesService'
import { Paper, ImageList, ImageListItem } from '@material-ui/core'
import { removeChamp } from './ChampionNav'
import '../css/hover.css'
import '../css/myClasses.css'

const addSelectChampion = async (event, champions, selectedChampions, setSelectedChampions, currentWinMap, 
  setCurrentWinMap, individualWinMaps, setIndividualWinMaps) => {
  // looking for clicked champ in all champions state
  const championObject = champions.filter(champion => champion.name === event.target.value)
  const extractChamp = championObject[0]
  // create object for it
  const addChamp = {name:extractChamp.name, image:extractChamp.image, championId:extractChamp.championId}
  // checking it hasn't been selected before and adding it to selectedChamps if not.
  const alreadySelected = selectedChampions.filter(champ => champ.name === addChamp.name)
  
  if (alreadySelected.length === 0 && selectedChampions.length < 5){
    let championData = await winRatesService.get(addChamp.name)
    let championWinMap = championData[0].winMap

    if (selectedChampions.length === 0){
      setCurrentWinMap(championWinMap)
    } else if (selectedChampions.length > 0) {
      let newCurrentWinMap = {}
      for (let i = 0; i < championWinMap.length; i++) {
        // for champion being added
        let addPercentage = championWinMap[i].WinRate
        let name = championWinMap[i].championName
        // for champions already added before
        let oldPercentage = currentWinMap[i].WinRate
        
        let oldTotalPercentage = oldPercentage * (selectedChampions.length)
        let newTotalPercentage = oldTotalPercentage + addPercentage
        let newPercentage = newTotalPercentage / (selectedChampions.length + 1)
        newCurrentWinMap[name] = {WinRate:newPercentage, Games:championWinMap[i].Games}
      }
      setCurrentWinMap(currentWinMap.map(item=>({...item, WinRate: newCurrentWinMap[item.championName]['WinRate'], 
        Games: newCurrentWinMap[item.championName]['Games'] + item.Games
        })))
    }
    
    let newIndividualWinMap = {championName:addChamp.name, winMap:championWinMap}
    setIndividualWinMaps(individualWinMaps.concat(newIndividualWinMap))

    setSelectedChampions(selectedChampions.concat(addChamp))
  }
}


const ChampionList = ( {champions, displayChampions, selectedChampions, setSelectedChampions, 
  setCurrentWinMap, currentWinMap, searchText, setSearchText, setDisplayChampions, individualWinMaps, setIndividualWinMaps} ) => {
  
  const selectedChampNames = selectedChampions.map(champ => champ.name)

  const updateSelectedChampions = (event) => {
    event.preventDefault()
    if (selectedChampNames.includes(event.target.value)) {
      removeChamp(event, selectedChampions, setSelectedChampions, currentWinMap, setCurrentWinMap, individualWinMaps, 
        setIndividualWinMaps)
    } else {
      addSelectChampion(event, champions, selectedChampions, setSelectedChampions, currentWinMap, setCurrentWinMap, 
        individualWinMaps, setIndividualWinMaps)
    }
  }

  const [style, setStyle] = useState({style: {display:'none'}, champ:''});

  const renderChampName = (champName) => {
    return (
      <div className='championListName' style={style}>
        {champName}
      </div>
    )
  }

  const renderHoverText = (champName) => {
    let info = ''      
 
    if (selectedChampNames.includes(champName)) {
      info = 'Remove'
    } else {
      info = 'Add Enemy'
    }

    return (
      <div className='championListName' style={style}>
        {info}
      </div>
    )
  }

  return (
    <div style={{marginTop:100, marginLeft:100}}>
        <Search searchText={searchText} setSearchText={setSearchText} setDisplayChampions={setDisplayChampions} 
          champions={champions}/>
      <Paper id='style-1' style={{ maxHeight: 800, maxWidth:200, overflow: 'auto',
        backgroundColor:'#130E1F', borderRadius: 20}}>
      <ImageList cols={1} rowHeight={90} style={{paddingTop:10, position:'center'}}>  
        {displayChampions.map(champion =>
          <ImageListItem key={champion.name} >
            <form onSubmit={updateSelectedChampions} >

              <div className={`hvr-grow-shadow ${selectedChampNames.includes(champion.name) ? 'opacitySelectedChamps' : ''}`}
                
                  style={{position:'relative', textAlign:'center', marginLeft:40}}
                  onMouseEnter={e => {
                    setStyle({style: {display:'block'}, champ:champion.name});
                    }}
                    onMouseLeave={e => {
                    setStyle({style: {display:'none'}, champ:''})
                    }}
              >

              <input style={{width:'auto', height:'auto'}}
                type='image' src={process.env.PUBLIC_URL + '/assets/images/' + champion.image} 
                    alt={champion.name} value={champion.name} onClick={updateSelectedChampions}
                     />
                    
                  {style.champ === champion.name ? renderHoverText(champion.name) : renderChampName(champion.name)}
              </div>
            </form>

          </ImageListItem>
        )}
      </ImageList>

    </Paper>
    </div>
  )

}

export default ChampionList
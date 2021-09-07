import View from 'react-flexbox'
import React from 'react'
import winRatesService from '../services/winRatesService'
import '../css/hover.css'
import '../css/myClasses.css'

const removeChamp = async (event, selectedChampions, setSelectedChampions, currentWinMap, setCurrentWinMap, 
  individualWinMaps, setIndividualWinMaps) => {
  const updatedChamps = selectedChampions.filter(champ => champ.name !== event.target.value)

  if (selectedChampions.length === 1) {
    setCurrentWinMap([])
  }
  else {
    let championData = await winRatesService.get(event.target.value)
    let championWinMap = championData[0].winMap
    let newCurrentWinMap = {}

    for (let i = 0; i < championWinMap.length; i++) {
      // for champion being added
      let removePercentage = championWinMap[i].WinRate
      let name = championWinMap[i].championName
      // for champions already added before
      let oldPercentage = currentWinMap[i].WinRate
      
      let oldTotalPercentage = oldPercentage * (selectedChampions.length)
      let newTotalPercentage = oldTotalPercentage - removePercentage
      let newPercentage = newTotalPercentage / (selectedChampions.length - 1)
      newCurrentWinMap[name] = {WinRate: newPercentage, Games: championWinMap[i].Games}
      
    }
    setCurrentWinMap(currentWinMap.map(item=>({...item, WinRate: newCurrentWinMap[item.championName]['WinRate'],
        Games: item.Games - newCurrentWinMap[item.championName]['Games']
      })))
  }
  const updatedIndividualWinMaps = individualWinMaps.filter(champ => champ.championName !== event.target.value)
  setIndividualWinMaps(updatedIndividualWinMaps)
  setSelectedChampions(updatedChamps)
}



const ChampionNav = ( {selectedChampions, setSelectedChampions, currentWinMap, setCurrentWinMap, individualWinMaps, 
  setIndividualWinMaps, isTeamCounters} ) => {
  
    const removeChampNav = (event) => {
      event.preventDefault()
      removeChamp(event, selectedChampions, setSelectedChampions, currentWinMap, setCurrentWinMap, individualWinMaps, 
        setIndividualWinMaps)
    }
    console.log(isTeamCounters)
    return (
      <div style={{width:'500%'}}>
        {selectedChampions.map(champion =>
          <div className={`${isTeamCounters ? 'navForTeam' : 'navForIndividual'}`} style={{display:'inline-block'}}>
          <input style={{width:'50%', height:'50%'}} type="image" src={process.env.PUBLIC_URL + '/assets/images/' + champion.image}
            alt={champion.name} onClick={removeChampNav} value={champion.name}
            /></div>
             )}
      </div>
    )
  }

export default ChampionNav
export { removeChamp }
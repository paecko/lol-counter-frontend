import React, { useState, useEffect } from 'react'
import championService from './services/champions'
import { Button } from '@material-ui/core'
import './css/hover.css'
import './css/myClasses.css'
import ChampionList from './components/ChampionList'
import ChampionNav from './components/ChampionNav'
import CounterList from './components/CounterList'
import IndividualCounters from './components/IndividualCounters'

// following are from : https://riot-api-libraries.readthedocs.io/en/latest/collectingdata.html
// users: https://canisback.com/leagueId/
// MATCHIDS: https://canisback.com/matchId/

const App = () => { 
  const [champions, setChampions] = useState([])
  const [displayChampions, setDisplaysChampions] = useState([])
  const [searchText, setSearchText] = useState('')
  const [selectedChampions, setSelectedChampions] = useState([])
  const [currentWinMap, setCurrentWinMap] = useState([])
  const [isTeamCounters, setIsTeamCounters] = useState(true)
  const [individualWinMaps, setIndividualWinMaps] = useState([])

  useEffect(() => {
    championService.getAll().then(response => setChampions(response.data))
  }, [])

  useEffect(() => {
    setDisplaysChampions(champions)
  }, [champions])

  useEffect(() => {
    // possible new color: 1b1625, 1b1625
    document.body.style.backgroundColor = '#1b1625'
    document.title = 'League Counter Picker'
  }, [])

  useEffect(() => {
    const parsedSelectChamps = localStorage.getItem("selectedChampions")
    const parsedWinMap = localStorage.getItem("currentWinMap")
    const parsedIndividualWinMaps = localStorage.getItem("individualWinMaps")
    const parsedIsTeamCounters = localStorage.getItem("isTeamCounters")

    // since its stored as a string and when its empty, its just an empty string as []. 
    if (parsedSelectChamps !== '[]' && parsedSelectChamps) {
      console.log('loading saved selected champs')
      const loadSelectChamps = JSON.parse(parsedSelectChamps)
      setSelectedChampions(loadSelectChamps)
    }
    if (parsedWinMap !== '[]' && parsedWinMap) {
      console.log('loading win map')
      const loadWinMap = JSON.parse(parsedWinMap)
      setCurrentWinMap(loadWinMap)
    }
    if (parsedIndividualWinMaps !== '[]' && parsedIndividualWinMaps){
      console.log('loading individual win maps')
      const loadIndividualWinMaps = JSON.parse(parsedIndividualWinMaps)
      setIndividualWinMaps(loadIndividualWinMaps)
    }
    if (parsedIsTeamCounters) {
      console.log('setting mode')
      const loadIsTeamCounters = JSON.parse(parsedIsTeamCounters)
      setIsTeamCounters(loadIsTeamCounters)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("selectedChampions", JSON.stringify(selectedChampions))
  }, [selectedChampions])

  useEffect(() => {
    localStorage.setItem("currentWinMap", JSON.stringify(currentWinMap))
  }, [currentWinMap])

  useEffect(() => {
    localStorage.setItem("individualWinMaps", JSON.stringify(individualWinMaps))
  }, [individualWinMaps])

  useEffect(() => {
    localStorage.setItem("isTeamCounters", JSON.stringify(isTeamCounters))
  }, [isTeamCounters])

  const clearSelectChampions = () => {
    setSelectedChampions([])
    setCurrentWinMap([])
    setIndividualWinMaps([])
  }
  
  const changeMode = () => {
    setIsTeamCounters(!isTeamCounters)
  }

  const renderCounters = () => {
    return (
      <div>
        {isTeamCounters ? <CounterList currentWinMap={currentWinMap} selectedChampions={selectedChampions}/> : 
          <IndividualCounters individualWinMaps={individualWinMaps}/>}
      </div>
    )
  }
  
  const renderInstructions = () => {
    return (
      <div style={{position:'absolute', left:550, top:100 }}>
        <div style={{color:'#c1b4d8', fontFamily:'Avenir'}}>
          <pre style={{fontFamily:'Avenir'}}>{`
  Choose enemy champions from the list on the left. 

  You can remove champions either from the main list 
  or from the selected shown at the top.
          `}
          </pre>
          <h1>About LolCounter</h1>

          <pre style={{fontFamily:'Avenir'}}>{`
  This is a counter picker web application for League of Legends. 
  It shows the winrates of champions against another champion or a team.
  
  It is designed to be a single page app so that you can quickly see the result 
  without having to reload or navigate through many pages


          `}
          </pre>     
        </div>      
      </div>
    )
  }

  return (
    <div style={{ float:'left', position:'relative' }}>
      <div style={{ float:'left', paddingTop:10, paddingLeft:100}}>
        <ChampionList champions={champions} selectedChampions={selectedChampions} setSelectedChampions={setSelectedChampions}
          setCurrentWinMap={setCurrentWinMap} currentWinMap={currentWinMap} displayChampions={displayChampions}
          searchText={searchText} setSearchText={setSearchText} setDisplayChampions={setDisplaysChampions}
          individualWinMaps={individualWinMaps} setIndividualWinMaps={setIndividualWinMaps}
        />
      </div>

      <div style={{float:'left', paddingLeft:70, paddingTop:60}}>
        <div>
          <Button variant="contained" color="primary" onClick={clearSelectChampions}
                style={{width:'auto', height:'auto', whiteSpace:'nowrap', display:'inlineBlock'}}>
                Clear All
            </Button>
            <Button variant="contained" color="primary" onClick={changeMode}
                style={{width:'auto', height:'auto', whiteSpace:'nowrap', display:'inlineBlock',  marginLeft:10}}>
                  {isTeamCounters ? 'Enable Individal Counters': 'Enable Team Counters'}
            </Button>
        </div>

        <div style={{marginTop:10, minWidth:500, maxWidth:500}}>
          {selectedChampions.length > 0 ? <ChampionNav selectedChampions={selectedChampions} setSelectedChampions={setSelectedChampions} 
              currentWinMap={currentWinMap} setCurrentWinMap={setCurrentWinMap} individualWinMaps={individualWinMaps} 
              setIndividualWinMaps={setIndividualWinMaps} isTeamCounters={isTeamCounters}
              /> : renderInstructions()}
        </div>
        <div style={{minWidth:400, maxWidth:400, marginTop:10}}>
          {currentWinMap.length > 0 ? renderCounters(): ''}
        </div>
      </div>
    </div>
  )

}


export default App;

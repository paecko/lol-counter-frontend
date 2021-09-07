import React from 'react'
import { Paper, ImageList, ImageListItem } from '@material-ui/core'
import '../css/hover.css'
import '../css/myClasses.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const CounterList = ( {currentWinMap, selectedChampions}) => {  
    //let winMap = currentWinMap
    //const championsToDisplay = []
    let winMap = JSON.parse(JSON.stringify(currentWinMap))
    const selectedChampionsNames = selectedChampions.map(champ => champ.name)
    winMap = winMap.filter(obj => !selectedChampionsNames.includes(obj.championName))
    // gives loss rate against champs. so our selected champs display champs with lowest winrate. not sure about this tho.
    winMap.map(obj => obj.WinRate = 100 - obj.WinRate)
    winMap.sort((firstObj, secondObj) => secondObj.WinRate - firstObj.WinRate)

    return (
      <TableContainer style={{ width:'100%', backgroundColor:'#28252F', paddingLeft:'10%', paddingRight:'10%', overflow:'auto', 
          maxHeight:800, maxWidth:800, minWidth:500, position:'relative', borderRadius:10 }}
        component={Paper} id='style-1'>
        <Table style={{borderCollapse:'collapse'}}>
          <TableHead>
            <TableRow>
              <TableCell class='counterListHeaderText'>Champion</TableCell>
              <TableCell class='counterListHeaderText'>WinRate</TableCell>
              <TableCell class='counterListHeaderText'>Games</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {winMap.map((champ, index) => (
              <TableRow className={`${index % 2 === 0 ? '' : 'oddRow'}`} key={champ.championName}>
                <TableCell class='counterListCellText'
                style={{paddingTop:'4%', paddingLeft:'30%', display:'inline-block'}} component="th" scope="row">
                  <div style={{position:'absolute'}}>
                    <img style={{ width:'25%', height:'20%', float:'left'}} 
                  src={process.env.PUBLIC_URL + '/assets/images/' + champ.championName + '.png'}></img>
                    <p style={{position:'absolute', marginLeft:'30%'}}>{champ.championName}</p>
                  </div>

                </TableCell>
                <TableCell class='counterListCellText' style={{textAlign:'center'}}>{champ.WinRate.toFixed(1)}</TableCell>
                <TableCell class='counterListCellText' style={{textAlign:'center'}}>{champ.Games}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )

    /**
     *       <Paper id='style-1' style={{ maxHeight: 800, maxWidth: 200, overflow: 'auto', marginTop:100, marginLeft:100, backgroundColor:'transparent'}}>
        <ImageList cols={1} rowHeight={150}>
          {winMap.map(champion =>
            <div key={champion.championName}>
              <img src={process.env.PUBLIC_URL + '/assets/images/' + champion.championName + '.png'}></img>
            </div>
            )}
        </ImageList>
      </Paper>
     */
  }

export default CounterList
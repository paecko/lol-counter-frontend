import React from 'react'
import '../css/hover.css'
import '../css/myClasses.css'

const IndividualCounters = ( {individualWinMaps} ) => {
    let winMaps = JSON.parse(JSON.stringify(individualWinMaps))
    for (let i = 0; i < winMaps.length; i++) {
        let obj = winMaps[i]
        let winMap = obj.winMap
        let championName = obj.championName
        
        winMap = winMap.filter(currentObj => currentObj.championName != championName)
        winMap.map(obj => obj.WinRate = 100 - obj.WinRate)
        winMap.sort((firstObj, secondObj) => secondObj.WinRate - firstObj.WinRate)
        winMaps[i].winMap = winMap
    }
    console.log(winMaps)

    return (
        <div style={{minWidth:'400%', maxWidth:'400%'}}>
            {winMaps.map(map =>
                    <table style={{float:'left', border:'1px solid black', backgroundColor:'#28252F', 
               borderRadius:10}}>
                   <div id='style-1' style={{overflowX:'hidden', overflowY:'scroll',  minHeight:800, maxHeight:800, maxWidth:150, minWidth:150}}>

                    {map.winMap.map((champ, index) =>
                        <tr>
                       
                            <div className={`${index % 2 === 0 ? '' : 'oddRow'}`} style={{width:'200%'}}>
                            <td style={{display:'inline-block', height:'auto', width:'auto'}}>
                                <div>
                                <img style={{width:'25%', height:'20%', float:'left'}}
                                src={process.env.PUBLIC_URL + '/assets/images/' + champ.championName + '.png'}></img>
                                <div style={{color:'#bda7da', fontSize:'12px', 
                                position:'relative', marginLeft:'30%', paddingTop:'5%'}}>{champ.championName}</div>
                                </div>
                            </td>

                            
                            </div>

                        </tr>
                        )}
                        </div>
                </table>

            )}
                
        </div>

    )
}

export default IndividualCounters
import DatamapsIndia from 'react-datamaps-india'
import data from '../utils/state-wise-cases.json'

function IndiaMap() {

    const obj: any = {}
    for(var i = 0; i < data.length; i++) {
        obj[data[i].states] = {value: data[i][2021]}
    }
    return(
        <div className='map-graph'>
            <DatamapsIndia
                regionData={obj}
                hoverComponent={({ value }: {value: any}) => {
                    return (
                    <>
                        <p>{value.name}</p>
                        <p>{value.value}</p>
                    </>
                    )
                }}
                mapLayout={{
                    title: '',
                    legendTitle: 'Cases',
                    startColor: '#FFDAB9',
                    endColor: '#FF6347',
                    hoverTitle: 'Count',
                    noDataColor: '#f5f5f5',
                    borderColor: '#8D8D8D',
                    hoverBorderColor: '#8D8D8D',
                    hoverColor: 'green',
                }}
            />
        </div>
    )
}

export default IndiaMap
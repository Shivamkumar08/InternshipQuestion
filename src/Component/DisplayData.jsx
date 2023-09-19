import React, { useEffect, useState } from 'react'
import './style.css'

const Card = ({ id, name, image_url, tagline }) => {
    return (
        <>
            <div class="card" key={id}>
                <div class="card-content">
                    <img src={image_url} alt="Image Alt Text" height={100} width={100} />
                    <div class="card-header">
                        {name}
                    </div>
                    <p>{tagline}</p>
                </div>
            </div>
        </>
    )
}
const DisplayData = () => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState('    ')
    const URL = "https://api.punkapi.com/v2/beers";
    const fetchApi = async () => {
        try {
            const response = await fetch(URL);
            if (response.status === 200) {
                const data = await response.json()
                setData(data)
                console.log(data)
            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchApi()
    }, [])
    const valueHandler = (e) => {
        setValue(e.target.value)
    }
    const handleSearch = () => {
        // const searchedData = data.filter(({ name }) => name.toLowerCase() === value.toLowerCase())
        const searchedData = data.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()))
        setData(searchedData);
    }
    return (
        <>
            <input placeholder='search' onChange={valueHandler} style={{ padding: '10px 20px', width: '300px', marginLeft: '400px', marginTop: '20px', marginBottom: '20px' }} />
            <button onClick={handleSearch} style={{ padding: '10px 20px', width: '100px', margin: 'auto' }}>Search</button>
            {data.length > 0 ? (<><div className="container">
                {data.map(({ id, name, image_url, tagline }) => {
                    return (
                        <Card id={id} name={name} image_url={image_url} tagline={tagline} />
                    )
                })}
            </div></>) : (<h2 h2 style={{ marginLeft: '500px' }}>Opps Nothing found</h2>)}


        </>
    )
}

export default DisplayData
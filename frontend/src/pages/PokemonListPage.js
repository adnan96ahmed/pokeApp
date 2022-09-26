import React, { useState, useEffect } from 'react'
import './PokemonListPage.css'

const PokemonListPage = () => {

    let [pokemon, setPokemon] = useState([])
    let [showingMyPokemon, setShowingMyPokemon] = useState(false)

    useEffect(() => {
        getNewPokemon()
    }, [])

    let getNewPokemon = async () => {
        let pokemonList = [];
        for (let i = 1; i < 21; i++) {
            let pokemonId = Math.floor(Math.random() * 900)
            const fetchURL = 'https://pokeapi.co/api/v2/pokemon/' + pokemonId.toString();
            const response = await fetch(fetchURL)
            let data = await response.json()
            let pokeTypes = []
            for (const type of data.types) {
                pokeTypes.push(type.type.name)
            }

            const pokemonObj = {
                id: data.id,
                name: data.name,
                types: pokeTypes,
                image_url: data.sprites.front_default
            }
            pokemonList.push(pokemonObj)
        }
        setPokemon(pokemonList)
        setShowingMyPokemon(false)
    }

    let getMyPokemon = async () => {
        let response = await fetch('/api/pokemon/')
        let data = await response.json()
        setPokemon(data)
        setShowingMyPokemon(true)
    }

    let addPokemon = async (pokemonToAdd) => {
        fetch('/api/pokemon/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pokemonToAdd)
        })
    }

    return (
        <React.Fragment>
            <div className='ToggleButton'>
                {showingMyPokemon ? (
                    <button onClick={getNewPokemon}>Find New Pokemon</button>
                ) : (
                    <button onClick={getMyPokemon}>Show My Pokemon</button>
                )}
            </div>
            <div className="PokemonList">
                <table>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Types</th>
                        {!showingMyPokemon && <th>Save to DB?</th>}
                    </tr>
                    {pokemon.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td><img src={val.image_url} /></td>
                                <td>{val.name}</td>
                                <td>{val.types.join(', ')}</td>
                                {!showingMyPokemon && <td><button onClick={() => addPokemon(val)}>Save</button></td>}
                            </tr>
                        )
                    })}
                </table>
            </div>
        </React.Fragment>
    )
}

export default PokemonListPage

import React, { useState, useEffect } from 'react';
import api from './services/api';

import Header from './components/header';

import './App.css';


/**Component -> Usando quando algo é repetido na interface
 * Propriedade -> PROPSSSSS
 * Estado e imutabilidade -> state bb
 */

export default function App()
{
    const [projects, setProjects] = useState([]);
    //useState retorna um array

    //array de dependencias
    useEffect(() => {
        api.get('/express').then(response => {
            setProjects(response.data)
        })
    }, [ ]);

    

    async function handleAddProject()
    {
        const response = await api.post('/express/insert', 
        {
            Title: `New project ${Date.now()}`,
            Owner: "Giovanni Nespoli"
        })
        console.log(response.data)
        setProjects([...projects , response.data])
        
    };

    

    return(
        <> 
            <Header title="homepage" />

            <ul>
                {projects.map(proj => 
                    <li key={proj.id}>{proj.Title}</li>
                )}
            </ul>

            <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
        
        </>
    );
}
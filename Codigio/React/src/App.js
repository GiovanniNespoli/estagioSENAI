import React, {useState} from 'react';
import Header from './components/header';
import './App.css';
import gato from './assets/gato.jpeg'

/**Component -> Usando quando algo é repetido na interface
 * Propriedade -> PROPSSSSS
 * Estado e imutabilidade -> state bb
 */

export default function App()
{
    const [projects, setProjects] = useState(['DEV', 'Estudo']);
    //useState retorna um array

    function handleAddProject()
    {
        setProjects([...projects, `New Project ${Date.now()}`]);
        console.log(projects)
    };

    return(
        <> 
            <Header title="homepage" />

            <ul>
                {projects.map(x => <li key={x}>{x}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
        </>
    );
}
import React, {FormEvent, useState, useEffect} from "react";
import { FiChevronRight } from 'react-icons/fi';
import { Link } from "react-router-dom";
import api from "../../services/api";

import logo from '../../assets/logo.svg';
import { Title, Form, Repositories, Error } from './styles'

interface Repository{
    full_name : string;
    description : string;
    owner: {
        login: string;
        avatar_url: string;
    }
}
/**
 * Arrow function ajuda na tipagem 
 * FC -> Function component
 */
const Dashboard : React.FC = () => 
{
    
    const [newRepo, setNewRepo] = useState('');
    const [inputError, setInpurError] = useState('');
    /**
     * repositories -> valor do state
     * set -> add no state
     */
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storagedRepositories = localStorage.getItem('@GithubExplorer:repositories');
    
        if(storagedRepositories)
        {
            return JSON.parse(storagedRepositories);
        } else
        {
            return [];
        }
    });
    
    useEffect(() => {
        localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));
    }, [repositories])

    //add um repositorio
    //Precisamos consumir a api do github e dps add no state
    async function handleAddRepository(event : FormEvent<HTMLFormElement>) : Promise<void>
    {
        event.preventDefault();


        if(!newRepo) 
        {
            setInpurError('Digite um repositório!!');
            return;
        }

        try {

            const response = await api.get<Repository>(`repos/${newRepo}`);
            const repository = response.data;

            console.log(repository);

            setRepositories([...repositories, repository]);
            setNewRepo('');
            setInpurError('');

        } catch (err) {
            setInpurError('Erro na busca por esse repositório');
        }
        
    }

    return(
        <>
            <img src={logo} alt="Github Explorer"/>
            <Title>Explore repositorio no GitHub</Title>

            <Form hasError={!! inputError} onSubmit={handleAddRepository}>
                <input 
                    value={newRepo}
                    onChange={(x) => setNewRepo(x.target.value)}
                    placeholder="Digite o nome do repositório"
                />
                <button type="submit">Pesquisar</button>
            </Form>

            { inputError && <Error>{inputError}</Error> }

            <Repositories>
                
                {repositories.map(rep => (
                    <a key={rep.full_name} href={`/repository/${rep.full_name}`}>
                        <img src={rep.owner.avatar_url} alt={rep.owner.login} />

                        <div>
                            <strong>{rep.full_name}</strong>
                            <p>{rep.description}</p>
                        </div>

                        <FiChevronRight size={20}/>
                    </a>
                ))}
                
            </Repositories>
        </>
    )
}

export default Dashboard;
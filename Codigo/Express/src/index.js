
const express = require('express');
const { uuid, isUuid } = require('uuidv4');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

/**
 *  Tipos de parâmetros
 *   
 *  QUERY PARMS : filtros e paginação (GET especifico),
 *  ROUTE PARMS : Identificar os recursos (deletar/atualizar),
 *  REQUEST BODY  : conteudo na criação e edição dos dados (JSON)
 */


/**GET -> buscar uma informação */

const projects = [];

/**Middleware 
 * 
 * seu principal objetivo é interceptar uma requisição e fazer uma validação, assim decidindo
 * se a requisição vai ser feita ou cancelada
*/
function logRequests(request, response, next)
{
    const { method, url} = request;
    const logLabel = `[${method.toUpperCase()}] ${url}`;
    console.time (logLabel);

    next(); //Proximo middleware

    console.timeEnd(logLabel);
};

function validadeProjectId(request, response, next)
{
    const { id } = request.params;

    if (!isUuid(id)) {
        return response.status(400).json({ error : 'Invalid project ID'})
    }
    
    return next();
};

app.use(logRequests);

app.get('/express', (request, response) =>
{
    /**Filtros usando query parms */
    return response.json(projects);  
});

app.get('/express/buscar', (request,response) =>
{
    /**Destruturamos a query */
    const {Title} = request.query;

    /** verificação para buscar o proj*/
    /** IF ternário*/
    /** array+filter*/
    /** includes : metodo que verifica o title buscado com o title do array*/
    const results = Title ? projects.filter(x => x.Title.includes(Title)) : projects    

    return response.json(results);
});

/**POST -> criar uma informação */

app.post('/express/insert', (request, response) =>
{
    /**desestruturamos os cod */
    const {Title,Owner} = request.body;

    
    /**cadastramos um proj */
    /**usando a biblio uuidv4 para um cadastro auto do id */
    const newProject = { id: uuid(), Title, Owner }; 

    /**push metedo de cadastro */    
    projects.push(newProject);

    return response.json(newProject);
});

/**PUT -> atualiza uma informação 
 * (atualiza todos os dados de uma vez) */

/**PATCH -> atualiza uma informação
 * (atualiza apenas um dado por vez)
 */

app.put('/express/insert/:id', validadeProjectId , (request,response) =>
{
    /**{ nome da query } = desestruturar as informações*/
    const {id} = request.params;
    const {Title,Owner} = request.body;
    
    /**Percorremos o ARRAY PROJECTS (findIndex) e 
     * procuramos o indice de onde queremos atualizar ( posição ) */
    const findProject = projects.findIndex(x => x.id == id);

    /**verificação se há algum proj com esse id */
    if(findProject < 0)
    {
         return response.status(400).json({ error : 'Project not found'});
    };

    /**passamos os novos dados */
    const updateProjects = {
        id,
        Title,
        Owner
    };

    /**atualizamos */
    projects[findProject] = updateProjects

    return response.json(
        'The project has been updated'
    );
});

/**deleta uma informação */
app.delete('/express/delete/:id', validadeProjectId , (request,response) =>
{
    const { id } = request.params;
    
    const findProject = projects.findIndex(x => x.id == id);

    // if (findProject < 0) {
    //     return response.statusCode(400).json({error : 'The project does not exist'});
    // };

    projects.splice(findProject, 1);

    return response.status(204).send();
});


app.listen(3333, () => {  
    console.log('RUN!!!!!!!');
});
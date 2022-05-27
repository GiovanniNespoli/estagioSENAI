//Services ->   conjunto de codigo ou funcs baseados
//              baseado em uma regra de negocio e retornam
//              uma informação

//Objeto dentro da String, assim nos conseguimos fazer com que um array tenha mais de 1 tipo
interface techObject {
    title : string,
    experience : number,
}

interface CreateUserData {
    name ?: string;
    // ? -> significa que a variavel nome é opcional
    email : string;
    passworld: string;
    techs : Array<string | techObject>
}

/** 
 *  para conseguirmos desestruturar os parametros passados dentro do createUser 
 *  percisamos criar uma interface
 * */

export default function createUser({name, email, passworld}: CreateUserData)
{
    const newUser = {
        name,
        email,
        passworld,
    }

    return newUser;
}
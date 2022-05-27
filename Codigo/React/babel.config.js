module.exports = {
    presets : [
        '@babel/preset-env',    //converte para o browser 
                                //apenas as fucionalidade que 
                                //eles não entendem no JS mais moderno
                                //env de environment

        '@babel/preset-react'   //transpila o codigo html dentro do JS
                                //para que o browser entenda
    ],
    plugins: [
        '@babel/plugin-transform-runtime' //babel por padrão n le a estrutura
                                         //async await, então usamos esse
                                         //plugin para libermos
    ]
};
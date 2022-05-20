module.exports = {
    presets : [
        '@babel/preset-env',    //converte para o browser 
                                //apenas as fucionalidade que 
                                //eles não entendem no JS mais moderno
                                // env de environment

        '@babel/preset-react'   //transpila o codigo html dentro do JS
                                //para que o browser entenda
    ],
};
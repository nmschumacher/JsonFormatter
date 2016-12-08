# JsonFormatter
Formatador de códigos JSON válidos ou inválidos em JavaScript.


##Finalidade
  O propósito deste projeto é auxiliar desenvolvedores que necessitam formatar, identar ou estilizar um código JSON seja ele válido ou não.


##Como Utilizar
  Ambos os arquivos podem ser utilizados separadamente. Eles são independentes um do outro, mas para que o código que aplica o estilo funcione como desejado, pode ser que seja necessário primeiro aplicar o formatador.
  
  *Observação: os códigos JSON testados que foram formatados pelo JsonFormatter.js eram códigos sem espaçamento entre os atributos e seus respectivos valores, o que também era verdade para o início e o fim de blocos de código.*
  
###JsonFormatter.js
*em construção*

###JsonStyler.js
*em construção*

###Exemplo de Código


**Antes da formatação**

````
/tces/{codigoTCE}/documentos/{codigoDocumento}:[{"GET":{"tags":["documento-controller"],"summary":"obterConteudoDocumentoTCE","operationId":"obterConteudoDocumentoTCEUsingGET","consumes":["application/json"],"produces":["*/*"],"parameters":[{"name":"Authorization","in":"header","description":"Token de autenticação JWT","required":false,"type":"string"},{"name":"codigoTCE","in":"path","description":"codigoTCE","required":true,"type":"integer","format":"int64"},{"name":"codigoDocumento","in":"path","description":"codigoDocumento","required":true,"type":"integer","format":"int64"}],"responses":{"200":{"description":"OK"},"400":{"description":"Bad Request","schema":{"$ref":"#/definitions/Erro"}},"500":{"description":"Internal Server Error","schema":{"$ref":"#/definitions/Erro"}}}}}],

[]
[]
```


**Após a formatação (ainda sem estilização)**

````
/tces/{
    codigoTCE
}/documentos/{
    codigoDocumento
} : [
    {
        "GET" : {
            "tags" : ["documento-controller"],
            "summary" : "obterConteudoDocumentoTCE",
            "operationId" : "obterConteudoDocumentoTCEUsingGET",
            "consumes" : ["application/json"],
            "produces" : ["*/*"],
            "parameters" : [
                {
                    "name" : "Authorization",
                    "in" : "header",
                    "description" : "Token de autenticação JWT",
                    "required" : false,
                    "type" : "string"
                },{
                    "name" : "codigoTCE",
                    "in" : "path",
                    "description" : "codigoTCE",
                    "required" : true,
                    "type" : "integer",
                    "format" : "int64"
                },{
                    "name" : "codigoDocumento",
                    "in" : "path",
                    "description" : "codigoDocumento",
                    "required" : true,
                    "type" : "integer",
                    "format" : "int64"
                }
            ],
            "responses" : {
                "200" : {
                    "description" : "OK"
                },
                "400" : {
                    "description" : "Bad Request",
                    "schema" : {
                        "$ref" : "#/definitions/Erro"
                    }
                },
                "500" : {
                    "description" : "Internal Server Error",
                    "schema" : {
                        "$ref" : "#/definitions/Erro"
                    }
                }
            }
        }
    }
],

[]
[]
```

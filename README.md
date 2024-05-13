# Calorie-Counter

Este é um projeto desenvolvido, inspirado nos desafios do [app ideas - Calorie Counter](https://github.com/florinpop17/app-ideas/blob/master/Projects/3-Advanced/Calorie-Counter-App.md)
### Objetivos
 - Ler aquivos .xlsx e converver para JSON
 - Realizar busca pelo nome de um produto e retonar umas lista paginada com os resultados encontrados
 - Calcular somatório de calorias, dado produto selecionado e quantidade informada
 - Exibir mensagem de alerta, caso nenhum produto tenha sido encontrado
 - Exibir mensagem de alerta, caso uma busca vazia tenha sido realizada
 - Implementar controles de formulário como (realizar busca e limpar busca/filtros)
 - Visualização de elementos paginados
 - 
## Tecnologias

 - React
 - Node
 - Typescript
 - Next.js
 - Styled components

## Próximos passos/melhorias

 - Realizar implementação de api do back, para fornecer dados para o front;
 - Realizar cruzamento de informações entre os dadasets do [MyPyramid](https://catalog.data.gov/dataset/mypyramid-food-raw-data);
 - Substitir mapeamento de dados manuais realizados no front, para o back;
 - Receber no front, DTOs que mascarem o tipo de dado a ser buscado. (Sem distinção entre o dataset de Food Display Table e Condiment Food Table);
 - Implementar Testes unitários na aplicação;
 - Facilitar a execução da aplicação, (subir front + back e BD no futuro) com um docker-compose.


## 🏃 Como executar

Depois de clonar o repositório, vá para o diretório da aplicação frontend:
``cd calorie-counter-app``

Instale as dependências
```npm install```

> obs: No estado atual do projeto, os arquivos JSON do dataset foram versionados, então não há necessidade de instalar as dependências do repositório de api

Execute a aplicação em modo de desenvolvimento com
```npm run dev```

Acesse o `http://localhost:3000` no seu navegador e comece a testar a aplicação 🎆

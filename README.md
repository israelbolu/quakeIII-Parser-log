quakeIII-Parser-log
=============================
##Sobre
Aplicação que faz um parse do log de Quake Arena III usando Node.js e Angular.js

##Notas do desenvolvedor
O algoritmo de desenvolvido é capaz de ler o log gerado por Quake Arena III, carregando informações como: 
-número de kills por partida 
-nome dos jogadores 
-pontuação dos jogadores por partida 
-penalidades por jogador 
-motivo das mortes

##Parser
O script public/js/parserLog.js transforma os dados do arquivo game.log que contém as informações da partida do jogo, e a saída é gerado no formato JSON

##Demonstração

##Setup
Escreva o seguinte comando na pasta do projeto: 
```
> npm install
> node app.js
```
e a aplicação estará rodando no endereço ``http://localhost:3000/``


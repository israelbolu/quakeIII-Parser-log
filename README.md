quakeIII-Parser-log
=============================
##Sobre
Parser para log do Quake Arena III usando Node.js e Angular.js

##Notas do desenvolvedor
O algoritmo desenvolvido é capaz de ler o log gerado por Quake Arena III, carregando informações como: 
* número de kills por partida 
* nome dos jogadores 
* pontuação dos jogadores por partida 
* motivo das mortes

##Exemplo
O script public/js/parserLog.js transforma os dados do arquivo game.log que contém as informações da partida do jogo, e a saída é gerada no formato JSON
``` javascript
 "Game_2": {
        "hash": 1843596268,
        "total_kills": 11,
        "players": [
            "Isgalamido",
            "Dono da Bola",
            "Mocinha"
        ],
        "kills": {
            "Isgalamido": 3,
            "Dono da Bola": 0,
            "Mocinha": 0
        },
        "kills_by_means": {
            "MOD_TRIGGER_HURT": 7,
            "MOD_ROCKET_SPLASH": 3,
            "MOD_FALLING": 1
        }
    },
```

##Demo
[https://shrouded-plains-37049.herokuapp.com/](https://shrouded-plains-37049.herokuapp.com/)

##Setup
Para ver a aplicação funcionando localmente, escreva o seguinte comando na pasta do projeto: 
```
> npm install
> node app.js
```
A aplicação estará rodando no endereço ``http://localhost:3000/``


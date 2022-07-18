var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Carregando Imagens

var bird = new Image();
bird.src = 'assets/images/player/flying-bird-2.png';
var sky = new Image();
sky.src = 'assets/images/senario/sky.jpg';
var floor = new Image();
floor.src = 'assets/images/senario/floor.png';
var canoCima = new Image();
canoCima.src = 'assets/images/obstaculos/canoCima.png';
var canoBaixo = new Image();
canoBaixo.src = 'assets/images/obstaculos/canoBaixo-s.png';

// Carregar Sons
// var fly = new Audio();
// fly.src = 'assets/sounds/fly.mp3';
// var scor = new Audio();
// scor.src = 'assets/sounds/score.mp3';

// Variáveis

var eec = 100; // random entre 90 e 130px
var constant;
var bX = 33;
var bY = 200;
var gravity = 1.4;
var score = 0; 
var maxScore = 0;
var cano = [];

cano[0] = {
    x : canvas.width,
    y : 0
}

// captura de tecla e voar
document.addEventListener('keydown', voa);
function voa() {
    bY -= 26;
    // fly.play();
}

function jogo(){
    // Fundo
    ctx.drawImage(sky, 0, 0);

    // Canos
    for(let i = 0; i < cano.length; i++){ 
        // Posição do cano de baixo
        constant = canoCima.height + eec;
        // Config Cano de CIma
        ctx.drawImage(canoCima, cano[i].x, cano[i].y);
        // Config Cano Baixo
        ctx.drawImage(canoBaixo, cano[i].x, cano[i].y+constant);

        // movimento cano
        cano[i].x = cano[i].x - 1;
        if(cano[i].x == 125){
            cano.push({
                x : canvas.width,
                y : Math.floor(Math.random() * canoCima.height) - canoCima.height
            })
        }

        // colisão
        if(
            bX + bird.width >= cano[i].x && bX <= cano[i].x + canoCima.width
            && (bY <= cano[i].y + canoCima.height || bY + bird.height >= cano[i].y + constant) 
            || bY + bird.height >= canvas.height - floor.height
        ){
                location.reload();
                score = 0;
        }
        if(cano[i].x == 5){
            score = score + 1;
            if(score >= maxScore){
                maxScore = score;
            }
            // score.play();
        }

    }

    // Chão
    ctx.drawImage(floor, -100 , canvas.height - floor.height + 30);

    // player
    ctx.drawImage(bird,bX,bY);
    bY += gravity;

    // placar
    ctx.fillStyle = '#000';
    ctx.font = '20px Verdana';
    ctx.fillText('Placar: ' + score, 10, canvas.height - 20);
    ctx.fillText('Recorde: ' + maxScore, 10, canvas.height - 40);

    requestAnimationFrame(jogo);
}

jogo();
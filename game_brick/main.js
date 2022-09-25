let cvs = document.getElementById("canvas");
let ctx = cvs.getContext('2d');

// width 450;
// height 125;
const h_number = 9; // horizonal numbers of brick
const v_number = 5; // vertical number of brick

let img_w = 450/h_number;// 50
let img_h = 125/v_number; // 25

// draw brick
const img_brick = new Image();
img_brick.src = "./imgs/brick.png"; // loading the 
img_brick.addEventListener('load', ()=>{
    //console.log(img_brick_w + ", " + img_brick_h);
    for (var i = 0; i<v_number; i++)
    {
        for (var j = 0; j < h_number; j++)
        {
            ctx.drawImage(img_brick, j * img_w, i * img_h, img_w, img_h);
        }
    }
    ctx.stroke();
}, false);

// draw board
const img_board = new Image();
img_board.src = './imgs/board.png';
img_board.addEventListener('load', ()=> {
    ctx.drawImage(img_board, (450-img_board.naturalWidth)/2, 600-img_board.naturalHeight);
});

// draw ball
const img_ball = new Image();
img_ball.src = './imgs/ball.png';
img_ball.addEventListener('load', ()=> {
    ctx.drawImage(img_ball, (450-img_ball.naturalWidth)/2, 600-img_ball.naturalHeight-img_board.naturalHeight*2);
});



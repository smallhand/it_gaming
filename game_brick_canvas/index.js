let cvs = document.getElementById("bg_canvas");
let ctx = cvs.getContext("2d");


// w:450, h:600
const brick_ofst = 11;
let brick_w = 50;
let brick_h = 20;
const brick_cnts_h = 5;
const brick_cnts_w = Math.floor((cvs.clientWidth-brick_ofst)/(brick_w+brick_ofst));
let bricks = [];

let panel_pos;
let ball_pos;
let move_x, move_y;

const ball_r = 15;

function init_objs()
{
    // bricks
    for (let i = 0; i < brick_cnts_h; i++)
    {
        bricks[i] = [];
        for (let j = 0; j < brick_cnts_w; j++)
        {
            bricks[i][j] = {x:0, y:0};
        }
    }

    /* ========= draw ball ============== */
    ctx.beginPath();
    ball_pos = {x: cvs.clientWidth/2, y: cvs.clientHeight - 6*panel_h };
    move_x = 28;
    move_y = 28;
    ctx.fillStyle = "#F00D0D";
    ctx.arc(ball_pos.x, ball_pos.y, ball_r, 0, 2*Math.PI );
    ctx.fill();

    ctx.stroke();
    ctx.closePath();

    /* ========== draw panel ============= */
    ctx.beginPath();
    panel_pos = {x: (cvs.clientWidth-panel_w)/2, y: cvs.clientHeight-3*panel_h};

    ctx.fillStyle = "#00AD3F";
    ctx.fillRect((cvs.clientWidth-panel_w)/2, cvs.clientHeight-3*panel_h, panel_w, panel_h);

    ctx.closePath();
}

function draw_bricks()
{
    ctx.beginPath();
    ctx.fillStyle = "#9A9A9A";
    for (let i = 0; i < brick_cnts_h; i++)
    {
        for (let j = 0; j < brick_cnts_w; j++)
        {
            bricks[i][j].x = (brick_w + brick_ofst) * j + brick_ofst;
            bricks[i][j].y = (brick_h + brick_ofst) * i + brick_ofst;
            ctx.fillRect( (brick_w + brick_ofst) * j + brick_ofst, (brick_h + brick_ofst) * i + brick_ofst, brick_w, brick_h);
        }
    }

    ctx.closePath();

}
function draw_ball()
{
    ctx.beginPath();
    ctx.fillStyle = "#F00D0D";

    // 1. collide panel?
    if ((ball_pos.y + ball_r + move_y) >= panel_pos.y  && ((ball_pos.x + ball_R >= panel_pos.x)) && (ball_pos.x - ball_r) <= (panel_pos.x + panel_w)))
    {
        move_y = move_y * -1;
    }

    // 2. collide wall?
    if (((ball_pos.x + ball_r + move_x) > cvs.clientWidth) ||
        ((ball_pos.x + ball_r + move_x) <=0)
       )
    {
        move_x = move_x * -1;
    }
    else if ((ball_pos.y + ball_r + move_y) <=0)
    {
        move_y = move_y * -1;

    }
    else if ((ball_pos.y + ball_r + move_y) > cvs.clientHeight) // 3. coolide bottom => game over
    {
        alert("game over");
        move_y = move_y * -1;
        location.reload();
    }

    // collide bricks?
    /*
    for (let i = 0; i < brick_cnts_h; i++)
    {
        for (let j = 0; j< brick_cnts_w; j++)
        {
            if(((bricks[i][j].y + brick_h) == (ball_pos.y - ball_r)) && 
               ((ball_pos.x >= bricks[i][j]).x && (ball_pos.x <= (bricks[i][j].x+brick_w)))
              )
            {
                clearRect(bricks[i][j].x, bricks[i][j].y);
                move_y *= -1;
                console.log("test");
            }
        }
    }
    */

    ctx.arc(ball_pos.x + move_x, ball_pos.y + move_y, ball_r, 0, 2 * Math.PI);
    ctx.clearRect( ball_pos.x - 16, ball_pos.y -16 , 16*2, 16*2 );
    ctx.fill();

    ctx.stroke();

    ball_pos.x += move_x;
    ball_pos.y += move_y;
    ctx.closePath();
}



const panel_h = 15;
const panel_w = 120;
function draw_panel(ori_x, ori_y, x, y)
{
    ctx.beginPath();
    ctx.clearRect(ori_x, ori_y, panel_w, panel_h);

    ctx.fillStyle = "#00AD3F";
    ctx.fillRect(x, y, panel_w, panel_h);

    ctx.closePath();
}

window.onload = function()
{
    init_objs();
    draw_bricks();
    //draw_panel();
}

/* ================= Event =================== */
let start_btn = document.getElementById("btn_start");
let start_flag = 0;
start_btn.addEventListener('click', start_game);

function start_game()
{
    start_btn.style.display = "none";
    start_flag =1;
    setInterval(draw_ball, 50);
}

//start_btn.addEventListener('click', ()=> {
//    start_btn.style.display = "none";
//    start_flag = 1;
//    setInterval(draw_ball, 50, ball_pos.x, ball_pos.y, ball_pos.x + move_x, ball_pos.y + move_y);
//});

let body = document.body;
body.addEventListener('keydown', getKey, false);
function getKey(e)
{
    let tmp;
    if (start_flag == false)
        return;
    switch(e.code)
    {
        case "ArrowRight":
            if (panel_pos.x + panel_w + 10 <= cvs.clientWidth )
            {
                draw_panel(panel_pos.x, panel_pos.y, panel_pos.x+10, panel_pos.y);
                panel_pos.x += 10;
            }
            break;
        case "ArrowLeft":
            if (panel_pos.x -10 >= 0 )
            {
                draw_panel(panel_pos.x, panel_pos.y, panel_pos.x-10, panel_pos.y);
                panel_pos.x -= 10;
            }
            break;
        default:
            break;
    }
}
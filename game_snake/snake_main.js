// draw background
let bg_cvs = document.getElementById("bg_canvas");
let ctx = bg_cvs.getContext("2d");
const max_len   = 600;
const max_width = 360;
ctx.stroke();

let score_area = document.querySelector('.score_area');

// snake attribute
const snake = [];
let score = 0;
let snake_len = 3; // start len of snake
let snake_sz = 30; // 蛇能走的步數，長邊: 600/30 = 20, 短邊: 300/30 = 10; also radius = 15
let snake_r = 15; // 30 /2 
let c_body = "#0FF0F0";
let c_head = "#0FA0D0";

// food attribue
let food_x, food_y;

// direction, keyboard
let direct = [[1,0], [0, 1], [-1, 0], [0, -1]]; // right, down, left, up
let direct_record = new Array(); // for snake body moving until the direction is the same as head
let cur_direct = 0;
const k_map = new Map();
k_map.set("ArrowRight", 0);
k_map.set("ArrowDown", 1);
k_map.set("ArrowLeft", 2);
k_map.set("ArrowUp", 3);


let body = document.body;
body.addEventListener('keydown', getKey, false);

// time interval
let time_id;

function getKey(e)
{
    ctx.fillStyle = c_head;
    snake_len = snake.length;
    k_value = k_map.get(e.code);
    if (k_value === undefined)
    {
        return;
    }
    //console.log("cur direct" + cur_direct + ", keyboard: " + k_value);
    if ( (((cur_direct + 2) & 0x3) == k_value) || (((cur_direct +4-2) & 0x3) == k_value))
    {
        return;
    }

    let tmp_x, tmp_y;
    tmp_x = snake[snake_len-1].x;
    tmp_y = snake[snake_len-1].y;
    // get next position
    tmp_x += direct[k_value][0] * snake_sz;
    tmp_y += direct[k_value][1] * snake_sz;

    // 1. over boarder?
    if ((tmp_x >= max_len) || (tmp_x < 0) || (tmp_y >= max_width) || (tmp_y<0))
    {
        alert("game over");
        location.reload();
        return;
    }
    // 2. meet body?
    if (chk_meet_body(tmp_x, tmp_y) === true)
    {
        alert("game over");
        location.reload();
        return;
    }

    if (cur_direct === k_value)
    {
        // 3. eat food?
        if (chk_eat_food(food_x, food_y) === true)
        {
            snake.push({x: tmp_x, y: tmp_y});
            ctx.fillRect(tmp_x, tmp_y, snake_sz, snake_sz);

            ctx.clearRect(snake[0].x, snake[0].y, snake_sz, snake_sz);
            add_food();
            return;
        }

        ctx.fillRect(tmp_x, tmp_y, snake_sz, snake_sz);
        ctx.clearRect(snake[0].x, snake[0].y, snake_sz, snake_sz);

        snake.push({x: tmp_x, y: tmp_y});
        snake.shift();
    }

    else if ((((cur_direct + 1) & 0x3) === k_value) || (((cur_direct+4-1) & 0x3) === k_value) )
    {
        // snake head
        tmp_x = snake[snake_len-1].x;
        tmp_y = snake[snake_len-1].y;

        // store the history direction for snake body to move
        //tmp_map.set(cur_direct, {x:tmp_x, y:tmp_y});
        direct_record.push({direct: cur_direct, x:tmp_x, y:tmp_y});

        tmp_x += direct[k_value][0] * snake_sz;
        tmp_y += direct[k_value][1] * snake_sz;

        if (chk_eat_food(food_x, food_y) === true)
        {
            snake.push({x: tmp_x, y: tmp_y});
            ctx.fillRect(tmp_x, tmp_y, snake_sz, snake_sz);
            cur_direct = k_value;
            add_food();
            return;
        }
        snake.push({x: tmp_x, y: tmp_y});
        ctx.fillRect(tmp_x, tmp_y, snake_sz, snake_sz);

        // get the history direction and move 
        let tmp = direct_record[0].direct;
        tmp_x = snake[0].x + direct[tmp][0] * snake_sz;
        tmp_y = snake[0].y + direct[tmp][1] * snake_sz;
        if ((tmp_x == direct_record[0].x) && (tmp_y == direct_record[0].y))
        {
            direct_record.shift();
        }
        ctx.clearRect(snake[0].x, snake[0].y, snake_sz, snake_sz);
        console.log(snake[3]);
        snake.shift();
        cur_direct = k_value;
    }
}
function auto_move()
{
    let tmp_x, tmp_y;
    tmp_x = snake[snake.length-1].x + direct[cur_direct][0] * snake_sz;
    tmp_y = snake[snake.length-1].y + direct[cur_direct][1] * snake_sz;

    if ((tmp_x >= max_len) || (tmp_x < 0) || (tmp_y >= max_width) || (tmp_y<0))
    {
        alert("game over");
        clearInterval(time_id);
        location.reload();
    }
    else if (chk_meet_body(tmp_x, tmp_y) == true)
    {
        alert("game over");
        clearInterval(time_id);
        location.reload();
    }

    else if (chk_eat_food(food_x, food_y) == true)
    {
        snake.push({x: tmp_x, y: tmp_y});
        ctx.fillRect(tmp_x, tmp_y, snake_sz, snake_sz);
        add_food();
    }
    else
    {
        //console.log(tmp_x);
        snake.push({x:tmp_x, y:tmp_y});
        ctx.fillRect(tmp_x, tmp_y, snake_sz, snake_sz);

        //ctx.fillStyle = c_body;
        //ctx.fillRect(snake[snake.length-2].x, snake[snake.length-2].y, snake_sz, snake_sz);
        
        ctx.clearRect(snake[0].x, snake[0].y, snake_sz, snake_sz);
        console.log(snake.length);
        snake.shift();
    }
}

function chk_meet_body(x, y)
{
    snake_len = snake.length
    for (let i = 0; i < snake_len; i++)
    {
        if ((snake[i].x == x) && (snake[i].y == y))
        {
            return true;
        }
    }
    return false;
}
function chk_eat_food(x, y)
{
    snake_len = snake.length;
    if ((snake[snake_len-1].x == x) && (snake[snake_len-1].y == y))
    {
        score += 30;
        score_area.innerHTML = "Score: " + score;
        return true;
    }
    return false;
}

function draw_snake()
{
    ctx.moveTo(30, 15);
    ctx.fillStyle = c_head;
    //ctx.fillStyle = c_body;
    for (let i = 0; i<snake_len; i++)
    {
        snake[i] = {x: i * snake_sz, y:0};
        //if (i == (snake_len-1))
        //{
        //    ctx.fillStyle = c_head;
        //}
        ctx.fillRect(snake[i].x, snake[i].y, snake_sz, snake_sz);
    }
    ctx.stroke();
}


function add_food()
{
    food_x = Math.floor(Math.random()*20) * 30;
    food_y = Math.floor(Math.random()*12) * 30;
    for (let i = 0; i<snake_len; i++)
    {
        if (food_x === snake[i].x && food_y===snake[i].y)
        {
            add_food();
        }
    }

    ctx.fillStyle ="blue";
    ctx.fillRect(food_x, food_y, snake_sz, snake_sz);
    ctx.fillStyle = c_head;
}

window.onload = function()
{
    draw_snake();
    add_food();
    ctx.fillStyle = c_head;
    time_id = setInterval(auto_move, 700);
}



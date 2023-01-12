let img_ivl_id;
let jump_ivl_id, fall_ivl_id;
let up_ivl_id;
let msg_id;

let stairs_arr = []; // element obj
let stairs_status = [];

let fall_flag;
let t;


let imgs;
let img_src = ["img/stair.png", "img/stair.png", "img/spike.png", "img/spring.png"]
let role_src = "img/role.png"
let role_img, role_status, role_stair_img;

let loaded = 0;


function randomEle(ele, idx)
{
    let m, n;
    let index = Math.floor(Math.random() * ele.length);

    m = Math.floor(Math.random()*(550 - ele.offsetWidth));
    n = (700- ele.offsetHeight);
    ele.style.left = m+"px";
    ele.style.top  = n +"px";

    stairs_status[idx].x = m;
    stairs_status[idx].y = n;
}

function moveUp() // move up stairs 5px/T
{
    //console.log(parseFloat(n_stair.style.top));
    if (loaded == 0)
    {
        return;
    }
    let role_atr = document.querySelector(".role");
    if (main_stair_exist === 1)
    {
        let stair_atr = document.querySelector(".role_stair");
        if ((parseFloat(stair_atr.style.top) + stair_atr.offsetHeight) >= 0)
        {
            stair_atr.style.top = parseFloat(stair_atr.style.top) -5 +"px";
            if (role_status.img_idx === -1)
            {
                role_status.y -= 5;
                role_atr.style.top = role_status.y + "px";
                if (game_over_cond() === true)
                {
                    restart();
                }
                //role_atr.style.top = parseFloat(role_atr.style.top) - 5 + "px";
            }
        }
        if ((parseFloat(stair_atr.style.top) + stair_atr.offsetHeight) < 0)
        {
            main_stair_exist = 0;
            console.assert(loaded > 0);
            loaded -= 1;
        }
    }

    for (let idx = 0; idx < stairs_arr.length; idx++)
    {
        if (stairs_status[idx].state === 1)
        {
            if ((parseFloat(stairs_arr[idx].style.top) + stairs_arr[idx].offsetHeight) >= 0)
            {
                stairs_arr[idx].style.top = parseFloat(stairs_arr[idx].style.top) -5 +"px";
                stairs_status[idx].y = parseFloat(stairs_arr[idx].style.top);

                if (role_status.state!=2)
                {
                    if (detect_bump(idx) === 1)
                    {
                        role_status.y = stairs_status[idx].y - role_img.offsetHeight;
                        role_atr.style.top = role_status.y + "px";
                        role_status.state = 2;
                        role_status.stair_left = stairs_status[idx].x;
                        role_status.stair_right = role_status.stair_left + stairs_arr[idx].offsetWidth;
                        clearInterval(fall_ivl_id);

                        role_status.img_idx = idx;
                        console.log("bump");
                    }
                }
                else if (role_status.state === 2)
                {
                    if (idx === role_status.img_idx)
                    {
                        //role_atr.style.top = parseFloat(role_atr.style.top) -5 +"px";
                        //role_status.y = parseFloat(role_atr.style.top);

                        role_status.y = stairs_status[idx].y - role_atr.offsetHeight;
                        role_atr.style.top = role_status.y + "px";
                        if (game_over_cond() === true)
                        {
                            restart();
                        }
                    }
                }
                //console.log(stairs_arr[idx].style.top);
            }
            // the stair is at the background => clear state to re-create img position
            if ((parseFloat(stairs_arr[idx].style.top) + stairs_arr[idx].offsetHeight) < 0)
            {
                stairs_status[idx].state = 0;
                //console.log("clear move up");
                console.assert(loaded > 0);
                loaded-=1;
            }
        }
    }
}

function getSize(idx)
{
    stairs_arr = document.querySelectorAll(".stair_normal");
    stairs_status[idx].state = 1;
    randomEle(stairs_arr[idx], idx);
    moveUp();
    loaded += 1;
}

function create_img()
{
    let src_idx;
    let i = Math.floor(Math.random() * imgs.length);
    if (stairs_status[i].state === 1)
    {
        return;
    }

    src_idx = Math.floor(Math.random() * img_src.length);

    // stair img
    imgs[i].src = img_src[src_idx];
    imgs[i].alt="normal_stair"
    stairs_status[i].idx = src_idx;
    imgs[i].addEventListener("load", () => { getSize(i); });

    //ele[i].style.top = '-' + (ele[i].offsetHeight + 100) + 'px';
}

let main_stair_exist = 0;
function create_role()
{
    role_img = document.querySelector(".img_role");
    role_stair_img = document.querySelector(".img_role_stair");

    let role_atr = document.querySelector(".role");
    let stair_atr = document.querySelector(".role_stair");

    role_img.src = role_src;
    role_img.alt = "main_role";

    // must get position after finish loading img (load好才能取位置left, top)
    role_img.addEventListener("load", () => 
    {
        // zoom-out img
        let ratio = role_img.offsetWidth / role_img.offsetHeight;
        let h_ = 80;
        let w_ = h_ * ratio;
        role_img.style.width = w_ + "px";
        role_img.style.height = h_ + "px";

        role_atr.style.left = (550 - role_img.offsetWidth)/2 +"px";
        role_atr.style.top  = (700/2 - role_img.offsetHeight) +"px";

        role_status.x = parseFloat(role_atr.style.left);
        role_status.y = parseFloat(role_atr.style.top);
        role_status.state = 1;
        role_status.img_idx = -1 ; // -1: main stair; 0~len-1: normal stair

        fall_flag = false;
        document.body.addEventListener('keydown', getKey, false);
    });

    role_stair_img.src = "img/stair.png";
    role_stair_img.alt = "main_stair";
    role_stair_img.addEventListener("load", () => 
    {
        stair_atr.style.left = (550-stair_atr.offsetWidth)/2  +"px";
        stair_atr.style.top  = (700/2) +"px";

        role_status.stair_left  = parseFloat(stair_atr.style.left);
        role_status.stair_right = role_status.stair_left +  stair_atr.offsetWidth;

        //console.log(role_status.stair_left);
        //console.log(role_status.stair_right);

        main_stair_exist = 1;
        loaded += 1;
    });
}

function game_over_cond()
{
    let role_atr = document.querySelector(".role");
    let bg = document.querySelector(".bg");
    let over = false;

    //console.log(bg.style.height);   

    // 1. the upper sting
    // 2. the bottom
    if (role_status.y <= 0 || (role_status.y + role_atr.offsetHeight) >= bg.offsetHeight)
    {
        over = true;
    }

    // 3. the life is lost(final)


    return over;
}

function restart()
{
    msg_id = setInterval(function(){
        alert("game over");
    },0);
    clearInterval(up_ivl_id);
    clearInterval(img_ivl_id);
    clearInterval(fall_ivl_id);

    setInterval(function(){
        clearInterval(msg_id);
    },1);

    location.reload();
}

function detect_bump(stair_idx)
{
    let role_atr = document.querySelector(".role");
    let bump_flag = 0;

    if ((role_status.y + role_atr.offsetHeight) >= stairs_status[stair_idx].y && 
       ((role_status.y + role_atr.offsetHeight) <= stairs_status[stair_idx].y + stairs_arr[stair_idx].offsetHeight) && 
       ( role_status.x >= stairs_status[stair_idx].x) && 
       ( role_status.x <= (stairs_status[stair_idx].x + stairs_arr[stair_idx].offsetWidth ))
       )
    {
        bump_flag = 1;
    }

    return bump_flag;
}

function game_over()
{
    let over = document.querySelector(".game_over");
    let over_img = document.createElement("img");
    over_img.setAttribute('alt', 'game_over');
    over_img.setAttribute('src', 'img/game_over');
    over.appendChild(over_img);
}

function free_fall()
{
    //console.log("free fall !!");
    let bg = document.querySelector(".bg");
    let role_atr = document.querySelector(".role");
    let game_over = false;
    t += 0.05;

    // g = 9.8
    //console.log(role_status.y);
    role_status.y += 0.5 * 9.8 * t * t;
    game_over = game_over_cond()
    if (game_over === true)
    {
        role_status.y = bg.offsetHeight - role_atr.offsetHeight + 3;
    }
    role_atr.style.top = role_status.y + "px";
    if (game_over === true)
    {
        restart();
    }
    /*
    else // 偵測有沒有撞到階梯
    {
        for (let i = 0; i < stairs_arr.length; i++)
        {
            if (role_status.y >= parseFloat(stairs_arr[i].style.top) && 
                role_status.y <= parseFloat(stairs_arr[i].style.top) + stairs_arr[i].offsetHeight &&
                role_status.x >= parseFloat(stairs_arr[i].style.left) &&
                role_status.x <= parseFloat(stairs_arr[i].style.left) + stairs_arr[i].offsetWidth )
            {
                role_status.img_idx = i;
                role_status.stair_left = parseFloat(stairs_arr[i].style.left);
                role_status.stair_right = parseFloat(stairs_arr[i].style.left) + stairs_arr[i].offsetWidth;
                clearInterval(fall_ivl_id);
                fall_flag = false;
                break;
            }
        }
    }
    */
}

function getKey(e)
{
   let role_atr = document.querySelector(".role");

    if (e.code === "ArrowRight")
    {
        role_status.x += 8;
        role_atr.style.left = role_status.x + "px";
    }
    else if (e.code === "ArrowLeft")
    {
        role_status.x -= 8;
        role_atr.style.left = role_status.x + "px";
    }
    else
    {
        return;
    }
    if ((role_status.x > role_status.stair_right) || ((role_status.x + parseFloat(role_img.style.width)) < role_status.stair_left))
    {
        // 開始下降 + 判斷有無撞到階梯
        if (fall_flag === false)
        {
            role_status.state = 1;
            fall_ivl_id = setInterval(free_fall, 30);
        }
        fall_flag = true;
    }
    else
    {
        clearInterval(fall_ivl_id);
        fall_flag = false;
        t = 1;
    }
}

// initialize the status of stairs
window.onload = function()
{
    imgs = document.querySelectorAll(".img_stair");
    for (i = 0; i < imgs.length; i++)
    {
        stairs_status[i] = {x: 0, y:0, state: 0, idx: -1};
    }

    // state 0: not loaded yet, 1: loaded (move down), 2: stand on stair (move up)
    role_status = {x: 0, y:0, state: 0, img_idx: -1, stair_left:-1, stair_right: -1};
    //role_status = {x: 0, y:0, state: 0, img_idx: -1};

    //console.log(stairs_arr.length)
    img_ivl_id = setInterval(create_img, 300);
    up_ivl_id = setInterval(moveUp, 27);


    // 控制人要向下還向上的 function
    create_role();
}

let mv_ivl_id, img_ivl_id;

let stairs_arr = []; // element obj
let stairs_status = [];


let imgs;
let img_src = ["img/stair.png", "img/spike.png", "img/spring.png"]
let loaded = 0;

function randomEle(ele, type) // type 0: 1 element, type 1: array
{
    let m, n;
    let index = Math.floor(Math.random() * ele.length);

    if (type == 0)
    {
        m = Math.floor(Math.random()*(550 - ele.offsetWidth));
        n = (700- ele.offsetHeight);
        ele.style.left = m+"px";
        ele.style.top  = n +"px";
    }
    else
    {
        //console.log(index);
        m = Math.floor(Math.random()*(550 - ele[index].offsetWidth));
        //console.log(ele[index].offsetHeight);
        n = (700- ele[index].offsetHeight);
        //console.log(m +", "+ n);
        ele[index].style.left = m+"px";
        ele[index].style.top  = n +"px";
        //console.log(ele[index].offsetHeight);
    }
}

function moveUp()
{
    //console.log(parseInt(n_stair.style.top));
    //if (loaded < (stairs_arr.length - 1))
    if (loaded == 0)
    {
        //alert(loaded +" " + stairs_arr.length);
        return;
    }

    for (let idx = 0; idx < stairs_arr.length; idx++)
    {
        if (stairs_status[idx].state === 1)
        {
            if ((parseInt(stairs_arr[idx].style.top) + stairs_arr[idx].offsetHeight) >= 0)
            {
                stairs_arr[idx].style.top = parseInt(stairs_arr[idx].style.top) -5 +"px";
                //console.log(stairs_arr[idx].style.top);
            }
            if ((parseInt(stairs_arr[idx].style.top) + stairs_arr[idx].offsetHeight) < 0)
            {
                //clearInterval(mv_ivl_id);
                stairs_status[idx].state = 0;
                //console.log("clear move up");
                loaded-=1;
                console.assert(loaded >= 0);
                //randomEle(stairs_arr[idx], 0);
                //mv_ivl_id =setInterval(moveUp, 30);
            }
        }
    }
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

    imgs[i].src = img_src[src_idx];
    imgs[i].alt="normal_stair"
    imgs[i].addEventListener("load", () => { getSize(i); });

    //ele[i].style.top = '-' + (ele[i].offsetHeight + 100) + 'px';
}
function getSize(idx)
{
    stairs_arr = document.querySelectorAll(".stair_normal");
    stairs_status[idx].state = 1;
    randomEle(stairs_arr[idx], 0);
    moveUp();

    loaded += 1;
    //console.log(stairs_arr[idx].offsetHeight);
    //console.log("==========================");
}


// initialize the status of stairs
window.onload = function()
{
    imgs = document.querySelectorAll(".img_stair");
    for (i = 0; i < imgs.length; i++)
    {
        stairs_status[i] = {x: 0, y:0, state: 0};
        //stairs_status[i] = 0;
    }

    //console.log(stairs_arr.length)
    img_ivl_id = setInterval(create_img, 800);
    mv_ivl_id = setInterval(moveUp, 27);

    //randomEle(n_stair, 0);
    //console.log("==========" + stairs_arr[2].offsetHeight);
    //console.log(parseInt(n_stair.style.top));
}

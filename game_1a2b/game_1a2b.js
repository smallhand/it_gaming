let btn = document.getElementById('submit');
btn.addEventListener('click', getGuess);

let hint = document.getElementById('hint');
hint.addEventListener('click', show_tar);

const tar_arr = [];
const guess_arr = [];

let round = 0;
let tar = "";
init();

function init()
{
    round = 0;
    tar = "";
    for (let i = 0; i < 4; i++)
    {
        tar += Math.floor(Math.random() * 10);
    }

}

function judge(guess_n)
{
    let ans = "";
    round += 1;
    if (guess_n === tar)
    {
        alert("bingo!!! the target number is: " + tar + ", total guess " + round + " times");
        location.reload();
        init();
    }
    else
    {
        let A = 0;
        for (let i = 0; i<10; i++)
        {
            tar_arr[i] = 0;
            guess_arr[i] = 0;
        }
        //====
        for (let i = 0; i<4; i++)
        {
            if (guess_n[i] === tar[i])
            {
                A += 1;
            }
            else
            {
                guess_arr[Number(guess_n[i])] += 1;
                tar_arr[Number(tar[i])] += 1;
            }
        }
        let B = 0
        for (let i = 0; i<10; i++)
        {
            while (guess_arr[i] > 0 && tar_arr[i] > 0)
            {
                B += 1;
                guess_arr[i] -= 1;
                tar_arr[i] -= 1;
            }
        }
        ans = A + "A" + B + "B<br>";
    }
    return ans;
}

function show_tar()
{
    let hint_area = document.querySelector(".hint");
    hint_area.innerHTML = tar;
}

function getGuess() {
    let history = document.querySelector('.his_content');
    let guess_n = document.getElementById("guess_v").value;

    ori = history.innerHTML;
    //history.innerHTML = ori + guess_n + "<br>";
    //history.innerHTML += judge(guess_n);
    history.innerHTML = guess_n + ", result: " + judge(guess_n) + ori + "<br>";
}

let btn = document.getElementById('submit');
btn.addEventListener('click', getGuess);

let hint = document.getElementById('hint');
hint.addEventListener('click', show_tar);

const tar_arr = [];

let digits= 4;
let round = 0;
let tar = "";
init()

function init()
{
    round = 0;
    for (let i = 0; i<10; i++)
    {
        tar_arr[i] = 0;
    }

    tar = "";
    for (let i = 0; i < digits; i++)
    {
        tar = Math.floor(Math.random() * 10);
    }
}

function judge(guess_n)
{
    let ans = "";
    for (let i = 0; i<10; i++)
    {
        tar_arr[i] = 0;
    }

    round += 1;
    if (guess_n === tar)
    {
        alert("Bingo!!! the target number is: " + tar + ", total guess " + round + " times");
        location.reload();
        init();
    }
    else
    {
        for (let i = 0; i < digits; i++)
        {
            tar_arr[Number(tar[i])] += 1;
        }

        let A = 0;
        for (let i = 0; i<digits; i++)
        {
            if (guess_n[i] === tar[i])
            {
                A += 1;
                tar_arr[Number(tar[i])] -= 1;
            }
        }
        let B = digits-A;
        for (let i = 0; i<digits; i++)
        {
            if (guess_n[i] !== tar[i])
            {
                if (tar_arr[Number(guess_n[i])] === 0)
                {
                    B -= 1;
                }
                if (tar_arr[Number(guess_n[i])] > 0)
                {
                    tar_arr[Number(guess_n[i])] -= 1;
                }
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

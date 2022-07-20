$(document).ready(function () {
    const number = 30;
    let randomNumber = getRandomNumber(1, number);
    console.log("randomNumber", randomNumber);
    let count = 0;
    let arr = [];
    let str = "";
    let contentLeft = $(".content-left");
    let content = "";
    let Islock = false;

    for (let i = 1; i <= number; i++) {
        content += `<a href="#" class="item" data-value="${i}">${i}</a>`;
    }
    contentLeft.html(content);

    let gameInfo = JSON.parse(localStorage.getItem("GAME_INFO")) || {};

    if (window.performance) {
        if (gameInfo.randomNumber && gameInfo.Islock == false) {
            let mess = window.confirm("Bạn có muốn chơi tiếp không:");
            if (mess == true) {
                randomNumber = gameInfo.randomNumber;
                count = gameInfo.count;
                tick(count);
                arr = gameInfo.arr;
                str = gameInfo.str;
                $(".resutl").html(str);
            } else {
                localStorage.setItem("GAME_INFO", JSON.stringify({}));
            }
        }
    }

    console.log("old_random_number", randomNumber);

    $(".item").click(function () {
        count++;
        let value = $(this).data("value");
        arr.push(value);
        if (value < randomNumber) {
            str += `<span class="orange">Sai rồi</span><p class="m-t-b">Lần ${count}: ${value} - Số của bạn nhỏ hơn số bí mật</p>`;
        } else if (value > randomNumber) {
            str += `<span class="orange">Sai rồi</span><p class="m-t-b"> Lần ${count}: ${value} - Số của bạn lớn hơn số bí mật</p>`
        } else {
            str += `<span class="green">Chính xác</span><p class="m-t-b">Lần ${count}: Số bí mật </strong> <span class="show">${randomNumber}</span></p>`;
            Islock = true;
        }
        if (count == 3 && value != randomNumber) {
            str += `<strong>Số bí mật:</strong> <span class="show">${randomNumber}</span>`;
            Islock = true;
        }
        $(".resutl").html(str);

        tick(count);

        if (Islock == true || count == 3) {
            $(".btn-hint").css("pointer-events", "none");
            lockUp();
            localStorage.setItem("GAME_INFO", JSON.stringify({}));
        };

    })


    $(".btn-replay").click(function () {
        unlock();
        localStorage.setItem("GAME_INFO", JSON.stringify({}));
    })


    $(".btn-hint").click(function () {
        arr.forEach(n => {
            if (n < randomNumber) {
                for (let i = 1; i <= n; i++) {
                    hint(i)
                }
            }
            if (n > randomNumber) {
                for (let i = n; i <= number; i++) {
                    hint(i);
                }
            }
        });
    })


    $(".btn-save").click(function () {
        if (Islock == true) {
            localStorage.setItem("GAME_INFO", JSON.stringify({}));
        } else {
            saveData("randomNumber", randomNumber);
            saveData("count", count);
            saveData("str", str);
            saveData("arr", arr);
            saveData("Islock", Islock);
        }
    })


    function saveData(key, data) {
        let gameInfo = JSON.parse(localStorage.getItem("GAME_INFO")) || {};
        gameInfo[key] = data;
        localStorage.setItem("GAME_INFO", JSON.stringify(gameInfo));
    }

    function tick(count) {
        for (let i = 1; i <= count; i++) {
            $(`.turn-item:nth-of-type(${i})`).css("background", "red");
        }
    }

    function hint(n) {
        $(`.item:nth-child(${n})`).css({
            "background": "red",
            "pointer-events": "none",
        });
    }

    function unlock() {
        count = 0;
        str = "";
        arr = [];
        Islock = false;
        $(".resutl").html("");
        $(".btn-hint").css("pointer-events", "auto");
        $(".turn-item").css("background", "white");
        $(".item").css({
            "background-color": "#f0f0f0",
            "pointer-events": "auto",
        })
        $(".content-left").css("background", "white");
        randomNumber = getRandomNumber(1, number);
        console.log(randomNumber);
    }

    function lockUp() {
        $(".item").css({
            "background-color": "white",
            "pointer-events": "none",
        })
        $(".content-left").css("background-color", "#646464");
        $(".btn-hint").css("pointer-events", "none");
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

})
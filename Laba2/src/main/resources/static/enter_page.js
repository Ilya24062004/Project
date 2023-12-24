const logInto = document.getElementById("submit");

logInto.onclick = () => {
    login = document.getElementById("login").value;
    password = document.getElementById("password").value;

    $.ajax({
        type : "POST",
        contentType: "application/json",
        charset: "UTF-8",
        cache: false,
        url: '/',
        data: JSON.stringify({
            login: login,
            password: password
        }),
        success: function (error){ //data
            document.getElementById('password1').innerHTML = '';
            document.getElementById('login1').innerHTML = '';

            if (error === "Такого пользователя не существует!"){
                document.getElementById("login1").innerHTML = "Такого пользователя не существует!";
            }
            else if (error === "Неверный пароль!"){
                document.getElementById('password1').innerHTML = "Неверный пароль!";
            }
            else if (error === "news_page"){
                document.getElementById('login1').innerHTML = '';
                document.getElementById('password1').innerHTML = '';
                window.sessionStorage.setItem("login", login);
                document.location.href = "news_page";
            }
            else if (error === "news_page2"){
                document.getElementById('login1').innerHTML = '';
                document.getElementById('password1').innerHTML = '';
                window.sessionStorage.setItem("login", login);
                document.location.href = "news_page2";
            }
            else if (error === "moder_news_page"){
                document.getElementById('login1').innerHTML = '';
                document.getElementById('password1').innerHTML = '';
                window.sessionStorage.setItem("login", login);
                document.location.href = "moder_news_page";
            }
        }
    })
}
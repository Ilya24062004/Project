const login = window.sessionStorage.getItem("login")
const logout = document.getElementById("exit1")
const addNews = document.getElementById('add_news')
const myNews = document.getElementById('myNews')
const approve = document.getElementById('await')
const sendNews = document.getElementById('send_news');

function add_news() {
    document.getElementById('add_news_card').style.display = 'block';
}

window.onload = function (){
    document.getElementById('login').innerHTML = login;
    approve.classList.add('hide');
}

window.onload = function () {
    $.ajax({
        type: "POST",
        url: "/users",
        contentType: "application/json",
        charset: "UTF-8",
        cache: false,
        data: JSON.stringify({
            login: login,
        }),
        success: function (data){
            result = JSON.parse(JSON.stringify(data))
            console.log(result[0])
            document.getElementById("login").innerHTML = result[0].login;
            document.getElementById("email").innerHTML = result[0].email;
            document.getElementById("enterCounter").innerHTML = result[0].enterCounter;
            document.getElementById("role").innerHTML = result[0].role;
        }
    })
    document.getElementById("avatar").src = "http://localhost:8081/get_image?login="+login;
    get_news();
}

logout.onclick = function () {
    document.location.href = "/";
}

document.getElementById("upload").onclick = () => {
    console.log('sdfsdfsf');
    let formData = new FormData();
    let file = document.getElementById("file-upload-input").files[0];

    (file === undefined) ? console.log("Please choose file") : (file.name = login + file.name.split(".")[1])
    console.log(file.name)

    formData.append("file", document.getElementById("file-upload-input").files[0]);
    formData.append("login", login)
    $.ajax({
        url: "/file_upload",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (res) {
        }
    })
}

function get_news(){
    $.ajax({
        url: "/get_user_news",
        type: "POST",
        contentType: "application/json",
        charset: "UTF-8",
        cache: false,
        data: JSON.stringify({
            login: login,
        }),
        success: function (data){
            let result = JSON.parse(JSON.stringify(data));

            console.log(result.length);

            let i = 0

            while (i < result.length){
                console.log(i);
                console.log(result[i]);

                news_card = document.createElement("div");
                news_card.classList.add("news_card");

                author_block = document.createElement('div');
                author_block.classList.add('news_block')
                authorText = document.createElement('span');
                authorText.classList.add('title-text');
                authorText.innerHTML = "Автор новости: ";
                author_block.appendChild(authorText);
                author = document.createElement('span');
                author.classList.add("text");
                author.innerHTML = result[i].author;
                author_block.appendChild(author);
                news_card.appendChild(author_block);

                theme_block = document.createElement('div');
                theme_block.classList.add('news_block')
                themeText = document.createElement('span');
                themeText.classList.add('title-text');
                themeText.innerHTML = "Тема: ";
                theme_block.appendChild(themeText);
                theme = document.createElement('span');
                theme.classList.add("text");
                theme.innerHTML = result[i].theme;
                theme_block.appendChild(theme);
                news_card.appendChild(theme_block);

                title_block = document.createElement('div');
                title_block.classList.add('news_block')
                titleText = document.createElement('span');
                titleText.classList.add('title-text');
                titleText.innerHTML = "Заголовок: ";
                title_block.appendChild(titleText);
                title = document.createElement('span');
                title.classList.add("text");
                title.innerHTML = result[i].title;
                title_block.appendChild(title);
                news_card.appendChild(title_block);

                let text = result[i].text.split("\n")
                for (j of text){
                    text_block = document.createElement('div');
                    text_block.classList.add('news_block')
                    textText = document.createElement('span');
                    textText.classList.add('title-text');
                    textText.innerHTML = "Текст: ";
                    text_block.appendChild(textText);
                    textt = document.createElement('span');
                    textt.classList.add("text");
                    textt.innerHTML = j;
                    text_block.appendChild(textt);
                    news_card.appendChild(text_block);
                }
                document.getElementById('wrapper').appendChild(news_card);
                i = i + 1;
            }
        }
    })
}

addNews.onclick = function () {
    document.getElementById('add_news_card').style.display = 'block';
    document.getElementById('author').innerHTML = login;
}
sendNews.onclick = add_user_news;

function add_user_news () {
    const theme = document.getElementById('news_topic').value;
    const title = document.getElementById('news_title').value;
    const text = document.getElementById('news_text').value;

    /*document.getElementById('m-theme').textContent = '';
    document.getElementById('m-title').textContent = '';
    document.getElementById('m-text').textContent = '';

    if(news_topic.length==0){
        document.getElementById('m-theme').textContent = 'Вы не указали тему';
    }
    if(news_title.length==0){
        document.getElementById('m-title').textContent = 'Вы не указали заголовок';
    }
    if(news_text.length==0){
        document.getElementById('m-text').textContent = 'Вы ничего не написали';
    }*/

     $.ajax({
         url: "/add_news",
         type: "POST",
         contentType: "application/json",
         charset: "UTF-8",
         cache: false,
         data: JSON.stringify({
             theme: theme,
             title: title,
             text: text,
             login: login,
             status: "Одобрено",
         }),
         success: function(error){
             document.getElementById("m-theme").innerHTML = "";
             document.getElementById("m-title").innerHTML = "";
             document.getElementById("m-text").innerHTML = "";

             if (error === "Вы не указали тему") {
                 document.getElementById("m-theme").innerHTML = "Вы не указали тему";
                 //return;
             }
             if (error === "Вы не указали заголовок") {
                 document.getElementById("m-title").innerHTML = "Вы не указали заголовок";
             }
             if (error === "Вы ничего не написали") {
                 document.getElementById("m-text").innerHTML = "Вы ничего не написали";
             }
             else{
                 window.location.reload();
             }
         }
     })
}


const await_news = document.getElementById('await_news')

myNews.onclick = function (){
    approve.classList.add('hide');
    approve.innerHTML = '';
    document.getElementById('wrapper').classList.remove('hide');
}

await_news.onclick = function (){
    document.getElementById('wrapper').classList.add('hide');
    approve.classList.remove('hide');
    $.ajax({
        url: "get_await_news",
        type: "GET",
        success: function (data){
            let result = JSON.parse(JSON.stringify(data));

            for (var i = 0; i < result.length; i++) {
                console.log(i);
                console.log(result[i]);

                news_card = document.createElement("div");
                news_card.classList.add("news_card");

                approveButton = document.createElement('input');
                approveButton.classList.add("approve_news");
                approveButton.id = result[i].id;
                approveButton.type = 'button';
                approveButton.value = "✓";
                approveButton.onclick = function () {
                    approve_news(this.id)
                }
                news_card.appendChild(approveButton);

                author_block = document.createElement('div');
                author_block.classList.add('news_block')
                authorText = document.createElement('span');
                authorText.classList.add('title-text');
                authorText.innerHTML = "Автор новости: ";
                author_block.appendChild(authorText);
                author = document.createElement('span');
                author.classList.add("text");
                author.innerHTML = result[i].author;
                author_block.appendChild(author);
                news_card.appendChild(author_block);

                theme_block = document.createElement('div');
                theme_block.classList.add('news_block')
                themeText = document.createElement('span');
                themeText.classList.add('title-text');
                themeText.innerHTML = "Тема: ";
                theme_block.appendChild(themeText);
                theme = document.createElement('span');
                theme.classList.add("text");
                theme.innerHTML = result[i].theme;
                theme_block.appendChild(theme);
                news_card.appendChild(theme_block);

                title_block = document.createElement('div');
                title_block.classList.add('news_block')
                titleText = document.createElement('span');
                titleText.classList.add('title-text');
                titleText.innerHTML = "Заголовок: ";
                title_block.appendChild(titleText);
                title = document.createElement('span');
                title.classList.add("text");
                title.innerHTML = result[i].title;
                title_block.appendChild(title);
                news_card.appendChild(title_block);

                status_block = document.createElement('div');
                status_block.classList.add('news_block')
                statusText = document.createElement('span');
                statusText.classList.add('title-text');
                statusText.innerHTML = "Статус: ";
                status_block.appendChild(statusText);
                statuss = document.createElement('span');
                statuss.classList.add("text");
                statuss.innerHTML = result[i].status;
                status_block.appendChild(statuss);
                news_card.appendChild(status_block);

                let text = result[i].text.split("\n")
                for (j of text) {
                    text_block = document.createElement('div');
                    text_block.classList.add('news_block')
                    textText = document.createElement('span');
                    textText.classList.add('title-text');
                    textText.innerHTML = "Текст: ";
                    text_block.appendChild(textText);
                    textt = document.createElement('span');
                    textt.classList.add("text");
                    textt.innerHTML = j;
                    text_block.appendChild(textt);
                    news_card.appendChild(text_block);
                }
                document.getElementById('await').appendChild(news_card);
            }
        }
    })
}

function approve_news(id) {
    $.ajax({
        url: "/approve_news",
        type: "POST",
        contentType: "application/json",
        charset: "UTF-8",
        cache: false,
        data: JSON.stringify({
            id: id,
        }),
        success: function (error) {
            if (error === "OK")
                window.location.reload();
        }
    })
}
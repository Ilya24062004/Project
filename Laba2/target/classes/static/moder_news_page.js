const login = window.sessionStorage.getItem("login");

window.onload = function (){
    document.getElementById('edit').classList.add('hide');
    document.getElementById('darker').classList.add('hide');
    $.ajax({
        url: "get_all_news",
        type: "get",
        success: function (data) {
            let result = JSON.parse(JSON.stringify(data));

            for (var i = 0; i < result.length; i++) {
                console.log(i);
                console.log(result[i]);

                news_card = document.createElement("div");
                news_card.classList.add("news_card");

                deleteButton = document.createElement('input');
                deleteButton.classList.add("delete_news");
                deleteButton.id = result[i].id;
                deleteButton.type = 'button';
                deleteButton.value = "X";
                deleteButton.onclick = function () {
                    delete_news(this.id)
                }
                news_card.appendChild(deleteButton);

                editButton = document.createElement('input');
                editButton.classList.add("edit_news");
                editButton.id = result[i].id;
                editButton.type = 'button';
                editButton.value = "✎";
                editButton.onclick = function () {
                    edit_news(this.id)
                }
                news_card.appendChild(editButton);

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
                document.getElementById('wrapper').appendChild(news_card);
            }
        }
    })
}

function delete_news(id){
    $.ajax({
        url: "/delete_news",
        type: "POST",
        contentType: "application/json",
        charset: "UTF-8",
        cache: false,
        data: JSON.stringify({
            id: id,
        }),
        success: function(error) {
            if (error === "OK")
                window.location.reload();
        }
    })
}

function edit_news(id){
    document.getElementById('darker').classList.remove('hide');
    document.getElementById('edit').classList.remove('hide');
    $.ajax({
        type: 'POST',
        contentType: "application/json",
        charset: "UTF-8",
        cache: false,
        url: '/get_news',
        data: JSON.stringify({
            id: id,
        }),
        success: function(data){
            let result = JSON.parse(JSON.stringify(data));
            document.getElementById('id').innerHTML = result.id;
            document.getElementById('author').innerHTML = result.author;
            document.getElementById('news_topic').value = result.theme;
            document.getElementById('news_title').value = result.title;
            document.getElementById('news_text').value = result.text;
        }
    })
}

const editNews = document.getElementById('edit_news');
editNews.onclick = edit;

function edit(){
    const id = document.getElementById('id').textContent;
    const author = document.getElementById('author').textContent;
    const theme = document.getElementById('news_topic').value;
    const title = document.getElementById('news_title').value;
    const text = document.getElementById('news_text').value;
    $.ajax({
        url: "/edit",
        type: "POST",
        contentType: "application/json",
        charset: "UTF-8",
        cache: false,
        data: JSON.stringify({
            id: id,
            author: author,
            theme: theme,
            title: title,
            text: text,
        }),
        success: function (){
            window.location.reload();
        }
    })
}
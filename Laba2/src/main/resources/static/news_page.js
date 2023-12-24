const login = window.sessionStorage.getItem("login");

window.onload = function (){
    $.ajax({
        url: "get_all_news",
        type: "get",
        success: function (data) {
            let result = JSON.parse(JSON.stringify(data));

            for (var i = 0; i < result.length; i++) {
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
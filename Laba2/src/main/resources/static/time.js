async function getData(){
    setInterval(() => {
        $.ajax({
            type: "GET",
            url: "/time",
            async: false,
            success: function (data) {
                document.getElementById('time').innerHTML = "Настоящее время: " + data;
            }
        })
    }, 1000)
}
getData()
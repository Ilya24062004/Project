const login = window.sessionStorage.getItem("login");
const table = document.getElementById('table');
const darker = document.getElementById('darker');
const form1 = document.getElementById('form');
const upForm = document.getElementById('upForm');
const formClose = document.getElementById('fromClose');
const editUser = document.getElementById('editUser');

window.onload = () => {
	darker.classList.add('hide');
	form1.classList.add('hide');
	upForm.classList.add('hide');
	show_table();
}

function show_table(){
	while(document.getElementsByTagName("tr").length !== 1){
		document.getElementsByTagName("tr")[1].remove();
	}

	$.get("/get_users", function (error){
		let result = JSON.parse(JSON.stringify(error));
		for (var i = 0; i < result.length; i++) {
			var tr = document.createElement('tr');
			for (var j = 0; j < 8 && table.rows.length <= result.length + 1; j++) {
				var td = document.createElement('td');
				td.innerHTML = "";
				tr.appendChild(td);
			}
			if (table.rows.length <= result.length + 1) {
				table.appendChild(tr);
			}

			table.rows[i + 1].cells[0].innerHTML = result[i].id;
			table.rows[i + 1].cells[1].innerHTML = result[i].login;
			table.rows[i + 1].cells[2].innerHTML = result[i].email;
			table.rows[i + 1].cells[3].innerHTML = result[i].password;
			table.rows[i + 1].cells[4].innerHTML = result[i].enterCounter;
			table.rows[i + 1].cells[5].innerHTML = result[i].role;
			table.rows[i + 1].cells[5].classList.add('user_role');
			table.rows[i + 1].cells[5].setAttribute('id', 'userRole')

			var editButton = document.createElement("input");
			editButton.type = 'button';
			editButton.value = 'Изменить';
			editButton.login = result[i].login;
			editButton.onclick = function () {
				change_user(this.login);
			}

			var deleteButton = document.createElement('input');
			deleteButton.type = 'button';
			deleteButton.login = result[i].login;
			deleteButton.value = 'Удалить';
			deleteButton.onclick = function () {
				delete_user(this.login)
			}

			if (result[i].login !== login) {
				table.rows[i + 1].cells[6].appendChild(deleteButton);
				table.rows[i + 1].cells[7].appendChild(editButton);
				table.rows[i + 1].cells[7].setAttribute('id', 'changeRole');
			}
		}
	})
}

function delete_user(login){
	$.ajax({
		url: "/delete_user",
		type: "POST",
		contentType: "application/json",
		charset: "UTF-8",
		cache: false,
		data: JSON.stringify({
			login: login,
		}),
		success: function(error) {
			if (error === "OK")
				show_table()
		}
	})
}

function change_user(login){
	darker.classList.remove('hide');
	form1.classList.remove('hide');
	upForm.classList.remove('hide');
	$.ajax({
		type: 'POST',
		contentType: "application/json",
		charset: "UTF-8",
		cache: false,
		url: '/get_user',
		data: JSON.stringify({
			login: login,
		}),
		success: function(data){
			let result = JSON.parse(JSON.stringify(data));
			document.getElementById('id').innerHTML = result.id;
			document.getElementById('login').value = result.login;
			document.getElementById('email').value = result.email;
			document.getElementById('password').value = result.password;
			switch (result.role){
				case "Пользователь":
					document.getElementById('chooseRole').value = "Пользователь";
					break;
				case "Модератор":
					document.getElementById('chooseRole').value = "Модератор";
					break;
				case "Администратор":
					document.getElementById('chooseRole').value = "Администратор";
					break;
			}
		}
	})
}

formClose.onclick = () => {
	darker.classList.add('hide');
	form1.classList.add('hide');
	upForm.classList.add('hide');
}
editUser.onclick = edit_user;

function edit_user(){
	const id = document.getElementById('id').textContent;
	const login = document.getElementById('login').value;
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const role = document.getElementById('chooseRole').value;
	$.ajax({
		url: "/edit_user",
		type: "POST",
		contentType: "application/json",
		charset: "UTF-8",
		cache: false,
		data: JSON.stringify({
			id: id,
			login: login,
			email: email,
			password: password,
			role: role
		}),
		success: function (data){
			document.getElementById('m-login').innerHTML = '';
			document.getElementById('m-email').innerHTML = '';
			if (data === "Такой логин уже существует"){
				document.getElementById('m-login').innerHTML = data;
				return;
			}
			else if (data === "Такая почта уже существует"){
				document.getElementById('m-email').innerHTML = data;
				return;
			}
			window.location.reload();
		}
	})
}
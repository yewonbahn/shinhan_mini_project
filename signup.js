const SERVER_URL = 'http://127.0.0.1:8000'

async function register(user) {
  let response = await fetch(`${SERVER_URL}/user/register`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // 백엔드에서 set-cookie 를 허용
  });
  let data = await response.json();
  return data;
}

async function submitRegister() {
    let user = {
      email: document.getElementById('id').value,
      password: document.getElementById('pw').value,
      fullname: document.getElementById('name').value,
    }
    let result = await register(user);
    console.log(result);
  }

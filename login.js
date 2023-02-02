const SERVER_URL = 'http://127.0.0.1:8000'


async function login(user) {
  let response = await fetch(`${SERVER_URL}/user/login`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (response.status === 200) { 
    let data = await response.json();
    setCookie('access_token', data.access_token); // 로그인 하는 순간, access token 이 브라우저에 저장된다.
    return data;
  } else {
    return new Error('에러 발생')
  }
}

  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
  function setCookie(name, value) {
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + "; path=/";
    document.cookie = updatedCookie;
  }

  
  async function submitLogin() {
    let user = {
      email: document.getElementById('id').value,
      password: document.getElementById('pw').value,
    }
    let result = await login(user);
    document.body.innerHTML = '<h2>로그인에 성공하셨습니다.</h2>'
    console.log(result);
  }
const config = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-21",
    headers: {
      authorization: "4aea4398-89d6-49a4-ae19-ce46f4c5d123",
      "Content-Type": "application/json",
    },
  };
  
  const handleResponse = (response) => {
    if (response.ok) {
        return response.json()
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }
  
  export const getInitialUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: "GET",
      headers: config.headers,
    })
    .then(res => handleResponse(res));
  };
  
  
  export const updateInitialUser = (userData) => {
    return fetch(`${config.baseUrl}/users/me`, {
            method: "PATCH",
            headers: config.headers,
            body: JSON.stringify({
                  name: userData.name,
                  about: userData.about,
            }),
          })
          .then(res => handleResponse(res));
  }
  
  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      method: "GET",
      headers: config.headers,
    })
      .then(res => handleResponse(res))
}

export const postInitialCards = (newCard) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
              name: newCard.name,
              link: newCard.link,
            }),
    })
      .then(res => handleResponse(res))
}
export const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
          method: "PATCH",
          headers: config.headers,
          body: JSON.stringify({avatar: avatar,}),
        })
        .then(res => handleResponse(res));
}
  
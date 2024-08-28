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
  
  
  export const updateInitialUser = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
            method: "PATCH",
            headers: config.headers,
            body: JSON.stringify({
                  name: name,
                  about: about,
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

export const postInitialCards = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
              name: name,
              link: link,
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
  
export const putlikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: "PUT",
  }).then(res => handleResponse(res));
};

export const disLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: "DELETE",
  }).then(res => handleResponse(res));
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
  }) 
  .then(res => handleResponse(res));
}




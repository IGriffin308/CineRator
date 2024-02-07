/users
    register /
    --?authenticate
    getAll /
    get    /:username
    patch  /:username
    delete /:username

/comments
    post   /
    --getAllForUser /:username
    --getAllForMovie /:movieID
    get    /:id
    patch  /:id
    delete /:id

/omdb
    getID  /:id
    getTitle /:id


/auth
    post /token
    post /register
import connection from '../data/db.js';


//INDEX
export const index = async (req, res) => {

    const sql = 'SELECT * FROM posts'

    const [results] = await connection.query(sql);

    /*     // filtro tag
        if (req.query.tag) {
            filteredIndex = filteredIndex.filter((post) => post.tags.includes(req.query.tag))
        }
        // filtro title
        if (req.query.title) {
            filteredIndex = filteredIndex.filter((post) => post.title.includes(req.query.title))
        }
     */
    res.json(results);
};


//SHOW
export const show = async (req, res) => {
    let id = Number(req.params.id);

    // check su request id: se NaN return status 400
    if (isNaN(id)) {
        res.status(400).json({
            status: "bad request",
            "message": "bad request: id must be a number"
        })
        return
    }

    const sql = 'SELECT * FROM posts p WHERE p.id = ?';

    const [[result]] = await connection.query(sql, [id])

    // check: se parametro é tecnicamente corretto (numero) ma post non trovato
    if (result === undefined) {
        res.status(404).json({
            status: "not found",
            message: "post non trovato"
        })
        return
    }

    // se ricerca va a buon fine
    res.json(result);
};


//CREATE
export const create = async (req, res) => {

    const { title, content, image } = req.body;

    if (!title || !content || !image) {
        res.status(400).json({
            "status": "bad request",
            "message": "il post è incompleto o inesistente, impossibile creare nuovo post"
        })
        return
    }


    const sql = 'insert into posts (title, content, image) values (?, ?, ?)';

    const [results] = await connection.query(sql, [title, content, image]);

    res.json({
        id: results.insertId,
        title,
        content,
        image
    })
};


// UPDATE
export const update = (req, res) => {
    let id = Number(req.params.id);
    let post = posts.find((post) => post.id === id);

    // check su request id: se NaN return status 400
    if (isNaN(id)) {
        res.status(400).json({
            status: "bad request",
            "message": "bad request: id must be a number"
        })
        return
    }

    // check: se ricerca non va a buon fine return status 404
    if (!post) {
        res.status(404).json({
            status: "not found",
            message: "post non trovato"
        })
        return
    }

    // se ricerca del post da modificare va a buon fine
    // check che il req body sia completo
    if (!req.body.title || !req.body.img_src || !req.body.content || !req.body.tags) {
        res.status(400).json({
            "status": "bad request",
            "message": "le modifiche indicate sono incomplete o inesistenti, impossibile modificare il post"
        })
        return
    }

    // se tutti i check vanno a buon fine, modifico i parametri del post
    post.title = req.body.title;
    post.img_src = req.body.img_src;
    post.content = req.body.content;
    post.tags = req.body.tags;

    res.json(post);
};


// MODIFY
export const modify = (req, res) => {
    let id = Number(req.params.id);
    let post = posts.find((post) => post.id === id);

    // check su request id: se NaN return status 400
    if (isNaN(id)) {
        res.status(400).json({
            status: "bad request",
            "message": "bad request: id must be a number"
        })
        return
    }

    // check: se ricerca non va a buon fine return status 404
    if (!post) {
        res.status(404).json({
            status: "not found",
            message: "post non trovato"
        })
        return
    }

    // se ricerca va a buon fine
    post.title = req.body.title || post.title;
    post.img_src = req.body.img_src || post.img_src;
    post.content = req.body.content || post.content;
    post.tags = req.body.tags || post.tags;

    res.json(post);
};


// DESTROY
export const destroy = (req, res) => {
    let id = Number(req.params.id);
    let post = posts.find((post) => post.id === id);

    // check su request id: se NaN return status 400
    if (isNaN(id)) {
        res.status(400).json({
            status: "bad request",
            "message": "bad request: id must be a number"
        })
        return
    }

    // check: se ricerca non va a buon fine return status 404
    if (!post) {
        res.status(404).json({
            status: "not found",
            message: "post non trovato"
        })
        return
    }

    // se ricerca va a buon fine
    posts.splice(posts.indexOf(post), 1); // cancello post con metodo splice
    console.log(posts); // console.log della lista aggiornata
    res.sendStatus(204);
};


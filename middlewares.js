export const errorHandler = (err, req, res, next) => {
    res.status(500).
        res.json(
            {
                "error": "something went wrong"
            }
        )
};

export const notFound = (req, res, next) => {
    res.status(404).json(
        {
            status: "not found",
            message: "pagina non trovata"
        }
    )
};
const isAdmin = (req, res, next) => {
    if (req.session.info.admin) next();
    else res.json({ msg: "You must be admin" });
  };

export default isAdmin;


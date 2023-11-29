export const validateLogin = (req, res, next) => {
  if (req.session.info && req.session.info.loggedIn) next();
  else res.status(401).json({ msg: "You must be authorized" });
};


export default validateLogin;
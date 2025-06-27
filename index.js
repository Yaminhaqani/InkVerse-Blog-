require("dotenv").config();
const express = require("express"); // importing express from node modules
const { connectDb } = require("./config/connectDb"); // modeule import
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const xhbs = require("express-handlebars");
const {
  registerController,
  loginController,
  getUsers,
  getUserById,
  deleteUser,
  updatePassWord,
  forgotPass,
  changePass,
} = require("./controllers/userController");
const { isAuthorised } = require("./middleware/isAuthorised");
const { verfiyToken } = require("./controllers/authController");
const { userDashboard, getUserDetails } = require("./controllers/getController");
const { createBlog, getCreateBlogPage, getAllBlogs, getBlogs, getBlogbyId, editBlog, updateEditBlog } = require("./controllers/blogController");
const { helpers } = require("handlebars");
require("dotenv").config();

const port = process.env.PORT || 3000;

connectDb();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views", "pages"));

app.engine(
  "hbs",
  xhbs.engine({
    extname: "hbs",
    helpers: {
      eq: (a, b) => a === b
    },
    defaultLayout: "layout",
    layoutsDir: path.join(__dirname, "views", "layout"),
    partialsDir: path.join(__dirname, "views", "partials"),
  }),

);

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "static")));   // static files path
app.use(cookieParser())


// Middleware to expose the login state to views
app.use((req, res, next) => {
  // If a token exists, we assume the user is logged in. When a user makes a request, the browser sends any cookies stored for that domain along with the request headers. The cookie-parser middleware parses those cookies and attaches them to req.cookies.
  //The res.locals object is automatically available in your Handlebars templates. This lets you conditionally render parts of your HTML (like showing a logout button only when isLoggedIn is true).
  res.locals.isLoggedIn = req.cookies.token && req.cookies.token !== 'undefined';
  next();
});



// server rendered pages
app.get("/", isAuthorised, (req, res) => {res.render("blogs");});
app.get("/user/register", (req, res) => {res.render("register", { title: "Register" });});
app.get("/user/login", (req, res) => { res.render("login", { title: "Login" });});








// Logout route that clears the token cookie
app.get("/logout", (req, res) => {
  // res.clearCookie("token") instructs the browser to delete the cookie named "token". It does this by sending back a response header that tells the browser to clear the cookie.
  res.clearCookie("token");
  res.redirect("/user/login");
});




app.get("/user/dashboard", isAuthorised, (req, res) => {
  if (!req.cookies.token) {
    return res.redirect("/user/login");
  }
  res.render("dashboard", { title: "Dashboard" });
});

app.get("/user/details/:userId" ,isAuthorised ,  getUserDetails )

// secure blogging routes
app.get("/blogs" , isAuthorised, getBlogs)
app.get("/blogs/:blogId" , getBlogbyId)

app.get("/blogs/edit/:blogId", isAuthorised, editBlog)
app.put("/blogs/edit/:blogId", isAuthorised, updateEditBlog)

app.get("/blog/create"  , isAuthorised ,  getCreateBlogPage)
app.post("/blog/create"  , isAuthorised ,  createBlog)
app.get("/blog/getAll"  , isAuthorised ,  getAllBlogs)



// app.get("/blog/:blogId"  , isAuthorised ,  userDashboard)





app.post("/user/register", registerController); 
app.post("/user/login", loginController); 








app.get("/user/getAll", getUsers);
app.get("/user/getUser", isAuthorised, getUserById); // done
app.post("/user/delete", isAuthorised, deleteUser);
app.put("/user/updatePass", isAuthorised, updatePassWord);
app.post("/user/forgot-pass", forgotPass);
app.put("/user/change-pass", changePass);
app.get("/token/verify", verfiyToken);







app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

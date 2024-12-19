const { log } = require("console");
const express = require("express");
const app = express();
const methodOverride = require("method-override"); // Already imported
const path = require("path");
let port = 8080;

const { v4: uuidv4 } = require("uuid");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // Use the middleware here
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`listning on port ${port}`);
});

let posts = [
  { id: uuidv4(), username: "sandip university", content: "100% placement" },
  {
    id: uuidv4(),
    username: "siddhant ",
    content: "I can complete the RESTful API concept.",
  },
  { id: uuidv4(), username: "apna college", content: "learn web development" },
];

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.post("/posts", (req, res) => {
  let id = uuidv4();
  let { username, content } = req.body;
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  console.log(id);

  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  console.log(post);

  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);

  res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

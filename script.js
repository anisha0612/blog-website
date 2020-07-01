import express from "express";
import _ from "lodash";

const app = express();
const port = 3100;
const posts = [];

const homeStartingContent =
  "Now that the, uh, garbage ball is in space, Doctor, perhaps you can help me with my sexual inhibitions? With a warning label this big, you know they gotta be fun! Hey, what kinda party is this? There's no booze and only one hooker. Ummm…to eBay? We can't compete with Mom! Her company is big and evil! Ours is small and neutral!";
const aboutContent =
  "The Knights Who Say Ni demand a sacrifice! We shall say 'Ni' again to you, if you do not appease us. Found them? In Mercia?! The coconut's tropical! How do you know she is a witch? Shh! Knights, I bid you welcome to your new home. Let us ride to Camelot! Ni! Ni! Ni! Ni! I'm not a witch. The nose? Look, my liege!";
const contactContent =
  "I am the last of my species, and I know how that weighs on the heart so don't lie to me! Sorry, checking all the water in this area; there's an escaped fish. No… It's a thing; it's like a plan, but with more greatness.";

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// home
app.get("/", (req, res) => {
  res.render("home", { homeContent: homeStartingContent, posts: posts });
});

app.post("/", (req, res) => {
  if (req.body.newPost === "home") {
    res.render("compose");
  } else {
    res.render("home");
  }
});

// about
app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});

// contact
app.get("/contact", (req, res) => {
  res.render("contact", { contact: contactContent });
});

// compose
app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
});

// access posts

app.get("/posts/:post", (req, res) => {
  const requestedStr = _.lowerCase(req.params.post);
  for (let post of posts) {
    const postStr = _.lowerCase(post.title);
    if (requestedStr === postStr) {
      res.render("post", {
        postTitle: post.title,
        postContent: post.content,
      });
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

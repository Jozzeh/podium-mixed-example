const express = require("express");
const app = express();

const Layout = require("@podium/layout");

// registering the layout
const layout = new Layout({
  name: "homeLayout", // required
  pathname: "/", // required
});

// registering the react micro frontends (podlets)
const reactmessagepod = layout.client.register({
  name: "reactMessagePod", // required
  uri: "http://localhost:7100/manifest.json", // required
});
const sveltemessagepod = layout.client.register({
  name: "svelteMessagePod", // required
  uri: "http://localhost:7101/manifest.json", // required
});
const vuemessagepod = layout.client.register({
  name: "vueMessagePod", // required
  uri: "http://localhost:7102/manifest.json", // required
});

app.use(layout.middleware());

// what should be returned when someone goes to the root URL
app.get("/", async (req, res) => {
  const incoming = res.locals.podium;

  //fetching the podlet data
  const content = await Promise.all([
    reactmessagepod.fetch(incoming),
    sveltemessagepod.fetch(incoming),
    vuemessagepod.fetch(incoming),
  ]);

  //binding the podlet data to the layout
  incoming.podlets = content;
  incoming.view.title = "Home Page";

  res.podiumSend(`<div>
    ${content[0]}
    ${content[1]}
    ${content[2]}
  </div>
  `);
});


app.listen(7000);
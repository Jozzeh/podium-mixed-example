<script>
  let name = "";

  import { MessageBus } from "@podium/browser";
  const messageBus = new MessageBus();

  messageBus.subscribe("internalchannel", "newMessage", event => {
    if (event.payload.from !== "svelte panel") {
      name = event.payload.message;
    }
  });

  function handleKeyup(e) {
    messageBus.publish("internalchannel", "newMessage", {
      message: name,
      from: "svelte panel"
    });
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    border: solid 1px #ff3e00;
    border-radius: 4px;
    padding: 25px 5px;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  #svelteMessage {
    min-width: 250px;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Message from svelte!</h1>
  <input
    bind:value={name}
    on:keyup={handleKeyup}
    name="message"
    id="svelteMessage"
    placeholder="Send a message" />
</main>

<template>
  <div class="hello">
    <h1>Go on... say hello</h1>
    <input v-model="message" class="vueMessageInput" placeholder="Send a message" />
  </div>
</template>

<script>
import { MessageBus } from "@podium/browser";
const messageBus = new MessageBus();

export default {
  name: "HelloWorld",
  data() {
    return {
      message: ""
    };
  },
  watch: {
    message: function(value) {
      messageBus.publish("internalchannel", "newMessage", {
        message: value,
        from: "vue panel"
      });
    }
  },
  mounted: function() {
    messageBus.subscribe("internalchannel", "newMessage", event => {
      if (event.payload.from !== "vue panel") {
        this.message = event.payload.message;
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.vueMessageInput {
  min-width: 250px;
  padding: 5px;
  border: solid 1px #ccc;
}
</style>

import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { OModal } from "@oruga-ui/oruga-next";
import "@oruga-ui/oruga-next/dist/oruga-full-vars.css";
import "./fontawesome";

const app = createApp(App);
app.component("OModal", OModal);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");

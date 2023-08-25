import { createApp } from 'vue'
import App from './App.vue';
import  { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const app = createApp(App);
app.use(toast());
app.mount('#app');

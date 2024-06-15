import {createApp} from 'vue'
import FormCreateMobile from '../src'
import 'vant/lib/index.css';
import App from './App.vue'
import install from '../auto-import';

const app = createApp(App)

FormCreateMobile.use(install);

app.use(FormCreateMobile);

app.mount('#app')

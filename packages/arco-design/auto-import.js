import Button from '@arco-design/web-vue/es/button';
import '@arco-design/web-vue/es/button/style/css';
import Form from '@arco-design/web-vue/es/form';
import '@arco-design/web-vue/es/form/style/css';
import Textarea from '@arco-design/web-vue/es/textarea';
import '@arco-design/web-vue/es/textarea/style/css';
import Input from '@arco-design/web-vue/es/input';
import '@arco-design/web-vue/es/input/style/css';
import Number from '@arco-design/web-vue/es/input-number';
import '@arco-design/web-vue/es/input-number/style/css';
import AutoComplete from '@arco-design/web-vue/es/auto-complete';
import '@arco-design/web-vue/es/auto-complete/style/css';
import Cascader from '@arco-design/web-vue/es/cascader';
import '@arco-design/web-vue/es/cascader/style/css';
import Checkbox from '@arco-design/web-vue/es/checkbox';
import '@arco-design/web-vue/es/checkbox/style/css';
import DatePicker from '@arco-design/web-vue/es/date-picker';
import '@arco-design/web-vue/es/date-picker/style/css';
import TimePicker from '@arco-design/web-vue/es/time-picker';
import '@arco-design/web-vue/es/time-picker/style/css';
import Radio from '@arco-design/web-vue/es/radio';
import '@arco-design/web-vue/es/radio/style/css';
import Rate from '@arco-design/web-vue/es/rate';
import '@arco-design/web-vue/es/rate/style/css';
import Select from '@arco-design/web-vue/es/select';
import '@arco-design/web-vue/es/select/style/css';
import Slider from '@arco-design/web-vue/es/slider';
import '@arco-design/web-vue/es/slider/style/css';
import Swtich from '@arco-design/web-vue/es/switch';
import '@arco-design/web-vue/es/switch/style/css';
import Upload from '@arco-design/web-vue/es/upload';
import '@arco-design/web-vue/es/upload/style/css';
import Tree from '@arco-design/web-vue/es/tree';
import '@arco-design/web-vue/es/tree/style/css';
import Tooltip from '@arco-design/web-vue/es/tooltip';
import '@arco-design/web-vue/es/tooltip/style/css';
import Popover from '@arco-design/web-vue/es/popover';
import '@arco-design/web-vue/es/popover/style/css';
import InputTag from '@arco-design/web-vue/es/input-tag';
import '@arco-design/web-vue/es/input-tag/style/css';
import Modal from '@arco-design/web-vue/es/modal';
import '@arco-design/web-vue/es/modal/style/css';
import Grid from '@arco-design/web-vue/es/grid';
import '@arco-design/web-vue/es/grid/style/css';

export default function install(formCreate) {
    formCreate.useApp((_, app) => {
        app.component(Form.name) || app.use(Form);
        app.component(Input.name) || app.use(Input);
        app.component(Number.name) || app.use(Number);
        app.component(AutoComplete.name) || app.use(AutoComplete);
        app.component(Cascader.name) || app.use(Cascader);
        app.component(Checkbox.name) || app.use(Checkbox);
        app.component(Radio.name) || app.use(Radio);
        app.component(DatePicker.name) || app.use(DatePicker);
        app.component(TimePicker.name) || app.use(TimePicker);
        app.component(Textarea.name) || app.use(Textarea);
        app.component(InputTag.name) || app.use(InputTag);
        app.component(Grid.name) || app.use(Grid);
        app.component(Button.name) || app.use(Button);
        app.component(Rate.name) || app.use(Rate);
        app.component(Select.name) || app.use(Select);
        app.component(Slider.name) || app.use(Slider);
        app.component(Swtich.name) || app.use(Swtich);
        app.component(Upload.name) || app.use(Upload);
        app.component(Tree.name) || app.use(Tree);
        app.component(Tooltip.name) || app.use(Tooltip);
        app.component(Popover.name) || app.use(Popover);
        app.component(Modal.name) || app.use(Modal);
    });
}

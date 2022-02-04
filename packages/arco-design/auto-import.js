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
import Modal from '@arco-design/web-vue/es/modal';
import '@arco-design/web-vue/es/modal/style/css';
import Grid from '@arco-design/web-vue/es/grid';
import '@arco-design/web-vue/es/grid/style/css';

import InfoCircle from '@arco-design/web-vue/es/icon/icon-info-circle'
import Folder from '@arco-design/web-vue/es/icon/icon-folder';
import CloseCircle from '@arco-design/web-vue/es/icon/icon-close-circle';
import PlusCircle from '@arco-design/web-vue/es/icon/icon-plus-circle';
import MinusCircle from '@arco-design/web-vue/es/icon/icon-minus-circle';
import Delete from '@arco-design/web-vue/es/icon/icon-delete';
import File from '@arco-design/web-vue/es/icon/icon-file';
import Eye from '@arco-design/web-vue/es/icon/icon-eye';

export default function install(formCreate) {
    formCreate.useApp((_, app) => {
        app.use(Form).use(Input).use(Number).use(AutoComplete).use(Cascader).use(Checkbox).use(Radio)
            .use(DatePicker).use(TimePicker).use(Textarea)
            .use(Grid).use(Button).use(Rate).use(Select).use(Slider).use(Swtich)
            .use(Upload).use(Tree).use(Tooltip).use(Popover).use(Modal);

        app.use(InfoCircle).use(Folder).use(CloseCircle).use(PlusCircle)
            .use(MinusCircle).use(Delete).use(File).use(Eye);
    });
}

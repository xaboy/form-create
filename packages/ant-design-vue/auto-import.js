import Button from 'ant-design-vue/es/button';
import 'ant-design-vue/es/button/style/css';
import Form from 'ant-design-vue/es/form';
import 'ant-design-vue/es/form/style/css';
import Input from 'ant-design-vue/es/input';
import 'ant-design-vue/es/input/style/css';
import Number from 'ant-design-vue/es/input-number';
import 'ant-design-vue/es/input-number/style/css';
import AutoComplete from 'ant-design-vue/es/auto-complete';
import 'ant-design-vue/es/auto-complete/style/css';
import Cascader from 'ant-design-vue/es/cascader';
import 'ant-design-vue/es/cascader/style/css';
import Checkbox from 'ant-design-vue/es/checkbox';
import 'ant-design-vue/es/checkbox/style/css';
import DatePicker from 'ant-design-vue/es/date-picker';
import 'ant-design-vue/es/date-picker/style/css';
import TimePicker from 'ant-design-vue/es/time-picker';
import 'ant-design-vue/es/time-picker/style/css';
import Radio from 'ant-design-vue/es/radio';
import 'ant-design-vue/es/radio/style/css';
import Rate from 'ant-design-vue/es/rate';
import 'ant-design-vue/es/rate/style/css';
import Select from 'ant-design-vue/es/select';
import 'ant-design-vue/es/select/style/css';
import Slider from 'ant-design-vue/es/slider';
import 'ant-design-vue/es/slider/style/css';
import Swtich from 'ant-design-vue/es/switch';
import 'ant-design-vue/es/switch/style/css';
import Upload from 'ant-design-vue/es/upload';
import 'ant-design-vue/es/upload/style/css';
import Tree from 'ant-design-vue/es/tree';
import 'ant-design-vue/es/tree/style/css';
import TreeSelect from 'ant-design-vue/es/tree-select';
import 'ant-design-vue/es/tree-select/style/css';
import Tooltip from 'ant-design-vue/es/tooltip';
import 'ant-design-vue/es/tooltip/style/css';
import Popover from 'ant-design-vue/es/popover';
import 'ant-design-vue/es/popover/style/css';
import Modal from 'ant-design-vue/es/modal';
import 'ant-design-vue/es/modal/style/css';
import Col from 'ant-design-vue/es/col';
import Row from 'ant-design-vue/es/row';
import 'ant-design-vue/es/grid/style/css';


export default function install(formCreate) {
    formCreate.useApp((_, app) => {
        app.use(Form).use(Input).use(Number).use(AutoComplete).use(Cascader).use(Checkbox).use(Radio)
            .use(DatePicker).use(TimePicker).use(TreeSelect)
            .use(Col).use(Row).use(Button).use(Rate).use(Select).use(Slider).use(Swtich)
            .use(Upload).use(Tree).use(Tooltip).use(Popover).use(Modal);
    });
}

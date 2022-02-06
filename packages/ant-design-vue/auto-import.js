import Button from 'ant-design-vue/lib/button';
import 'ant-design-vue/lib/button/style/css';
import Form from 'ant-design-vue/lib/form';
import 'ant-design-vue/lib/form/style/css';
import Input from 'ant-design-vue/lib/input';
import 'ant-design-vue/lib/input/style/css';
import Number from 'ant-design-vue/lib/input-number';
import 'ant-design-vue/lib/input-number/style/css';
import AutoComplete from 'ant-design-vue/lib/auto-complete';
import 'ant-design-vue/lib/auto-complete/style/css';
import Cascader from 'ant-design-vue/lib/cascader';
import 'ant-design-vue/lib/cascader/style/css';
import Checkbox from 'ant-design-vue/lib/checkbox';
import 'ant-design-vue/lib/checkbox/style/css';
import DatePicker from 'ant-design-vue/lib/date-picker';
import 'ant-design-vue/lib/date-picker/style/css';
import TimePicker from 'ant-design-vue/lib/time-picker';
import 'ant-design-vue/lib/time-picker/style/css';
import Radio from 'ant-design-vue/lib/radio';
import 'ant-design-vue/lib/radio/style/css';
import Rate from 'ant-design-vue/lib/rate';
import 'ant-design-vue/lib/rate/style/css';
import Select from 'ant-design-vue/lib/select';
import 'ant-design-vue/lib/select/style/css';
import Slider from 'ant-design-vue/lib/slider';
import 'ant-design-vue/lib/slider/style/css';
import Swtich from 'ant-design-vue/lib/switch';
import 'ant-design-vue/lib/switch/style/css';
import Upload from 'ant-design-vue/lib/upload';
import 'ant-design-vue/lib/upload/style/css';
import Tree from 'ant-design-vue/lib/tree';
import 'ant-design-vue/lib/tree/style/css';
import TreeSelect from 'ant-design-vue/lib/tree-select';
import 'ant-design-vue/lib/tree-select/style/css';
import Tooltip from 'ant-design-vue/lib/tooltip';
import 'ant-design-vue/lib/tooltip/style/css';
import Popover from 'ant-design-vue/lib/popover';
import 'ant-design-vue/lib/popover/style/css';
import Modal from 'ant-design-vue/lib/modal';
import 'ant-design-vue/lib/modal/style/css';
import Col from 'ant-design-vue/lib/col';
import Row from 'ant-design-vue/lib/row';
import 'ant-design-vue/lib/grid/style/css';

import QuestionCircleOutlined from '@ant-design/icons-vue/QuestionCircleOutlined'
import PlusOutlined from '@ant-design/icons-vue/PlusOutlined';
import MinusCircleOutlined from '@ant-design/icons-vue/MinusCircleOutlined';
import PlusCircleOutlined from '@ant-design/icons-vue/PlusCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons-vue/CloseCircleOutlined';
import FolderOutlined from '@ant-design/icons-vue/FolderOutlined';
import FileOutlined from '@ant-design/icons-vue/FileOutlined';
import DeleteOutlined from '@ant-design/icons-vue/DeleteOutlined';
import EyeOutlined from '@ant-design/icons-vue/EyeOutlined';

export default function install(formCreate) {
    formCreate.useApp((_, app) => {
        app.use(Form).use(Input).use(Number).use(AutoComplete).use(Cascader).use(Checkbox).use(Radio)
            .use(DatePicker).use(TimePicker).use(TreeSelect)
            .use(Col).use(Row).use(Button).use(Rate).use(Select).use(Slider).use(Swtich)
            .use(Upload).use(Tree).use(Tooltip).use(Popover).use(Modal);

        app.component(QuestionCircleOutlined.name, QuestionCircleOutlined)
            .component(PlusOutlined.name, PlusOutlined)
            .component(MinusCircleOutlined.name, MinusCircleOutlined)
            .component(PlusCircleOutlined.name, PlusCircleOutlined)
            .component(CloseCircleOutlined.name, CloseCircleOutlined)
            .component(FolderOutlined.name, FolderOutlined)
            .component(FileOutlined.name, FileOutlined)
            .component(DeleteOutlined.name, DeleteOutlined)
            .component(EyeOutlined.name, EyeOutlined);
    });
}

window.mock =  [{
    "type": "text",
    "field": "title",
    "title": "产品标题",
    "props": {
        "type": "text",
        "disabled": false,
        "readonly": false,
        "rows": 4,
        "autosize": false,
        "number": false,
        "autofocus": false,
        "autocomplete": "off",
        "placeholder": "请输入产品标题",
        "value": ""
    },
    "validate":[
        { required: true, trigger: 'blur' }
    ],
    "value": "",
    "select": [],
    "options": []
}, {
    "type": "text",
    "field": "info",
    "title": "产品简介",
    "props": {
        "type": "text",
        "disabled": false,
        "readonly": false,
        "rows": 4,
        "autosize": false,
        "number": false,
        "autofocus": false,
        "autocomplete": "off",
        "placeholder": "请输入产品简介",
        "value": ""
    },
    "value": "",
    "select": [],
    "options": []
}, {
    "type": "text",
    "field": "unit_name",
    "title": "单位",
    "props": {
        "type": "text",
        "disabled": false,
        "readonly": false,
        "rows": 4,
        "autosize": false,
        "number": false,
        "autofocus": false,
        "autocomplete": "off",
        "placeholder": "个、位",
        "value": ""
    },
    "value": "",
    "select": [],
    "options": []
}, {
    "type": "datePicker",
    "field": "section_time",
    "title": "活动时间",
    "props": {
        "type": "datetimerange",
        "format": "yyyy-MM-dd HH:mm:ss",
        "placement": "bottom-start",
        "confirm": false,
        "disabled": false,
        "clearable": true,
        "readonly": false,
        "editable": false,
        "value": ["1518962262000", "1518969562000"]
    },
    "value": ["1518962262000", "1518969562000"],
    "select": [],
    "options": []
}, {
    "type": "Upload",
    "field": "img",
    "title": "推荐图",
    "props": {
        "multiple": false,
        "name": "file",
        "with-credentials": false,
        "show-upload-list": false,
        "mp-show-upload-list": true,
        "type": "drag",
        "action": "\/admin\/store.store_seckill\/upload.html",
        "format": ["jpg", "jpeg", "png", "gif"],
        "accept": "image\/*",
        "default-file-list": [],
        "max-length": 1,
        "max-size": 2048,
        "value": []
    },
    "value": [],
    "select": [],
    "options": []
}, {
    "type": "Upload",
    "field": "images",
    "title": "轮播图图",
    "props": {
        "multiple": false,
        "name": "file",
        "with-credentials": false,
        "show-upload-list": false,
        "mp-show-upload-list": true,
        "type": "drag",
        "action": "\/admin\/store.store_seckill\/upload.html",
        "format": ["jpg", "jpeg", "png", "gif"],
        "accept": "image\/*",
        "default-file-list": [],
        "max-length": 5,
        "max-size": 2048,
        "value": []
    },
    "value": [],
    "select": [],
    "options": []
}, {
    "type": "inputNumber",
    "field": "price",
    "title": "秒杀价",
    "props": {"step": 1, "precision": 2, "min": 0, "value": 0},
    "value": 0,
    "select": [],
    "options": []
}, {
    "type": "inputNumber",
    "field": "ot_price",
    "title": "原价",
    "props": {"step": 1, "precision": 2, "min": 0, "value": 0},
    "value": 0,
    "select": [],
    "options": []
}, {
    "type": "inputNumber",
    "field": "stock",
    "title": "库存",
    "props": {"step": 1, "precision": 2, "min": 0, "value": 0},
    "value": 0,
    "select": [],
    "options": []
}, {
    "type": "inputNumber",
    "field": "sales",
    "title": "销量",
    "props": {"step": 1, "precision": 2, "min": 0, "value": 0},
    "value": 0,
    "select": [],
    "options": []
}, {
    "type": "inputNumber",
    "field": "sort",
    "title": "排序",
    "props": {"step": 1, "precision": 2, "value": 0},
    "value": 0,
    "select": [],
    "options": []
}, {
    "type": "inputNumber",
    "field": "give_integral",
    "title": "赠送积分",
    "props": {"step": 1, "precision": 2, "min": 0, "value": 0},
    "value": 0,
    "select": [],
    "options": []
}, {
    "type": "inputNumber",
    "field": "postage",
    "title": "邮费",
    "props": {"step": 1, "precision": 2, "min": 0, "value": 0},
    "value": 0,
    "select": [],
    "options": []
}, {
    "type": "radio",
    "field": "is_postage",
    "title": "是否包邮",
    "props": {"vertical": false, "value": "否"},
    "value": "否",
    "select": [{"value": 1, "label": "是"}, {"value": 0, "label": "否"}],
    "options": [{"value": 1, "props": {"label": "是", "value": "是", "disabled": false}}, {
        "value": 0,
        "props": {"label": "否", "value": "否", "disabled": false}
    }]
}, {
    "type": "radio",
    "field": "is_hot",
    "title": "热门推荐",
    "props": {"vertical": false, "value": "关闭"},
    "value": "关闭",
    "select": [{"value": 1, "label": "开启"}, {"value": 0, "label": "关闭"}],
    "options": [{"value": 1, "props": {"label": "开启", "value": "开启", "disabled": false}}, {
        "value": 0,
        "props": {"label": "关闭", "value": "关闭", "disabled": false}
    }]
}, {
    "type": "radio",
    "field": "status",
    "title": "活动状态",
    "props": {"vertical": false, "value": "关闭"},
    "value": "关闭",
    "select": [{"value": 1, "label": "开启"}, {"value": 0, "label": "关闭"}],
    "options": [{"value": 1, "props": {"label": "开启", "value": "开启", "disabled": false}}, {
        "value": 0,
        "props": {"label": "关闭", "value": "关闭", "disabled": false}
    }]
}]
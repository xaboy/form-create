import {BaseParser} from '@form-create/core';
import {$set, toArray} from '@form-create/utils';

export function parseRule(rule) {
    let props = rule.props;
    if (props.data === undefined) $set(props, 'data', []);
    if (props.type === undefined) $set(props, 'type', 'checked');
    if (props.multiple === undefined) $set(props, 'multiple', false);

    return rule
}

export function isMultiple(rule) {
    return (!rule.props.multiple) && rule.props.type === 'selected'
}

const event = {
    s: 'on-select-change',
    c: 'on-check-change'
};

export default class handler extends BaseParser {
    init() {
        parseRule(this.rule);

        this._data = {};
        this.data(this.rule.props.data);

        $set(this.rule, 'value', this._parseValue());
    }

    _parseValue() {
        this.rule.value.forEach(this.rule.props.type === 'selected' ? (v) => this.selected(v) : (v) => this.checked(v));
        let value = [], props = this.rule.props;
        props.type === 'selected'
            ? Object.keys(this._data).forEach((key) => {
                let node = this._data[key];
                if (node.selected === true)
                    value.push(node.id);
            })
            : Object.keys(this._data).forEach((key) => {
                let node = this._data[key];
                if (node.checked === true)
                    value.push(node.id);
            });
        return value;
    }

    toFormValue(value) {
        value = toArray(value);
        this.choose(value);
        this.parseValue = value;
        return value;
    }

    choose(value) {
        let {rule, _data} = this;
        rule.props.type === 'selected'
            ? Object.keys(_data).forEach((key) => {
                $set(_data[key], 'selected', value.indexOf(_data[key].id) !== -1);
            })
            : Object.keys(_data).forEach((key) => {
                $set(_data[key], 'checked', value.indexOf(_data[key].id) !== -1);
            });
    }

    checked(v) {
        if (this._data[v] !== undefined) {
            $set(this._data[v], 'checked', true);
        }
    }

    selected(v) {
        if (this._data[v] !== undefined) {
            $set(this._data[v], 'selected', true);
        }
    }

    toValue(parseValue) {
        let value = parseValue;
        return !isMultiple(this.rule) ? value : (value[0] || '');
    }

    watchFormValue(n) {
        this.choose(n);
        console.log('watchFormValue');
    }

    selectedValue(nodes) {
        let value = [];
        nodes.forEach((node) => {
            if (node.selected === true)
                value.push(node.id);
        });
        return value;
    }

    checkedValue(nodes) {
        let value = [];
        nodes.forEach((node) => {
            if (node.checked === true)
                value.push(node.id);
        });
        return value;
    }

    _toValue() {
        return this.rule.props.type === 'selected'
            ? this.selectedValue(this.el.getSelectedNodes())
            : this.checkedValue(this.el.getCheckedNodes())
    }

    data(data) {
        data.forEach((node) => {
            this._data[node.id] = node;
            if (node.children !== undefined && Array.isArray(node.children))
                this.data(node.children)
        });
    }


    render(children) {
        let {rule, refName, field, unique} = this, props = this.vData.on(rule.on).on({
            [event.s]: (...args) => {
                this.vm._changeFormData(field, this._toValue());
                console.log(event.s,this._toValue());
                rule.event[event.s] && rule.event[event.s](...args);
            },
            [event.c]: (...args) => {
                console.log(event.c,this._toValue());
                this.vm._changeFormData(field, this._toValue());
                rule.event[event.c] && rule.event[event.c](...args);
            },
        }).props(rule.props).ref(refName).key(`fip${unique}`).get();

        let inputProps = this.r.inputVData(this).props({
            type: 'text',
            value: '' + this.rule.value,
            disable: true,
            readonly: true
        }).key('fipit' + unique).class('__fc_h').ref(`${refName}it`).on('input', () => {
        });

        return [this.vNode.tree(props, children), this.vNode.input(inputProps)];
    }
}

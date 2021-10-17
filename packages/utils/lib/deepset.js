export default function deepSet(data, idx, val) {
    let _data = data, to;
    (idx || '').split('.').forEach(v => {
        if (to) {
            if (!_data[to] || typeof _data[to] != 'object') {
                _data[to] = {}
            }
            _data = _data[to];
        }
        to = v;
    })
    _data[to] = val;
    return _data;
}

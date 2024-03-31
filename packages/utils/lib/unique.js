let id = 0;

export default function uniqueId() {
    const num = 370 + (++id);
    return 'F' + Math.random().toString(36).substr(3, 3) + Number(`${Date.now()}`).toString(36) + num.toString(36) + 'c';
}

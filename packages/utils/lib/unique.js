let id = 0;

export default function uniqueId() {
    return Math.random().toString(36).substr(3, 3) + Number(`${Date.now()}${++id}`).toString(36);
}

class ShowCanvas extends DiagramEdit {
    constructor(canvas, width, height) {
        super(canvas, width, height);
    }
    drawStart(x, y) {
        this.lastX = x;
        this.lastY = y;
    }
    drawing(x, y) {
        var context = this.context;
        context.beginPath();
        context.moveTo(this.lastX, this.lastY);
        context.lineTo(x, y);
        context.closePath();
        context.stroke();
        this.lastX = x;
        this.lastY = y;
    }
    save() {
        this.memento.save(this.canvas);
    }
    undo() {
        this.memento.undo(this.context);
    }
    redo() {
        this.memento.redo(this.context);
    }
    clear() {
        this.memento.clear(this.canvas, this.context);
    }
}
class ShowClient extends GameClient {
    constructor(manager, canvas) {
        super(manager, canvas);
        var body = document.getElementById('body-wrap');
        this.type = 'answerer';
        this.diagram = new ShowCanvas(canvas, body.offsetWidth- 2, body.offsetHeight- 182, manager);
        this.inputBox = new msgBox(this);
    }
    startGame(data, time) {
        var dialog = new SubjectDia("提示");
        dialog.init(data+"个字");
        $('item').innerText = data + "个字";
        this.timer(time);
    }
}

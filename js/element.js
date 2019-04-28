class myButton{
    constructor(taget, attr){
        this.class_name= '';
        this.btn = '';

        this.taget = taget;
        //taget type
        this.type = attr[0];
        //taget dimension
        this.height = attr[1];
        this.width = attr[2];
        //button text
        this.text = attr[3];
        //button positon
        this.top = attr[4];
        this.left = attr[5];
        //button dimension
        this.btn_width = attr[6];
    }
    create(){
        this.createButton();
        this.addEvent();
        return this.btn;
    }
    createButton(){
        this.btn = document.createElement('button');
        this.btn.setAttribute('style', `width: ${this.btn_width}px;
                                                display: block;
                                                position: absolute; 
                                                z-index: 1;
                                                left: ${this.left}px;
                                                top: ${this.top}%;`);
        this.btn.setAttribute('id', this.class_name);
        this.btn.innerHTML = this.text;
    }
};

class EditButton extends myButton{
    constructor(taget, attr){
        super(taget, attr);
        this.class_name = 'btn-edit';
    };
    addEvent(){
        this.btn.addEventListener("click", () => {
            this.taget.classList.remove('highlight');
            remove_btn('btn-edit');
            try {
                remove_btn('btn-delete');
            } catch (err) { }
            state = 2;

            if (this.type == "input") {
                this.taget.children[0].innerHTML =`<input id="edit" size=${this.width}  value="${this.taget.children[0].innerHTML}"></input>`;
            } else {
                this.taget.children[0].innerHTML = `<textarea id="edit" cols="${this.width}"rows="${this.height}">${this.taget.children[0].innerHTML}</textarea>`;
            }

            let edit = document.getElementById('edit');
            edit.focus();

            edit.addEventListener("focusout", () => {
                this.taget.children[0].innerHTML = edit.value;
                state = 0;
            });
        });
    }
}

class DeleteButton extends myButton{
    constructor(taget, attr) {
        super(taget, attr);
        this.class_name = 'btn-delete';
    };
    addEvent(){
        this.btn.addEventListener("click", () => {

            if (this.taget.parentNode.localName == "tr") {
                let index = getChildIndex(this.taget.parentNode);
                this.taget.parentNode.parentNode.removeChild(this.taget.parentNode.parentNode.children[index]);

            } else {
                let index = getChildIndex(this.taget);
                this.taget.parentNode.removeChild(this.taget.parentNode.children[index]);
            }
            state = 0;
        });
    }
}

class AddButton extends myButton{
    constructor(taget, attr) {
        super(taget, attr);
        this.class_name = 'btn-add';
    };
    addEvent(){
        this.btn.addEventListener("click", () => {
            let new_elem;
            switch (this.type) {
                case "para":
                    new_elem = ParaElement();
                    this.taget.parentNode.appendChild(new_elem);
                    break;
                case "list-item":
                    new_elem = ListItemElement();
                    document.getElementById('list').appendChild(new_elem);
                    break;
                case "row":
                    new_elem = RowElement();
                    document.getElementById('table-body').appendChild(new_elem);
                    break;
                default:
                    alert("Error");
            }
        });
    }
}

function ParaElement(){
    let element = document.createElement('div');
    element.setAttribute('name', 'para');
    element.setAttribute('style', 'position: relative; text-align:left;margin-bottom:16px;margin-left:0px;margin-top:16px;margin-right:0px');
    element.innerHTML = '<span style="font-family:Arial;font-size:15px;color:#273c75;font-style:normal;font-weight:normal">New Paragraph</span>';
    add_event(element, taget_list["para"]);
    return element;
}

function ListItemElement(){
    let element = document.createElement('li');
    element.setAttribute('name', 'list-item');
    element.setAttribute('style', 'position: relative;');
    element.innerHTML = '<span>New List Item</span>';
    add_event(element, taget_list["list-item"]);
    return element;
}

function RowElement(){
    let tr = document.createElement('tr');
    for(let i=0; i<4; i++){
        let td = document.createElement('td');
        td.setAttribute('name', 'cell');
        td.setAttribute('style', 'text-align: center; position: relative;');
        td.innerHTML = '<span>New Cell</span>';
        add_event(td, taget_list["cell"]);
        tr.appendChild(td);
    }
    let td = document.createElement('td');
    td.setAttribute('name', 'last-cell');
    td.setAttribute('style', 'position: relative;');
    td.innerHTML = '<span>New Cell</span>';
    add_event(td, taget_list["last-cell"]);
    tr.appendChild(td);
    return tr;
}
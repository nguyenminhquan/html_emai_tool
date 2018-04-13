function EditButton(taget, attr){
    let type = attr[0];
    let height = attr[1];
    let width = attr[2];
    //button
    let top = attr[3];
    let left = attr[4];
    let btn_width = attr[5];

    let btn = document.createElement('button');
    btn.setAttribute('style', 'width: '+btn_width+'px; display: block; position: absolute; z-index: 1; left: '+left+'px;; top: '+top+'px;');
    btn.setAttribute('id', 'btn-edit');
    btn.innerHTML = "Edit";

    btn.addEventListener("click", function(){
        // console.dir(taget.parentNode);
        taget.classList.remove('highlight');
        remove_btn('btn-edit');
        try { remove_btn('btn-delete');
        } catch(err) {}
        state = 2;

        if(type=="input"){
            taget.children[0].innerHTML = '<input id="edit" size="'+width+'" value="'+taget.children[0].innerHTML+'"></input>';
        } else {
            taget.children[0].innerHTML = '<textarea id="edit" cols="'+width+'" rows="'+height+'">'+taget.children[0].innerHTML+'</textarea>';
        }

        edit = document.getElementById('edit');
        edit.focus();

        edit.addEventListener("focusout", function(){
            taget.children[0].innerHTML = edit.value;
            state = 0;
        });
    });
    return btn;  
}

function DeleteButton(taget, attr){
    //button
    let text = attr[0];
    let top = attr[1];
    let left = attr[2];
    let btn_width = attr[3];

    let btn = document.createElement('button');
    btn.setAttribute('style', 'width: '+btn_width+'px; display: block; position: absolute; z-index: 1; left: '+left+'px;; top: '+top+'px;');
    btn.setAttribute('id', 'btn-delete');
    btn.innerHTML = text;

    btn.addEventListener("click", function(){
        
        if(taget.parentNode.localName == "tr"){
            let index = getChildIndex(taget.parentNode);
            taget.parentNode.parentNode.removeChild(taget.parentNode.parentNode.children[index]);

        } else {
            let index = getChildIndex(taget);
            taget.parentNode.removeChild(taget.parentNode.children[index]);
        }
        state = 0;
    });
    return btn;
}

function AddButton(taget, attr){
    //element
    let elem_type = attr[0];
    //button
    let text = attr[1];
    let top = attr[2];
    let left = attr[3];
    let btn_width = attr[4];

    let btn = document.createElement('button');
    btn.setAttribute('style', 'width: '+btn_width+'px; display: block; position: absolute; z-index: 1; left: '+left+'px;; top: '+top+'px;');
    btn.setAttribute('id', 'btn-add');
    btn.innerHTML = text;

    btn.addEventListener("click", function(){
        let new_elem;
        switch(elem_type){
            case "para":
                new_elem = ParaElement();
                taget.parentNode.appendChild(new_elem);
                break;
            case "list-item":
                new_elem = ListItemElement();
                document.getElementById('list').appendChild(new_elem);
                break;
            case "row":
                new_elem = RowElement();
                document.getElementById('table-body').appendChild(new_elem);
                break;
        }
    });
    return btn;
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
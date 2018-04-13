var state = 0;

document.getElementById('fileinput').addEventListener('change', readMultipleFiles, false);
function add_event(taget, btn_list){
    //Hien nut
    taget.addEventListener("mouseover", function(){
        if(state==0){
            taget.classList.add('highlight');

            for(let i=0; i<btn_list.length; i++){
                let btn = btn_list[i];
                let btn_elem;
                switch(btn.type) {
                    case "edit":
                        btn_elem = EditButton(taget, btn.attr);
                        break;
                    case "delete":
                        btn_elem = DeleteButton(taget, btn.attr);
                        break;
                    case "add":
                        btn_elem = AddButton(taget, btn.attr);
                        break;
                }
                taget.appendChild(btn_elem);
            }
            state = 1;
        }
    });
    // An nut
    taget.addEventListener("mouseout", function(event){
        let e = event.toElement || event.relatedTarget;
        if(e.parentNode == this || e == this){return;}

        if(state==1) {
            taget.classList.remove('highlight');
            try{remove_btn('btn-edit');} catch(err) {}
            try{remove_btn('btn-delete');} catch(err) {}
            try{remove_btn('btn-add');} catch(err) {}
            state = 0;
        }
    });
}

function add_events(){
    for (var taget_name in taget_list) {
        let tagets = document.getElementsByName(taget_name);
        for(let i=0; i<tagets.length; i++){
            add_event(tagets[i], taget_list[taget_name]);
        }
    }

    let btn_download = document.getElementById('btn-download');
    btn_download.addEventListener("click", function(){
        download("bantin.html", document.getElementById('my-container').innerHTML);
    });
    
    btn_download.style.visibility = "visible";
}
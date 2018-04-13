function getChildIndex(child){
    let parent = child.parentNode;
    let children = parent.children;
    for (let i = 0; i < children.length; i++){
        if (child == children[i]){
           return i;
        }
    }
};

function remove_btn(id){
    let btn = document.getElementById(id);
    let index = getChildIndex(btn);
    btn.parentNode.removeChild(btn.parentNode.children[index]);
}

function readMultipleFiles(evt) {
    //Retrieve all the files from the FileList object
    var files = evt.target.files;

    if (files) {
        for (var i = 0, f; f = files[i]; i++) {
            var r = new FileReader();
            r.onload = (function (f) {
                return function (e) {
                    var contents = e.target.result;
                    document.getElementById('my-container').innerHTML = contents;
                    add_events();
                };
            })(f);
            r.readAsText(f);
        }
    } else {
        alert("Failed to load files");
    }
}

function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
const textarea = document.getElementById("textt");
var selectedImage;
var imagePreview = document.createElement('img');

function handleFileSelect(event) {
    var file = event.target.files[0];

    if (file) {
        var reader = new FileReader();
        reader.onload = function (event) {
            imagePreview.classList.add('preview');
            imagePreview.src = event.target.result;
            selectedImage = event.target.result;
            var previewContainer = document.getElementById('previewContainer');
            previewContainer.innerHTML = '';
            previewContainer.appendChild(imagePreview);
            imagePreview.addEventListener('load', function () {
                if (imagePreview.naturalWidth >= imagePreview.naturalHeight) {
                    imagePreview.style.width = '100%';
                    imagePreview.style.height = 'auto';
                } else {
                    imagePreview.style.width = 'auto';
                    imagePreview.style.height = '100%';
                }
            });
        };

        reader.readAsDataURL(file);
    }
}

function downloadImage() {
    if (!selectedImage) {
        alert('No image selected.');
        return;
    }

    var downloadLink = document.createElement('a');
    downloadLink.href = selectedImage;
    downloadLink.download = 'image.png';
    downloadLink.target = '_blank';
    downloadLink.click();
}

function encrypt() {
    function writem() {
        let message = textarea.value;
        var t=writeMsgToCanvas('canvas', message, '', 0);
        if (t==true) {
            var myCanvas = document.getElementById("canvas");
            selectedImage = myCanvas.toDataURL("image/png");
        }
    }
    loadIMGtoCanvas('fileInput', 'canvas', writem, 500);
}

function decrypt() {
    function readm() {
        let t = readMsgFromCanvas('canvas', '', 0);
        if (t != null)
            textarea.value = t;
        else
            textarea.value = 'ERROR REAVEALING MESSAGE!';
    }
    loadIMGtoCanvas('fileInput', 'canvas', readm);
}

function autoExpand(textarea) {
    textarea.style.height = 'auto'; 
    textarea.style.height = textarea.scrollHeight + 'px'; 
}

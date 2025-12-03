(function($) {
    //https://www.jqueryscript.net/demo/digital-signatures-signpad/
    var load = 0;
    $.fn.SignPad = function(options) {
        // Default options
        const settings = $.extend({
            width       : 400,
            height      : 200,
            lineColor   : '#0000FF',
            lineWidth   : 2,
            userId      : null,
            canvasId    : 'signature-pad',
            onSave      : function (){},
            styles      : {
                clearBtn: "btn",
                undoBtn : "btn",
                saveBtn : ""
            },
            language      : {
                clearBtn: "Clear",
                undoBtn : "Undo",
                saveBtn : "Save"
            },
            title:"Sign Here"
        }, options);

        if(load==0){
            load =1;
            $('body').append(`<style>
            .signature-container {
    background-color: #fafaf7;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    margin-top:40px;
}
.signature-container canvas {
    border: 2px solid #32CD32;
    border-radius: 5px;
}
.signature-container .buttons {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    gap: 10px;
}
.signature-container .span,.signature-container button{
    width: auto;
    cursor:pointer;
}
            </style>`);
        }

        let undoStack = [];

        // Create canvas and buttons dynamically
        this.html(`
            <div class="signature-container">
                <h2 style="text-align: center;" class="text-dark">${settings.title}</h2>
                <canvas id="${settings.canvasId}" width="${settings.width}" height="${settings.height}"></canvas>
                <div class="buttons">
                    <span class="${settings.styles.clearBtn}" id="clear">${settings.language.clearBtn}</span>
                    <span class="${settings.styles.undoBtn}" id="undo">${settings.language.undoBtn}</span>
                    <span class="${settings.styles.saveBtn}" id="save">${settings.language.saveBtn}</span>
                </div>
            </div>
        `);

        const canvas = this.find('canvas')[0];
        const ctx = canvas.getContext('2d');
        let isDrawing = false;
        let lastX = 0, lastY = 0;

        // Set canvas drawing properties
        ctx.strokeStyle = settings.lineColor;
        ctx.lineWidth = settings.lineWidth;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        // Start drawing
        function startDrawing(event) {
            isDrawing = true;
            const { x, y } = getMousePosition(event);
            lastX = x;
            lastY = y;
            ctx.beginPath();
            ctx.moveTo(x, y);

            // Save current canvas state for undo
            undoStack.push(canvas.toDataURL());
        }

        // Draw
        function draw(event) {
            if (!isDrawing) return;
            const { x, y } = getMousePosition(event);
            ctx.lineTo(x, y);
            ctx.stroke();
            lastX = x;
            lastY = y;
        }

        // Stop drawing
        function stopDrawing() {
            isDrawing = false;
            ctx.closePath();
        }

        // Get mouse position
        function getMousePosition(event) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX ? event.clientX - rect.left : event.touches[0].clientX - rect.left;
            const y = event.clientY ? event.clientY - rect.top : event.touches[0].clientY - rect.top;
            return { x, y };
        }

        // Undo functionality
        $('#undo').click(() => {
            if (undoStack.length > 0) {
                const lastState = undoStack.pop();
                const img = new Image();
                img.src = lastState;
                img.onload = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);
                };
            }
        });

        // Clear functionality
        $('#clear').click(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });

        // Save functionality
        $('#save').click(() => {
            const dataURL = canvas.toDataURL('image/png');
            const currentTime = new Date().toLocaleString();

            // Save the data, including date and user information
            const postData = {
                userId: settings.userId,
                signature: dataURL,
                timestamp: currentTime,
            };

            settings.onSave(postData);

            // Example POST request
            fetch('/save-signature', {
                method: 'POST',
                body: JSON.stringify(postData),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(data => console.log('Success:', data))
            .catch(error => console.error('Error:', error));
        });

        // Drawing event listeners
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('touchstart', startDrawing, { passive: false });
        canvas.addEventListener('touchmove', draw, { passive: false });
        canvas.addEventListener('touchend', stopDrawing);

        return this;
    };
    var load =0;
    $.SignPadPopup  =function(options){
        var methods = alertDialog.tools();
        options={
          title:"Your signature", 
        };
        options.on=$.extend({
            init:function(){},
            show:function(){},
            hide:function(){}
        },options.on,true);

            var str=`
            
               
              <div id="signpad"></div>
              <div class="msg"></div>
`;
           
            

            var settings={ 
                nobutton:1,
                className:" ",
                title : options.title,
                message :str,
                callback : function(dialog,ok){

                    methods.close();  
                }
            };
           alertDialog(settings).then(function(dialog){
               methods.$ = dialog;
                 
               options.on.init(dialog);
               options.on.show(dialog);

                   dialog.find('#signpad').SignPad({
                    title:"Kí vào khung bên dưới",
                    width   : 1300,
                    height  : 600,
                    userId  : 123,
                    canvasId: 'signature-pad-canvas',
                    styles  : {
                        clearBtn    : "btn btn-danger btn-lg",
                        undoBtn     : "btn btn-info btn-lg",
                        saveBtn     : "btn btn-success btn-lg"
                    },
                    onSave  : function (postData){
                        console.log("Signature saved with data:", postData);
                        if(options.callback)options.callback(postData);
                    }
                });
          });
    };

}(jQuery));

export class Toast{
    static create(text, color){
        Toastify({            
            text: text,
            duration: 2000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // deixa o mouse em cima nao fecha
            style: {
              background: color,
            },

          }).showToast();
    }
}
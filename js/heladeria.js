window.onload = function(){

    
    const selectElement = document.forms[0].categoria;  
    
    const container = document.getElementById("container");
    
    const container2 = document.getElementById("sabores");   
   
    
    const sendButton = document.getElementById("send-button");
    
    const finish = document.getElementById("finish");   
 
    
    sendButton.addEventListener('click', validate);
    
    finish.addEventListener('click', completarCompra);   
 
    
    selectElement.addEventListener('change', showProducts);
    
    product_list = [];
    
    var ids = 0;
    
    var elementos = document.forms[0].elements;
    
    function validate(e){
    
        e.preventDefault();    
    
        var patron = /^\s+/;
        var opciones = ["chocolate","frutilla","vainilla","almendrado","limon"];
        let categoria = elementos[0];
    
       
        let sabor = elementos[1].value.trim();
    
        var cantidad = elementos[2].value;
    
        if (categoria.selectedIndex == 0){
            return false;
        }
    
        else if (!opciones.includes(sabor)){
            console.log("Opción inválida");
            return false;
        } 
    
        else if(sabor == null || sabor.length == 0 || patron.test(sabor) || /\d+/.test(sabor)){
            return false;
        }else if(cantidad == null ||isNaN(cantidad) || cantidad <=0 || cantidad>99) { 
            return false;
        }else{
            addProduct();
          
        }
        if (product_list.length >0){
            finish.style.display = "block";
        }
    }
    
    function showProducts(){
        if(selectElement.value=="Helado"){
            container2.textContent = "chocolate (20.00), vainilla (20.00), frutilla (25.00), limon (15.00), almendrado (30)";
        }
        else if (selectElement.value=="Torta"){
            container2.textContent = "chocolate (20.00), vainilla (20.00), frutilla (20.00), limon (15.00)";
        }
    }
    
    function addProduct () { 
      
        var id = ids;
        let sabor = elementos[1].value.trim();
        var categoria = elementos[0].value;
        var tamaño = document.forms[0].size.value;
    
       
        var c1 = document.getElementById("mani");
        var c2 = document.getElementById("chocolate");
        var c3 = document.getElementById("chispas");
        var c4 = document.getElementById("dulce");
    
        var complementos = [c1,c2,c3,c4];
    
        var producto = new Producto(id, categoria, sabor,elementos[2].value, tamaño, complementos);
        console.log(producto.id);
        ids+=1;
        const element = document.createElement('div');
    
           element.className ="card";
    
    element.innerHTML = 
    
    `<p><strong>${categoria} de ${producto.sabor}</strong><br>
    
    Cantidad: ${producto.cantidad}   Precio: ${producto.precio}   Complementos: ${producto.extras}4 c/u
    
    Total a pagar: ${producto.getTotal()}</p>
    
    <input type="button" class="button" name="delete" value="Eliminar">`;
    
        container.appendChild(element);
        product_list.push(producto);
        document.forms[0].reset();
        console.log(product_list);
    
        container.removeEventListener("click", deleteProduct);
        container.addEventListener("click", function(e){
    
        console.log(e.target+": "+e.target.name+" "+ producto.id);
        if(e.target.name === 'delete'){
            deleteProduct(e.target, producto.id);
        }
    
    });
        return false;
    
    }
    
    function completarCompra(){
        var total = 0;
        for(i=0; i< product_list.length; i++){
             console.log(product_list[i]);
             total+=product_list[i].getTotal();
        }
        alert("Monto total a pagar: "+total);
    }
    
    function deleteProduct(element, id){
        if(element.name === 'delete'){
            element.parentElement.remove();
            if(product_list.length>0){
              
                product_list.splice(id,1);
                ids-=1;
            }
                console.log("Productos: "+ product_list.length);
        }else{
    
            return;
        }
    
    }
    
    function Producto(id, tipo, sabor, cantidad, tamaño, complementos){
        this.id = id;
        this.tipo = tipo;
        this.sabor = sabor;
        this.cantidad = cantidad;
        this.tamaño = tamaño;
        this.extras="";
    
        console.log("ID: "+id);
    
        switch (sabor){
            case "chocolate":
                this.precio = 20.00;
                break;
    
            case "Vainilla":
                this.precio =20.00;
                break;
    
            case "Frutilla":
                this.precio = 25.00;
                break;
    
            case "almendrado":
                this.precio = 30.00;
                break;
    
            case "limon":
                this.precio = 15.00;
                break;
        }
        this.subtotal = this.cantidad*this.precio;
    
        var envase = 0;
    
        if(this.tamaño == "pequeño"){
            envase+=65.00;
        }
        else if(this.tamaño == "mediano"){
            envase+=100;
    
        }else{
            envase+=200;
        }
    
        var adicional = 0;
    
        for (var i=0; i<complementos.length;i++){
               if(complementos[i].checked == true){
                   adicional+=4.00;
                   this.extras+=complementos[i].value+", ";
               }
        }
    
        this.getTotal = function (){
            var total = this.subtotal + envase + adicional;
            return total;
        }  
    
    }
}
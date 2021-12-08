//Reglas de validación
$("#formulario").validate({
    rules:{
        //Identidad
        boleta: {
            required: true,
            minlength:10,
            maxlength:10
        },
        nombre: {
            required: true,
            minlength: 3,
            maxlength: 35
        },
        apePaterno: {
            required: true,
            minlength: 3,
            maxlength: 35
        },
        apeMaterno: {
            required: true,
            minlength: 3,
            maxlength: 35
        },
        fNacimiento: {
            required: true
        },
        curp: {
            required: true, 
            maxlength: 35 
        },
        //Contacto
        calleynumero: {
            required: true,
            minlength: 10
        },
        colonia: {
            required: true,
            minlength: 10
        },
        alcaldia: {
            required: true
        },
        codigopostal: {
            required: true,
            minlength: 5,
            maxlength: 5
        },
        tel: {
            required: true,
            minlength: 10,
            maxlength: 10
        },
        //Procedencia
        escProcedencia: {
            required: true
        },
        entidadFed: {
            required:true
        },
        nombreEsc: {
            required: true,
            maxlength: 100,
            minlength: 10
        },
        promedio: {
            required: true
        },
        opcion: {
            required: true
        }
    }
});  

//Al presionar el boton enviar
$("#enviar").click(function(){
    if($("#formulario").valid()== false){
        return; 
    }   
    //Identidad
    let boleta=$("#boleta").val()
    let nombre=$("#nombre").val()
    let apePaterno=$("#apePaterno").val()
    let apeMaterno=$("#apeMaterno").val()
    let fNacimiento=$("#fNacimiento").val()
    let genero=$("#genero").is(":checked")
    let curp=$("#curp").val()

    //Contacto
    let calleynumero=$("#calleynumero").val()
    let colonia=$("#colonia").val()
    let alcaldia=$("#alcaldia").val()
    let codigopostal=$("codigopostal").val() 
    let tel=$("#tel").val()
    let correo=$("#correo").val()

    //Procedencia
    let escProcedencia=$("#escProcedencia").val()
    let entidadFed=$("#entidadFed").val()  
    let nombreEsc=$("#nombreEsc").val()
    let promedio=$("#promedio").val()
    let opcion=$("#opcion").val()  

    alert("Datos registrados, gracias!") 
})




/*IDENTIDAD*/

//----Validacion de Nombre completo, solo letras----
$(function(){
    //Para escribir solo letras
    $('#nombre').validCampoFranz(' abcdefghijklmnñopqrstuvwxyzáéiou');
    $('#apePaterno').validCampoFranz(' abcdefghijklmnñopqrstuvwxyzáéiou');
    $('#apeMaterno').validCampoFranz(' abcdefghijklmnñopqrstuvwxyzáéiou');
});
//----Validacion del CURP----
function curpValida(curp) {
    var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
        validado = curp.match(re);
    if (!validado)  //Coincide con el formato general?
    	return false;   
    //Validar que coincida el dígito verificador
    function digitoVerificador(curp17) {
        //Fuente https://consultas.curp.gob.mx/CurpSP/
        var diccionario  = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
            lngSuma      = 0.0,
            lngDigito    = 0.0;
        for(var i=0; i<17; i++)
            lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
        lngDigito = 10 - lngSuma % 10;
        if (lngDigito == 10) return 0;
        return lngDigito;
    }
    if (validado[2] != digitoVerificador(validado[1])) 
    	return false;   
    return true; //Validado
}
//Handler para el evento cuando cambia el input
//Lleva la CURP a mayúsculas para validarlo
function validarInput(input) {
    var curp = input.value.toUpperCase(),
        resultado = document.getElementById("resultado"),
        valido = "No válido";   
    if (curpValida(curp)) { // ⬅️ Acá se comprueba
    	valido = "Válido";
        resultado.classList.add("ok");
    } else {
    	resultado.classList.remove("ok");
    }
    resultado.innerText = "CURP: " + curp + "\nFormato: " + valido;
}




/*CONTACTO*/

//----Validacion colonia, solo letras----
$(function(){
    //Para escribir solo letras
    $('#colonia').validCampoFranz(' abcdefghijklmnñopqrstuvwxyzáéiou');
});

//----Validación de telefono y CP----
/*e.preventDefault() para que ahora si no permita 
escribir caracteres que no sean de tipo número*/
formulario = document.querySelector('#formulario');
formulario.tel.addEventListener('keypress', function (e){
	if (!soloNumeros(event)){
  	e.preventDefault();
  }
})
formulario.codigopostal.addEventListener('keypress', function (e){
	if (!soloNumeros(event)){
  	e.preventDefault();
  }
})
formulario.promedio.addEventListener('keypress', function (e){
	if (!soloNumeros(event)){
  	e.preventDefault();
  }
})
//Solo permite introducir numeros.
function soloNumeros(e){
    var key = e.charCode;
    console.log(key);
    return key >= 48 && key <= 57;
}  


/*PROCEDENCIA*/

//----Validacion nombre de esucela, solo letras----
$(function(){
    //Para escribir solo letras
    $('#nombreEsc').validCampoFranz(' abcdefghijklmnñopqrstuvwxyzáéiou');
});

//----En caso de seleccionar 'otro'-----
//*Deberia funcionar pero no lo hace jaja :c
var escProcedencia = document.getElementsByName("escProcedencia"),
    otra = document.getElementById("nombreEsc");
    
    escProcedencia.addEventListener("click", function(){
    otra.style.display = this.value == "otro" ? "block" : "none";
}, false);

//----Validación boleta----
function boletaValida(boleta) {
    var re = /([0-9]{2}|"PE"|"PP")[0-9]{8}/,
        validado = boleta.match(re);
    if (!validado)  //Coincide con el formato general?
    	return false;
    return true;   
}
//Handler para el evento cuando cambia el input
//Lleva la boleta a mayúsculas para validarlo
function validarInputBoleta(input) {
    var boleta = input.value.toUpperCase(),
        resultadoBoleta = document.getElementById("resultadoBoleta"),
        valido = "No válido";   
    if (boletaValida(boleta)) { // Se comprueba
    	valido = "Válido";
        resultadoBoleta.classList.add("ok");
    } else {
    	resultadoBoleta.classList.remove("ok");
    }
    resultadoBoleta.innerText = "Boleta: " + boleta + "\nFormato: " + valido;
}
  

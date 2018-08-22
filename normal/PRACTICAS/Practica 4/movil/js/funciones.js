var db = null;
$(document).ready(function(){
    loadBd();
    function loadBd(){
        db = openDatabase("Db Agenda", "0.1", "database agenda", 20000);
        if(!db){
            alert("No fue posible realizar la conexion");
        }else{
            db.transaction(function (tx){
                tx.executeSql("CREATE TABLE eventos (id INTEGER PRIMARY KEY AUTOINCREMENT, categoria TEXT, fecha DATE, hora TEXT, descrip TEXT, status TEXT)", []);
            });
        }
    }
    $('#form1').submit(guardarDatos);
    $('#form2').submit(crearEvento);
    $('#datos').on('pagebeforeshow', cargarDatos);
    $('#main').on('pagebeforeshow', inicializar);
    cargarDatos();
    inicializar();
    $('#fechas li a').on('tap', function(event){
        var fecha = new Date();
        fecha.setDate(fecha.getDate())
        sessionStorage.fechaActual = fecha.getMonth() + 1 + '/' + fecha.getDate() + '/' + fecha.getFullYear();
	});
});

function cargarDatos(){
    $('#username').val(localStorage.nombre);
    $('#email').val(localStorage.correo);
    $('#comentarios').val(localStorage.comentarios);
}

function inicializar(){
    $('#h1').text("Agenda de "+ localStorage.nombre);
}

function guardarDatos(){
    var len = $("#comentarios").val().length;
    if ( len < 10 || len > 100 ) {
        $("#errmsg").text("Longitud del comentario 10-100 caracteres").show().fadeOut(5000);
        return false; 
    }else{
        localStorage.nombre = $('#username').val();
        localStorage.correo = $('#email').val();
        localStorage.comentarios = $('#comentarios').val();
        event.preventDefault();
        return true;
    }
}	  

function crearEvento(){
    var d = {};
    d.categoria = $('input[name=categoria]:checked', '#form2').val();
    d.fecha = $('#fecha').val();
    d.hora = $('#hora').val();
    d.descrip = $('#descrip').val();
    d.status = $('#status').val();
    console.log(d);
    db.transaction(function(tx){
        tx.executeSql("INSERT INTO eventos(categoria, fecha, hora, descrip, status) VALUES (?,?,?,?,?)", [d.categoria, d.fecha, d.hora, d.descrip, d.status]);
    });
    alert("Exito al crear evento");
    event.preventDefault();
    return true;
}

function consultaGlobal(){ 
    var html = "";
    db.transaction(function(tx){
        tx.executeSql("SELECT * FROM eventos", [],function(tx, data){
            for (i = 0; i < data.rows.length; i++){
                html += '<tr><td>'+data.rows[i].fecha+'</td><td>'+data.rows[i].hora+'</td><td>'+data.rows[i].categoria+'</td><td>'+data.rows[i].status+'</td><td>'+data.rows[i].descrip+'</td>'+'<td><a href="#popupStatus" onclick="guardarId('+data.rows[i].id+');" data-rel="popup" data-position-to="window" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-icon-gear ui-btn-icon-left ui-btn-a" data-transition="pop">Opciones</a></td></tr>';
            }
            $('#mostrarEventos').html(html);
        });
    });
    event.preventDefault();
    return true;
}

function consultarEvent(){
    var d = {};
    var html = "";
    d.tipo = $('input[name=tipo]:checked', '#form3').val();
    d.categoria = $('input[name=categoria]:checked', '#form3').val();
    if(d.tipo == "rango"){
        d.fechainicio = $('#finicial').val();
        d.fechafinal = $('#ffin').val();
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM eventos WHERE categoria = ? AND fecha BETWEEN ? AND ?", [ d.categoria,d.fechainicio, d.fechafinal], function(tx, data){
                for (i = 0; i < data.rows.length; i++){
                    html += '<tr><td>'+data.rows[i].fecha+'</td><td>'+data.rows[i].hora+'</td><td>'+data.rows[i].categoria+'</td><td><a href="#popupStatus" onclick="guardarId('+data.rows[i].id+');" data-rel="popup" data-position-to="window" data-transition="pop">'+data.rows[i].status+'</a></td><td>'+data.rows[i].descrip+'</td>'+'<td><button type="submit" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-delete" onclick="borrarEvento('+data.rows[i].id+');">Borrar</button></td></tr>';
                }
                $('#mostrarEventos').html(html);
            });
        });
    }else if(d.tipo == "year"){
        d.year = $('#year2').val();
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM eventos WHERE categoria = ? and fecha LIKE'"+d.year+"-%-%'", [d.categoria], function(tx, data){
                for (i = 0; i < data.rows.length; i++){
                    html += '<tr><td>'+data.rows[i].fecha+'</td><td>'+data.rows[i].hora+'</td><td>'+data.rows[i].categoria+'</td><td><a href="#popupStatus" onclick="guardarId('+data.rows[i].id+');" data-rel="popup" data-position-to="window" data-transition="pop">'+data.rows[i].status+'</a></td><td>'+data.rows[i].descrip+'</td>'+'<td><button type="submit" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-delete" onclick="borrarEvento('+data.rows[i].id+');">Borrar</button></td></tr>';
                }
                $('#mostrarEventos').html(html);
            });
        });
    }else if(d.tipo == "mes"){
        d.mes = $('#mes2').val();
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM eventos WHERE categoria = ? AND fecha LIKE'%-"+d.mes+"-%'", [d.categoria], function(tx, data){
                for (i = 0; i < data.rows.length; i++){
        			html += '<tr><td>'+data.rows[i].fecha+'</td><td>'+data.rows[i].hora+'</td><td>'+data.rows[i].categoria+'</td><td><a href="#popupStatus" onclick="guardarId('+data.rows[i].id+');" data-rel="popup" data-position-to="window" data-transition="pop">'+data.rows[i].status+'</a></td><td>'+data.rows[i].descrip+'</td>'+'<td><button type="submit" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-delete" onclick="borrarEvento('+data.rows[i].id+');">Borrar</button></td></tr>';
                }
                $('#mostrarEventos').html(html);
            });
        });
    }else if(d.tipo == "dia"){
        d.dia = $('#dia2').val();
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM eventos WHERE categoria = ? AND fecha LIKE'%-%-"+d.dia+"'", [d.categoria], function(tx, data){
                for (i = 0; i < data.rows.length; i++){
                    html += '<tr><td>'+data.rows[i].fecha+'</td><td>'+data.rows[i].hora+'</td><td>'+data.rows[i].categoria+'</td><td><a href="#popupStatus" onclick="guardarId('+data.rows[i].id+');" data-rel="popup" data-position-to="window" data-transition="pop">'+data.rows[i].status+'</a></td><td>'+data.rows[i].descrip+'</td>'+'<td><button type="submit" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-delete" onclick="borrarEvento('+data.rows[i].id+');">Borrar</button></td></tr>';
                }
                $('#mostrarEventos').html(html);
            });
        });
    }
    console.log(d);
    event.preventDefault();
    return true;
}

function errorHandler(transaction, error) {
    alert('Ocurrió un error: '+error.message+' (Codigo '+error.code+')');
    return true;
}

var idd = 0;

function guardarId(id){
    idd = id;
}

function borrarEvento(){
    db.transaction (function(tx){
        tx.executeSql("DELETE FROM eventos WHERE id=?", [idd]);
    }); 
    location.reload();
    event.preventDefault();
    return true;
}

function actulizarStatus(){
    var status = $('input[name=status]:checked', '#form4').val();
    db.transaction (function(tx){
        tx.executeSql("UPDATE eventos SET status=? WHERE id=?", [status, idd]);
    }); 
    location.reload();
    event.preventDefault();
    return true;
}

function camRango(){
    div = document.getElementById('mes');
    div.style.display = 'none';
    
    div = document.getElementById('year');
    div.style.display = 'none';

    div = document.getElementById('dia');
    div.style.display = 'none';

    div = document.getElementById('rangos');
    div.style.display = '';
}

function camYear(){
    div = document.getElementById('rangos');
    div.style.display = 'none';
    
    div = document.getElementById('mes');
    div.style.display = 'none';

    div = document.getElementById('dia');
    div.style.display = 'none';

    div = document.getElementById('year');
    div.style.display = '';
}

function camMes(){
    div = document.getElementById('rangos');
    div.style.display = 'none';
    
    div = document.getElementById('year');
    div.style.display = 'none';

    div = document.getElementById('dia');
    div.style.display = 'none';

    div = document.getElementById('mes');
    div.style.display = '';
}

function camDia(){
    div = document.getElementById('rangos');
    div.style.display = 'none';
    
    div = document.getElementById('year');
    div.style.display = 'none';

    div = document.getElementById('mes');
    div.style.display = 'none';

    div = document.getElementById('dia');
    div.style.display = '';
}
var campos = [
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor')
];

var tBody = document.querySelector('table tbody');

document.querySelector('.form').addEventListener('submit', function(event){

    //Evento para inibir o carregamento da pagina
    //apos pressionado o botão de submit
    event.preventDefault();

    var tr = document.createElement('tr');

    //cria novas linhas de td e atribui valor as celulas
    campos.forEach(function(campo){        
        var td = document.createElement('td');
        td.textContent = campo.value;
        tr.appendChild(td);
    });

    var tdVolume = document.createElement('td');
    tdVolume.textContent = campos[1].value * campos[2].value;

    tr.appendChild(tdVolume);    
    
    tBody.appendChild(tr);


    //limpa campos e coloca o foco no campo data
    campos[0].value = '';
    campos[1].value = 1;
    campos[2].value = 0;

    campos[0].focus();

});

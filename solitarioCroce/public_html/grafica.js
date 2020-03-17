function Grafica(dragStart, fDrop, fAutoMossa)
{
    function disegnaCampo()
    {
        disegnaTitolo(".\\Trevisane\\titolo.png");
        
        var divCampoGioco= document.createElement("div"); 
        divCampoGioco.id= "divCampoGioco";
        divCampoGioco.appendChild(creaTabellaCroce());
        
        var divMazzi= document.createElement("div");
        divMazzi.id="divMazzi";
        
        var tabMazzi= document.createElement("table");
        var riga= tabMazzi.insertRow(-1);
        var colonna= riga.insertCell(-1);
        var immagine= document.createElement("img");
        immagine.id="9";//mazzoPrincipale
        immagine.draggable= true;
        aggiungiEventi(immagine, undefined, fAutoMossa);
        colonna.appendChild(immagine);
        
        colonna= riga.insertCell(-1);
        immagine= document.createElement("img");
        immagine.id= "10";//mazzo scarti
        immagine.draggable= true;
        immagine.src= ".\\Trevisane\\vuota.png";
        aggiungiEventi(immagine, fDrop, fAutoMossa);
        colonna.appendChild(immagine);
        
        var divDebug= document.createElement("div");
        divDebug.id= "debug";
        
        divMazzi.appendChild(tabMazzi);
        divMazzi.appendChild(creaTastoRigioca());
        divMazzi.appendChild(divDebug);
        divCampoGioco.appendChild(divMazzi);
        
        document.body.appendChild(divCampoGioco);
    }
    
    function disegnaTitolo(percorso)
    {
        var divTitolo= document.createElement("div");
        divTitolo.id= "divTitolo";
        
        var titolo= document.createElement("img");
        titolo.id="titolo";
        titolo.src= percorso;
        divTitolo.appendChild(titolo);
        document.body.appendChild(divTitolo);
    }
    
    function creaTabellaCroce()
    {   
        var divTabella= document.createElement("div");
        divTabella.id="divTabellaMazzi";
        
        var tabella = document.createElement("table");
        var riga;
        var colonna;
        var immagine;
        
        riga = tabella.insertRow(-1);
        inserisciCella(riga, "0", fDrop, fAutoMossa);
        inserisciCella(riga, "1", fDrop);
        inserisciCella(riga, "2", fDrop, fAutoMossa);
        
        riga = tabella.insertRow(-1);
        inserisciCella(riga, "3", fDrop);
        inserisciCella(riga, "4", fDrop, fAutoMossa);
        inserisciCella(riga, "5", fDrop);
        
        riga = tabella.insertRow(-1);
        inserisciCella(riga, "6", fDrop, fAutoMossa);
        inserisciCella(riga, "7", fDrop);
        inserisciCella(riga, "8", fDrop, fAutoMossa);
        
        divTabella.appendChild(tabella);
        return divTabella;
        
        function inserisciCella(riga, nome, Fevento, FeventoAuto)
        {
            colonna = riga.insertCell(-1);
            immagine= document.createElement("img");
            immagine.draggable= true;
            immagine.id=nome;
            immagine.src= ".\\Trevisane\\vuota.png";           
            if(FeventoAuto===undefined)aggiungiEventi(immagine, Fevento);
            else aggiungiEventi(immagine, Fevento, FeventoAuto);
            colonna.appendChild(immagine);
        }
    }
    
    function aggiungiEventi(elemento, Fevento, FeventoAuto)
    {
        elemento.addEventListener("dragover", allowDrop);
        elemento.addEventListener("dragstart", function(){dragStart(elemento.id);});

        if(FeventoAuto!==undefined)elemento.addEventListener("dblclick", function(){fAutoMossa(elemento.id);});
        
        if(Fevento !== undefined) elemento.addEventListener("drop", function(event){event.preventDefault(); Fevento(elemento.id);});
        else elemento.addEventListener("drop", function(event){event.preventDefault();});
    }
    
    function allowDrop(event) {event.preventDefault();}//evento dragover
    
    this.mostraCarta= function(id, srcImmagine)
    {
        var img= document.getElementById(id);
        img.src= srcImmagine;
    };
    
    function creaTastoRigioca()
    {
        var divRigioca= document.createElement("div");
        divRigioca.id= "divRigioca";
        var bottone= document.createElement("INPUT");
        bottone.setAttribute("type", "button");
        bottone.value="Ricomincia";
        bottone.id="bottoneRigioca";
        bottone.onclick= function(){window.location= ".\\index.html";};
        divRigioca.appendChild(bottone);
        return divRigioca;
    }
    
    this.scriviDebug= function(testo)
    {
        document.getElementById("debug").innerHTML= testo;
    };
    
    disegnaCampo();
};
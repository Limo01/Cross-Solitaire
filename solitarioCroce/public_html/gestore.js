function Gestore()
{
    var mazzi= null;
    var mazzoScambio= null;
    var g= new Grafica(dragStart, callBackDrop, callBackDoubleClick);
    
    function inizializzaMazzi()
    {
        mazzi= [];
        for(var i=0; i<9; i++)
        {
            if(i%2===0) mazzi[i]= new MazzoDecrescente((new Enum([], "Seme"), new Enum([], "Valore")));
            else mazzi[i]= new MazzoOrdinato((new Enum([], "Seme"), new Enum([], "Valore")));
        }
        mazzi[9]= new Mazzo(Mazzo.SEMI, Mazzo.VALORI);
        mazzi[10]= new Mazzo((new Enum([], "Seme"), new Enum([], "Valore")));
        mazzi[9].creaCarte(".\\Trevisane\\");
        
        g.mostraCarta("9", mazzi[9].getImmagineCima());//mostra carta in cima al mazzo principale
    };
    
    function dragStart(indice)//evento dragstart
    {
        mazzoScambio= indice;
    }
    
    function callBackDrop(indice)//evento drop
    {
        if(mazzoScambio!==null && mazzi[mazzoScambio].getCarte()>0)
        {
            var c= mazzi[mazzoScambio].getCarta();
            var mazzo= mazzi[indice];
            
            if(!mazzo.aggiungi(c))
            {
                mazzi[mazzoScambio].aggiungi(c);
            }
            else
            {    
                g.mostraCarta(indice, c.immagine);
                
                g.mostraCarta(mazzoScambio, mazzi[mazzoScambio].getImmagineCima());
                               
                controlloVittoria();
                debug();
            }
            mazzoScambio=null;
        }
    }
    
    function callBackDoubleClick(indice)
    {
        var c= mazzi[indice].getCarta();
        
        var inserimento= false;
        for(var i=0, m=1; i<4 && !inserimento; i++, m+=2)
        { 
            if(mazzi[m].aggiungi(c))
            {
                g.mostraCarta(indice, mazzi[indice].getImmagineCima());
                g.mostraCarta(m, c.immagine);
                inserimento= true;
                debug();
                controlloVittoria();
            }
        }
        if(!inserimento) mazzi[indice].aggiungi(c);
    }
    
    function controlloVittoria()
    {
        var vittoria= true;
        
        for(var i=0, m=1; i<4 && vittoria; i++, m+=2)
        {
            vittoria= mazzi[m].getCarte()===10;
        }
        if(vittoria && confirm("Hai vinto!\nVuoi rigiocare?")) window.location= ".\\index.html";
    }
    
    function debug()
    {
        var testo= "mazzoPrincipale: "+mazzi[9].getCarte()+"<br>";
        testo+= "mazzoScarti: "+ mazzi[10].getCarte()+"<br>";
        for(var i=0, m=1; i<4; i++, m+=2) testo+="mazzoOrdinato "+i+": "+mazzi[m].getCarte()+"<br>";
        for(var i=0, m=0; i<5; i++, m+=2) testo+="mazzoDecrescente "+i+": "+mazzi[m].getCarte()+"<br>";
        g.scriviDebug(testo);
    }
    
    inizializzaMazzi();
    g.scriviDebug("La situazione dei mazzi verrà mostrata dopo aver effettuato la prima mossa valida");
};
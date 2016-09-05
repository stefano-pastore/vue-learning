# La gestione degli eventi

Supponiamo di avere un pulsante. Come intercettare gli eventi
che l'utente genera prima che la form conduca alla pagina
di chiusura dell'operazione?

```html
<div id="app">
	<form action="done.html">
		<button type="submit">Submit Me!</button>
	</form>
</div>
```

## La direttiva `v-on`

Innanzitutto per comunicare a Vue che vogliamo tener traccia dei click
che sono fatti sul pulsante, associamo la direttiva `v-on` insieme con
il tipo di azione generato dall'utente `submit`:

```html
<form action="done.html" v-on:submit="handleIt">
```

e all'interno dell'oggetto Vue, dichiariamo una funzione in questo modo:

```javascript
new Vue({
			el : "#app",
			methods : {
				handleIt : function()
				{
					console.log("Event handled!");
				}
			}
		});
```

questa funzione, per come è scritta, alla fine del metodo ci conduce alla
pagina `done.html`, ma se volessimo impedire che questo accada?

### `PreventDefault`: metodo 1

Riscriviamo la funzione `handleIt` assicurandoci di passare il parametro
che contiene le informazioni dell'evento e poi invochiamo `preventDefault`:

 ```javascript
 handleIt : function(e)
{
	console.log("Event handled!");
	e.preventDefault();
}
```

### `PreventDefault`: metodo 2

Si utilizza un modificatore di evento: la direttiva Vue diventa:

```html
<form action="done.html" v-on:submit.prevent="handleIt">
```
oppure 

```html
<form action="done.html" v-on:submit.stop="handleIt">
```

## Abbreviazione

È possibile abbreviare la direttiva utilizzando il carattere `@` nel modo seguente:

```html
<form action="done.html" @submit="handleIt">
```
e 
```html
<form action="done.html" @submit.prevent="handleIt">
```
## Riferimento a variabili di Vue da script a inserto

Suppongo di avere un pulsante con all'interno una variabile `count` definita nel mio
oggetto Vue:

```html
<button type="submit" class="btn btn-primary" @click="addOne">I have been clicked {{ count }} times</button>
```
e così inizializzata

```javascript
new Vue({
...
data : {
	count : 0
}, 
...
});
```
posso creare il metodo `addOne` ed fare riferimento alla variabile `count` 
semplicemente con la notazione `this.count`.

**Attenzione:** anziché creare il metodo `addOne` la direttiva `@click` avrebbe
anche potuto accettare un'espressione semplice come `count += 1`.

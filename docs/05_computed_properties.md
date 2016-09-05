# Computed Properties

Sono quelle proprietà che vengono *tenute d'occhio*
dal motore di Vue e cambiano dinamicamente a seconda
del valore che assumono in un determinato momento.

Supponiamo di voler determinare il livello di esperienza
di un utente sulla base dei punti che egli ha accumulato:

* **principiante** se ha meno di 100 punti;
* **intermedio** se ha tra 100 e 499 punti;
* **esperto** se ha 500 punti o più.

Scriviamo questo codice html che rappresenta una vista
sui dati dell'utente

```html
<div id="app">
	<p> Livello {{ level }} </p>
</div>
```
e associamo a questi il seguente codice javascript.

```javascript
new Vue({
	el : "#app",
	data : {
		points : 0,
	},
	computed : {
		level : function() {
			if (this.points < 100) return 'Principiante';
			else if (this.points > 100 && this.points < 500) return 'Intermedio';
			else return 'Esperto';
		}
	}
});
```

Innanzitutto inizializziamo la variabile `points` a `0`. Appena questa varia
automaticamente viene ricalcolato il valore di `level`.

A differenza degli esempi precedenti `level` non è una variabile, bensì
una funzione vera e propria. E questo ha il suo senso considerato che
queste proprietà sono definite come *computate* e che quindi debba
essere eseguita un'operazione per calcolarne il valore.
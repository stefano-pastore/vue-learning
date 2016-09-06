# Visualizzare e lavorare con le liste

Nel passo precedente abbiamo visto come iterare all'interno
del codice html in un array di dati, attraverso il costrutto
`v-for`.

## Iterare in una lista di oggetti JSON

Applichiamo esattamente quella direttiva per visualizzare
gli elementi contenuti in una lista di dati. La differenza,
però, sussiste nel fatto che questa volta gli elementi
dell'array sono oggetti json. Possiamo pertanto accedere
ai valori di ogni oggetto attraverso la sintassi del punto.

```javascript
new Vue({
	el : '#app',
	data : {
		tasks : [
			{ body : 'Sweep the floor', completed: false },
			{ body : 'Go to the store', completed: true },
			{ body : 'Prepare lunch', completed: true },
			{ body : 'Pick up kids from school', completed: false }
		]
	}
});
```

```html
<div id="app">
	<ul>
		<li v-for="task in tasks">{{ task.body }}</li>
	</ul>
</div>
```
## Aggiungere classi in maniera condizionale

Ogni oggetto JSON contenuto nell'array ha uno stato che indica se
il rispettivo compito è stato portato a termine. Possiamo visiva-
mente comunicare che quel task è finito tramite un'apposita classe.

Per far ciò è necessario però valutare l'espressione `task.completed`
e lo facciamo sfruttando le capacità del binding dinamico.

```html
<li :class="{'completed' : task.completed}" v-for="task in tasks">{{ task.body }}</li>
```

Innanzitutto i `:` segnalano al motore di Vue che si vuole fare un 
binding tra la classe e un qualcosa che gli verrà dato in pasto. La
stringa `'completed'` è la classe che sarà assegnata al tag qualora la
espressione a destra dei `:` interni sia valutata `true`.

Non è detto che il binding debba prevedere l'assegnazione di un'unica
classe. Più classi possono essere eventualmente assegnate passando un
array.

```html
<li :class="['one-class', {'two-class' : !task.completed }, {'task-completed' : task.completed}]" 
	v-for="task in tasks">
	{{ task.body }}
</li>
```
Questo snippet assegna la classe CSS `one-class` a tutti i tag `li` indiscri-
minatamente; associa la classe `two-class` a tutti i `li` aventi `task.completed`
valutata a `false`, `task-completed` se `task.completed` è `true`.

## Cambiare lo stato associato agli oggetti JSON

Supponiamo di voler permettere all'utente di cambiare dinamicamente
lo stato di completamento di un certo compito con un click.

### Definire funzione esternamente

Associamo ad ogni tag `li` l'evento `click` e invochiamo la funzione
che andiamo a definire in `methods`:

```javascript
methods : {
	toggleCompleted : function(task)
	{
		task.completed = !task.completed;
	}
}
```

```html
<ul>
	<li :class="{'task-completed' : task.completed}" 
		v-for="task in tasks"
		@click="toggleCompleted(task)">
		{{ task.body }}
	</li>
</ul>
```

### Definire la funzione inline

Oppure è sempre possibile definire la funzione in-line:

```html
<ul>
	<li :class="{'task-completed' : task.completed}" 
		v-for="task in tasks"
		@click="task.completed = !task.completed">
		{{ task.body }}
	</li>
</ul>
```
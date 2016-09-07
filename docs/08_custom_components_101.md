# Creare componenti personalizzati

Uno dei vantaggi che Vue offre è certamente la possibilità di 
creare delle etichette html personalizzate cui viene associato
un comportamento. Questo meccanismo non solo offre vantaggi
in termini di riuso del codice, ma anche di leggibilità e di
comprensione.

In questo documento andiamo a rifattorizzare il codice scritto
nell'ultimo esempio introducento componenti personalizzati.

Il componente deve creare una lista di elementi, ricevendo
in ingresso mediante un attributo, i dati di cui ha bisogno.

## Registrare il nuovo componente

La prima cosa da fare è registrare un nuovo componente, scegliere,
cioè, un nome appropriato per l'etichetta html da utilizzare.
Solitamente si scelgono nomi composti, poiché collisioni di nomi
potrebbero avere come conseguenza la rottura dell'applicazione 
o dei comportamenti non prevedibili.

Una buona pratica potrebbe essere quella di concatenare al
nome scelto la stringa `-component` o `-tag`.

```javascript
Vue.component('tasks-component', {
});
```

## Definire il template

Bisogna adesso definire il template che sarà sostituito da Vue
in luogo dell'etichetta personalizzata. Anche in questo caso 
l'identificativo deve essere unico e il codice racchiuso tra due tag
`<template></template>`.

```html
<template id="tasks-template">
	<ul>
		<li :class="{'task-completed' : task.completed}" 
			v-for="task in tasks"
			@click="toggleCompleted(task)">
			{{ task.body }}
		</li>
	</ul>
</template>
```
E specificare all'interno del codice del componente l'id del template
appena creato.

```javascript
Vue.component('tasks-component', {
	template : '#tasks-template',
});
```

## Passare i dati al template

Per ottenere i dati dall'array dobbiamo effettuare tre operazioni.

Innanzitutto bisogna dichiarare nel componente che gli è necessario 
accedere all'array `list`.

```javascript
Vue.component('tasks-component', {
	props : ['list'],
	template : '#tasks-template'
});
```

All'interno del componente facciamo il binding tra la proprietà e
il nome della lista da cui sono presi i dati.

```html
<tasks-component :list="tasks"></tasks-component>
```

Laddove il binding dinamico, stabilito a mezzo dei `:`, fa come
se trasformasse l'attributo `list` in una variabile a cui far 
riferimento all'interno del template.

```html
<template id="tasks-template">
		<ul>
			<li :class="{'task-completed' : task.completed}" 
				v-for="task in list"
				@click="toggleCompleted(task)">
				{{ task.body }}
			</li>
		</ul>
	</template>
```

Infatti la direttiva `v-for` referenzia l'array non più direttamente
con l'identificativo `task`, ma attraverso l'attributo cui è stato
legato tramite il binding.

# Aggiungere metodi per il comportamento del componente

Infine aggiungiamo la funzione `toggleCompleted` al componente.

```javascript
Vue.component('tasks-component', {
	props : ['list'],
	template : '#tasks-template',
	methods : {
		toggleCompleted : function(task)
		{
			task.completed = !task.completed;
		}
	}
});
```
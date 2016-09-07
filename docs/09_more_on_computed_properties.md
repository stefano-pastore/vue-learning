# Estendere l'app delle note

## Aggiungere un contatore

Una delle funzionalità che spesso si trovano all'interno delle
applicazioni è quella del contatore. In questo esempio si vuol
aggiungere, accanto alla lista di compiti svolti, il numero di
elementi non ancora cancellati.

Poiché il calcolo degli elementi si basa sul click dell'utente ed
è auspicabile che ad ogni click il contatore si aggiorni, si può
ricorrere all'utilizzo delle *computed properties*.

Innanzitutto creiamo la sezione html in cui visualizzare il valore.

```html
<h2> My Tasks 
	<span class="remaining-tasks">
		({{ remainingTasks }})
	</span>
</h2>
```

E rifattorizziamo i metodi del componente con dei piccoli *helper*
per diminuire la complessità del codice.

In particolare ciò che la funzione `remainingTask` fa è filtrare
all'interno della lista tutti gli elementi per i quali il valore
dell'espressione `completed` è `true` e restituirne il numero.

```javascript
Vue.component('tasks-component', {
	props : ['list'],
	template : '#tasks-template',
	methods : {
		toggleCompleted : function(task)
		{
			task.completed = !task.completed;
		},
		isCompleted : function(task)
		{
			return task.completed;
		},
		inProgress : function(task)
		{
			return ! this.isCompleted(task);
		}
	},
	computed : {
		remainingTasks : function()
		{
			return this.list.filter(this.inProgress).length;
		}
	}
});
```
Essendo `remainingTask` un metodo *computed* ogni volta che la lista
subisce delle modifiche, essa verrà invocata ed aggiora il valore
in maniera automatica.

Se la lista non dovesse più avere compiti in attesa di essere
portati a termine, nascondiamo il contatore, usando la direttiva
`v-show`.

```html
<h2> My Tasks 
	<span class="remaining-tasks" 
	v-show="remainingTasks">
		({{ remainingTasks }})
	</span>
</h2>
```

## Eliminare un task

Se questa app fosse un'applicazione reale, certamente ci si aspetterebbe
un modo per eliminare voci che non sono più di interesse. Quindi
aggiungiamo un pulsante per eliminare una certa voce e scriviamo 
la relativa funzione.

```html
<h2> My Tasks 
	<span class="remaining-tasks" 
	v-show="remainingTasks">
		({{ remainingTasks }})
	</span>
</h2>
			<ul v-show="list.length">
				<li :class="{'task-completed' : task.completed}" 
					v-for="task in list"
					@click="toggleCompleted(task)">
					{{ task.body }}
					<button @click="deleteTask(task)">Delete</button>
				</li>
			</ul>
```

Aggiungiamo ai metodi del rispettivo componente il metodo `deleteTask`

```javascript
deleteTask : function(task)
{
	this.list.$remove(task);
}
```

ponendo l'attenzione sul fatto che Vue mette a disposizione il metodo
`$remove` a cui è demandata l'operazione di cancellazione dell'array
del compito passato come parametro di ingresso.

Se l'utente dovesse cancellare tutte le voci presenti in elenco, si
potrebbe visualizzare un messaggio.

```html
<template id="tasks-template">
	<h2> My Tasks 
		<span class="remaining-tasks" 
		v-show="remainingTasks">
			({{ remainingTasks }})
		</span>
	</h2>
	<ul v-show="list.length">
		<!-- codice della gestione della lista -->
	</ul>
	<div v-else>
	<p> No tasks yet! </p>
	</div>
</template>
```
Finché `remainingTasks` contiene elementi, sono visualizzati contatore 
e lista, altrimenti il contatore scompare e in più viene visualizzato
a video un messaggio che informa l'assenza totale di elementi inseriti.

## Aggiungere un task

Come da consuetudine creiamo un nuovo componente...

```javascript
Vue.component('task-form-component', {
	template : '#task-form-template',
});
```
associamo un template, dando un nome al modello di dati con `v-model`
e predisponendo il pulsante a lanciare la funzione `addNewTask` quando
l'utente effettua il click, passando come parametro il dato contenuto
nella form...

```html
<template id="task-form-template">
	<div class="task-section">
		<h2> Add a New Task </h2>
		<input type="text" v-model="task" placeholder="Add a new task here" />
		<button class="btn btn-primary" 
				@click="addNewTask(task)" 
				v-show="task">
					Add Task
		</button>
	</div>
</template>
```
... infine poniamo il tag personalizzato nel punto della pagina in cui
serve.

```html
<div id="app">
	<tasks-component :list="tasks"></tasks-component>
	<task-form-component :list="tasks"></task-form-component>
</div>
```

Specifichiamo nell'html del componente su quale array andare ad operare.
Ed effettuiamo il binding in modo che il componente possa utilizzarlo per
le sue operazioni.

```javascript
Vue.component('task-form-component', {
	template : '#task-form-template',
	props : ['list'],
});
```

L'ultima operazione da fare è definire la funzione che provvederà a
creare un nuovo `task` e ad aggiungerlo all'array.

```javascript
Vue.component('task-form-component', {
	template : '#task-form-template',
	props : ['list'],
	methods : {
		addNewTask : function(task)
		{
			this.list.push({ body : task, completed : false });
		}
	},
	data : function()
	{
		return {
			task : ''
		};
	}
});
```
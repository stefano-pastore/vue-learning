# Passo 1: data binding

Vue.js è un framework in javascript che si basa sul modello *view-model*.

## Passi di base

Il primo passo è quello di creare un ambito in cui Vue.js possa operare,
denotandolo con id `app`.

```html
<div id="app">

</div>
```

È necessario creare poi un'istanza di Vue ed inizializzarla:

```html
<script>
	new Vue({
		el : '#app',
	});
</script>
```

## Creare il primo *data bind*

Possiamo creare una variabile js che contenga i dati da visualizzare:

```javascript
let data = {
	message : 'First data binding!'	
};
```
E nella sezione html in cui mostrare i dati usare una notazione sul tipo
delle string template:

```html
<div id="app">
	<h1>{{ message }}</h1>
</div>
```

## Data binding 

Possiamo subito osservare che il bind stabilisce una relazione 
immediata tra il modello e la vista: infatti creando un campo
di `input` correlato a `data.message`

```html
<input v-model="message"/>
```

possiamo osservare innanzitutto che l'input è automaticamente
riempito con i dati del modelo e che una modifica del contenuto del campo,
si riflette in un cambio istantaneo dell'heading.
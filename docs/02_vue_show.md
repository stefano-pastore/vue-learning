# Componenti a scomparsa

L'obiettivo di questo esercizio è quello di far comparire
un messaggio di errore e scomparire il pulsante di invio
nel caso in cui la `textarea` sia vuota e di far  
nascondere il messaggio d'errore e mostrare
pulsante di invio nel caso in cui la `textarea` contenga
almeno un carattere.

# Preparazione delle componenti

Creiamo una form che abbia tutto ciò che occore: il messaggio d'errore,
un'area per il testo e il pulsante di invio. 

```html
<div id="app">
	<form>
		<span class="error">
			You must enter a message
		</span>

		<textarea></textarea>

		<button type="submit">Send Message</button>
	</form>
</div>
```
## Applicazione del binding

Dal momento che la `textarea` è il componente da tenere d'occhio
in questo esercizio, risulta essere la candidata per il binding:

```html
<textarea v-model="message"></textarea>
```

e a questo punto creamo un'istanza di Vue, inizializzando il messaggio
alla stringa vuota:

```javascript
new Vue({
		el : '#app',
		data : {
			message : ''
		}
	});
```

## La direttiva `v-show`

Esiste un modo molto semplice di ottenere quanto ci siamo prefissati:
utilizzare la direttiva `v-show` all'interno delle componenti su
cui vogliam vedere l'effetto dell'interazione: il messaggio d'errore e
il pulsante di invio della form.

```html
<span class="error" v-show="!message">
	You must enter a message
</span>
	<!-- altro codice html qua -->
<button type="submit" v-show="message">Send Message</button>
```

la direttiva `v-show` accetta come parametro un'espressione semplice
che possa valutare: a seconda della logica, se risulta vera, il componente
a cui è applicata appare, viceversa, scompare.
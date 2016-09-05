# Cenni sui componenti

Supponiamo d'aver bisogno di due pulsanti che facciano da contatore,
non è mai bene ripetere il codice, per cui Vue, come qualsiasi
tool che si rispetti, mette a disposizione un meccanismo per il riutilizzo:
i **component**.

In soldoni all'interno dell'area html su cui Vue ha giurisdizione,
definiamo dei tag html personalizzati mediante un costrutto per
definire template.

Nello script definiamo un oggetto componente globale che mappa
il tag da noi creato con del codice html valido.

I tag personalizzati definiti come di seguito

```html
<div id="app">
	<counter subject="Likes"></counter>
	<counter subject="Dislikes"></counter>
</div>
```
si basano sul template sottostante

```html
<template id="counter-template">
	<div class="counter">
		<h1>{{ subject }}</h1>
		<button @click="count += 1">{{ count }}</button>
	</div>
</template>
```

adesso possiamo definire un oggetto Vue globale che
gestisce l'inizializzazione e la mappatura:

```javascript
Vue.component('counter', {
	template : '#counter-template',
	props : ['subject'],
	data : function() {
		return { count: 0 };
	}
});
```

laddove:
* il primo parametro da passare al metodo `component` è il nome del 
tag html personalizzato che abbiamo creato;
* `template` indica quale snippet di codice html andare a sostituire
al tag html personalizzato;
* `props` sta per *properties* e indica quali proprietà del tag html
personalizzato utilizzare;
* `data` contiene i dati da associare, ma diversamente da quanto visto
fin'ora, per garantire che ogni componente abbia una variabile `count`
differente e non condivisa, la racchiudiamo all'interno di una funzione
anonima.
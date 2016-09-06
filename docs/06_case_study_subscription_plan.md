# Un caso di studio: sottoscrivere un abbonamento

In questo esercizio pratico ci occuperemo di sviluppare una
piccola app che permetta all'utente di scegliere uno tra
i piani offerti sulla pagina.

Di base ad ogni utente è offerto un abbonamento gratuito.

Egli può decidere se effettuare un upgrade per ottenere un pac-
chetto a maggior prezzo oppure un downgrade per risparmiare.

## I componenti

Per ciò che questa applicazione richiede, è certamente pensabile
di strutturarla mediante componenti Vue personalizzati. Innanzitutto
iniziamo a popolare l'area dati: includiamo all'interno di un array
oggetti contenenti le informazioni relative ad ogni piano.

```javascript
new Vue({
	el : "#app",
	data : {
			plans : [
				{ name : 'Enterprise', price : 100 },
				{ name : 'Professional', price : 50 },
				{ name : 'Starter', price : 25 },
				{ name : 'Free', price : 0 }
			]
		}
});
```

Creiamo a questo punto il nostro template per il relativo tag html.

```html
	<template id="plan-template">
		<div class="plan">
			<span> {{ plan.name }} </span>
			<span> {{ plan.price }}/month </span>
			<button>Subscribe</button>
		</div>
	</template>
```

Ed inseriamo il custom template all'interno del `div#app`.

```html
<div v-for="plan in plans">
	<plan :plan="plan" :active="active"></plan>
</div>
```
Questo snippet ha delle direttive nuove che qui di seguito sono
brevemente illustrate:

* `v-for` è l'equivalente di `foreach` in php e consente, in questo caso,
di iterare sull'array `plans` di piani da sottoscrivere, presente nella 
sezione dei dati;
* `:plan="plan"` permette di effettuare un binding dinamico con i contenu-
ti recuperati durante l'iterazione, infatti l'operatore `:` segnala al
motore di Vue che quella variabile è *parametrica* e deve essere sostituita
dinamicamente, se non vi fosse `plan` non sarebbe altro che un attributo del
tag e a destra dell'uguale il suo relativo valore.

Infine dichiariamo e registriamo i componenti all'interno dell'oggetto Vue,
facendo attenzione a passare anche i dati relativi ai piani in modo che i
tag personalizzati possano essere correttamente popolati.

```javascript
new Vue({
	el : "#app",
	data : {
			plans : [
				{ name : 'Enterprise', price : 100 },
				{ name : 'Professional', price : 50 },
				{ name : 'Starter', price : 25 },
				{ name : 'Free', price : 0 }
			]
		},
	components : {
			plan : {
				template : '#plan-template',
				props : ['plan']
			}
		}
});
```

## Sottoscrivere un piano

A questo punto i pulsanti ancora non hanno alcuna funzione. Quindi
al momento del click, lanceremo la funzione `setActivePlan` che si
occuperà di impostare il piano relativo come attivo e corrente e di
determinare se stiamo selezionando un upgrade o un downgrade.

```html
<template id="plan-template">
	<div class="plan">
		<span class="plan-name"> {{ plan.name }} </span>
		<span class="plan-price"> {{ plan.price }}/month </span>
		<button class="btn btn-primary" @click="setActivePlan">{{isUpgrade}}</button>
	</div>
</template>
```

```javascript
components : {
		plan : {
			template : '#plan-template',
			props : ['plan', 'active'],
			computed : {
				isUpgrade : function()
				{
					if (this.plan.price > this.active.price)
						return 'Upgrade';
					else
						return 'Downgrade';
				}
			},
			methods : {
				setActivePlan : function()
				{
					this.active = this.plan;
				}
			}
		}
	}
```
Tuttavia a questo stadio, il codice ancora non funziona correttamente perché
abbiamo bisogno di un meccanismo chiave: ogni istanza di componente custom
ha associato una variabile `active` per determinare se esso è stato selezionato
oppure no e, in più, il componente intero ha per sé una variabile `active` 
che contiene il piano correntemente attivo tra quelli disponibili in lista.

In particolare c'è bisogno che la variabile *globale* sia in una qualche maniera
in sincrono con le singole variabili locali.

Per far questo aggiungiamo il verbo `sync`:

```html
<plan :plan="plan" :active.sync="active"></plan>
```
Ed infine per nascondere il pulsante del piano sottoscritto

```html
<button class="btn btn-primary" @click="setActivePlan" v-show="plan.name !== active.name">{{isUpgrade}}</button>
```

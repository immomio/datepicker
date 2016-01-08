Aufgabe: Datepicker
-------------------

JavaScript sieht gut aus, einige Kommentare wären nicht schlecht gewesen. z.B. Warum welche Entscheidung getroffen wurde.

Gute Wahl Grunt einzubinden, wir nutzen intern Gulp, Grunt ist aber genauso gut.

Ich habe das Grunt-Setup um Browsersync erweitert, damit das lästige Neuladen des Browsers entfällt, und direkt ein Statischer Webserver läuft.

Das nutzen einer Externen Bibliothek ist im Normalfall natürlich erlaubt und auch sinnvoll, für eine Aufgabe, die das Schreiben eines Datepickers vorsieht, allerdings eine Bibliothek zu nutzen, die genau dieses macht, nicht sehr günstig.

jQuery UI hat selbst seine Probleme, der Bugtracker ist nicht gerade leer. Beim ausprobieren ist mir aufgefallen das bei einem Resize des Fensters der Datepicker eingeblendet bleibt und nicht neu gerendert wird.

Im CSS und HTML sind id-Selektoren genutzt. Diese sollte in jedem Fall überall vermieden werden, es schränkt die Wiederverwendbarkeit jedes Codes sehr stark ein.

TODO
-------------------

* Entfernen von jQuery, es sollten "keine" extra Bibliotheken genutzt werden.
* Ändern des Datenformates, es sollte null oder Date (JS oder moment) als Datenformate genutzt werden
Feladat 2
Egy végtelenül egyszerű TODO appot fogunk csinálni, amin a CRUD műveletek mindegyikét tudjátok gyakorolni:
Van egy get típusú notes végpont ami az összes elemét lehívja a listának.
Van egy get note végpont ami id alapján egy darab bejegyzést fog lehívni
van egy post típusú add végpont ahova el tudjuk küldeni a bejegyzésünket. json formátumban kell küldenünk a bejegyzést. a jsonnek tartalmaznia kell az id-t és a leírást.
Van egy update végpontunk, ami megkapja az id-t és az alapján módosítja a jegyzetet a bodyban elküldött leírásra
És végül van egy delete végpontunk

Ami fontos, hogy szeparáljátok el az apikat egymástól és legyenek service-eitek. Opcionálisan hibakezelést is tehettek bele. Ha nem fér bele az időbe, az sem gond, akkor majd jövő héten:)

Adatbázishoz nem kell csatlakozni, csak in memory legyenek meg a dolgok. Illetve frontend sem kell részemről, ha postman hívásokra visszakülditek a json objekteket, az tökéletes. Sőt, inkább ezzel mennék most. a templatinget meg majd legközelebb adjuk hozzá. (adott esetben másik routeon amúgy, hogy megmaradjanak az apik :)

A body parser valószínűleg hasznos lesz nektek.
Error handling -re itt és itt találtok jó leírásokat.

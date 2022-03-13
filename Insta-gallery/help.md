<h1>Za Jukija :smile: </h1>

<h2>Uvod</h2> 

Radio sam na Linuxu. Imao sam problem sa prevelikom brojem fajlova koji se watch-uju. 
Za slucaj da imas isti problem, ovo je [link](https://github.com/facebook/create-react-app/issues/7612) koji je resio moj problem:

Konkretno komanda koja je odradila posao je:

`$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf`

`$ sudo sysctl -p`


[Tutorijal](https://codeburst.io/react-360-by-example-part-1-c652443cfd8a) koji mi je pomogao da odradim posao za koji sam napravio PR je na linku.

<h2> Sta sam naucio:</h2>

Korisne stvari koje sam naucio/potvrdio, a mislim da ce ti znaciti u radu:

* Ne mogu da se prave custom 3D oblici, ali mogu da se ubacuju gotovi modeli.

> React 360 intentionally does not contain primitive elements like boxes and spheres – instead, it is designed to import prepared objects. You can build larger scenes from these elements.

* Na surface kacis 2D grafiku, na Location kacis 3D grafiku. Kad koristis Surface racunas u px.

* Ukoliko ti bude potrebno da odradis animaciju, korists `Animated` objekat. Animacija se u tom slucaju ne primenjuje konstantnim
rerenderovanjem, vec trigerovanjem iventa u Animated objektu, kako stoji u dokumentaciji.

* React360 je umnogome baziran na React Native-u pa racunam da se ti i lakse snadjes od mene. Stilovi su recimo isti kao tamo. Na primer, `<View>` posmatraj samo kao wrapper za stilizovanje koji ima u sebi display: flex

* Kod se deli na dva dela - Rijekt aplikacije i koda koji pretvara Rijekt komponente u 3D elemente na ekranu (runtime).
Prvi deo se nalazi u `index.js`, a drugi u `client.js` fajlu.

* Ukoliko koristis Surface tipa Cylinder preporucuje se maksimalna visina do 720px.

* Cylindar je uvek ispred korisnika dok Flat moze da se pomera.

* Da bi renderovao komponentu koristeci `Surface` ona mora biti registrovana u `AppRegistry`-ju, na osnovu kog `client.js` (runtime)
zna da preko tim stringom referencira odredjenu komponentu.

* Lokacija koristi metar kao jedinicu, ne px. Podrazumevana lokacija kamere je (0, 0, 0). Lokacije su pravljene tako da budu pokretne. 
Za to se koriste fje: `setWorldPosition(x, y, z)` i `setWorldRotation(x, y, z)`.

* Za komunikaciju izmedju komponenti (Surface-a) se preporucuje globalno skladiste. Recimo, Redux.

[Primer](https://facebook.github.io/react-360/docs/example-multisurface.html): 

* Entity komponenta se koristi za renderovanje 3D objekata. Prihvata i `.gltf` i `.obj` fajlove kako navodi zvanicna dokumentacija.

* Transformacije se primenjuju sleva na desno. Klasika.


<h2>Audio:</h2>

* Audiom se u potpunosti manipulise preko `AudioModule`-a koji je `Native Modul`.

* `Environmental` audio ide sve vreme u pozadini, ima loop. (playEnvironmental)

* Za zvuke koji treba jednom da se cuju, kao sto je klik na dugme, postoji funkcija `AudioModule.playOneShoot`.

* Postoji mogucnost kreiranja 3D audio zvuka koji dolazi sa specificne lokacije. is3d properti se koristi.

<h2> P.S. </h2>

**Napomena:**

- Verovatno treba da radi i na telefonu?


**Ideja za App:**

* Mozda da ubacimo i neki video. Klikom na sliku da se otvori video i da se gleda. Tu ce verovatno da bude najteze naci dobar video.

* Sve vreme da ide u pozadini muzika neka lagana, samo da ne bude zajebancija sa pustanjem zvukova za slike. Ce vidimo. Mada mozda i nije lose da ide jedno preko drugog kao u igricama. 

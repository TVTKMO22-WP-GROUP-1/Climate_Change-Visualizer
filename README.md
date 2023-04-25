# Climate Change Visualizer – Ilmastonmuutoksen havainnollistamisen projekti

Tekijät: Sampo Sarlin, Sampo Ikonen, Samuli Järvensivu ja Tuomas Jokikokko

Linkki palvelimelle: https://climate-app-static.onrender.com/

Linkki GitHub-repositorioon: https://github.com/TVTKMO22-WP-GROUP-1/Climate_Change-Visualizer

## Esittely

Climate Change Visualizer on Oulun ammattikorkeakoulun 2. vuosikurssin opiskelijoiden toteuttama web-sovellusprojekti. Projektissa toteutettiin neljän hengen ryhmätyönä web-sivu, joka erilaisin graafein ja diagrammein havainnollistaa ilmastonmuutoksen etenemistä. Diagrammeista voidaan valita maa, jonka vaikutusta ilmastonmuutokseen halutaan tarkastella. Graafit tuodaan web-sivulle ChartJS:n avulla näkyviin, ja graafeihin liittyvät tiedot on tallennettu tietokantaan. Käyttäjät voivat tehdä sivustolle oman tunnuksen.
Jokainen projektiryhmän jäsen toimi Full Stack -kehittäjänä, eli työsti sekä front- että backend-puolia. Projektin frontend toteutettiin Reactilla ja backend Javalla. Tietokantayhteys luotiin PostgreSQL-alustalle, ja web-sivu julkaistiin kaikkien saataville Render-palvelun avulla. Kirjaamisympäristönä toimi Visual Studio Code, ja versionhallintaa varten käytettiin GitHub-työympäristöä. GitHubin organisaatio- ja projektityökalua käytettiin työtehtävien jakamiseen ja projektin etenemisen havainnointiin.

## Sovelluksen toiminnallisuudet

### Etusivu

Asiakaskäyttöliittymän yläosassa on projektin nimen lisäksi lomakemuotoinen pohja rekisteröitymiseen, kirjautumiseen ja tunnuksen poistamiseen. Lomakepohjan alapuolelle on sijoitettu visualisaationäkymät kahteen osioon N1 ja N2. N1 sisältää visualisaationäkymät V1–V3 ja N2 sisältää V4- ja V5-näkymät.

![climate_frontPage](https://i.ibb.co/gvQrwPY/etusivu.png)

*Kuva 1: Etusivu*

### Rekisteröityminen, kirjautuminen ja tunnuksen poistaminen

Rekisteröitymisessä käyttäjä luo itselleen käyttäjätunnuksen ja salasanan. Käyttäjätunnus ja salasana säilyvät tietokannassa, salasana kryptattuna bcrypt-menetelmällä. Sisäänkirjautuminen tapahtuu käyttäjätunnuksen ja salasanan avulla lomakepohjalla.

![climate_registerWindow](https://i.ibb.co/P94g7cq/rekist.png)

*Kuva 2: Rekisteröitymisikkuna*

![climate_loginWindow](https://i.ibb.co/58ZPSNK/login.png)

*Kuva 3: Kirjautumisikkuna*

Tunnuksen poistaminen onnistuu käyttäjän niin halutessa etusivulla sijaitsevan napin painalluksella. Nappi tulee näkyviin silloin, kun käyttäjä on kirjautunut sisään. Nappi vie tunnuksen poistamiseen tarkoitetulle sivulle.

![climate_deleteWindow](https://i.ibb.co/3dhyj8Q/delete-Window.png)

*Kuva 4: Tunnuksen poistamisen ikkuna*

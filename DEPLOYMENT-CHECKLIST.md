# CleanSip.ch Deployment Checkliste

## ✅ Erledigte Schritte

1. **Projektstruktur analysiert**
   - Vite + React Frontend
   - Express.js Backend
   - Shopify Integration implementiert
   - Alle notwendigen Komponenten vorhanden

2. **Build-Konfiguration geprüft**
   - Build-Befehl: `npm run build`
   - Output: `dist/` Verzeichnis
   - Frontend: `dist/public/`
   - Backend: `dist/index.js`

3. **Umgebungsvariablen vorbereitet**
   - `.env.example` erstellt
   - Sensitive Daten in `.env` geschützt
   - `.gitignore` konfiguriert

4. **Vercel-Konfiguration erstellt**
   - `vercel.json` mit korrekten Rewrites
   - Build-Command definiert
   - Output-Directory konfiguriert

5. **GitHub Repository aktualisiert**
   - Alle Änderungen committed
   - Erfolgreich nach GitHub gepusht

6. **Build-Dependencies korrigiert**
   - Vite und Build-Tools in dependencies verschoben
   - Build lokal erfolgreich getestet
   - Package.json für Vercel optimiert

## 📋 Nächste Schritte für Vercel Deployment

### 1. Vercel Account einrichten
- Gehe zu [vercel.com](https://vercel.com)
- Melde dich mit deinem GitHub Account an

### 2. Neues Projekt importieren
- Klicke auf "New Project"
- Wähle das Repository: `Barnabus367/cleansip.ch-replit`
- Vercel erkennt automatisch die `vercel.json`

### 3. Umgebungsvariablen konfigurieren
Füge folgende Variablen in den Vercel Project Settings hinzu:

```
SHOPIFY_STORE_DOMAIN=jufprz-44.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=3f686c1deba9e9533ccf323c9a0c86e6
SESSION_SECRET=[generiere einen sicheren zufälligen String]
NODE_ENV=production
```

### 4. Deploy starten
- Klicke auf "Deploy"
- Vercel führt automatisch `npm install` und `npm run build` aus
- Nach ca. 2-3 Minuten ist die Seite live

### 5. Custom Domain einrichten (optional)
- In den Project Settings → Domains
- Füge `cleansip.ch` hinzu
- Folge den DNS-Anweisungen

## 🔍 Wichtige Hinweise

- **Shopify Integration**: Die aktuellen Credentials sind bereits konfiguriert
- **Performance**: Der Build ist optimiert, aber zeigt Warnungen für große Chunks (>500KB)
- **Bilder**: Alle Produktbilder sind im Build enthalten
- **API Routes**: Werden über `/api/*` an den Express Server weitergeleitet

## 🚀 Status
**Das Projekt ist bereit für das Vercel Deployment!**

Die Seite wird nach dem Deployment unter folgender URL erreichbar sein:
- `https://[projekt-name].vercel.app`
- Oder mit Custom Domain: `https://cleansip.ch`
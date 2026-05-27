**Scrumboard**  
Scrumboard är en applikation där man kan hantera uppgifter i ett projekt med 3 olika kategorier.  

---------------------
Funktioner:
- lägga till nya uppgifter
- tilldela uppgifter till en person 
- redigera existerande uppgifter 
- radera slutförda uppgifter
- ändra status på uppgifter (to do/doing/done)  

---------------------
- Backend kör Node.js med Express och hanterar API:et (körs på egen port)
- Frontend kör Vite och hanterar användargränssnittet (körs på en annan port)
- De körs separat och använder CORS för kommunikation

---------------------
- Här är en överblick över filstrukturen:  
root/  
├── backend/  
│   ├── app.ts   
│   ├── package.json  
│   ├── package-lock.json  
│   ├── scrumboard.db  (SQLite-databasen)  
│   ├── server.ts  
│   ├── tsconfig.json  
│   ├── src/    
│   │   ├── database/    (All logik för att hantera databasen)                   
│   │   |  ├── database.controller.ts  
│   │   |  ├── database.statements.ts  
│   │   |  ├── database.config.ts  
│   │   ├── models/      (TS typer)  
│   │   |  ├── tasks.types.ts  
│   │   ├── routes/      (Definierar API-endpoints och kopplar requests till rätt funktioner)  
│   │   |  ├── task.route.ts  
├── frontend/
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── style.css
│   ├── src/
│   │   ├── api.ts       (hanterar HTTP request & response)
│   │   ├── main.ts      (renderar kort)
│   │   ├── render.ts    (skapar kort)
│   │   ├── types.ts     (TS-typer)

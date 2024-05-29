## GAS-NODE-CLASP-REACT Project Build Instructions

This project leverages node.js, CLASP (Command Line Apps Script Projects), Parcel JS and React JS to build and deploy a Google Apps Script (GAS) project to a google account.

Inspired by:https://www.youtube.com/watch?v=aq2B02DuCs0

### Prerequisites

- IDE (recommend [Microsoft Visual Code](https://code.visualstudio.com/))
- [nodejs.org](https://nodejs.org) installation
- clasp: https://github.com/google/clasp 
-  Google Apps Script (GAS) TypeScript definitions: [https://github.com/google/clasp/blob/master/docs/typescript.md](https://github.com/google/clasp/blob/master/docs/typescript.md)
- https://parceljs.org/

### NODE & clasp Installation

1. Create new project folder.
2. In root folder:
    - 1. Create new node.js project: `$ npm init -y`
    - 2. Install clasp for the local project: `npm install -D @google/clasp`
    - 3. Install GAS TypeScript definition: ` $ npm i -S @types/google-apps-script `

### NODE & clasp Setup
1. Update `scripts` section of `package.json` file in base folder to make clasp calls. 
Example: `package.json`
```javascript
{
  "name": "gas-node-clasp",
  "version": "1.0.0",
  "description": "Project for Google Apps Script, clasp and node.js",
  "scripts": {
    "glogin": "clasp login",
    "glogout": "clasp logout",
    "gcreate": "clasp create --type standalone --title 'gas-node-clasp-webapp' --rootDir ./apps-script",
    "gpull": "clasp pull",
    "gpush": "clasp push",
    "gwatch": "clasp push --watch",
    "gopen-webapp": "clasp open --webapp",
    "gdeploy": "clasp deploy --description",
    "gundeploy-all": "clasp undeploy --all"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@google/clasp": "^2.4.2",
    "@types/google-apps-script": "^1.0.83"
  }
}
  ```

2. Create `./apps-script` folder

3. **Authenticate** `clasp` via node.js project:
    - Run: `npm run glogin`
    - A browser window should launch directing you to a google authentication page.
    - Follow instructions to allow clasp access to the google account being used.

4. **Create new Google Apps Script (GAS) project**:
```
$ npm run gcreate
> gas-node-clasp@1.0.0 gcreate
> clasp create --type standalone --title 'gas-node-clasp-webapp' --rootDir ./apps-script

Created new standalone script: https://script.google.com/d/1PhXXh5ORFVFa8R2S-6qI-doeKIUXFWhoOfVPivhmqBGsXHhWPlmpsYuu/edit
```
5. **Move** `.clasp.json` file created in `./apps-script` folder to `./` (base folder). 
Example `.clasp.json`:
```
{"scriptId":"1PhXXh5ORFVFa8R2S-6qI-doeKIUXFWhoOfVPivhmqBGsXHhWPlmpsYuu","rootDir":"./apps-script"}
```

### Google Apps Script (GAS) Setup
1. **Create** `./apps-script/index.html` file
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>GAS-NODE-CLASP</title>
</head>
<body>
  <h1>Main Form</h1>
</body>
</html>
```
2. **Create** GAS `doGet` function in new `./apps-script/main.js` file returning `index.html` file.
```javascript
function doGet(){
    return HtmlService.createHtmlOutputFromFile("index")
    .addMetaTag("viewport","width=device-width, initial-scale=1.0");
}
```

3. **Push** GAS files to GAS project: `npm run gpush`
```
$ npm run gpush

> gas-node-clasp@1.0.0 gpush
> clasp push

? Manifest file has been updated. Do you want to push and overwrite? Yes
└─ apps-script/appsscript.json
└─ apps-script/index.html
└─ apps-script/main.js
Pushed 3 files.
```
4. **Create** new GAS webapp deployment: `npm run gdeploy "<deployment description>"`
```
$ npm run gdeploy "base deployment"

> gas-node-clasp@1.0.0 gdeploy
> clasp deploy --description base deployment

Created version 1.
- AKfycbxFouY19Gzzlors7JmG1TnLd2A_4iEtsE7Gy8xiiwPUDie_UXeR08zv-Jfm75ETRjG1 @1.
```

4. **Verify** new GAS webapp deployment `npm run gopen-webapp`
```
$npm run gopen-webapp

> gas-node-clasp@1.0.0 gopen-webapp
> clasp open --webapp

? Open which deployment? base deployment               @1    - AKfycbxFouY19Gzzlors7JmG1TnLd2A_4iEtsE7Gy8xiiwPUDie_UXeR08zv-Jfm75ETRjG1
Opening web application: AKfycbxFouY19Gzzlors7JmG1TnLd2A_4iEtsE7Gy8xiiwPUDie_UXeR08zv-Jfm75ETRjG1
```

### React JS Install Using Parcel JS
1. **Install react** and **react-dom**: `npm install react react-dom`
2. **Install** `parcel` locally: `npm install --save-dev parcel`. Verify package.json updated to include parcel. Example:
```javascript
  "devDependencies": {
    "@google/clasp": "^2.4.2",
    "@types/google-apps-script": "^1.0.83",
    "parcel": "^2.12.0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
```

### React JS Setup Using Parcel JS

1. **Create** a new folder `src` for React source files.
2. **Create** new `./src/App.js` file as follows:
```javascript
function App() {
    return <div>
           <h1>Hello from Parcel and React!!</h1>
           </div>
}

export default App
``` 
2. **Create** a new file `./src/index.js` as follows:
```javascript
import ReactDOM from "react-dom"
import App from "./App"

const app = document.getElementById("app")
ReactDOM.render(<App />, app)
```
3. **Create** a new file `./src/index.html` as follows:
    - **NOTE**: Name of HTML file must match name of GAS HTML file created `./apps-script` folder
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>REACT Main Page</title>
</head>
<body>
    <div id="app"></div>
    <script type="module">
        import "./index.js"
    </script>
</body>
</html>
```
4. **Update** `package.json` to create new `parcel` build scripts:
    - **NOTE**: These parcel calls will overwrite `./apps-script/index.html` with the rendered version of the `./src/index.html`
```javascript
    "test-build-react-app": "parcel src/index.html --dist-dir ./apps-script",
    "build-react-app": "parcel build src/index.html --dist-dir ./apps-script"
```
Example `package.json`:
```javascript
{
  "name": "gas-node-clasp",
  "version": "1.0.0",
  "description": "Project for Google Apps Script, clasp and node.js",
  "scripts": {
    "glogin": "clasp login",
    "glogout": "clasp logout",
    "gcreate": "clasp create --type standalone --title 'gas-node-clasp-react' --rootDir ./apps-script",
    "gpull": "clasp pull",
    "gpush": "clasp push",
    "gpush-watch": "clasp push --watch",
    "gopen-webapp": "clasp open --webapp",
    "gdeploy": "clasp deploy --description",
    "gundeploy-all": "clasp undeploy --all",
    "test-build-react-app": "parcel src/index.html --dist-dir ./apps-script",
    "build-react-app": "parcel build src/index.html --dist-dir ./apps-script"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@google/clasp": "^2.4.2",
    "@types/google-apps-script": "^1.0.83",
    "parcel": "^2.12.0",
    "process": "^0.11.10"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

### Build And Deploy
1. **Test** GAS `index.html` **build** via Parcel JS leveraging React JS: `npm run test-build-react-app`.
    Successful build example:
```
Executing task: npm run test-build-react-app 

> gas-node-clasp@1.0.0 test-build-react-app
> parcel src/index.html --dist-dir ./apps-script

Server running at http://localhost:1234
✨ Built in 242ms
```

<IMG HERE>

2. Execute **production build** of of GAS `index.html` build via parcel: `npm run test-build-react-app`

    Successful build example:
```
Executing task: npm run build-react-app 

> gas-node-clasp@1.0.0 build-react-app
> parcel build src/index.html --dist-dir ./apps-script

✨ Built in 2.09s

apps-script/index.html    139.47 KB    983ms
```

3. **Deploy** GAS project to google via clasp: `npm run gpush`

    Successful push example:
```
Executing task: npm run gpush 

> gas-node-clasp@1.0.0 gpush
> clasp push

└─ apps-script/appsscript.json
└─ apps-script/index.html
└─ apps-script/main.js
Pushed 3 files.
```

4. **Verify GAS project renders** React JS:  `npm run gopen-webapp` 
```
Executing task: npm run gopen-webapp

> gas-node-clasp@1.0.0 gopen-webapp
> clasp open --webapp

? Open which deployment?                               @HEAD - AKfycbzH9eJj22BdzKJDbXqvUHCwm4InMvCB12UynrEQrNQ
Opening web application: AKfycbzH9eJj22BdzKJDbXqvUHCwm4InMvCB12UynrEQrNQ
```
![image](https://github.com/bullishpip/gas-node-clasp-react/assets/686487/f5e3833b-31ba-4de2-a8db-52a7f2a7b772)

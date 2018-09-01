## Generación del Proyecto Angular
```
ng new client --routing  --style scss --prefix cw
```

## Instalación de Dependencias
```
npm install  @ng-bootstrap/ng-bootstrap moment lodash ngx-perfect-scrollbar --save
```


Configuro ng-bootstrap
https://www.youtube.com/watch?v=D68e2JiM0Fs
ng-boostrap también necesita el archivo de estilos css el cual deberá ser importado en angular-cli.json
Importar NgModule en app.module.ts:

```
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  ...
  imports: [NgbModule, ...],
  ...
})
export class YourAppModule {
}
```

Importar BrowserAnimationsModule al app.module-ts:


## Dependencias que no se necesitan

```
npm install @angular/material angular/cdk --save
```

## Generación de modulos
Crear modulo que es parte del app.module

+ Modulos Content:



```
ng g module content/partials --module app
```

A continuación se generará un modulo con carga diferida:
```
ng g module content/pages --routing
```


+ Modulos Core:

```
ng g module core --module app
```
```
ng g module core/auth/authentication --module app
```

+ Sobre Lazy Load

En la definición de rutas de modulos de carga diferida, la ruta puede ser relativa o absoluta;
1) Puede usar un ruta relativa como:
```
./membros/membro.module#MembroModule
```
2) Ruta absoluta:
```
app/membros/membro.module#MembroModule
```
En esta última debe asegurarse de que src/tsconfig.json tenga lo siguiente:
```
{
  ...,
  "compilerOptions": {
    ...,
    baseUrl: "./"
  }
}
```

## Generación de Componentes

```
ng g component content/pages --module content/pages --spec=false -is
```

## Layout
```
ng g module content/layout --module app
```
```
ng g component content/layout/header --module content/layout --spec=false
```





```
ng g c pages/main --flat --spec=false
```
genera el componente en pages pero los archivos quedan sueltos.
no crea el archivo spec

Crear Servicio
```
ng g s services/miservicio --spec=false
```

## Generación de Web Components


## Importar assets del proyecto
apps: 
+ media\img: estan las imágenes

demo: 
+ default\base: tiene estilos style.bundle.css y style.bundle.rtl.css, tiene un js scrpt.bundle
+ default\base\style.bundle.css: utilizado actualmente por el template. Da estilos de bootstrap
+ default\base\scripts.bundle.js: utilizado actualmente por el template.


Copiar en carpeta de imagenes
src\assets\app\media\img
en src\assets\images


## Levantar el Cliente

```
ng serve --port 4201 -o
```

## Angular en Producción

Instalar dependencia que permite levantar servidor desde terminal:

```
npm install -g http-server
```

Correr la app en producción:

```
http-server dist
```


# Iconos

## Material Icons
Agregar la fuente al index.html
```
<link href="https://fonts/googleapis.com/icon?familyMaterial+Icons" rel="stylesheet">
```
## Font Awesome 5

https://github.com/FortAwesome/angular-fontawesome
https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers

npm install --save-dev @fortawesome/fontawesome-free

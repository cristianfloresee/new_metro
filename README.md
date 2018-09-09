## Generación del Proyecto Angular
```
ng new client --routing  --style scss --prefix cw
```

## Instalación de Dependencias
```
npm install  @ng-bootstrap/ng-bootstrap moment lodash ngx-perfect-scrollbar @ngx-loading-bar/core @angular/material @angular/cdk @angular/animations hammerjs --save
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

ng g directive core/directives/menu-horizontal-offcanvas --module core --spec=false

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

# 2 Instalar Componentes del Modulo Layout
```
ng g module content/layout --module app

```

ng g module content/pages/auth --module app
ng g component content/pages/auth -is --spec=false
ng g component content/pages/auth/login --spec=false
ng g component content/pages/auth/auth-notice --spec=false
ng g component content/pages/auth/forgot-password --spec=false
ng g component content/pages/auth/register --spec=false









```
ng g component content/layout/header --module content/layout --spec=false
ng g component content/layout/footer --module content/layout --spec=false  -is
```

## 2.1 Instalar Componentes del Header
```
ng g component content/layout/header/brand --module content/layout --spec=false -is
ng g component content/layout/header/menu-horizontal --module content/layout --spec=false -is
ng g component content/layout/header/topbar --module content/layout --spec=false -is
```

## 2.1.1 Instalar Componentes del Header > Topbar
```
ng g component content/layout/header/topbar/user-profile --module content/layout --spec=false -is
ng g component content/layout/header/topbar/quick-action --module content/layout --spec=false -is
ng g component content/layout/header/topbar/search-dropdown --module content/layout --spec=false -is
ng g component content/layout/header/topbar/notification --module content/layout --spec=false

```




## Instalar Componentes de Pages

```
ng g c pages/main --flat --spec=false
```
--flat: genera el componente en pages pero los archivos quedan sueltos.
--spec=false: no crea el archivo spec

## Instalar Componentes de Pages > Header

```
ng g component content/pages/header/action --module content/pages --spec=false -is
ng g component content/pages/header/profile --module content/pages --spec=false -is
```







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

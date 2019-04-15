# Manejo de sesiones en tiempo real con socket.io

Actualmente la lista de usuarios conectados en tiempo real se almacena en variables array dentro de la aplicación `express.js`.

# 1. Uso de variables

Variable                            | Descripción
------------------------------------|------------------------------
users_conected                      | Lista de usuarios conectados (administradores, profesores y estudiantes).   
student_participants_of_a_question  | -- 
students_in_classrooms              | -- 

Estructura del array `users conected`:

```js
[
  {
    id_user: 1,
    id_socket: "uPkLyvLu2Rt59fUZAAAD",
    role: 1
  },
  {
    id_user: 1,
    id_socket: "SwLHxNkw3wgJ3nBEAAAH",
    role: 2
  },
  ...
]

```

Estructura del array `students_in_classrooms`:

```js
[
  {
    id_user: string,
    id_socket: string,
    role:
  },
  {
     ...
  },
  ...
]

```

# Estados de los Participantes

Se refiere a cuando un estudiante ya esta dentro de la sesión por lo cual nunca existirá el estado desconectado.

Estado                              | Descripción
------------------------------------|------------------------------
users_conected                      | Listado de usuarios conectados junto a sus cursos.
student_participants_of_a_question  | -- 
students_in_classrooms              | -- 



## 2.1. Estados de una Sesión de Clase

Existen 4 estados de sesión que el estudiante puede ver mientras este dentro de ella.

Estado                   | Descripción
-------------------------|------------------------------
esperando pregunta       | El profesor ha iniciado una pregunta.
pregunta iniciada        | El profesor esta esperando que estudiantes decidan participar por responder.
seleccionando estudiante | El profesor pausa la participación y comienza a seleccionar un estudiante.
estudiante respondiendo  | El estudiante fue seleccionado y debe responder a la clase.
sesión finalizada        | El profesor ha finalizado la sesión.

Por otro lado, tanto el profesor como el estudiante mientras no entren verán unos de los 3 siguientes estados para la clase.

Estado       | Descripción
-------------|------------------------------
activa       | Los estudiantes pueden ingresar a la sesión. El profesor puede iniciar Preguntas.
no iniciada  | Los estudiantes no pueden ingresar a la sesión.
terminada    | Los estudiantes no pueden ingresar a la sesión.

--- 

**¿Qué sucede si el profesor finaliza la clase?**

Por ahora nada, pero debiese indicarle al estudiante que la sesión finalizó. Además se podría mostrar un boton al estudiante para que vea todo lo que se hizo en esa clase.

La solución sencilla es indicarle que finalizó la sesión y cerrar la ventana en X segundos.
---



## 2.2. Estados de una Pregunta

Estado       | Descripción
-------------|------------------------------
iniciada     | Los estudiantes pueden participar.
detenida     | Los estudiantes no pueden elegir participar.
terminada    | Una vez finalizada, espera unos segundos y vuelve a mostrar la vista de esperando pregunta.


# 3. Prueba de Funcionamiento

A continuación se presentan algunas cuentas para que pueda ver el funcionamiento del sistema.

Email                   | Contraseña       | Rol
------------------------|------------------|-----------------
super@ruvi.com          | ruvi1234         | Administrador / Profesor / Estudiante
admin@ruvi.com          | ruvi1234         | Administrador  
teacher@ruvi.com        | ruvi1234         | Profesor
student@ruvi.com        | ruvi1234         | Estudiante

# 4. Recomendaciones por parte de la comunidad

+ `Redis` podría ser una buena opción. Comento una solución que me tocó implementar con una arquitecura de microservicios, primero creamos un array en memoria con los sockets, pero almacenamos un objeto por usuario con todos los sockets clientes abiertos por cada usuario en ese objeto, con eso bajamos el tamaño y manejamos la comunicación con sockets abiertos. Sin embargo los limites son evidentes y para escalar utilizamos `Redis`, aunque `mongodb` tranquilamente puede andar bien.

+ Lo que yo hago por cada nuevo usuario conectado es registrarlo en `mongodb`, es más fácil realizar las consultas. Luego, cuando se desconecte lo elimino de `mongodb`.


estudiante2@estudiante2.com

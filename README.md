![Footer](https://user-images.githubusercontent.com/75450615/175360797-46169532-08fc-42e0-a755-0dafa43086bd.png)

# Proyecto: exam set triggers back

## Backs y bases de datos
webcam       ->  mongo(asistencias)

scheduler    ->  mongo(horarios de examen)

apache       <-  mongo(asistencias)
             <-  mongo(horarios de examen)
             ->  mongo(presentes)

set-triggers <-  mongo(horarios de examen)
             ->  apache

manual-attendance [FALTA ARMAR] -> mongo(presentes)

## HASTA AHORA
```
scheduler: agregar examen 1 a la base de datos
scheduler: agregar examen 2 a la base de datos
scheduler: agregar examen 3 a la base de datos
```
### Una vez que se agregaron todos los examenes, se corre el set-triggers una sóla vez para configurar todos los examenes cargados al scheduling interno del apache:
```
set-triggers: agregar triggers para todos los examenes de la base de datos
```
### Inicia el período de asistencia al examen (minutos antes de arrancar)
### El front de la Webcam habilita para sacar fotos y tomar asistencia
```
webcam: agregar asistencia a verificar de alumno 1 a examen 1
webcam: agregar asistencia a verificar de alumno 2 a examen 1
webcam: agregar asistencia a verificar de alumno 3 a examen 1
webcam: agregar asistencia a verificar de alumno 4 a examen 1
```
### Finaliza el período de asistencia al examen (minutos después de arrancar)
### Ya no se consideran los alumnos que intenten verificarse a partir de ahora
### Se ejecuta el trigger del examen 1 - se ejecuta Apache
### Apache valida todas las entradas que encuentre en la base de datos con Deepface
### El alumno 4 no pudo ser validado
### Apache informa al docente de los alumnos no validados
### Apache agrega los alumnos validados a la base de datos de alumnos validados

### El docente se encarga personalmente de validar la identidad del alumno no validado por el sistema
### En caso de que el alumno verifique su identidad, el docente lo agrega manualmente a la lista de la siguiente forma:
```
manual-attendance: agregar alumno 4 a la base de datos de alumnos validados
```

## PROPUESTA
```
scheduler: agregar examen 1 a la base de datos
scheduler: agregar examen 2 a la base de datos
scheduler: agregar examen 3 a la base de datos
```
### Inicia el período de asistencia al examen (minutos antes de arrancar)
### El front de la Webcam habilita para sacar fotos y tomar asistencia

```
webcam: verificar alumno 1 de examen 1, agregando un nuevo trigger para validarlo en el momento
```
### Se ejecuta el trigger del alumno 1 - se ejecuta Apache

```
apache: verifica alumno 1 del examen 1

```
### Si el alumno fue validado, Apache lo agrega a la base de datos de alumnos validados
### Apache informa al back de Webcam sobre el resultado de la última validación
### El back de Webcam le informa al front sobre el resultado de la operación
### El alumno se entera instantáneamente sobre el resultado de la validación, y no tiene que esperar a estar en la mitad del examen para que el docente se le acerque informandole que algo salió mal durante la validación
### De esta forma, si la validación fue correcta el alumno se entera en el momento y puede rendir el examen, y si no fue correcta, el alumno puede volver a intentar con otra foto
### Se le puede dar un márgen de 5 intentos por ejemplo, y recién en el sexto intento se le informa al docente sobre el alumno con problemas para validar su identidad
### Otra opción es avisarle al alumno por pantalla luego de 5 intentos de validar su identidad de que debe acercarse al docente para resolver el tema


```
webcam: verificar alumno 2 de examen 1, agregando un nuevo trigger para validarlo en el momento
```
### Se ejecuta el trigger del alumno 2 - se ejecuta Apache

```
apache: verifica alumno 2 del examen 1

```
### Si el alumno fue validado, Apache lo agreagaa a la base de datos de alumnos validados
### Apache informa al back de Webcam sobre el resultado de la última validación
### El back de Webcam le informa al front sobre el resultado de la operación

### etc (lo mismo con alumno 3 y alumno 4)
### ...

### Finaliza el período de asistencia al examen (minutos después de arrancar)
### Ya no se consideran los alumnos que intenten verificarse a partir de ahora
### Los alumnos validados ya fueron agregados a la lista de asistencias
### El docente es capaz de agregar manualmente a los alumnos cuya verificación falló
### Por ejemplo, si el alumno 4 no pudo validarse en 5 intentos, entra en contacto con el docente, el docente le valida la identidad personalmente y carga su asistencia manualmente mediante:

```
manual-attendance: agregar alumno 4 a la base de datos de alumnos validados
```

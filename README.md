# 📜 API de Frases de Personajes

Esta API permite gestionar frases dichas por personajes en distintos capítulos de una serie. Incluye funcionalidades para crear, leer, actualizar y eliminar frases, así como consultar información de personajes y capítulos.


## ⚙️ Visualizacion del proyecto


https://modulo-4-evaluacion-final-bpw-sandryxu.onrender.com


## 🧩 Endpoints de la API

### 📥 GET

- `GET /frases`
  Obtiene una frase aleatoria con información del personaje y capítulo.
  **Ejemplo:** `https://modulo-4-evaluacion-final-bpw-sandryxu.onrender.com/frases`

- `GET /frases/:id`  
  Obtiene una frase específica por su ID.  
  **Ejemplo:** `https://modulo-4-evaluacion-final-bpw-sandryxu.onrender.com/frases/1`

- `GET /frases/personaje/:personaje_id`  
  Obtiene todas las frases relacionadas con un personaje específico.  
  **Ejemplo:** `https://modulo-4-evaluacion-final-bpw-sandryxu.onrender.com/frases/personaje/2`

- `GET /frases/capitulo/:capitulo_id`  
  Obtiene todas las frases que aparecen en un capítulo.  
  **Ejemplo:** `https://modulo-4-evaluacion-final-bpw-sandryxu.onrender.com/frases/capitulo/3`

- `GET /personajes`  
  Devuelve todos los personajes registrados en la base de datos.
  **Ejemplo:** `https://modulo-4-evaluacion-final-bpw-sandryxu.onrender.com/personajes`

- `GET /capitulos`  
  Devuelve todos los capítulos registrados, incluyendo los personajes asociados.
  **Ejemplo:** `https://modulo-4-evaluacion-final-bpw-sandryxu.onrender.com/capitulos`

### ➕ POST

- `POST /frases`  
  Crea una nueva frase. Si el personaje o capítulo no existen, se crean automáticamente.

  **Body esperado:**

  ```json
  {
    "texto": "¡Multiplícate por cero!",
    "marca_tiempo": "15:42",
    "descripcion": "Frase icónica de Bart Simpson a Skinner",
    "nombre": "Bart",
    "apellido": "Simpson",
    "titulo": "Bart el General"
  }
  ```

### 📝 PUT

- `PUT /frases/:id`  
  Actualiza el texto de una frase existente.

  **Body esperado:**

  ```json
  {
    "texto": "¡Ay caramba!"
  }
  ```

### ❌ DELETE

- `DELETE /frases/:id`  
  Elimina una frase por su ID.



---
### 💡 Uso con Postman: POST, PUT y DELETE

Crear frase (POST)
Método: POST

URL: http://localhost:4000/frases (ajusta según tu entorno)

En Body > raw > JSON, inserta:

```json
{
  "texto": "¡Multiplícate por cero!",
  "marca_tiempo": "15:42",
  "descripcion": "Frase icónica de Bart Simpson a Skinner",
  "nombre": "Bart",
  "apellido": "Simpson",
  "titulo": "Bart el General"
}
Pulsa Send.

```
Actualizar frase (PUT)
Método: PUT

URL: http://localhost:4000/frases/3 (reemplaza 3 con el id real)

En Body > raw > JSON, inserta:

```json
{
  "texto": "¡Ay caramba!"
}
Pulsa Send.

``` 
Eliminar frase (DELETE)
Método: DELETE

URL: http://localhost:4000/frases/3 (reemplaza 3 con el id real)

Pulsa Send.





## 🧠 Estructura de la base de datos esperada

La base de datos debe tener las siguientes tablas relacionadas:

### Tabla `frases`

- `id`  
- `texto`  
- `marca_tiempo`  
- `descripcion`  
- `personaje_id` (FK)

### Tabla `personajes`

- `id`  
- `nombre`  
- `apellido`  
- `ocupacion`  
- `descripcion`

### Tabla `capitulos`

- `id`  
- `titulo`  
- `numero_episodio`  
- `temporada`  
- `sinopsis`

### Tabla `personajes_capitulos` (relación N:N)

- `personaje_id`  
- `capitulo_id`





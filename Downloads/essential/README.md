---

## 6️⃣ Context API en React

### 6.1 Introducción al Context API
El **Context API** permite compartir datos entre componentes sin necesidad de pasar props manualmente en cada nivel.

### 6.2 Creación y uso de contextos
Podemos crear un contexto con `createContext()` y luego consumirlo en los componentes hijos mediante `useContext`.

### 6.3 Contextos dinámicos y Custom Providers
Los **Custom Providers** permiten encapsular la lógica del contexto, haciéndolo más flexible y reutilizable.

### 6.4 Optimización del renderizado
Para evitar renderizados innecesarios, es importante:
- Memorizar valores con `useMemo`.
- Evitar pasar objetos/funciones inline como valores del contexto.
- Dividir el contexto en varios más específicos si maneja demasiados datos.

---

## 7️⃣ Firebase y Firestore

### 7.1 Introducción a Firebase
**Firebase** es una plataforma de Google que ofrece autenticación, base de datos en tiempo real, hosting, storage y más.

### 7.2 Arquitecturas y Panel de Control en Firebase
El **Firebase Console** permite gestionar proyectos, usuarios, reglas de seguridad y bases de datos desde una interfaz web.

### 7.3 Fundamentos de Firestore
**Firestore** es una base de datos NoSQL orientada a documentos.  
La estructura se organiza en **colecciones** → **documentos** → **subcolecciones**.

### 7.4 Creación y Modificación de Documentos
Ejemplo en React:

```js
import { db } from './firebaseConfig';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

// Crear documento
await addDoc(collection(db, "productos"), { nombre: "Laptop", precio: 999 });

// Modificar documento
const ref = doc(db, "productos", "ID_DEL_DOC");
await updateDoc(ref, { precio: 1050 });

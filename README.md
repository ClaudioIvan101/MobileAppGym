# StrongFit Mobile

Aplicación universal de StrongFit para administración del gimnasio y portal de socios. Está construida con Expo SDK 54, Expo Router, React Native y TanStack Query.

## Puesta en marcha

```bash
npm install
npm start
```

El comando `npm start` usa el modo offline de Expo para evitar el fallo de validación remota `Body has already been read` del CLI. Para habilitar la validación online:

```bash
npm run start:online
```

Puedes indicar la URL del backend con `EXPO_PUBLIC_API_URL`. Si no se define, la app usa el endpoint configurado por defecto y sus datos de desarrollo cuando la API no está disponible.

## Validaciones

```bash
npm run lint
npx tsc --noEmit
npm run export:web
```

Las rutas principales están dentro de `app/`; los módulos de negocio viven en `src/features/`.

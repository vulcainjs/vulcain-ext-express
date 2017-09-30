# Vulcain extension to use express as server adapter

## How to use it

Install package with

```js
npm install vulcain-ext-express --save
```

Create a new adapter extending ExpressAdapter which will replace the default adapter

```js
import { ExpressAdapter } from 'vulcain-ext-express';

// Declare your new adapter before running application
@Injectable(LifeTime.Singleton, DefaultServiceNames.ServerAdapter )
class MyAdapter extends ExpressAdapter {
    initializeRoutes(express) {
        // Add express initialization here
    }
}

// MyAdapter will be use automatically
let app = new ApplicationBuilder('Domain')
    .runAsync();
```

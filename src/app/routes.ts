import { Router } from 'express';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

interface RoutesModule {
  router: Router;
}

const router = Router();

const ext = __filename.endsWith('.ts') ? '.ts' : '.js';

readdirSync(join(__dirname, '..', '/modules')).map((fileName) => {
  if (existsSync(join(__dirname, '..', 'modules', fileName, 'infrastructure', `${fileName}.routes${ext}`))) {
    import(`../modules/${fileName}/infrastructure/${fileName}.routes${ext}`)
      .then((moduleRouter: RoutesModule) => {
        router.use(`/${fileName}`, moduleRouter.router);
      })
      .catch((error) => {
        console.error(`Error loading module ${fileName}:`, error);
      });
  } else {
    console.log(`No existe el controller ${fileName}`);
  }
});

export default router;

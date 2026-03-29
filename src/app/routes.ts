import { Router } from 'express';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

interface ControllerModule {
  router: Router;
}

const router = Router();

const ext = __filename.endsWith('.ts') ? '.ts' : '.js';

readdirSync(join(__dirname, '..', '/modules')).map((fileName) => {
  if (existsSync(join(__dirname, '..', 'modules', fileName, 'infrastructure', `${fileName}.controller${ext}`))) {
    import(`../modules/${fileName}/infrastructure/${fileName}.controller${ext}`)
      .then((moduleRouter: ControllerModule) => {
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

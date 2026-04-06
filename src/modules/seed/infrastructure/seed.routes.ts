import { Router, Request, Response } from 'express';
import { AppDataSource } from '../../../app/data-source';
import { Team } from '../../team/domain/team.entity';
import { Player } from '../../player/domain/player.entity';
import { Match } from '../../match/domain/match.entity';
import { News } from '../../news/domain/news.entity';
import { Sponsor } from '../../sponsor/domain/sponsor.entity';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    // 1. Limpiar datos (opcional, pero ayuda a que sea idempotente si se desea, por ahora solo agregamos)
    const teamRepo = AppDataSource.getRepository(Team);
    const playerRepo = AppDataSource.getRepository(Player);
    const matchRepo = AppDataSource.getRepository(Match);
    const newsRepo = AppDataSource.getRepository(News);
    const sponsorRepo = AppDataSource.getRepository(Sponsor);

    // 2. Crear Equipos
    const club = teamRepo.create({ name: 'FUTBOL CLUB BURGOS', isClub: true, category: 'Primer Equipo', logo: '/logo.svg' });
    const rival = teamRepo.create({ name: 'REAL MADRID B', isClub: false, category: 'Senior', logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg' });
    const rival2 = teamRepo.create({ name: 'FC BARCELONA B', isClub: false, category: 'Senior', logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona.svg' });

    await teamRepo.save([club, rival, rival2]);

    // 3. Crear Jugadores
    const playersNames = [
      { name: 'Ter Stegen', pos: 'POR', num: 1 },
      { name: 'Koundé', pos: 'DEF', num: 2 },
      { name: 'Pau Cubarsí', pos: 'DEF', num: 33 },
      { name: 'Balde', pos: 'DEF', num: 3 },
      { name: 'Pedri', pos: 'MED', num: 8 },
      { name: 'Gavi', pos: 'MED', num: 6 },
      { name: 'Casadó', pos: 'MED', num: 17 },
      { name: 'Lamine Yamal', pos: 'DEL', num: 19 },
      { name: 'Lewandowski', pos: 'DEL', num: 9 },
      { name: 'Raphinha', pos: 'DEL', num: 11 },
      { name: 'Dani Olmo', pos: 'MED', num: 20 },
    ];

    const players = playersNames.map(p => playerRepo.create({
      name: p.name,
      position: p.pos as any,
      number: p.num,
      team: club,
      photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name}`
    }));

    await playerRepo.save(players);

    // 4. Crear Partidos
    const matches = [
      matchRepo.create({
        opponent: 'REAL MADRID B',
        date: new Date('2026-04-15T18:00:00Z'),
        stadium: 'Estadio Municipal',
        isHome: true,
        status: 'scheduled',
        lineup: players.map(pl => ({ playerId: pl.id, x: Math.random() * 100, y: Math.random() * 100 }))
      }),
      matchRepo.create({
        opponent: 'FC BARCELONA B',
        date: new Date('2026-03-10T16:00:00Z'),
        stadium: 'Mini Estadi',
        isHome: false,
        status: 'finished',
        homeScore: 1,
        awayScore: 2
      })
    ];

    await matchRepo.save(matches);

    // 5. Crear Noticias
    const news = [
      newsRepo.create({
        title: 'Victoria Histórica en el Clásico de Cantera',
        content: 'El equipo Sub-20 se impuso ante sus rivales en un emocionante partido bajo la lluvia...',
        publishedAt: new Date()
      }),
      newsRepo.create({
        title: 'Nueva Firma de Patrocinio con TechSport',
        content: 'Estamos orgullosos de anunciar que TechSport será nuestro nuevo sponsor de tecnología por los próximos 3 años.',
        publishedAt: new Date(Date.now() - 86400000)
      })
    ];

    await newsRepo.save(news);

    // 6. Crear Sponsors
    const sponsors = [
      sponsorRepo.create({ name: 'Nike', type: 'main', website: 'https://nike.com' }),
      sponsorRepo.create({ name: 'Coca Cola', type: 'partner', website: 'https://cocacola.com' }),
      sponsorRepo.create({ name: 'Fly Emirates', type: 'sub', website: 'https://emirates.com' })
    ];

    await sponsorRepo.save(sponsors);

    res.json({ success: true, message: 'Base de datos poblada con éxito' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export { router };

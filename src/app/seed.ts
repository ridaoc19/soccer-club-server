import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();
import { AppDataSource } from './data-source';
import { League } from '../modules/league/domain/league.entity';
import { Season } from '../modules/season/domain/season.entity';
import { Team } from '../modules/team/domain/team.entity';
import { Player } from '../modules/player/domain/player.entity';
import { Match } from '../modules/match/domain/match.entity';

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log('Database connected for seeding...');

    const leagueRepo = AppDataSource.getRepository(League);
    const seasonRepo = AppDataSource.getRepository(Season);
    const teamRepo = AppDataSource.getRepository(Team);
    const playerRepo = AppDataSource.getRepository(Player);
    const matchRepo = AppDataSource.getRepository(Match);

    // 1. LIGAS
    const ligaBurgos = leagueRepo.create({ name: 'Liga Provincial de Burgos', country: 'España', category: 'Fútbol 11', logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=256&h=256&fit=crop' });
    const copaBurgos = leagueRepo.create({ name: 'Copa Diputación', country: 'España', category: 'Eliminatorias', logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=256&h=256&fit=crop' });
    await leagueRepo.save([ligaBurgos, copaBurgos]);

    // 2. TEMPORADAS
    const temp2425 = seasonRepo.create({ name: 'Temporada 2024/2025', year: '2024', league: ligaBurgos, status: 'active' });
    await seasonRepo.save(temp2425);

    // 3. EQUIPOS (RACING LERMEÑO Y RIVALES)
    const teamsData = [
      { name: 'Racing Lermeño CF', city: 'Lerma', manager: 'Dani Martín', isClub: true, category: 'Senior Primera Regional', points: 45 },
      { name: 'Racing Lermeño Alevín A', city: 'Lerma', manager: 'Javier Pérez', isClub: true, category: 'Alevín', points: 30 },
      { name: 'Racing Lermeño Alevín B', city: 'Lerma', manager: 'Carlos Ruiz', isClub: true, category: 'Alevín Segunda', points: 15 },
      { name: 'Racing Lermeño Benjamín', city: 'Lerma', manager: 'Juan Gómez', isClub: true, category: 'Benjamín', points: 22 },
      { name: 'Briviesca CF', city: 'Briviesca', manager: 'Pepe Mel', isClub: false, category: 'Senior', points: 38 },
      { name: 'Arandina CF', city: 'Aranda de Duero', manager: 'Luisma', isClub: false, category: 'Senior', points: 50 },
      { name: 'Burgos CF Promesas', city: 'Burgos', manager: 'Toscano', isClub: false, category: 'Senior', points: 42 },
    ];
    const savedTeams = await teamRepo.save(teamRepo.create(teamsData));
    const rlSenior = savedTeams.find(t => t.name === 'Racing Lermeño CF')!;
    const rlAlevinA = savedTeams.find(t => t.name === 'Racing Lermeño Alevín A')!;

    // 4. JUGADORES
    const playersSenior = [
      { name: 'Rubén García', position: 'POR' as const, number: 1, age: 24, team: rlSenior },
      { name: 'Fernando López', position: 'DEF' as const, number: 4, age: 22, team: rlSenior },
      { name: 'Mario Vallejo', position: 'MED' as const, number: 8, age: 26, team: rlSenior },
      { name: 'Alfonso Marcial', position: 'DEL' as const, number: 9, age: 21, team: rlSenior },
      { name: 'Kevin Santamaría', position: 'DEL' as const, number: 11, age: 23, team: rlSenior },
    ];
    const playersAlevin = [
      { name: 'Hugo Martínez', position: 'POR' as const, number: 1, age: 11, team: rlAlevinA },
      { name: 'Lucas del Val', position: 'DEF' as const, number: 5, age: 10, team: rlAlevinA },
      { name: 'Mateo González', position: 'MED' as const, number: 10, age: 11, team: rlAlevinA },
      { name: 'Izan Saiz', position: 'DEL' as const, number: 7, age: 11, team: rlAlevinA },
      { name: 'Diego Ferrero', position: 'DEL' as const, number: 11, age: 10, team: rlAlevinA },
    ];
    await playerRepo.save(playerRepo.create([...playersSenior, ...playersAlevin]));

    // 5. CALENDARIO
    const matchesData = [
      { opponent: 'Briviesca CF', date: new Date('2024-05-20T17:00:00Z'), isHome: true, status: 'scheduled' as const, stadium: 'Arlanza' },
      { opponent: 'Arandina CF', date: new Date('2024-05-27T11:00:00Z'), isHome: false, status: 'scheduled' as const, stadium: 'El Montecillo' },
      { opponent: 'Burgos CF Promesas', date: new Date('2024-04-15T18:00:00Z'), isHome: true, status: 'finished' as const, homeScore: 2, awayScore: 1, stadium: 'Arlanza' },
    ];
    await matchRepo.save(matchRepo.create(matchesData));

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

seed();

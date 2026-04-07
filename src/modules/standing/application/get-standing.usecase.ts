import { MatchRepository } from '../../match/infrastructure/match.repository';

export interface StandingEntry {
  teamName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export class GetStandingUseCase {
  constructor(private matchRepo: typeof MatchRepository) {}

  async execute(): Promise<StandingEntry[]> {
    const finishedMatches = await this.matchRepo.find({ where: { status: 'finished' } });
    const standings: Record<string, StandingEntry> = {};

    finishedMatches.forEach((m) => {
      const teams = [
        { name: 'NUESTRO CLUB', score: m.isHome ? m.homeScore : m.awayScore, opponent: m.opponent, isHome: m.isHome },
        { name: m.opponent, score: m.isHome ? m.awayScore : m.homeScore, opponent: 'NUESTRO CLUB', isHome: !m.isHome },
      ];

      teams.forEach((t) => {
        if (!standings[t.name]) {
          standings[t.name] = {
            teamName: t.name,
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            goalDifference: 0,
            points: 0,
          };
        }

        const s = standings[t.name];
        s.played += 1;
        s.goalsFor += t.score;
        // const oppScore = t.isHome ? (t.name === 'NUESTRO CLUB' ? m.awayScore : m.homeScore) : (t.name === 'NUESTRO CLUB' ? m.homeScore : m.awayScore);
        // Better logic:
        const tScore = t.score;
        const oScore = t.isHome
          ? t.name === 'NUESTRO CLUB'
            ? m.awayScore
            : m.homeScore
          : t.name === 'NUESTRO CLUB'
            ? m.homeScore
            : m.awayScore;

        s.goalsAgainst += oScore;
        s.goalDifference = s.goalsFor - s.goalsAgainst;

        if (tScore > oScore) {
          s.won += 1;
          s.points += 3;
        } else if (tScore === oScore) {
          s.drawn += 1;
          s.points += 1;
        } else {
          s.lost += 1;
        }
      });
    });

    return Object.values(standings).sort((a, b) => b.points - a.points || b.goalDifference - a.goalDifference);
  }
}

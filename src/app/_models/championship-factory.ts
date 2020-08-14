import { ChampionshipRaw, ChampionshipBrowseRaw } from './championship-raw';
import { Championship, ChampionshipBrowse } from './championship';
import { MetaInfoFactory } from './meta-info-factory';
import { RaceFactory } from './race-factory';
import { Game } from './domain-codes';

export class ChampionshipFactory {

  static fromRaw(championshipRaw: ChampionshipRaw): Championship {
    return {
      ...championshipRaw,
      metaInfo: MetaInfoFactory.fromRaw(championshipRaw.metaInfo),
      races: RaceFactory.fromRaw(championshipRaw.races),
      rating: +championshipRaw.rating
    };
  }

  // Browse = Vorschau ("overloading")
  static fromRawChampionshipBrowse(championshipBrowseRaw: ChampionshipBrowseRaw): ChampionshipBrowse {
    return {
      ...championshipBrowseRaw,
      rating: +championshipBrowseRaw.rating
    };
  }

  // die von API-Services erwarteten Attribute müssen vorhanden sein (null oder defaults)
  // auch wenn mit safe-operator markiert. (? heisst nur null okay)
  // sonst wirft der PHP-Service Fehler, was den Error Interceptor auslöst
  // Convention: Services erwarten nie TXT zu Codes und keine Names aus Look-ups
  static empty(): Championship {
    return {
      metaInfo: MetaInfoFactory.empty(),
      gameCode: Game.FH4,
      blueprintName: '',
      description: null,
      races: [], // leave empty - added by form
      rating: 0
    };
  }

}

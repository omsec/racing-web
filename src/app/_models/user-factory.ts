import { UserRaw } from './user-raw';
import { User, Role, Language } from './user';
import { environment } from '../../environments/environment';

export class UserFactory {
  static fromRaw(user: UserRaw): User {
    let url: string;
    if (user.profilePictureUrl.length > 0) {
      url = `${environment.appUrl}${user.profilePictureUrl}`; } else {
        url = '';
      }

    return {
      ...user,
      created: new Date(user.created),
      modified: new Date(user.modified),
      // convert "1" or "0" to true/false
      loginActive: user.loginActive === '1',
      lastSeen: new Date(user.lastSeen),
      profilePictureUrl: url
    };
  }

  // alle initialisieren, damit die Struktur komplett ist (? erlaubt einfach null)
  static empty(): User {
    return {
      userId: -1,
      created: new Date(),
      modified: null,
      username: '',
      password: '',
      loginActive: false,
      roleCode: Role.Guest,
      roleText: '',
      languageCode: Language.English,
      languageText: '',
      xBox: null,
      discord: null,
      lastSeen: null,
      token: null,
      profilePictureUrl: ''
    };
  }
}

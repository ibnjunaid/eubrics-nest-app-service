/**
 * Interface representing a database config object
 */
interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
}

/**
 * Function that returns database config depending on
 * whether NODE_ENV environment variable is set or not
 * Note: the values are hardcoded because these aren't production DB
 * and this project is just a POC.Also the remote database used in this project
 * only has a quota of 5mb.
 * @returns Object
 */
export function getDataBaseConfig(): DatabaseConfig {
  if (process.env.NODE_ENV) {
    return {
      host: 'localhost',
      port: 3306,
      username: 'osama',
      password: 'Cyanide7761*',
      database: 'eubrics',
      synchronize: true,
    };
  } else {
    return {
      host: 'sql6.freemysqlhosting.net',
      port: 3306,
      username: 'sql6503857',
      password: 'Y7kKgnYFe4',
      database: 'sql6503857',
      synchronize: false,
    };
  }
}

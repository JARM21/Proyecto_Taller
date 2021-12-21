import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mongodbtaller',
  connector: 'mongodb',
  url: 'mongodb+srv://JARM21Mongoose:Susanaesnegramongoose2122@silikonclus.w8s0z.mongodb.net/TallerBD?retryWrites=true&w=majority',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongodbtallerDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongodbtaller';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongodbtaller', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

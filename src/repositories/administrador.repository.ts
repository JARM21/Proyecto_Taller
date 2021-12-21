import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbtallerDataSource} from '../datasources';
import {Administrador, AdministradorRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.mongodbtaller') dataSource: MongodbtallerDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Administrador, dataSource);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}

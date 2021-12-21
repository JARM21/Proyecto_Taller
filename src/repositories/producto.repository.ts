import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbtallerDataSource} from '../datasources';
import {Producto, ProductoRelations, Pedido, PedidoProducto, Administrador} from '../models';
import {PedidoProductoRepository} from './pedido-producto.repository';
import {PedidoRepository} from './pedido.repository';
import {AdministradorRepository} from './administrador.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly pedidos: HasManyThroughRepositoryFactory<Pedido, typeof Pedido.prototype.id,
          PedidoProducto,
          typeof Producto.prototype.id
        >;

  public readonly administrador: BelongsToAccessor<Administrador, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.mongodbtaller') dataSource: MongodbtallerDataSource, @repository.getter('PedidoProductoRepository') protected pedidoProductoRepositoryGetter: Getter<PedidoProductoRepository>, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
  ) {
    super(Producto, dataSource);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
    this.pedidos = this.createHasManyThroughRepositoryFactoryFor('pedidos', pedidoRepositoryGetter, pedidoProductoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
  }
}

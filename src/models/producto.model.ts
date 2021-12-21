import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Pedido} from './pedido.model';
import {PedidoProducto} from './pedido-producto.model';
import {Administrador} from './administrador.model';

@model()
export class Producto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo_referencia: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  colores: string;

  @property({
    type: 'string',
    required: true,
  })
  imagenes: string;

  @property({
    type: 'string',
    required: true,
  })
  contacto_encargado: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @hasMany(() => Pedido, {through: {model: () => PedidoProducto}})
  pedidos: Pedido[];

  @belongsTo(() => Administrador)
  administradorId: string;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;

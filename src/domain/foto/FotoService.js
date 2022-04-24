export default class FotoService {

  constructor (resource) {
    this._resource = resource('v1/fotos{/id}');
  }

  list() {
    return this._resource
      .query()
      .then(res => res.json())
      .catch(err => {
        console.log(err);
        throw new Error('Não foi possível obter as fotos :(');
      })
  }

  register(foto) {
    if (foto._id) {
      return this._resource
        .update({ id: foto._id }, foto)
    } else {
      return this._resource
      .save(foto)
    }
  }

  delete(id) {
    return this._resource
      .delete({ id: id})
      .then(null)
      .catch(err => {
        console.log(err);
        throw new Error('Não foi possível remover a foto! :(');
      })
  }

  search(id) {
    return this._resource
    .get({id})
    .then(res => res.json());
  }
}

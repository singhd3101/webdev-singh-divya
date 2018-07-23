export class Website {
  name: String;
  _id: String;
  description: String;
  devloperId: String;

  /*constructor(_id,name) {
    this._id = _id;
    this.name = name;
  }*/

  constructor(_id,name,description,devloperId) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.devloperId = devloperId;
  }
}

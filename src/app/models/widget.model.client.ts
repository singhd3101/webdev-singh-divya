export class Widget {
  _id: String;
  type: String;
  size: String;
  text : String;
  src: String;

  constructor(_id, type, size, text, src){
    this._id = _id;
    this.type = type;
    this.size = size;
    this.text = text;
    this.src = src;
  }
}

module.exports = function (mongoose) {
    var module = {};

    var clientSchema = mongoose.Schema({
      name : String,
      type : String,
      image : String,
      web_url: String,
      template_type : String
    });

    module.clientModel = mongoose.model('Client', clientSchema);

    return module;
}
